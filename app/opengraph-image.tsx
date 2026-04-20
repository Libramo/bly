import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bly Analytics — Digital Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0b0b0b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
      }}
    >
      {/* Top — accent line */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#4f72ff",
          }}
        />
        <span
          style={{
            fontSize: "14px",
            color: "#555",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          blyanalytics.com
        </span>
      </div>

      {/* Middle — main copy */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "72px",
            color: "#ddd8ce",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Bly Analytics
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#4f72ff",
            letterSpacing: "-0.01em",
          }}
        >
          Digital Consultancy — Djibouti
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#555",
            lineHeight: 1.6,
            maxWidth: "700px",
          }}
        >
          Web platforms, analytics dashboards, and government digitisation for
          East Africa.
        </div>
      </div>

      {/* Bottom — tags */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["Web Platforms", "Gov Digitisation", "Analytics", "East Africa"].map(
          (tag) => (
            <div
              key={tag}
              style={{
                fontSize: "13px",
                color: "#4f72ff",
                border: "1px solid #131825",
                background: "#131825",
                borderRadius: "4px",
                padding: "6px 14px",
              }}
            >
              {tag}
            </div>
          ),
        )}
      </div>
    </div>,
    { ...size },
  );
}
