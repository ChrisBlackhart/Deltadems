# Delta County Democratic Party — Website

A redesign of the Delta County Democratic Party website (currently on Wix at
[deltademsmi.com](https://www.deltademsmi.com/)). Built as a modern, fast,
accessible, mobile-first single-page app with a lighthouse-inspired local
identity for Michigan's Upper Peninsula.

> **Status:** production foundation in progress. The site currently shows a
> visible "redesign concept" notice and uses **placeholder content** in several
> areas (see [Content](#content)). It is **not** the official website yet, and
> the live Wix site is untouched.

---

## Tech stack

- **React 19** + **Vite** (JavaScript, no TypeScript)
- **react-router-dom** for routing
- **CSS Modules** + design tokens in `src/index.css` (no CSS framework)
- **lucide-react** icons; social/brand glyphs are custom inline SVGs
- **@fontsource-variable/work-sans** (self-hosted font, no external requests)
- Deployed on **Vercel** (SPA rewrite in `vercel.json`)

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

Requires Node 18+ (developed on Node 24).

## Project structure

```
src/
  config.js            One place for site-wide switches (see Configuration)
  main.jsx             App entry (router + font)
  App.jsx              Route table
  index.css            Design tokens, reset, base styles, utilities
  data/                ← EDIT CONTENT HERE (see Content)
    site.js            Org info, contact, socials, donate link, meeting, disclaimer
    nav.js             Primary navigation
    events.js          Event data (placeholder)
    news.js            Announcements (placeholder)
    officials.js       Candidates & elected officials (placeholder)
    about.js           Mission, values, leadership (leadership placeholder)
    involvement.js     Homepage "ways to get involved" cards
    resources.js       Voting resources (real Michigan SOS links)
    volunteer.js       Volunteer roles
    routes.js          Public routes — single source for the generated sitemap
  lib/
    events.js          Events integration boundary (static now, Google later)
    forms.js           Validators + the public submitForm() entry point
    inquiry.js         Maps form fields → database columns (pure)
    submit/            Delivery providers: demo, genesis, vercel (legacy)
    meeting.js         Next-meeting date + .ics calendar file
    useSeo.js          Per-page title/description/canonical/OG tags
    date.js            Date formatting helpers
  components/
    layout/            Header, Footer, Layout, PageHeader, SiteNotice, ScrollToTop
    ui/                Button, Logo, Icon, Tag, SectionHeading, cards, SocialBar
    sections/          Hero, NextMeetingBanner, EventCard, InvolvementGrid, …
    forms/             Field, useForm, FormStatus, Contact/Volunteer/Newsletter
  pages/               One file per route
db/
  001-inquiries.sql    Form submissions table for Genesis (prepared, not applied)
public/
  favicon.svg, og-image.svg
```

`robots.txt` and `sitemap.xml` are **generated into `dist/` at build time**
from `config.siteUrl` + `src/data/routes.js` (see `vite.config.js`), so the
canonical domain lives in exactly one place.

## Configuration

All launch-time switches live in **`src/config.js`**:

| Setting | Purpose |
| --- | --- |
| `showConceptNotice` | Shows/hides the "redesign concept" banner. Set to `false` to remove before launch. |
| `siteUrl` | Canonical production URL for SEO/canonical/OG tags and the sitemap. Update at domain launch. |
| `submitMode` | Form delivery provider: `"demo"`, `"genesis"`, or `"vercel-legacy"`. See [Forms](#forms). |
| `genesis.formsPath` | API path for the Genesis PostgREST form route (must match `SP_PUBLIC_FORMS`). |
| `vercelLegacy.endpoint` | Route used by the legacy Vercel provider. Temporary. |
| `eventsSource` | `"static"` (local data) or `"google"` (future Google Calendar). |
| `analytics` | Analytics provider toggle (none wired yet). |

## Content

**All editable content lives in `src/data/`.** Each file has a header comment
marking it as `CONFIRMED` (from the current live site) or `PLACEHOLDER`.

- **Confirmed** — `site.js` (name, contact, mailing address, email, socials,
  ActBlue donation link, meeting details, legal disclaimer). Re-verify with the
  client before launch.
- **Placeholder** — `events.js`, `news.js`, `officials.js`, and the `leadership`
  list in `about.js`. Every placeholder record is tagged `placeholder: true` and
  surfaced with a visible "sample content" notice on the relevant pages. Replace
  the data and remove nothing else.

Do **not** present placeholder people, events, quotes, or statistics as real.

## Forms

Contact, Volunteer, and Newsletter forms validate input client-side (required
fields, email format, accessible inline errors), then hand the submission to a
**delivery provider** chosen by `config.submitMode`. The application never
knows how a submission is delivered.

```
form component → useForm → submitForm() → src/lib/submit/<provider>.js
                                ↑
                        src/lib/inquiry.js
                    (maps fields → database columns)
```

| Mode | Behaviour |
| --- | --- |
| `"demo"` | **Default while building.** Validates and acknowledges honestly *without* sending; the UI says "nothing was sent". Also logs the exact row it would POST, so the field-to-column mapping stays verifiable with no backend, no credentials and no email setup. |
| `"genesis"` | POSTs the row to PostgREST through the project's `SP_PUBLIC_FORMS` route. **This is the deployment target.** |
| `"vercel-legacy"` | POSTs to `api/submit.js` (Gmail SMTP via nodemailer). Retained only for the existing Vercel preview; retires at cutover. |

Adding a provider later — the eventual SPS notification system, a queue, a
different host — means one new file in `src/lib/submit/` and one mode name. No
component, form or validation code changes.

### The Genesis path

Genesis needs **no application server and no function** for forms. The project
declares a public form route in `projects/deltadems/project.conf`:

```ini
SP_PUBLIC_FORMS=inquiries:inquiries      # <api-path>:<table>
```

`omega render` turns that into an Envoy route — `POST /api/inquiries` →
PostgREST `/inquiries` — that accepts POST only and is rate-limited at the
edge. The database is the endpoint.

**The committed database row is the successful submission.** A `201` means the
row is durable. Notification reads that row out of band and can never affect
whether the submission succeeded — which is why there is no email code in this
path, and why there does not need to be.

The table is defined in **`db/001-inquiries.sql`** (prepared, not yet applied).
It follows the same security shape as Sand Point's own inquiry table:

- **Subtractive grants** — `REVOKE ALL`, then `GRANT INSERT` on eleven named
  columns. The strongest thing an anon key can do is insert those columns: not
  select, not update, not delete.
- **Insert-only RLS** as an independent second layer.
- **CHECK constraints** for required fields, lengths and the availability
  allowlist — the enforcement point the browser copy is only a courtesy to.
- **A `BEFORE INSERT` trigger** that silently drops honeypot hits (`RETURN
  NULL`, so a bot gets the same `201` and learns nothing), normalises text,
  sets server-owned columns, and throttles repeat submissions per address.

Anti-spam signals `website` (honeypot) and `elapsed_ms` are sent on every
submission. Both **must** be in the INSERT grant: PostgREST rejects a payload
containing a column the caller cannot write, so omitting the honeypot would
turn every real submission into a 400 and make the trap trivially detectable.

To enable it: set `submitMode: "genesis"` and provide `VITE_GENESIS_ANON_KEY`.
That key is **public by design** — in the PostgREST model the browser holds it,
and it is worth exactly what the grants allow.

### Email notification

**There is none yet, deliberately.** Delta Dems has no email account or
delivery system, and that is a deployment-stage concern rather than a
prerequisite for building the site. Rows simply rest at
`notify_state='pending'`, which is the correct resting state — the submission
is already safe on disk. The `notify_*` columns exist now so that adding a
notifier later is a grant, not a migration of a live table.

Note that the current `api/submit.js` approach **cannot be carried over**:
DigitalOcean blocks outbound SMTP on ports 25/465/587 from the Genesis droplet
(measured in the infrastructure repo's `STAGE_6A_REPORT.md`), and Gmail
publishes no alternate port. Genesis-side email uses Resend's HTTPS API.

### Legacy Vercel path

`api/submit.js` and the `nodemailer` dependency are retained only so the
existing Vercel preview keeps working. They are isolated behind
`src/lib/submit/vercel.js`, are not the target architecture, and retire
together at Genesis cutover. Their environment variables are documented in
`.env.example`.

## Events

Components read events only through **`src/lib/events.js`** (never from
`data/events.js` directly). To connect **Google Calendar** later without
rebuilding components:

1. Create a public Google Calendar; note its Calendar ID.
2. Add a serverless route (e.g. `api/events.js`) that calls the Google Calendar
   API server-side with an API key stored in a Vercel environment variable
   (never in client code), mapping Google's fields to the shape documented in
   `lib/events.js`.
3. Implement `fetchGoogleEvents()` there, set `config.eventsSource = "google"`,
   and render the existing loading/empty states while fetching.

## SEO

Per-page titles, descriptions, canonical, and Open Graph/Twitter tags are set at
runtime by `useSeo`. Because the site is client-rendered, crawlers that don't run
JavaScript see only the static tags in `index.html`. That's fine for launch; if
rich per-page link previews matter, add prerendering later. Update
`config.siteUrl`, `public/robots.txt`, and `public/sitemap.xml` when the real
domain is connected.

## Deployment

**See [DEPLOYMENT.md](DEPLOYMENT.md) for the full Genesis deployment handoff.**
It is the authoritative checklist; this section is only orientation.

The eventual production target is **SPS Genesis**, where the `deltadems`
project already exists. Two rules from that document are worth repeating here:

- **Never run `omega new-project deltadems`** — it re-runs an onboarding-only
  SQL template that would re-open the inquiries table to public SELECT and
  DELETE. The deploy command is `omega web deploy deltadems <build-dir>`.
- **`omega render` is global** and regenerates every project's Caddy config, so
  it must not run while the Pathfinder cutover is pending.

Vercel currently builds from `main` via the GitHub integration and is retained
as a reference and rollback path. `vercel.json` rewrites all routes to
`index.html`; on Genesis that behaviour comes from `SP_WEB_SPA=true` instead.
**The real domain is not connected yet** — it still serves the live Wix site.

## Launch checklist (high level)

- [ ] Replace all placeholder content in `src/data/`
- [ ] Add real photos and a high-resolution logo
- [ ] Re-verify confirmed org details with the client
- [ ] Choose + wire a form delivery method; set `formMode = "endpoint"`
- [ ] (Optional) connect Google Calendar for events
- [ ] Set `showConceptNotice = false`
- [ ] Update `siteUrl`, `robots.txt`, `sitemap.xml` to the real domain
- [ ] Add a privacy note if forms collect data
- [ ] Connect the production domain in Vercel
