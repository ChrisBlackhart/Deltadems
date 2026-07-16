import { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { Field } from "./Field.jsx";
import { Button } from "../ui/Button.jsx";
import styles from "./forms.module.css";

const interests = [
  "Knocking doors",
  "Calls & texts",
  "Events & booths",
  "Voter registration",
  "Online / digital help",
  "Hospitality & setup",
];

export function VolunteerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 aria-hidden="true" />
        <span>
          <strong>Welcome aboard — thank you!</strong>
          We'll reach out about upcoming opportunities that match your interests.
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
        <Field id="v-name" label="Name" required placeholder="Your name" autoComplete="name" />
        <Field
          id="v-email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div className={styles.row}>
        <Field id="v-phone" label="Phone (optional)" type="tel" placeholder="(906) 555-0123" />
        <Field
          id="v-availability"
          label="Best availability"
          options={["Weekdays", "Weeknights", "Weekends", "Flexible / remote"]}
        />
      </div>

      <fieldset className={styles.field} style={{ border: 0, padding: 0 }}>
        <legend className={styles.label}>What sounds good to you?</legend>
        <div className={styles.checkGrid}>
          {interests.map((label, i) => (
            <label key={label} className={styles.check}>
              <input type="checkbox" name={`interest-${i}`} /> {label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id="v-note"
        label="Anything else? (optional)"
        textarea
        placeholder="Skills, questions, or when you'd like to start."
      />

      <div>
        <Button type="submit" variant="primary">
          <Send aria-hidden="true" /> Sign me up
        </Button>
      </div>
      <p className={styles.note}>
        <Info aria-hidden="true" /> Demonstration form — submissions aren't sent yet.
      </p>
    </form>
  );
}
