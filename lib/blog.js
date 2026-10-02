import { getPayload } from "payload";
import configPromise from "@payload-config";

let cachedPayload = null;

// Payload local API — geen HTTP-overhead in server components.
export async function getPayloadClient() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: await configPromise });
  }
  return cachedPayload;
}

// Gepubliceerde posts voor blog-index en sitemap.
export async function getPublishedPosts({ limit = 100 } = {}) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit,
  });
  return res.docs;
}

export async function getPublishedPostBySlug(slug) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: {
      and: [{ _status: { equals: "published" } }, { slug: { equals: slug } }],
    },
    depth: 1,
    limit: 1,
  });
  return res.docs[0] || null;
}
