import { useEffect } from "react";

// Lightweight per-page SEO for this SPA: sets document.title and the
// meta description without pulling in a helmet dependency.
const BASE = "Delta County Democratic Party";

export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : BASE;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
