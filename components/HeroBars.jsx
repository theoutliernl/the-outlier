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
const EASE_OUT = [0.23, 1, 0.32, 1];

export default function HeroBars() {
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <div className="hero-bars" aria-hidden="true">
      {Array.from({ length: N }).map((_, i) => {
        const base = 22 + Math.abs(Math.sin(i * 0.55)) * 26;   // rustig ritme
        const isGold = i === MID;
        // audit-fix: scaleY met origin bottom i.p.v. height-animatie (alleen transform, geen layout)
        const scale = (isGold && ctaHover ? 88 : base) / base;
        return (
          <motion.span
            key={i}
            className={isGold ? "hbar hbar-gold" : "hbar"}
            style={{ height: base, transformOrigin: "50% 100%" }}
            initial={{ scaleY: 0.001, opacity: 0 }}
            animate={{ scaleY: scale, opacity: 1 }}
            transition={
              isGold
                ? { duration: ctaHover ? 0.35 : 0.8, ease: EASE_OUT }
                : { duration: 1.1, delay: i * 0.03, ease: EASE_OUT }
            }
          />
        );
      })}
    </div>
  );
}