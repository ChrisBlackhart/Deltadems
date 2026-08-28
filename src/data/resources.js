// ============================================================================
// VOTING RESOURCES
//
// ⚠️  LINK VERIFICATION REQUIRED BEFORE LAUNCH.
//
// These URLs point at the Michigan Voter Information Center (a genuine State of
// Michigan service, mvic.sos.state.mi.us) and were carried over from the
// existing site rather than invented. However, automated checks return HTTP 403
// (the site blocks scripted requests), so the exact deep-link paths could NOT be
// programmatically confirmed.
//
// ACTION: a human must open each link in a browser and confirm it lands on the
// right page, then flip `verified` to true. Do not publish unverified deep links
// to government services — a wrong link on a voting page is worse than no link.
//
// If a deep link cannot be confirmed, fall back to the department root
// (michigan.gov/vote) rather than guessing a path.
// ============================================================================

export const VOTING_LINKS_VERIFIED = false;

export const votingSteps = [
  {
    id: "register",
    icon: "UserPlus",
    title: "Register to vote",
    text: "Michigan residents can register online, by mail, or in person — even on Election Day at your local clerk's office.",
    linkLabel: "Register to vote",
    url: "https://mvic.sos.state.mi.us/RegisterVoter",
    verified: false,
  },
  {
    id: "check",
    icon: "SearchCheck",
    title: "Check your registration",
    text: "Confirm you're registered at your current address and preview what's on your ballot.",
    linkLabel: "Check your status",
    url: "https://mvic.sos.state.mi.us/Voter/Index",
    verified: false,
  },
  {
    id: "absentee",
    icon: "Mailbox",
    title: "Vote absentee",
    text: "Every Michigan voter can request an absentee ballot and vote from home.",
    linkLabel: "Request a ballot",
    url: "https://mvic.sos.state.mi.us/AVApplication/Index",
    verified: false,
  },
  {
    id: "clerk",
    icon: "Landmark",
    title: "Find your clerk",
    text: "Your local clerk handles registration, absentee ballots, and early voting for Delta County.",
    linkLabel: "Look up your clerk",
    url: "https://mvic.sos.state.mi.us/Clerk",
    verified: false,
  },
];

// General-purpose fallback, safe to publish: the state's main voter portal.
export const votingHomeUrl = "https://www.michigan.gov/vote";

export const keyDates = [
  {
    id: "early-voting",
    label: "Early voting",
    detail: "Michigan offers early in-person voting before statewide elections.",
    verified: false,
  },
  {
    id: "register-deadline",
    label: "Register any time",
    detail: "You can register up to and including Election Day at your city or township clerk's office.",
    verified: false,
  },
  {
    id: "absentee-window",
    label: "Absentee ballots",
    detail: "Request early; return by mail, drop box, or in person to your clerk.",
    verified: false,
  },
];
