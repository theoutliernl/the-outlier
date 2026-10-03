import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Assessment from "../../../components/forms/Assessment";
import { services } from "../../../lib/content/services";

export const metadata = {
  title: "Free AI Assessment for Boutique Firms: Find Your Friction",
  description: "Eight questions, about five minutes. Get your firm's friction profile, an indicative time-saving estimate and three concrete recommendations straight away.",
  alternates: { canonical: "/start" },
};

export default async function StartPage({ searchParams }) {
  const params = await searchParams;
  const interest = services.some((s) => s.slug === params?.interest) ? params.interest : "";
  return (
    <>
      <PageHero
        kicker="Free assessment"
        title="Find your friction."
        lead="Eight questions about how your firm works. You get your profile, an indicative time-saving estimate and three things to look at first. If a conversation makes sense, you can book it at the end."
        crumbs={[{ label: "Assessment", href: "/start" }]}
      />
      <Section size="tight" style={{ paddingTop: 0 }}>
        <Assessment interest={interest} />
      </Section>
    </>
  );
}
