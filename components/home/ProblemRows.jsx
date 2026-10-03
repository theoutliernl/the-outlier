import { Stagger, StaggerItem } from "../ui/Reveal";
import styles from "./ProblemRows.module.css";

/** Numbered statement rows; a gold line sweeps in on hover. items: [{ title, body }] */
export default function ProblemRows({ items }) {
  return (
    <Stagger as="ol" className={styles.rows}>
      {items.map((p, i) => (
        <StaggerItem as="li" key={p.title} className={styles.row}>
          <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
          <span className={styles.title}>{p.title}</span>
          <span className={styles.body}>{p.body}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
