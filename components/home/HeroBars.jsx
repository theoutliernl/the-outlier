"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBars: the brand idea as the hero visual (cap briefing 5:49-6:22).
 * A row of light bars breathes slowly in a rhythm; the middle bar is The Outlier gold.
 * - The cursor gently lifts the bars near it.
 * - Hovering any element with data-outlier-cta (the "Book a call" buttons) makes the gold bar
 *   shoot up; on leave it springs back and settles into the rhythm of the rest.
 * Canvas, one rAF loop, paused when off-screen or tab hidden, static for reduced motion.
 */
const GOLD = ["#f0c85a", "#e0a828", "#b8851c"];

export default function HeroBars({ count = 33 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mid = Math.floor(count / 2);
    const seeds = Array.from({ length: count }, (_, i) => 0.42 + 0.38 * Math.abs(Math.sin(i * 1.7 + 0.6)));
    const state = { w: 0, h: 0, dpr: 1, mx: -1, my: -1, cta: false, gold: 1, goldV: 0, visible: true, running: true };
    let raf = 0;
    let t0 = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.w = r.width; state.h = r.height;
      canvas.width = r.width * state.dpr; canvas.height = r.height * state.dpr;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      if (reduce) draw(performance.now());
    };

    const roundBar = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.arc(x + r, y + r, r, Math.PI, 0);
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
      ctx.fill();
    };

    function draw(now) {
      const { w, h } = state;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const gap = w / count;
      const bw = Math.max(6, Math.min(26, gap * 0.56));
      const maxH = h * 0.92;

      // gold bar spring: target 2.6x on CTA hover, 1x otherwise (rhythmic settle via low damping)
      const target = state.cta ? 2.6 : 1;
      const k = 120, d = state.cta ? 16 : 7;
      const dt = 1 / 60;
      state.goldV += (k * (target - state.gold) - d * state.goldV) * dt;
      state.gold += state.goldV * dt;

      for (let i = 0; i < count; i++) {
        const x = i * gap + (gap - bw) / 2;
        const breathe = reduce ? 0 : Math.sin(t * 0.9 + i * 0.45) * 0.07 + Math.sin(t * 0.37 + i * 0.13) * 0.05;
        let frac = seeds[i] + breathe;
        if (state.mx >= 0) {
          const dx = Math.abs(state.mx - (x + bw / 2)) / (w * 0.12);
          frac += Math.max(0, 1 - dx) * 0.22;
        }
        const isGold = i === mid;
        let bh = Math.min(1, frac * (isGold ? 0.62 : 0.5)) * maxH;
        if (isGold) bh = Math.min(h, (0.5 + breathe * 0.5) * maxH * 0.62 * state.gold);
        const y = h - bh;
        if (isGold) {
          const g = ctx.createLinearGradient(0, y, 0, h);
          g.addColorStop(0, GOLD[0]); g.addColorStop(0.5, GOLD[1]); g.addColorStop(1, GOLD[2]);
          ctx.fillStyle = g;
          ctx.shadowColor = "rgba(224,168,40,0.45)";
          ctx.shadowBlur = state.cta ? 36 : 18;
        } else {
          const near = state.mx >= 0 ? Math.max(0, 1 - Math.abs(state.mx - (x + bw / 2)) / (w * 0.12)) : 0;
          ctx.fillStyle = `rgba(243,237,225,${0.1 + near * 0.16})`;
          ctx.shadowBlur = 0;
        }
        roundBar(x, y, bw, bh, bw / 2);
      }
      ctx.shadowBlur = 0;
    }

    const loop = (now) => {
      if (!state.running) return;
      raf = requestAnimationFrame(loop);
      if (state.visible && !document.hidden) draw(now);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientY > r.top - r.height * 2 && e.clientY < r.bottom + 40;
      state.mx = inside ? e.clientX - r.left : -1;
    };
    const ctaOver = (e) => { if (e.target.closest?.("[data-outlier-cta]")) state.cta = true; };
    const ctaOut = (e) => {
      const from = e.target.closest?.("[data-outlier-cta]");
      if (from && !from.contains(e.relatedTarget)) state.cta = false;
    };
    const io = new IntersectionObserver(([en]) => { state.visible = en.isIntersecting; }, { threshold: 0 });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerover", ctaOver);
    document.addEventListener("pointerout", ctaOut);
    document.addEventListener("focusin", ctaOver);
    document.addEventListener("focusout", ctaOut);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    } else {
      // reduced motion: still respond to the CTA, without continuous animation
      const tick = (now) => { draw(now); raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      state.running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", ctaOver);
      document.removeEventListener("pointerout", ctaOut);
      document.removeEventListener("focusin", ctaOver);
      document.removeEventListener("focusout", ctaOut);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />;
}
