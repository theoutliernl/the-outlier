/**
 * The four service formats (source: Fariza's offer package, theoutlier/aanbodspakket.md).
 * Prices are Fariza's proposals; change them here only, every page reads from this file.
 */
import { Compass, Hammer, Handshake, Presentation } from "lucide-react";

export const services = [
  {
    slug: "ai-friction-scan",
    name: "AI Friction Scan",
    icon: Compass,
    price: "€2,750",
    priceNote: "fixed price",
    duration: "2 weeks",
    oneLiner: "In two weeks you know exactly where your firm loses time, and what AI can do about it.",
    body: "A short, sharp diagnosis of where time and margin leak, and which systems pay for themselves within three months. Not a forty-page report: a list you can pick up on Monday.",
    deliverables: [
      "Interviews with 3 to 5 partners and 5 to 8 people on the floor",
      "Process mapping of your three heaviest flows, such as proposals, onboarding or case files",
      "A scored list of quick wins and structural systems, with time saved and payback per item",
      "A one-page roadmap: what now, what next quarter",
      "A one-hour closing presentation to the partnership",
    ],
    note: "The scan fee is credited when you continue with a Systems Sprint.",
    image: { src: "/images/px-whiteboard-session.jpg", alt: "Consultants mapping a workflow on a whiteboard" },
  },
  {
    slug: "ai-systems-sprint",
    name: "AI Systems Sprint",
    icon: Hammer,
    price: "€12,500",
    priceNote: "Sprint Light from €7,500",
    duration: "8 to 12 weeks",
    oneLiner: "One working system that speeds up your core process, live within a quarter.",
    body: "We design, build and implement one system your firm uses every day: a proposal flow, client onboarding, an internal knowledge assistant or regulation monitoring. Built with your people, measured before and after.",
    deliverables: [
      "Choice and design of one core system, together with your team",
      "Build and integration in Microsoft 365, Google Workspace or your CRM",
      "Two training sessions for the people who use it",
      "Documentation and a maintenance plan",
      "Before and after measurement: hours saved per week, expressed in euros",
    ],
    note: "Sprint Light: six weeks, one subsystem, lighter integration, for firms that want to start smaller.",
    image: { src: "/images/px-team-laptops.jpg", alt: "A team building a system together on laptops" },
  },
  {
    slug: "fractional-transformation-partner",
    name: "Fractional AI Transformation Partner",
    icon: Handshake,
    price: "from €2,750",
    priceNote: "per month",
    duration: "2 or 4 days a month",
    oneLiner: "The transformation lead you cannot hire full-time, at your management table.",
    body: "Corporate transformation experience, part-time and without the politics. We own the AI agenda with your partners: quarterly milestones, vendor choices and the follow-through that turns plans into systems.",
    deliverables: [
      "Partner: 2 days a month, strategy and advice (€2,750 per month)",
      "Embedded: 4 days a month, including steering delivery and vendors (€4,500 per month)",
      "A quarterly agenda with concrete milestones",
      "A one-page progress report: what was built and what it delivered",
      "Ad-hoc availability for decisions on AI, tools and vendors",
    ],
    note: "Starts with a kick-off session and an annual plan.",
    image: { src: "/images/px-leader-presenting.jpg", alt: "A partner presenting a plan to the management team" },
  },
  {
    slug: "partner-workshop",
    name: "Partner Workshop",
    icon: Presentation,
    price: "€1,650",
    priceNote: "on location",
    duration: "half a day",
    oneLiner: "One afternoon in which the whole partnership understands what AI means for your firm.",
    body: "AI without the hype, for partners and leadership. Live demos on your own kind of work, honest limits, privacy and responsibility. You leave with the three decisions to take within 30 days.",
    deliverables: [
      "A three-hour session: what AI can really do today, what it cannot, and where the expert stays central",
      "Live demonstrations based on your firm's own work",
      "Risks and edges: privacy, GDPR, accountability and what clients allow",
      "A hand-out with the three decisions to take within 30 days",
    ],
    note: "The easiest way to get the whole partnership speaking one language about AI.",
    image: { src: "/images/px-workshop-talk.jpg", alt: "Partners in a workshop discussing AI" },
  },
];
