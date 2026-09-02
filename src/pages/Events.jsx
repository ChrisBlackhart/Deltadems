import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { NextMeetingBanner } from "../components/sections/NextMeetingBanner.jsx";
import { EventCard } from "../components/sections/EventCard.jsx";
import { EmptyState } from "../components/sections/EmptyState.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { getUpcomingEvents, getPastEvents } from "../lib/events.js";
import pg from "./pages.module.css";

export default function Events() {
  useSeo(
    "Events",
    "Our standing monthly meeting — first Wednesday at 7:00 PM in Escanaba — plus any other events coming up with the Delta County Democratic Party."
  );

  const upcoming = getUpcomingEvents();
  const past = getPastEvents({ limit: 3 });

  return (
    <>
      <PageHeader eyebrow="Calendar" title="Events & meetings">
        We meet the first Wednesday of every month, and you're welcome at it
        whether or not you're a member.
      </PageHeader>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <NextMeetingBanner />
          </div>

          <SectionHeading eyebrow="Coming up" title="Upcoming events" />
          <div className={pg.center} />
          {upcoming.length > 0 ? (
            <div className={pg.grid2}>
              {upcoming.map((ev, i) => (
                <EventCard key={ev.id} event={ev} featured={i === 0} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Only rendered once there are real past events to look back on.
          An empty "what we've been up to" section would say the opposite of
          what it is there to say. */}
      {past.length > 0 && (
        <section className={`section ${pg.tintedSection}`}>
          <div className="container">
            <SectionHeading eyebrow="Recently" title="What we've been up to">
              A look back at some of our recent gatherings — because an active
              party shows up all year.
            </SectionHeading>
            <div className={pg.center} />
            <div className={pg.grid3}>
              {past.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Never miss an event"
        text="Subscribe for reminders and we'll make sure the next meeting lands in your inbox."
        primary={{ label: "Get event updates", to: "/get-involved/join" }}
        showDonate={false}
      />
    </>
  );
}
