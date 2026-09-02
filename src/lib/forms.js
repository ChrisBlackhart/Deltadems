// ============================================================================
// Form validation helpers, and the public submission entry point.
//
// submitForm() is re-exported from ./submit, which chooses a delivery provider
// from config.submitMode. Components and useForm import from here and stay
// unaware of how — or whether — a submission is delivered.
// ============================================================================

export { submitForm } from "./submit/index.js";

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function required(v) {
  return v && v.trim().length > 0;
}
