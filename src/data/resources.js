// ============================================================================
// VOTING RESOURCES
//
// CONTENT STATUS: VERIFIED 2026-09-02.
//
// Every URL below was opened in a real browser and confirmed to land on the
// page it claims to. They come from the State of Michigan's own services:
//
//   mvic.sos.state.mi.us   Michigan Voter Information Center — the interactive
//                          tools. michigan.gov/vote redirects here.
//   michigan.gov/sos       Secretary of State reference pages.
//
// These replace an earlier set carried over from the old Wix site. That set
// included https://mvic.sos.state.mi.us/Clerk, which now returns "Not Found" —
// a dead link on a voting page is worse than no link, which is why these are
// checked rather than inherited.
//
// NOTHING PARTISAN BELONGS IN THIS FILE. These are factual election services
// that serve every voter in Delta County regardless of party. No endorsements,
// no candidate information, no committee positions.
//
// RE-CHECK BEFORE EACH ELECTION SEASON. State services get reorganized, and a
// broken link here costs someone their vote.
// ============================================================================

export const VOTING_LINKS_VERIFIED = "2026-09-02";

// The four things most people come to a voting page to do.
export const votingSteps = [
  {
    id: "register",
    icon: "UserPlus",
    title: "Register to vote",
    text: "Register or update your address online. In Michigan you can register right up to and including Election Day at your local clerk's office.",
    linkLabel: "Register online",
    url: "https://mvic.sos.state.mi.us/RegisterVoter/Index",
  },
  {
    id: "check",
    icon: "SearchCheck",
    title: "Check your registration",
    text: "Confirm you're registered at your current address, find your polling place, and see your clerk's contact details and drop box locations.",
    linkLabel: "Check your status",
    url: "https://mvic.sos.state.mi.us/Voter/Index",
  },
  {
    id: "ballot",
    icon: "ClipboardCheck",
    title: "See your ballot",
    text: "Preview exactly what will be on your ballot before you vote, including local races and any proposals.",
    linkLabel: "View your sample ballot",
    url: "https://mvic.sos.state.mi.us/PublicBallot/Index",
  },
  {
    id: "absentee",
    icon: "Mailbox",
    title: "Vote absentee",
    text: "Every Michigan voter can vote by mail, no reason required — and you can join the permanent list to get a ballot for every election.",
    linkLabel: "Apply for a ballot",
    url: "https://mvic.sos.state.mi.us/AVApplication/Index",
  },
];

// Secondary resources — fewer people need these, but the people who do, need
// them specifically.
export const votingMore = [
  {
    id: "early",
    title: "Early in-person voting",
    text: "Michigan offers early in-person voting ahead of statewide elections.",
    url: "https://www.michigan.gov/sos/elections/voting/early-in-person-voting",
  },
  {
    id: "clerk",
    title: "Your local clerk & drop boxes",
    text: "Your city or township clerk handles registration, absentee ballots and drop boxes for Delta County.",
    url: "https://mvic.sos.state.mi.us/Voter/Index/#yourclerk",
  },
  {
    id: "accessible",
    title: "Accessible voting",
    text: "Accessible ballots and voting equipment for voters with disabilities.",
    url: "https://mvic.sos.state.mi.us/Home/AccessibleVoting",
  },
  {
    id: "inperson",
    title: "Voting in person",
    text: "What to expect at the polls, and what ID you need to bring.",
    url: "https://mvic.sos.state.mi.us/Home/VoteInPerson",
  },
  {
    id: "students",
    title: "Student voters",
    text: "Where students can register, and how to choose between home and school.",
    url: "https://www.michigan.gov/sos/elections/voting/student-voting",
  },
  {
    id: "military",
    title: "Military & overseas voters",
    text: "Registering and voting from active duty or abroad.",
    url: "https://www.michigan.gov/sos/elections/voting/military-and-overseas-voters",
  },
];

// General-purpose fallback, safe to publish anywhere: the state's own portal.
export const votingHomeUrl = "https://www.michigan.gov/vote";

// Serving as an election inspector is paid, nonpartisan work run by clerks —
// genuinely useful, and distinct from volunteering for the party.
export const pollWorkerUrl = "https://www.michigan.gov/sos/elections/pollworker";

export const keyDates = [
  {
    id: "register-anytime",
    label: "You can register any time",
    detail:
      "Including on Election Day itself, in person at your city or township clerk's office.",
  },
  {
    id: "absentee-anyone",
    label: "Any voter can vote absentee",
    detail:
      "No reason needed. You can also join the permanent list and get a ballot mailed for every election.",
  },
  {
    id: "early-voting",
    label: "Early in-person voting",
    detail: "Available ahead of statewide elections — your clerk can confirm local dates and sites.",
  },
];
