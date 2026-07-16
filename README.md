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

## Forms

Contact, Volunteer, and Newsletter forms **validate input** (required fields,
email format, accessible inline errors) but do **not** send anything while
`config.formMode === "demo"` — they show an honest "nothing was sent" notice.
No submissions are stored.

To enable real delivery (no component changes required):

1. Add a Vercel serverless route (e.g. `api/contact.js`) or an approved form
   provider. **Do not add a database.**
2. Set `config.formMode = "endpoint"` and `config.formsEndpoint` to the route.
3. The route validates again server-side and delivers (e.g. email). The
   `submitForm()` boundary in `src/lib/forms.js` already handles success/error.

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
