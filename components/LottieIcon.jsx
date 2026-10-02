"use client";

import { useEffect, useRef } from "react";

/**
 * LottieIcon — lichte lottie-web renderer (geen react-lottie dependency),
 * laadt de JSON uit /lottie/, loopt door, pauzeert bij reduced-motion.
 * autoplay/loop instelbaar; sizing via width/height props.
 */
export default function LottieIcon({ src, width = 120, height = 120, className = "", ariaLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    let anim;
    let cancelled = false;
    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        const mod = await import("lottie-web");
        const lottie = mod.default || mod;
        const data = await fetch(src).then((r) => r.json());
        if (cancelled || !ref.current) return;
        anim = lottie.loadAnimation({
          container: ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data,
        });
      } catch {
        /* geen lottie of geen data: stilletjes niets doen */
      }
    })();
    return () => {
      cancelled = true;
      if (anim) anim.destroy();
    };
  }, [src]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : "true"}
    />
  );
}