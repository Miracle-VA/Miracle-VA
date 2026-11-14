import { tools } from "@/content/about";
import { serviceAreas } from "@/content/services";
import type { CaseStudy } from "@/content/work";
import { env } from "@/lib/env";
import { contact, site } from "@/lib/site";

/**
 * Schema.org builders (build-system/03, SEO). Only confirmed facts: her name,
 * role, country, contact routes, services and tools. No prices, ratings or
 * service area beyond "based in the Philippines" (not confirmed).
 * Validate every type in Google's Rich Results Test before launch.
 */

const url = (path = "/") => new URL(path, env.NEXT_PUBLIC_SITE_URL).toString();
const PERSON_ID = url("/#person");

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    jobTitle: site.role,
    url: url("/"),
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin],
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    knowsAbout: [
      ...serviceAreas.map((a) => a.title),
      ...tools.flatMap((g) => g.items),
    ],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url("/#service"),
    name: `${site.name}, ${site.role}`,
    url: url("/"),
    description: site.description,
    founder: { "@id": PERSON_ID },
    email: contact.email,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: serviceAreas.map((a) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: a.title,
          description: a.intro,
          url: url(`/services#${a.id}`),
        },
      })),
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: url("/contact"),
    mainEntity: { "@id": PERSON_ID },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: url("/about"),
    mainEntity: personSchema(),
  };
}

export function caseStudySchema(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    headline: c.seo.title,
    description: c.seo.description,
    url: url(`/work/${c.slug}`),
    author: { "@id": PERSON_ID },
    about: c.handled,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}
