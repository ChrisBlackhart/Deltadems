import { Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { FormStatus } from "./FormStatus.jsx";
import { useForm } from "./useForm.js";
import { Button } from "../ui/Button.jsx";
import { required, isEmail } from "../../lib/forms.js";
import styles from "./forms.module.css";

const validate = (v) => ({
  "c-name": required(v["c-name"]) ? "" : "Please enter your name.",
  "c-email": !required(v["c-email"])
    ? "Please enter your email."
    : isEmail(v["c-email"])
    ? ""
    : "Please enter a valid email address.",
  "c-message": required(v["c-message"]) ? "" : "Please enter a message.",
});

export function ContactForm() {
  const f = useForm({
    name: "contact",
    validate,
    initial: {
      "c-name": "",
      "c-email": "",
      "c-phone": "",
      "c-topic": "General question",
      "c-message": "",
    },
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
        successTitle="Thanks for reaching out!"
        successText="We've received your message and will get back to you soon."
        demoText="Your message was validated but not delivered — a delivery method isn't connected in this preview."
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={f.handleSubmit} noValidate>
      <FormStatus status={f.status} submitError={f.submitError} />
      <div className={styles.row}>
        <Field id="c-name" label="Name" required autoComplete="name" placeholder="Your name" {...bind("c-name")} />
        <Field id="c-email" label="Email" type="email" required autoComplete="email" placeholder="you@example.com" {...bind("c-email")} />
      </div>
      <div className={styles.row}>
        <Field id="c-phone" label="Phone (optional)" type="tel" placeholder="(906) 555-0123" {...bind("c-phone")} />
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
          {...bind("c-topic")}
        />
      </div>
      <Field id="c-message" label="Message" textarea required placeholder="How can we help?" {...bind("c-message")} />
      <div>
        <Button type="submit" variant="primary" disabled={f.status === "submitting"}>
          <Send aria-hidden="true" /> {f.status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Preview form — validates your input but doesn't send yet.
      </p>
    </form>
  );
}
