import { RichText } from "@payloadcms/richtext-lexical/react";

// Lexical richText → server-side gerenderde HTML met Payload-klassen.
export default function RichContent({ content }) {
  if (!content) return null;
  return (
    <RichText
      data={content}
      enableGutter={false}
      className="article-content"
    />
  );
}
