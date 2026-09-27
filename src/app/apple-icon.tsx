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
          backgroundColor: "#0a1f33",
          backgroundImage: "linear-gradient(135deg, #0f2f4c, #061524)",
          color: "#ffffff",
          fontFamily: "serif",
        }}
      >
        <span style={{ fontSize: 104, lineHeight: 1 }}>R</span>
        <span style={{ width: 18, height: 18, backgroundColor: "#00a8b6", marginBottom: 12 }} />
      </div>
    ),
    size,
  );
}
