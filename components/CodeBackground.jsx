"use client";

import { useEffect, useRef } from "react";

/**
 * CodeBackground — geïnspireerd op 21st.dev "code-background" (anark17r),
 * maar een eigen implementatie in de huisstijl: code-regen in goud/inkt
 * op canvas, subtiel (lage alpha), achter de hero. Geen 21st.dev-file
 * (daglimiet), wel hetzelfde effect, gebranded:
 *  - glyphs: code-tekens + binaire runs, enkele in goud
 *  - langzaam, constant motion → linear, geen easing nodig
 *  - pauzeert bij verborgen tab en reduced-motion
 */
const GLYPHS = "01{}<>=+*/#$[]→×AI".split("");
const GOLD = "224, 168, 40";
const LIGHT = "199, 195, 211";

export default function CodeBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let cols = [];
    let last = 0;

    const setup = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const size = 14;
      const n = Math.ceil(w / (size * 1.4));
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * size * 1.4 + Math.random() * 6,
        y: Math.random() * -h,
        speed: 26 + Math.random() * 34,      // px/s — langzaam
        chars: Array.from({ length: Math.ceil(h / size) + 2 }, () =>
          Math.random() < 0.28
            ? { c: GLYPHS[(Math.random() * GLYPHS.length) | 0], gold: Math.random() < 0.16 }
            : null
        ),
      }));
    };

    const draw = (t) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const col of cols) {
        col.y += col.speed * dt;
        if (col.y - col.chars.length * 14 > h) {
          col.y = -Math.random() * 160;
          col.chars = col.chars.map(() =>
            Math.random() < 0.28
              ? { c: GLYPHS[(Math.random() * GLYPHS.length) | 0], gold: Math.random() < 0.16 }
              : null
          );
        }
        col.chars.forEach((ch, i) => {
          if (!ch) return;
          const y = col.y + i * 14;
          if (y < -14 || y > h) return;
          const age = 1 - Math.min(y / h, 1);          // bovenin iets zichtbaarder
          const alpha = (0.10 + age * 0.14) * (ch.gold ? 1.5 : 0.8);
          ctx.fillStyle = ch.gold
            ? `rgba(${GOLD}, ${Math.min(alpha, 0.42)})`
            : `rgba(${LIGHT}, ${alpha})`;
          ctx.fillText(ch.c, col.x, y);
        });
      }
    };

    const onVis = () => {
      running = !document.hidden && true;
      if (running) { last = performance.now(); raf = requestAnimationFrame(draw); }
      else cancelAnimationFrame(raf);
    };

    setup();
    raf = requestAnimationFrame((t) => { last = t; draw(t); });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", setup);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="code-bg"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}