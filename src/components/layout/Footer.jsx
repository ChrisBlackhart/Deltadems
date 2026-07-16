import { Link } from "react-router-dom";
import { Mail, MapPin, CalendarClock } from "lucide-react";
import { Logo } from "../ui/Logo.jsx";
import { SocialBar } from "../ui/SocialBar.jsx";
import { site, meeting } from "../../data/site.js";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Events", to: "/events" },
      { label: "News", to: "/news" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Volunteer", to: "/get-involved/volunteer" },
      { label: "Join / Subscribe", to: "/get-involved/join" },
      { label: "Voting resources", to: "/voting" },
      { label: "Candidates", to: "/candidates" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Logo tone="light" />
          <p className={styles.tagline}>{site.tagline}</p>
          <SocialBar tone="dark" />
        </div>

        {columns.map((col) => (
          <nav key={col.title} className={styles.linksCol} aria-label={col.title}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.contactCol}>
          <h2 className={styles.colTitle}>Reach us</h2>
          <ul className={styles.contactList}>
            <li>
              <CalendarClock aria-hidden="true" />
              <span>
                {meeting.cadence}, {meeting.time}
                <br />
                {meeting.venue}, Escanaba
              </span>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>
                {site.mailing.lines[0]}
                <br />
                {site.mailing.lines[1]}
              </span>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.disclaimer}>{site.disclaimer}</p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
