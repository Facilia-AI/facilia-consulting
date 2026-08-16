import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Facilia — We build products. Some become companies.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 640,
            height: 640,
            borderRadius: 640,
            background: "radial-gradient(circle, rgba(46,201,142,0.30), rgba(46,201,142,0))",
            display: "flex",
          }}
        />

        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <path d="M8 10 L22 24 L8 38" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 10 L40 24 L26 38" stroke="#10B981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 42, fontWeight: 600, color: "#fafafa" }}>facilia</span>
            <span
              style={{
                fontSize: 22,
                color: "#2EC98E",
                border: "1px solid rgba(46,201,142,0.4)",
                borderRadius: 999,
                padding: "4px 16px",
                display: "flex",
              }}
            >
              dev
            </span>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 600, color: "#fafafa", lineHeight: 1.06, letterSpacing: -2 }}>
            We build products.
          </span>
          <span style={{ fontSize: 76, fontWeight: 600, color: "#9b9ba4", lineHeight: 1.06, letterSpacing: -2 }}>
            Some become companies.
          </span>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#9b9ba4" }}>
          <span style={{ display: "flex" }}>Product &amp; venture builder</span>
          <span style={{ display: "flex", color: "#3a3a40" }}>·</span>
          <span style={{ display: "flex" }}>Built in Latin America</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
