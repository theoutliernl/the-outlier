import { ImageResponse } from "next/og";

export const alt = "The Outlier — Corporate experience. Boutique execution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#1F1D2B",
          color: "#F3EDE1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 54 }}>
            {[[43, "#F3EDE1"], [31, "#F3EDE1"], [54, "#E0A828"], [36, "#F3EDE1"], [39, "#F3EDE1"]].map(([h, c], i) => (
              <div key={i} style={{ width: 10, height: h, background: c, borderRadius: 5 }} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 4 }}>THE</span>
            <span style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
              OUTL<span style={{ fontStyle: "italic", color: "#E0A828" }}>IER</span>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1.12 }}>
            Corporate experience.
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1.12 }}>
              Boutique&nbsp;
            </span>
            <span
              style={{
                fontSize: 74,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.12,
                fontStyle: "italic",
                background: "linear-gradient(180deg,#F0C85A,#E0A828)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              execution.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#9995AB", fontSize: 24 }}>
          <span>AI &amp; Transformation Partner</span>
          <span style={{ color: "#E0A828" }}>theoutlier.nl</span>
        </div>
      </div>
    ),
    { ...size }
  );
}