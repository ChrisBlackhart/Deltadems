// ============================================================================
// Submission provider registry.
//
// The application never knows how a form is delivered. It calls submitForm()
// and gets back one of three outcomes; everything provider-specific lives in a
// sibling module and is selected by `config.submitMode`.
//
// Adding a provider later — the eventual SPS notification system, a different
// host, a queue — means adding one file here and one mode name. No component,
// no form and no validation code changes.
//
// Every provider returns:
//   { status: "success" }            the submission is durably recorded
//   { status: "demo" }               deliberately not sent; the UI says so
//   { status: "error", message }     failed; message is safe to show a visitor
//
// "success" is a promise that the submission is SAFE, not that anyone has been
// emailed yet. On Genesis the committed database row is that promise.
// ============================================================================

import { config } from "../../config.js";
import * as demo from "./demo.js";
import * as genesis from "./genesis.js";
import * as vercel from "./vercel.js";

const PROVIDERS = {
  demo,
  genesis,
  "vercel-legacy": vercel,
};

export async function submitForm(formName, values) {
  const provider = PROVIDERS[config.submitMode];

  if (!provider) {
    console.error(
      `[submit] unknown submitMode "${config.submitMode}" — expected one of: ${Object.keys(
        PROVIDERS
      ).join(", ")}`
    );
    return {
      status: "error",
      message: "The form isn't configured correctly. Please email us directly for now.",
    };
  }

  return provider.submit(formName, values);
}
