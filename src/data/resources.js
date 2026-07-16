// Voting resources. External URLs point to real Michigan resources so the
// demo is genuinely useful; verify/finalize before production launch.

export const votingSteps = [
  {
    id: "register",
    icon: "UserPlus",
    title: "Register to vote",
    text: "Michigan residents can register online, by mail, or in person — even on Election Day at your clerk's office.",
    linkLabel: "Register at Michigan.gov/Vote",
    url: "https://mvic.sos.state.mi.us/RegisterVoter",
  },
  {
    id: "check",
    icon: "SearchCheck",
    title: "Check your registration",
    text: "Confirm you're registered at your current address and see a preview of your ballot.",
    linkLabel: "Check your status",
    url: "https://mvic.sos.state.mi.us/Voter/Index",
  },
  {
    id: "absentee",
    icon: "Mailbox",
    title: "Vote absentee",
    text: "Every Michigan voter can request an absentee ballot and vote from home. Sign up to get one for every election.",
    linkLabel: "Request an absentee ballot",
    url: "https://mvic.sos.state.mi.us/AVApplication/Index",
  },
  {
    id: "clerk",
    icon: "Landmark",
    title: "Find your clerk",
    text: "Your local clerk handles registration, absentee ballots, and early voting details for Delta County.",
    linkLabel: "Look up your clerk",
    url: "https://mvic.sos.state.mi.us/Clerk",
  },
];

export const keyDates = [
  {
    id: "early-voting",
    label: "Early voting",
    detail: "Nine days of early, in-person voting before every statewide election.",
  },
  {
    id: "register-deadline",
    label: "Register any time",
    detail: "Register up to and including Election Day at your city or township clerk's office.",
  },
  {
    id: "absentee-window",
    label: "Absentee ballots",
    detail: "Request early; return by mail, drop box, or in person to your clerk.",
  },
];
