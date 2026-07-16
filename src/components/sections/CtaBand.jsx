import { ArrowRight, Heart } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { site } from "../../data/site.js";
import styles from "./CtaBand.module.css";

// Reusable closing call-to-action. Defaults nudge involvement over donation,
// but both are always one click away.
export function CtaBand({
  title = "Ready to get involved?",
  text = "Come to a meeting, lend a hand, or just say hello. Delta County is stronger when neighbors show up for each other.",
  primary = { label: "Get involved", to: "/get-involved" },
  showDonate = true,
}) {
  return (
    <section className={styles.band}>
      <div className={styles.beams} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.sub}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Button to={primary.to} variant="gold" size="lg">
            {primary.label} <ArrowRight aria-hidden="true" />
          </Button>
          {showDonate && (
            <Button href={site.links.actblue} variant="onDark" size="lg">
              <Heart aria-hidden="true" /> Donate
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
