// ============================================================================
// Canonical list of public, indexable routes.
//
// Single source of truth for the generated sitemap (see vite.config.js). Add a
// route here when you add a public page; leave it out for anything that should
// not be indexed (e.g. the 404 route).
//
// `priority` is a relative hint for crawlers, not a ranking lever.
// ============================================================================

export const publicRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/events", priority: "0.9" },
  { path: "/get-involved", priority: "0.9" },
  { path: "/get-involved/volunteer", priority: "0.8" },
  { path: "/get-involved/join", priority: "0.8" },
  { path: "/voting", priority: "0.8" },
  { path: "/candidates", priority: "0.7" },
  { path: "/news", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
];
