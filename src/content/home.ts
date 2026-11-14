/**
 * Homepage copy. Her own words from her portfolio document unless marked
 * "XU". Content is developer-maintained (no CMS): edit here, not in components.
 * Numbers: only the three verified results may appear on the site.
 */

export const hero = {
  // Her headline, split so the cover line stays short (client feedback,
  // 2026-11-14: the two-sentence title felt crowded). Same words, same order.
  heading: "Your Business Has Enough Moving Parts.",
  deck: "Let Me Handle Some of Them.",
  subheading:
    "Hi, I'm Miracle Joy! I'm an Executive Assistant who helps business owners, CEOs, and entrepreneurs manage their day-to-day operations, stay organized, and keep things moving.",
  secondaryCta: { label: "View My Work", href: "/work" },
  /** Photo caption, set like a magazine credit. */
  caption: "Miracle Joy Mangsal, Executive Assistant. Based in the Philippines, supporting businesses remotely.",
  media: {
    src: "/images/miracle-joy-mangsal-portrait-desk.png",
    alt: "Miracle Joy Mangsal at her desk with a laptop and notebook",
    width: 1198,
    height: 1313,
  },
} as const;

/** XU: short names of her ten areas for the scroll-linked index band. */
export const indexBand = [
  "Executive assistance",
  "Client relations",
  "Meta & Google Ads",
  "GoHighLevel & CRM",
  "Project coordination",
  "Social media",
  "Design & video",
  "Real estate & construction",
  "Research",
  "Bookkeeping basics",
] as const;

export interface OutcomeItem {
  /** Final value, counted up to. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** What the number counts: the sentence continues from the number. */
  label: string;
  /** One line of context. */
  detail: string;
  /** Case study it comes from. */
  href: string;
}

export const outcomes = {
  heading: "The numbers so far",
  items: [
    {
      value: 79,
      label: "booked appointments",
      detail: "From a Google Ads campaign, at a reported $4.86 cost per booking.",
      href: "/work/google-ads-booked-appointments",
    },
    {
      value: 11000,
      suffix: "+",
      label: "emails removed or organized",
      detail: "In a single inbox cleanup project.",
      href: "/work/executive-admin-support",
    },
    {
      value: 21000,
      label: "Instagram views, approximately",
      detail: "On a single social media post.",
      href: "/work/social-media-content",
    },
  ] satisfies OutcomeItem[],
} as const;

export interface ServiceGroup {
  title: string;
  /** Her one-line description of the area. */
  description: string;
  /** The areas this group covers, as named on /services. */
  includes: string[];
  /** Anchor on /services (docs/content-matrix.md). */
  href: string;
}

export const services = {
  heading: "My work isn't limited to managing calendars and inboxes.",
  /** XU: grouping of her ten areas into six (docs/blueprint.md, ServiceGrid). */
  groups: [
    {
      title: "Executive & Administrative Assistance",
      description: "Support with the day-to-day responsibilities that take up an executive's time.",
      includes: ["Inbox & calendar", "Research", "Basic bookkeeping"],
      href: "/services#executive-admin",
    },
    {
      title: "Client Relations & Lead Management",
      description:
        "Keeping communication organized and making sure inquiries and follow-ups do not get overlooked.",
      includes: ["Client communication", "Lead follow-up", "GoHighLevel & CRM"],
      href: "/services#client-relations",
    },
    {
      title: "Facebook, Instagram & Google Advertising",
      description:
        "Hands-on support for paid campaigns, from setup and monitoring to reporting and optimization.",
      includes: ["Meta Ads", "Google Ads", "Reporting"],
      href: "/services#ads",
    },
    {
      title: "Project Management & Coordination",
      description: "Keeping tasks, people, and deadlines connected.",
      includes: ["Trackers & boards", "Contractor communication", "Status updates"],
      href: "/services#projects",
    },
    {
      title: "Social Media & Creative",
      description:
        "Helping businesses show up consistently and communicate with their audiences.",
      includes: ["Content calendars", "Canva design", "Reels & Shorts editing"],
      href: "/services#social-media",
    },
    {
      title: "Real Estate, Property & Construction",
      description:
        "Operational and marketing support for property owners, real estate professionals, and construction CEOs.",
      includes: ["Listing & rental marketing", "Open houses", "Warranty & service tracking"],
      href: "/services#real-estate-construction",
    },
  ] satisfies ServiceGroup[],
  allServices: { label: "See all services", href: "/services" },
} as const;

export const workTeaser = {
  heading: "Selected work",
  all: { label: "See all work", href: "/work" },
} as const;
