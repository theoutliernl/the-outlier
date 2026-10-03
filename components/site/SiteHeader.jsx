"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Logo } from "../Brand";
import Button from "../ui/Button";
import { nav, callCta, contact } from "../../lib/content/site";
import styles from "./SiteHeader.module.css";
import { cn } from "../ui/cn";

/**
 * Site header, on every page (mounted once in app/(frontend)/layout.jsx).
 * - Scroll down: slides away smoothly. Scroll up: slides back. Stopping keeps the current state.
 * - Near the top it is always visible and transparent; further down it gets a blurred ink surface.
 * - The gold progress bar on top fills as you scroll.
 * - Mobile: full-screen menu with focus on the first link, Escape closes, page scroll locked.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hiddenRef = useRef(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y < 120) {
          if (hiddenRef.current) { hiddenRef.current = false; setHidden(false); }
          last = y;
          return;
        }
        const delta = y - last;
        if (Math.abs(delta) < 8) return;
        const next = delta > 0;
        if (next !== hiddenRef.current) { hiddenRef.current = next; setHidden(next); }
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [open]);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <motion.header
        className={cn(styles.header, scrolled && styles.scrolled)}
        animate={{ y: hidden && !open ? "-105%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.span className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
        <div className={cn("container", styles.inner)}>
          <Link href="/" className={styles.logo} aria-label="The Outlier, home">
            <Logo size={28} />
          </Link>
          <nav aria-label="Main" className={styles.nav}>
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={styles.actions}>
            <Button href={callCta.href} size="md" className={styles.cta}>{callCta.label}</Button>
            <button type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span className={styles.menuLabel}>{open ? "Close" : "Menu"}</span>
              <span className={cn(styles.burger, open && styles.burgerOpen)} aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav aria-label="Mobile" className={cn("container", styles.overlayNav)}>
              {[{ href: "/", label: "Home" }, ...nav, { href: "/start", label: "Free assessment" }].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
                  <Link href={l.href} className={styles.overlayLink} aria-current={isActive(l.href) ? "page" : undefined} autoFocus={i === 0}>
                    <span className={styles.overlayIdx}>{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className={cn("container", styles.overlayFoot)}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.city}, {contact.country}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
