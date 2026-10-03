import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal, { Stagger, StaggerItem } from "../../../components/ui/Reveal";
import CompareTeaser from "../../../components/home/CompareTeaser";
import PostCards from "../../../components/ui/PostCards";
import CTABand from "../../../components/ui/CTABand";
import { Logo } from "../../../components/Brand";
import { compareRows, dialogue } from "../../../lib/content/compare";
import { getPublishedComparisons } from "../../../lib/blog";
import styles from "./compare.module.css";

export const revalidate = 300;

export const metadata = {
  title: "The Outlier vs Big Consultancies: An Honest Comparison",
  description: "Big consultancies are built for global corporations. The Outlier is built for boutique firms of 50 to 100 people. An honest, Mac-versus-PC style comparison.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage() {
  let posts = [];
  try {
    posts = await getPublishedComparisons();
  } catch (err) {
    console.error("[compare] posts unavailable:", err?.message);
  }
  return (
    <>
      <PageHero
        kicker="Mac versus PC"
        title="Two ways to bring AI into your firm."
        lead="Big consultancies are good at what they do. They are built for global corporations. The Outlier is built for boutique firms of 50 to 100 people. Different machines, different jobs."
        crumbs={[{ label: "Compare", href: "/compare" }]}
      />

      <Section size="tight" style={{ paddingTop: 0 }}>
        <div className={styles.stage}>
          <div className={styles.cast} aria-hidden="true">
            <div className={styles.castBig}><span>Big consultancy</span></div>
            <div className={styles.castUs}><Logo size={26} /></div>
          </div>
          <Stagger className={styles.dialogue} gap={0.12}>
            {dialogue.map(([who, line], i) => (
              <StaggerItem key={i} className={who === "us" ? styles.us : styles.big}>
                <span className={styles.who}>{who === "us" ? "The Outlier" : "Big consultancy"}</span>
                <p>{line}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="band">
        <div className={styles.head}>
          <Reveal><Kicker>The difference at a glance</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2">Scale versus attention.</Heading></Reveal>
          <Reveal delay={0.1}><Lead>Big firms bring scale, global reach and deep benches. We respect that. Here is where a boutique firm is better served by a boutique partner.</Lead></Reveal>
        </div>
        <CompareTeaser rows={compareRows} />
      </Section>

      {posts.length > 0 && (
        <Section>
          <div className={styles.head}>
            <Reveal><Kicker>Honest comparisons</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Including when a big firm is the better choice.</Heading></Reveal>
          </div>
          <PostCards posts={posts} />
        </Section>
      )}

      <Section size="tight">
        <p className={styles.legal}>Company names are trademarks of their respective owners. Comparisons reflect publicly available information as of October 2026.</p>
      </Section>
      <CTABand kicker="See it for yourself" title="Find out which machine your firm needs." />
    </>
  );
}
