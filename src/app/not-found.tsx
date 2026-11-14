import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon, ChatIcon } from "@/components/ui/icons";
import { primaryCtaLabel, primaryNav } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** 404 (05 Functional: helpful, with routes back). */
export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container-page grid gap-12 py-(--section-y) md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h1 className="max-w-[14ch] text-display font-normal leading-[1] tracking-display">
              This page doesn&apos;t exist, or it has moved.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/" size="lg" trailing={<ArrowRightIcon />}>
                Back to the homepage
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl()}
                variant="quiet"
                icon={<ChatIcon />}
                data-cta="whatsapp"
                data-cta-location="404"
              >
                {primaryCtaLabel}
              </ButtonLink>
            </div>
          </div>
          <nav aria-label="Pages" className="md:col-span-4 md:col-start-9 md:pt-4">
            <ul className="border-t-2 border-text">
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    className="group/l flex min-h-14 items-center justify-between font-display text-xl font-normal tracking-tighter hover:text-accent"
                  >
                    {item.label}
                    <ArrowRightIcon className="transition-transform duration-(--duration-base) group-hover/l:translate-x-1 motion-reduce:transform-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
      <div aria-hidden="true" className="h-(--sticky-cta-h) lg:hidden" />
      <StickyMobileCta />
    </>
  );
}
