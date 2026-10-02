const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

export const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services van The Outlier",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "AI Friction Scan",
      description:
        "Een scherpe scan van je bureau: waar lekt tijd en marge weg, en welk systeem dat oplost. Vooraf een vast bedrag, achteraf een plan.",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", priceCurrency: "EUR", price: 2750 },
    },
    {
      "@type": "Service",
      position: 2,
      name: "AI Systems Sprint",
      description:
        "In twee tot vier weken bouwen we het systeem dat je bureau van Excel en losse gereedschappen af helpt. Inclusief adoptie door je team.",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", priceCurrency: "EUR", price: 12500 },
    },
    {
      "@type": "Service",
      position: 3,
      name: "Fractional AI Transformation Partner",
      description:
        "De transformation lead die je niet kunt aantrekken: aan tafel bij bestuur en partnerschap, met kwartaalagenda's en meetbare mijlpalen. Corporate ervaring, parttime, zonder de politiek.",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", priceCurrency: "EUR", price: 2750, unitText: "MONTH" },
    },
    {
      "@type": "Service",
      position: 4,
      name: "Partner Workshop",
      description:
        "Eén dag met het volledige partnerschap: waar lekt de marge weg, wat is het systeemplaan, en wat doen we maandag anders.",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", priceCurrency: "EUR", price: 1650 },
    },
  ],
};

const faqs = [
  {
    q: "Voor wie is The Outlier?",
    a: "Voor boutique adviesbureaus van twee tot vijftig mensen: organisatieadvies, HR-advies, interim, juridisch en IT-consulting. De beslisser is de founder of managing partner en dat is precies met wie we werken.",
  },
  {
    q: "Hoe werkt het traject?",
    a: "We beginnen met de AI Friction Scan: een scherpe meting waar tijd en marge lekken. Daarna bouwen we het systeem dat die frictie wegneemt en embedden we het bij je team. Kort traject, meetbaar resultaat.",
  },
  {
    q: "Jullie verkopen AI-tools?",
    a: "Nee. We zijn geen tool-verkoper en sturen geen junioren op je af. We bouwen systemen rond je eigen experts, in de gereedschappen die je al hebt waar dat kan.",
  },
  {
    q: "Wat als een systeem zich niet terugverdient?",
    a: "Dat zeggen we vooraf. Elke opdracht eindigt met cijfers: uren bespaard, marge verbeterd. Als de scan laat zien dat een systeem zich niet terugverdient, zeggen we dat. Onze waardigheid zit in die eerlijkheid.",
  },
  {
    q: "Hoe snel zie ik resultaat?",
    a: "De scan levert binnen twee weken een plan met cijfers. De eerste systemen draaien binnen een maand; de meeste bureaus houden drie of meer uur per consultant per week over.",
  },
  {
    q: "Waarom The Outlier en niet een groot bureau?",
    a: "Corporate ervaring, boutique uitvoering. Bijna twintig jaar ING, Heineken en Monks van binnenuit, nu rechtstreeks toegepast op jouw bureau. Geen aanloop, geen bureaucratie, geen junioren die het werk doen.",
  },
];

export const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export { faqs };
export const jsonLdContact = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — The Outlier",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "The Outlier",
    email: "hello@theoutlier.nl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
  },
};
