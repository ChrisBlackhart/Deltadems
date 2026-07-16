import styles from "./PersonCard.module.css";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

// Person card with an initials avatar placeholder (swap for real photos).
export function PersonCard({ name, office, blurb, compact = false }) {
  return (
    <article className={styles.card} data-compact={compact}>
      <span className={styles.avatar} aria-hidden="true">
        {initials(name)}
      </span>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {office && <p className={styles.office}>{office}</p>}
        {blurb && <p className={styles.blurb}>{blurb}</p>}
      </div>
    </article>
  );
}
