import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { env } from "@/lib/env";

/** Generated from the content, never hand-maintained (build-system/03, SEO). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const pages = ["/", "/services", "/work", "/about", "/contact", "/privacy"];
  return [
    ...pages.map((path) => ({
      url: new URL(path, base).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/privacy" ? 0.3 : 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: new URL(`/work/${c.slug}`, base).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
