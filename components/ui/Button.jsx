import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";
import { cn } from "./cn";

/**
 * Button: every call to action.
 * variant: "primary" (gold) | "ink" (dark, for gold surfaces) | "ghost" (outline) | "text" (underlined link)
 * size: "md" | "lg"
 * href makes it a link (internal paths use next/link). Without href it is a <button>.
 * arrow: shows the circular arrow that slides on hover (the "Book a call" pill style).
 */
export default function Button({ href, variant = "primary", size = "md", arrow = true, className, children, ...rest }) {
  const cls = cn(styles.btn, styles[variant], styles[size], className);
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && variant !== "text" && (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      )}
    </>
  );
  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
