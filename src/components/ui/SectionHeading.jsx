import styles from "./SectionHeading.module.css";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  as: Tag = "h2",
  id,
}) {
  return (
    <div
      className={styles.wrap}
      data-align={align}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {children && <p className={styles.intro}>{children}</p>}
    </div>
  );
}
