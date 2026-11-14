import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Indexable only on the production deployment. Previews and staging are
 * blocked so they never compete with the live site (05 SEO: robots correct,
 * and noindex removed only in production).
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "true";
  return {
    rules: isProduction
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", env.NEXT_PUBLIC_SITE_URL).toString(),
  };
}
