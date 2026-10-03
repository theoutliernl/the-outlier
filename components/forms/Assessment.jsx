"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CalendarDays, MessageCircle } from "lucide-react";
import { QUESTIONS, scoreAssessment } from "../../lib/scoring";
import { services } from "../../lib/content/services";
import Button from "../ui/Button";
import Field from "../ui/Field";
import styles from "./Assessment.module.css";

const EASE = [0.23, 1, 0.32, 1];
const KEYS = "ABCDEFGH";
const PHOTOS = [
  { src: "/images/px-group-table.jpg", alt: "A team of consultants around a meeting table" },
  { src: "/images/px-hands-on-desk.jpg", alt: "Hands working through documents on a desk" },
  { src: "/images/px-whiteboard-session.jpg", alt: "A process being mapped on a whiteboard" },
  { src: "/images/px-two-women-meeting.jpg", alt: "Two professionals in a focused conversation" },
];
const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || "";
const WA = (process.env.NEXT_PUBLIC_WA_NUMBER || "").replace(/\D/g, "");

/**
 * "Find your friction": Typeform-style assessment on /start.
 * One question per screen, keyboard friendly (A-H to choose, Enter to continue), animated progress,
 * contact details last, then an instant result: profile, indicative hours, three recommendations and a call offer.
 */
export default function Assessment({ interest = "" }) {
  const reduce = useReducedMotion();
  const total = QUESTIONS.length + 1; // + contact step
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [result, setResult] = useState(null);
  const topRef = useRef(null);

  const q = QUESTIONS[step];
  const value = q ? answers[q.id] : undefined;
  const canNext = q ? (q.type === "multi" ? (value || []).length > 0 : Boolean(value)) : true;

  const go = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(Math.max(0, Math.min(total - 1, next)));
  };

  const choose = (opt) => {
    if (q.type === "multi") {
      const cur = answers[q.id] || [];
      const has = cur.includes(opt);
      const nextVal = has ? cur.filter((v) => v !== opt) : cur.length < (q.max || 99) ? [...cur, opt] : cur;
      setAnswers({ ...answers, [q.id]: nextVal });
    } else {
      setAnswers({ ...answers, [q.id]: opt });
      setTimeout(() => go(step + 1), reduce ? 0 : 260);
    }
  };

  // Keyboard: letters choose, Enter continues (Typeform behaviour)
  useEffect(() => {
    if (!q || result) return;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      const idx = KEYS.indexOf(e.key.toUpperCase());
      if (idx >= 0 && idx < q.options.length) { e.preventDefault(); choose(q.options[idx].value); }
      if (e.key === "Enter" && canNext) { e.preventDefault(); go(step + 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (step > 0 || result) topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [step, result, reduce]);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { ...answers, interest, name: fd.get("name"), email: fd.get("email"), company: fd.get("company"), phone: fd.get("phone") };
    setStatus("sending");
    try {
      const res = await fetch("/api/assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setResult({ ...scoreAssessment(answers), name: String(payload.name || "").split(" ")[0] });
      setStatus("idle");
    } catch (err) {
      console.error("[assessment] submit failed:", err);
      setStatus("error");
    }
  }

  const progress = result ? 1 : step / total;
  const photo = PHOTOS[Math.min(PHOTOS.length - 1, Math.floor((step / total) * PHOTOS.length))];

  return (
    <div className={styles.shell} ref={topRef}>
      <aside className={styles.visual} aria-hidden="true">
        <AnimatePresence mode="popLayout">
          <motion.div key={photo.src} className={styles.photo} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Image src={photo.src} alt="" fill sizes="(max-width: 960px) 0px, 40vw" />
          </motion.div>
        </AnimatePresence>
        <div className={styles.visualText}>
          <span>{result ? "Your result" : step < QUESTIONS.length ? `Question ${step + 1} of ${QUESTIONS.length}` : "Last step"}</span>
          <p>{result ? "Built from your answers, in seconds." : "Eight questions. About five minutes. Your profile at the end."}</p>
        </div>
      </aside>

      <div className={styles.panel}>
        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Assessment progress">
          <motion.span animate={{ scaleX: progress }} transition={{ duration: 0.5, ease: EASE }} />
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {result ? (
            <Result key="result" result={result} />
          ) : q ? (
            <motion.fieldset key={q.id} className={styles.question} custom={dir} initial={reduce ? false : { opacity: 0, y: dir * 28 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: dir * -28 }} transition={{ duration: 0.38, ease: EASE }}>
              <legend className={styles.qTitle}><span className={styles.qNum}>{step + 1}<ArrowRight size={14} /></span>{q.title}</legend>
              {q.hint && <p className={styles.qHint}>{q.hint}</p>}
              <div className={styles.options} role={q.type === "multi" ? "group" : "radiogroup"}>
                {q.options.map((o, i) => {
                  const selected = q.type === "multi" ? (value || []).includes(o.value) : value === o.value;
                  return (
                    <motion.button key={o.value} type="button" role={q.type === "multi" ? "checkbox" : "radio"} aria-checked={selected} className={styles.option} data-selected={selected || undefined} onClick={() => choose(o.value)} whileTap={{ scale: 0.98 }} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}>
                      <span className={styles.key}>{KEYS[i]}</span>
                      <span className={styles.optLabel}>{o.label}</span>
                      <span className={styles.tick} aria-hidden="true"><Check size={16} /></span>
                    </motion.button>
                  );
                })}
              </div>
              <div className={styles.nav}>
                {step > 0 && <button type="button" className={styles.back} onClick={() => go(step - 1)}><ArrowLeft size={16} /> Back</button>}
                {(q.type === "multi" || value) && (
                  <Button onClick={() => go(step + 1)} disabled={!canNext}>OK</Button>
                )}
                <span className={styles.enterHint}>press <kbd>Enter ↵</kbd></span>
              </div>
            </motion.fieldset>
          ) : (
            <motion.form key="contact" className={styles.question} onSubmit={submit} initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.38, ease: EASE }}>
              <p className={styles.qTitle}><span className={styles.qNum}>{total}<ArrowRight size={14} /></span>Where should we send your profile?</p>
              <p className={styles.qHint}>You see your result straight away. No newsletter, no spam.</p>
              <div className={styles.fields}>
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Work email" name="email" type="email" autoComplete="email" required />
                <Field label="Firm" name="company" autoComplete="organization" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <p className={styles.legal}>We use your answers to show your result and, if you want, to follow up. <Link href="/privacy">Privacy statement</Link>.</p>
              {status === "error" && <p className={styles.error} role="alert">That did not go through. Please try again.</p>}
              <div className={styles.nav}>
                <button type="button" className={styles.back} onClick={() => go(step - 1)}><ArrowLeft size={16} /> Back</button>
                <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? "Building your profile…" : "Show my result"}</Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Result({ result: r }) {
  const svc = services.find((s) => s.slug === r.recommended);
  const circ = 2 * Math.PI * 52;
  const wa = WA ? `https://wa.me/${WA}?text=${encodeURIComponent("Hi Fariza, I just did the assessment on your website and would like to plan a call.")}` : null;
  return (
    <motion.div className={styles.result} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} role="status">
      <div className={styles.resultHead}>
        <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className={styles.ringBg} />
          <motion.circle cx="60" cy="60" r="52" className={styles.ringFg} strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ * (1 - r.score / 100) }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />
        </svg>
        <div>
          <span className={styles.resultLabel}>{r.name ? `${r.name}, your profile` : "Your profile"} · friction index {r.score}/100</span>
          <h2 className={styles.resultTitle}>{r.profile.name}</h2>
        </div>
      </div>
      <p className={styles.resultSummary}>{r.profile.summary}</p>

      <div className={styles.hours}>
        <div><strong>≈ {r.weeklyHours.toLocaleString("en-GB")} h</strong><span>repetitive work per week across your firm</span></div>
        <div><strong>≈ {r.recoverable.toLocaleString("en-GB")} h</strong><span>a week if a third moves to systems</span></div>
        <p>Indicative, based on your answers. A scan measures the real numbers.</p>
      </div>

      <h3 className={styles.recTitle}>Three things to look at first</h3>
      <ol className={styles.recs}>
        {r.lines.map((l) => <li key={l}>{l}</li>)}
      </ol>

      {svc && (
        <Link href={`/services#${svc.slug}`} className={styles.svc}>
          <span className={styles.resultLabel}>Recommended starting point</span>
          <strong>{svc.name}</strong>
          <span>{svc.oneLiner}</span>
          <em>{svc.price} · {svc.duration}</em>
        </Link>
      )}

      <div className={styles.call}>
        <h3>{r.outcome === "call" ? "Let's talk it through: 20 minutes, no obligation." : "Want to discuss your result?"}</h3>
        <div className={styles.callActions}>
          {CAL_URL ? (
            <Button href={CAL_URL} size="lg" data-outlier-cta=""><CalendarDays size={18} style={{ marginRight: 6 }} />Book a 20-minute call</Button>
          ) : (
            <Button href="/contact" size="lg" data-outlier-cta="">Plan a call</Button>
          )}
          {wa && <Button href={wa} variant="ghost" size="lg" arrow={false}><MessageCircle size={18} style={{ marginRight: 6 }} />WhatsApp Fariza</Button>}
        </div>
        <p className={styles.legal}>We received your answers. {CAL_URL ? "Pick a time that suits you." : "We will contact you within one business day to plan a call."}</p>
      </div>
    </motion.div>
  );
}
