import { ArrowUpRight } from "lucide-react";
import { Icon } from "./Icon.jsx";
import styles from "./FeatureCard.module.css";

// Reusable icon + title + text card. Optionally shows a time chip (volunteer
// roles) and/or an external resource link (voting resources).
export function FeatureCard({ icon, title, text, chip, link, linkLabel }) {
  return (
    <article className={styles.card}>
      <span className={styles.icon}>
        <Icon name={icon} />
      </span>
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {chip && <span className={styles.chip}>{chip}</span>}
      </div>
      <p className={styles.text}>{text}</p>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className={styles.link}>
          {linkLabel} <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </article>
  );
}
