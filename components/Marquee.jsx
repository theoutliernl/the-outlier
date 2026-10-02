"use client";

import { useEffect, useState } from "react";

/**
 * Marquee (21st.dev / Magic UI, MIT) — geporteerd naar de huisstijl:
 * geen Tailwind/cn, eigen CSS (app/globals.css: .mq-*), linear loop zoals
 * voorgeschreven door de motion-audit (constante beweging = linear).
 * Pauzeert bij hover, keert optioneel om.
 */
export default function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  repeat = 4,
  duration = 40,
  className = "",
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={`mq ${className}`} aria-hidden="true" />;

  return (
    <div
      className={`mq ${className}`}
      style={{ "--mq-duration": `${duration}s` }}
      aria-hidden={typeof children === "string" ? undefined : "true"}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`mq-track${pauseOnHover ? " mq-pause" : ""}${reverse ? " mq-reverse" : ""}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}