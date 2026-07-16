import { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { Button } from "../ui/Button.jsx";
import styles from "./forms.module.css";

// Visual-only email signup. On submit it shows a local success state — no data
// is sent anywhere (see the demo note).
export function NewsletterSignup({ compact = false }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 aria-hidden="true" />
        <span>
          <strong>You're on the list!</strong>
          We'll be in touch with meeting reminders and local updates.
        </span>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      noValidate
    >
      <div className={compact ? styles.inline : styles.row}>
        <Field id="nl-name" label="First name" placeholder="Jamie" autoComplete="given-name" />
        <Field
          id="nl-email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <Button type="submit" variant="primary">
          <Send aria-hidden="true" /> Subscribe
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Demonstration form — submissions aren't sent yet.
      </p>
    </form>
  );
}
