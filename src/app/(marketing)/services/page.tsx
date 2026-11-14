import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";
import { closing } from "@/content/about";
import { serviceAreas, servicesPage } from "@/content/services";
import { getCase } from "@/content/work";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, professionalServiceSchema } from "@/lib/schema/person";
import { primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailUrl } from "@/lib/email";

export const metadata: Metadata = {
  title: "Services · Executive, Marketing & CRM Support",
  description:
    "Executive and admin support, client relations, Meta and Google Ads, GoHighLevel, project coordination, social media, design and research for busy owners.",
  alternates: { canonical: "/services" },
};

const figure = (slug?: string) => {
  const c = slug ? getCase(slug) : undefined;
  if (!c) return null;
  const m = c.metric;
  return {
    href: `/work/${c.slug}`,
    title: c.title,
    figure: m ? `${m.prefix ?? ""}${m.value.toLocaleString("en-US")}${m.suffix ?? ""} ${m.label}` : null,
  };
};

/**
 * /services (docs/content-matrix.md row 2): all ten areas on one page, in
 * her order and words. Cherry header with a contents list (jump links);
 * each area a ruled spread; a WhatsApp strip after every third area so the
 * action is near wherever a visitor becomes ready.
 */
export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          professionalServiceSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <header className="field">
        <div className="container-page grid gap-10 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h1 className="text-display font-normal leading-[1] tracking-display">
              {servicesPage.heading}
            </h1>
            <p className="mt-8 max-w-[46ch] text-lg">{servicesPage.intro}</p>
          </div>
          <nav aria-label="Service areas" className="lg:col-span-6 lg:pt-3">
            <ol className="grid border-t border-border-on-field sm:grid-cols-2 sm:gap-x-8">
              {serviceAreas.map((area) => (
                <li key={area.id} className="border-b border-border-on-field">
                  <Link
                    href={`#${area.id}`}
                    className="group/toc flex min-h-12 items-center justify-between gap-4 py-2 font-semibold text-on-field"
                  >
                    {area.title}
                    <ArrowRightIcon className="shrink-0 rotate-90 text-on-field-muted transition-transform duration-(--duration-base) group-hover/toc:translate-y-0.5 motion-reduce:transform-none" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <div className="container-page py-(--section-y)">
        {serviceAreas.map((area, index) => {
          const related = figure(area.caseSlug);
          return (
            <Fragment key={area.id}>
              <section
                id={area.id}
                aria-labelledby={`${area.id}-title`}
                className="reveal-row grid scroll-mt-28 gap-8 border-t-2 border-text py-12 md:py-16 lg:grid-cols-12 lg:gap-8"
              >
                <div className="reveal-text lg:col-span-5">
                  <h2 id={`${area.id}-title`} className="max-w-[16ch] text-3xl">
                    {area.title}
                  </h2>
                  <p className="mt-5 max-w-[40ch] text-lg text-text-muted">{area.intro}</p>
                  {area.note && (
                    <p className="mt-5 inline-block border-2 border-accent px-3 py-1.5 text-sm font-semibold text-accent">
                      {area.note}
                    </p>
                  )}
                </div>

                <div className="reveal-text lg:col-span-7">
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 border-b border-border py-3 text-base"
                      >
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {related && (
                    <Link
                      href={related.href}
                      className="group/rel mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 bg-surface px-5 py-4 transition-colors duration-(--duration-base) hover:bg-greige/40"
                    >
                      {/* One line, no kicker label (craft floor). */}
                      <span className="font-display text-xl font-normal tracking-tighter">
                        See the {related.title} work
                      </span>
                      <span className="flex items-center gap-3 font-semibold text-accent">
                        {related.figure ?? "See the case"}
                        <ArrowRightIcon className="transition-transform duration-(--duration-base) group-hover/rel:translate-x-1 motion-reduce:transform-none" />
                      </span>
                    </Link>
                  )}
                </div>
              </section>

              {(index + 1) % 3 === 0 && index < serviceAreas.length - 1 && (
                <aside
                  aria-label="Get in touch"
                  className="field-dark -mx-(--gutter) flex flex-wrap items-center justify-between gap-6 px-(--gutter) py-8 sm:mx-0 sm:px-8"
                >
                  <p className="max-w-[30ch] font-display text-2xl font-normal tracking-tighter">
                    Need help with any of this?
                  </p>
                  <ButtonLink
                    href={whatsappUrl("services")}
                    variant="inverse"
                    icon={<ChatIcon />}
                    data-cta="whatsapp"
                    data-cta-location={`services-strip-${index + 1}`}
                  >
                    {primaryCtaLabel}
                  </ButtonLink>
                </aside>
              )}
            </Fragment>
          );
        })}
      </div>

      <ConversionBlock
        heading={closing.heading}
        text={closing.text}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl("services") }}
        secondaryCta={{ label: "Or email me", href: emailUrl() }}
        ctaLocation="services-close"
      />
    </PageTransition>
  );
}
