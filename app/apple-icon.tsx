import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          backgroundColor: "#09090b",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
          <path d="M9 11 L24 24 L9 37" stroke="#F5F5F6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 11 L40 24 L25 37" stroke="#F5F5F6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
