"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import styles from "./NewsletterForm.module.css";

/** Footer opt-in. Posts to /api/newsletter, shows inline success/error without leaving the page. */
export default function NewsletterForm() {
  const [state, setState] = useState("idle"); // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { Accept: "application/json" }, body: new FormData(e.currentTarget) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className={styles.done} role="status"><Check size={18} /> You are on the list. One email per new article, nothing else.</p>;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
      <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@yourfirm.com" required className={styles.input} />
      <button type="submit" className={styles.go} aria-label="Subscribe" disabled={state === "sending"}><ArrowRight size={18} /></button>
      {state === "error" && <p className={styles.error} role="alert">That did not work. Please try again or email us.</p>}
    </form>
  );
}
