import Link from "next/link";
import { getPublishedPosts } from "../../../lib/blog";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description:
    "Expert-artikelen van The Outlier over systemen, AI en schaalproblemen in boutique adviesbureaus. Geen hype, wel cijfers.",
  alternates: { canonical: "/blog" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date)
  );
}

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("[blog] posts ophalen mislukt:", err?.message || err);
  }

  return (
    <main className="page-stub">
      <p className="kicker">Blog</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
        From the <span className="gold-italic">inside</span>.
      </h1>
      <p className="lead">
        Expert-artikelen over systemen, AI en schaalproblemen in boutique adviesbureaus.
        Geen hype, wel cijfers.
      </p>

      {posts.length === 0 ? (
        <p className="blog-empty">
          Het eerste artikel is in de maak. Druk op de knop en je krijgt het als eerste.
        </p>
      ) : (
        <div className="ins-grid blog-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="ins-card"
              prefetch={false}
            >
              {post.coverImage && (
                <div className="ins-img">
                  <img src={post.coverImage} alt={post.title} loading="lazy" />
                </div>
              )}
              <p className="ins-tag">
                {formatDate(post.publishedAt || post.createdAt)}
                {post.author?.name ? ` — ${post.author.name}` : ""}
              </p>
              <p className="ins-title">{post.title}</p>
              {post.excerpt && <p className="ins-excerpt">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "The Outlier — Blog",
            url: `${SITE_URL}/blog`,
            publisher: { "@type": "Organization", name: "The Outlier" },
          }),
        }}
      />
    </main>
  );
}
