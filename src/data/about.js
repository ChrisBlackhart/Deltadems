// ============================================================================
// About-page content.
//
// CONTENT STATUS: grounded in what the committee actually publishes.
//
// `mission` is a light adaptation of the committee's own homepage copy. The
// values and quick facts below deliberately describe things that can be
// checked — the standing meeting schedule, the geography, the Michigan
// Democratic Party affiliation, the neighboring county parties — rather than
// organizational history, accomplishments, membership numbers or policy
// positions, none of which we have.
//
// Specifically avoided: naming activities the committee has not published
// (an earlier version claimed cleanups and picnics, which came from sample
// event data that has since been removed as invented), and gesturing at issue
// priorities the committee has never stated.
// ============================================================================

export const mission =
  "We support Democratic values and Democratic candidates across Delta County and beyond. The Delta Dems play an active role in engaging our friends and neighbors in service to our community — and we're proud to be part of the Michigan Democratic Party.";

export const values = [
  {
    id: "local",
    icon: "MapPin",
    title: "Rooted in Delta County",
    text: "From Escanaba to Gladstone and the townships in between, we organize where we live — among neighbors, not strangers.",
  },
  {
    id: "welcoming",
    icon: "Users",
    title: "Everyone's welcome",
    text: "Longtime activists and first-time neighbors alike. You don't need experience or a title — just show up.",
  },
  {
    id: "regular",
    icon: "CalendarDays",
    title: "We meet, every month",
    text: "The first Wednesday, at 7:00 PM, with social time from 6:30 — the same standing schedule we've kept year after year.",
  },
  {
    id: "connected",
    icon: "Megaphone",
    title: "Part of something bigger",
    text: "We're part of the Michigan Democratic Party, and one of a number of county parties organizing across the Upper Peninsula.",
  },
];

// CONTENT STATUS: EMPTY BY DESIGN — awaiting the committee.
//
// Fictional officer names were removed rather than left here. Officers are
// elected volunteers whose names, roles and photos only the committee can
// supply, and inventing them would attribute real positions to people who do
// not hold them.
//
// While empty, the About page renders an honest "officer names are coming
// soon" state. Shape when populated: { id, name, role, photo? }
export const leadership = [];

// Four distinct, checkable facts. An earlier version spent two of its four
// slots saying "we meet monthly" twice.
export const quickFacts = [
  { id: "f1", value: "1st Wed", label: "Monthly meeting at 7:00 PM" },
  { id: "f2", value: "6:30 PM", label: "Social time beforehand" },
  { id: "f3", value: "All welcome", label: "Members and first-timers alike" },
  { id: "f4", value: "Delta County", label: "Escanaba, Gladstone & the townships" },
];
