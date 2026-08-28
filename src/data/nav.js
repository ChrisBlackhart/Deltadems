// ============================================================================
// Site navigation.
//
// `primaryNav` is the header navigation — deliberately short. Six destinations
// is the most a visitor can scan quickly, and the Donate action is rendered
// separately as a button (see site.ctas.donate) rather than as a nav link.
//
// `secondaryNav` holds real pages that are intentionally NOT in the header.
// They are reachable from within the relevant page and from the footer. Keep
// them here rather than deleting the routes.
// ============================================================================

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Voting Resources", to: "/voting" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const secondaryNav = [
  { label: "Volunteer", to: "/get-involved/volunteer" },
  { label: "Join / Subscribe", to: "/get-involved/join" },
  { label: "Candidates & Officials", to: "/candidates" },
  { label: "News & Updates", to: "/news" },
];

// Footer link columns.
export const footerNav = [
  {
    title: "Explore",
    links: [
      { label: "Events", to: "/events" },
      { label: "About", to: "/about" },
      { label: "News & Updates", to: "/news" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Ways to help", to: "/get-involved" },
      { label: "Volunteer", to: "/get-involved/volunteer" },
      { label: "Join / Subscribe", to: "/get-involved/join" },
      { label: "Candidates & Officials", to: "/candidates" },
    ],
  },
];
