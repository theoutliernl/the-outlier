import Link from "next/link";
import { notFound } from "next/navigation";
import RichContent from "../../../../components/RichContent";
import { getPublishedPostBySlug } from "../../../../lib/blog";

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date)
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch {
    post = null;
  }
  if (!post) return {};
  const description = post.excerpt || "Expert-artikel van The Outlier.";
  const image = post.coverImage || undefined;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: image ? [image] : undefined,
      publishedTime: post.publishedAt || undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch (err) {
    console.error("[blog detail] post ophalen mislukt:", err?.message || err);
  }
  if (!post) notFound();

  const authorName = post.author?.name || "The Outlier";

  return (
    <main className="page-stub">
      <p className="kicker">
        <Link href="/blog" className="blog-back">
          Blog
        </Link>
      </p>
      <h1 className="article-title">{post.title}</h1>
      <p className="article-meta">
        {formatDate(post.publishedAt || post.createdAt)} — {authorName}
      </p>
      {post.excerpt && <p className="section-lead article-excerpt">{post.excerpt}</p>}
      {post.coverImage && (
        <img className="article-cover" src={post.coverImage} alt={post.title} />
      )}
      <RichContent content={post.content} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || undefined,
            url: `${SITE_URL}/blog/${post.slug}`,
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt || post.publishedAt || post.createdAt,
            author: { "@type": "Person", name: authorName },
            publisher: {
              "@type": "Organization",
              name: "The Outlier",
              url: SITE_URL,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-vertical.png` },
            },
            image: post.coverImage || undefined,
            isPartOf: { "@type": "Blog", url: `${SITE_URL}/blog` },
            inLanguage: "nl",
          }),
        }}
      />
    </main>
  );
}
