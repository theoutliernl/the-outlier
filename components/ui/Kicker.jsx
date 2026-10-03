import styles from "./Kicker.module.css";
import { cn } from "./cn";

/** Small uppercase label with the gold outlier rule in front. */
export default function Kicker({ children, className, as: Tag = "p" }) {
  return <Tag className={cn(styles.kicker, className)}>{children}</Tag>;
}
