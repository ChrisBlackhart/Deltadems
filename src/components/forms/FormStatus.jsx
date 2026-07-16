import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import styles from "./forms.module.css";

// Renders the honest terminal state of a form. In demo mode we acknowledge the
// input WITHOUT claiming the message was delivered.
export function FormStatus({ status, submitError, successTitle, successText, demoText }) {
  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 aria-hidden="true" />
        <span>
          <strong>{successTitle}</strong>
          {successText}
        </span>
      </div>
    );
  }

  if (status === "demo") {
    return (
      <div className={styles.demo} role="status">
        <Info aria-hidden="true" />
        <span>
          <strong>Demonstration only — nothing was sent.</strong>
          {demoText}
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.errorBox} role="alert">
        <AlertTriangle aria-hidden="true" />
        <span>
          <strong>We couldn't submit that.</strong>
          {submitError}
        </span>
      </div>
    );
  }

  return null;
}
