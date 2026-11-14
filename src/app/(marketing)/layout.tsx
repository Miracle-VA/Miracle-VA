import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SkipLink } from "@/components/layout/skip-link";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";

/**
 * Public site shell. The layout owns vertical rhythm; sections never set
 * their own outer spacing (build-system/04, Section Component API).
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* Reads the pathname: suspends during the shell for dynamic routes. */}
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {/* Reserves room for the sticky CTA so it never covers the footer. */}
      <div aria-hidden="true" className="h-(--sticky-cta-h) lg:hidden" />
      <StickyMobileCta />
    </>
  );
}
