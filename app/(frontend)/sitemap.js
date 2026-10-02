import { getPublishedPosts } from "../../lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

export default async function sitemap() {
  const now = new Date();
  const routes = [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/start`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];

  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("[sitemap] posts ophalen mislukt:", err?.message || err);
  }

  const postRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return routes.map((r) => ({ ...r, lastModified: now })).concat(postRoutes);
}
