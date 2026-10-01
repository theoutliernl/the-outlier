"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "../lib/schema";

const SERVICES = [
  {
    nr: "01",
    name: "AI Friction Scan",
    price: "€ 2.750",
    desc: "Een scherpe scan van je bureau: waar lekt tijd en marge weg, en welk systeem dat oplost. Vast bedrag, vooraf afgespoken. Achteraf een plan met cijfers.",
  },
  {
    nr: "02",
    name: "AI Systems Sprint",
    price: "€ 12.500",
    desc: "In twee tot vier weken bouwen we het systeem dat je bureau van Excel-chaos en losse gereedschappen af helpt. Inclusief adoptie: je team werkt er vanaf dag één mee.",
  },
  {
    nr: "03",
    name: "Fractional AI Transformation Partner",
    price: "€ 2.750 /mnd",
    desc: "De transformation lead die je niet kunt aantrekken. Aan tafel bij bestuur en partnerschap, met kwartaalagenda's en meetbare mijlpalen. Corporate ervaring, parttime, zonder de politiek.",
    note: "2 of 4 dagen per maand",
  },
  {
    nr: "04",
    name: "Partner Workshop",
    price: "€ 1.650",
    desc: "Eén dag met het volledige partnerschap: waar lekt de marge weg, wat is het systeemplaan, en wat doen we maandag anders.",
  },
];

export default function Services() {
  const [open, setOpen] = useState(2); // het fractionele partner-aanbod open bij load

  return (
    <section className="services-v2" id="diensten">
      <div className="section-head">
        <h2>Our services</h2>
        <p className="muted">
          Vier manieren in. Elke opdracht eindigt met cijfers: uren bespaard, marge
          verbeterd. Als de scan laat zien dat een systeem zich niet terugverdient, zeggen we dat.
        </p>
      </div>

      <ul className="service-list">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.nr} className={isOpen ? "service-row open" : "service-row"}>
              <button
                className="service-head"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="service-nr">{s.nr}</span>
                <span className="service-name">{s.name}</span>
                <span className="service-price">{s.price}</span>
                <motion.span
                  className="service-plus"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
                  aria-hidden="true"
                >
                  <Plus size={20} strokeWidth={1.6} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="service-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
                  >
                    {s.note && <p className="service-note">{s.note}</p>}
                    <p>{s.desc}</p>
                    <a className="service-cta" href="/start">
                      Start de assessment
                      <span className="circle-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="faq-block" id="faq">
        <h3 className="faq-title">Questions, answered</h3>
        {faqs.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={open ? "faq-item open" : "faq-item"}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
          <Plus size={18} strokeWidth={1.6} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
          >
            <p className="faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}