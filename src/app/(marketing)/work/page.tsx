import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { CaseStudyList } from "@/components/sections/case-study-list";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { closing } from "@/content/about";
import { caseStudies, workPage } from "@/content/work";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/person";
import { primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailUrl } from "@/lib/email";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Work across Google Ads bookings, social media content, inbox clean-up, GoHighLevel pipelines, and real estate and construction marketing.",
  alternates: { canonical: "/work" },
};

/** /work (content-matrix row 3): the five cases as a feature list. */
export default function WorkPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Selected work", path: "/work" },
        ])}
      />

      <header className="field">
        <div className="container-page grid gap-8 pt-14 pb-16 md:grid-cols-12 md:items-end md:gap-8 md:pt-20 md:pb-20">
          <h1 className="text-display font-normal leading-[1] tracking-display md:col-span-7">
            {workPage.heading}
          </h1>
          <p className="max-w-[46ch] text-lg md:col-span-5">{workPage.intro}</p>
        </div>
      </header>

      <div className="container-page py-(--section-y)">
        <CaseStudyList cases={caseStudies} titleLevel="h2" />
      </div>

      <ConversionBlock
        heading={closing.heading}
        text={closing.text}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl("work") }}
        secondaryCta={{ label: "Or email me", href: emailUrl() }}
        ctaLocation="work-close"
      />
    </PageTransition>
  );
}
