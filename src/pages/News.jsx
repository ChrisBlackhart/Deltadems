import { Info } from "lucide-react";
import { useSeo } from "../lib/useSeo.js";
import { PageHeader } from "../components/layout/PageHeader.jsx";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { NewsCard } from "../components/sections/NewsCard.jsx";
import { CtaBand } from "../components/sections/CtaBand.jsx";
import { news } from "../data/news.js";
import pg from "./pages.module.css";

export default function News() {
  useSeo(
    "News & Announcements",
    "The latest news, announcements, and recaps from the Delta County Democratic Party."
  );

  return (
    <>
      <PageHeader eyebrow="News" title="News & announcements">
        Updates, recaps, and what's ahead. This is where we keep Delta County in
        the loop.
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className={pg.headRow}>
            <SectionHeading eyebrow="Latest" title="Recent posts" />
            <p className={pg.demoNote}>
              <Info aria-hidden="true" /> Sample posts for this demonstration.
            </p>
          </div>
          <div className={pg.grid3}>
            {news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
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
