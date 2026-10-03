"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal: fade-up once when the element enters the viewport.
 * One motion motif for the whole site (design brief): 24px rise, 600ms, ease-out.
 * delay in seconds. Use Stagger + Reveal for lists.
 */
const EASE = [0.23, 1, 0.32, 1];

export default function Reveal({ as = "div", delay = 0, y = 24, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Stagger: children wrapped in <StaggerItem> reveal one after another. */
export function Stagger({ as = "div", className, gap = 0.08, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
