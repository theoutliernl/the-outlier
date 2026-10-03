/**
 * Assessment ("Find your friction") — questions, scoring and result. Shared by the client form and /api/assessment.
 * Mirrors Fariza's method: Understand -> Map the friction -> Build the system -> Measure the gain.
 * To change a question or its wording, edit QUESTIONS; scoring reads the option `value`s.
 */

export const QUESTIONS = [
  {
    id: "firmType",
    title: "What kind of firm are you?",
    hint: "Tailored advice starts with the right picture.",
    type: "single",
    options: [
      { value: "advisory", label: "Advisory or consulting" },
      { value: "hr-mobility", label: "HR or global mobility" },
      { value: "legal", label: "Legal" },
      { value: "recruitment", label: "Recruitment or executive search" },
      { value: "other", label: "Other professional services" },
    ],
  },
  {
    id: "size",
    title: "How many people work at your firm?",
    hint: "Including partners and support staff.",
    type: "single",
    options: [
      { value: "lt50", label: "Fewer than 50" },
      { value: "50-100", label: "50 to 100" },
      { value: "100-250", label: "100 to 250" },
      { value: "250+", label: "More than 250" },
    ],
  },
  {
    id: "friction",
    title: "Where does time leak most?",
    hint: "Pick up to three.",
    type: "multi",
    max: 3,
    options: [
      { value: "proposals", label: "Proposals and pricing" },
      { value: "onboarding", label: "Client onboarding" },
      { value: "reporting", label: "Reports and documentation" },
      { value: "knowledge", label: "Finding knowledge and precedents" },
      { value: "admin", label: "Planning and admin" },
      { value: "sales", label: "Sales follow-up" },
    ],
  },
  {
    id: "hours",
    title: "How much repetitive work does a typical person do per week?",
    hint: "Copying, formatting, chasing, searching. A rough guess is fine.",
    type: "single",
    options: [
      { value: "lt2", label: "Less than 2 hours" },
      { value: "2-5", label: "2 to 5 hours" },
      { value: "5-10", label: "5 to 10 hours" },
      { value: "10+", label: "More than 10 hours" },
    ],
  },
  {
    id: "tooling",
    title: "How does your firm work today?",
    type: "single",
    options: [
      { value: "spreadsheets", label: "Mostly spreadsheets and email" },
      { value: "scattered", label: "Several tools that do not talk to each other" },
      { value: "core", label: "One core system, little automation" },
      { value: "ai", label: "Already experimenting with AI" },
    ],
  },
  {
    id: "ambition",
    title: "What matters most in the next 12 months?",
    type: "single",
    options: [
      { value: "grow", label: "Grow without hiring at the same pace" },
      { value: "margin", label: "Protect and improve margin" },
      { value: "professionalise", label: "Professionalise without becoming corporate" },
      { value: "safe-ai", label: "Make AI work, safely and compliantly" },
    ],
  },
  {
    id: "role",
    title: "What is your role?",
    type: "single",
    options: [
      { value: "partner", label: "Partner or owner" },
      { value: "management", label: "Management team" },
      { value: "explorer", label: "Exploring on behalf of someone else" },
    ],
  },
  {
    id: "timing",
    title: "When would you like to act?",
    type: "single",
    options: [
      { value: "now", label: "Now" },
      { value: "3m", label: "Within three months" },
      { value: "later", label: "Later this year" },
      { value: "exploring", label: "Just exploring" },
    ],
  },
];

export const ALLOWED = Object.fromEntries(QUESTIONS.map((q) => [q.id, q.options.map((o) => o.value)]));

const PEOPLE = { lt50: 35, "50-100": 75, "100-250": 150, "250+": 300 };
const HOURS = { lt2: 1, "2-5": 3.5, "5-10": 7.5, "10+": 12 };

const FRICTION_LINES = {
  proposals: "Proposals: most content repeats from earlier work. A proposal flow drafts it from your own material, a partner approves the final version.",
  onboarding: "Onboarding: contracts, checks and client files are set up by hand. One flow can do this once, in the systems you already use.",
  reporting: "Reports: experts spend hours formatting what a system can assemble. They should spend that time on the judgement clients pay for.",
  knowledge: "Knowledge: answers live in inboxes and heads. A knowledge assistant on your own archive makes them findable in seconds.",
  admin: "Admin: planning and coordination eat partner time. Small automations here pay back fastest.",
  sales: "Sales: follow-ups depend on someone remembering. A light system keeps every lead moving without extra effort.",
};
const TOOLING_LINES = {
  spreadsheets: "Spreadsheets and email mean the process lives with one or two people. Start by capturing the flow before automating it.",
  scattered: "Disconnected tools cost time in the gaps between them. Connecting two of them often beats adding a third.",
  core: "A core system is a strong foundation. The gain is in automating the steps around it.",
  ai: "You are already experimenting. The next step is turning one experiment into a measured system the whole firm uses.",
};
const AMBITION_LINES = {
  grow: "Growth without matching headcount needs systems that scale with you, not more hours from your best people.",
  margin: "Margin improves fastest by removing unbilled work around your experts, not by raising rates.",
  professionalise: "Professionalising does not require corporate structure: let systems carry the routine, keep people for the human part.",
  "safe-ai": "Safe AI starts with a clear map of what data a system touches and who stays accountable. That is part of every design we make.",
};

/**
 * Score a set of answers. Returns everything the result screen and the notification need.
 * score: 0-100 friction & readiness index. outcome: "call" (offer a call) or "nurture".
 */
export function scoreAssessment(a) {
  const friction = Array.isArray(a.friction) ? a.friction : [];
  let score = 10;
  score += Math.min(friction.length, 3) * 8; // up to 24
  score += { lt2: 2, "2-5": 10, "5-10": 18, "10+": 24 }[a.hours] || 0;
  score += { spreadsheets: 14, scattered: 14, core: 9, ai: 6 }[a.tooling] || 0;
  score += { lt50: 4, "50-100": 12, "100-250": 10, "250+": 4 }[a.size] || 0;
  score += { partner: 8, management: 6, explorer: 2 }[a.role] || 0;
  score += { now: 8, "3m": 6, later: 3, exploring: 0 }[a.timing] || 0;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const people = PEOPLE[a.size] || 75;
  const perPerson = HOURS[a.hours] || 3.5;
  const weeklyHours = Math.round(people * perPerson);
  const recoverable = Math.round(weeklyHours / 3);

  let profile;
  if (score >= 70) profile = { key: "ready", name: "Ready to build", summary: "The friction is real and measurable, and you are in a position to act. A scan will turn it into a roadmap with payback figures within two weeks." };
  else if (score >= 50) profile = { key: "stretched", name: "Stretched experts", summary: "Your people are carrying work a system could take over. The gains are there; the first step is choosing the one flow worth fixing first." };
  else profile = { key: "explorer", name: "Early explorer", summary: "You are early, which is a good moment to get the foundations right before tools get chosen for you." };

  const recommended =
    profile.key === "ready" ? "ai-friction-scan" : profile.key === "stretched" ? (a.role === "partner" ? "ai-friction-scan" : "partner-workshop") : "partner-workshop";

  const lines = [
    ...friction.slice(0, 2).map((f) => FRICTION_LINES[f]).filter(Boolean),
    TOOLING_LINES[a.tooling],
    AMBITION_LINES[a.ambition],
  ].filter(Boolean).slice(0, 3);

  const outcome = score >= 50 && a.timing !== "exploring" ? "call" : "nurture";
  return { score, outcome, profile, recommended, weeklyHours, recoverable, lines };
}
