import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IconBadge from "../ui/IconBadge";
import { Stagger, StaggerItem } from "../ui/Reveal";
import styles from "./ServiceCards.module.css";

/** The four formats as linked cards (home + services overview). services from lib/content/services.js */
export default function ServiceCards({ services }) {
  return (
    <Stagger className={styles.grid}>
      {services.map((s) => (
        <StaggerItem key={s.slug}>
          <Link href={`/services#${s.slug}`} className={`group ${styles.card}`}>
            <div className={styles.head}>
              <IconBadge icon={s.icon} />
              <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
            </div>
            <h3 className={styles.name}>{s.name}</h3>
            <p className={styles.line}>{s.oneLiner}</p>
            <div className={styles.meta}>
              <span><strong>{s.price}</strong> {s.priceNote}</span>
              <span>{s.duration}</span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
