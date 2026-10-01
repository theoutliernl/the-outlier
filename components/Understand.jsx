"use client";

import { motion } from "motion/react";
import { Compass, Map, Wrench, LineChart } from "lucide-react";

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.44, 0, 0.56, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const STEPS = [
  {
    icon: Compass,
    title: "Understand",
    text: "Hoe werkt je bureau echt: partners, klanten, processen, flows. Geen aannames.",
  },
  {
    icon: Map,
    title: "Map the friction",
    text: "Waar lekt tijd en marge weg, gemeten in uren en euro's per week.",
  },
  {
    icon: Wrench,
    title: "Build the system",
    text: "Slimmere systemen rond je experts, geïntegreerd in de gereedschappen die je al gebruikt.",
  },
  {
    icon: LineChart,
    title: "Measure the gain",
    text: "Voor en na, in cijfers. Als een systeem zich niet terugverdient, zeggen we dat.",
  },
];

export default function Understand() {
  return (
    <section className="understand" id="proces">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className="mega" variants={rise}>
          Understand.
        </motion.h2>
        <motion.h2 className="mega muted-mega" variants={rise}>
          Systemise.
        </motion.h2>
        <motion.h2 className="mega" variants={rise}>
          Scale.
        </motion.h2>
      </motion.div>

      <motion.p
        className="lead manifesto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.44, 0, 0.56, 1] }}
      >
        We werken met ambitieuze boutique firms om te vinden waar frictie zit,
        de systemen te bouwen die die wegnemen, en de experts centraal te houden.
        No hype. No bureaucracy. <span className="manifesto-label">— Brand manifesto</span>
      </motion.p>

      <motion.div className="process-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        {STEPS.map((s) => (
          <motion.article className="process-card" key={s.title} variants={rise}>
            <s.icon size={26} strokeWidth={1.6} aria-hidden="true" className="pc-icon" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}