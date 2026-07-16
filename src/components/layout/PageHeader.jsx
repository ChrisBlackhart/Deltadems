import styles from "./PageHeader.module.css";

// Navy banner used at the top of interior pages. The gold "beam" rays echo the
// lighthouse mark for a consistent identity.
export function PageHeader({ eyebrow, title, children }) {
  return (
    <section className={styles.header}>
      <div className={styles.beams} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {children && <p className={styles.lede}>{children}</p>}
      </div>
    </section>
  );
}
