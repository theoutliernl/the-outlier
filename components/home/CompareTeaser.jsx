import { Check, Minus } from "lucide-react";
import { Stagger, StaggerItem } from "../ui/Reveal";
import styles from "./CompareTeaser.module.css";

/** Two-column Mac-vs-PC table. rows from lib/content/compare.js. limit trims for the home teaser. */
export default function CompareTeaser({ rows, limit }) {
  const list = limit ? rows.slice(0, limit) : rows;
  return (
    <div className={styles.table} role="table" aria-label="The Outlier compared with a big consultancy">
      <div className={styles.head} role="row">
        <span role="columnheader" className={styles.topicHead}>&nbsp;</span>
        <span role="columnheader" className={styles.bigHead}>Big consultancy</span>
        <span role="columnheader" className={styles.usHead}>The Outlier</span>
      </div>
      <Stagger>
        {list.map((r) => (
          <StaggerItem key={r.topic} className={styles.row} role="row">
            <span role="rowheader" className={styles.topic}>{r.topic}</span>
            <span role="cell" className={styles.big}><Minus size={16} aria-hidden="true" />{r.big}</span>
            <span role="cell" className={styles.us}><Check size={16} aria-hidden="true" />{r.us}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
