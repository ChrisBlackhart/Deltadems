# Delta Dems — Genesis deployment handoff

**Build state: `130365a` (working tree clean).** The website build is
substantially complete. Nothing in this document has been executed.

> **Sequencing:** the Pathfinder cutover takes priority. Delta Dems deployment
> begins only after Pathfinder has completed its cutover and Genesis is
> confirmed stable.

---

## 0. Two rules that override everything below

**① Do NOT run `omega new-project deltadems`.**

The Genesis project already exists — `projects/deltadems/project.conf` in the
Sand Point Software infrastructure repo, added 2026-08-30 in commit `cb527ea`,
classified `SP_ENVIRONMENT=production`.

Running `new-project` against it is not merely redundant, it is destructive.
`new-project.sh` skips an existing `project.conf` ("project.conf exists —
leaving it untouched") but then **unconditionally re-runs
`templates/project-database.sql`**, whose own header states in capitals that it
*"IS ONBOARDING-ONLY AND MUST NOT BE RE-RUN AGAINST A LIVE PROJECT"* — because
its blanket `GRANT ALL ON ALL TABLES … TO anon` would silently restore
privileges a project deliberately narrowed later. On this project that would
re-open `public.inquiries` to public SELECT and DELETE.

The correct deploy command is `omega web deploy deltadems <build-dir>`.

**② Steps marked ⚠️ SHARED touch infrastructure beyond this project.**

`omega render` is **global**: `cmd_render` calls `render-gateway.py` with no
arguments, and that script deletes every `*.caddy` site file and regenerates
them for *all* projects. It reloads the same gateway config Pathfinder depends
on. Every ⚠️ SHARED step must wait for Pathfinder to be done and stable, and
should be done in a window where a Caddy reload is acceptable.

---

## 1. Already complete

| Item | Where |
| --- | --- |
| Full site build — 10 routes, responsive, accessible | this repo |
| Genesis-compatible submission path behind a provider seam | `src/lib/submit/` |
| Field → column mapping for the inquiries table | `src/lib/inquiry.js` |
| Inquiries SQL migration, written, **not applied** | `db/001-inquiries.sql` |
| Content audit; invented people/news/events removed | `src/data/*` |
| Voting resources verified against live state sources | `src/data/resources.js` |
| `robots.txt` / `sitemap.xml` generated from `config.siteUrl` | `vite.config.js` |
| Production build produces a deployable `dist/` | `npm run build` |

The Genesis project declaration already carries the right shape and needs no
change to these lines:

```ini
SP_TIER=T1              SP_WEB=true
SP_ENVIRONMENT=production   SP_WEB_SPA=true
SP_DB_NAME=deltadems_db     SP_HOSTNAME=www.deltademsmi.com
SP_API_PATHS=/api/*         SP_HOSTNAME_ALIASES=deltademsmi.com
```

---

## 2. Preparable locally (no Genesis contact, do any time)

- [ ] **Push the build.** `main` is currently **7 commits ahead of
      `origin/main`** — the canonical state is local-only. Note that pushing
      triggers the Vercel GitHub integration and will redeploy the preview.
- [ ] Replace committee-dependent content (see §10) in `src/data/`.
- [ ] Set `config.showConceptNotice = false` — removes the "redesign concept"
      banner. **Only once content is real.**
- [ ] Set `config.siteUrl` to the production URL. This alone updates canonical
      tags, Open Graph, `robots.txt` and `sitemap.xml`.
- [ ] Add a 1200×630 raster social image; `public/og-image.svg` is an SVG,
      which Facebook, X, LinkedIn and iMessage do not render.
- [ ] Decide the store question (55 Wix products, not migrated) and the Zoom
      publication question (§10).
- [ ] `npm run lint && npm run build`, and verify `dist/index.html` exists —
      `omega web deploy` refuses a build without it.

---

## 3. Genesis project configuration

- [ ] Add one line to `projects/deltadems/project.conf`:

      SP_PUBLIC_FORMS=inquiries:inquiries      # <api-path>:<table>

      This is the generic, per-project mechanism that makes
      `POST /api/inquiries` route through Envoy to PostgREST `/inquiries`,
      POST-only, rate-limited 10 req/60 s at the edge. It requires no change to
      shared infrastructure.
- [ ] Commit that change to the infrastructure repo and deploy the repo to
      `/opt/sandpoint/infrastructure` by the established procedure. ⚠️ **SHARED** —
      that procedure copies the whole infrastructure tree.
- [ ] Leave `SP_TLS=false` for now. It is flipped in §8, not before.

---

## 4. Database migration

- [ ] Apply `db/001-inquiries.sql` against `deltadems_db` as `supabase_admin`,
      passing the psql variables it requires:

      -v db_name=deltadems_db -v owner=<project owner role>

- [ ] The file creates the table, CHECK constraints, the `BEFORE INSERT`
      trigger (honeypot drop, normalisation, per-address throttle), subtractive
      grants and insert-only RLS. It deliberately does **not** create a notifier
      role — see §6.
- [ ] Verify grants are as intended by connecting **as `anon` via the
      authenticator**, not as the owner. RLS is intentionally not FORCEd, so the
      owner bypasses every policy and a test run as owner proves nothing.
      Expected: INSERT succeeds on the eleven granted columns; SELECT, UPDATE
      and DELETE all fail.

---

## 5. Public form activation

- [ ] Obtain the project's **anon key** from Genesis.
- [ ] Set `VITE_GENESIS_ANON_KEY` in the build environment. It is **public by
      design** — the browser holds it and it is worth exactly what the grants
      allow. It is not a secret and belongs in the client bundle.
- [ ] Set `config.submitMode = "genesis"`.
- [ ] Confirm `config.genesis.formsPath` (`/api/inquiries`) matches the
      `SP_PUBLIC_FORMS` api-path exactly.
- [ ] Rebuild, then submit each of the three forms and confirm a row lands in
      `public.inquiries` with the correct `form_type`.
- [ ] Submit with the honeypot filled and confirm the response is still `201`
      and **no row is stored**.

---

## 6. Email / notification — deferred by design

**There is no Delta Dems email delivery, and that is intentional.** Rows rest
at `notify_state='pending'`, which is the correct resting state: the submission
is already durable on disk. Nothing is lost while this is unbuilt.

Two things to know when it is built:

- The existing `notify-inquiries.py` is **not multi-tenant** — it hardcodes
  `PROJECT = "sandpoint"`, `DB = "sandpoint_db"`, the `sandpoint_notifier` role
  and the `sandpoint-notify.*` systemd units. Using it for Delta Dems means
  generalising it. ⚠️ **SHARED** — do not do this without an explicit decision.
- **Gmail SMTP cannot be used.** DigitalOcean blocks outbound 25/465/587 from
  the Genesis droplet (measured in `STAGE_6A_REPORT.md`); only
  `smtp.resend.com:2587` and `api.resend.com:443` are reachable, and Gmail
  publishes no alternate port. Genesis-native email is the **Resend HTTPS API**,
  installed by `omega configure-email`.
- The notifier role belongs in §4's migration when added, holding SELECT on the
  notification fields but **not** `source_ip`, UPDATE on the five `notify_*`
  columns, and no INSERT or DELETE — so "notification failure cannot lose a
  submission" is enforced by privileges rather than by care.

---

## 7. Build & deploy

- [ ] `npm ci && npm run build` on a workstation or CI. **Genesis never
      builds** — it receives finished static output and runs no package manager.
- [ ] Copy `dist/` to the server.
- [ ] `omega web deploy deltadems <build-dir>`

      This is atomic and self-verifying: it refuses a build with no
      `index.html`, stages to a `.partial` directory, swaps a relative symlink
      with a single `rename(2)`, reloads Caddy, curls the site using its own
      Host header expecting 200, and **auto-rolls-back** if that check fails and
      a previous release exists.
- [ ] `omega web status deltadems` and `omega web releases deltadems`.

---

## 8. TLS, domain and DNS cutover

Do this **last**, and only after §9 verification passes over plain HTTP.

Current live state (checked 2026-09-02):

| | Value |
| --- | --- |
| Registrar | **Wix.com Ltd.** — domain is transfer-locked (`clientTransferProhibited`) |
| Nameservers | `ns14.wixdns.net`, `ns15.wixdns.net` |
| Apex A | `185.230.63.107 / .186 / .171` (Wix) |
| `www` | CNAME → `cdn1.wixdns.net` |
| MX / SPF / DKIM / DMARC | **none** — no email runs on this domain |

- [ ] Because there are **no MX or TXT records**, the usual nightmare of
      destroying mail flow does not apply here. Re-verify immediately before
      cutting over rather than trusting this snapshot.
- [ ] Unlock the domain at Wix and obtain the EPP/auth code — it is emailed only
      to the registrant contact address. **Identify who controls that mailbox
      early**; if it belongs to someone who has left, this is the long pole.
- [ ] Point DNS at Genesis (or transfer the registrar first, if that is the
      chosen path).
- [ ] Only once the hostname resolves to Genesis, set `SP_TLS=true` in
      `project.conf` and run `omega render`. ⚠️ **SHARED** — regenerates every
      project's Caddy config.
      Flipping TLS before DNS resolves causes a failing ACME request and burns
      Let's Encrypt rate limit.
- [ ] Redirect the old Wix URL paths that do not exist in the new site — in
      particular the ~62 store URLs — to a real destination, not the homepage.

---

## 9. Verification

- [ ] All 10 routes load, including a **direct refresh** on a deep route
      (`/get-involved/volunteer`), which exercises the SPA fallback.
- [ ] 404 route renders for an unknown path.
- [ ] All three forms submit and land rows; honeypot silently drops.
- [ ] Rate limiting behaves: the edge limit and the per-address throttle
      (SQLSTATE 53400 → HTTP 429) both return a sensible message.
- [ ] No console errors; no horizontal overflow at 360 / 768 / 1280.
- [ ] `robots.txt` and `sitemap.xml` carry the **production** domain, not the
      Vercel preview one.
- [ ] Concept banner gone (`showConceptNotice = false`).
- [ ] Disclaimer wording matches whatever compliance approved.
- [ ] HTTPS valid on both apex and `www`, with one canonical host.

---

## 10. Rollback & reference paths

**Keep both until Genesis is verified.**

- **Wix** — remains live and authoritative until DNS is cut over. Until that
  moment, rollback is free: change nothing. Do not cancel the Wix plan until
  Genesis has been verified in production for a sensible period, and export the
  store orders and contacts first.
- **Vercel preview** — the `*.vercel.app` build stays as a working reference.
  `api/submit.js`, `nodemailer` and the `vercel-legacy` provider are retained
  deliberately for this reason and are removed only in deployment cleanup.

Genesis-side rollback:

- `omega web rollback deltadems` — previous release, or
  `omega web rollback deltadems <id>` for a specific one. Same atomic symlink
  swap as a deploy; no rebuild, no source tree, under a second.
- Deploy already auto-rolls-back if its own HTTP check fails.
- To abandon entirely before DNS cutover: change nothing. Genesis is not
  serving anyone.

---

## 11. Still blocked on the committee

Content that cannot be written without them:

1. Officer names, roles, photos
2. Candidate endorsements — a bylaws-governed vote; their own site says "TBD"
3. Elected officials — public record, but needs verification **and** sign-off
4. News posts
5. One-off events beyond the standing meeting
6. Photographs and a high-resolution logo

Decisions only they can make:

7. **The Zoom link** — they currently publish a standing join link, ID and
   passcode on every event page. This site says "email us" instead, because a
   permanently public link invites disruption. Their call.
8. **Confirm meetings continue in 2026** — their published calendar ends
   December 2025 while their homepage still advertises the cadence. Every
   generated meeting date rests on this.
9. **Committee membership terms** — the Join page points people to ask, because
   we do not have the bylaws.
10. **Final disclaimer wording** — preserved verbatim from their site and marked
    provisional, pending compliance review.
11. **The 55-product store** — not migrated; scope decision outstanding.
