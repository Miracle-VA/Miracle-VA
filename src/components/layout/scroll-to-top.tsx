"use client";

// Client component: reads the pathname and listens for history traversal.

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Every link navigation starts at the top of the new page, with focus on
 * its heading.
 *
 * Why this exists: with cacheComponents, Next keeps recently visited pages
 * mounted but hidden (React Activity). When you return to one, Next looks for
 * the first *visible* element to scroll to; the hero is still hidden at that
 * moment, so it skipped ahead and landed on the Results section.
 *
 * Browser back/forward is left alone (the browser restores the position,
 * which is what people expect), and links with a #hash scroll to their target.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const traversing = useRef(false);
  // Last pathname handled. Comparing against it (rather than a "first run"
  // flag) is safe under Strict Mode's double effects and never touches the
  // DOM on initial load, before the page has hydrated.
  const handled = useRef(pathname);

  useEffect(() => {
    const onPop = () => {
      traversing.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    if (handled.current === pathname) return;
    handled.current = pathname;
    if (traversing.current) {
      traversing.current = false;
      return;
    }
    const settle = () => {
      const hash = window.location.hash.slice(1);
      const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      // Move focus to the new page's heading so screen-reader and keyboard
      // users know the page changed (05: focus moves to heading on route
      // change). Pick the visible h1: recently visited pages stay mounted
      // but hidden.
      const heading = Array.from(document.querySelectorAll<HTMLElement>("main h1")).find(
        (h) => h.getClientRects().length > 0,
      );
      if (heading) {
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    };
    // Now, and again after Next.js has run its own scroll handling for the
    // revealed page (which happens later in the same commit).
    settle();
    const frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
