import { Home, CalendarClock } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { Button } from "../components/ui/Button.jsx";
import { LighthouseMark } from "../components/ui/Logo.jsx";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useSeo("Page not found", "The page you're looking for couldn't be found.");

  return (
    <section className={styles.wrap}>
      <div className="container">
        <span className={styles.mark} aria-hidden="true">
          <LighthouseMark size={72} />
        </span>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page drifted out to sea</h1>
        <p className={styles.text}>
          We couldn't find what you were looking for — but our lighthouse can guide
          you back to shore.
        </p>
        <div className={styles.actions}>
          <Button to="/" variant="primary">
            <Home aria-hidden="true" /> Back home
          </Button>
          <Button to="/events" variant="secondary">
            <CalendarClock aria-hidden="true" /> See events
          </Button>
        </div>
      </div>
    </section>
  );
}
