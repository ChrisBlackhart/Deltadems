// ============================================================================
// CONTENT STATUS: EMPTY BY DESIGN.
//
// One-off events (fundraisers, canvasses, booths) belong here as real entries
// supplied by the committee. The fictional samples that used to live in this
// file have been removed: publishing invented events on a real party's site is
// worse than publishing none.
//
// The RECURRING MONTHLY MEETING is not listed here. It is generated from the
// verified recurrence in src/data/site.js by src/lib/events.js, so it never
// needs re-entering and can never go stale.
//
// To add a real event, push an object shaped like this:
//
//   {
//     id: "fall-fundraiser-2026",
//     title: "Fall Fundraiser Dinner",
//     date: "2026-10-17",            // ISO, local date
//     endDate: "2026-10-18",         // optional, multi-day only
//     start: "5:30 PM",
//     end: "8:00 PM",                // optional
//     category: "Fundraiser",        // Meeting | Volunteer | Fundraiser | Community | Social
//     location: "Escanaba",
//     online: false,
//     summary: "One or two sentences.",
//   }
//
// Components never read this file directly — they go through
// src/lib/events.js. See README "Events".
// ============================================================================

export const events = [];

// Past events, newest first. Real recaps only.
export const pastEvents = [];
