import Image from "next/image";
import styles from "./Media.module.css";
import { cn } from "./cn";

/**
 * Media: every photo. Wraps next/image (responsive, lazy, AVIF/WebP).
 * ratio: CSS aspect-ratio ("4/5", "16/9", "1/1"...). alt is required: describe what is in the photo.
 * grade: "none" | "soft" (a light ink gradient at the bottom for text on top). No duotone: photos should bring light and contrast.
 * zoom: subtle scale on hover of the closest .group parent or the media itself.
 */
export default function Media({ src, alt, ratio = "4/5", sizes = "(max-width: 900px) 100vw, 50vw", priority = false, grade = "none", zoom = true, className, rounded = true }) {
  if (!alt) throw new Error(`Media: alt text is required for ${src}`);
  return (
    <div className={cn(styles.media, rounded && styles.rounded, zoom && styles.zoom, className)} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
      {grade === "soft" && <span className={styles.grade} aria-hidden="true" />}
    </div>
  );
}
