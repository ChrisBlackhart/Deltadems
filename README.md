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
  lib/
    events.js          Events integration boundary (static now, Google later)
    forms.js           Form submission boundary + validators
    meeting.js         Next-meeting date + .ics calendar file
    useSeo.js          Per-page title/description/canonical/OG tags
    date.js            Date formatting helpers
  components/
    layout/            Header, Footer, Layout, PageHeader, SiteNotice, ScrollToTop
    ui/                Button, Logo, Icon, Tag, SectionHeading, cards, SocialBar
    sections/          Hero, NextMeetingBanner, EventCard, InvolvementGrid, …
    forms/             Field, useForm, FormStatus, Contact/Volunteer/Newsletter
  pages/               One file per route
public/
  favicon.svg, og-image.svg, robots.txt, sitemap.xml
```

## Configuration

All launch-time switches live in **`src/config.js`**:

| Setting | Purpose |
| --- | --- |
| `showConceptNotice` | Shows/hides the "redesign concept" banner. Set to `false` to remove before launch. |
| `siteUrl` | Canonical production URL for SEO/canonical/OG tags and the sitemap. Update at domain launch. |
| `formMode` | `"demo"` (validate only, nothing sent) or `"endpoint"` (POST to a serverless route). |
| `formsEndpoint` | The route used when `formMode` is `"endpoint"`. |
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

## Forms & email delivery

Contact, Volunteer, and Newsletter forms validate input client-side (required
fields, email format, accessible inline errors) and then POST to
**`api/submit.js`**, a Vercel Serverless Function (`config.formMode =
"endpoint"`, `config.formsEndpoint = "/api/submit"`) that validates again
server-side and delivers the submission by email.

**Delivery method:** Gmail SMTP via [nodemailer](https://nodemailer.com),
authenticated with a Gmail **App Password** on the organization's own
`DeltaDemsMI@gmail.com` account — chosen specifically because it requires no
DNS/domain changes and no new third-party account. No database; nothing is
stored, only relayed by email.

### Required environment variables

Set these in the Vercel dashboard (Project Settings → Environment Variables),
and copy `.env.example` to `.env.local` for local testing with `vercel dev`:

| Variable | Value |
| --- | --- |
| `GMAIL_USER` | `DeltaDemsMI@gmail.com` (the address forms send from and to) |
| `GMAIL_APP_PASSWORD` | A Gmail **App Password**, not the account's login password |

**To generate the App Password:**
1. The `DeltaDemsMI@gmail.com` account must have **2-Step Verification**
   already turned on (Google Account → Security). If it isn't on yet, someone
   with access to that account needs to enable it first.
2. Go to <https://myaccount.google.com/apppasswords>, sign in as
   `DeltaDemsMI@gmail.com`, and generate a new App Password (any label works,
   e.g. "Website forms").
3. Paste the generated 16-character password as `GMAIL_APP_PASSWORD`.

Without both variables set, the endpoint fails clearly (a real error, not a
fake success) with a message pointing the visitor to email the org directly —
it never pretends a message was sent when it wasn't.

### Local development note

`npm run dev` (Vite) does **not** run `/api/submit.js` — Vite's dev server has
no serverless-function emulation, so submitting a form locally will honestly
show a "couldn't submit" error. To test the real endpoint locally, use the
[Vercel CLI](https://vercel.com/docs/cli)'s `vercel dev` (with `.env.local`
set), or push to a branch and test on its Vercel Preview deployment.

### Spam protection

- **Honeypot** — every form includes a hidden field (`website`) that is
  removed from the tab order and hidden from assistive tech, so a real visitor
  can never fill it in. If it's non-empty, the submission is silently dropped
  (the endpoint responds as if it succeeded, so an automated script gets no
  useful feedback) — see `HoneypotField.jsx`.
- **Timing signal** — a too-fast submission (under ~1 second) is flagged in
  the email subject/body for human review, but is **still delivered** — a
  fast-but-genuine submission is never silently discarded just for being fast.
- **Rate limiting** — a best-effort, **per-instance-only** in-memory limiter
  (8 requests / 10 minutes / IP). Serverless functions run across many
  independent, frequently-recycled instances with no shared memory, so this is
  *not* a reliable distributed rate limit — only defense-in-depth against a
  single instance being hammered in a burst. A real distributed limit would
  need external state (e.g. Vercel KV / Upstash Redis), intentionally out of
  scope for this phase.
- **Origin check** — soft rejection of requests whose `Origin` header doesn't
  match the site, `*.vercel.app`, or `localhost`. A missing `Origin` header is
  allowed (some legitimate clients omit it).
- Deliberately **not** using a CAPTCHA — it adds friction for legitimate
  visitors that the above protections don't currently justify.

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

Vercel builds from the `main` branch via the GitHub integration. `vercel.json`
rewrites all routes to `index.html` so client-side routes work on direct load and
refresh. **The real domain is not connected yet** — do not connect it until the
client approves launch.

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
