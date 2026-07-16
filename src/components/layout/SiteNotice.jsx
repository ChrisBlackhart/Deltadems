import { useState } from "react";
import { Info, X } from "lucide-react";
import { config } from "../../config.js";
import styles from "./SiteNotice.module.css";

// Pre-launch banner: makes clear this is a redesign concept, not the official
// Delta County Democratic Party website. Controlled by `config.showConceptNotice`
// — set it to false (one change) to remove before launch.
export function SiteNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (!config.showConceptNotice || dismissed) return null;

  return (
    <div className={styles.notice} role="region" aria-label="Site status">
      <p className={styles.text}>
        <Info aria-hidden="true" />
        <span>
          <strong>Redesign concept —</strong> this is a work-in-progress preview,
          not the official Delta County Democratic Party website.
        </span>
      </p>
      <button
        type="button"
        className={styles.close}
        onClick={() => setDismissed(true)}
      >
        <X aria-hidden="true" />
        <span className="visually-hidden">Dismiss notice</span>
      </button>
    </div>
  );
}
