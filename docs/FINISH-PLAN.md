# The Outlier: plan om de site af te maken

Opgesteld 2026-10-03 door de operator (Seyed via Claude), op basis van de cap-briefing
(`docs/briefing-transcript.txt`), de gesprekken Seyed↔Quint en Fariza↔Quint, en een
controle van de live reviewsite. Dit plan vervangt de takenstapel in `GOAL.md` als
werkvolgorde; `scripts/clark-loop.json` volgt dit plan.

## Vaste regels (gelden voor elke fase)

**Fariza's merk- en contentregels (uit haar eigen berichten, 28 t/m 30 sep):**
- Alle webcopy in het **Engels**, ook knoppen, formulieren, meldingen en bedankpagina's.
  Interne communicatie blijft Nederlands.
- Overal de volledige naam **The Outlier**, nooit alleen "Outlier".
- Logo: vijf balken (middelste is de outlier-balk) + wordmark met **THE klein naast OUTLIER,
  nooit erboven**, en **alleen IER cursief**. Altijd via `components/Brand.jsx`
  (`Logo`, `Mark`, `Wordmark`); nergens zelf nabouwen.
- **Midnight Framework** als volledige pagina-achtergrond.
- Goud (`#E0A828`) is accent: de outlier-balk, IER, regels en één accentwoord per kop op
  donker. **Nooit goud als tekst op Clean Slate (licht).** Op een goud vlak wordt het logo ink.
  Bron: `design/tokens.js` (uit de Figma "Marketing & Branding").
- De naam Quint komt nooit op de site, in branding of in uitgaande berichten.
- Doelgroep: boutique firms van **50 tot 100 medewerkers**.
- Niets verzinnen: geen nep-cases, nep-cijfers of nep-reviews. Ontbrekende feiten vraag je
  aan Fariza.
- Niets versturen (mail, WhatsApp, LinkedIn) zonder Fariza's akkoord op de exacte tekst.
  Dat geldt ook voor automatische mailsjablonen: één keer akkoord per sjabloon.

**Werkwijze (zie ook `AGENTS.md`):**
1. Elke taak op een eigen branch (`feat/...`, `fix/...`, `chore/...`).
2. `npx next build` moet groen zijn.
3. `bash scripts/qa-tests.sh http://localhost:<poort>` tegen `next start` van die build:
   0 rood. Formulier-checks zijn dry-run (header `x-qa-dry-run` + `.test`-adres) en schrijven
   niets weg.
4. Screenshots op 375, 768 en 1440 px van elke geraakte pagina, zelf bekijken tegen deze regels.
5. Pas dan mergen naar `main` (Vercel deployt de reviewsite), daarna
   `bash scripts/qa-tests.sh` tegen de reviewsite en `docs/OPERATOR-STATUS.md` bijwerken.
6. Een build of HTTP 200 is geen oplevering. Visueel akkoord komt van Seyed of Fariza.

## Fase 0: fundament (gedaan op 2026-10-03, branch `chore/phase-0-foundation`)
- Logo als gedeeld onderdeel; THE naast OUTLIER, alleen IER cursief, in nav, header, footer
  en OG-afbeelding. OG-merkteken had de goude balk aan de rand; nu in het midden.
- Oude huisstijlbestanden (koper/espresso, pijl-logo, theoutlier.co) uit `public/` verwijderd;
  JSON-LD-logo wijst naar het nieuwe `public/logo-mark.png`.
- QA vervuilt productie niet meer: contact-, assessment- en nieuwsbriefroutes slaan
  QA-inzendingen over (geen rij, geen mail). QA-suite krijgt merk-checks en een URL-argument.
- Testartikel "De CMS-fundatie staat" teruggezet naar concept (niet verwijderd).
- Losse `chk/cleanup/verify*.sql` uit de repo-root verwijderd (staan in git-geschiedenis).
- Werkwijze vastgelegd in `AGENTS.md`; taal- en merkregel gecorrigeerd in `GOAL.md`.
- Open uit fase 0, beslissing van Seyed: Quint's brein draait op `z-ai/glm-5.3-flash`.
  Advies: zwaar bouwwerk door Claude laten doen, Quint voor klantcontact.

## Fase 1: vaste onderdelen op elke pagina
- Eén gedeelde site-shell in `app/(frontend)/layout.jsx`: `StickyNav`, `Progress`,
  `WhatsAppWidget`, footer met sitemap en nieuwsbrief. Nu zitten ze alleen op de homepage.
- Navbar: About, Team, Projects, Services, Blog, Compare, Contact + knop "Start the assessment".
  Mobiel: drawer. Menu-links mogen naar een eenvoudige eerste pagina wijzen.
- WhatsApp-widget in Elfsight-stijl: Fariza's foto, "Usually replies within a minute",
  vooringevuld bericht in het Engels ("I have a question about The Outlier").
- Paginatitels zonder dubbele suffix ("Contact — The Outlier — The Outlier").
- Klaar als: alle pagina's hebben nav, voortgangsbalk, widget en footer (QA-check per route).

## Fase 2: homepage-hero
- Achtergrondvideo: kantoor met mensen die samenwerken (Seyed, 3 okt), licht en contrast,
  geen zware filter. Pexels is goedgekeurd.
- Balkenvisual als hoofdeffect: rij balken die langzaam bewegen; bij hover op "Book a call"
  schiet de middelste gouden balk omhoog en zakt daarna ritmisch terug. Goed zichtbaar.
- Cijferstrook bovenaan volgens TIPS (Trust, Influence, Persuade, Sell): echte cijfers van
  Fariza (jaren ervaring, ING/Heineken/Prosus/Monks, enz.).
- Grotere en gevarieerdere iconen (lucide), Lottie-animaties, kleine interacties.
- Alle copy Engels.

## Fase 3: `/start` als echte assessment
- Typeform-gevoel: één vraag per scherm, schermvullend, voortgang, toetsenbordbediening
  (Enter, cijfers), gestylede keuzekaarten in plaats van kale knoppen, foto's, vloeiende
  overgangen (motion/react), Apple-achtig binnen de huisstijl.
- Vragen op bureaus van 50 tot 100 medewerkers en op Fariza's methode
  (Understand, Map the friction, Build the system, Measure the gain).
- Uitslag met echte waarde: profiel, score en drie concrete aanbevelingen; bij een goede
  match de agenda direct op de pagina.
- Opslag in Supabase met RLS; Engels.

## Fase 4: contact, agenda en mail
- `/contact`: gestyled formulier (name, email, phone, message), adresblok, link naar `/start`.
- Agenda: Fariza koppelt Google Calendar via dash.getclark.app/app/integrations; daarna een
  eigen boekingsagenda via Composio, gehost op Vercel. Terugvaloptie Cal.com.
- Mail via Fariza's Composio-mailkoppeling (briefing), niet via losse SMTP:
  bevestiging aan de inzender en melding aan Fariza voor contact, assessment, nieuwsbrief
  en afspraak. Ontvanger: fariza@theoutlier.nl (nu staat er nog een gmail-adres als standaard).
- Sjablonen eerst ter goedkeuring aan Fariza; pas na haar akkoord `MAIL_ENABLED` aan.

## Fase 5: CMS en blog
- Payload: covers, categorieën, auteur, overzichtspagina's, rollen; RLS op eigen tabellen.
- Expertblogs (Engels, 1300+ woorden) over Fariza's onderwerpen. De twee Nederlandse
  Mac-vs-PC-artikelen vertalen en herschrijven naar Engels.
- Lege covervakken op `/blog` oplossen.

## Fase 6: vergelijking (`/compare`)
- Overzichtspagina in Mac-vs-PC-stijl: "wij zijn de Mac", netjes over de concurrent
  ("zij zijn best goed, maar persoonlijke aandacht is voor een groot bureau lastig").
- Per bekende concurrent in deze niche een artikel van 1300+ woorden met bronnen en backlinks.
- Alleen feitelijke, controleerbare vergelijkingen (regels voor vergelijkende reclame).
- Fariza keurt goed vóór publicatie.

## Fase 7: About, Team en Projects
- About: founder-verhaal met echte feiten en foto (hoge resolutie van Fariza).
- Team: Fariza (en eventueel netwerk, alleen met toestemming).
- Projects: alleen echte cases; zolang die er niet zijn een nette "coming soon" met CTA.

## Fase 8: services en beeld
- Meer menselijke foto's met licht en contrast; Engels.
- Prijzen pas tonen als Fariza ze vaststelt; tot dan "from" of "on request".

## Fase 9: ecosysteem
- Gepubliceerd artikel maakt automatisch concepten: nieuwsbriefmail, LinkedIn-post,
  Instagram-carrousel. Alles wacht op Fariza's akkoord vóór verzending.

## Fase 10: controle en lancering
- Screenshots 375/768/1440 van elke pagina, Lighthouse, SEO-checklist
  (`docs/PRELAUNCH-CHECKLIST.md`) volledig groen.
- Pas na Fariza's akkoord: `theoutlier.nl` koppelen, Search Console, sitemap indienen.

## Nodig van Fariza
1. Bevestiging: hele site in het Engels.
2. Echte cijfers voor de TIPS-strook en een founder-foto in hoge resolutie.
3. Google Calendar en mail koppelen in dash-integraties.
4. Akkoord op mailsjablonen, prijzen en concurrentie-artikelen.
5. Akkoord op het domein en DNS-toegang.
