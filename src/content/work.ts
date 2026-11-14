/**
 * Selected work: five case studies, one per category in her portfolio (§07).
 *
 * Sources, nothing else:
 * - `summary`: her §07 description of the category's samples.
 * - `background`: her §04 line for the matching responsibility.
 * - `handled`: her own §03 service lines for that area.
 * - `tools`: her §06 tools relevant to the area.
 * - `metric`: only the three verified results (CLAUDE.md).
 *
 * - `samples`: her work samples from client-info, shown as supplied
 *   (decision 2026-11-14: use the materials as they are). Captions are XU's
 *   plain descriptions of each piece.
 *
 * Still needed from her (docs/content-matrix.md): the specific situation for
 * each case.
 */

export interface CaseMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  /** What the number counts, completing the sentence. */
  label: string;
  /** One line of context. */
  detail: string;
}

/** A work sample: an image (through next/image) or a 9:16 video reel. */
export type CaseSample =
  | { kind: "image"; src: string; alt: string; width: number; height: number; caption: string }
  | {
      kind: "video";
      src: string;
      poster: string;
      label: string;
      caption: string;
      /** WebVTT captions, if any. The reels supplied so far carry captions
       *  burned into the picture; add a .vtt for any with uncaptioned speech. */
      captions?: string;
    };

export interface CaseStudy {
  slug: string;
  title: string;
  /** One line for the index and cards. */
  summary: string;
  background: string;
  handled: string[];
  tools: string[];
  metric?: CaseMetric;
  /** Anchor on /services for the matching area. */
  serviceId: string;
  samples?: CaseSample[];
  seo: { title: string; description: string };
}

export const workPage = {
  heading: "Selected work",
  intro:
    "My work spans executive assistance, client relations, digital advertising, CRM systems, project coordination, social media, and real estate and construction operations.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "google-ads-booked-appointments",
    title: "Paid Advertising",
    summary:
      "Meta and Google Ads reports, creative testing, budgets, lead or booking trends, and optimization notes.",
    background:
      "Supported Meta and Google Ads campaigns with budget checks, reporting, creative updates, and optimization.",
    handled: [
      "Campaign setup and creative coordination",
      "Budget monitoring and performance checks",
      "Audience and geographic targeting support",
      "Creative refreshes and testing",
      "Performance reports, bookings/leads tracking, and optimization recommendations",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Meta Business Suite", "Google Sheets"],
    metric: {
      value: 79,
      label: "booked appointments",
      detail: "From a Google Ads campaign, at a reported $4.86 cost per booking.",
    },
    serviceId: "ads",
    seo: {
      title: "Google Ads Case: 79 Bookings at $4.86 Each",
      description:
        "How I supported a Google Ads campaign that produced 79 booked appointments at a reported $4.86 cost per booking.",
    },
  },
  {
    slug: "social-media-content",
    title: "Social Media & Content",
    summary: "Canva graphics, content calendars, edited reels, and platform performance summaries.",
    background:
      "Planned, designed, edited, scheduled, and reviewed social media content across several platforms.",
    handled: [
      "Content planning and editorial calendars",
      "Captions, content writing, and publishing",
      "Canva social media graphics and carousels",
      "Reels, short-form video, and YouTube Shorts editing",
      "Social media analytics and reporting",
    ],
    tools: ["Canva", "CapCut", "Buffer", "Metricool", "Opus", "Meta Business Suite"],
    metric: {
      value: 21000,
      label: "Instagram views, approximately",
      detail: "On a single social media post.",
    },
    serviceId: "social-media",
    samples: [
      {
        kind: "image",
        src: "/images/work/event-flyer-red-affair.png",
        alt: "Event flyer for \"A Red Affair: A Boss Babes Galentines\", a women's real estate networking event on 11 February, with photos of six speakers",
        width: 615,
        height: 615,
        caption: "Event flyer for a women's real estate networking event",
      },
      {
        kind: "image",
        src: "/images/work/instagram-views-90-days.png",
        alt: "Instagram insights screen showing views over the last 90 days, split by followers and non-followers and by content type",
        width: 285,
        height: 615,
        caption: "Instagram insights: 90-day views report",
      },
      {
        kind: "image",
        src: "/images/work/instagram-profile.png",
        alt: "A real estate client's Instagram profile, with highlights and pinned posts",
        width: 285,
        height: 615,
        caption: "A client's Instagram profile",
      },
      {
        kind: "video",
        src: "/videos/work/investor-motivation-reel.mp4",
        poster: "/videos/work/investor-motivation-reel-poster.jpg",
        label: "Investor motivation reel: a speaker talks about continuing to invest, with on-screen captions",
        caption: "Talking-head reel with captions",
      },
      {
        kind: "video",
        src: "/videos/work/podcast-episode-promo.mp4",
        poster: "/videos/work/podcast-episode-promo-poster.jpg",
        label: "Podcast episode promo clip with captions and b-roll",
        caption: "Podcast episode promo",
      },
    ],
    seo: {
      title: "Social Media & Content Case",
      description:
        "Canva graphics, content calendars, edited reels and a post that reached about 21,000 Instagram views.",
    },
  },
  {
    slug: "executive-admin-support",
    title: "Executive & Administrative Support",
    summary: "Trackers, organized workflows, reporting documents, and research outputs.",
    background:
      "Managed schedules, inboxes, research, documentation, and administrative processes for busy business owners.",
    handled: [
      "Email and inbox organization",
      "Calendar management, scheduling, and meeting coordination",
      "Meeting agendas, notes, and follow-ups",
      "Document preparation and file organization",
      "Data entry, spreadsheets, and administrative reporting",
    ],
    tools: ["Google Workspace", "Microsoft 365", "Gmail", "Outlook", "Calendly", "Zoom", "Slack"],
    metric: {
      value: 11000,
      suffix: "+",
      label: "emails removed or organized",
      detail: "In a single inbox cleanup project.",
    },
    serviceId: "executive-admin",
    seo: {
      title: "Inbox Clean-Up Case: 11,000+ Emails",
      description:
        "How I cleared and organized more than 11,000 emails, and the trackers and workflows that kept the inbox under control.",
    },
  },
  {
    slug: "gohighlevel-lead-management",
    title: "GoHighLevel & Lead Management",
    summary: "Pipelines, contact organization, workflow maps, and follow-up processes.",
    background: "Organized contacts, leads, pipelines, workflows, and follow-up systems.",
    handled: [
      "GoHighLevel Funnels and CRM management",
      "Lead pipelines and opportunity tracking",
      "Workflow and automation setup or maintenance",
      "Lead follow-up organization",
      "CRM data cleanup and troubleshooting",
    ],
    tools: ["GoHighLevel", "HubSpot", "Pipedrive", "LeadSimple", "Reply.io", "MeetAlfred", "Zapier"],
    serviceId: "gohighlevel",
    seo: {
      title: "GoHighLevel & Lead Management Case",
      description:
        "Pipelines, workflows and follow-up processes I set up and maintained in GoHighLevel so no lead was missed.",
    },
  },
  {
    slug: "real-estate-construction",
    title: "Real Estate & Construction",
    summary:
      "Property promotion materials, rental outreach, project trackers, and warranty or contractor coordination.",
    background:
      "Supported property promotion, contractor coordination, warranty/service tracking, research, and marketing.",
    handled: [
      "Property listing promotion and rental marketing",
      "Open house promotion and outreach",
      "Contractor scheduling and communication",
      "Project, warranty, and service-request tracking",
      "Property and competitor research",
    ],
    tools: ["Canva", "CapCut", "Meta Business Suite", "Google Business Profile", "ClickUp", "Google Sheets"],
    serviceId: "real-estate-construction",
    samples: [
      {
        kind: "image",
        src: "/images/work/rental-listing-panama-city.png",
        alt: "Rental listing graphic: single-family house for rent in Panama City, 3 bedrooms and 2 bathrooms, with photos of the exterior and interior",
        width: 1080,
        height: 1080,
        caption: "Rental listing graphic, Panama City",
      },
      {
        kind: "image",
        src: "/images/work/rental-listing-ocala.png",
        alt: "\"For rent\" graphic for a two-storey home in Ocala with 4 bedrooms, 2 bathrooms and a private pool",
        width: 1254,
        height: 1254,
        caption: "Rental listing graphic, Ocala",
      },
      {
        kind: "image",
        src: "/images/work/price-drop-ocala.png",
        alt: "\"Price drop\" graphic for a two-storey home in Ocala",
        width: 1254,
        height: 1254,
        caption: "Price-drop announcement",
      },
      {
        kind: "image",
        src: "/images/work/just-sold-sacramento.png",
        alt: "\"Just sold\" graphic for a house in Sacramento, featuring the listing agent",
        width: 492,
        height: 615,
        caption: "“Just sold” announcement",
      },
      {
        kind: "video",
        src: "/videos/work/rental-walkthrough-reel.mp4",
        poster: "/videos/work/rental-walkthrough-reel-poster.jpg",
        label: "Rental walkthrough reel of an apartment, with room details as on-screen text",
        caption: "Rental walkthrough reel",
      },
      {
        kind: "video",
        src: "/videos/work/house-for-sale-reel.mp4",
        poster: "/videos/work/house-for-sale-reel-poster.jpg",
        label: "House-for-sale reel showing the yard, the street and the home's interior",
        caption: "House-for-sale reel",
      },
      {
        kind: "video",
        src: "/videos/work/build-progress-reel.mp4",
        poster: "/videos/work/build-progress-reel-poster.jpg",
        label: "Construction reel: aerial footage of a finished development, then how it started",
        caption: "Build-progress reel",
      },
      {
        kind: "video",
        src: "/videos/work/blueprints-to-reality-reel.mp4",
        poster: "/videos/work/blueprints-to-reality-reel-poster.jpg",
        label: "\"From blueprints to reality\" construction progress reel with aerial shots",
        caption: "Construction progress reel",
      },
      {
        kind: "video",
        src: "/videos/work/kickoff-event-recap.mp4",
        poster: "/videos/work/kickoff-event-recap-poster.jpg",
        label: "Recap reel of a kickoff event for a new townhome development, with aerial and event footage",
        caption: "Kickoff event recap",
      },
    ],
    seo: {
      title: "Real Estate & Construction Support Case",
      description:
        "Rental and listing marketing, open house promotion, contractor coordination and project tracking for property and construction businesses.",
    },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
