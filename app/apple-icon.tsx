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
          <path d="M8 10 L22 24 L8 38" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 10 L40 24 L26 38" stroke="#10B981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
