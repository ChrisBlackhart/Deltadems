import { Info } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { PersonCard } from "../components/ui/PersonCard.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { candidates, officials } from "../data/officials.js";
import pg from "./pages.module.css";

export default function Candidates() {
  useSeo(
    "Candidates & Officials",
    "Meet the Democratic candidates and elected officials representing Delta County and Michigan's Upper Peninsula."
  );

  return (
    <>
      <PageHeader eyebrow="On the ballot" title="Candidates & elected officials">
        Meet the Democrats working for Delta County — on the ballot this cycle and
        already serving our community.
      </PageHeader>

      <section className="section">
        <div className="container">
          <p className={pg.demoNote} style={{ marginBottom: "1.5rem" }}>
            <Info aria-hidden="true" /> Names and offices below are placeholders for
            this demonstration.
          </p>

          <SectionHeading eyebrow="This cycle" title="Candidates we support">
            Local Democrats running to represent us at every level of government.
          </SectionHeading>
          <div className={pg.center} />
          <div className={pg.grid3}>
            {candidates.map((c) => (
              <PersonCard key={c.id} name={c.name} office={c.office} blurb={c.blurb} />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <SectionHeading eyebrow="Serving now" title="Your elected officials">
            The Democrats currently representing Delta County and the U.P.
          </SectionHeading>
          <div className={pg.center} />
          <div className={pg.grid2}>
            {officials.map((o) => (
              <PersonCard key={o.id} name={o.name} office={o.office} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Help elect Democrats in Delta County"
        text="Volunteering for local candidates is the highest-impact thing you can do. Join us this season."
        primary={{ label: "Volunteer", to: "/get-involved/volunteer" }}
      />
    </>
  );
}
