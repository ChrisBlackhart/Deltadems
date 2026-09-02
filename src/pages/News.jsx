import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { ContentPending } from "../components/sections/ContentPending.jsx";
import { site } from "../data/site.js";
import pg from "./pages.module.css";

/**
 * News & announcements.
 *
 * Holds no posts. The committee does not currently publish news anywhere —
 * there is no news section on their existing site — so every post previously
 * shown here was invented. Writing announcements on a real party's behalf, or
 * inventing recaps of events that may not have happened, is not something this
 * page should do.
 *
 * Sample posts are retained in src/data/news.js for layout reference but are
 * no longer rendered.
 */
export default function News() {
  useSeo(
    "News & Announcements",
    "Updates from the Delta County Democratic Party — and where else to follow what we're doing."
  );

  return (
    <>
      <PageHeader eyebrow="News" title="News & announcements">
        Updates from the committee, and what's coming up next.
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Latest" title="Recent updates" />
          <div className={pg.center} />
          <ContentPending
            title="Nothing posted yet"
            message="We're setting this up as the place for committee updates, event recaps and local news. Until it's running, the quickest ways to hear from us are our email list and Facebook."
            action={{ label: "Join the email list", to: "/get-involved/join" }}
          />
          <p className={pg.helperNote}>
            You can also follow us on{" "}
            <a href={site.social[0].url} target="_blank" rel="noreferrer">
              Facebook
            </a>
            , where we post most often.
          </p>
        </div>
      </section>

      <CtaBand
        title="Get the news first"
        text="Subscribe and our announcements will come straight to your inbox — no need to check back."
        primary={{ label: "Subscribe for updates", to: "/get-involved/join" }}
        showDonate={false}
      />
    </>
  );
}
