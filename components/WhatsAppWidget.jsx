"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "";
const MESSAGE = "Ik heb een vraag over The Outlier.";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  if (!WA_NUMBER) return null;

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="wa-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            className="wa-card"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            role="dialog"
            aria-label="WhatsApp contact"
          >
            <div className="wa-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brandmark.svg" alt="The Outlier brandmark" width={34} height={34} />
              <div>
                <strong>The Outlier</strong>
                <span className="wa-status">Fariza reageert meestal binnen een minuut</span>
              </div>
            </div>
            <p className="wa-msg">Hoi! Waar kan ik je mee helpen?</p>
            <a className="wa-send" href={href} target="_blank" rel="noopener noreferrer">
              Open WhatsApp
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="wa-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Sluit WhatsApp venster" : "Open WhatsApp venster"}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 0 0 rgba(224,168,40,0.5)", "0 0 0 12px rgba(224,168,40,0)"] }}
        transition={{ boxShadow: { repeat: Infinity, duration: 2.2, ease: "easeOut" } }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
      </motion.button>
    </div>
  );
}