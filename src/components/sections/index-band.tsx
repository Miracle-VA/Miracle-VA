export interface IndexBandProps {
  items: readonly string[];
}

/**
 * Signature element, part two: her areas set as a contents line on a
 * Bordeaux strip. It moves sideways only as the visitor scrolls (CSS
 * scroll-driven, `.index-band-track` in globals.css); it never moves on its
 * own, so it needs no pause control. Static under reduced motion or in
 * browsers without scroll timelines. Decorative: the services are listed in
 * full below, so screen readers skip this duplicate.
 */
export function IndexBand({ items }: IndexBandProps) {
  const line = [...items, ...items];
  return (
    <div aria-hidden="true" className="field-dark overflow-hidden py-5 md:py-7">
      <div className="index-band-track flex w-max items-center gap-8 whitespace-nowrap pl-(--gutter) md:gap-12">
        {line.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 md:gap-12">
            <span className="font-display text-2xl font-normal tracking-tight text-on-field">
              {item}
            </span>
            <span className="size-2.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
