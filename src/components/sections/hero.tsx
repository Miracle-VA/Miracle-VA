import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";

export interface HeroProps {
  /** The cover line. Renders as h1 on the homepage, h2 elsewhere. */
  heading: string;
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
 * Rung 1, Relevance: the cover. A Cherry Velvet field carries the cover line
 * at display size; the portrait runs large on the right and crosses the
 * field's lower edge into the page, like a magazine profile opener. The
 * headline and portrait paint immediately (LCP candidates); only the intro,
 * actions and caption animate around them.
 */
export function Hero({
  heading,
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
      {/* The field stops short of the portrait's foot, so the photo overlaps the edge. */}
      <div aria-hidden="true" className="field absolute inset-x-0 top-0 bottom-24 md:bottom-32" />

      <div className="container-page relative grid gap-10 pt-12 pb-12 md:grid-cols-12 md:gap-8 md:pt-20 md:pb-16">
        <div className="text-on-field md:col-span-7 md:pb-40">
          <Heading
            id="hero-heading"
            className="max-w-[13ch] text-display font-normal leading-[1] tracking-display"
          >
            {heading}
          </Heading>

          {subheading && (
            <p
              className={`mt-8 max-w-[46ch] text-lg text-on-field ${rise(1).className}`}
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

        <figure className="relative md:col-span-5 md:self-end">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-photo">
            <Photo
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              eager={priority}
              sizes="(min-width: 1440px) 34rem, (min-width: 768px) 40vw, calc(100vw - 2.5rem)"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
            />
          </div>
          {caption && (
            <figcaption
              className={`mt-4 max-w-[40ch] border-t-2 border-text pt-3 text-sm text-text-muted ${rise(3).className}`}
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
