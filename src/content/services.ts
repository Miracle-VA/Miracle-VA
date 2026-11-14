/**
 * Services: her ten areas, in her order, in her words (portfolio §03).
 * `id` is the /services anchor (docs/content-matrix.md). `caseSlug` links an
 * area to its case study on /work. Edit copy here, not in components.
 */

export interface ServiceArea {
  id: string;
  title: string;
  /** Her one-line description. */
  intro: string;
  items: string[];
  /** Matching case study, if one exists. */
  caseSlug?: string;
  /** Required qualifier shown with the area. */
  note?: string;
}

export const servicesPage = {
  heading: "Services",
  intro:
    "From client communication and project coordination to CRM management, advertising, and social media, I can take care of the work that needs attention so you have more time to focus on your business.",
} as const;

export const serviceAreas: ServiceArea[] = [
  {
    id: "executive-admin",
    title: "Executive & Administrative Assistance",
    intro: "Support with the day-to-day responsibilities that take up an executive's time.",
    items: [
      "Executive and personal assistance",
      "Email and inbox organization",
      "Calendar management, scheduling, and meeting coordination",
      "Meeting agendas, notes, and follow-ups",
      "Travel research and itinerary planning",
      "Document preparation and file organization",
      "Data entry, spreadsheets, and administrative reporting",
      "Online research and daily business support",
    ],
    caseSlug: "executive-admin-support",
  },
  {
    id: "client-relations",
    title: "Client Relations & Lead Management",
    intro:
      "Keeping communication organized and making sure inquiries and follow-ups do not get overlooked.",
    items: [
      "Client communications and relationship management",
      "Lead generation, prospect research, and list building",
      "Lead tracking, qualification support, and follow-up",
      "Appointment setting and coordination",
      "CRM updates and contact management",
      "Client onboarding and customer support",
      "Email outreach and customer inquiries",
    ],
    caseSlug: "gohighlevel-lead-management",
  },
  {
    id: "ads",
    title: "Facebook, Instagram & Google Advertising",
    intro:
      "Hands-on support for paid campaigns, from setup and monitoring to reporting and optimization.",
    items: [
      "Meta Ads (Facebook and Instagram) support",
      "Google Ads campaign support",
      "Campaign setup and creative coordination",
      "Budget monitoring and performance checks",
      "Audience and geographic targeting support",
      "Creative refreshes and testing",
      "Performance reports, bookings/leads tracking, and optimization recommendations",
    ],
    caseSlug: "google-ads-booked-appointments",
  },
  {
    id: "gohighlevel",
    title: "GoHighLevel & CRM Support",
    intro:
      "Organizing leads, pipelines, calendars, and follow-up processes so teams can see what needs attention.",
    items: [
      "GoHighLevel Funnels and CRM management",
      "Lead pipelines and opportunity tracking",
      "Workflow and automation setup or maintenance",
      "Calendar and appointment configuration support",
      "Lead follow-up organization",
      "CRM data cleanup and troubleshooting",
    ],
    caseSlug: "gohighlevel-lead-management",
  },
  {
    id: "projects",
    title: "Project Management & Coordination",
    intro: "Keeping tasks, people, and deadlines connected.",
    items: [
      "Project planning and task coordination",
      "Project boards, trackers, and documentation",
      "Team, client, and contractor communication",
      "Deadline and status monitoring",
      "Meeting coordination and action-item follow-up",
      "Workflow organization and progress reporting",
    ],
  },
  {
    id: "social-media",
    title: "Social Media Management & Content Marketing",
    intro: "Helping businesses show up consistently and communicate with their audiences.",
    items: [
      "Facebook, Instagram, LinkedIn, TikTok, and YouTube Shorts support",
      "Content planning and editorial calendars",
      "Captions, content writing, and publishing",
      "Social engagement and community management",
      "Social media analytics and reporting",
      "Content marketing and promotional support",
    ],
    caseSlug: "social-media-content",
  },
  {
    id: "design-video",
    title: "Graphic Design & Video Editing",
    intro: "Simple, useful creative assets for social posts and campaigns.",
    items: [
      "Canva social media graphics and carousels",
      "Promotional and property marketing designs",
      "Reels, short-form video, and YouTube Shorts editing",
      "Captions, subtitles, and basic transitions",
      "Ad creative preparation and content repurposing",
    ],
    caseSlug: "social-media-content",
  },
  {
    id: "real-estate-construction",
    title: "Real Estate, Property Management & Construction Support",
    intro:
      "Operational and marketing support for property owners, real estate professionals, and construction CEOs.",
    items: [
      "Property listing promotion and rental marketing",
      "Prospect inquiries, lead tracking, and follow-ups",
      "Open house promotion and outreach",
      "Contractor scheduling and communication",
      "Project, warranty, and service-request tracking",
      "Property and competitor research",
      "Administrative records, trackers, and coordination",
    ],
    caseSlug: "real-estate-construction",
  },
  {
    id: "research",
    title: "Online Research & Business Support",
    intro: "Research and organized information that help owners make decisions and act faster.",
    items: [
      "Market and competitor research",
      "Prospect and contact research",
      "Business and event research",
      "Data gathering, verification, and organization",
      "Spreadsheets, trackers, and summary reports",
    ],
  },
  {
    id: "bookkeeping",
    title: "Basic Bookkeeping & Financial Administration",
    intro: "Foundational recordkeeping and organization, not tax or licensed accounting services.",
    items: [
      "Income and expense tracking",
      "Invoice preparation and receipt organization",
      "Transaction recording and financial spreadsheets",
      "Basic Xero, QuickBooks Online, and Excel support",
    ],
    note: "Not tax or licensed accounting services.",
  },
];
