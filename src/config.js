// ============================================================================
// Central site configuration — the few switches that control site-wide behavior.
// Edit these values (no component changes needed) to prepare for launch.
// ============================================================================

export const config = {
  // ---- Pre-launch concept notice ----
  // Shows a banner stating this is a redesign concept, not the official site.
  // Set to `false` (one change) to remove it before launch.
  showConceptNotice: true,

  // Canonical production URL, used for SEO canonical + Open Graph tags and the
  // sitemap. Update to the real domain at launch (keep the Wix site untouched
  // until then).
  siteUrl: "https://deltadems-concept.vercel.app",

  // ---- Form submission ----
  // Which delivery provider the contact/volunteer/newsletter forms use.
  // Implementations live in src/lib/submit/; the app itself is unaware of them.
  //
  //   "demo"          validates and acknowledges honestly WITHOUT sending.
  //                   Logs the exact row it would POST, so the field-to-column
  //                   mapping stays verifiable with no backend. Default while
  //                   the site is being built.
  //
  //   "genesis"       POSTs the row to PostgREST through the project's
  //                   SP_PUBLIC_FORMS route. The committed database row IS the
  //                   successful submission; notification is separate and
  //                   cannot affect it. Needs `genesis.formsPath` below and
  //                   VITE_GENESIS_ANON_KEY. This is the deployment target.
  //
  //   "vercel-legacy" POSTs to api/submit.js (Gmail SMTP via nodemailer).
  //                   Retained only for the existing Vercel preview. Cannot run
  //                   on Genesis — outbound SMTP is blocked there — and retires
  //                   with api/submit.js at cutover.
  submitMode: "demo",

  // Used when submitMode is "genesis". `formsPath` must match the api-path in
  // SP_PUBLIC_FORMS=<api-path>:<table> in projects/deltadems/project.conf.
  // The anon key is public by design and comes from VITE_GENESIS_ANON_KEY.
  genesis: {
    formsPath: "/api/inquiries",
  },

  // Used when submitMode is "vercel-legacy". Temporary.
  vercelLegacy: {
    endpoint: "/api/submit",
  },

  // ---- Events source ----
  // Where event data comes from. Only "static" is implemented today; the events
  // adapter (src/lib/events.js) defines the boundary for a future "google"
  // integration without changing the event components. See README.
  eventsSource: "static", // "static" | "google" (future)

  // ---- Analytics ----
  // No analytics wired yet; requires a provider decision + credentials.
  analytics: { enabled: false, provider: null },
};
