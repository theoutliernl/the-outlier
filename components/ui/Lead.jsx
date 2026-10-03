import styles from "./Lead.module.css";
import { cn } from "./cn";

/** Intro paragraph under a heading. */
export default function Lead({ children, className, as: Tag = "p" }) {
  return <Tag className={cn(styles.lead, className)}>{children}</Tag>;
}
