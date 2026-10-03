"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Button from "../ui/Button";
import HeroBars from "./HeroBars";
import GlyphField from "./GlyphField";
import { brand, contact, founder } from "../../lib/content/site";
import styles from "./Hero.module.css";

const EASE = [0.23, 1, 0.32, 1];
const LINES = [
  ["Corporate", "experience."],
  ["Boutique", "execution."],
];

/**
 * Home hero. Layers, back to front:
 * 1. office video (people at work), lightly graded so it keeps light and contrast
 * 2. GlyphField: a grid of glyphs that lights up gold around the cursor (21st.dev code-background idea)
 * 3. HeroBars: the brand visual, gold bar shoots up while a "Book a call" button is hovered
 * 4. content: Altero-scale display type with a word-by-word entrance
 */
export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  let w = 0;
  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <video className={styles.video} autoPlay muted loop playsInline preload="metadata" poster="/images/hero-poster.jpg">
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <span className={styles.grade} />
      </div>
      <div className={styles.glyphs} aria-hidden="true"><GlyphField /></div>
      <div className={styles.bars} aria-hidden="true"><HeroBars /></div>

      <motion.div className={`container ${styles.content}`} style={{ y, opacity: fade }}>
        <motion.p className={styles.kicker} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <span className={styles.dot} /> {brand.role} for {brand.audience}
        </motion.p>

        <h1 id="hero-title" className={styles.title}>
          {LINES.map((line, li) => (
            <span key={li} className={styles.line}>
              {line.map((word) => {
                const i = w++;
                return (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={styles.word}
                      initial={reduce ? false : { y: "105%", filter: "blur(8px)" }}
                      animate={{ y: "0%", filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className={styles.bottom}>
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}>
            <p className={styles.lead}>
              Boutique firms are expected to run like large ones, with a fraction of the people, budget and time.
              We close that gap with practical AI systems, built around your experts. No hype. No bureaucracy.
            </p>
            <div className={styles.actions}>
              <Button href="/start" size="lg" data-outlier-cta="">Book a call</Button>
              <Button href="#approach" variant="ghost" size="lg" arrow={false}>How it works</Button>
            </div>
          </motion.div>

          <motion.aside className={styles.card} initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.9 }} aria-label="About the founder">
            <Image src={founder.photo.src} alt={founder.photo.alt} width={96} height={120} className={styles.cardImg} />
            <div>
              <p className={styles.cardName}>{founder.name}</p>
              <p className={styles.cardRole}>Founder, ex-ING, Heineken, Media.Monks</p>
              <ul className={styles.cardList}>
                <li>AI systems</li>
                <li>Transformation</li>
                <li>Strategy</li>
              </ul>
            </div>
          </motion.aside>
        </div>

        <motion.p className={styles.meta} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}>
          {contact.city}, NL · working internationally
        </motion.p>
      </motion.div>
    </section>
  );
}
