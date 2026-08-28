import { ArrowRight, CalendarClock, Heart, MapPin } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { site } from "../../data/site.js";
import lighthouseHero from "../../assets/lighthouse-hero.jpg";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`${styles.hero} onDarkSurface`} aria-labelledby="hero-title">
      <div className={styles.beams} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <MapPin aria-hidden="true" /> {site.region}
          </p>
          <h1 id="hero-title" className={styles.title}>
            Neighbors organizing for a stronger{" "}
            <span className={styles.highlight}>Delta County</span>
          </h1>
          <p className={styles.lede}>
            We meet every month, show up for our community year-round, and make it
            easy to get involved.
          </p>

          <div className={styles.actions}>
            <Button to="/events" variant="gold" size="lg">
              <CalendarClock aria-hidden="true" /> Attend a meeting
            </Button>
            <Button to="/get-involved" variant="onDark" size="lg">
              Get involved <ArrowRight aria-hidden="true" />
            </Button>
            <Button href={site.ctas.donate} variant="onDark" size="lg">
              <Heart aria-hidden="true" /> Donate
            </Button>
          </div>
        </div>

        <div className={styles.art}>
          <img
            src={lighthouseHero}
            alt="Sand Point Lighthouse in Escanaba, Michigan"
            className={styles.artImg}
            width="960"
            height="720"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
      <div className={styles.wave} aria-hidden="true" />
    </section>
  );
}
