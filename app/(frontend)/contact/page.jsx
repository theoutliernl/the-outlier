import { Mail, MapPin, Linkedin, MessageCircle, Clock } from "lucide-react";
import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Reveal from "../../../components/ui/Reveal";
import Button from "../../../components/ui/Button";
import Media from "../../../components/ui/Media";
import ContactForm from "../../../components/forms/ContactForm";
import { SITE_URL, contact } from "../../../lib/content/site";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact The Outlier",
  description: "Questions about AI systems for your boutique firm? Send a message, chat on WhatsApp or take the free five-minute assessment. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export default function ContactPage() {
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}` : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        kicker="Contact"
        title="Let's talk about your firm."
        lead="Tell us in two sentences where your firm loses time. You get an honest answer within one business day, not a sales sequence."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <Section size="tight" className={styles.section}>
        <div className={styles.grid}>
          <Reveal className={styles.info}>
            <ul className={styles.list}>
              <li><Mail aria-hidden="true" /><div><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div></li>
              {wa && <li><MessageCircle aria-hidden="true" /><div><span>WhatsApp</span><a href={wa} target="_blank" rel="noopener noreferrer">Chat with Fariza</a></div></li>}
              <li><MapPin aria-hidden="true" /><div><span>Office</span><p>{contact.city}, {contact.country}<br />{contact.area}</p></div></li>
              <li><Clock aria-hidden="true" /><div><span>Response time</span><p>{contact.responseTime}</p></div></li>
              <li><Linkedin aria-hidden="true" /><div><span>LinkedIn</span><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Fariza Sbaa</a></div></li>
            </ul>
            <div className={styles.assess}>
              <Media src="/images/px-two-women-meeting.jpg" alt="Two professionals in a focused conversation" ratio="16/10" />
              <div className={styles.assessText}>
                <p className={styles.assessTitle}>Prefer a structured start?</p>
                <p>Five minutes, eight questions, your firm's profile and a recommended starting point.</p>
                <Button href="/start" data-outlier-cta="">Take the assessment</Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </Section>
    </>
  );
}
