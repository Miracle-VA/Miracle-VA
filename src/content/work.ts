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
 * Still needed from her (docs/content-matrix.md): the specific situation for
 * each case and redacted samples. Until samples are redacted and approved,
 * case pages show no images (client rule: anonymise everything).
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
  seo: { title: string; description: string };
}

export const workPage = {
  heading: "Selected work",
  intro:
    "My work spans executive assistance, client relations, digital advertising, CRM systems, project coordination, social media, and real estate and construction operations. Client names and private details are kept out of every example.",
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
