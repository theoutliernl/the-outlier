import Link from "next/link";
import Media from "./Media";
import { Stagger, StaggerItem } from "./Reveal";
import { postUrl, readingMinutes } from "../../lib/blog";
import styles from "./PostCards.module.css";

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Article cards for blog index, compare hub and the home insights rail. posts: Payload docs. */
export default function PostCards({ posts, columns = 3 }) {
  return (
    <Stagger className={styles.grid} style={{ "--cols": columns }}>
      {posts.map((p) => (
        <StaggerItem key={p.id}>
          <Link href={postUrl(p)} className={`group ${styles.card}`}>
            <Media src={p.coverImage || "/images/px-team-planning.jpg"} alt={p.title} ratio="16/11" sizes="(max-width: 760px) 100vw, 33vw" />
            <div className={styles.meta}>
              {p.publishedAt && <time dateTime={p.publishedAt}>{DATE.format(new Date(p.publishedAt))}</time>}
              <span>{readingMinutes(p.content)} min read</span>
            </div>
            <h3 className={styles.title}>{p.title}</h3>
            {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
