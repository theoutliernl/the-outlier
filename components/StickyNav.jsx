"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mark } from "./Brand";

/**
 * Complete navbar: logo links, center-nav op desktop, CTA + MENU rechts.
 * - Omlaag scrollen -> schuift soepel weg; omhoog -> smooth terug;
 *   stoppen -> behoudt staat (rAF + hysteresis 6px).
 * - Bovenaan de pagina (y < 140) -> altijd zichtbaar.
 * - Smal scherm: links in het uitklapbare drawer (ESC sluit).
 */
const NAV_LINKS = [
  { href: "/#approach", label: "Approach" },
  { href: "/services", label: "Services" },
  { href: "/start", label: "Assessment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function StickyNav() {
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);
  const [open, setOpen] = useState(false);

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

  // ESC sluit het menu; scroll-lock zolang open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className="sticky-nav"
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
    >
      <div className="sticky-nav-inner">
        <a href="/#home" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }} aria-label="The Outlier — home">
          <Mark size={30} />
          <div style={{ fontWeight: 700, fontSize: 22, color: "var(--slate)", lineHeight: 1 }}>
            OUTL<span style={{ fontStyle: "italic", color: "var(--gold)" }}>IER</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Hoofdnavigatie">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="header-right">
          <a className="bookpill" href="/#contact">
            Book a call<span className="pillcircle">→</span>
          </a>
          <button className="menulabel" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Sluit menu" : "Open menu"}>
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          className="nav-drawer"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          aria-label="Uitgeklapt menu"
        >
          {NAV_LINKS.concat([
            { href: "/#insights", label: "Insights" },
            { href: "/#founder", label: "Founder" },
          ]).map((l) => (
            <a key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}