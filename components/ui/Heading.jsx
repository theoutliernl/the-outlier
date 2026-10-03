import styles from "./Heading.module.css";
import { cn } from "./cn";

/**
 * Heading: one component for every title.
 * size: "display" | "h1" | "h2" | "h3"   (visual size, independent of the tag)
 * as:   the HTML tag ("h1", "h2", ...). Keep one h1 per page.
 * caps: Altero-style uppercase display type.
 * Wrap one word in <Accent> for the brand emphasis (italic + gold underline, text stays light).
 */
export default function Heading({ as: Tag = "h2", size = "h2", caps = false, className, children, ...rest }) {
  return (
    <Tag className={cn(styles.heading, styles[size], caps && styles.caps, className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Accent({ children }) {
  return <em className={styles.accent}>{children}</em>;
}
