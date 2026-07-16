// Small date helpers for event formatting. Dates are ISO "YYYY-MM-DD";
// parse as local (not UTC) to avoid off-by-one day shifts.

function parseLocal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso, opts = { month: "long", day: "numeric" }) {
  return parseLocal(iso).toLocaleDateString("en-US", opts);
}

export function formatFull(iso) {
  return parseLocal(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function dateParts(iso) {
  const d = parseLocal(iso);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: d.toLocaleDateString("en-US", { day: "numeric" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    year: d.getFullYear(),
  };
}

// "Aug 13" or "Aug 13–16" for multi-day events.
export function formatRange(iso, endIso) {
  if (!endIso) return formatDate(iso);
  const a = parseLocal(iso);
  const b = parseLocal(endIso);
  const month = a.toLocaleDateString("en-US", { month: "short" });
  if (a.getMonth() === b.getMonth()) {
    return `${month} ${a.getDate()}–${b.getDate()}`;
  }
  return `${formatDate(iso)} – ${formatDate(endIso)}`;
}
