"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Ticker() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-52%"]);

  return (
    <div className="ticker" ref={ref} aria-hidden="true">
      <motion.div className="ticker-inner" style={{ x }}>
        <span>START DE ASSESSMENT.&nbsp;</span>
        <span>START DE ASSESSMENT.&nbsp;</span>
        <span>START DE ASSESSMENT.&nbsp;</span>
        <span>START DE ASSESSMENT.&nbsp;</span>
        <span>START DE ASSESSMENT.&nbsp;</span>
        <span>START DE ASSESSMENT.&nbsp;</span>
      </motion.div>
    </div>
  );
}