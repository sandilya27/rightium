import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 8,
          paddingBottom: 44,
          backgroundColor: "#202f3d",
          color: "#ffffff",
          fontFamily: "serif",
        }}
      >
        <span style={{ fontSize: 104, lineHeight: 1 }}>R</span>
        <span style={{ width: 18, height: 18, backgroundColor: "#a5d6ca", marginBottom: 12 }} />
      </div>
    ),
    size,
  );
}
