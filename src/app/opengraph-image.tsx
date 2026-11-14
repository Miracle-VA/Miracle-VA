import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Share image for every page (05 SEO: OG image). Cherry Velvet field, her
 * name and role, the desk portrait. Colours mirror the tokens (OG images
 * can't read CSS). Uses next/og's bundled default face: no font fetch at build.
 */
export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public/images/miracle-joy-mangsal-portrait-desk.png"),
  );
  const src = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#5a1c21" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: "72px 64px",
            color: "#eee6db",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#c9bcb1" }}>
            {site.role}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -2 }}>{site.name}</div>
            <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.3, color: "#c9bcb1" }}>
              Your business has enough moving parts. Let me handle some of them.
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#c9bcb1" }}>Based in the Philippines · Remote support</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- next/og renders <img>; the card's alt is set above */}
        <img src={src} width={480} height={630} style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
      </div>
    ),
    { ...size },
  );
}
