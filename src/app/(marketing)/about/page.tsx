import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { ToolStack } from "@/components/sections/tool-stack";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";
import { about, background, closing, industries, tools, whyWorkWithMe } from "@/content/about";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, profilePageSchema } from "@/lib/schema/person";
import { contact, primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Photo } from "@/components/ui/photo";
import { emailUrl } from "@/lib/email";

export const metadata: Metadata = {
  title: "About Miracle Joy Mangsal · Remote Executive Assistant",
  description:
    "Executive Assistant based in the Philippines supporting business owners in real estate, construction, marketing and service businesses with remote support.",
  alternates: { canonical: "/about" },
};

/**
 * /about (content-matrix row 9): the profile. Her words throughout (§02,
 * §04, §05, §06, §08); responsibilities, never employer names.
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          profilePageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Profile opener: name as the headline, portrait run large. */}
      <header className="container-page grid gap-10 pt-12 md:grid-cols-12 md:gap-8 md:pt-20">
        <div className="md:col-span-6 md:pt-6">
          <h1 className="text-display font-normal leading-[1] tracking-display">
            {about.heading}
          </h1>
          <p className="mt-8 max-w-[36ch] font-display text-xl font-normal tracking-tight text-accent">
            {about.lede}
          </p>
          <p className="mt-6 text-base text-text-muted">{about.basedIn}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink
              href={whatsappUrl("about page")}
              size="lg"
              icon={<ChatIcon />}
              data-cta="whatsapp"
              data-cta-location="about-hero"
            >
              {primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={contact.linkedin}
              variant="quiet"
              trailing={<ArrowRightIcon />}
              data-cta="linkedin"
              data-cta-location="about-hero"
            >
              LinkedIn
            </ButtonLink>
          </div>
        </div>
        <figure className="md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface shadow-photo">
            <Photo
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              eager
              sizes="(min-width: 1440px) 40rem, (min-width: 768px) 48vw, calc(100vw - 2.5rem)"
              className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        </figure>
      </header>

      {/* Her story, with the pull quote set large in Cherry. */}
      <section aria-label="My story" className="container-page grid gap-10 py-(--section-y) lg:grid-cols-12 lg:gap-8">
        <div className="grid max-w-prose gap-5 text-lg lg:col-span-6">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <blockquote className="border-t-4 border-accent pt-6 lg:col-span-5 lg:col-start-8">
          <p className="max-w-[24ch] font-display text-2xl font-normal tracking-tight text-accent md:text-3xl">
            “{about.pullQuote}”
          </p>
        </blockquote>
      </section>

      <section aria-labelledby="background-heading" className="container-page pb-(--section-y)">
        <h2 id="background-heading" className="text-3xl">
          Professional background
        </h2>
        <ul className="mt-10 grid gap-x-8 border-t-2 border-text md:mt-14 md:grid-cols-2">
          {background.map((b) => (
            <li key={b.title} className="reveal-row border-b border-border py-6">
              <h3 className="reveal-text text-xl">{b.title}</h3>
              <p className="reveal-text mt-2 max-w-[48ch] text-base text-text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="industries-heading" className="field-dark py-(--section-y)">
        <div className="container-page">
          <h2 id="industries-heading" className="text-3xl">
            Industries I support
          </h2>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-4 md:mt-14">
            {industries.map((i) => (
              <li key={i} className="flex items-center gap-6 font-display text-2xl font-normal tracking-tighter">
                {i}
                <span aria-hidden="true" className="size-2.5 rotate-45 bg-accent" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="py-(--section-y)">
        <ToolStack heading="Tools & platforms" groups={tools} />
      </div>

      <section aria-labelledby="why-heading" className="bg-surface py-(--section-y)">
        <div className="container-page grid gap-8 md:grid-cols-12">
          <h2 id="why-heading" className="text-3xl md:col-span-5">
            {whyWorkWithMe.heading}
          </h2>
          <div className="grid max-w-prose gap-5 text-lg md:col-span-7">
            {whyWorkWithMe.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <ConversionBlock
        heading={closing.heading}
        text={closing.text}
        primaryCta={{ label: primaryCtaLabel, href: whatsappUrl("about page") }}
        secondaryCta={{ label: "Or email me", href: emailUrl() }}
        ctaLocation="about-close"
      />
    </PageTransition>
  );
}
