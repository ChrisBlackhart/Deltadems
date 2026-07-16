import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { NextMeetingBanner } from "../components/sections/NextMeetingBanner.jsx";
import { EventCard } from "../components/sections/EventCard.jsx";
import { EmptyState } from "../components/sections/EmptyState.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { events, pastEvents } from "../data/events.js";
import pg from "./pages.module.css";

export default function Events() {
  useSeo(
    "Events",
    "Upcoming meetings, volunteer opportunities, and community events with the Delta County Democratic Party in Escanaba and across Delta County."
  );

  return (
    <>
      <PageHeader eyebrow="Calendar" title="Events & meetings">
        There's always something happening. Join us at our monthly meeting or out
        in the community.
      </PageHeader>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <NextMeetingBanner />
          </div>

          <SectionHeading eyebrow="Coming up" title="Upcoming events" />
          <div className={pg.center} />
          {events.length > 0 ? (
            <div className={pg.grid2}>
              {events.map((ev, i) => (
                <EventCard key={ev.id} event={ev} featured={i === 0} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      <section className={`section ${pg.tintedSection}`}>
        <div className="container">
          <SectionHeading eyebrow="Recently" title="What we've been up to">
            A look back at some of our recent gatherings — because an active party
            shows up all year.
          </SectionHeading>
          <div className={pg.center} />
          <div className={pg.grid3}>
            {pastEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Never miss an event"
        text="Subscribe for reminders and we'll make sure the next meeting lands in your inbox."
        primary={{ label: "Get event updates", to: "/get-involved/join" }}
        showDonate={false}
      />
    </>
  );
}
