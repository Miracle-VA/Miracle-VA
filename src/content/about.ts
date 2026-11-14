/**
 * About: her own words (portfolio §02 About Me, §04 Professional Background,
 * §05 Industries, §06 Tools, §08 Why Work With Me). Responsibilities only,
 * never employer names (her instruction, §04).
 */

export const about = {
  heading: "I'm Miracle Joy.",
  lede: "An Executive Assistant with experience in client relations, digital marketing, project management, and business operations.",
  paragraphs: [
    "I've supported business owners and teams in real estate, construction, property management, marketing, and other service-based businesses.",
    "My work isn't limited to managing calendars and inboxes. I also coordinate projects, communicate with clients, organize CRM systems, manage leads, support Facebook and Google Ads, and create content for social media. I like having a clear picture of what's happening, following through on the details, and keeping people updated.",
    "Some days that means organizing schedules and documents. Other days it means checking campaign performance, coordinating with contractors, updating a tracker, or researching a better way to handle a task. I take initiative, ask questions when needed, and enjoy learning new systems.",
  ],
  pullQuote: "Most importantly, I want clients to feel they have someone dependable on their team.",
  portrait: {
    src: "/images/miracle-joy-mangsal-portrait-armchair.png",
    alt: "Miracle Joy Mangsal seated in an armchair, wearing a wine-coloured blazer",
    width: 1024,
    height: 1536,
  },
  basedIn: "Based in the Philippines · Remote support for international businesses",
} as const;

export const background = [
  {
    title: "Executive Assistance & Operations",
    text: "Managed schedules, inboxes, research, documentation, and administrative processes for busy business owners.",
  },
  {
    title: "Client Relations & Customer Support",
    text: "Coordinated client communication, follow-ups, service requests, and customer inquiries.",
  },
  {
    title: "Digital Advertising",
    text: "Supported Meta and Google Ads campaigns with budget checks, reporting, creative updates, and optimization.",
  },
  {
    title: "GoHighLevel & CRM",
    text: "Organized contacts, leads, pipelines, workflows, and follow-up systems.",
  },
  {
    title: "Project Management",
    text: "Tracked deadlines, coordinated stakeholders, maintained project documents, and provided status updates.",
  },
  {
    title: "Social Media & Creative",
    text: "Planned, designed, edited, scheduled, and reviewed social media content across several platforms.",
  },
  {
    title: "Real Estate & Construction",
    text: "Supported property promotion, contractor coordination, warranty/service tracking, research, and marketing.",
  },
] as const;

export const industries = [
  "CEOs, founders, and entrepreneurs",
  "Real estate professionals and property owners",
  "Property management businesses",
  "Construction and homebuilding companies",
  "Marketing and advertising agencies",
  "Professional service businesses",
  "Small businesses and growing teams",
  "Other service-based businesses needing remote support",
] as const;

export const tools = [
  { group: "Executive & admin", items: ["Google Workspace", "Microsoft 365", "Gmail", "Outlook", "Calendly", "Zoom", "Slack"] },
  { group: "Project management", items: ["ClickUp", "Asana", "Trello", "Notion", "Lark"] },
  { group: "Paid ads & business profiles", items: ["Meta Ads Manager", "Google Ads", "Meta Business Suite", "Google Business Profile"] },
  { group: "CRM & lead tools", items: ["GoHighLevel", "HubSpot", "Pipedrive", "LeadSimple", "Reply.io", "MeetAlfred"] },
  { group: "Creative & social", items: ["Canva", "CapCut", "WordPress", "Buffer", "Metricool", "Opus"] },
  { group: "Financial admin", items: ["Xero", "QuickBooks Online", "Microsoft Excel", "Google Sheets"] },
  { group: "Automation", items: ["Zapier"] },
] as const;

export const whyWorkWithMe = {
  heading: "Why work with me?",
  paragraphs: [
    "I know how quickly the small tasks can pile up when you're running a business. I work across admin, client relations, marketing, and project coordination, so I can help connect the details instead of looking at every task in isolation.",
    "I value clear communication, staying organized, and following through. When something is new to me, I research it, ask the right questions, and work to find a solution. I want clients to feel confident that things are being handled and that they'll hear from me when something needs attention.",
  ],
} as const;

/** Closing call to action used on several pages: her §10 copy. */
export const closing = {
  heading: "Need an extra hand with your business?",
  text: "Whether you need help with your schedule, client communication, marketing, or projects, I'd love to hear what you're working on. Tell me a little about your business and what support you need, and let's see if we're a good fit.",
} as const;
