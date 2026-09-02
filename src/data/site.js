// ============================================================================
// SINGLE SOURCE OF TRUTH for organization information.
//
// Everything here is reused across the site — edit once, updates everywhere.
// Do NOT copy these values into components.
//
// CONTENT STATUS: carried over from the current live site (deltademsmi.com).
// Treated as accurate, but every field below should be re-confirmed with the
// committee before the site replaces the Wix site. See `needsVerification`.
// ============================================================================

export const site = {
  name: "Delta County Democratic Party",
  shortName: "Delta Dems",
  tagline: "Neighbors organizing for a stronger Delta County.",
  region: "Escanaba & Delta County · Michigan's Upper Peninsula",

  email: "DeltaDemsMI@gmail.com",
  mailing: {
    lines: ["PO Box 1002", "Escanaba, MI 49829"],
    // Used for map/directions links and the disclaimer block.
    full: "PO Box 1002, Escanaba, MI 49829",
  },

  // External destinations reused across the site. Anything pointing off-site
  // belongs here so a single edit updates every button and link.
  ctas: {
    donate: "https://secure.actblue.com/donate/delta-county-democratic-party-2",
    michiganDems: "https://michigandems.com",
  },

  social: [
    { label: "Facebook", handle: "MIDeltaDems", url: "https://www.facebook.com/MIDeltaDems" },
    { label: "Instagram", handle: "deltacountydems", url: "https://instagram.com/deltacountydems" },
    { label: "Twitter", handle: "DemsDelta", url: "https://twitter.com/DemsDelta" },
  ],
};

// ---------------------------------------------------------------------------
// LEGAL DISCLAIMER
//
// PROVISIONAL — DO NOT TREAT AS FINAL OR COMPLIANCE-APPROVED.
//
// `text` below is the wording carried over verbatim from the current live Wix
// site. It has been preserved exactly as-is and has NOT been edited, corrected,
// or supplemented here.
//
// Final wording must be confirmed by the committee's treasurer with Michigan
// Democratic Party compliance staff (and/or counsel) before launch. Do not
// change this string based on an engineer's reading of the regulations.
// ---------------------------------------------------------------------------
export const disclaimer = {
  text: "Paid for by the Delta County Democratic Party with Regulated Funds.",
  status: "provisional",
  note: "Wording preserved from the existing site. Pending compliance verification.",
};

// ---------------------------------------------------------------------------
// RECURRING MEETING
//
// The most important "this organization is active" signal on the site. Defined
// once here and consumed by the homepage banner, the Events page, the About
// page, the Contact page, and the footer.
// ---------------------------------------------------------------------------
export const meeting = {
  // VERIFIED against the organization's own published event pages
  // (deltademsmi.com/event-details/..., captured 2026-09-02). Twenty-seven
  // event listings from 2022-2025 are all a first Wednesday at 7:00 PM, and
  // each gives the venue and address below.
  title: "General Monthly Meeting",
  cadence: "First Wednesday of every month",
  // Machine-readable recurrence, used to compute the next meeting date.
  recurrence: { weekday: 3, ordinal: 1 }, // 3 = Wednesday, 1st of the month
  time: "7:00 PM",
  endTime: "8:00 PM",
  durationMinutes: 60,
  socialTime: "6:30 PM",
  // Official venue name as the committee publishes it. ("USW Hall" was our
  // earlier shorthand.)
  venue: "USW Local 21 Escanaba",
  street: "1201 Sheridan Rd",
  city: "Escanaba, MI 49829",
  address: "1201 Sheridan Rd, Escanaba, MI 49829",
  online: "Zoom participation is usually available",

  // Shown on generated future meetings, which follow the standing schedule but
  // whose details the committee has not published yet. Deliberately does not
  // repeat the time, venue or social hour — the card already lists those.
  standingNote:
    "Everyone is welcome, members and first-timers alike. We confirm each month's location and Zoom details closer to the date — get in touch if you'd like them.",
  // NOTE: the committee currently publishes a standing Zoom join link,
  // meeting ID and passcode on each event page of the Wix site. That is
  // deliberately NOT reproduced here: a permanently public link is a
  // disruption risk, and whether to publish it is the committee's call.
  // Until they decide, point people to email.
  onlineNote: "Email us for the Zoom link.",
  note: "Everyone is welcome — members and curious first-timers alike. Social time starts at 6:30 if you'd rather arrive early and say hello first.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=USW+Hall+1201+Sheridan+Rd+Escanaba+MI",
};

// Items a human still needs to confirm before this site goes live.
export const needsVerification = [
  "How the Zoom option should be published (the committee currently publishes a standing public link; this site asks people to email instead)",
  "Mailing address and contact email still current",
  "ActBlue link routes to the correct registered committee",
  "Final disclaimer wording (see `disclaimer` above)",
  "Whether the 6:30 PM social time still precedes every meeting",
];
