

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

export default function sitemap() {
  const now = new Date();
  const routes = [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/start`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];
  return routes.map((r) => ({ ...r, lastModified: now }));
}