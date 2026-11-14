import type { Metadata, Viewport } from "next";
import { Allura, Hanken_Grotesk, Spectral } from "next/font/google";
import { MediaGuard } from "@/components/layout/media-guard";
import { env } from "@/lib/env";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Display: Spectral, a screen-first editorial serif. Chosen over Bodoni Moda
 * (client feedback 2026-11-11: hard to read): sturdier hairlines hold up at
 * heading sizes and in light type on the Cherry and Bordeaux fields.
 */
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  // One weight: every extra font file competes with the LCP headline on
  // slow connections (05 performance budget). Hierarchy comes from size.
  weight: "400",
  style: "normal",
  // swap, not optional: with optional, slow first visits render the cover
  // line in a system serif (craft floor refuses a system display face), and
  // it did not improve LCP in testing. The face is preloaded.
  display: "swap",
});

/**
 * Script accent: a short phrase in a few headings (client request,
 * 2026-11-14: "a little cursive"). Allura: a refined copperplate script that
 * stays legible at heading sizes. Not preloaded: it never carries the LCP.
 */
const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

/** Body: her long first-person copy, forms, captions. */
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  // Preloaded: body copy is in every first viewport and is the LCP element on
  // some pages (the intro on /contact at phone width). Without the preload the
  // file is only found after layout, so first paint waited on it (05 LCP).
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${site.name} · ${site.role} for Businesses`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  // Vanilla Silk (--color-bg). Meta tags can't read CSS variables.
  themeColor: "#eee6db",
};

/*
 * Direction contract (impeccable new-work §5). Kept in the built HTML so
 * the finish review can audit the render against it.
 */
const DIRECTION_CONTRACT = `
THESIS: The feature profile. A business-magazine profile of Miracle Joy: cover line, portrait, headline facts, contents index. Premium and elegant, never minimal (v1 minimal was rejected by the client).
OWN-WORLD: Client palette at page scale (sampled from her reference card). Cherry Velvet and Bordeaux Noir fields, Vanilla Silk and Alpine Oat grounds, Warm Greige rules. Spectral serif cover lines (400), Hanken body, spaced serif-caps masthead, sharp print corners, Iconoir 1.5 stroke.
STORY: An owner sees what she takes off their plate, believes it through verified numbers and named work areas, and messages her on WhatsApp.
FIRST VIEWPORT: Cherry field. Short cover line at display size with a deck under it, left 7 cols. Desktop: portrait right 5 cols, top-aligned with the cover line, on the field. Phones and tablets: one column, portrait crossing the field edge. WhatsApp action under the intro. Service marquee (with pause control) at the hero foot.
FORM: Bold editorial, pinned by the client (direction question, option 1). Roll not run: pinned direction.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable} ${allura.variable}`}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }} />
        {children}
        <MediaGuard />
      </body>
    </html>
  );
}
