import { CalendarClock, MapPin, Video } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { ContentPending } from "../components/sections/ContentPending.jsx";
import { PartnerList } from "../components/sections/PartnerList.jsx";
import { mission, values } from "../data/about.js";
import { site, meeting } from "../data/site.js";
import pg from "./pages.module.css";

export default function About() {
  useSeo(
    "About Us",
    "Learn about the Delta County Democratic Party — who we are, what we value, and how to get involved with Democrats across Michigan's Upper Peninsula."
  );

  return (
    <>
      <PageHeader eyebrow="About us" title="Local Democrats, rooted in the U.P.">
        We organize where we live — from Escanaba to Gladstone and every township
        in between.
      </PageHeader>

      <section className="section">
        <div className={`container ${pg.split}`}>
          <div className={pg.prose}>
            <p>{mission}</p>
            <p>
              In practice, that mostly looks like showing up. We meet on the
              first Wednesday of every month at 7:00&nbsp;PM, with social time
              from 6:30 — the same standing schedule we've kept year after year.
              Whether you've knocked doors for decades or have never been to a
              political meeting in your life, you're welcome at it.
            </p>
            <p>
              We're part of the{" "}
              <a href={site.ctas.michiganDems} target="_blank" rel="noreferrer">
                Michigan Democratic Party
              </a>
              , and one of a number of county parties organizing across the Upper
              Peninsula — neighbors doing the same work in their own communities,
              listed further down this page.
            </p>
          </div>

          <aside className={pg.panelDark}>
            <h2 className={pg.panelTitle}>
              When & where we meet
            </h2>
            <ul className={pg.meetingList}>
              <li>
                <CalendarClock aria-hidden="true" />
                <span>
                  <strong>{meeting.cadence}</strong>
                  <br /> {meeting.time} (social from {meeting.socialTime})
                </span>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <span>
                  <strong>Usually {meeting.venue}</strong>
                  <br /> {meeting.address}
                </span>
              </li>
              <li>
                <Video aria-hidden="true" />
                <span>{meeting.online}</span>
              </li>
            </ul>
            <div style={{ marginTop: "1.5rem" }}>
              <Button to="/events" variant="gold">
                See upcoming meetings
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <SectionHeading eyebrow="What we stand for" title="Our values" align="center" />
          <div className={pg.center} />
          <div className={pg.grid4}>
            {values.map((v) => (
              <FeatureCard key={v.id} icon={v.icon} title={v.title} text={v.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Your officers" title="Party leadership" />
          <div className={pg.center} />
          <ContentPending
            title="Officer names are coming soon"
            message="Our elected officers keep the committee running month to month. We're confirming names, roles and photos before publishing them here."
            action={{ label: "Ask us who to talk to", to: "/contact" }}
          />
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Across the U.P."
            title="Our neighboring county parties"
          >
            Delta County is one of many U.P. communities organizing. If you've
            moved, or you're closer to another county, start with them.
          </SectionHeading>
          <div className={pg.center} />
          <PartnerList />
        </div>
      </section>

      <CtaBand
        title="Come see us in person"
        text="The best way to get to know us is to show up. Our next meeting is open to everyone."
        primary={{ label: "Find our next meeting", to: "/events" }}
      />
    </>
  );
}
