import { contact } from "@/lib/site";

const SUBJECT = "Enquiry from your website";

/**
 * Opens a new email in Gmail (web compose) with her address, a subject and an
 * opening line filled in, so the visitor only has to add their details.
 * There's no form and no email service to set up: the message goes straight
 * from the visitor's Gmail to her inbox (client decision, 2026-11-13).
 *
 * Pass context (a page or case name) so she knows where the enquiry came from,
 * as with whatsappUrl(). Subject and opening line are XU-drafted copy.
 */
export function emailUrl(context?: string): string {
  const opening = context
    ? `I saw your ${context} on your website and I'd like to talk about getting some support for my business.`
    : "I found your website and I'd like to talk about getting some support for my business.";
  const body = `Hi Miracle,\n\n${opening}\n\n`;
  const query = [
    ["view", "cm"],
    ["fs", "1"],
    ["to", contact.email],
    ["su", SUBJECT],
    ["body", body],
  ]
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `https://mail.google.com/mail/?${query}`;
}
