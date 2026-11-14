import { cacheLife } from "next/cache";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { contact, legalNav, primaryNav, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailUrl } from "@/lib/email";

async function currentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-on-field-muted transition-colors hover:text-on-field";

/**
 * The back page: a Bordeaux Noir field with her name set at cover-line size,
 * the routes to her, and the sitemap. Every link is at least 44×44.
 */
export async function Footer() {
  const year = await currentYear();

  return (
    <footer className="field-dark">
      <div className="container-page pt-16 md:pt-24">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="block font-display text-display font-normal leading-[0.98] tracking-display text-on-field"
        >
          Miracle Joy
          <br />
          Mangsal
        </Link>

        <div className="mt-14 grid gap-12 border-t border-border-on-field pt-10 md:grid-cols-12 md:gap-8">
          <p className="max-w-sm text-base text-on-field-muted md:col-span-5">
            {site.role}. {site.basedIn}.
          </p>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="label font-sans text-on-field">Pages</h2>
            <ul className="mt-3 flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="label font-sans text-on-field">Get in touch</h2>
            <ul className="mt-3 flex flex-col">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/wa inline-flex min-h-11 items-center gap-2 font-semibold text-on-field"
                  data-cta="whatsapp"
                  data-cta-location="footer"
                >
                  WhatsApp {contact.whatsappDisplay}
                  <ArrowRightIcon className="transition-transform duration-(--duration-base) group-hover/wa:translate-x-1 motion-reduce:transform-none" />
                </a>
              </li>
              <li>
                <a
                  href={emailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  data-cta="email"
                  data-cta-location="footer"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  data-cta="linkedin"
                  data-cta-location="footer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-page mt-12 flex flex-col gap-2 border-t border-border-on-field py-6 text-sm text-on-field-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex gap-6">
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
