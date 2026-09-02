-- ---------------------------------------------------------------------------
-- Delta County Democratic Party — the table behind the website's three forms.
--
-- Modelled directly on the Sand Point Software inquiry pipeline
-- (sites/sandpoint/db/001-inquiries.sql in the infrastructure repo). The
-- security shape is deliberately identical: subtractive grants, an insert-only
-- RLS policy, CHECK constraints as the enforcement point, and a BEFORE INSERT
-- trigger that silently drops honeypot hits.
--
-- NOT YET APPLIED. This file is prepared during the website build; it is run
-- against the Genesis `deltadems` project at deployment time, not now.
--
-- Runs as supabase_admin against the project's database, after that database
-- has been bootstrapped by project-cluster.sql / project-database.sql.
--
-- Required psql variables:
--   db_name   this project's database name (deltadems_db)
--   owner     the project's migration/owner role
--
-- Deliberately NOT created here: the notifier role and any notification
-- machinery. Email delivery for Delta Dems does not exist yet and is a
-- deployment-stage concern. The notify_* columns below are included now so
-- that adding a notifier later is a grant, not a migration of a live table.
--
-- THE ONE THING TO UNDERSTAND BEFORE READING THE GRANTS
-- ----------------------------------------------------
-- project-database.sql deliberately runs:
--
--     GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
--
-- That is upstream Supabase's model, where RLS is the only gate. So the REVOKE
-- below is not tidying up. It is the difference between "anyone on the internet
-- can read and delete every submission unless exactly one RLS policy is right"
-- and "anyone on the internet can insert eleven named columns and the privilege
-- system refuses everything else even if every policy here is wrong."
-- ---------------------------------------------------------------------------

\set ON_ERROR_STOP on

SET ROLE :"owner";

-- ---------------------------------------------------------------------------
-- 1. The table
--
-- One table serves all three forms, discriminated by form_type. The
-- alternative — three tables — would need three Envoy routes, three policies
-- and three grant lists to keep in agreement, for three shapes that share
-- name/email/phone and differ by a handful of nullable columns.
--
-- Client-writable and server-owned columns are separated visually because that
-- split is enforced by the column-level grants in section 4. If a column moves
-- between the groups, the grant list has to move with it.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  -- server-owned identity
  -- pg_catalog, not extensions: gen_random_uuid() moved into core at
  -- PostgreSQL 13, so extensions.gen_random_uuid() does not resolve on 17.x.
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),

  -- client-writable — shared by every form
  form_type      text        NOT NULL,
  name           text,
  email          text        NOT NULL,
  phone          text,

  -- client-writable — contact form
  topic          text,
  message        text,

  -- client-writable — volunteer form
  availability   text,
  interests      text[],
  notes          text,

  -- client-writable — anti-spam signals, both set by the browser
  website        text,                       -- honeypot; see the trigger
  elapsed_ms     integer,                    -- time on form, client-reported

  -- server-owned request context.
  -- source_ip exists for abuse handling. When a notifier is eventually added it
  -- must NOT be granted SELECT on this column, so it can never leave the
  -- database in a notification.
  source_ip      inet,
  user_agent     text,

  -- server-owned notification state. Nothing writes these yet; they exist so
  -- that adding a notifier later does not require altering a live table.
  notify_state           text        NOT NULL DEFAULT 'pending',
  notify_attempts        integer     NOT NULL DEFAULT 0,
  notify_last_error      text,
  notify_last_attempt_at timestamptz,
  notified_at            timestamptz
);

COMMENT ON TABLE public.inquiries IS
  'Delta Dems website form submissions (contact, volunteer, newsletter). Insert-only from the public internet.';

-- ---------------------------------------------------------------------------
-- 2. Constraints
--
-- The same required-field rules the browser enforces, restated where they
-- cannot be bypassed. The browser copy is a courtesy to the person filling the
-- form; this is the enforcement point.
--
-- Lengths are generous but bounded. Unbounded text on a public insert endpoint
-- is a free way to fill the disk.
-- ---------------------------------------------------------------------------
ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_form_type_allowed CHECK (
        form_type IN ('contact', 'volunteer', 'newsletter')),

  -- Per-form required fields. email is NOT NULL for every form, so it is
  -- handled by the column definition rather than repeated here.
  ADD CONSTRAINT inquiries_contact_required CHECK (
        form_type <> 'contact'
        OR (name IS NOT NULL AND message IS NOT NULL)),
  ADD CONSTRAINT inquiries_volunteer_required CHECK (
        form_type <> 'volunteer'
        OR name IS NOT NULL),

  -- Deliberately looser than a full RFC 5322 grammar: rejecting a real person's
  -- unusual-but-valid address is a worse failure than accepting a bad one,
  -- which only ever costs a bounced reply.
  ADD CONSTRAINT inquiries_email_shape   CHECK (email ~ '^[^@[:space:]]+@[^@[:space:]]+$'),
  ADD CONSTRAINT inquiries_email_len     CHECK (length(email)   BETWEEN 3 AND 320),
  ADD CONSTRAINT inquiries_name_len      CHECK (name    IS NULL OR length(name)    BETWEEN 1 AND 200),
  ADD CONSTRAINT inquiries_phone_len     CHECK (phone   IS NULL OR length(phone)   <= 40),
  ADD CONSTRAINT inquiries_topic_len     CHECK (topic   IS NULL OR length(topic)   <= 100),
  ADD CONSTRAINT inquiries_message_len   CHECK (message IS NULL OR length(message) BETWEEN 1 AND 5000),
  ADD CONSTRAINT inquiries_notes_len     CHECK (notes   IS NULL OR length(notes)   <= 4000),
  ADD CONSTRAINT inquiries_ua_len        CHECK (user_agent IS NULL OR length(user_agent) <= 500),
  ADD CONSTRAINT inquiries_elapsed_range CHECK (elapsed_ms IS NULL OR elapsed_ms BETWEEN 0 AND 86400000),

  -- Availability is an allowlist, matched AFTER the trigger normalises dashes
  -- and whitespace. Written as plain ASCII so this file's correctness does not
  -- depend on an en dash surviving every editor and psql client on the way to
  -- the server.
  ADD CONSTRAINT inquiries_availability_allowed CHECK (availability IS NULL OR availability IN (
        'Weekdays', 'Weeknights', 'Weekends', 'Flexible / remote')),

  -- Bounded rather than allowlisted: the volunteer interest chips are wording
  -- the committee will want to change without a migration. Cardinality and
  -- total length are what actually need a limit.
  ADD CONSTRAINT inquiries_interests_count CHECK (
        interests IS NULL OR coalesce(array_length(interests, 1), 0) <= 12),
  ADD CONSTRAINT inquiries_interests_len CHECK (
        interests IS NULL OR length(array_to_string(interests, ',')) <= 500),

  ADD CONSTRAINT inquiries_notify_state    CHECK (notify_state IN ('pending','sent','failed')),
  ADD CONSTRAINT inquiries_notify_attempts CHECK (notify_attempts >= 0),

  -- The honeypot must never hold a value. A row that reaches storage with this
  -- set means the trigger below stopped running, which is worth an error.
  ADD CONSTRAINT inquiries_honeypot_empty CHECK (website IS NULL OR website = '');

-- A future notifier polls for pending work; a partial index keeps that a lookup
-- rather than a scan once the table has history in it.
CREATE INDEX IF NOT EXISTS inquiries_pending_idx
  ON public.inquiries (created_at)
  WHERE notify_state = 'pending';

-- Supports the per-address throttle in the trigger.
CREATE INDEX IF NOT EXISTS inquiries_email_recent_idx
  ON public.inquiries (lower(email), created_at DESC);

-- ---------------------------------------------------------------------------
-- 3. The BEFORE INSERT trigger
--
-- Does four jobs, in this order:
--   a. drops honeypot submissions SILENTLY
--   b. normalises the client's text so the allowlist above can be plain ASCII
--   c. records request context the client is not allowed to set
--   d. throttles repeat submissions from one address
--
-- SECURITY DEFINER is required for (d): the throttle has to count existing rows
-- and anon has no SELECT on this table — which is the point. search_path is
-- pinned so a SECURITY DEFINER function cannot be redirected at objects an
-- attacker controls, and every reference below is schema-qualified anyway.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.inquiries_before_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_headers jsonb;
  v_xff     text;
  v_recent  integer;
BEGIN
  -- (a) first: a honeypot hit should cost as little work as possible.
  --
  -- RETURN NULL cancels the INSERT without raising. The bot receives the same
  -- 201 a real submission gets and learns nothing, and no row is stored. An
  -- error here would tell it exactly which field is the trap.
  IF NEW.website IS NOT NULL AND btrim(NEW.website) <> '' THEN
    RETURN NULL;
  END IF;

  -- (b) Trim everything, and collapse every Unicode dash to ASCII '-' so the
  -- availability allowlist never depends on which dash character survived the
  -- trip from the browser.
  NEW.form_type    := btrim(NEW.form_type);
  NEW.name         := nullif(btrim(coalesce(NEW.name, '')), '');
  NEW.email        := lower(btrim(NEW.email));
  NEW.phone        := nullif(btrim(coalesce(NEW.phone, '')), '');
  NEW.topic        := nullif(btrim(coalesce(NEW.topic, '')), '');
  NEW.message      := nullif(btrim(coalesce(NEW.message, '')), '');
  NEW.notes        := nullif(btrim(coalesce(NEW.notes, '')), '');
  -- U+2010..U+2015 are the hyphen/dash block, U+2212 is the minus sign. Written
  -- as escapes, not as the characters themselves, for the reason above.
  NEW.availability := nullif(regexp_replace(btrim(coalesce(NEW.availability, '')),
                                            E'[‐-―−]', '-', 'g'), '');
  NEW.website      := NULL;

  -- An empty array is not a meaningful answer; store NULL instead so the
  -- "no interests selected" case has exactly one representation.
  IF NEW.interests IS NOT NULL AND coalesce(array_length(NEW.interests, 1), 0) = 0 THEN
    NEW.interests := NULL;
  END IF;

  -- (c) Server-owned columns. The column-level grants already stop anon from
  -- setting these; restating it here means a future grant mistake cannot turn
  -- into a forged timestamp or a pre-marked-as-sent submission.
  NEW.id                     := gen_random_uuid();
  NEW.created_at             := now();
  NEW.notify_state           := 'pending';
  NEW.notify_attempts        := 0;
  NEW.notify_last_error      := NULL;
  NEW.notify_last_attempt_at := NULL;
  NEW.notified_at            := NULL;

  v_headers := nullif(current_setting('request.headers', true), '')::jsonb;
  IF v_headers IS NOT NULL THEN
    NEW.user_agent := left(v_headers ->> 'user-agent', 500);
    -- X-Forwarded-For is a list; the leftmost entry is the client. Envoy is
    -- configured to trust exactly one hop (Caddy), so this is not attacker-set.
    v_xff := split_part(coalesce(v_headers ->> 'x-forwarded-for', ''), ',', 1);
    BEGIN
      NEW.source_ip := btrim(v_xff)::inet;
    EXCEPTION WHEN others THEN
      NEW.source_ip := NULL;   -- an unparseable header is not a reason to lose a submission
    END;
  END IF;

  -- (d) Per-address throttle. Envoy rate-limits the endpoint as a whole; this
  -- limits one person hammering the form, which a global limit cannot see.
  SELECT count(*) INTO v_recent
    FROM public.inquiries
   WHERE lower(email) = NEW.email
     AND created_at > now() - interval '1 hour';

  IF v_recent >= 5 THEN
    -- 53400 maps to HTTP 429 in PostgREST's error mapping. Five rather than
    -- three: one person may legitimately send a contact message, sign up for
    -- the newsletter and volunteer in the same sitting.
    RAISE EXCEPTION 'too many submissions from this address'
      USING ERRCODE = '53400',
            HINT    = 'Please wait before sending another message.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS inquiries_before_insert ON public.inquiries;
CREATE TRIGGER inquiries_before_insert
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.inquiries_before_insert();

-- ---------------------------------------------------------------------------
-- 4. Privileges
--
-- Subtractive first, then add back the smallest possible surface. After this
-- runs, the strongest thing a caller holding the anon key can do to this table
-- is insert eleven named columns. Not select. Not update. Not delete. That
-- holds even if every RLS policy in section 5 is wrong.
-- ---------------------------------------------------------------------------
REVOKE ALL ON public.inquiries FROM anon, authenticated, service_role, PUBLIC;

-- The exact eleven client-writable columns, matching the form payload keys.
--
-- `website` and `elapsed_ms` MUST be in this list. PostgREST rejects a payload
-- containing a column the caller cannot write, so omitting the honeypot would
-- turn every real submission into a 400 and make the trap trivially detectable.
GRANT INSERT (form_type, name, email, phone,
              topic, message,
              availability, interests, notes,
              website, elapsed_ms)
  ON public.inquiries TO anon;

-- service_role is the escape hatch every Supabase project has; here it is used
-- by nothing, so it gets nothing. Adding it back is a deliberate act.

-- The trigger is SECURITY DEFINER, so EXECUTE on it must not be public.
REVOKE ALL ON FUNCTION public.inquiries_before_insert() FROM PUBLIC;

-- ---------------------------------------------------------------------------
-- 5. Row level security
--
-- The second, independent layer. Column grants say WHICH COLUMNS; policies say
-- WHICH ROWS. An insert-only endpoint needs both to say "insert, nothing else".
-- ---------------------------------------------------------------------------
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- NOT forced, deliberately. FORCE ROW LEVEL SECURITY would apply RLS to the
-- table owner as well — and the BEFORE INSERT trigger is SECURITY DEFINER,
-- owned by that same role, so its throttle query would start matching zero rows
-- against a table with no owner SELECT policy. The throttle would then never
-- fire, and nothing would report an error.
--
-- The cost of not forcing: the owner bypasses every policy below, so any test
-- of these policies run as the owner proves NOTHING. Verification has to
-- connect as anon, via the authenticator.
DROP POLICY IF EXISTS inquiries_anon_insert ON public.inquiries;
CREATE POLICY inquiries_anon_insert ON public.inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- No SELECT, UPDATE or DELETE policy exists for anon, authenticated or
-- service_role. In PostgreSQL, absence of a policy denies — so those verbs are
-- closed by having written nothing, which is the failure mode we want.

-- ---------------------------------------------------------------------------
-- 6. The notifier role — DELIBERATELY NOT CREATED HERE
--
-- Sand Point's equivalent file creates a least-privilege `sandpoint_notifier`
-- LOGIN role at this point. Delta Dems has no notifier and no email delivery
-- yet, and building one now would mean inventing credentials for an account
-- that does not exist.
--
-- When notification is added, the role belongs here and must hold:
--   * SELECT on the notification fields — and NOT on source_ip
--   * UPDATE on the five notify_* columns only
--   * CONNECT on this database and nothing else
--   * no INSERT, no DELETE, no BYPASSRLS
--
-- so that "notification failure must never lose a submission" is enforced by
-- the privilege system rather than by the script being careful.
--
-- Until then every row simply stays notify_state='pending', which is the
-- correct resting state: the submission is already safe on disk.
-- ---------------------------------------------------------------------------

RESET ROLE;
