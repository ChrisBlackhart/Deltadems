import { CalendarPlus, MapPin, Video, Clock } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { meeting } from "../../data/site.js";
import { nextFirstWednesday, downloadMeetingIcs } from "../../lib/meeting.js";
import styles from "./NextMeetingBanner.module.css";

export function NextMeetingBanner() {
  const next = nextFirstWednesday();
  const weekday = next.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = next.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <section className={styles.band} aria-labelledby="next-meeting-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.badge}>
            <CalendarPlus aria-hidden="true" /> Next meeting
          </span>
          <h2 id="next-meeting-title" className={styles.date}>
            {weekday}, {monthDay}
          </h2>
          <ul className={styles.meta}>
            <li>
              <Clock aria-hidden="true" /> {meeting.time} · social from {meeting.socialTime}
            </li>
            <li>
              <MapPin aria-hidden="true" /> {meeting.venue}, {meeting.address}
            </li>
            <li>
              <Video aria-hidden="true" /> {meeting.online} — {meeting.onlineNote}
            </li>
          </ul>
          <p className={styles.note}>{meeting.note}</p>
        </div>

        <div className={styles.actions}>
          <Button variant="gold" onClick={() => downloadMeetingIcs(next)}>
            <CalendarPlus aria-hidden="true" /> Add to calendar
          </Button>
          <Button href={meeting.mapsUrl} variant="onDark">
            <MapPin aria-hidden="true" /> Get directions
          </Button>
        </div>
      </div>
    </section>
  );
}
