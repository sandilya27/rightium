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
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #170b63, #3a1fd6)",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 26 26">
          <circle cx="12" cy="12" r="5.4" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="19.5" cy="6.5" r="3.4" fill="#8a7bff" />
        </svg>
      </div>
    ),
    size,
  );
}
