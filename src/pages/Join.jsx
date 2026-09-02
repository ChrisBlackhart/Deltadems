import { Mail, CalendarClock, Users, Megaphone } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { NewsletterSignup } from "../components/forms/NewsletterSignup.jsx";
import { Button } from "../components/ui/Button.jsx";
import { site, meeting } from "../data/site.js";
import pg from "./pages.module.css";
import styles from "./Join.module.css";

/**
 * Join / Subscribe.
 *
 * Two different things live on this page and they are deliberately not
 * conflated. Subscribing to updates is a concrete action this site can take.
 * Becoming a *member* of a party committee is governed by the committee's own
 * bylaws, which we do not have — so the page points people at the committee to
 * ask, rather than stating membership terms we cannot source.
 */
const perks = [
  {
    icon: CalendarClock,
    title: "Meeting reminders",
    text: "A nudge before the first-Wednesday meeting, so it doesn't slip past you.",
  },
  {
    icon: Megaphone,
    title: "What's coming up",
    text: "Volunteer days, community events and deadlines worth knowing about.",
  },
  {
    icon: Users,
    title: "Neighbors, not strangers",
    text: "The people organizing here live here too. Most of us started by just turning up once.",
  },
];

export default function Join() {
  useSeo(
    "Join / Subscribe",
    "Subscribe to updates from the Delta County Democratic Party, or find out how to become a member of the committee."
  );

  return (
    <>
      <PageHeader eyebrow="Join / Subscribe" title="Become part of the Delta Dems">
        The easiest first step is our email list. If you want to go further and
        become a committee member, come talk to us.
      </PageHeader>

      <section className="section">
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading eyebrow="Why subscribe" title="Stay connected, stay involved">
              Occasional email about what's happening locally — the essentials,
              and nothing sold or shared.
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
                <strong>Want to become a member?</strong> Committee membership
                has its own requirements, so the best way to start is to come to
                a meeting or email us — we'll walk you through it.
              </p>
              <Button to="/events" variant="secondary" size="sm">
                See meeting details
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" size="sm">
                Email us
              </Button>
            </div>

            <p className={pg.helperNoteLeft}>
              Meetings are {meeting.cadence.toLowerCase()} at {meeting.time}, with
              social time from {meeting.socialTime}. You're welcome whether or not
              you're a member.
            </p>
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
