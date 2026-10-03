"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, Send } from "lucide-react";
import { contact, founder } from "../../lib/content/site";
import styles from "./WhatsAppWidget.module.css";

const EASE = [0.23, 1, 0.32, 1];

function WhatsAppIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

/**
 * WhatsApp widget (Elfsight-style), bottom right on every page.
 * Button with soft pulse -> chat card with Fariza's photo, "typically replies within a minute",
 * a typing indicator, then the greeting and a button that opens WhatsApp with a pre-filled message.
 * A small teaser bubble appears once after 8 seconds. Hidden when no number is configured.
 */
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const [teaser, setTeaser] = useState(false);

  useEffect(() => {
    if (!contact.whatsapp) return;
    let seen = false;
    try { seen = sessionStorage.getItem("wa-teaser") === "1"; } catch { /* storage blocked: show once per load */ }
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1100);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!contact.whatsapp) return null;

  const href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  const toggle = () => {
    setOpen((o) => !o);
    setTeaser(false);
    try { sessionStorage.setItem("wa-teaser", "1"); } catch { /* ignore */ }
  };

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <motion.div className={styles.card} role="dialog" aria-label="Chat with Fariza on WhatsApp" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.3, ease: EASE }} style={{ transformOrigin: "100% 100%" }}>
            <div className={styles.head}>
              <span className={styles.avatar}>
                <Image src={founder.photo.src} alt="Fariza Sbaa" width={48} height={48} />
                <i className={styles.online} aria-hidden="true" />
              </span>
              <div className={styles.who}>
                <strong>{founder.name}</strong>
                <span>Typically replies within a minute</span>
              </div>
              <button type="button" className={styles.close} onClick={toggle} aria-label="Close chat"><X size={18} /></button>
            </div>
            <div className={styles.body}>
              <AnimatePresence mode="wait">
                {typing ? (
                  <motion.div key="typing" className={styles.typing} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Fariza is typing">
                    <i /><i /><i />
                  </motion.div>
                ) : (
                  <motion.div key="msg" className={styles.bubble} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                    <span className={styles.name}>Fariza</span>
                    Hi there. Questions about AI, systems or working together? Send me a message, I usually reply within minutes.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a className={styles.start} href={href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} /> Start chat <Send size={16} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaser && !open && (
          <motion.button type="button" className={styles.teaser} onClick={toggle} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.35, ease: EASE }}>
            Questions? Ask Fariza directly.
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button type="button" className={styles.fab} onClick={toggle} aria-expanded={open} aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, duration: 0.4, ease: EASE }}>
        <span className={styles.pulse} aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "wa"} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }} className={styles.fabIcon}>
            {open ? <X size={26} /> : <WhatsAppIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
