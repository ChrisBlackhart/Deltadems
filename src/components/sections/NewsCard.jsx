import { ArrowRight } from "lucide-react";
import { Tag } from "../ui/Tag.jsx";
import { formatDate } from "../../lib/date.js";
import styles from "./NewsCard.module.css";

export function NewsCard({ item }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <Tag>{item.category}</Tag>
        <time className={styles.date}>{formatDate(item.date)}, 2026</time>
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.excerpt}>{item.excerpt}</p>
      <span className={styles.more}>
        Read more <ArrowRight aria-hidden="true" />
      </span>
    </article>
  );
}
