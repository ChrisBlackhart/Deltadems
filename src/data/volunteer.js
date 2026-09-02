// ============================================================================
// Volunteer roles shown on the Volunteer page.
//
// These describe the kinds of help a county party typically needs, framed as
// invitations. They deliberately avoid promising things the committee has not
// told us it does — guaranteed training, fixed shift lengths, attendance at
// named events, or a particular response time. A volunteer sign-up page that
// over-promises sets up the committee to disappoint people on its first
// contact with them.
//
// `time` is a rough shape of the commitment, not a scheduling guarantee.
// ============================================================================

export const volunteerRoles = [
  {
    id: "canvass",
    icon: "DoorOpen",
    title: "Knock doors",
    time: "Weekends, seasonal",
    text: "Talk with neighbors about what matters to them. Canvassing is usually done in pairs with a set route, and it's easier than most people expect.",
  },
  {
    id: "phones",
    icon: "Phone",
    title: "Make calls & texts",
    time: "From home",
    text: "Reach voters with reminders about meetings, events and deadlines — from your own couch, on your own schedule.",
  },
  {
    id: "events",
    icon: "Tent",
    title: "Staff an event or booth",
    time: "A few hours",
    text: "Greet people at community gatherings, hand out information and answer questions. A friendly face goes a long way.",
  },
  {
    id: "registration",
    icon: "ClipboardCheck",
    title: "Help people register",
    time: "Seasonal",
    text: "Point neighbors to the state's registration and absentee tools, and help them check they're ready to vote.",
  },
  {
    id: "digital",
    icon: "Laptop",
    title: "Help online",
    time: "Remote",
    text: "Design graphics, keep social media active, write updates, or help keep this website and the events calendar current.",
  },
  {
    id: "hospitality",
    icon: "Coffee",
    title: "Hospitality & setup",
    time: "Meeting nights",
    text: "Bring the coffee, set up chairs, welcome newcomers at the 6:30 social hour. The glue that holds a meeting together.",
  },
];
