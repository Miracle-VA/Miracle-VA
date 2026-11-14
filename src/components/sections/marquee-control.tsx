"use client";

// Client component: pause/play state and off-screen pausing for the marquee.

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";

/**
 * The visible pause control for the service marquee (06 §7.6, WCAG 2.2.2),
 * plus off-screen pausing (06 §7.5). Works by setting data attributes on the
 * nearest `[data-marquee]`; the CSS in globals.css does the rest, so the
 * marquee itself stays server-rendered. Hidden under reduced motion, where
 * nothing moves.
 */
export function MarqueeControl({ label }: { label: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const band = ref.current?.closest<HTMLElement>("[data-marquee]");
    if (!band) return;
    band.toggleAttribute("data-paused", paused);
  }, [paused]);

  useEffect(() => {
    const band = ref.current?.closest<HTMLElement>("[data-marquee]");
    if (!band || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      band.toggleAttribute("data-offscreen", !entry?.isIntersecting);
    });
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-pressed={paused}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border-on-field text-on-field transition-colors duration-(--duration-fast) hover:bg-on-field hover:text-field-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-field motion-reduce:hidden"
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}
