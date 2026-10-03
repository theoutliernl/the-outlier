import { getPayload } from "payload";
import configPromise from "@payload-config";

let cachedPayload = null;

/**
 * Content convention (no schema change needed):
 * - posts whose slug starts with "vs-" are comparisons, shown under /compare/<slug>
 * - every other published post is an insight, shown under /blog/<slug>
 */
export const COMPARE_PREFIX = "vs-";

export async function getPayloadClient() {
  if (!cachedPayload) cachedPayload = await getPayload({ config: await configPromise });
  return cachedPayload;
}

async function findPublished(where, limit) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { and: [{ _status: { equals: "published" } }, where] },
    sort: "-publishedAt",
    depth: 1,
    limit,
  });
  return res.docs;
}

/** Published insights (blog), newest first. */
export function getPublishedPosts({ limit = 100 } = {}) {
  return findPublished({ slug: { not_like: `${COMPARE_PREFIX}%` } }, limit);
}

/** Published comparisons (/compare), newest first. */
export function getPublishedComparisons({ limit = 50 } = {}) {
  return findPublished({ slug: { like: `${COMPARE_PREFIX}%` } }, limit);
}

/** Every published post (sitemap). */
export function getAllPublished({ limit = 500 } = {}) {
  return findPublished({ slug: { exists: true } }, limit);
}

export async function getPublishedPostBySlug(slug) {
  const docs = await findPublished({ slug: { equals: slug } }, 1);
  return docs[0] || null;
}

/** Rough reading time from Lexical content. */
export function readingMinutes(content) {
  let words = 0;
  const walk = (n) => {
    if (!n) return;
    if (typeof n.text === "string") words += n.text.split(/\s+/).filter(Boolean).length;
    (n.children || []).forEach(walk);
  };
  walk(content?.root);
  return Math.max(1, Math.round(words / 230));
}

export function postUrl(post) {
  return post.slug.startsWith(COMPARE_PREFIX) ? `/compare/${post.slug}` : `/blog/${post.slug}`;
}
