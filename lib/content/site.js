/**
 * Site-wide content and facts. Single source of truth: pages and components read from here.
 * Rules: English copy, always "The Outlier", only real and checkable facts (no invented cases or numbers).
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theoutlier.nl";

export const brand = {
  name: "The Outlier",
  tagline: "Corporate experience. Boutique execution.",
  role: "AI & Transformation Partner",
  audience: "boutique firms of 50 to 100 people",
};

export const contact = {
  email: "hello@theoutlier.nl",
  city: "Amsterdam",
  country: "The Netherlands",
  area: "Working across Europe and the UAE",
  linkedin: "https://www.linkedin.com/in/fariza-sbaa",
  // Digits only, international format, e.g. 31612345678. Set in Vercel env.
  whatsapp: (process.env.NEXT_PUBLIC_WA_NUMBER || "").replace(/\D/g, ""),
  whatsappMessage: "Hi Fariza, I have a question about The Outlier.",
  responseTime: "We reply within one business day.",
};

/** Main navigation (desktop bar + mobile menu). */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export const primaryCta = { href: "/start", label: "Start the assessment" };
export const callCta = { href: "/start", label: "Book a call" };

/** Footer sitemap columns. */
export const footerColumns = [
  {
    title: "The Outlier",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/services", label: "Services" },
      { href: "/start", label: "Free assessment" },
      { href: "/compare", label: "The Outlier vs big firms" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Read",
    links: [
      { href: "/blog", label: "Insights" },
      { href: "/compare", label: "Comparisons" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];

export const founder = {
  name: "Fariza Sbaa",
  role: "Founder",
  photo: { src: "/founder.jpg", alt: "Portrait of Fariza Sbaa, founder of The Outlier" },
  short:
    "Nearly two decades in HR, Global Mobility, Governance, Compliance and Global Transformation inside international organisations. Now building those systems for boutique firms.",
  career: [
    // Only confirmed facts. Ask Fariza before adding roles or results.
    { org: "ING Bank", span: "14 years" },
    { org: "Heineken International", span: "8 months" },
    { org: "Media.Monks", span: "4 years", note: "Senior Global Mobility Advisor" },
  ],
  belief: "Expertise should be amplified by better systems.",
};

/** TIPS strip: Trust, Influence, Persuade, Sell. Real numbers only. */
export const stats = [
  { note: "TRUST", prefix: "~", value: 20, label: "years running complexity from the inside" },
  { note: "INFLUENCE", value: 14, label: "years at ING, one of Europe's largest banks" },
  { note: "PERSUADE", text: "50–100", label: "people: the firm size we build for, and only that" },
  { note: "SELL", value: 2, suffix: " wks", label: "from first interview to a roadmap with payback figures" },
];

/** The recognisable problem (home). */
export const problems = [
  { title: "Too small for a transformation team", body: "You cannot hire an AI department, and you should not have to." },
  { title: "Too big to sit still", body: "Processes grew with the firm but were never redesigned for its size." },
  { title: "Everyone talks about AI", body: "Nobody owns it, so it stays a pilot, a newsletter or a tool nobody opens." },
  { title: "Experts doing system work", body: "Your best people write, copy, chase and format work a system could do." },
];

/** The method: Understand, Map the friction, Build the system, Measure the gain. */
export const method = [
  { key: "understand", title: "Understand", body: "How your firm actually works: partners, people, clients and flows. Interviews at the table and on the floor. No assumptions." },
  { key: "map", title: "Map the friction", body: "Where time and margin leak, measured in hours and euros per week, so every choice has a number behind it." },
  { key: "build", title: "Build the system", body: "One system around your experts, inside the tools you already use. Built with your people, not over their heads." },
  { key: "measure", title: "Measure the gain", body: "Before and after, in numbers. If a system does not pay back, we say so and we stop." },
];

/** Brand values (design/tokens.js). */
export const values = [
  { title: "Bold", body: "We say what we see, including when the answer is: do not build this." },
  { title: "Insider", body: "We have run this kind of complexity from the inside. We know how a partnership decides." },
  { title: "Systems", body: "Advice ends in a report. We end in something your team uses every day." },
  { title: "Human", body: "AI strengthens your experts. It never replaces their judgement." },
  { title: "Evolving", body: "Every system is measured, maintained and improved, or retired." },
];

export const marqueeItems = [
  "Senior expertise only",
  "Fixed prices",
  "Measured in hours and euros",
  "Built in the tools you already use",
  "Experts at the centre",
  "GDPR by design",
  "No hype",
];

export const faqs = [
  {
    title: "Who is The Outlier for?",
    body: "Boutique firms of roughly 50 to 100 people: advisory, HR and mobility, legal and recruitment firms. Big enough to feel the friction, too small to build their own transformation team.",
  },
  {
    title: "What does working with you cost?",
    body: "Every engagement has a fixed price agreed upfront. The AI Friction Scan is the usual starting point; the services page lists every format with its price and duration.",
  },
  {
    title: "Do we need to change our tools?",
    body: "Usually not. We build inside Microsoft 365, Google Workspace and the CRM or practice software you already use. New tools only when the numbers clearly justify them.",
  },
  {
    title: "What about privacy, GDPR and client confidentiality?",
    body: "Data protection is part of the design, not an afterthought. We map what data a system touches, keep client data inside your environment where possible and agree the roles and responsibilities in writing before anything is built.",
  },
  {
    title: "Will AI replace our experts?",
    body: "No. The systems we build take over the repetitive work around your experts, so they spend more time on the judgement clients pay for.",
  },
  {
    title: "How fast will we see results?",
    body: "The scan gives you a roadmap with payback figures within two weeks. A Systems Sprint puts one working system live within one quarter, measured before and after.",
  },
];
