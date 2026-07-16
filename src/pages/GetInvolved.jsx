import { Heart, HandHeart, Mail, ArrowRight } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { InvolvementGrid } from "../components/sections/InvolvementGrid.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { Button } from "../components/ui/Button.jsx";
import { site } from "../data/site.js";
import pg from "./pages.module.css";
import styles from "./GetInvolved.module.css";

export default function GetInvolved() {
  useSeo(
    "Get Involved",
    "Volunteer, join our email list, attend a meeting, or donate. Find the right way to get involved with the Delta County Democratic Party."
  );

  return (
    <>
      <PageHeader eyebrow="Get involved" title="There's a place for you here">
        Democracy runs on regular people pitching in. Pick the path that fits your
        time and interests — every bit helps.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Choose your path" title="Ways to plug in" align="center" />
          <div className={pg.center} />
          <InvolvementGrid />
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <div className={styles.duo}>
            <div className={styles.bigCard}>
              <span className={styles.bigIcon}>
                <HandHeart aria-hidden="true" />
              </span>
              <h2>Volunteer</h2>
              <p>
                Knock doors, staff a booth, register voters, or help from home.
                We'll match you to something that fits — no experience required.
              </p>
              <Button to="/get-involved/volunteer" variant="primary">
                Find a volunteer role <ArrowRight aria-hidden="true" />
              </Button>
            </div>

            <div className={styles.bigCard}>
              <span className={styles.bigIcon}>
                <Mail aria-hidden="true" />
              </span>
              <h2>Join our list</h2>
              <p>
                Membership is open to anyone who shares our values. Subscribe for
                updates, or come to a meeting to get plugged in.
              </p>
              <Button to="/get-involved/join" variant="primary">
                Join or subscribe <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className={styles.donate}>
            <div>
              <span className="eyebrow" style={{ color: "var(--gold-400)" }}>
                <Heart aria-hidden="true" size={16} /> Chip in
              </span>
              <h2 className={styles.donateTitle}>Support local organizing</h2>
              <p className={styles.donateText}>
                Yard signs, event space, and printing add up. A donation of any size
                helps us keep showing up for Delta County. Contributions are made
                securely through ActBlue.
              </p>
            </div>
            <Button href={site.links.actblue} variant="gold" size="lg">
              <Heart aria-hidden="true" /> Donate via ActBlue
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
