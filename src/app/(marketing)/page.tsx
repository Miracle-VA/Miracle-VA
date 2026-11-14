import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { CaseStudyList } from "@/components/sections/case-study-list";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { Hero } from "@/components/sections/hero";
import { IndexBand } from "@/components/sections/index-band";
import { OutcomeProof } from "@/components/sections/outcome-proof";
import { ServiceGrid } from "@/components/sections/service-grid";
import { TestimonialBlock } from "@/components/sections/testimonial-block";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { closing } from "@/content/about";
import { hero, indexBand, outcomes, services, workTeaser } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { caseStudies } from "@/content/work";
import { JsonLd } from "@/lib/schema/json-ld";
import { personSchema, professionalServiceSchema } from "@/lib/schema/person";
import { primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailUrl } from "@/lib/email";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home, "the feature profile" (docs/design-direction.md v2):
 * cover → index band → headline facts → contents index → selected work →
 * testimonials → close. Sequence follows docs/blueprint.md. Testimonials are
 * her clients' WhatsApp messages as anonymised text (decided 2026-11-14).
 *
 * The page owns vertical rhythm; light sections get padding here, field
 * sections paint their own colour and take their padding as a prop.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <JsonLd data={[personSchema(), professionalServiceSchema()]} />

      <Hero
        heading={hero.heading}
        deck={hero.deck}
        deckAccent={hero.deckAccent}
        subheading={hero.subheading}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl() }}
        secondaryCta={hero.secondaryCta}
        caption={hero.caption}
        media={hero.media}
        priority
      />

      {/* The band sits at the cover's foot (direction contract, first viewport). */}
      <IndexBand items={indexBand} />

      <div className="section-y">
        <OutcomeProof heading={outcomes.heading} accent={outcomes.accent} items={outcomes.items} />
      </div>

      <ServiceGrid
        id="services"
        className="py-(--section-y)"
        heading={services.heading}
        groups={services.groups}
        allServices={services.allServices}
      />

      <section aria-labelledby="work-heading" className="container-page section-y">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-heading" className="text-3xl">
            {workTeaser.heading}
          </h2>
          <ButtonLink href={workTeaser.all.href} variant="quiet" trailing={<ArrowRightIcon />}>
            {workTeaser.all.label}
          </ButtonLink>
        </div>
        <div className="mt-10 md:mt-14">
          <CaseStudyList cases={caseStudies} />
        </div>
      </section>

      <TestimonialBlock
        className="py-(--section-y)"
        heading={testimonials.heading}
        accent={testimonials.accent}
        note={testimonials.note}
        lead={testimonials.lead}
        items={testimonials.items}
      />

      <ConversionBlock
        heading={closing.heading}
        accent={closing.accent}
        text={closing.text}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl() }}
        secondaryCta={{ label: "Or email me", href: emailUrl() }}
        ctaLocation="home-close"
      />
    </PageTransition>
  );
}
