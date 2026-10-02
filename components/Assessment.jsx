"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TYPE_OPTIONS,
  SIZE_OPTIONS,
  FRICTION_OPTIONS,
  TOOLING_OPTIONS,
  AMBITION_OPTIONS,
  scoreAssessment,
} from "../lib/scoring";

const STEPS = 5;

function toggle(list, v) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function OptionGrid({ options, sel, onSelect, multi }) {
  return (
    <div className="opt-grid cols">
      {options.map((o) => {
        const active = multi ? sel.includes(o.value) : sel === o.value;
        return (
          <button
            type="button"
            key={o.value}
            className={`opt ${active ? "sel" : ""}`}
            onClick={() => onSelect(o.value)}
            aria-pressed={active}
          >
            {o.label}
            <small>{o.hint}</small>
          </button>
        );
      })}
    </div>
  );
}

function InsightBlock({ result, calUrl, email, onFallback }) {
  return (
    <motion.div
      className="insight-block"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="kicker" style={{ margin: 0 }}>Uw profiel in één oogopslag</p>
      <div className="score-badge">
        <span className="score-num">{result.score}/12</span>
        <span>
          friction-score van je bureau — hoe hoger, hoe meer tijd en marge lekt er weg
        </span>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {result.lines.map((l, i) => (
          <p key={i} className="insight-line" style={{ margin: 0 }}>{l}</p>
        ))}
      </div>
      {result.outcome === "call" ? (
        <div>
          <p style={{ color: "var(--slate)", fontSize: 17, margin: "0 0 14px" }}>
            {calUrl
              ? "Dit profiel verdient een gesprek. In een half uur bespreken we waar je bureau het hardst rendeert."
              : "Dit profiel verdient een gesprek. Laat je gegevens achter — we nemen contact op binnen één werkdag."}
          </p>
          {calUrl ? (
            <a className="form-btn" style={{ display: "inline-block", textDecoration: "none" }} href={calUrl}>
              Plan je gesprek
            </a>
          ) : (
            <button className="form-btn" type="button" onClick={onFallback}>
              Plan je gesprek
            </button>
          )}
          {calUrl && (
            <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
              We mailen dit profiel ook naar {email || "jezelf"}. Geen call?{" "}
              <a href="/contact" style={{ color: "var(--gold)" }}>Stuur een bericht.</a>
            </p>
          )}
        </div>
      ) : (
        <p style={{ color: "var(--ink-emphasis)", fontSize: 15.5, margin: 0 }}>
          Nu nog geen aanleiding voor een gesprek. Dat is goed nieuws: je bureau
          lekt minder weg dan je denkt. Hou deze score vast — verandert er iets, dan
          weten je waar je als eerste kijkt.
        </p>
      )}
    </motion.div>
  );
}

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    bureauType: null,
    bureauSize: null,
    friction: [],
    tooling: null,
    ambition: [],
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [fallbackOpen, setFallbackOpen] = useState(false);

  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || null;
  const done = step >= STEPS;
  const { score, outcome, lines } = scoreAssessment(answers);

  const stepValid = [
    answers.bureauType && answers.bureauSize,
    answers.friction.length > 0,
    answers.tooling,
    answers.ambition.length > 0,
    answers.name.trim() && answers.email.includes("@"),
  ][step];

  async function submit(ev) {
    ev && ev.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "onbekende fout");
      setResult({ score: data.score, outcome: data.outcome, lines: data.lines });
    } catch (e) {
      setError("Versturen mislukt. Mail ons direct: hello@theoutlier.nl");
      setResult(scoreAssessment(answers)); // inzicht tonen ondanks storage-fout
    } finally {
      setSubmitting(false);
    }
  }

  if (done && result) {
    return (
      <div className="assess-shell">
        <InsightBlock
          result={result}
          calUrl={calUrl}
          email={answers.email}
          onFallback={() => setFallbackOpen(true)}
        />
        {(fallbackOpen || result.outcome !== "call" || !calUrl) && (
          <form className="form-card" style={{ marginTop: 26 }} action="/api/contact" method="POST">
            <input type="hidden" name="name" value={answers.name} />
            <input type="hidden" name="email" value={answers.email} />
            <input type="hidden" name="phone" value={answers.phone} />
            <input
              name="message"
              defaultValue={`Assessment-resultaat: score ${result.score}/12. Graag contact opnemen.`}
              rows={4}
              placeholder="Bericht"
            />
            <button className="form-btn" type="submit">Verstuur</button>
          </form>
        )}
      </div>
    );
  }

  if (done && submitting) {
    return (
      <div className="assess-shell">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "var(--ink-emphasis)" }}>
          Je profiel wordt samengesteld…
        </motion.p>
      </div>
    );
  }

  return (
    <div className="assess-shell">
      <div className="assess-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS}>
        {Array.from({ length: STEPS }).map((_, i) => (
          <span key={i} className={i < step ? "done" : ""} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.28 }}
        >
          {step === 0 && (
            <>
              <h2 className="assess-q">1 · Wat voor bureau is het?</h2>
              <p className="assess-hint">Maatwerk werkt alleen met het juiste type in beeld.</p>
              <OptionGrid options={TYPE_OPTIONS} sel={answers.bureauType} multi={false}
                onSelect={(v) => setAnswers({ ...answers, bureauType: v })} />
              <h2 className="assess-q" style={{ marginTop: 34 }}>Hoe groot ben je?</h2>
              <OptionGrid options={SIZE_OPTIONS} sel={answers.bureauSize} multi={false}
                onSelect={(v) => setAnswers({ ...answers, bureauSize: v })} />
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="assess-q">2 · Waar lekt er tijd weg?</h2>
              <p className="assess-hint">Meerdere antwoorden kunnen.</p>
              <OptionGrid options={FRICTION_OPTIONS} sel={answers.friction} multi
                onSelect={(v) => setAnswers({ ...answers, friction: toggle(answers.friction, v) })} />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="assess-q">3 · Met welk gereedschap werk je nu?</h2>
              <p className="assess-hint">Eerlijk mag — niemand kijkt mee, behalve wij.</p>
              <OptionGrid options={TOOLING_OPTIONS} sel={answers.tooling} multi={false}
                onSelect={(v) => setAnswers({ ...answers, tooling: v })} />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="assess-q">4 · Waar wil je naartoe?</h2>
              <p className="assess-hint">Meerdere ambities mogen.</p>
              <OptionGrid options={AMBITION_OPTIONS} sel={answers.ambition} multi
                onSelect={(v) => setAnswers({ ...answers, ambition: toggle(answers.ambition, v) })} />
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="assess-q">5 · Waar sturen we je profiel heen?</h2>
              <p className="assess-hint">Telefoonnummer mag leeg blijven.</p>
              <form className="form-card" onSubmit={submit}>
                <input
                  placeholder="Naam" required value={answers.name}
                  onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                  autoComplete="name"
                />
                <input
                  type="email" placeholder="E-mail" required value={answers.email}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  autoComplete="email"
                />
                <input
                  type="tel" placeholder="Telefoonnummer (optioneel)" value={answers.phone}
                  onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                  autoComplete="tel"
                />
              </form>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="assess-nav">
        <button
          type="button" className="form-btn ghost" disabled={step === 0}
          onClick={() => setStep(Math.max(0, step - 1))}
          style={{ visibility: step === 0 ? "hidden" : "visible" }}
        >
          Terug
        </button>
        {step < STEPS - 1 ? (
          <button type="button" className="form-btn" disabled={!stepValid}
            onClick={() => setStep(step + 1)}>
            Volgende
          </button>
        ) : (
          <button type="button" className="form-btn" disabled={!stepValid || submitting}
            onClick={submit}>
            {submitting ? "Versturen…" : "Verstuur & bekijk profiel"}
          </button>
        )}
      </div>
      {error && <p style={{ color: "var(--gold)", fontSize: 14, marginTop: 14 }}>{error}</p>}
    </div>
  );
}
