import { Clock } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import styles from "./ContentPending.module.css";

/**
 * An honest "we don't have this yet" state.
 *
 * Used where the committee has not supplied real content — officers,
 * candidates, news. It exists because the alternative is worse: inventing
 * plausible names and posts would put fabricated people and claims on a real
 * political party's website.
 *
 * Deliberately reads as a considered editorial state rather than an error or a
 * broken page, and always offers somewhere useful to go instead.
 */
export function ContentPending({ title, message, action }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>
        <Clock aria-hidden="true" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {action && (
        <Button to={action.to} variant="secondary" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
