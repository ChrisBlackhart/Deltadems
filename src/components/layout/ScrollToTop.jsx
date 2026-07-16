import { useEffect } from "react";

// On navigation: reset scroll and move focus to <main> so keyboard and
// screen-reader users land on the new page's content (not stranded at the top
// of the old DOM). Respects users who navigate via in-page anchors.
export function ScrollToTop({ focusRef, pathname }) {
  useEffect(() => {
    if (window.location.hash) return; // let anchor links behave normally
    window.scrollTo(0, 0);
    // Focus main without scrolling it back into an odd position.
    focusRef?.current?.focus?.({ preventScroll: true });
  }, [pathname, focusRef]);

  return null;
}
