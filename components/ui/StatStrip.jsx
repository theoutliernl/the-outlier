import NumberTicker from "./NumberTicker";
import styles from "./StatStrip.module.css";

/**
 * StatStrip: the authority row (TIPS: Trust, Influence, Persuade, Sell).
 * items: [{ value: 20, prefix: "~", suffix: "", label: "years ...", note: "TRUST" }]
 * Only real, checkable numbers. Text items: pass `text` instead of `value`.
 */
export default function StatStrip({ items }) {
  return (
    <dl className={styles.strip}>
      {items.map((s) => (
        <div key={s.label} className={styles.item}>
          {s.note && <span className={styles.note}>{s.note}</span>}
          <dt className={styles.value}>{s.text ? s.text : <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />}</dt>
          <dd className={styles.label}>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
