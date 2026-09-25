// The Outlier — brand styleguide tokens (uit Figma "Marketing & Branding", aug 2026)
// Cover: "Corporate experience. Boutique execution" — theoutlier.nl

export const colors = {
  // Core palette
  ink: "#1F1D2B",        // Boardroom Ink — primary surface, dark pages
  slate: "#F3EDE1",      // Clean Slate — light surface
  gold: "#E0A828",       // The Outlier — accent, outlier bar, "IER", rules
  panel: "#2A2740",      // Midnight Framework — secondary surface
  grey: "#5A5568",       // Blueprint Grey — structure, dividers

  // Text op Ink
  "ink-headline": "#F3EDE1",
  "ink-emphasis": "#C7C3D3",
  "ink-body": "#9995AB",
  "ink-caption": "#8A85A0",
  "ink-large-only": "#6E6A80",   // 18pt+ alleen
  "ink-never": "#5A5568",        // nooit als tekst op dark

  // Text op Clean Slate
  "slate-text": "#1F1D2B",
  "slate-grey": "#5A5568",

  // Gold gradient primitives
  "gold-100": "#F0C85A",
  "gold-300": "#E0A828",
  "gold-600": "#B8851C",
  "gold-800": "#8A6210",

  // Warm cream primitives (accents uit de logo/brand frames)
  "warm-100": "#E5C4A3",
  "warm-300": "#C9886D",
  "warm-600": "#A06A52",
};

export const gradients = {
  gold: "linear-gradient(180deg, #F0C85A 0%, #E0A828 50%, #B8851C 100%)",
  ink: "linear-gradient(180deg, #2A2740 0%, #1A1826 100%)",
  warm: "linear-gradient(90deg, #E5C4A3 0%, #C9886D 50%, #A06A52 100%)",
};

export const typography = {
  family: "Inter",
  display: { weight: 700, size: 64, line: 68, use: "Cover only" },
  headline: { weight: 700, size: 40, line: 46, use: "Page titles" },
  subheading: { weight: 400, size: 26, line: 34, use: "Section intros" },
  body: { weight: 400, size: 16, line: 26, use: "Running text" },
  small: { weight: 400, use: "Captions, labels, footnotes" },
};

export const logo = {
  default: "on Boardroom Ink (dark)",
  invert: "on Clean Slate wordmark inverts to ink",
  gold: "on Marigold the outlier bar becomes ink",
  never: ["recolour the outlier bar", "set 'IER' upright", "gold on Clean Slate as text", "tagline + role label together"],
  clearance: { topBottom: "34px", sides: "27px" },
};

// Headline pattern: "IER" in The Outlier gold, italic; rest upright.
// Values: BOLD, INSIDER, SYSTEMS, HUMAN, EVOLVING (vier in Ink, één in Gold).
// Tone: direct, human, confident, honest, grounded — nooit vague, robotic, hyped, sales-driven.