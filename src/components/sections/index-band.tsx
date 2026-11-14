import { MarqueeControl } from "@/components/sections/marquee-control";

export interface IndexBandProps {
  items: readonly string[];
}

function Line({ items }: IndexBandProps) {
  // Trailing padding equals the gap, so two copies join without a seam.
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 md:gap-12">
          <span className="font-display text-2xl font-normal tracking-tight text-on-field">{item}</span>
          <span className="size-2.5 rotate-45 bg-accent" />
        </span>
      ))}
    </div>
  );
}

/**
 * Signature element, part two: her areas set as a contents line on a
 * Bordeaux strip, looping as a smooth marquee (client request, 2026-11-14).
 * Server-rendered; the loop is CSS (`.marquee-track` in globals.css) and only
 * the pause button is client code. It pauses off-screen and on request, and
 * is static under reduced motion.
 *
 * The moving text is decorative (the services are listed in full below), so
 * screen readers skip it; the pause button stays reachable.
 */
export function IndexBand({ items }: IndexBandProps) {
  return (
    <div data-marquee className="field-dark relative flex items-center">
      <div aria-hidden="true" className="min-w-0 flex-1 overflow-hidden py-5 md:py-7">
        <div className="marquee-track flex w-max">
          <Line items={items} />
          <Line items={items} />
        </div>
      </div>
      {/* The control sits on its own strip of the band, faded in from the
          moving text so nothing slides under it abruptly. */}
      <div className="relative flex shrink-0 items-center self-stretch bg-field-dark pr-(--gutter) pl-3 before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-12 before:bg-linear-to-r before:from-transparent before:to-field-dark motion-reduce:hidden">
        <MarqueeControl label="the services ticker" />
      </div>
    </div>
  );
}
