import { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { Button } from "../ui/Button.jsx";
import styles from "./forms.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 aria-hidden="true" />
        <span>
          <strong>Thanks for reaching out!</strong>
          We've received your message and someone will get back to you soon.
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
      <div className={styles.row}>
        <Field id="c-name" label="Name" required placeholder="Your name" autoComplete="name" />
        <Field
          id="c-email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div className={styles.row}>
        <Field id="c-phone" label="Phone (optional)" type="tel" placeholder="(906) 555-0123" />
        <Field
          id="c-topic"
          label="I'm reaching out about"
          options={[
            "General question",
            "Volunteering",
            "Membership",
            "Events",
            "Media / press",
            "Something else",
          ]}
        />
      </div>
      <Field
        id="c-message"
        label="Message"
        textarea
        required
        placeholder="How can we help?"
      />
      <div>
        <Button type="submit" variant="primary">
          <Send aria-hidden="true" /> Send message
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Demonstration form — submissions aren't sent yet.
      </p>
    </form>
  );
}
