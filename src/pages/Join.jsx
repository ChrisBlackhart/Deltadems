import { Mail, CalendarClock, Users, Megaphone } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { NewsletterSignup } from "../components/forms/NewsletterSignup.jsx";
import { Button } from "../components/ui/Button.jsx";
import pg from "./pages.module.css";
import styles from "./Join.module.css";

const perks = [
  { icon: CalendarClock, title: "Meeting reminders", text: "Never miss our first-Wednesday gathering." },
  { icon: Megaphone, title: "Event invites", text: "Be first to hear about volunteer days and community events." },
  { icon: Users, title: "A real community", text: "Meet neighbors who care about the same things you do." },
];

export default function Join() {
  useSeo(
    "Join / Subscribe",
    "Join the Delta County Democratic Party or subscribe to our email list for meeting reminders, event invites, and local updates."
  );

  return (
    <>
      <PageHeader eyebrow="Join / Subscribe" title="Become part of the Delta Dems">
        Membership is open to anyone who shares our values. The easiest first step
        is to join our email list.
      </PageHeader>

      <section className="section">
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading eyebrow="Why subscribe" title="Stay connected, stay involved">
              We'll send a friendly note a couple of times a month — the essentials,
              never spam.
            </SectionHeading>
            <ul className={styles.perks}>
              {perks.map((p) => (
                <li key={p.title}>
                  <span className={styles.perkIcon}>
                    <p.icon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{p.title}</strong>
                    <br />
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.meetingCta}>
              <Mail aria-hidden="true" />
              <p>
                Prefer to meet us first? Everyone is welcome at our monthly meeting
                — no membership required.
              </p>
              <Button to="/events" variant="secondary" size="sm">
                See meeting details
              </Button>
            </div>
          </div>

          <div className={pg.panel} id="subscribe">
            <h2 style={{ fontSize: "var(--step-1)", marginBottom: "1rem" }}>
              Sign up for updates
            </h2>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
