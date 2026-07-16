import styles from "./Tag.module.css";

// Category → color mapping keeps event/news tags consistent across the site.
const toneByCategory = {
  Meeting: "navy",
  Volunteer: "blue",
  Fundraiser: "gold",
  Community: "teal",
  Social: "rose",
  Announcement: "blue",
  "Party News": "navy",
  Recap: "teal",
};

export function Tag({ children, tone }) {
  const resolved = tone || toneByCategory[children] || "navy";
  return (
    <span className={styles.tag} data-tone={resolved}>
      {children}
    </span>
  );
}
