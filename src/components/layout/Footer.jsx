import { Link } from "react-router-dom";
import { Mail, MapPin, CalendarClock, Heart } from "lucide-react";
import { DeltaDemsBadge } from "../ui/DeltaDemsBadge.jsx";
import { SocialBar } from "../ui/SocialBar.jsx";
import { CommitteeDisclaimer } from "../ui/CommitteeDisclaimer.jsx";
import { Button } from "../ui/Button.jsx";
import { footerNav } from "../../data/nav.js";
import { site, meeting } from "../../data/site.js";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} onDarkSurface`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <span className={styles.brandRow}>
            <DeltaDemsBadge size={40} />
            <span className={styles.brandText}>
              <strong>Delta County</strong>
              <span>Democratic Party</span>
            </span>
          </span>
          <p className={styles.tagline}>{site.tagline}</p>
          <SocialBar tone="dark" />
        </div>

        {footerNav.map((col) => (
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
                {meeting.cadence}
                <br />
                {meeting.time} · {meeting.venue}, Escanaba
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
          <Button href={site.ctas.donate} variant="gold" size="sm" className={styles.donate}>
            <Heart aria-hidden="true" /> Donate
          </Button>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <CommitteeDisclaimer variant="footer" showAddress />
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
