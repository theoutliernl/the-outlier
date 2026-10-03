import Hero from "../../components/home/Hero";
import ProblemRows from "../../components/home/ProblemRows";
import MethodGrid from "../../components/home/MethodGrid";
import ServiceCards from "../../components/home/ServiceCards";
import CompareTeaser from "../../components/home/CompareTeaser";
import FounderBlock from "../../components/home/FounderBlock";
import Section from "../../components/ui/Section";
import Heading, { Accent } from "../../components/ui/Heading";
import Kicker from "../../components/ui/Kicker";
import Lead from "../../components/ui/Lead";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import Marquee from "../../components/ui/Marquee";
import StatStrip from "../../components/ui/StatStrip";
import PostCards from "../../components/ui/PostCards";
import FAQ from "../../components/ui/FAQ";
import CTABand from "../../components/ui/CTABand";
import LottieIcon from "../../components/ui/LottieIcon";
import { faqs, founder, marqueeItems, method, problems, stats } from "../../lib/content/site";
import { services } from "../../lib/content/services";
import { compareRows } from "../../lib/content/compare";
import { getPublishedPosts } from "../../lib/blog";
import styles from "./home.module.css";

export const revalidate = 300;

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  let posts = [];
  try {
    posts = await getPublishedPosts({ limit: 3 });
  } catch (err) {
    console.error("[home] posts unavailable:", err?.message);
  }

  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />

      <Section size="tight" className={styles.stats}>
        <StatStrip items={stats} />
      </Section>

      <Section id="problem">
        <div className={styles.split}>
          <div>
            <Reveal><Kicker>The gap</Kicker></Reveal>
            <Reveal delay={0.05}>
              <Heading size="h2" className={styles.splitTitle}>Bigger than a start-up. Smaller than a corporation. <Accent>Stuck</Accent> in between.</Heading>
            </Reveal>
            <Reveal delay={0.1}><Lead>That is exactly where boutique firms lose hours and margin. We solve it without you having to build a department for it.</Lead></Reveal>
          </div>
          <ProblemRows items={problems} />
        </div>
      </Section>

      <Section id="approach" tone="band">
        <div className={styles.head}>
          <Reveal><Kicker className={styles.lottieRow}>How we work<LottieIcon src="/lottie/bars-grow.json" width={72} height={50} ariaLabel="Four-step method" /></Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h1" caps className={styles.bigWords}>Understand. Systemise. Scale.</Heading></Reveal>
          <Reveal delay={0.1}><Lead>Four steps, every engagement. Each one ends with something you can check: a map, a number, a working system.</Lead></Reveal>
        </div>
        <MethodGrid steps={method} />
      </Section>

      <Section id="services">
        <div className={styles.headRow}>
          <div>
            <Reveal><Kicker>Services</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Four ways in. All with a fixed price.</Heading></Reveal>
          </div>
          <Reveal delay={0.1}><Button href="/services" variant="ghost">All services</Button></Reveal>
        </div>
        <ServiceCards services={services} />
      </Section>

      <Section id="compare" tone="band">
        <div className={styles.headRow}>
          <div>
            <Reveal><Kicker>Mac versus PC</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">Big firms are good at what they do. <Accent>We</Accent> are built for you.</Heading></Reveal>
            <Reveal delay={0.1}><Lead>Scale has real strengths. Personal attention at the size of your firm is not one of them.</Lead></Reveal>
          </div>
          <Reveal delay={0.15}><Button href="/compare" variant="ghost">See the comparison</Button></Reveal>
        </div>
        <CompareTeaser rows={compareRows} limit={4} />
      </Section>

      <Section id="founder">
        <FounderBlock founder={founder} />
      </Section>

      {posts.length > 0 && (
        <Section id="insights" tone="band">
          <div className={styles.headRow}>
            <div>
              <Reveal><Kicker>Insights</Kicker></Reveal>
              <Reveal delay={0.05}><Heading size="h2">From the inside.</Heading></Reveal>
            </div>
            <Reveal delay={0.1}><Button href="/blog" variant="ghost">All insights</Button></Reveal>
          </div>
          <PostCards posts={posts} />
        </Section>
      )}

      <Section id="faq">
        <div className={styles.split}>
          <div>
            <Reveal><Kicker>Questions</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2" className={styles.splitTitle}>What partners ask first.</Heading></Reveal>
            <Reveal delay={0.1}><Lead>Something else on your mind? Ask Fariza directly on WhatsApp or send a message.</Lead></Reveal>
            <Reveal delay={0.15} className={styles.faqCta}><Button href="/contact" variant="ghost">Contact</Button></Reveal>
          </div>
          <FAQ items={faqs} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
