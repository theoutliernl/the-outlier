import { StaggerItem, Stagger } from "./Reveal";
import styles from "./ValueList.module.css";

/** Brand values as big rows. items: [{ title, body }] */
export default function ValueList({ items }) {
  return (
    <Stagger as="ul" className={styles.list}>
      {items.map((v) => (
        <StaggerItem as="li" key={v.title} className={styles.row}>
          <span className={styles.title}>{v.title}</span>
          <span className={styles.body}>{v.body}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
