import localFont from "next/font/local";
import "../globals.css";

// Inter variable font, lokaal meegeleverd (next/font/google is broken met
// Turbopack in Next 16.3 — zie docs/ARCHITECTURE.md). Visueel identiek.
const inter = localFont({
  src: [
    { path: "./fonts/inter-var-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono voor labels/kickers/nummers (ui-ux-pro-max editorial-advies)
const mono = localFont({
  src: [
    { path: "./fonts/jbm-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jbm-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Outlier — AI and Transformation for boutique firms",
    template: "%s — The Outlier",
  },
  description:
    "The Outlier bouwt praktische, AI-ondersteunde systemen voor boutique adviesbureaus. Corporate ervaring van binnenuit: bijna twintig jaar HR, Global Mobility en transformatie.",
  keywords: [
    "boutique consultancy systemen",
    "AI adviesbureau",
    "organisatieadvies ondersteuning",
    "transformation partner",
    "The Outlier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Outlier",
    title: "The Outlier — Corporate experience. Boutique execution",
    description:
      "Praktische AI-ondersteunde systemen voor boutique adviesbureaus, gebouwd door iemand die die complexiteit twintig jaar van binnenuit leidde.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Outlier — Corporate experience. Boutique execution",
    description:
      "Praktische AI-ondersteunde systemen voor boutique adviesbureaus, gebouwd door iemand die die complexiteit twintig jaar van binnenuit leidde.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "The Outlier",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mark.png`,
      email: "hello@theoutlier.nl",
      address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
      founder: { "@type": "Person", name: "Fariza Sbaa", jobTitle: "Founder", url: "https://www.linkedin.com/in/fariza-sbaa" },
      slogan: "Corporate experience. Boutique execution",
      sameAs: ["https://www.linkedin.com/in/fariza-sbaa"],
    },
    {
      "@type": "WebSite",
      name: "The Outlier",
      url: SITE_URL,
      inLanguage: "nl",
      publisher: { "@type": "Organization", name: "The Outlier" },
    },
    {
      "@type": "Person",
      name: "Fariza Sbaa",
      jobTitle: "Founder — The Outlier",
      url: `${SITE_URL}/#founder`,
      sameAs: ["https://www.linkedin.com/in/fariza-sbaa"],
      description:
        "Founder van The Outlier. Senior Global Mobility Advisor bij Monks; daarvoor ING (14 jaar), Heineken en Prosus. Bijna twintig jaar HR, Global Mobility en transformatie van binnenuit.",
      alumniOf: ["ING", "Heineken International", "Monks"],
    },
  ],
};

export default function FrontendLayout({ children }) {
  return (
    <div className={mono.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
}
