export const metadata = {
  title: "Blog",
  description:
    "Expert-artikelen van The Outlier over systemen, AI en schaalproblemen in boutique adviesbureaus. Geen hype, wel cijfers.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="page-stub">
      <p className="kicker">Blog</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
        From the <span className="gold-italic">inside</span>.
      </h1>
      <p className="lead">
        Expert-artikelen over systemen, AI en schaalproblemen in boutique adviesbureaus.
        De eerste artikelen verschijnen zodra het CMS live is.
      </p>
    </main>
  );
}