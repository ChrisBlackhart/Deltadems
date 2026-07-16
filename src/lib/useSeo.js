import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../config.js";

// ============================================================================
// Per-page SEO for this SPA. Sets title, description, canonical, and Open
// Graph / Twitter tags on navigation — no helmet dependency.
//
// NOTE: because the site is client-rendered (no SSR/prerender), crawlers that
// don't execute JavaScript will only see the static tags in index.html. That's
// fine for launch, but if rich per-page link previews become important, add
// prerendering (e.g. a prerender step or SSR) — the tag values set here are
// already correct and would carry over. See README "SEO".
// ============================================================================

const BASE = "Delta County Democratic Party";

function setMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function useSeo(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = config.siteUrl.replace(/\/$/, "");
    const fullTitle = title ? `${title} | ${BASE}` : BASE;
    const url = `${origin}${pathname}`;
    const image = `${origin}/og-image.svg`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setCanonical(url);

    setMeta("property", "og:title", title || BASE);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", BASE);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title || BASE);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, pathname]);
}
