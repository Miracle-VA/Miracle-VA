import { contact } from "@/lib/site";

const DEFAULT_MESSAGE =
  "Hi Miracle, I found your website and I'd like to talk about getting some support for my business.";

/**
 * Builds a wa.me deep link with a pre-filled message.
 * Pass context (a page or case name) so she knows where the enquiry came from.
 */
export function whatsappUrl(context?: string): string {
  const message = context
    ? `Hi Miracle, I saw your ${context} on your website and I'd like to talk about getting some support for my business.`
    : DEFAULT_MESSAGE;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
