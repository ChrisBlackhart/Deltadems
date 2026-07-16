// About-page content: mission, values, leadership placeholders, quick facts.

export const mission =
  "We support Democratic values and Democratic candidates across Delta County and beyond. The Delta Dems play an active role in engaging our friends and neighbors in service to our community — and we're proud to be part of the Michigan Democratic Party.";

export const values = [
  {
    id: "local",
    icon: "MapPin",
    title: "Rooted in the U.P.",
    text: "From Escanaba to Gladstone and every township in between, we organize where we live — on issues that matter to Delta County families.",
  },
  {
    id: "welcoming",
    icon: "Users",
    title: "Everyone's welcome",
    text: "Longtime activists and first-time neighbors alike. You don't need experience or a title — just show up and pitch in.",
  },
  {
    id: "service",
    icon: "HandHeart",
    title: "Community first",
    text: "Cleanups, picnics, registration drives, and mutual support. We believe politics starts with showing up for each other.",
  },
  {
    id: "action",
    icon: "Megaphone",
    title: "Active year-round",
    text: "We don't disappear between elections. Monthly meetings, ongoing events, and steady organizing keep us connected.",
  },
];

// CONTENT STATUS: PLACEHOLDER — fictional officers. Replace with real names,
// roles, and photos before launch. Tagged `placeholder: true`.
const rawLeadership = [
  { id: "l1", name: "Alex Johnson", role: "Chair" },
  { id: "l2", name: "Morgan Lee", role: "Vice Chair" },
  { id: "l3", name: "Jesse Park", role: "Secretary" },
  { id: "l4", name: "Dana Foster", role: "Treasurer" },
];
export const leadership = rawLeadership.map((p) => ({ ...p, placeholder: true }));

export const quickFacts = [
  { id: "f1", value: "Monthly", label: "Membership meetings" },
  { id: "f2", value: "1st Wed", label: "Every month at 7 PM" },
  { id: "f3", value: "Year-round", label: "Events & service" },
  { id: "f4", value: "All of Delta County", label: "Escanaba, Gladstone & beyond" },
];
