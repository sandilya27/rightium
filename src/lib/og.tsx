/**
 * Shared renderer for Open Graph / social cards. Used by the
 * `opengraph-image` routes so every shared link carries the brand.
 */

import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#ffffff",
          backgroundColor: "#0b0630",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(138,123,255,0.55), transparent 45%), radial-gradient(circle at 10% 100%, rgba(58,31,214,0.7), transparent 50%), linear-gradient(135deg, #020108 0%, #170b63 60%, #2a14a8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 26 26">
            <rect width="26" height="26" rx="8" fill="#ffffff" />
            <circle cx="12" cy="12" r="5.4" fill="none" stroke="#0b0630" strokeWidth="2" />
            <circle cx="19.5" cy="6.5" r="3.4" fill="#8a7bff" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 60 ? 58 : 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          <span>{new URL(site.url).hostname}</span>
          <span>{site.phone}</span>
          <span>{site.address.city}, India</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
