"use client";

import { useEffect, useRef } from "react";

/**
 * GlyphField (was CodeBackground v2) — naar het 21st.dev "code-background" effect (anark17r):
 * een raster van glyphs dat oplicht rond de cursor, geport naar de huisstijl.
 * - rusttoestand: zeer gedempte leigrijze tekens / stippen op ink
 * - rond de cursor: glyphs lichten op in goudtinten (radius-falloff)
 * - GPU-vriendelijk: één canvas, rAF, pauze bij hidden tab, uit bij reduced-motion
 */
const GLYPHS = "01{}<>=+*/#$[]→×∴∆πΞAIアエオカキ".split("");
const COLS_GOLD = ["240,200,90", "224,168,40", "184,133,28", "245,225,175"];
const DIM = "153, 149, 171";

export default function GlyphField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0, H = 0;
    let cells = [];
    const SIZE = 18;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const R = 190;                 // oplicht-radius in px
    const R2 = R * R;

    const build = () => {
      const host = canvas.parentElement;
      W = host.clientWidth; H = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(W / SIZE) + 1;
      const rows = Math.ceil(H / SIZE) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * SIZE + SIZE / 2,
            y: r * SIZE + SIZE / 2,
            glyph: Math.random() < 0.72 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
            col: COLS_GOLD[(Math.random() * COLS_GOLD.length) | 0],
            glow: 0,               // 0..1, lerpt naar target
          });
        }
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };

    let last = 0;
    const draw = (t) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      // cursor-gloed "meereist" via exponentiële lerp
      const k = 1 - Math.exp(-10 * dt);
      if (mouse.tx > -9000) {
        mouse.x += (mouse.tx - mouse.x) * k;
        mouse.y += (mouse.ty - mouse.y) * k;
      } else {
        mouse.x += (-9999 - mouse.x) * k;
        mouse.y += (-9999 - mouse.y) * k;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const c of cells) {
        const dx = c.x - mouse.x, dy = c.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const target = d2 < R2 ? 1 - Math.sqrt(d2) / R : 0;
        c.glow += (target - c.glow) * Math.min(1, 8 * dt);
        const g = c.glow;
        if (c.glyph) {
          if (g < 0.02) {
            ctx.fillStyle = `rgba(${DIM}, 0.13)`;
            ctx.fillText(c.glyph, c.x, c.y);
          } else {
            ctx.fillStyle = `rgba(${c.col}, ${0.18 + g * 0.72})`;
            ctx.fillText(c.glyph, c.x, c.y);
          }
        } else if (g > 0.04) {
          ctx.fillStyle = `rgba(${c.col}, ${g * 0.5})`;
          ctx.fillRect(c.x - 1, c.y - 1, 2, 2);
        }
      }
    };

    const onVis = () => {
      const next = !document.hidden;
      if (next && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(draw); }
      else if (!next && running) { running = false; cancelAnimationFrame(raf); }
    };

    build();
    raf = requestAnimationFrame((t) => { last = t; draw(t); });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", build);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}