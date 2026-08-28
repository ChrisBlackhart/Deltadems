import { disclaimer, site } from "../../data/site.js";
import styles from "./CommitteeDisclaimer.module.css";

/**
 * Committee funding disclaimer.
 *
 * ⚠️  PROVISIONAL WORDING — PENDING COMPLIANCE VERIFICATION.
 *
 * The text rendered here is preserved verbatim from the organization's existing
 * website (see `disclaimer` in src/data/site.js). It has deliberately NOT been
 * rewritten, "corrected", or supplemented by the implementation.
 *
 * Final wording is a compliance decision for the committee's treasurer, in
 * consultation with Michigan Democratic Party compliance staff and/or counsel.
 * Do not edit the wording here — edit it in src/data/site.js once approved.
 *
 * `variant`:
 *   "footer"  — muted, on the dark footer (default)
 *   "inline"  — bordered block for use on a page body
 */
export function CommitteeDisclaimer({ variant = "footer", showAddress = false }) {
  return (
    <p className={styles.disclaimer} data-variant={variant}>
      <span>{disclaimer.text}</span>
      {showAddress && <span className={styles.address}>{site.mailing.full}</span>}
    </p>
  );
}
