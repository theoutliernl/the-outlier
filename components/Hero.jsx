"use client";

import { useState } from "react";
import { motion } from "motion/react";

const TAGS = ["Strategy", "Brand", "Web", "AI Systems", "Transformation"];

/**
 * De Outlier-visual: een rij dichte balken (de markt) en één gouden balk
 * die uitspringt. Bij hover op "Start de assessment" schiet de gouden balk
 * omhoog en zakt daarna in ritme terug — de outlier in beeld.
 */
export default function Hero() {
  const [ctaHover, setCtaHover] = useState(false);

  const bars = [0.32, 0.42, 0.3, 0.5, 0.36, 0.44, 0.3, 0.48, 0.34, 0.4, 0.3, 0.46, 0.32, 0.42];

  return (
    <section className="hero-v2" aria-label="The Outlier introductie">
      <div className="hero-gridlines" aria-hidden="true" />

      {/* Bar-visualisatie */}
      <div className="bars" aria-hidden="true">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={i === 7 ? "bar bar-gold" : "bar"}
            initial={{ height: `${h * 100}%` }}
            animate={{
              height: ctaHover && i === 7 ? "96%" : `${h * 100 + Math.sin(i * 1.7) * 2}%`,
            }}
            transition={{
              duration: ctaHover && i === 7 ? 0.55 : 1.6,
              delay: ctaHover && i === 7 ? 0 : i * 0.05,
              ease: ctaHover && i === 7 ? [0.34, 1.3, 0.64, 1] : [0.44, 0, 0.56, 1],
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
        >
          AI &amp; Transformation Partner
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.44, 0, 0.56, 1] }}
        >
          Corporate experience.
          <br />
          Boutique <span className="gold-italic">execution</span>.
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
        >
          Boutique adviesbureaus moeten werken als grote firma's, met een fractie
          van de mensen, het budget en de tijd. <strong>Jij bent de bottleneck van
          je eigen bureau</strong> en dat voelt niet als een verwijt, het is gewoon
          een systeem dat ontbreekt. Wij bouwen het.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.44, 0, 0.56, 1] }}
        >
          <a
            className="btn"
            href="/start"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            Doe de assessment
            <span className="circle-arrow dark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a className="btn ghost" href="#diensten">Bekijk de diensten</a>
        </motion.div>

        <motion.p
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Founded from the inside &nbsp;·&nbsp; Amsterdam, NL — working internationally
          &nbsp;·&nbsp; <a href="mailto:hello@theoutlier.nl">hello@theoutlier.nl</a>
        </motion.p>
      </div>

      {/* Service-tags paneel */}
      <motion.aside
        className="hero-tags"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.44, 0, 0.56, 1] }}
        aria-label="Onze diensten"
      >
        {TAGS.map((t, i) => (
          <span key={t} className={i === TAGS.length - 1 ? "tag active" : "tag"}>{t}</span>
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-brandmark" src="/brandmark.svg" alt="The Outlier brandmark: vier kleinere balken en één gouden balk die eruit steekt" width={64} height={64} />
      </motion.aside>
    </section>
  );
}