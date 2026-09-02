// Compute the next "first Wednesday of the month" meeting and build a
// downloadable calendar file — all client-side, no backend needed.
//
// Title, venue, duration and times come from src/data/site.js, which is
// verified against the committee's own published event listings.

import { meeting, site } from "../data/site.js";

export function nextFirstWednesday(from = new Date()) {
  const build = (year, month) => {
    const d = new Date(year, month, 1);
    // 3 = Wednesday. Advance to the first Wednesday.
    const offset = (3 - d.getDay() + 7) % 7;
    d.setDate(1 + offset);
    d.setHours(19, 0, 0, 0); // 7:00 PM
    return d;
  };

  let meeting = build(from.getFullYear(), from.getMonth());
  if (meeting < from) {
    meeting = build(from.getFullYear(), from.getMonth() + 1);
  }
  return meeting;
}

function icsStamp(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

// Commas and semicolons are field separators in iCalendar text values and
// must be escaped, or a venue like "USW Local 21, Escanaba" silently truncates
// in the importing calendar.
function icsText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildMeetingIcs(start) {
  const end = new Date(start.getTime() + meeting.durationMinutes * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Meeting//EN`,
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@deltademsmi.com`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsText(`${site.shortName} — ${meeting.title}`)}`,
    `LOCATION:${icsText(`${meeting.venue}, ${meeting.address}`)}`,
    `DESCRIPTION:${icsText(
      `Social time from ${meeting.socialTime}. Everyone welcome. ${meeting.online} — ${meeting.onlineNote}`
    )}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadMeetingIcs(start) {
  const blob = new Blob([buildMeetingIcs(start)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "delta-dems-meeting.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
