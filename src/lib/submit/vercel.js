// ============================================================================
// LEGACY — Vercel serverless provider. Scheduled for removal at Genesis cutover.
//
// Posts to api/submit.js, which delivers by Gmail SMTP via nodemailer. Kept
// only so the existing Vercel preview deployment keeps working while the site
// is built; it is not the target architecture.
//
// THIS PATH CANNOT RUN ON GENESIS. DigitalOcean blocks outbound SMTP on 25,
// 465 and 587 from the Genesis droplet — measured port-by-port in the
// infrastructure repo's STAGE_6A_REPORT.md. Only Resend's alternate port 2587
// and api.resend.com:443 were reachable, and Gmail publishes no equivalent
// alternate port. So this provider, api/submit.js and the nodemailer
// dependency all retire together when the Genesis path goes live.
//
// It is isolated behind this module so nothing in the application imports it
// or depends on its shape.
// ============================================================================

import { config } from "../../config.js";

export function isConfigured() {
  return Boolean(config.vercelLegacy?.endpoint);
}

export async function submit(formName, values) {
  if (!isConfigured()) {
    console.error("[submit/vercel] no endpoint configured");
    return {
      status: "error",
      message: "The form isn't connected yet. Please email us directly for now.",
    };
  }

  try {
    const res = await fetch(config.vercelLegacy.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formName, ...values }),
    });

    // The endpoint always returns a JSON body, even on failure — prefer its
    // message, which is written to be safe to show a visitor.
    let payload = null;
    try {
      payload = await res.json();
    } catch {
      // Non-JSON (e.g. a platform error page) — fall through to the generic message.
    }

    if (!res.ok || !payload?.ok) {
      throw new Error(
        payload?.error || `Something went wrong (${res.status}). Please try again.`
      );
    }
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}
