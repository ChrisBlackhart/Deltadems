import { CalendarPlus } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { meeting } from "../../data/site.js";
import styles from "./EmptyState.module.css";

// Friendly fallback that still points people to the recurring meeting, so the
// org never looks inactive even when the calendar is momentarily empty.
export function EmptyState({
  title = "Nothing extra on the calendar right now",
  message = "Beyond our standing monthly meeting, we don't have anything else scheduled at the moment. Subscribe and we'll let you know as soon as we do.",
}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>
        <CalendarPlus aria-hidden="true" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      <p className={styles.meeting}>
        <strong>{meeting.cadence}</strong> · {meeting.time} · usually {meeting.venue}
      </p>
      <Button to="/get-involved/join" variant="secondary" size="sm">
        Get event updates
      </Button>
    </div>
  );
}
