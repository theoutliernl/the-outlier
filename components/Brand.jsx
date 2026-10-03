/**
 * The Outlier brand primitives (design/tokens.js, Fariza's correcties 29-30 sep):
 * - Mark: vijf balken, de middelste is de outlier-balk (goud op donker, ink op goud/licht).
 * - Wordmark: "THE" klein en verhoogd NAAST "OUTLIER" (nooit erboven),
 *   alleen "IER" cursief. Goud alleen op donker; op goud of Clean Slate wordt IER ink.
 * Gebruik deze twee overal; bouw het logo nergens los na.
 */
const TONES = {
  dark: { base: "#F3EDE1", accent: "#E0A828" }, // op Boardroom Ink / Midnight Framework
  gold: { base: "#1F1D2B", accent: "#1F1D2B" }, // op Marigold: de outlier-balk wordt ink
  light: { base: "#1F1D2B", accent: "#1F1D2B" }, // op Clean Slate: nooit goud als tekst
};

export function Mark({ size = 38, tone = "dark" }) {
  const { base, accent } = TONES[tone];
  return (
    <svg width={size * 1.103} height={size} viewBox="0 0 37.5 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", flex: "none" }}>
      <rect x="0" y="7" width="6.3" height="27" rx="3.15" fill={base} />
      <rect x="7.8" y="14.5" width="6.3" height="19.5" rx="3.15" fill={base} />
      <rect x="15.6" y="0" width="6.3" height="34" rx="3.15" fill={accent} />
      <rect x="23.4" y="11.5" width="6.3" height="22.5" rx="3.15" fill={base} />
      <rect x="31.2" y="9.5" width="6.3" height="24.5" rx="3.15" fill={base} />
    </svg>
  );
}

export function Wordmark({ size = 24, tone = "dark" }) {
  const { base, accent } = TONES[tone];
  return (
    <span className="wordmark-logo" style={{ fontSize: size, color: base }}>
      <span className="wm-the">THE</span>
      <span className="wm-name">
        OUTL<span className="wm-ier" style={{ color: accent }}>IER</span>
      </span>
    </span>
  );
}

/** Mark + wordmark als één logo-lockup. */
export function Logo({ size = 30, tone = "dark" }) {
  return (
    <span className="logo-lockup" style={{ gap: Math.round(size * 0.45) }}>
      <Mark size={size} tone={tone} />
      <Wordmark size={Math.round(size * 0.78)} tone={tone} />
    </span>
  );
}
