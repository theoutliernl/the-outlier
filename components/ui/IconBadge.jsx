import styles from "./IconBadge.module.css";
import { cn } from "./cn";

/**
 * IconBadge: one lucide icon in a hairline square. On hover of the badge or a parent .group,
 * the stroke redraws itself (stroke-dash animation) and the square fills gold.
 * Usage: <IconBadge icon={Compass} />   (import icons from "lucide-react")
 */
export default function IconBadge({ icon: Icon, size = "md", className }) {
  return (
    <span className={cn(styles.badge, styles[size], className)} aria-hidden="true">
      <Icon strokeWidth={1.6} className={styles.icon} />
    </span>
  );
}
