"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="progress-bar"
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}