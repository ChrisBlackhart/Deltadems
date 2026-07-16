// ============================================================================
// CONTENT STATUS: PLACEHOLDER — every person below is fictional.
// Replace with real, verified local candidates and elected officials before
// launch. Do NOT present these as real people. Each record is tagged
// `placeholder: true`, which drives the visible "sample content" notices.
// ============================================================================

const rawCandidates = [
  {
    id: "c1",
    name: "Jordan Alvarez",
    office: "State Representative · 108th District",
    blurb: "Small-business owner focused on rural healthcare access and good U.P. jobs.",
  },
  {
    id: "c2",
    name: "Riley Chen",
    office: "Delta County Commissioner · District 3",
    blurb: "Retired teacher running to protect our lakeshore and invest in local schools.",
  },
  {
    id: "c3",
    name: "Sam Whitfield",
    office: "Escanaba City Council",
    blurb: "Lifelong resident working on affordable housing and downtown revitalization.",
  },
];

const rawOfficials = [
  {
    id: "o1",
    name: "Pat Nguyen",
    office: "U.S. Representative · Michigan's 1st District",
    level: "Federal",
  },
  {
    id: "o2",
    name: "Casey Morgan",
    office: "State Senator · 38th District",
    level: "State",
  },
  {
    id: "o3",
    name: "Taylor Brooks",
    office: "Delta County Commissioner · District 1",
    level: "County",
  },
  {
    id: "o4",
    name: "Jamie Rivera",
    office: "Escanaba School Board Trustee",
    level: "Local",
  },
];

export const candidates = rawCandidates.map((c) => ({ ...c, placeholder: true }));
export const officials = rawOfficials.map((o) => ({ ...o, placeholder: true }));
