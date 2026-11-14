import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { emailUrl } from "@/lib/email";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} handles the details you send through this website.`,
  alternates: { canonical: "/privacy" },
};

/*
 * XU DRAFT for her approval (docs/reviews/2026-11-11-quality-gates.md, C1/C2).
 * Not legal advice. It describes only what the site does today: no form (it
 * links out to WhatsApp, Gmail and LinkedIn), no analytics, no tracking
 * cookies. Update it if a form, analytics or a booking tool is added.
 * Retention wording needs her confirmation.
 */
const UPDATED = "13 November 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-text pt-6">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-4 grid gap-4 text-lg">{children}</div>
    </section>
  );
}

/** /privacy: a reading page. Plain prose, generous measure, no fields. */
export default function PrivacyPage() {
  return (
    <PageTransition>
      <article className="container-page py-(--section-y)">
        <header className="max-w-3xl">
          <h1 className="text-display font-normal leading-[1] tracking-display">
            Privacy policy
          </h1>
          <p className="mt-6 text-base text-text-muted">Last updated {UPDATED}</p>
        </header>

        <div className="mt-14 grid max-w-prose gap-12">
          <Section title="Who I am">
            <p>
              This website belongs to {site.name}, an Executive Assistant based in the Philippines.
              If you have a question about your information, email me at{" "}
              <a
                href={emailUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4"
              >
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="What I collect">
            <p>
              This website has no forms and doesn&apos;t collect your details itself. Its buttons open
              WhatsApp, your email (in Gmail) or LinkedIn, and you choose what to send me there:
              usually your name, contact details and a message about your business.
            </p>
            <p>
              Those services carry your message under their own privacy policies.
            </p>
            <p>
              Like most websites, the hosting provider keeps short-term technical logs (such as IP
              address and browser type) to keep the site secure. This site doesn&apos;t use
              analytics, advertising or tracking cookies.
            </p>
          </Section>

          <Section title="Why I use it">
            <p>
              Only to reply to your enquiry and talk about working together. I don&apos;t sell your
              details or add you to a mailing list.
            </p>
          </Section>

          <Section title="Where it goes and who sees it">
            <p>
              Your messages reach me directly on WhatsApp, in my email inbox or on LinkedIn; this
              website never sees or stores them. I share them only if the law requires it.
            </p>
          </Section>

          <Section title="How long I keep it">
            <p>
              I keep enquiry details only as long as I need them to respond and to keep a record of
              our conversation. You can ask me to delete them at any time.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under the Philippine Data Privacy Act of 2012, you have the right to be informed about
              how your personal information is used, to access it, to have it corrected, to object
              to its use, and to ask for it to be deleted or blocked. You can also complain to the
              National Privacy Commission.
            </p>
            <p>
              To use any of these rights, email{" "}
              <a
                href={emailUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4"
              >
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If this policy changes, the new version will be posted on this page with a new date.
            </p>
          </Section>
        </div>
      </article>
    </PageTransition>
  );
}
