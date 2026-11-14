/**
 * Site-wide facts. Every value here is confirmed by the client;
 * anything unconfirmed stays out of this file.
 * Content is developer-maintained (no CMS), so this is the single source
 * for name, navigation and contact routes.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: "Miracle Joy Mangsal",
  role: "Executive Assistant",
  description:
    "Remote executive assistant for business owners: admin, client relations, Meta and Google Ads, GoHighLevel, projects and social media.",
  locale: "en_US",
  basedIn: "Based in the Philippines · Remote support for international businesses",
} as const;

export const primaryNav: readonly NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: readonly NavItem[] = [{ label: "Privacy", href: "/privacy" }];

export const contact = {
  /** E.164 digits only, no "+", as WhatsApp click-to-chat links require. */
  whatsappNumber: "639916758363",
  whatsappDisplay: "+63 991 675 8363",
  email: "mangsalmiracle@gmail.com",
  linkedin: "https://www.linkedin.com/in/miracle-joy-mangsal-233616283/",
} as const;

/** The one primary action label, used everywhere for consistency. */
export const primaryCtaLabel = "Let's Work Together";
