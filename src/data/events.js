// ============================================================================
// CONTENT STATUS: PLACEHOLDER — all events below are fictional samples.
// Replace with real, verified events before launch. `date` is ISO
// (YYYY-MM-DD); categories drive the colored tag. Each record is tagged
// `placeholder: true`. NOTE: recurring monthly meeting facts live in
// src/data/site.js (those ARE confirmed from the current site).
//
// Components read events through src/lib/events.js (the integration boundary),
// not directly — so a future Google Calendar source can replace this file
// without touching the event components. See README "Events".
// ============================================================================

const rawEvents = [
  {
    id: "aug-monthly-meeting",
    title: "Monthly Membership Meeting",
    date: "2026-08-05",
    start: "7:00 PM",
    doors: "6:30 PM",
    category: "Meeting",
    location: "USW Hall, Escanaba",
    online: true,
    featured: true,
    summary:
      "Our first-Wednesday gathering. Committee updates, guest speaker, and planning for the fall. Social time starts at 6:30.",
  },
  {
    id: "up-state-fair-booth",
    title: "U.P. State Fair — Delta Dems Booth",
    date: "2026-08-13",
    endDate: "2026-08-16",
    start: "All day",
    category: "Community",
    location: "U.P. State Fairgrounds, Escanaba",
    featured: true,
    summary:
      "Stop by our booth at the fair to say hello, register to vote, grab a yard sign, and meet local candidates. Volunteers needed for two-hour shifts.",
  },
  {
    id: "voter-registration-drive",
    title: "Voter Registration Drive",
    date: "2026-08-22",
    start: "10:00 AM",
    end: "2:00 PM",
    category: "Volunteer",
    location: "Downtown Escanaba Farmers Market",
    summary:
      "Help neighbors check their registration and request absentee ballots. Training provided — no experience needed.",
  },
  {
    id: "sep-monthly-meeting",
    title: "Monthly Membership Meeting",
    date: "2026-09-02",
    start: "7:00 PM",
    doors: "6:30 PM",
    category: "Meeting",
    location: "USW Hall, Escanaba",
    online: true,
    summary:
      "Fall organizing kickoff. We'll finalize canvassing plans and welcome new volunteers.",
  },
  {
    id: "fall-fundraiser-dinner",
    title: "Fall Fundraiser Dinner",
    date: "2026-09-19",
    start: "5:30 PM",
    category: "Fundraiser",
    location: "Escanaba (venue TBA)",
    summary:
      "An evening of good food and community with featured speakers. Proceeds support local organizing. Tickets and sponsorships available soon.",
  },
  {
    id: "weekend-of-action",
    title: "Neighborhood Canvass — Weekend of Action",
    date: "2026-09-26",
    start: "9:00 AM",
    category: "Volunteer",
    location: "Meet at USW Hall, Escanaba",
    summary:
      "Knock doors with a partner, share information, and listen to what matters to Delta County families. Coffee and route assignments at 9.",
  },
];

// Recent past events — proof the organization is active year-round.
const rawPastEvents = [
  {
    id: "july-meeting",
    title: "July Membership Meeting",
    date: "2026-07-01",
    category: "Meeting",
    location: "USW Hall, Escanaba",
    summary: "Summer planning and a recap of the county picnic.",
  },
  {
    id: "flag-day-picnic",
    title: "Community Picnic in the Park",
    date: "2026-06-14",
    category: "Social",
    location: "Ludington Park, Escanaba",
    summary: "Neighbors, grills, and games along the bay. [Sample event — replace with a real recap.]",
  },
  {
    id: "highway-cleanup",
    title: "Adopt-a-Highway Cleanup",
    date: "2026-06-07",
    category: "Community",
    location: "US-2 near Gladstone",
    summary: "A morning of service keeping our stretch of highway clean.",
  },
];

export const events = rawEvents.map((e) => ({ ...e, placeholder: true }));
export const pastEvents = rawPastEvents.map((e) => ({ ...e, placeholder: true }));
