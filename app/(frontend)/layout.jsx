import localFont from "next/font/local";
import "../globals.css";
import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import WhatsAppWidget from "../../components/site/WhatsAppWidget";
import { SITE_URL, brand, contact, founder } from "../../lib/content/site";

// Inter variable, served locally (next/font/google breaks with Turbopack in Next 16.3, see docs/ARCHITECTURE.md).
const inter = localFont({
  src: [{ path: "./fonts/inter-var-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono for labels, kickers and numbers.
const mono = localFont({
  src: [
    { path: "./fonts/jbm-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jbm-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jbm",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Outlier | AI and transformation for boutique firms",
    template: "%s | The Outlier",
  },
  description:
    "The Outlier builds practical AI systems for boutique firms of 50 to 100 people. Corporate experience, boutique execution. Start with a free assessment.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: brand.name,
    locale: "en_GB",
    title: "The Outlier | Corporate experience. Boutique execution.",
    description: "Practical AI systems for boutique firms of 50 to 100 people, built by someone who ran that complexity from the inside.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Outlier | Corporate experience. Boutique execution.",
    description: "Practical AI systems for boutique firms of 50 to 100 people.",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#1F1D2B" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: brand.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mark.png`,
      image: `${SITE_URL}/logo-mark.png`,
      email: contact.email,
      slogan: brand.tagline,
      address: { "@type": "PostalAddress", addressLocality: contact.city, addressCountry: "NL" },
      areaServed: ["NL", "BE", "EU", "AE"],
      founder: { "@id": `${SITE_URL}/about#founder` },
      sameAs: [contact.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: brand.name,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#founder`,
      name: founder.name,
      jobTitle: "Founder, The Outlier",
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}${founder.photo.src}`,
      sameAs: [contact.linkedin],
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function FrontendLayout({ children }) {
  return (
    <div className={`site-root ${inter.variable} ${mono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-gridlines" aria-hidden="true"><div><span /><span /><span /><span /></div></div>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
