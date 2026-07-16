import { CalendarCheck, Info } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { votingSteps, keyDates } from "../data/resources.js";
import pg from "./pages.module.css";
import styles from "./Voting.module.css";

export default function Voting() {
  useSeo(
    "Voting Resources",
    "Register to vote, check your registration, request an absentee ballot, and find your clerk. Voting resources for Delta County and Michigan."
  );

  return (
    <>
      <PageHeader eyebrow="Voting resources" title="Make your voice heard">
        Michigan makes it easier than ever to vote. Here's everything you need to
        be ready for the next election.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Get ready" title="Register, check & request" align="center">
            These links go straight to the official Michigan Secretary of State
            tools.
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
              <SectionHeading eyebrow="Good to know" title="Key voting facts for Michigan" />
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
                <h3>Verify before Election Day</h3>
                <p>
                  Deadlines and polling locations can change. Always confirm the
                  details with your local Delta County clerk or Michigan.gov/Vote
                  before you head out.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        title="Help your neighbors vote, too"
        text="Join a voter registration drive or help knock doors this season. It's the most direct way to strengthen our democracy."
        primary={{ label: "Volunteer with us", to: "/get-involved/volunteer" }}
        showDonate={false}
      />
    </>
  );
}
