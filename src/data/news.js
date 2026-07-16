// ============================================================================
// CONTENT STATUS: PLACEHOLDER — sample announcements only.
// Replace with real posts before launch. No real quotes, statistics, or claims
// are asserted here. Each record is tagged `placeholder: true`.
// ============================================================================

const rawNews = [
  {
    id: "fall-organizing-2026",
    title: "Get ready: our fall organizing season kicks off in September",
    date: "2026-07-10",
    category: "Announcement",
    excerpt:
      "From the U.P. State Fair booth to weekend canvasses, here's how you can plug in this fall — no experience required.",
  },
  {
    id: "welcome-new-officers",
    title: "Welcome to our newly elected county officers",
    date: "2026-06-20",
    category: "Party News",
    excerpt:
      "Thank you to everyone who took part in our leadership elections. Meet the team guiding Delta Dems this term.",
  },
  {
    id: "picnic-recap",
    title: "Recap: a great turnout at our community picnic",
    date: "2026-06-16",
    category: "Recap",
    excerpt:
      "Neighbors joined us at Ludington Park for food, conversation, and a beautiful evening on the bay.",
  },
];

export const news = rawNews.map((n) => ({ ...n, placeholder: true }));
