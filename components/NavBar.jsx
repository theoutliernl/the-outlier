"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { href: "/#diensten", label: "Services" },
  { href: "/#proces", label: "Onze methode" },
  { href: "/#founder", label: "Over Fariza" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/start", label: "Start assessment" },
];

export default function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // wegscrollen bij omlaag, terugschuiven bij omhoog (pas na de hero)
      setHidden(y > last && y > 220 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      <motion.header
        className="navbar"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
      >
        <a href="/#top" className="navbar-logo" aria-label="The Outlier — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brandmark.svg" alt="The Outlier logo: een rechte en een uitspringende gouden balk" width={130} height={34} />
        </a>
        <div className="navbar-right">
          <a className="bookcall" href="/start">
            Start de assessment
            <span className="circle-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open}>
            MENU
          </button>
        </div>
      </motion.header>

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