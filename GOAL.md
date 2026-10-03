# /goal — The Outlier site (Fariza Sbaa, theoutlier.nl)

## Wat we bouwen
Een complete, award-level website en funnel voor The Outlier (boutique AI & Transformation consultancy van Fariza Sbaa): moderne, clean, Apple-achtige uitstraling binnen de bestaande brand (Ink #1F1D2B, Clean Slate #F3EDE1, Gold #E0A828, Inter), met smooth animaties overal.

## Scope (alle wensen, verbatim uit Seyed's briefing)
1. **Pagina's**
   - Aparte /services-pagina
   - Dedicated /contact: adresgegevens + normaal contactformulier (naam, e-mail, telefoon, bericht)
   - /start: multistep kwalificerende assessment/quiz (vermomd als assessment) gebaseerd op Fariza's methode (Understand → Map the friction → Build the system → Measure the gain); geeft waarde in ruil voor gegevens en biedt aan het eind een call aan
   - Navbar-links zichtbaar: About Us, Team, Projects, Services, Blog (menu-links eerst, pagina's mogen stub zijn)
   - Blog (expert-level, 1300+ woorden SEO-teksten) + concurrentie-analyse-overzicht (Mac vs PC-framing: "Wij zijn de Mac" — gracieuw over concurrenten, persoonlijke aandacht vs corporate en traag)
2. **Backend**
   - Alles naar Supabase (row-level security, OAuth via Supabase)
   - Alle inzendingen naar Fariza's normale e-mail via haar Composio-e-mailconnectie: bevestiging naar inzender (contact + assessment) + notificatie naar Fariza
   - Call-booking: via Composio (Google Calendar-integratie) of open-source repo; hosten op Vercel, anders eigen VPS
3. **CMS**
   - Open-source CMS compatible met Next.js (voorkeur: Payload); backend om CMS aan te vullen; blog + overview-pagina's
4. **Design & interacties**
   - Hero-visual: rij balken op donkerpaars; bij hover op Book a call schiet de gouden (middelste) balk omhoog en zakt ritmisch terug; effect moet obvious op de heading; 21st.dev-componenten, GSAP of Framer Motion (motion/react)
   - Progress-bar bovenaan die opvult bij scrollen
   - WhatsApp-widget rechtsonder, sticky, clean, geanimeerd (Elfsight-stijl): chatwindow met Fariza's foto "reageert binnen een minuut", knop → haar WhatsApp-nummer met vooringevuld bericht "Ik heb een vraag over The Outlier"
   - Navbar sticky maar schuift weg bij scroll-omlaag, slidet smooth terug bij scroll-omhoog
   - Cijfers bovenaan (TIPS-model: Trust, Influence, Persuade, Sell) — noem de ervaring
   - Lucide icons (of open-source alternatief), groter, divers; Lottie/JSON-animaties; subtiele kleine interacties overal
   - Footer: volledige sitemap + e-mail opt-in nieuwsbrief
   - Ecosysteem: artikel publiceren → e-mail naar klanten + LinkedIn-post + Instagram-carrousel
   - Veel foto's/visuals: open-source of AI-fotobibliotheken, visuele check of het klopt
   - Mobile responsiveness: elke keer driedubbel checken
5. **SEO**
   - Title tags, meta descriptions, alt-teksten op alle afbeeldingen, robots.txt, sitemap.xml, JSON-LD, alles conform de Weblyfe SEO-checklist en full-site audit workflow (docs/PRELAUNCH-CHECKLIST.md)
6. **Werkwijze**
   - Eerst uitgebreide gedetailleerde plannen, meerdere keren checken en verbeteren, dan systematisch uitvoeren in etappes
   - Aparte subagents/runtures gebruiken met ruime tokens
   - Documentatie in de codebase bijhouden (docs/), graphify knowledge graph actueel houden
   - GitHub (theoutliernl) voor alle codebases, Vercel voor hosting

## Werkvolgorde
Vanaf 3 okt 2026 is `docs/FINISH-PLAN.md` de werkvolgorde (fase 0 t/m 10).

## Status (2 okt 2026 — bewezen live)

Geverifieerd met curl op https://theoutlier-site.vercel.app (2 okt):
- Alle routes HTTP 200: /, /contact, /start, /blog, /services, /admin
- sticky-nav en progress-bar renderen op de homepage (in de prerendered HTML)
- Contactpagina rendert contact-grid, addr-block en form-card
- WhatsAppWidget zit in de code en rendert zichtbaar zodra NEXT_PUBLIC_WHATSAPP_NUMBER gezet is in de Vercel-env
- CMS-fundatie actief: /admin login werkt, /blog index + detailpagina's, sitemap bevat posts

## Status (1 okt 2026)
- ✅ Etappe 1: landingspagina v2 live (https://theoutlier-site.vercel.app): hero balk-animatie, UNDERSTAND/SYSTEMISE/SCALE, stats, services-accordion met prijzen, FAQ, footer sitemap + nieuwsbrief, progress-bar, navbar scroll-gedrag, WhatsApp-widget (env-gated), volledige SEO
- ⬜ Etappe 2: /contact + /start (multistep assessment + call-booking via Composio)
- ⬜ Etappe 3: /services volledig (1300+ woorden, foto's)
- ⬜ Etappe 4: CMS + blog
- ⬜ Etappe 5: concurrentie-overzicht (Mac vs PC artikelen)
- ⬜ Etappe 6: domein theoutlier.nl koppelen (na Fariza-akkoord), Search Console, checklist volledig groen

## Open inputs nodig
1. Fariza's WhatsApp-nummer (volledig) voor de widget
2. Call-booking keuze: Composio Google Calendar vs open-source (Cal.com)
3. 21st.dev-token (voor componenten)
4. Fariza-akkoord: definitieve copy + domeinkoppeling

## Kwaliteitsregels (altijd)
- Geen letterlijk kopiëren van het Altero-template (patroon-analyse alleen)
- Tone of voice: direct, human, confident, honest, grounded; nooit hyped, sales-driven, trend-driven
- Copytaal: Engels, ook knoppen en formulieren (Fariza, 28-29 sep). Interne communicatie Nederlands.
- Merk: logo via components/Brand.jsx (THE naast OUTLIER, alleen IER cursief); goud nooit als tekst op licht. Zie docs/FINISH-PLAN.md.
- Elke etappe: graphify --update, checklist-diff, mobile-check op 3 breakpoints, live smoke-test (form → Supabase-rij), screenshots, commit + push
- E-mail/WhatsApp naar derden: nooit zonder Fariza's expliciete goedkeuring (staged via dashboard)