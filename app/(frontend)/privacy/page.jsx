import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import { contact } from "../../../lib/content/site";
import styles from "../../../components/ui/Prose.module.css";

export const metadata = {
  title: "Privacy Statement",
  description: "How The Outlier handles the personal data you share through this website: what we collect, why, where it is stored and your rights.",
  alternates: { canonical: "/privacy" },
};

// Plain-language statement. Keep it in line with what the site actually does (forms -> Supabase EU, no tracking cookies).
export default function PrivacyPage() {
  return (
    <>
      <PageHero kicker="Privacy" title="Privacy statement" lead="Short and in plain language: what we do with the details you share on this website." crumbs={[{ label: "Privacy", href: "/privacy" }]} />
      <Section size="tight">
        <div className={styles.prose}>
          <h2>Who we are</h2>
          <p>The Outlier, based in {contact.city}, {contact.country}, is responsible for the personal data collected through this website. Questions or requests: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
          <h2>What we collect and why</h2>
          <ul>
            <li><strong>Contact form:</strong> name, email, optional phone number and your message, to answer you.</li>
            <li><strong>Assessment:</strong> your answers, name, email, firm and optional phone number, to show your result and, if you ask for it, to follow up.</li>
            <li><strong>Newsletter:</strong> your email address, to send you new insights. You can unsubscribe at any time.</li>
          </ul>
          <p>The legal basis is your consent or the steps you ask us to take before working together. We do not sell or share your data for marketing.</p>
          <h2>Where it is stored</h2>
          <p>Form submissions are stored in a database hosted in the European Union (Supabase, region eu-west-1). The website is hosted by Vercel. Messages via WhatsApp are handled by WhatsApp under its own terms.</p>
          <h2>How long we keep it</h2>
          <p>Enquiries and assessments that do not lead to a collaboration are deleted within 12 months. Newsletter addresses are kept until you unsubscribe.</p>
          <h2>Cookies</h2>
          <p>This website does not use tracking or advertising cookies.</p>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete your data, or object to its use, by emailing <a href={`mailto:${contact.email}`}>{contact.email}</a>. You may also file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</p>
          <p className={styles.small}>Last updated: October 2026.</p>
        </div>
      </Section>
    </>
  );
}
