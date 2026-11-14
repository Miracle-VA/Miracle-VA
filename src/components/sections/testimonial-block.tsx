import type { Testimonial } from "@/content/testimonials";

export interface TestimonialBlockProps {
  heading: string;
  /** Says where the quotes come from, so anonymous words read as real. */
  note: string;
  /** Set large, like a magazine pull quote. */
  lead: Testimonial;
  items: readonly Testimonial[];
  id?: string;
  className?: string;
}

/**
 * Rung 4, Trust: her clients make the claim instead of her (section library,
 * TestimonialBlock). Text only, transcribed from client messages; never
 * screenshots. On Alpine Oat so it reads as a separate voice from hers.
 *
 * One pull quote in the display face, then the rest in a column grid, each
 * under a rule like an editorial sidebar. A static grid, not a carousel, so
 * every quote is visible (02 TestimonialBlock: carousels hide proof).
 * The section paints its own ground, so it takes its padding from the page.
 */
export function TestimonialBlock({ heading, note, lead, items, id, className }: TestimonialBlockProps) {
  return (
    <section id={id} aria-labelledby="testimonials-heading" className={`bg-surface ${className ?? ""}`}>
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="testimonials-heading" className="max-w-[12ch] text-3xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-[34ch] text-base text-text-muted">{note}</p>
          </div>

          {/* A Cherry rule marks the pull quote, as on About (Spectral's
              oversized quote mark read as slashes). */}
          <figure className="border-t-4 border-accent pt-6 md:col-span-8 md:pt-8">
            <blockquote>
              <p className="max-w-[26ch] font-display text-2xl font-normal leading-[1.2] tracking-tighter md:text-3xl lg:text-4xl">
                &ldquo;{lead.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 text-sm text-text-muted">{lead.source}</figcaption>
          </figure>
        </div>

        <ul className="mt-14 columns-1 gap-x-8 md:mt-20 md:columns-2 lg:columns-3">
          {items.map((t) => (
            <li key={t.quote} className="mb-10 break-inside-avoid border-t-2 border-text pt-5">
              <figure>
                <blockquote>
                  <p className="text-lg">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-3 text-sm text-text-muted">{t.source}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
