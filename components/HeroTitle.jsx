"use client";

import { motion } from "motion/react";

/**
 * HeroTitle (nieuwe impressieve header, 2 okt):
 * - woord-voor-woorde entree met stagger (marketing-budget: mag langer)
 * - strong ease-out per Emil's auditregels, transform-only (GPU)
 * - gouden shimmer over het accentwoord, discreet (lage amplitude)
 * - tekst identiek aan het goedgekeurde 29-sep design
 */
const EASE_OUT = [0.23, 1, 0.32, 1];
const LINES = [
  ["CORPORATE", "EXPERIENCE."],
  ["BOUTIQUE", "EXECUTION."],
];

export default function HeroTitle() {
  let n = 0;
  return (
    <h1 className="display-xl hero-title" aria-label="Corporate experience. Boutique execution.">
      {LINES.map((words, li) => (
        <div className="hrow" key={li}>
          {words.map((w) => {
            const accent = w === "EXPERIENCE.";
            return (
              <motion.span
                key={w}
                className={accent ? "ht-accent" : undefined}
                initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.12 * n++, ease: EASE_OUT }}
              >
                {accent ? (
                  <span className="ht-shimmer" data-text={w}>{w}</span>
                ) : (
                  w
                )}
              </motion.span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}