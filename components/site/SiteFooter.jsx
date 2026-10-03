import Link from "next/link";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "../Brand";
import NewsletterForm from "./NewsletterForm";
import { brand, contact, footerColumns } from "../../lib/content/site";
import styles from "./SiteFooter.module.css";

/** Footer on every page: brand, full sitemap, newsletter opt-in, contact, legal line. */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size={34} />
            <p className={styles.tagline}>{brand.tagline}</p>
            <ul className={styles.contact}>
              <li><Mail size={16} aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><MapPin size={16} aria-hidden="true" /><span>{contact.city}, {contact.country}. {contact.area}.</span></li>
              <li><Linkedin size={16} aria-hidden="true" /><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Fariza Sbaa on LinkedIn</a></li>
            </ul>
          </div>
          <nav aria-label="Footer" className={styles.cols}>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href + l.label}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.news}>
          <div>
            <p className={styles.colTitle}>Stay updated</p>
            <p className={styles.newsCopy}>One email when we publish a new insight. No hype, no sales sequence.</p>
          </div>
          <NewsletterForm />
        </div>
        <div className={styles.bottom}>
          <span>© {year} {brand.name}. All rights reserved.</span>
          <span>Photography: Pexels (free licence)</span>
        </div>
      </div>
      <span className={styles.bar} aria-hidden="true" />
    </footer>
  );
}
