import { contact } from "@/lib/site";

const DEFAULT_MESSAGE =
  "Hi Miracle, I found your website and I'd like to talk about getting some support for my business.";

/**
 * Builds WhatsApp's official click-to-chat link with a pre-filled message:
 * opens the app on phones, WhatsApp Web or Desktop on computers.
 *
 * Uses api.whatsapp.com rather than the wa.me short link: on 2026-11-14 a
 * test network's DNS resolved wa.me to a non-WhatsApp server (Chrome showed
 * "Your connection is not private"), while api.whatsapp.com resolved to Meta
 * correctly. Some of her visitors may be on networks that do the same.
 *
 * Pass context (a page or case name) so she knows where the enquiry came from.
 */
export function whatsappUrl(context?: string): string {
  const message = context
    ? `Hi Miracle, I saw your ${context} on your website and I'd like to talk about getting some support for my business.`
    : DEFAULT_MESSAGE;
  return `https://api.whatsapp.com/send?phone=${contact.whatsappNumber}&text=${encodeURIComponent(message)}`;
}
