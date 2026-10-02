"use client";

import { motion } from "motion/react";

/**
 * Reveal-on-scroll wrapper: fade + rise zodra het element in beeld komt.
 * Easing: strong ease-out (cubic-bezier(.23,1,.32,1)) — entrees voelen responsief;
 * duration 0.55s binnen de 300ms+marketing-budgetlijn voor reveals.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Comp>
  );
}