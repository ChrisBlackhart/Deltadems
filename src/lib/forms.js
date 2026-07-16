// ============================================================================
// Form submission boundary + validation helpers.
//
// submitForm() is the single seam between the UI and a real delivery method.
// Today config.formMode is "demo": forms VALIDATE but do not send, and the UI
// tells the user so honestly (no false "message sent" claims, nothing stored).
//
// ---- To enable real delivery later (no form-component changes needed) ----
//   1. Choose an approved method: a Vercel serverless route (e.g. /api/contact)
//      or an approved form provider. Do NOT add a database.
//   2. Set config.formMode = "endpoint" and config.formsEndpoint to the route.
//   3. That route validates again server-side and delivers (email, etc.).
// The success/error states below already handle the "endpoint" path.
// ============================================================================

import { config } from "../config.js";

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function required(v) {
  return v && v.trim().length > 0;
}

// Returns one of: { status: "demo" } | { status: "success" } | { status: "error", message }
export async function submitForm(formName, data) {
  if (config.formMode !== "endpoint" || !config.formsEndpoint) {
    // Honest demo mode — acknowledge without claiming delivery.
    return { status: "demo" };
  }

  try {
    const res = await fetch(config.formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formName, ...data }),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}
