/**
 * Testimonials, transcribed from the WhatsApp screenshots in her
 * client-info folder (2026-11-14). Never shown as screenshots.
 *
 * - Words are the senders' own. Edits are limited to punctuation and
 *   capitalisation, one typo the sender corrected in their next message
 *   ("keep Ik" → "keep up"), dropped emoji, and one aside left out (marked …).
 * - Anonymous by her rule ("anonymise everything"): no names, photos,
 *   businesses or timestamps. Her own replies in the screenshots aren't used.
 * - Don't add a quote that isn't in a screenshot she supplied.
 */
export interface Testimonial {
  quote: string;
  /** Where the words come from. Never a name unless the person agrees. */
  source: string;
}

const source = "Client · WhatsApp message";

export const testimonials = {
  heading: "In my clients' words",
  note: "Excerpts from messages clients have sent me on WhatsApp. Names are left out to protect their privacy.",
  lead: {
    quote:
      "I'm so happy we've gotten to this point in our journey together. This is where having you on board will truly pay off!",
    source,
  },
  items: [
    { quote: "You're the best! Thank you, MJ. This looks great! You're a Canva wiz!", source },
    {
      quote:
        "Thank you. You are shaping up to be an amazing asset to me. I want you to know every comment you make and how you handle yourself is all noted.",
      source,
    },
    {
      quote: "I do love what you did. … Thank you for being so open-minded too. Love working with you, MJ!!!",
      source,
    },
    {
      quote:
        "We are so happy to have you on our team and to watch your growth :) It's just the beginning. Imagine what you can accomplish in 1 year.",
      source,
    },
    { quote: "I appreciate your hard work. You are a very valuable member.", source },
    { quote: "You're amazing, keep up the good work.", source },
  ],
} as const satisfies {
  heading: string;
  note: string;
  lead: Testimonial;
  items: readonly Testimonial[];
};
