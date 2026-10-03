import Accordion from "./Accordion";

/** FAQ accordion + FAQPage JSON-LD. items: [{ title, body (plain string) }] */
export default function FAQ({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({ "@type": "Question", name: q.title, acceptedAnswer: { "@type": "Answer", text: q.body } })),
  };
  return (
    <>
      <Accordion items={items} defaultOpen={0} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
