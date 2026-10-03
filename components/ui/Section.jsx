import styles from "./Section.module.css";
import { cn } from "./cn";

/**
 * Section: every page block. Handles vertical rhythm, surface tone and the container.
 * tone: "plain" (page gradient) | "band" (Midnight panel with hairlines) | "deep" | "gold" (CTA band, text turns ink)
 * size: "default" | "tight" | "flush"
 */
export default function Section({ id, tone = "plain", size = "default", className, innerClassName, children, ...rest }) {
  return (
    <section id={id} className={cn(styles.section, styles[tone], styles[size], className)} {...rest}>
      <div className={cn("container", innerClassName)}>{children}</div>
    </section>
  );
}
