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
          backgroundColor: "#202f3d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.01em" }}>
            {site.name}
          </span>
          <span style={{ width: 12, height: 12, backgroundColor: "#a5d6ca", marginBottom: 8 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#a5d6ca",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 60 ? 58 : 72,
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
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
            color: "#d2dfe4",
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
