import { useState } from "react";
import { submitForm } from "../../lib/forms.js";

// Small form state manager: controlled values, on-submit + on-blur validation,
// and submission status. `validate(values)` returns an { field: message } map.
// status: "idle" | "submitting" | "demo" | "success" | "error"
export function useForm({ name, initial, validate }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

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
    const found = validate(values);
    setErrors(found);
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}));

    if (Object.values(found).some(Boolean)) {
      // Move focus to the first invalid field for keyboard/AT users.
      const firstBad = Object.keys(found).find((k) => found[k]);
      if (firstBad) document.getElementById(firstBad)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitForm(name, values);
    if (result.status === "error") {
      setSubmitError(result.message || "Something went wrong. Please try again.");
      setStatus("error");
    } else {
      setStatus(result.status); // "demo" or "success"
    }
  };

  return { values, errors, touched, status, submitError, setField, handleBlur, handleSubmit };
}
