import { Compass, ScanSearch, Workflow, TrendingUp } from "lucide-react";
import IconBadge from "../ui/IconBadge";
import { Stagger, StaggerItem } from "../ui/Reveal";
import styles from "./MethodGrid.module.css";

const ICONS = { understand: Compass, map: ScanSearch, build: Workflow, measure: TrendingUp };

/** The four-step method as a hairline grid. steps from lib/content/site.js (method). */
export default function MethodGrid({ steps }) {
  return (
    <Stagger as="ol" className={styles.grid}>
      {steps.map((s, i) => (
        <StaggerItem as="li" key={s.key} className={`group ${styles.card}`}>
          <div className={styles.top}>
            <IconBadge icon={ICONS[s.key]} />
            <span className={styles.step}>Step {i + 1}</span>
          </div>
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.body}>{s.body}</p>
          <span className={styles.bar} style={{ "--s": 0.5 + i * 0.3 }} aria-hidden="true" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
