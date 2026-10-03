"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import styles from "./Accordion.module.css";

/**
 * Accordion: FAQ and expandable lists.
 * items: [{ title, meta?, body (string or JSX) }]. First item open with defaultOpen={0}.
 */
export default function Accordion({ items, defaultOpen = -1, numbered = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={item.title} className={styles.item} data-open={isOpen || undefined}>
            <h3 className={styles.heading}>
              <button type="button" className={styles.trigger} aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                {numbered && <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>}
                <span className={styles.title}>{item.title}</span>
                {item.meta && <span className={styles.meta}>{item.meta}</span>}
                <span className={styles.plus} aria-hidden="true"><Plus size={18} /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={id} role="region" className={styles.panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>
                  <div className={styles.body}>{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
