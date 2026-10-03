import { notFound } from "next/navigation";
import ArticleLayout from "../../../../components/ui/ArticleLayout";
import { COMPARE_PREFIX, getPublishedComparisons, getPublishedPostBySlug } from "../../../../lib/blog";
import { SITE_URL } from "../../../../lib/content/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = slug.startsWith(COMPARE_PREFIX) ? await getPublishedPostBySlug(slug).catch(() => null) : null;
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/compare/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `${SITE_URL}/compare/${post.slug}`, images: post.coverImage ? [post.coverImage] : undefined },
  };
}

export default async function ComparePost({ params }) {
  const { slug } = await params;
  if (!slug.startsWith(COMPARE_PREFIX)) notFound();
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const related = (await getPublishedComparisons().catch(() => [])).filter((p) => p.id !== post.id).slice(0, 3);
  return <ArticleLayout post={post} section={{ label: "Compare", href: "/compare", kicker: "Mac versus PC" }} related={related} />;
}
