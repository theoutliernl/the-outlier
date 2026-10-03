import styles from "./Marquee.module.css";

/** Infinite horizontal strip of short phrases, gold dot separators. Pauses on hover, static for reduced motion. */
export default function Marquee({ items, speed = 38 }) {
  const row = [...items, ...items];
  return (
    <div className={styles.marquee} style={{ "--speed": `${speed}s` }}>
      <div className={styles.track} aria-hidden="true">
        {row.map((t, i) => <span key={i} className={styles.item}>{t}</span>)}
      </div>
      <p className="visually-hidden">{items.join(", ")}</p>
    </div>
  );
}
