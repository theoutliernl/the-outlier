// Gedeelde scoring-logic (client + API). Spiegelt Fariza's methode:
// Understand → Map the friction → Build the system → Measure the gain.

export const FRICTION_OPTIONS = [
  { value: "schrijfwerk", label: "Schrijfwerk", hint: "Voorstellen, rapportages, adviesnotities" },
  { value: "offertes", label: "Offertes & facturatie", hint: "Van akkoord tot betaling" },
  { value: "processen", label: "Processen", hint: "Onboarding, planning, opvolging" },
  { value: "sales", label: "Sales", hint: "Follow-ups, pipeline, acquisitie" },
];

export const TOOLING_OPTIONS = [
  { value: "excel", label: "Excel of Sheets", hint: "Held bij elkaar gehouden door één iemand" },
  { value: "losse", label: "Losse tools", hint: "Tien abonnementen, nul overzicht" },
  { value: "systeem", label: "Eén systeem", hint: "Werkt vooral vanzelf" },
];

export const AMBITION_OPTIONS = [
  { value: "groei", label: "Groei naar meer fte", hint: "Groei die je nu (nog) niet kunt dragen" },
  { value: "marges", label: "Betere marges", hint: "Meer omzet per uur geleverd werk" },
  { value: "professionaliseren", label: "Professionaliseren", hint: "Volwassen worden, zonder corporate te worden" },
];

export const TYPE_OPTIONS = [
  { value: "advies", label: "Adviesbureau" },
  { value: "hr", label: "HR / organisatieadvies" },
  { value: "juridisch", label: "Juridisch" },
  { value: "anders", label: "Anders (managementbureau / interim)" },
];

export const SIZE_OPTIONS = [
  { value: "1-5", label: "1–5 fte" },
  { value: "5-10", label: "5–10 fte" },
  { value: "10-25", label: "10–25 fte" },
  { value: "25+", label: "25+ fte" },
];

export function scoreAssessment(a) {
  let score = 2;
  const friction = Array.isArray(a.friction) ? a.friction : [];
  score += Math.min(friction.length, 4);
  if (a.tooling === "excel") score += 3;
  else if (a.tooling === "losse") score += 2;
  const ambition = Array.isArray(a.ambition) ? a.ambition : [];
  if (ambition.includes("professionaliseren")) score += 1;
  if (ambition.includes("marges")) score += 1;
  if (["10-25", "25+"].includes(a.bureauSize)) score += 1;
  score = Math.min(score, 12);

  const outcome = score >= 6 ? "call" : "form";
  const lines = [];
  friction.forEach((f) => {
    const map = {
      schrijfwerk: "Schrijfwerk lekt uren: voorstellen, rapportages en notities die jouw expertise uit je hoofd moeten komen.",
      offertes: "Offertes en facturatie vertragen de cashflow: tijd tussen werk en betaling.",
      processen: "Processen staan in hoofden, niet in een systeem — onboarding en opvolging kosten teamtijd.",
      sales: "Sales hangt aan persoonlijke opvolging: leads lopen weg tussen stappen door.",
    };
    if (map[f]) lines.push(map[f]);
  });
  const toolMap = {
    excel: "Excel of Sheets als systeem betekent: één persoon is de entropie. Weg als die ziek is.",
    losse: "Losse tools geven tien abonnementen en nul overzicht — geen enkele tool weet wat de ander doet.",
    systeem: "Eén systeem is een sterk fundament. De rest van je bureau is de schaarste.",
  };
  if (toolMap[a.tooling]) lines.push(toolMap[a.tooling]);
  const ambMap = {
    groei: "Groei wil je dragen met een systeem dat meeschaalt, niet met meer uren van jezelf.",
    marges: "Betere marges komen van geautomatiseerde tussenstappen, niet van hogere uurtarieven.",
    professionaliseren: "Professionaliseren kan zonder corporate te worden: systemen overnemen de structuur, mensen houden het menselijke.",
  };
  ambition.forEach((am) => { if (ambMap[am]) lines.push(ambMap[am]); });

  return { score, outcome, lines };
}
