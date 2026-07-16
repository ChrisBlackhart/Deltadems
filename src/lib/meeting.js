// Compute the next "first Wednesday of the month" meeting and build a
// downloadable calendar file — all client-side, no backend needed.

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

export function buildMeetingIcs(start) {
  const end = new Date(start.getTime() + 90 * 60 * 1000); // ~1.5h
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Delta County Democratic Party//Meeting//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@deltademsmi.com`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    "SUMMARY:Delta Dems Monthly Membership Meeting",
    "LOCATION:USW Hall, 1201 Sheridan Rd, Escanaba, MI 49829",
    "DESCRIPTION:Social time from 6:30 PM. Everyone welcome — also on Zoom.",
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
