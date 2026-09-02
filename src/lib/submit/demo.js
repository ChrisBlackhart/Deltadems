// ============================================================================
// Demo submission provider — the default while the site is being built.
//
// Validates and acknowledges honestly WITHOUT sending anything: the UI shows a
// "nothing was sent" notice rather than a success message. Nothing is stored
// and no network request is made.
//
// It also logs the exact row it *would* have posted to PostgREST. That makes
// the field-to-column mapping in ../inquiry.js verifiable in the browser while
// the site is under construction, with no backend, no credentials and no email
// infrastructure — which is the whole point of having this mode.
// ============================================================================

import { buildInquiryRow } from "../inquiry.js";

export async function submit(formName, values) {
  try {
    const row = buildInquiryRow(formName, values);
    // Grouped so it is easy to spot, and easy to ignore.
    console.groupCollapsed(`[submit/demo] ${formName} — not sent (demo mode)`);
    console.info("Row that would be POSTed to PostgREST:", row);
    console.groupEnd();
  } catch (err) {
    // A mapping error is a real bug worth surfacing during development, but it
    // must not crash the form.
    console.error("[submit/demo] could not build inquiry row", err);
  }

  return { status: "demo" };
}
