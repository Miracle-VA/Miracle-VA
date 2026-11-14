import { z } from "zod";

/**
 * Environment, validated at startup. A missing or malformed variable
 * fails the build instead of failing silently in production.
 * Add form-delivery variables (e.g. RESEND_API_KEY) when the contact form is built.
 */
const isDev = process.env.NODE_ENV === "development";

const schema = z.object({
  // Optional only in `next dev`; required for every build.
  NEXT_PUBLIC_SITE_URL: isDev ? z.url().default("http://localhost:3000") : z.url(),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
