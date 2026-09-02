// ============================================================================
// CONTENT STATUS: EMPTY BY DESIGN — awaiting the committee.
//
// This file previously held fictional placeholder people. They have been
// removed rather than left in the repository, because the risk of invented
// names being re-rendered onto a real political party's website outweighs
// their value as layout examples.
//
// TWO DIFFERENT KINDS OF FACT LIVE HERE, AND THEY NEED DIFFERENT SOURCING:
//
//   candidates — an ENDORSEMENT decision. Which candidates the committee
//     supports is not publicly derivable; it depends on the committee's own
//     vote under its bylaws. Only the committee can supply this list.
//     (The committee's current site says: "TBD — This page will be updated
//     when candidates are announced.")
//
//   officials — a matter of public record, but one that changes with every
//     election and must be verified against official sources (house.gov,
//     senate.michigan.gov, legislature.mi.gov, deltacountymi.gov) and then
//     signed off by the committee before publication. Publishing the wrong
//     office-holder on a party site is a credibility failure.
//
// While both are empty, /candidates renders an honest "not yet announced"
// state instead. See src/pages/Candidates.jsx.
//
// Shape when populated:
//   { id, name, office, blurb?, level? }
// ============================================================================

export const candidates = [];

export const officials = [];
