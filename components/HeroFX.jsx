"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import HeroTitle from "./HeroTitle";

/**
 * HeroFX — het wow-laagje om de header (2 okt):
 * 1. Parallax: de hele hero drift langzaam omhoog en vervaagt licht bij scrollen
 *    (useScroll + transform-only, geen layout).
 * 2. Kinetic type: HeroTitle (stagger + shimmer) blijft het hart.
 * 3. Gold line: de gouden lijn tekent zichzelf onder de kop.
 * 4. Ken Burns op de foto staat in CSS (.hero-bg.kb).
 */
export default function HeroFX({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, willChange: "transform, opacity" }}
    >
      <div className="hero-fx-goldline" aria-hidden="true" />
      <HeroTitle />
      {children}
    </motion.div>
  );
}