"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mark } from "./Brand";

/**
 * Navbar: vast bovenaan, schuift weg bij omlaag scrollen,
 * slidet smooth terug bij omhoog scrollen. Slide-in het menu-overlay blijft.
 */
export default function StickyNav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 140) { setHidden(false); last = y; return; }
      setHidden(y > last + 4);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky-nav"
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
    >
      <div className="sticky-nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Mark size={30} />
          <div style={{ fontWeight: 700, fontSize: 22, color: "var(--slate)", lineHeight: 1 }}>
            OUTL<span style={{ fontStyle: "italic", color: "var(--gold)" }}>IER</span>
          </div>
        </div>
        <div className="header-right">
          <a className="bookpill" href="#contact">
            Book a call<span className="pillcircle">→</span>
          </a>
          <a className="menulabel" href="#top" aria-label="Naar boven">↑ TOP</a>
        </div>
      </div>
    </motion.header>
  );
}