import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";

export interface HeroProps {
  /** The cover line, kept short. Renders as h1 on the homepage, h2 elsewhere. */
  heading: string;
  /** A second line under the cover line, smaller, in the display face. */
  deck?: string;
  /** Who she is and who she helps. */
  subheading?: string;
  /** Primary action. Required: every section that can convert, should. */
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Photo credit line, set like a magazine caption. */
  caption?: string;
  media: { src: string; alt: string; width: number; height: number };
  /** Visual treatment. Does not change the content contract. */
  variant?: "cover";
  /** True only for the first section of the first viewport: loads the photo eagerly. */
  priority?: boolean;
  headingLevel?: "h1" | "h2";
  id?: string;
}

/** Staggered entrance for secondary elements only (06 §7.3, page load). */
function rise(order: number): { className: string; style: CSSProperties } {
  return {
    className: "animate-rise",
    style: { animationDelay: `calc(120ms + ${order} * var(--stagger))` },
  };
}

/**
 * Rung 1, Relevance: the cover. A Cherry Velvet field carries a short cover
 * line at display size with her second line as a deck under it.
 *
 * - Desktop (lg+): two columns on a full Cherry field. The portrait is
 *   top-aligned with the cover line and its caption sits under it on the
 *   field. (The text column is always taller than the photo, so an
 *   overlapping edge can't keep the buttons on the field at every width.)
 * - Phones and tablets: one column. The portrait follows the text, crosses
 *   the field's lower edge into the page, and the caption sits on the page
 *   ground below.
 *
 * The headline and portrait paint immediately (LCP candidates); only the
 * intro, actions and caption animate around them.
 */
export function Hero({
  heading,
  deck,
  subheading,
  primaryCta,
  secondaryCta,
  caption,
  media,
  priority = false,
  headingLevel = "h1",
  id,
}: HeroProps) {
  const Heading = headingLevel;

  return (
    <section id={id} aria-labelledby="hero-heading" className="relative">
      {/* Below lg the field ends about 40px above the photo's foot, so the photo
          crosses the edge and the caption sits clear of it on the page ground.
          Measured at 320–1023px; re-measure if the caption or padding changes.
          From lg the field fills the section. */}
      <div aria-hidden="true" className="field absolute inset-x-0 top-0 bottom-48 md:bottom-52 lg:bottom-0" />

      <div className="container-page relative grid gap-10 pt-12 pb-12 md:pt-16 md:pb-16 lg:grid-cols-12 lg:items-start lg:gap-8 lg:pt-20 lg:pb-24">
        <div className="text-on-field lg:col-span-7">
          <Heading
            id="hero-heading"
            className="max-w-[13ch] text-display font-normal leading-[1] tracking-display"
          >
            {heading}
          </Heading>

          {deck && (
            <p className="mt-4 max-w-[22ch] font-display text-2xl font-normal leading-[1.2] tracking-tighter text-on-field md:mt-5 md:text-3xl">
              {deck}
            </p>
          )}

          {subheading && (
            <p
              className={`mt-6 max-w-[46ch] text-lg text-on-field md:mt-8 ${rise(1).className}`}
              style={rise(1).style}
            >
              {subheading}
            </p>
          )}

          <div
            className={`mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 ${rise(2).className}`}
            style={rise(2).style}
          >
            <ButtonLink
              href={primaryCta.href}
              variant="inverse"
              size="lg"
              icon={<ChatIcon />}
              data-cta="whatsapp"
              data-cta-location="hero"
            >
              {primaryCta.label}
            </ButtonLink>
            {secondaryCta && (
              <ButtonLink
                href={secondaryCta.href}
                variant="quiet"
                className="text-on-field"
                trailing={<ArrowRightIcon />}
              >
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>

        <figure className="relative w-full md:max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-photo">
            <Photo
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              eager={priority}
              sizes="(min-width: 1440px) 34rem, (min-width: 1024px) 40vw, (min-width: 768px) 28rem, calc(100vw - 2.5rem)"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
            />
          </div>
          {caption && (
            <figcaption
              className={`mt-6 max-w-[40ch] border-t-2 border-text pt-3 text-sm text-text-muted lg:border-border-on-field lg:text-on-field-muted ${rise(3).className}`}
              style={rise(3).style}
            >
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
