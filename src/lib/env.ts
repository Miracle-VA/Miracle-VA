import { z } from "zod";

/**
 * Environment, validated at startup. A missing or malformed value fails the
 * build instead of failing silently in production.
 *
 * The site's base URL (canonical links, Open Graph, sitemap, structured data)
 * comes from, in order:
 * 1. NEXT_PUBLIC_SITE_URL, if set. Set it once her own domain is live.
 * 2. On Vercel, the URL Vercel provides: the project's production domain for
 *    production builds, the deployment's own URL for previews. So a Vercel
 *    build needs no variables at all.
 * 3. In `next dev`, http://localhost:3000.
 * Anywhere else (a local `next build`, CI) it must be set.
 *
 * Only server code imports this (layout metadata, robots, sitemap, JSON-LD).
 */
function vercelUrl(): string | undefined {
  const host =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : (process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL);
  return host ? `https://${host}` : undefined;
}

const fromEnv = (value: string | undefined) => (value?.trim() ? value.trim() : undefined);

const siteUrl =
  fromEnv(process.env.NEXT_PUBLIC_SITE_URL) ??
  vercelUrl() ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url({
    message:
      "NEXT_PUBLIC_SITE_URL is missing or invalid. Set it to the site's public URL (no trailing slash). On Vercel it's derived automatically.",
  }),
});

export const env = schema.parse({ NEXT_PUBLIC_SITE_URL: siteUrl });
