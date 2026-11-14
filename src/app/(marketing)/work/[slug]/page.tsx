import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { closing } from "@/content/about";
import { serviceAreas } from "@/content/services";
import { caseStudies, getCase } from "@/content/work";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema/person";
import { primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailUrl } from "@/lib/email";

/**
 * All five cases are prerendered in full from generateStaticParams, with no
 * fallback (a Suspense fallback here caused a 0.31 layout shift). Unknown
 * slugs render on request and 404 via notFound(). `instant = false` opts this
 * one segment out of the dev-time instant-navigation check, which otherwise
 * flags awaiting params for slugs it can't know (Next.js "instant" docs).
 */
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: { canonical: `/work/${c.slug}` },
    // No openGraph override here: it would drop the site-wide share image.
  };
}

/**
 * /work/[slug] (content-matrix rows 4–8). Built only from what she supplied:
 * her category summary, her background line, her responsibilities and tools,
 * and the verified figure where one exists. Samples appear once redacted.
 */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length]!;
  const service = serviceAreas.find((a) => a.id === c.serviceId);
  const m = c.metric;

  return (
    <PageTransition>
      <JsonLd
        data={[
          caseStudySchema(c),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Selected work", path: "/work" },
            { name: c.title, path: `/work/${c.slug}` },
          ]),
        ]}
      />

      <header className="field">
        <div className="container-page pt-8 pb-16 md:pt-10 md:pb-20">
          <ButtonLink
            href="/work"
            variant="quiet"
            className="text-on-field"
            trailing={<ArrowRightIcon className="rotate-180" />}
          >
            All work
          </ButtonLink>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <h1 className="max-w-[12ch] text-display font-normal leading-[1] tracking-display">
                {c.title}
              </h1>
              <p className="mt-8 max-w-[46ch] text-lg">{c.summary}</p>
            </div>
            {m && (
              <p className="border-t-2 border-on-field pt-5 md:col-span-5">
                <span className="block font-display text-display font-normal leading-[0.98] tracking-display tabular-nums">
                  {m.prefix}
                  {m.value.toLocaleString("en-US")}
                  {m.suffix}
                </span>
                <span className="mt-2 block font-display text-2xl font-normal tracking-tighter">
                  {m.label}
                </span>
                <span className="mt-3 block max-w-[34ch] text-base text-on-field-muted">
                  {m.detail}
                </span>
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="container-page grid gap-14 py-(--section-y) md:grid-cols-12 md:gap-8">
        <section aria-labelledby="work-overview" className="md:col-span-5">
          <h2 id="work-overview" className="text-2xl">
            The work
          </h2>
          <p className="mt-5 font-display text-xl font-normal tracking-tight">{c.background}</p>
          {service && (
            <ButtonLink
              href={`/services#${service.id}`}
              variant="quiet"
              className="mt-6 text-accent"
              trailing={<ArrowRightIcon />}
            >
              About this service
            </ButtonLink>
          )}
        </section>

        <div className="grid gap-14 md:col-span-7">
          <section aria-labelledby="work-handled">
            <h2 id="work-handled" className="text-2xl">
              What I handled
            </h2>
            <ul className="mt-5 border-t-2 border-text">
              {c.handled.map((item) => (
                <li key={item} className="flex gap-3 border-b border-border py-3.5 text-lg">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rotate-45 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="work-tools">
            <h2 id="work-tools" className="text-2xl">
              Tools
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {c.tools.map((tool) => (
                <li key={tool} className="border-2 border-text px-3.5 py-1.5 text-sm font-semibold">
                  {tool}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <nav aria-label="Next case" className="bg-surface">
        <Link
          href={`/work/${next.slug}`}
          className="group/next container-page flex flex-wrap items-end justify-between gap-6 py-12 md:py-16"
        >
          {/* One line, no kicker label (craft floor). */}
          <span className="font-display text-3xl font-normal tracking-tighter transition-colors duration-(--duration-base) group-hover/next:text-accent">
            Next: {next.title}
          </span>
          <ArrowRightIcon className="size-10 transition-transform duration-(--duration-base) group-hover/next:translate-x-2 motion-reduce:transform-none" />
        </Link>
      </nav>

      <ConversionBlock
        heading={closing.heading}
        text={closing.text}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl(`${c.title.toLowerCase()} work`) }}
        secondaryCta={{ label: "Or email me", href: emailUrl(`${c.title.toLowerCase()} work`) }}
        ctaLocation="case-close"
      />
    </PageTransition>
  );
}
