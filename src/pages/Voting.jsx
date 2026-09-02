import { CalendarCheck, Info, ArrowUpRight, Landmark } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import {
  votingSteps,
  votingMore,
  keyDates,
  votingHomeUrl,
  pollWorkerUrl,
} from "../data/resources.js";
import pg from "./pages.module.css";
import styles from "./Voting.module.css";

/**
 * Voting resources.
 *
 * Deliberately nonpartisan: every link points at a State of Michigan service
 * and serves any voter in Delta County regardless of party. No candidates, no
 * endorsements, no committee positions belong on this page.
 */
export default function Voting() {
  useSeo(
    "Voting Resources",
    "Register to vote, check your registration, preview your ballot, vote absentee, and find your clerk — official Michigan voting resources for Delta County."
  );

  return (
    <>
      <PageHeader eyebrow="Voting resources" title="Make your voice heard">
        Michigan has some of the most accessible voting laws in the country. Here's
        what you need, straight from the state's own election services.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Start here" title="The four things most people need" align="center">
            Every link goes directly to the Michigan Voter Information Center or
            the Secretary of State — never to us.
          </SectionHeading>
          <div className={pg.center} />
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
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <div className={pg.split}>
            <div>
              <SectionHeading eyebrow="Good to know" title="How voting works in Michigan" />
              <ul className={styles.dates}>
                {keyDates.map((d) => (
                  <li key={d.id}>
                    <span className={styles.dateIcon}>
                      <CalendarCheck aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{d.label}</strong>
                      <br />
                      {d.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className={styles.notice}>
              <Info aria-hidden="true" />
              <div>
                <h3>Your clerk has the final word</h3>
                <p>
                  Dates, polling places and drop box locations are set locally and
                  can change. Your city or township clerk is the authoritative
                  source for Delta County — confirm with them before Election Day.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="More help" title="If your situation is a little different">
            Early voting, accessible ballots, students, and voters serving or
            living overseas.
          </SectionHeading>
          <div className={pg.center} />
          <ul className={styles.moreList}>
            {votingMore.map((m) => (
              <li key={m.id}>
                <a href={m.url} target="_blank" rel="noreferrer" className={styles.moreLink}>
                  {m.title}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <span className={styles.moreText}>{m.text}</span>
              </li>
            ))}
          </ul>

          <div className={styles.pollWorker}>
            <span className={styles.pollIcon}>
              <Landmark aria-hidden="true" />
            </span>
            <div>
              <h3>Work the polls</h3>
              <p>
                Clerks hire and train election inspectors from both parties for
                every election. It's paid, nonpartisan, and one of the most
                concretely useful days you can give your community.
              </p>
            </div>
            <Button href={pollWorkerUrl} variant="secondary" size="sm">
              How to apply
            </Button>
          </div>

          <p className={pg.helperNote}>
            Everything on this page starts at{" "}
            <a href={votingHomeUrl} target="_blank" rel="noreferrer">
              michigan.gov/vote
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Help your neighbors vote, too"
        text="Registration drives and door knocking are the most direct way to make sure Delta County turns out."
        primary={{ label: "Volunteer with us", to: "/get-involved/volunteer" }}
        showDonate={false}
      />
    </>
  );
}
