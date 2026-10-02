"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#approach", label: "Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#insights", label: "Insights" },
  { href: "/#founder", label: "Founder" },
  { href: "/contact", label: "Contact" },
  { href: "/start", label: "Start assessment" },
];

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="menulabel" onClick={() => setOpen(true)} aria-expanded={open}>
        MENU
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
            aria-label="Hoofdmenu"
          >
            <button className="menu-close" onClick={() => setOpen(false)}>CLOSE</button>
            <ul className="menu-links">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
                >
                  <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="menu-meta">
              <span>Amsterdam, NL — working internationally</span>
              <a href="mailto:hello@theoutlier.nl">hello@theoutlier.nl</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}