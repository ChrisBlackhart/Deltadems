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
import { meeting } from "../data/site.js";
import { config } from "../config.js";

function parseLocal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isoDate(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// The nth <weekday> of a given month, e.g. the 1st Wednesday.
function nthWeekdayOfMonth(year, month, weekday, ordinal) {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (ordinal - 1) * 7);
}

/**
 * The recurring monthly meeting, generated rather than hand-listed.
 *
 * This is real, verified content: the committee's own published event pages
 * show an unbroken run of first-Wednesday 7:00 PM meetings, and their site
 * still advertises the same cadence. Generating it means the calendar is never
 * empty and never stale — the failure the old Wix site had, where "No events at
 * the moment" made an active organization look dormant.
 *
 * If the committee ever cancels or moves one, that becomes a real entry in
 * src/data/events.js, which takes precedence by being a specific fact rather
 * than a generated assumption.
 */
export function getRecurringMeetings({ count = 6, from = new Date() } = {}) {
  const { weekday, ordinal } = meeting.recurrence;
  const out = [];

  for (let i = 0; out.length < count && i < count + 2; i++) {
    const probe = new Date(from.getFullYear(), from.getMonth() + i, 1);
    const date = nthWeekdayOfMonth(probe.getFullYear(), probe.getMonth(), weekday, ordinal);

    // Skip a meeting that has already happened this month.
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    if (endOfDay < from) continue;

    out.push({
      id: `meeting-${isoDate(date)}`,
      title: meeting.title,
      date: isoDate(date),
      start: meeting.time,
      end: meeting.endTime,
      doors: meeting.socialTime,
      category: "Meeting",
      location: `${meeting.venue}, ${meeting.city}`,
      online: true,
      recurring: true,
      summary: meeting.note,
    });
  }

  return out;
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

export function getUpcomingEvents({ limit, includeMeetings = true } = {}) {
  const { upcoming } = getSource();
  const now = new Date();

  // One-off events supplied by the committee, plus the generated recurring
  // meeting. Merged and sorted together so the calendar reads chronologically
  // rather than as two separate lists.
  const oneOff = [...upcoming].filter((e) => isUpcoming(e, now));
  const meetings = includeMeetings ? getRecurringMeetings({ count: 6, from: now }) : [];

  const list = [...oneOff, ...meetings].sort(byDateAsc);
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

// True when the committee has supplied no one-off events of its own, so the
// calendar is showing only the generated recurring meeting.
export function hasOnlyRecurringMeetings() {
  return getUpcomingEvents().every((e) => e.recurring);
}
