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
    "Volunteer with the Delta County Democratic Party — knock doors, help people register, staff events, or pitch in from home. Tell us what interests you."
  );

  return (
    <>
      <PageHeader eyebrow="Volunteer" title="Lend a hand — every hour counts">
        You don't need experience or a title to be useful here. Tell us what
        you'd enjoy and how much time you have, and someone will follow up.
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
              Tell us what interests you and someone from the committee will get
              in touch about what's coming up. Still deciding, or just have a
              question? Send it anyway — that's a fine reason to write.
            </SectionHeading>
            <ul className={pg.checklist}>
              <li>No experience or political background needed</li>
              <li>Say how much time you have — an hour is genuinely useful</li>
              <li>Plenty of ways to help from home if that suits you better</li>
              <li>A good way to meet neighbors who care about the same things</li>
            </ul>
            <p className={pg.helperNoteLeft}>
              Not sure yet? The lowest-pressure option is simply coming to a
              monthly meeting and seeing what we're like.
            </p>
          </div>
          <div className={pg.panel}>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
