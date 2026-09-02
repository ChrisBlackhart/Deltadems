import { Mail, MapPin, CalendarClock, Video } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { ContactForm } from "../components/forms/ContactForm.jsx";
import { SocialBar } from "../components/ui/SocialBar.jsx";
import { site, meeting } from "../data/site.js";
import pg from "./pages.module.css";
import styles from "./Contact.module.css";

export default function Contact() {
  useSeo(
    "Contact",
    "Get in touch with the Delta County Democratic Party. Email us, find our mailing address, or join us at our monthly meeting in Escanaba."
  );

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch">
        Questions, ideas, or just want to say hello? We'd love to hear from you.
      </PageHeader>

      <section className="section">
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading eyebrow="Reach us" title="Ways to connect" />
            <ul className={styles.contactList}>
              <li>
                <span className={styles.icon}>
                  <Mail aria-hidden="true" />
                </span>
                <span>
                  <strong>Email</strong>
                  <br />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
              </li>
              <li>
                <span className={styles.icon}>
                  <MapPin aria-hidden="true" />
                </span>
                <span>
                  <strong>Mailing address</strong>
                  <br />
                  {site.mailing.lines[0]}, {site.mailing.lines[1]}
                </span>
              </li>
              <li>
                <span className={styles.icon}>
                  <CalendarClock aria-hidden="true" />
                </span>
                <span>
                  <strong>Monthly meeting</strong>
                  <br />
                  {meeting.cadence}, {meeting.time} (social from{" "}
                  {meeting.socialTime})
                  <br />
                  Usually {meeting.venue}, {meeting.address}
                </span>
              </li>
              <li>
                <span className={styles.icon}>
                  <Video aria-hidden="true" />
                </span>
                <span>
                  <strong>Can't make it in person?</strong>
                  <br />
                  {meeting.online} — email us for the link.
                </span>
              </li>
            </ul>

            <div className={styles.social}>
              <p className={styles.socialLabel}>Follow along</p>
              <SocialBar tone="light" />
            </div>
          </div>

          <div className={pg.panel}>
            <h2 className={pg.panelTitle}>
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
