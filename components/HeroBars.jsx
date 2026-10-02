"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * De Outlier-hero-visual: een ritmische rij lichte balken op de donkere
 * pagina, met de gouden balk in het midden. Bij hover op de Book-a-call
 * knop schiet de gouden balk omhoog en zakt daarna ritmisch terug;
 * op de rest van de tijd loopt een zachte sine-golf door de rij.
 */
const N = 24;
const MID = 12;

export default function HeroBars() {
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <div className="hero-bars" aria-hidden="true">
      {Array.from({ length: N }).map((_, i) => {
        const base = 22 + Math.abs(Math.sin(i * 0.55)) * 26;   // rustig ritme
        const isGold = i === MID;
        const target = isGold && ctaHover ? 88 : base;
        return (
          <motion.span
            key={i}
            className={isGold ? "hbar hbar-gold" : "hbar"}
            initial={{ height: base }}
            animate={{ height: target }}
            transition={
              isGold
                ? { duration: ctaHover ? 0.45 : 0.9, ease: [0.34, 1.3, 0.64, 1] }
                : { duration: 1.4, delay: i * 0.03, ease: [0.44, 0, 0.56, 1] }
            }
          />
        );
      })}
    </div>
  );
}