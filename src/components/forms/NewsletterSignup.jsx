import { Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { FormStatus } from "./FormStatus.jsx";
import { useForm } from "./useForm.js";
import { Button } from "../ui/Button.jsx";
import { required, isEmail } from "../../lib/forms.js";
import styles from "./forms.module.css";

const validate = (v) => ({
  "nl-email": !required(v["nl-email"])
    ? "Please enter your email."
    : isEmail(v["nl-email"])
    ? ""
    : "Please enter a valid email address.",
});

export function NewsletterSignup({ compact = false }) {
  const f = useForm({
    name: "newsletter",
    validate,
    initial: { "nl-name": "", "nl-email": "" },
  });

  const bind = (id) => ({
    value: f.values[id],
    onChange: (e) => f.setField(id, e.target.value),
    onBlur: () => f.handleBlur(id),
    error: f.touched[id] ? f.errors[id] : "",
  });

  if (f.status === "success" || f.status === "demo") {
    return (
      <FormStatus
        status={f.status}
        successTitle="You're on the list!"
        successText="We'll be in touch with meeting reminders and local updates."
        demoText="Your email was validated but not stored — signup isn't connected in this preview."
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={f.handleSubmit} noValidate>
      <FormStatus status={f.status} submitError={f.submitError} />
      <div className={compact ? styles.inline : styles.row}>
        <Field id="nl-name" label="First name" autoComplete="given-name" placeholder="Jamie" {...bind("nl-name")} />
        <Field id="nl-email" label="Email" type="email" required autoComplete="email" placeholder="you@example.com" {...bind("nl-email")} />
      </div>
      <div>
        <Button type="submit" variant="primary" disabled={f.status === "submitting"}>
          <Send aria-hidden="true" /> {f.status === "submitting" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Preview form — validates your input but doesn't send yet.
      </p>
    </form>
  );
}
