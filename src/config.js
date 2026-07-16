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

  // ---- Form delivery ----
  // How contact/volunteer/newsletter forms behave.
  //   "demo"       → validates input, but does NOT send; shows an honest notice.
  //   "endpoint"   → POSTs to `formsEndpoint` (a Vercel serverless route or
  //                  approved form provider). Not enabled until a delivery
  //                  method is configured and approved.
  formMode: "demo",
  formsEndpoint: "", // e.g. "/api/contact" once a serverless function exists

  // ---- Events source ----
  // Where event data comes from. Only "static" is implemented today; the events
  // adapter (src/lib/events.js) defines the boundary for a future "google"
  // integration without changing the event components. See README.
  eventsSource: "static", // "static" | "google" (future)

  // ---- Analytics ----
  // No analytics wired yet; requires a provider decision + credentials.
  analytics: { enabled: false, provider: null },
};
