import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Kicker from "../ui/Kicker";
import Lead from "../ui/Lead";
import Media from "../ui/Media";
import Reveal from "../ui/Reveal";
import styles from "./FounderBlock.module.css";

/** Founder photo + career list + belief. founder from lib/content/site.js */
export default function FounderBlock({ founder, headingAs = "h2", link = true }) {
  return (
    <div className={styles.grid}>
      <Reveal className={styles.photo}>
        <Media src={founder.photo.src} alt={founder.photo.alt} ratio="4/5" sizes="(max-width: 900px) 100vw, 40vw" />
      </Reveal>
      <div>
        <Reveal><Kicker>Founded from the inside</Kicker></Reveal>
        <Reveal delay={0.05}><Heading as={headingAs} size="h2">{founder.name}</Heading></Reveal>
        <Reveal delay={0.1}><Lead>{founder.short}</Lead></Reveal>
        <Reveal delay={0.15}>
          <ul className={styles.career}>
            {founder.career.map((c) => (
              <li key={c.org}>
                <span className={styles.org}>{c.org}{c.note && <em>{c.note}</em>}</span>
                <span className={styles.span}>{c.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <blockquote className={styles.belief}>
            <span className={styles.beliefLabel}>The Outlier was built on one belief</span>
            “{founder.belief}”
          </blockquote>
        </Reveal>
        {link && <Reveal delay={0.25}><Button href="/about" variant="ghost">More about Fariza</Button></Reveal>}
      </div>
    </div>
  );
}
