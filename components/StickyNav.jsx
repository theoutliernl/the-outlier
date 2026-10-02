"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mark } from "./Brand";

/**
 * Navbar: vast bovenaan.
 * - Omlaag scrollen -> schuift soepel weg.
 * - Omhoog scrollen -> komt smooth terug.
 * - Stoppen met scrollen -> behoudt zijn staat (geen jerk).
 * - Bovenaan de pagina (y < 140) -> altijd zichtbaar.
 * Hysteresis: richting wisselt pas na >= 6px netto beweging, zodat
 * micro-scrolls en traag uitlopende scrolls de balk niet flikkeren.
 */
export default function StickyNav() {
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    let pending = null;

    const apply = (dir) => {
      if (dir === "down" && !hiddenRef.current) {
        hiddenRef.current = true;
        setHidden(true);
      } else if (dir === "up" && hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (pending) return;                     // max 1 evaluatie per frame
      pending = requestAnimationFrame(() => {
        pending = null;
        if (y < 140) { apply("up"); last = y; return; }
        const delta = y - last;
        if (Math.abs(delta) < 6) return;       // te klein: negeer
        apply(delta > 0 ? "down" : "up");
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (pending) cancelAnimationFrame(pending);
    };
  }, []);

  return (
    <motion.header
      className="sticky-nav"
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
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