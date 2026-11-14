import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLink } from "@/components/layout/nav-link";
import { Wordmark } from "@/components/layout/wordmark";
import { ButtonLink } from "@/components/ui/button-link";
import { ChatIcon } from "@/components/ui/icons";
import { primaryCtaLabel, primaryNav } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Sticky masthead: wordmark, four links, one action, on Vanilla Silk.
 * Below 1024px the action lives in the sticky bottom bar, so the header
 * holds only the wordmark and the menu button.
 */
export function Header() {
  return (
    <header
      className="header-scroll-line sticky top-0 z-40 border-b border-border bg-bg"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between gap-4 sm:gap-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-base font-semibold">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} underline>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href={whatsappUrl()}
            icon={<ChatIcon />}
            data-cta="whatsapp"
            data-cta-location="header"
          >
            {primaryCtaLabel}
          </ButtonLink>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
