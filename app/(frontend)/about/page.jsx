import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal from "../../../components/ui/Reveal";
import Button from "../../../components/ui/Button";
import ValueList from "../../../components/ui/ValueList";
import FounderBlock from "../../../components/home/FounderBlock";
import Media from "../../../components/ui/Media";
import CTABand from "../../../components/ui/CTABand";
import { founder, values } from "../../../lib/content/site";
import styles from "../page-common.module.css";

export const metadata = {
  title: "About The Outlier: Corporate Experience, Boutique Execution",
  description: "The Outlier was founded by Fariza Sbaa after nearly two decades inside international organisations. Why we build systems for boutique firms only.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Built from the inside."
        lead="The Outlier exists because boutique firms deserve the systems corporates take for granted, without the corporate weight that usually comes with them."
        crumbs={[{ label: "About", href: "/about" }]}
        image={{ src: "/images/px-woman-focused.jpg", alt: "A consultant working with focus at her desk" }}
      />

      <Section tone="band">
        <div className={styles.twoCol}>
          <div>
            <Reveal><Kicker>Why we exist</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Corporates have transformation teams. Boutique firms have their experts.</Heading></Reveal>
          </div>
          <div className={styles.prose}>
            <Reveal><p>A firm of 50 to 100 people runs on the knowledge of its partners and specialists. That is its strength, and its bottleneck: every proposal, onboarding and report passes through the same few heads.</p></Reveal>
            <Reveal delay={0.05}><p>Large organisations solve this with transformation offices, process owners and internal IT. Boutique firms cannot, and should not, copy that structure. They need the systems without the bureaucracy.</p></Reveal>
            <Reveal delay={0.1}><p>That is the gap The Outlier fills. We bring the experience of running complex organisations from the inside, and we apply it at the scale of a partnership: small, fast, measurable and built around the people who do the work.</p></Reveal>
          </div>
        </div>
      </Section>

      <Section id="founder">
        <FounderBlock founder={founder} link={false} />
      </Section>

      <Section tone="band">
        <div className={styles.head}>
          <Reveal><Kicker>What we stand for</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2">Five values. No slogans.</Heading></Reveal>
        </div>
        <ValueList items={values} />
      </Section>

      <Section>
        <div className={styles.twoCol}>
          <Reveal><Media src="/images/px-mentor-session.jpg" alt="A one-to-one working session between two professionals" ratio="5/4" /></Reveal>
          <div>
            <Reveal><Kicker>How we work with you</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Senior, hands-on and honest.</Heading></Reveal>
            <Reveal delay={0.1}><Lead>The person you meet is the person who does the work. We publish our prices, measure every system and say so when something is not worth building.</Lead></Reveal>
            <Reveal delay={0.15} className={styles.actions}><Button href="/services">See the services</Button><Button href="/team" variant="ghost" arrow={false}>Meet the team</Button></Reveal>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
