import { Link } from "react-router-dom";
import { ArrowRight, Vote, Mail } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { Hero } from "../components/sections/Hero.jsx";
import { NextMeetingBanner } from "../components/sections/NextMeetingBanner.jsx";
import { InvolvementGrid } from "../components/sections/InvolvementGrid.jsx";
import { EventCard } from "../components/sections/EventCard.jsx";
import { EmptyState } from "../components/sections/EmptyState.jsx";
import { NewsCard } from "../components/sections/NewsCard.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { Button } from "../components/ui/Button.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { NewsletterSignup } from "../components/forms/NewsletterSignup.jsx";
import { events } from "../data/events.js";
import { news } from "../data/news.js";
import { votingSteps } from "../data/resources.js";
import { mission, quickFacts } from "../data/about.js";
import pg from "./pages.module.css";
import styles from "./Home.module.css";

export default function Home() {
  useSeo(
    "",
    "The Delta County Democratic Party organizes neighbors across Michigan's Upper Peninsula. Find our next meeting, upcoming events, ways to volunteer, and voting resources."
  );

  const upcoming = events.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Next meeting — overlaps the hero wave */}
      <div className={styles.meetingWrap}>
        <div className="container">
          <NextMeetingBanner />
        </div>
      </div>

      {/* Ways to get involved */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Start here"
            title="Ways to get involved"
            align="center"
          >
            However much time you have, there's a way to make a difference close
            to home.
          </SectionHeading>
          <div className={styles.involvement}>
            <InvolvementGrid />
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className={`section ${styles.tinted}`}>
        <div className="container">
          <div className={pg.headRow}>
            <SectionHeading eyebrow="What's next" title="Upcoming events">
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

      {/* About teaser */}
      <section className="section">
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading eyebrow="Who we are" title="Local Democrats, rooted in the U.P.">
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

      {/* Voting resources highlight */}
      <section className={`section ${styles.tinted}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Be ready to vote"
            title="Voting resources for Delta County"
            align="center"
          >
            Everything you need to register, request an absentee ballot, and make
            your voice heard in Michigan.
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
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <div className={pg.headRow}>
            <SectionHeading eyebrow="Latest updates" title="News & announcements">
              Proof we don't disappear between elections.
            </SectionHeading>
            <Button to="/news" variant="secondary">
              All news <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <div className={pg.grid3}>
            {news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`section ${styles.tinted}`}>
        <div className={`container ${pg.split}`}>
          <div>
            <span className="eyebrow">
              <Mail aria-hidden="true" size={16} /> Stay in the loop
            </span>
            <h2 className={styles.subscribeTitle}>
              Get meeting reminders & local updates
            </h2>
            <p className={styles.subscribeText}>
              One friendly email a couple times a month — event invites, volunteer
              opportunities, and important deadlines. No spam, ever.
            </p>
          </div>
          <div className={pg.panel}>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
