import { useRef, useState } from "react";
import { submitForm } from "../../lib/forms.js";

// Shared honeypot field name. A real <input> (not type="hidden") named after a
// field bots commonly auto-fill — legitimate visitors never see or reach it
// (see HoneypotField.jsx), so any value here means an automated submission.
export const HONEYPOT_FIELD = "website";

// Small form state manager: controlled values, on-submit + on-blur validation,
// and submission status. `validate(values)` returns an { field: message } map.
// status: "idle" | "submitting" | "demo" | "success" | "error"
export function useForm({ name, initial, validate }) {
  const [values, setValues] = useState({ ...initial, [HONEYPOT_FIELD]: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  // Captured once, at first render — used server-side as a spam-timing signal.
  // A real person needs at least a couple of seconds to read and fill a form;
  // a bot that posts within a few hundred ms almost certainly isn't one.
  const renderedAtRef = useRef(Date.now());

  // A synchronous, immediately-updated lock against duplicate submission.
  // The `status === "submitting"` React state (and the submit button's
  // `disabled` prop derived from it) is NOT enough on its own: several rapid
  // clicks/Enter-presses in the same tick all run handleSubmit against the
  // same pre-re-render closure, before React has painted the disabled button
  // or updated `status` — a ref is read/written synchronously, so it closes
  // that gap regardless of render timing.
  const submittingRef = useRef(false);

  const setField = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      const next = validate({ ...values, [field]: value });
      setErrors((e) => ({ ...e, [field]: next[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const next = validate(values);
    setErrors((e) => ({ ...e, [field]: next[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Synchronous guard — see submittingRef's comment above.
    if (submittingRef.current) return;

    const found = validate(values);
    setErrors(found);
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}));

    if (Object.values(found).some(Boolean)) {
      // Move focus to the first invalid field for keyboard/AT users.
      const firstBad = Object.keys(found).find((k) => found[k]);
      if (firstBad) document.getElementById(firstBad)?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    try {
      const elapsedMs = Date.now() - renderedAtRef.current;
      const result = await submitForm(name, { ...values, elapsedMs });

      if (result.status === "error") {
        // Input is intentionally preserved (no reset) so the visitor doesn't
        // have to retype anything after a failed submission.
        setSubmitError(result.message || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        // Only a confirmed "success" (or the honest "demo" acknowledgement)
        // clears the form — never on error.
        setStatus(result.status); // "demo" or "success"
      }
    } finally {
      // Reset even on success/demo: harmless there (the form unmounts in
      // favor of FormStatus), and necessary so a retry after an error isn't
      // permanently locked out.
      submittingRef.current = false;
    }
  };

  const honeypot = {
    name: HONEYPOT_FIELD,
    value: values[HONEYPOT_FIELD],
    onChange: (e) => setField(HONEYPOT_FIELD, e.target.value),
  };

  return {
    values,
    errors,
    touched,
    status,
    submitError,
    setField,
    handleBlur,
    handleSubmit,
    honeypot,
  };
}
