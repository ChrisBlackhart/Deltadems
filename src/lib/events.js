// ============================================================================
// Events integration boundary.
//
// Components must import event data ONLY from this module — never from
// ../data/events.js directly. That keeps a single seam so the source can change
// (static file today → Google Calendar later) without rewriting components.
//
// The canonical event shape returned by every function here:
//   {
//     id, title, date (ISO "YYYY-MM-DD"), endDate?, start?, end?, doors?,
//     category, location, online?, summary, placeholder?
//   }
//
// ---- To connect Google Calendar later (no component changes required) ----
//   1. Create a public Google Calendar and note its Calendar ID.
//   2. Add a serverless route (e.g. /api/events) that calls the Google Calendar
//      API server-side with an API key (keep the key in a Vercel env var, never
//      in client code) and maps Google's event fields into the shape above.
//   3. Implement `fetchGoogleEvents()` below to fetch that route, and set
//      `config.eventsSource = "google"`.
//   4. Make the event functions async (or add a small data-loading hook) and
//      render the existing loading/empty states while fetching.
// Until then, `eventsSource` stays "static" and we read the local data file.
// ============================================================================

import { events as staticEvents, pastEvents as staticPast } from "../data/events.js";
import { config } from "../config.js";

function parseLocal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// An event counts as "past" only once its final day is over.
function isUpcoming(ev, now) {
  const end = parseLocal(ev.endDate || ev.date);
  end.setHours(23, 59, 59, 999);
  return end >= now;
}

function byDateAsc(a, b) {
  return parseLocal(a.date) - parseLocal(b.date);
}

function getSource() {
  // Only "static" is implemented today; "google" is the documented future path.
  if (config.eventsSource === "google") {
    // return fetchGoogleEvents();  // implement when a calendar is connected
  }
  return { upcoming: staticEvents, past: staticPast };
}

export function getUpcomingEvents({ limit } = {}) {
  const { upcoming } = getSource();
  const now = new Date();
  const list = [...upcoming].filter((e) => isUpcoming(e, now)).sort(byDateAsc);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getPastEvents({ limit } = {}) {
  const { upcoming, past } = getSource();
  const now = new Date();
  // Anything from the upcoming set that has slipped into the past joins `past`.
  const slipped = [...upcoming].filter((e) => !isUpcoming(e, now));
  const list = [...past, ...slipped].sort((a, b) => parseLocal(b.date) - parseLocal(a.date));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getFeaturedEvents({ limit = 3 } = {}) {
  const upcoming = getUpcomingEvents();
  const featured = upcoming.filter((e) => e.featured);
  const list = featured.length ? featured : upcoming;
  return list.slice(0, limit);
}

// True when the currently displayed events are sample/placeholder data.
export function eventsArePlaceholder() {
  return getUpcomingEvents().some((e) => e.placeholder) || config.eventsSource === "static";
}
