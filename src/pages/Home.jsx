import { ArrowRight, Vote, Mail, MapPin } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { Hero } from "../components/sections/Hero.jsx";
import { NextMeetingBanner } from "../components/sections/NextMeetingBanner.jsx";
import { InvolvementGrid } from "../components/sections/InvolvementGrid.jsx";
import { EventCard } from "../components/sections/EventCard.jsx";
import { EmptyState } from "../components/sections/EmptyState.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { Button } from "../components/ui/Button.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { NewsletterSignup } from "../components/forms/NewsletterSignup.jsx";
import { getUpcomingEvents } from "../lib/events.js";
import { votingSteps, votingHomeUrl } from "../data/resources.js";
import { mission, quickFacts } from "../data/about.js";
import { site } from "../data/site.js";
import pg from "./pages.module.css";
import styles from "./Home.module.css";

/**
 * Homepage.
 *
 * Section order answers, in order, the four questions a first-time visitor has:
 *   Hero            → who are these people, and what do they want from me?
 *   Next meeting    → when can I actually meet them?          (highest-value fact)
 *   Upcoming events → are they doing anything?
 *   Who we are      → can I trust them?
 *   Get involved    → how do I participate?
 *   Voting          → what can this site do for me right now?
 *   Stay connected  → how do I hear from them again?
 */
export default function Home() {
  useSeo(
    "",
    "The Delta County Democratic Party organizes neighbors across Michigan's Upper Peninsula. Find our next meeting, upcoming events, ways to volunteer, and voting resources."
  );

  const upcoming = getUpcomingEvents({ limit: 3 });

  return (
    <>
      <Hero />

      {/* 2 — Next meeting. Overlaps the hero wave so it reads as the first
             thing "inside" the page. */}
      <div className={styles.meetingWrap}>
        <div className="container">
          <NextMeetingBanner />
        </div>
      </div>

      {/* 3 — Upcoming events */}
      <section className="section" aria-labelledby="home-events">
        <div className="container">
          <div className={pg.headRow}>
            <SectionHeading eyebrow="What's next" title="Upcoming events" id="home-events">
              We're out in the community all year. Come find us.
            </SectionHeading>
            <Button to="/events" variant="secondary">
              View all events <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          {upcoming.length > 0 ? (
            <div className={pg.grid3}>
              {upcoming.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* 4 — Who we are */}
      <section className="section section--tinted" aria-labelledby="home-about">
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Local Democrats, rooted in the U.P."
              id="home-about"
            >
              {mission}
            </SectionHeading>
            <div className={styles.aboutActions}>
              <Button to="/about" variant="primary">
                More about us <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
          <ul className={styles.facts}>
            {quickFacts.map((f) => (
              <li key={f.id}>
                <span className={styles.factValue}>{f.value}</span>
                <span className={styles.factLabel}>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Get involved */}
      <section className="section" aria-labelledby="home-involved">
        <div className="container">
          <SectionHeading
            eyebrow="Start here"
            title="Ways to get involved"
            align="center"
            id="home-involved"
          >
            However much time you have, there's a way to make a difference close to
            home.
          </SectionHeading>
          <div className={styles.involvement}>
            <InvolvementGrid />
          </div>
        </div>
      </section>

      {/* 6 — Voting resources */}
      <section className="section section--tinted" aria-labelledby="home-voting">
        <div className="container">
          <SectionHeading
            eyebrow="Be ready to vote"
            title="Voting resources for Delta County"
            align="center"
            id="home-voting"
          >
            Register, check your registration, request an absentee ballot, and find
            your local clerk.
          </SectionHeading>
          <div className={styles.center} />
          <div className={pg.grid4}>
            {votingSteps.map((s) => (
              <FeatureCard
                key={s.id}
                icon={s.icon}
                title={s.title}
                text={s.text}
                link={s.url}
                linkLabel={s.linkLabel}
              />
            ))}
          </div>
          <div className={styles.centerBtn}>
            <Button to="/voting" variant="primary">
              <Vote aria-hidden="true" /> All voting resources
            </Button>
          </div>
          <p className={styles.verifyNote}>
            Official State of Michigan resources, straight from{" "}
            <a href={votingHomeUrl} target="_blank" rel="noreferrer">
              michigan.gov/vote
            </a>
            .
          </p>
        </div>
      </section>

      {/* 7 — Stay connected */}
      <section className="section" aria-labelledby="home-connect">
        <div className={`container ${pg.split}`}>
          <div>
            <p className="eyebrow">
              <Mail aria-hidden="true" size={16} /> Stay connected
            </p>
            <h2 className={styles.subscribeTitle} id="home-connect">
              Get meeting reminders & local updates
            </h2>
            <p className={styles.subscribeText}>
              A couple of emails a month — event invites, volunteer opportunities,
              and important deadlines.
            </p>
            <ul className={styles.contactAlt}>
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                {site.mailing.full}
              </li>
            </ul>
          </div>
          <div className={pg.panel}>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
