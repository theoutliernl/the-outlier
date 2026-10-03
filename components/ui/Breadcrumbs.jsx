import Link from "next/link";
import styles from "./Breadcrumbs.module.css";
import { SITE_URL } from "../../lib/content/site";

/** Visible breadcrumb + BreadcrumbList JSON-LD. items: [{ label, href }] (Home is added). */
export default function Breadcrumbs({ items }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE_URL}${c.href === "/" ? "" : c.href}` })),
  };
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {all.map((c, i) => (
          <li key={c.href} className={styles.item}>
            {i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
