import styles from "./PersonCard.module.css";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

// Person card with an initials avatar (swap for real photos when available).
//
// RETAINED, CURRENTLY UNRENDERED. Nothing imports this today because the
// candidate, official and officer lists are empty pending the committee — see
// src/data/officials.js. It is kept rather than deleted because it is exactly
// what those pages need the moment real names arrive, and rebuilding it later
// would be redundant work.
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
