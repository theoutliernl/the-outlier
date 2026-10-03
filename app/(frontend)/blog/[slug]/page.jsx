import { notFound, permanentRedirect } from "next/navigation";
import ArticleLayout from "../../../../components/ui/ArticleLayout";
import { COMPARE_PREFIX, getPublishedPostBySlug, getPublishedPosts } from "../../../../lib/blog";
import { SITE_URL } from "../../../../lib/content/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `${SITE_URL}/blog/${post.slug}`, images: post.coverImage ? [post.coverImage] : undefined, publishedTime: post.publishedAt || undefined },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (slug.startsWith(COMPARE_PREFIX)) permanentRedirect(`/compare/${slug}`);
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const related = (await getPublishedPosts({ limit: 4 }).catch(() => [])).filter((p) => p.id !== post.id).slice(0, 3);
  return <ArticleLayout post={post} section={{ label: "Insights", href: "/blog", kicker: "Insight" }} related={related} />;
}
