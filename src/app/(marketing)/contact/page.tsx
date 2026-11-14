import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon, ChatIcon, MailIcon } from "@/components/ui/icons";
import { closing } from "@/content/about";
import { JsonLd } from "@/lib/schema/json-ld";
import { contactPageSchema } from "@/lib/schema/person";
import { emailUrl } from "@/lib/email";
import { contact, primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact · Let's Work Together",
  description:
    "Message me on WhatsApp or send me an email. Tell me about your business and the support you need, and let's see if we're a good fit.",
  alternates: { canonical: "/contact" },
};

const detailLink =
  "group/d inline-flex min-h-11 items-center gap-2 font-semibold text-on-field underline decoration-2 decoration-on-field/35 underline-offset-[6px] hover:decoration-on-field";

/**
 * Contact (docs/content-matrix.md, row 10). A Cherry field carries her
 * invitation and WhatsApp, the primary action; an Alpine Oat panel offers
 * email for people who'd rather write. No form (client decision, 2026-11-13):
 * both actions open the visitor's own app with her details filled in.
 * Copy: her own words (portfolio §10); the email panel's lines are XU's.
 */
export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={contactPageSchema()} />
      <div className="grid lg:grid-cols-2">
        <section aria-labelledby="contact-heading" className="field">
          <div className="mx-auto max-w-[calc(var(--container-content)/2)] px-(--gutter) pt-12 pb-16 md:pt-20 lg:ml-auto lg:pr-12">
            <h1
              id="contact-heading"
              className="max-w-[12ch] text-display font-normal leading-[1] tracking-display"
            >
              {closing.heading}
            </h1>
            <p className="mt-8 max-w-[44ch] text-lg">{closing.text}</p>

            <div className="mt-10">
              <ButtonLink
                href={whatsappUrl()}
                variant="inverse"
                size="lg"
                icon={<ChatIcon />}
                data-cta="whatsapp"
                data-cta-location="contact"
              >
                {primaryCtaLabel}
              </ButtonLink>
            </div>

            <dl className="mt-14 grid gap-4 border-t border-border-on-field pt-8">
              <div>
                <dt className="label text-on-field-muted">WhatsApp</dt>
                <dd>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={detailLink}
                    data-cta="whatsapp"
                    data-cta-location="contact-details"
                  >
                    {contact.whatsappDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-on-field-muted">LinkedIn</dt>
                <dd>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={detailLink}
                    data-cta="linkedin"
                    data-cta-location="contact-details"
                  >
                    Miracle Joy Mangsal
                    <ArrowRightIcon className="transition-transform duration-(--duration-base) group-hover/d:translate-x-1 motion-reduce:transform-none" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="email-heading" className="bg-surface">
          <div className="mx-auto max-w-[calc(var(--container-content)/2)] px-(--gutter) pt-12 pb-(--section-y) md:pt-20 lg:mr-auto lg:pl-12">
            <h2 id="email-heading" className="max-w-[14ch] text-3xl">
              Or send me an email
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg">
              Tell me a little about your business and the support you need. The button opens a new
              email in Gmail with my address already filled in.
            </p>
            <div className="mt-10">
              <ButtonLink
                href={emailUrl()}
                variant="primary"
                size="lg"
                icon={<MailIcon />}
                data-cta="email"
                data-cta-location="contact"
              >
                Email me
              </ButtonLink>
            </div>
            <p className="mt-8 border-t-2 border-text pt-6 text-base text-text-muted">
              Or write to{" "}
              <a
                href={emailUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-3 inline-block py-3 font-semibold text-text underline decoration-2 underline-offset-[6px]"
                data-cta="email"
                data-cta-location="contact-address"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
