import { MapPin, Clock, Video } from "lucide-react";
import { Tag } from "../ui/Tag.jsx";
import { dateParts, formatRange } from "../../lib/date.js";
import styles from "./EventCard.module.css";

export function EventCard({ event, featured = false }) {
  const { month, day, weekday } = dateParts(event.date);

  return (
    <article className={styles.card} data-featured={featured}>
      <div className={styles.date} aria-hidden="true">
        <span className={styles.month}>{month}</span>
        <span className={styles.day}>{day}</span>
        <span className={styles.weekday}>{weekday}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          <Tag>{event.category}</Tag>
          {event.online && <Tag tone="teal">Zoom option</Tag>}
        </div>

        <h3 className={styles.title}>{event.title}</h3>

        <ul className={styles.meta}>
          <li>
            <Clock aria-hidden="true" />
            <span>
              {formatRange(event.date, event.endDate)}
              {event.start ? ` · ${event.start}` : ""}
              {event.end ? `–${event.end}` : ""}
            </span>
          </li>
          <li>
            <MapPin aria-hidden="true" />
            <span>{event.location}</span>
          </li>
          {event.doors && (
            <li>
              <Video aria-hidden="true" />
              <span>Social time from {event.doors}</span>
            </li>
          )}
        </ul>

        {event.summary && <p className={styles.summary}>{event.summary}</p>}
      </div>
    </article>
  );
}
