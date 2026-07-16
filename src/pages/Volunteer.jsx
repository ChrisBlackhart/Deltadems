import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { FeatureCard } from "../components/ui/FeatureCard.jsx";
import { VolunteerForm } from "../components/forms/VolunteerForm.jsx";
import { volunteerRoles } from "../data/volunteer.js";
import pg from "./pages.module.css";

export default function Volunteer() {
  useSeo(
    "Volunteer",
    "Volunteer with the Delta County Democratic Party — knock doors, register voters, staff events, or help online. Sign up and we'll match you to a role."
  );

  return (
    <>
      <PageHeader eyebrow="Volunteer" title="Lend a hand — every hour counts">
        You don't need experience or a title. Tell us what you enjoy and how much
        time you have, and we'll find the right fit.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Opportunities" title="Ways to help" align="center" />
          <div className={pg.center} />
          <div className={pg.grid3}>
            {volunteerRoles.map((r) => (
              <FeatureCard
                key={r.id}
                icon={r.icon}
                title={r.title}
                text={r.text}
                chip={r.time}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className={`container ${pg.split}`}>
          <div>
            <SectionHeading eyebrow="Sign up" title="Ready to get started?">
              Fill out the form and we'll be in touch about upcoming opportunities
              that match your interests. Questions first? That's fine too — just
              tell us.
            </SectionHeading>
            <ul className={pg.checklist}>
              <li>No experience needed — we train you</li>
              <li>Flexible, low-pressure, and often remote</li>
              <li>A great way to meet neighbors</li>
            </ul>
          </div>
          <div className={pg.panel}>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
