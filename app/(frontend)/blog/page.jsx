import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import PostCards from "../../../components/ui/PostCards";
import CTABand from "../../../components/ui/CTABand";
import { getPublishedPosts } from "../../../lib/blog";

export const revalidate = 60;

export const metadata = {
  title: "Insights on AI and Systems for Boutique Firms",
  description: "Expert articles on AI, systems and scaling for boutique firms of 50 to 100 people. No hype, real numbers, written from the inside.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("[blog] posts unavailable:", err?.message);
  }
  return (
    <>
      <PageHero kicker="Insights" title="From the inside." lead="Articles on systems, AI and the scaling problems of boutique firms. No hype, real numbers." crumbs={[{ label: "Insights", href: "/blog" }]} />
      <Section size="tight" style={{ paddingTop: 0 }}>
        {posts.length > 0 ? <PostCards posts={posts} /> : <p style={{ color: "var(--text-body)" }}>The first articles are on their way.</p>}
      </Section>
      <CTABand />
    </>
  );
}
