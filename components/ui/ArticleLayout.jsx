import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import RichContent from "./RichContent";
import PostCards from "./PostCards";
import Section from "./Section";
import Heading from "./Heading";
import Kicker from "./Kicker";
import Reveal from "./Reveal";
import CTABand from "./CTABand";
import { readingMinutes, postUrl } from "../../lib/blog";
import { SITE_URL, founder } from "../../lib/content/site";
import styles from "./ArticleLayout.module.css";

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Shared layout for insights (/blog/[slug]) and comparisons (/compare/[slug]). */
export default function ArticleLayout({ post, section, related = [] }) {
  const url = `${SITE_URL}${postUrl(post)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: { "@id": `${SITE_URL}/about#founder` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
    inLanguage: "en",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className={styles.header}>
          <div className="container">
            <Breadcrumbs items={[{ label: section.label, href: section.href }, { label: post.title, href: postUrl(post) }]} />
            <div className={styles.headInner}>
              <Reveal><Kicker>{section.kicker}</Kicker></Reveal>
              <Reveal delay={0.05}><Heading as="h1" size="h1" className={styles.title}>{post.title}</Heading></Reveal>
              {post.excerpt && <Reveal delay={0.1}><p className={styles.excerpt}>{post.excerpt}</p></Reveal>}
              <Reveal delay={0.15} className={styles.meta}>
                <Image src={founder.photo.src} alt="" width={40} height={40} className={styles.avatar} />
                <span><strong>{founder.name}</strong>{post.publishedAt && <> · <time dateTime={post.publishedAt}>{DATE.format(new Date(post.publishedAt))}</time></>} · {readingMinutes(post.content)} min read</span>
              </Reveal>
            </div>
          </div>
        </header>
        {post.coverImage && (
          <div className="container">
            <Reveal className={styles.cover}>
              <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 1240px) 100vw, 1160px" />
            </Reveal>
          </div>
        )}
        <Section size="tight">
          <div className={styles.body}>
            <RichContent content={post.content} />
            <aside className={styles.author}>
              <Image src={founder.photo.src} alt={founder.photo.alt} width={72} height={72} className={styles.authorImg} />
              <div>
                <p className={styles.authorName}>{founder.name}, founder of The Outlier</p>
                <p className={styles.authorBio}>{founder.short}</p>
                <Link href="/about" className={styles.authorLink}>About Fariza</Link>
              </div>
            </aside>
          </div>
        </Section>
      </article>
      {related.length > 0 && (
        <Section tone="band">
          <Reveal><Kicker>Keep reading</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2" className={styles.relatedTitle}>More from the inside.</Heading></Reveal>
          <PostCards posts={related} />
        </Section>
      )}
      <CTABand />
    </>
  );
}
