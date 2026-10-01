"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";

const STATS = [
  { n: 19, suffix: " jaar", label: "corporate operatie van binnenuit: ING, Heineken, Monks" },
  { n: 14, suffix: " jaar", label: "Global Mobility bij ING Bank" },
  { n: 3, suffix: "+ uur", label: "per consultant per week terug bij de meeste bureaus" },
  { n: 0, suffix: " junioren", label: "die jouw expertise verwateren. Senior of niets." },
];

function CountUp({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Bewijs en ervaring">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div
            className="stat"
            key={s.label}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.44, 0, 0.56, 1] }}
          >
            <div className="stat-number">
              <CountUp target={s.n} suffix={s.suffix} />
            </div>
            <p>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}