import PageHero from "../../../components/ui/PageHero";
import Button from "../../../components/ui/Button";

export const metadata = { title: "Thank you", robots: { index: false, follow: false } };

export default async function ThankYou({ searchParams }) {
  const params = await searchParams;
  const newsletter = params?.type === "newsletter";
  return (
    <PageHero
      kicker={newsletter ? "Newsletter" : "Message received"}
      title="Thank you."
      lead={newsletter ? "You are on the list. One email per new insight, nothing else." : "Your message is in. We reply within one business day."}
      actions={<Button href="/" variant="ghost">Back to the site</Button>}
    />
  );
}
