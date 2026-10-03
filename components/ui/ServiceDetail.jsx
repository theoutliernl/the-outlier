import { Check } from "lucide-react";
import Button from "./Button";
import Heading from "./Heading";
import IconBadge from "./IconBadge";
import Media from "./Media";
import Reveal from "./Reveal";
import styles from "./ServiceDetail.module.css";

/** One service in full: image, story, deliverables and a price card. flip mirrors the layout. */
export default function ServiceDetail({ service: s, index, flip = false }) {
  return (
    <article id={s.slug} className={`${styles.wrap} ${flip ? styles.flip : ""}`}>
      <Reveal className={styles.visual}>
        <Media src={s.image.src} alt={s.image.alt} ratio="4/5" sizes="(max-width: 900px) 100vw, 40vw" />
        <div className={styles.priceCard}>
          <span className={styles.priceLabel}>Investment</span>
          <span className={styles.price}>{s.price}</span>
          <span className={styles.priceNote}>{s.priceNote}</span>
          <span className={styles.duration}>{s.duration}</span>
        </div>
      </Reveal>
      <div className={styles.text}>
        <Reveal className={styles.top}>
          <IconBadge icon={s.icon} />
          <span className={styles.idx}>{String(index + 1).padStart(2, "0")} / 04</span>
        </Reveal>
        <Reveal delay={0.05}><Heading size="h2" as="h2">{s.name}</Heading></Reveal>
        <Reveal delay={0.1}><p className={styles.oneLiner}>{s.oneLiner}</p></Reveal>
        <Reveal delay={0.12}><p className={styles.body}>{s.body}</p></Reveal>
        <Reveal delay={0.15}>
          <h3 className={styles.listTitle}>What you get</h3>
          <ul className={styles.list}>
            {s.deliverables.map((d) => (
              <li key={d}><Check size={18} aria-hidden="true" /><span>{d}</span></li>
            ))}
          </ul>
          {s.note && <p className={styles.note}>{s.note}</p>}
        </Reveal>
        <Reveal delay={0.2} className={styles.actions}>
          <Button href={`/start?interest=${s.slug}`} data-outlier-cta="">Talk about this format</Button>
        </Reveal>
      </div>
    </article>
  );
}
