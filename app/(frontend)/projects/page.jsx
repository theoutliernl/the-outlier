import { FileText, UserPlus, BookOpen, Scale } from "lucide-react";
import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal, { Stagger, StaggerItem } from "../../../components/ui/Reveal";
import IconBadge from "../../../components/ui/IconBadge";
import Media from "../../../components/ui/Media";
import Button from "../../../components/ui/Button";
import CTABand from "../../../components/ui/CTABand";
import styles from "../page-common.module.css";
import local from "./projects.module.css";

export const metadata = {
  title: "Projects: The Systems We Build for Boutique Firms",
  description: "The systems The Outlier builds for boutique firms: proposal flows, client onboarding, knowledge assistants and regulation monitoring, plus what a scan delivers.",
  alternates: { canonical: "/projects" },
};

const systems = [
  { icon: FileText, title: "Proposal flow", body: "Proposals drafted from your own past work and pricing logic, with a partner approving the final version. Most proposal content repeats; the system writes that part." },
  { icon: UserPlus, title: "Client onboarding", body: "Contracts from templates, compliance checks and the client file set up once, in the systems you already use. Welcome emails ready for review." },
  { icon: BookOpen, title: "Knowledge assistant", body: "Ask your own case archive questions in plain language: status, precedents, who worked on what. Your data stays inside your environment." },
  { icon: Scale, title: "Regulation monitoring", body: "Changes in the rules your clients depend on, filtered and summarised for the people who need them, with the source always one click away." },
];

const example = [
  { flow: "Client onboarding", hours: "14 h / week", fix: "Automated onboarding flow with templates and a checklist", gain: "≈ 11 h saved, payback ≈ 4 months" },
  { flow: "Case files and status updates", hours: "13 h / week", fix: "Knowledge assistant on the firm's own archive", gain: "≈ 8 h saved, payback ≈ 5 months" },
  { flow: "Proposals", hours: "11 h / week", fix: "Proposal generator with partner approval as the last step", gain: "≈ 8 h saved, payback ≈ 5 months" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Projects"
        title="Systems that do the work around your experts."
        lead="The Outlier is a young firm, so you will not find logo walls here. What you will find: the systems we build, and exactly what a scan hands you."
        crumbs={[{ label: "Projects", href: "/projects" }]}
        image={{ src: "/images/px-team-pointing.jpg", alt: "A team pointing at results on a laptop screen" }}
      />

      <Section tone="band">
        <div className={styles.head}>
          <Reveal><Kicker>What we build</Kicker></Reveal>
          <Reveal delay={0.05}><Heading size="h2">Four systems we know inside out.</Heading></Reveal>
          <Reveal delay={0.1}><Lead>Each one starts from a measured problem and ends with a before-and-after number.</Lead></Reveal>
        </div>
        <Stagger className={local.grid}>
          {systems.map((s) => (
            <StaggerItem key={s.title} className={`group ${styles.card}`}>
              <IconBadge icon={s.icon} />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className={styles.twoCol}>
          <div>
            <Reveal><Kicker>Inside an AI Friction Scan</Kicker></Reveal>
            <Reveal delay={0.05}><Heading size="h2">What two weeks hand you.</Heading></Reveal>
            <Reveal delay={0.1}><Lead>The format of a scan result, shown with an illustrative firm: 70 people, global mobility advisory.</Lead></Reveal>
            <Reveal delay={0.15}><p className={styles.notice} style={{ marginTop: 24 }}>Illustrative example, not a client result. Real scans follow this format with the firm's own numbers.</p></Reveal>
          </div>
          <Reveal><Media src="/images/px-whiteboard-leader.jpg" alt="A consultant explaining a process map on a whiteboard" ratio="5/4" /></Reveal>
        </div>

        <Reveal className={local.finding}>
          <span className={styles.label}>Core finding</span>
          <p><strong>38 hours a week</strong> of manual work a system could take over. At an average rate of €95, that is about <strong>€3,610 a week</strong> of capacity.</p>
        </Reveal>

        <Reveal className={local.tableWrap}>
          <table className={local.table}>
            <caption className="visually-hidden">Illustrative scan result: the three heaviest flows</caption>
            <thead><tr><th scope="col">Flow</th><th scope="col">Time lost</th><th scope="col">System</th><th scope="col">Expected gain</th></tr></thead>
            <tbody>
              {example.map((r) => (
                <tr key={r.flow}><th scope="row">{r.flow}</th><td>{r.hours}</td><td>{r.fix}</td><td>{r.gain}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className={local.roadmap}>
          {[
            ["Now", "Proposal generator: biggest direct time gain, lowest risk, visible to the whole partnership."],
            ["Next quarter", "Onboarding flow: needs the link with the case system, so it follows the proposals."],
            ["After that", "Knowledge assistant: most valuable long-term, needs the clean data from the first two."],
            ["Do not build", "A client portal: clients do not ask for it and it would not pay back within 24 months."],
          ].map(([when, what]) => (
            <Reveal key={when} className={local.step}><span className={styles.label}>{when}</span><p>{what}</p></Reveal>
          ))}
        </div>
        <Reveal className={styles.actions}><Button href="/services#ai-friction-scan">About the AI Friction Scan</Button></Reveal>
      </Section>

      <CTABand />
    </>
  );
}
