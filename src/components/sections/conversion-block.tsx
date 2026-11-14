import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";
import { withAccent } from "@/components/ui/accent";

export interface ConversionBlockProps {
  heading: string;
  /** Phrase of the heading set in the script accent. */
  accent?: string;
  text: string;
  primaryCta: { label: string; href: string };
  /** Alternative route for people who'd rather write. */
  secondaryCta?: { label: string; href: string };
  /** Where this block sits, for analytics. */
  ctaLocation: string;
  id?: string;
}

/**
 * Rung 7, Ease: the close. A full Cherry Velvet field with her own
 * invitation, WhatsApp first, the form as the alternative. Every page ends
 * here, so the visitor always finishes on an action.
 */
export function ConversionBlock({
  heading,
  accent,
  text,
  primaryCta,
  secondaryCta,
  ctaLocation,
  id,
}: ConversionBlockProps) {
  return (
    <section id={id} aria-labelledby={`${ctaLocation}-close`} className="field">
      <div className="container-page grid gap-10 py-(--section-y) md:grid-cols-12 md:items-end md:gap-8">
        <h2
          id={`${ctaLocation}-close`}
          className="max-w-[14ch] text-display font-normal leading-[1] tracking-display md:col-span-7"
        >
          {withAccent(heading, accent)}
        </h2>
        <div className="md:col-span-5">
          <p className="max-w-[44ch] text-lg">{text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink
              href={primaryCta.href}
              variant="inverse"
              size="lg"
              icon={<ChatIcon />}
              data-cta="whatsapp"
              data-cta-location={ctaLocation}
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
      </div>
    </section>
  );
}
