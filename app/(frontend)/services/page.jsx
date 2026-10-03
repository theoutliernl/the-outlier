import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal from "../../../components/ui/Reveal";
import Button from "../../../components/ui/Button";
import ServiceDetail from "../../../components/ui/ServiceDetail";
import MethodGrid from "../../../components/home/MethodGrid";
import FAQ from "../../../components/ui/FAQ";
import CTABand from "../../../components/ui/CTABand";
import { services } from "../../../lib/content/services";
import { SITE_URL, faqs, method } from "../../../lib/content/site";
import styles from "./services.module.css";

export const metadata = {
  title: "AI Services for Boutique Firms: Scan, Sprint, Partner",
  description: "Four fixed-price AI services for boutique firms of 50 to 100 people: AI Friction Scan, Systems Sprint, Fractional Transformation Partner and Partner Workshop.",
  alternates: { canonical: "/services" },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.body,
      url: `${SITE_URL}/services#${s.slug}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["NL", "BE", "EU", "AE"],
      offers: { "@type": "Offer", priceCurrency: "EUR", description: `${s.price} ${s.priceNote}, ${s.duration}` },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <PageHero
        kicker="Services"
        title="Four ways in. One way of working."
        lead="Every engagement has a fixed price, a clear end and numbers at the finish: hours saved, margin improved. If a system will not pay back, we tell you before you spend on it."
        crumbs={[{ label: "Services", href: "/services" }]}
        image={{ src: "/images/px-meeting-point.jpg", alt: "Two consultants discussing a plan at a table" }}
        actions={<><Button href="/start" size="lg" data-outlier-cta="">Find your starting point</Button><Button href="#ai-friction-scan" variant="ghost" size="lg" arrow={false}>See the formats</Button></>}
      />

      <Section size="flush">
        <nav aria-label="Services" className={styles.pills}>
          {services.map((s) => (
            <Link key={s.slug} href={`#${s.slug}`} className={styles.pill}>
              {s.name}<span>{s.price}</span>
            </Link>
          ))}
        </nav>
        {services.map((s, i) => <ServiceDetail key={s.slug} service={s} index={i} flip={i % 2 === 1} />)}
      </Section>

      <Section tone="band">
        <div className={styles.head}>
          <Reveal><Kicker>The method behind every format</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2">Understand, map, build, measure.</Heading></Reveal>
          <Reveal delay={0.1}><Lead>The scan covers the first two steps. A sprint covers all four. The partner role keeps the cycle running.</Lead></Reveal>
        </div>
        <MethodGrid steps={method} />
      </Section>

      <Section>
        <div className={styles.split}>
          <div>
            <Reveal><Kicker>Before you decide</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Common questions</Heading></Reveal>
          </div>
          <FAQ items={faqs.slice(1)} />
        </div>
      </Section>

      <CTABand title="Not sure which format fits?" lead="The five-minute assessment tells you where your firm stands and which starting point makes sense. You get the result straight away." />
    </>
  );
}
