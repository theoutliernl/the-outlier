import Button from "./Button";
import Heading from "./Heading";
import Kicker from "./Kicker";
import Lead from "./Lead";
import Reveal from "./Reveal";
import Section from "./Section";
import styles from "./CTABand.module.css";

/** The gold closing band. Defaults to the main conversion: the assessment and a call. */
export default function CTABand({
  kicker = "Ready to scale?",
  title = "One conversation to find out where the friction lives.",
  lead = "Take the five-minute assessment and get your profile straight away. If a call makes sense, you can book it at the end. If it does not, we will say so.",
  primary = { href: "/start", label: "Start the assessment" },
  secondary = { href: "/contact", label: "Send a message" },
}) {
  return (
    <Section tone="gold" className="gold-surface">
      <div className={styles.wrap}>
        <Reveal><Kicker>{kicker}</Kicker></Reveal>
        <Reveal delay={0.05}><Heading size="h1" className={styles.title}>{title}</Heading></Reveal>
        <Reveal delay={0.1}><Lead>{lead}</Lead></Reveal>
        <Reveal delay={0.15} className={styles.actions}>
          <Button href={primary.href} variant="ink" size="lg">{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="text">{secondary.label}</Button>}
        </Reveal>
      </div>
    </Section>
  );
}
