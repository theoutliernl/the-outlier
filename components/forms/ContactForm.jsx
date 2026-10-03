"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Field from "../ui/Field";
import Button from "../ui/Button";
import styles from "./ContactForm.module.css";

/** General enquiries: name, email, phone (optional), message. Posts JSON-accepting to /api/contact. */
export default function ContactForm() {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [name, setName] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get("name") || "").split(" ")[0]);
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { Accept: "application/json" }, body: data });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className={styles.card}>
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done" className={styles.done} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status">
            <CheckCircle2 size={40} aria-hidden="true" />
            <h2>Thank you{name ? `, ${name}` : ""}.</h2>
            <p>Your message is in. We reply within one business day, usually sooner.</p>
          </motion.div>
        ) : (
          <motion.form key="form" className={styles.form} onSubmit={onSubmit} initial={false} exit={{ opacity: 0, y: -12 }}>
            <div className={styles.row}>
              <Field label="Name" name="name" autoComplete="name" required />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
            </div>
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Message" name="message" multiline required placeholder="Tell us briefly where your firm loses time or what you want to discuss." />
            <p className={styles.legal}>We use your details only to answer your message. See our <a href="/privacy">privacy statement</a>.</p>
            {state === "error" && <p className={styles.error} role="alert">Something went wrong. Please try again, or email hello@theoutlier.nl.</p>}
            <Button type="submit" size="lg" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
