import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./Prose.module.css";

/** Lexical rich text from Payload, rendered server-side with the shared prose styles. */
export default function RichContent({ content }) {
  if (!content) return null;
  return <RichText data={content} enableGutter={false} className={styles.prose} />;
}
