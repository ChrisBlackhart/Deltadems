import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { ContentPending } from "../components/sections/ContentPending.jsx";
import { votingHomeUrl } from "../data/resources.js";
import pg from "./pages.module.css";

/**
 * Candidates & elected officials.
 *
 * Deliberately holds no names. The committee's own site says "TBD — this page
 * will be updated when candidates are announced", and which candidates a party
 * committee supports is an endorsement decision only the committee can make.
 * Elected-office holders change with every election and would need to be
 * verified against official sources and signed off before publication.
 *
 * So this page ships honest and empty rather than plausible and invented. See
 * src/data/officials.js, which is retained but no longer rendered.
 */
export default function Candidates() {
  useSeo(
    "Candidates & Officials",
    "Candidate and elected-official information for Delta County — and how to look up exactly who represents your address in Michigan."
  );

  return (
    <>
      <PageHeader eyebrow="On the ballot" title="Candidates & elected officials">
        Who's running, and who currently represents Delta County.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="This cycle" title="Candidates" />
          <div className={pg.center} />
          <ContentPending
            title="No candidates announced yet"
            message="We'll list the Democrats on the ballot here once candidates are announced and the committee has met. Until then, the fastest way to hear first is to join our email list."
            action={{ label: "Get updates by email", to: "/get-involved/join" }}
          />
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <SectionHeading eyebrow="Serving now" title="Your elected officials" />
          <div className={pg.center} />
          <ContentPending
            title="We're confirming this list"
            message="Rather than publish office-holders we haven't verified, we're checking each one against official sources first. In the meantime you can look up everyone who represents your address on the State of Michigan's voter site."
            action={{ label: "Ask us anything", to: "/contact" }}
          />
          <p className={pg.helperNote}>
            Look up your own representatives at{" "}
            <a href={votingHomeUrl} target="_blank" rel="noreferrer">
              michigan.gov/vote
            </a>
            .
          </p>
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
