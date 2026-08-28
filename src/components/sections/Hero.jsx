import { ArrowRight, CalendarClock, Users, MapPin } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { site } from "../../data/site.js";
import lighthouseHero from "../../assets/lighthouse-hero.jpg";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.beams} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <MapPin aria-hidden="true" /> {site.region}
          </span>
          <h1 className={styles.title}>
            Neighbors organizing for a stronger{" "}
            <span className={styles.highlight}>Delta County</span>
          </h1>
          <p className={styles.lede}>
            We're your local Democrats — meeting every month, showing up for our
            community year-round, and making it easy to get involved. There's a
            place for you here.
          </p>

          <div className={styles.actions}>
            <Button to="/get-involved" variant="gold" size="lg">
              Get involved <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/events" variant="onDark" size="lg">
              <CalendarClock aria-hidden="true" /> Find our next meeting
            </Button>
          </div>

          <ul className={styles.trust}>
            <li>
              <CalendarClock aria-hidden="true" />
              Meets 1st Wednesday monthly
            </li>
            <li>
              <Users aria-hidden="true" />
              Everyone welcome
            </li>
          </ul>
        </div>

        <div className={styles.art} aria-hidden="true">
          <img src={lighthouseHero} alt="" className={styles.artImg} />
        </div>
      </div>
      <div className={styles.wave} aria-hidden="true" />
    </section>
  );
}
