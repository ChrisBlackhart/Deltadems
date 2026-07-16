// Primary navigation. Children render as a dropdown (desktop) / nested (mobile).

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  {
    label: "Get Involved",
    to: "/get-involved",
    children: [
      { label: "Volunteer", to: "/get-involved/volunteer" },
      { label: "Join / Subscribe", to: "/get-involved/join" },
    ],
  },
  { label: "Voting", to: "/voting" },
  { label: "Candidates", to: "/candidates" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];
