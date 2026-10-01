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
            {[26, 38, 20, 32].map((h, i) => (
              <div key={i} style={{ width: 9, height: h, background: "rgba(255,255,255,0.55)", borderRadius: 2 }} />
            ))}
            <div style={{ width: 11, height: 54, background: "linear-gradient(180deg,#F0C85A,#E0A828)", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>THE OUTLIER</div>
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