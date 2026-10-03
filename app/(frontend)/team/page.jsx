import { Layers, ShieldCheck, Users } from "lucide-react";
import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal, { Stagger, StaggerItem } from "../../../components/ui/Reveal";
import IconBadge from "../../../components/ui/IconBadge";
import FounderBlock from "../../../components/home/FounderBlock";
import CTABand from "../../../components/ui/CTABand";
import { founder } from "../../../lib/content/site";
import styles from "../page-common.module.css";

export const metadata = {
  title: "Team: Senior Expertise, Deliberately Small",
  description: "The Outlier is deliberately small. The founder leads every engagement and brings in vetted specialists only where your project needs them.",
  alternates: { canonical: "/team" },
};

const principles = [
  { icon: Users, title: "The founder leads every engagement", body: "No hand-off to juniors after the sale. The person who scopes your project stays on it until the system is live and measured." },
  { icon: Layers, title: "Specialists only where needed", body: "For specific integrations or technical builds we bring in vetted specialists from our network, under our direction and our quality bar." },
  { icon: ShieldCheck, title: "One point of accountability", body: "You always know who is responsible. Agreements on data, roles and confidentiality are made in writing before any work starts." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Team"
        title="Deliberately small. Senior by design."
        lead="Big firms scale by adding people. We scale by building systems, so the person you meet is the person who does the work."
        crumbs={[{ label: "Team", href: "/team" }]}
      />

      <Section size="tight">
        <FounderBlock founder={founder} />
      </Section>

      <Section tone="band">
        <div className={styles.head}>
          <Reveal><Kicker>How a team forms around your project</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2">The right expertise, without the pyramid.</Heading></Reveal>
          <Reveal delay={0.1}><Lead>Every engagement is shaped around your firm, not around keeping a large bench busy.</Lead></Reveal>
        </div>
        <Stagger className={styles.cards}>
          {principles.map((p) => (
            <StaggerItem key={p.title} className={`group ${styles.card}`}>
              <IconBadge icon={p.icon} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand kicker="Work with us" title="Meet the person who will do the work." />
    </>
  );
}
