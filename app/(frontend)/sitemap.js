import { getAllPublished, postUrl } from "../../lib/blog";
import { SITE_URL } from "../../lib/content/site";

const PAGES = [
  ["", 1, "weekly"],
  ["/services", 0.9, "monthly"],
  ["/start", 0.9, "monthly"],
  ["/about", 0.8, "monthly"],
  ["/compare", 0.8, "monthly"],
  ["/contact", 0.8, "monthly"],
  ["/blog", 0.7, "weekly"],
  ["/team", 0.6, "monthly"],
  ["/projects", 0.6, "monthly"],
  ["/privacy", 0.2, "yearly"],
];

export default async function sitemap() {
  const now = new Date();
  let posts = [];
  try {
    posts = await getAllPublished();
  } catch (err) {
    console.error("[sitemap] posts unavailable:", err?.message || err);
  }
  return [
    ...PAGES.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority, changeFrequency })),
    ...posts.map((p) => ({ url: `${SITE_URL}${postUrl(p)}`, lastModified: p.updatedAt || p.publishedAt || now, priority: 0.6, changeFrequency: "monthly" })),
  ];
}
