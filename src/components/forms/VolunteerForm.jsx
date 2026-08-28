import { Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { FormStatus } from "./FormStatus.jsx";
import { HoneypotField } from "./HoneypotField.jsx";
import { useForm } from "./useForm.js";
import { Button } from "../ui/Button.jsx";
import { required, isEmail } from "../../lib/forms.js";
import styles from "./forms.module.css";

const interests = [
  "Knocking doors",
  "Calls & texts",
  "Events & booths",
  "Voter registration",
  "Online / digital help",
  "Hospitality & setup",
];

const validate = (v) => ({
  "v-name": required(v["v-name"]) ? "" : "Please enter your name.",
  "v-email": !required(v["v-email"])
    ? "Please enter your email."
    : isEmail(v["v-email"])
    ? ""
    : "Please enter a valid email address.",
});

export function VolunteerForm() {
  const f = useForm({
    name: "volunteer",
    validate,
    initial: {
      "v-name": "",
      "v-email": "",
      "v-phone": "",
      "v-availability": "Weekdays",
      "v-note": "",
      "v-interests": [],
    },
  });

  const bind = (id) => ({
    value: f.values[id],
    onChange: (e) => f.setField(id, e.target.value),
    onBlur: () => f.handleBlur(id),
    error: f.touched[id] ? f.errors[id] : "",
  });

  const toggleInterest = (label) => {
    const set = new Set(f.values["v-interests"]);
    if (set.has(label)) set.delete(label);
    else set.add(label);
    f.setField("v-interests", [...set]);
  };

  if (f.status === "success" || f.status === "demo") {
    return (
      <FormStatus
        status={f.status}
        successTitle="Welcome aboard — thank you!"
        successText="We'll reach out about opportunities that match your interests."
        demoText="Your info was validated but not sent — a delivery method isn't connected in this preview."
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={f.handleSubmit} noValidate>
      <HoneypotField {...f.honeypot} />
      <FormStatus status={f.status} submitError={f.submitError} />
      <div className={styles.row}>
        <Field id="v-name" label="Name" required autoComplete="name" placeholder="Your name" {...bind("v-name")} />
        <Field id="v-email" label="Email" type="email" required autoComplete="email" placeholder="you@example.com" {...bind("v-email")} />
      </div>
      <div className={styles.row}>
        <Field id="v-phone" label="Phone (optional)" type="tel" placeholder="(906) 555-0123" {...bind("v-phone")} />
        <Field
          id="v-availability"
          label="Best availability"
          options={["Weekdays", "Weeknights", "Weekends", "Flexible / remote"]}
          {...bind("v-availability")}
        />
      </div>

      <fieldset className={styles.field} style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className={styles.label}>What sounds good to you?</legend>
        <div className={styles.checkGrid}>
          {interests.map((label) => (
            <label key={label} className={styles.check}>
              <input
                type="checkbox"
                checked={f.values["v-interests"].includes(label)}
                onChange={() => toggleInterest(label)}
              />{" "}
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="v-note" label="Anything else? (optional)" textarea placeholder="Skills, questions, or when you'd like to start." {...bind("v-note")} />

      <div>
        <Button type="submit" variant="primary" disabled={f.status === "submitting"}>
          <Send aria-hidden="true" /> {f.status === "submitting" ? "Submitting…" : "Sign me up"}
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Preview form — validates your input but doesn't send yet.
      </p>
    </form>
  );
}
