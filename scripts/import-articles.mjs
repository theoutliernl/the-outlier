import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Importeer de twee Mac-vs-PC artikelen als Payload posts (draft-safe, upsert op slug).
const DIR = path.join(process.cwd(), "content", "articles");

async function upsert(payload, article) {
  const existing = await payload.find({
    collection: "posts",
    where: { slug: { equals: article.slug } },
    limit: 1,
  });
  const doc = {
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    author: article.author,
    publishedAt: new Date(),
    content: article.content,
    _status: "published",
  };
  if (existing.docs.length) {
    await payload.update({ collection: "posts", id: existing.docs[0].id, data: doc });
    return `updated ${article.slug}`;
  }
  await payload.create({ collection: "posts", data: { ...doc, slug: article.slug } });
  return `created ${article.slug}`;
}

const payload = await getPayload({ config: await configPromise });
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
for (const f of files) {
  const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  console.log(await upsert(payload, a));
}
process.exit(0);