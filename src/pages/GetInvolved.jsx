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
                Knock doors, staff a booth, help people register, or pitch in
                from home. Tell us what you'd enjoy and someone will follow up —
                no experience or political background required.
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
                Get occasional email about meetings, events and deadlines. If
                you'd like to become a committee member, come to a meeting or
                email us and we'll explain how that works.
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
                Local organizing runs on small, unglamorous costs — meeting
                space, printing, signs, supplies for a booth. A contribution of
                any size helps us keep showing up for Delta County. Donations
                are handled securely by ActBlue, not by this site.
              </p>
            </div>
            <Button href={site.ctas.donate} variant="gold" size="lg">
              <Heart aria-hidden="true" /> Donate via ActBlue
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
