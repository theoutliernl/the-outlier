"use client";

import { motion } from "motion/react";

/**
 * Reveal-on-scroll wrapper: fade + rise zodra het element in beeld komt.
 * Easing volgt het origineel: cubic-bezier(.44,0,.56,1), duration ~0.7s.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.44, 0, 0.56, 1] }}
    >
      {children}
    </Comp>
  );
}