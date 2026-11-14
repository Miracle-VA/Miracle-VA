"use client";

// Client component: the last-resort boundary when the root layout itself fails.
// It replaces <html> and <body>, so it can't rely on the layout's fonts or
// CSS; styles are inline and the colours mirror the tokens.

import { contact } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          background: "#8e1b2c",
          color: "#f4ebdd",
          font: "18px/1.6 system-ui, sans-serif",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", lineHeight: 1, margin: 0 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: 24 }}>
            Please try again, or message me on WhatsApp ({contact.whatsappDisplay}).
          </p>
          <p style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 32 }}>
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: 52,
                padding: "0 24px",
                border: 0,
                borderRadius: 2,
                background: "#f4ebdd",
                color: "#2e0f15",
                font: "600 18px system-ui, sans-serif",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href={whatsappUrl()}
              style={{ color: "#f4ebdd", fontWeight: 600, alignSelf: "center" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
