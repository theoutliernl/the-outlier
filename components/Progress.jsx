"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Scroll-progress-balk bovenaan, vult zich bij scrollen. */
export default function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="progress-bar"
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}