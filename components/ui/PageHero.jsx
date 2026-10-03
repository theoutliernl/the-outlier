import Breadcrumbs from "./Breadcrumbs";
import Heading from "./Heading";
import Kicker from "./Kicker";
import Lead from "./Lead";
import Media from "./Media";
import Reveal from "./Reveal";
import styles from "./PageHero.module.css";

/**
 * PageHero: the top of every subpage. One h1 per page lives here.
 * image: optional { src, alt } shown to the right (stacks on mobile).
 * actions: optional JSX (Buttons).
 */
export default function PageHero({ kicker, title, lead, crumbs = [], image, actions }) {
  return (
    <header className={styles.hero}>
      <div className="container">
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
        <div className={image ? styles.split : undefined}>
          <div>
            {kicker && <Reveal><Kicker>{kicker}</Kicker></Reveal>}
            <Reveal delay={0.05}><Heading as="h1" size="h1">{title}</Heading></Reveal>
            {lead && <Reveal delay={0.12}><Lead>{lead}</Lead></Reveal>}
            {actions && <Reveal delay={0.18} className={styles.actions}>{actions}</Reveal>}
          </div>
          {image && (
            <Reveal delay={0.15} className={styles.visual}>
              <Media src={image.src} alt={image.alt} ratio={image.ratio || "4/5"} priority sizes="(max-width: 900px) 100vw, 42vw" />
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
