"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SERVICES = [
  {
    idx: "01",
    title: "AI Friction Scan",
    price: "€2,750",
    dur: "2 WEEKS",
    text: "Exactly where your firm loses time and what AI can do about it. Interviews with partners and the floor, process mapping of your three heaviest flows, and one roadmap with payback figures. A list you can pick up on Monday.",
  },
  {
    idx: "02",
    title: "AI Systems Sprint",
    price: "€12,500",
    dur: "8-12 WEEKS",
    text: "One system, built and implemented: proposal flow, client onboarding, knowledge assistant or regulation monitoring. Built with your people, not over their heads. Measured before and after, in hours and euros.",
  },
  {
    idx: "03",
    title: "Fractional AI Transformation Partner",
    price: "€2,750 /mo",
    dur: "2 OR 4 DAYS A MONTH",
    text: "The transformation lead you cannot hire. At the table of management and partnership, with a quarterly agenda and measurable milestones. Corporate experience, part-time, without the politics.",
  },
  {
    idx: "04",
    title: "Partner Workshop",
    price: "€1,650",
    dur: "HALF DAY",
    text: "One afternoon in which the entire partnership understands what AI means for your firm. Live demos, honest limits, privacy and compliance. Then you decide, we handle execution.",
  },
];

export default function Accordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {SERVICES.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.idx} className={isOpen ? "acc-item open" : "acc-item"}>
            <button
              className="acc-row"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="acc-idx">{s.idx}</span>
              <span className="acc-title">{s.title}</span>
              <span className="acc-price">{s.price}</span>
              <span className="acc-plus">{isOpen ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="acc-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
                >
                  <div className="acc-inner">
                    <span className="dur">{s.dur}</span>
                    <p>{s.text}</p>
                    <a className="bookpill dark" href="#contact">
                      Book a call<span className="pillcircle">→</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}