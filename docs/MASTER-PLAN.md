# The Outlier — Masterplan site + funnel (v2, volledig)
Opdrachtgever: Fariza Sbaa (theoutlier.nl) · Maker/instructeur: Seyed (Weblyfe) · Agent: Quint
Laatst bijgewerkt: 1 oktober 2026 · Legend: ✅ af · 🔄 in uitvoering · ⬜ gepland

## 0. Bronnen (alle bewaard)
1. **Cap-video briefing** (cap.so/s/1a83r0gnm0acb43, 9 min, volledig transcript lokaal: /tmp/capvid/transcript.txt, frames: /tmp/capvid/frame_*.jpg) — chapters: 0:00 intro/doel · 2:26 CMS+blog+concurrentie · 3:36 design/animaties/UI · 5:21 widgets/responsiveness/interacties · 7:31 implementatie/hosting/roadmap.
2. **Chat-instructies Seyed**: 21st.dev gebruiken, Altero-look als referentie, nieuwste Next.js, SEO tot in de puntjes, documentatie in codebase, checklists altijd bij de hand, skills/repo's gebruiken.
3. **Marktonderzoek-rapport** (memory `marketing-onderzoek`): doelgroep, pijnpunten, taal, 3 persona's, bronnen.
4. **Altero reverse-engineering** (docs/altero-ref/, 7 screenshots): structuur, visueel systeem, animatie-inventaris, blauwdruk. Patroon-analyse, geen letterlijk kopiëren.
5. **Brand styleguide** (Figma Marketing & Branding → design/tokens.js): kleuren, typografie, logo-regels.
6. **Checklists**: docs/PRELAUNCH-CHECKLIST.md (26 items) + docs/ARCHITECTURE.md + graphify-out/ knowledge graph.

## 1. Alle wensen uit de video-briefing (transcript-geverifieerd)
### 1.1 Pagina-structuur
- ⬜ Aparte **/services**-pagina
- ⬜ Dedicated **/contact**: adresgegevens, normaal contactformulier (naam, e-mail, telefoon, bericht)
- ⬜ **/start**: multistep, kwalificerend **assessment/quiz** gebaseerd op Fariza's methode (Understand → Map the friction → Build the system → Measure the gain), persoonlijke ervaring, eindigt met aanbieden van een call
- ⬜ Call-booking: eigen agenda via **Composio** (Google Calendar-integratie), zelf gehost op Vercel; als te zwaar, eigen VPS
- ⬜ **CMS**: open-source, Next.js-compatibel; voor **blog** (expert-level artikelen → later LinkedIn-artikelen) en **concurrentie-analyse-overzicht**
- ⬜ Concurrentie-artikelen: **1300+ woorden**, backlinks, "Mac vs PC"-framing (wij zijn de Mac): gracieuw, niet denigrerend — "zij zijn goed, alleen lastig persoonlijke aandacht; corporate en traag vs. nieuw en persoonlijk"
- ⬜ Navbar-links: About Us, Team, Projects, Services, Blog (menu-links al zichtbaar, pagina's mogen nog stub zijn)
### 1.2 Interactie & widgets
- ⬜ **Progress-bar** bovenaan die bij scrollen langzaam opvult
- ⬜ **WhatsApp-widget** rechtsonder, sticky, clean, geanimeerd; opent chatvenster met Fariza's foto ("reageert binnen een minuut"); knop → Fariza's WhatsApp-nummer met vooringevuld bericht "Ik heb een vraag over The Outlier"; referentie: Elfsight-widget; zoekt populaire open-source widget
- ⬜ **Navbar sticky maar schuift weg bij omlaag scrollen, schuift smooth terug bij omhoog scrollen**
- ⬜ Smooth scroll-to-top
### 1.3 Hero-visual (de kern-idee)
- ⬜ Visualiseren dat we de Outlier zijn: **bar-visualisatie op donkerpaarse achtergrond**, accentkleur
- ⬜ Bij hover op "Book a call": de **gele balk in het midden schiet omhoog**, en zakt weer terug in ritmisch niveau gelijk aan de rest; gele balken blijven geel
- ⬜ Effect volledig ambient/uitgebreid over de hero
- ⬜ GSAP of Framer Motion (motion/react), 21st.dev-componenten als basis
### 1.4 Autoriteit & content
- ⬜ **Cijfers bovenaan** (TIPS-model: Trust, Influence, Persuade, Sell) — ervaring en bewijs
- ⬜ Alles met Framer Motion / smooth motion
- ⬜ Iconografie: **lucide-icons** (of open-source alternatief), groter, divers
- ⬜ **Lottie-animaties** om icons interessant te maken
- ⬜ Subtiele kleine interacties overal; de site "compleet maken"
- ⬜ **Footer**: volledige sitemap + opt-in nieuwsbrief
- ⬜ **Ecosysteem**: artikel publiceren → e-mail naar klanten + LinkedIn-post + Instagram-carrousel
- ⬜ /services: meer foto's, visuals; open-source/AI-fotobibliotheken
- ⬜ **Mobile responsiveness: elke keer triple-checken**
### 1.5 Backend & fundatie
- ⬜ Supabase backend (✅ draait) met **row-level security** (✅) en OAuth
- ⬜ Alle inzendingen → Fariza's normale e-mail (via Composio-mailconnectie) + bevestiging naar inzender + notificatie naar Fariza
- ⬜ Nieuwsbrief: artikel-publicatie triggert e-mail
- ⬜ Plannen: **gedetailleerd opschrijven, meerdere keren checken en verbeteren**, dan systematisch uitvoeren met sub-agents en volledige tokens
- ⬜ Werken in **etappes**, landingspagina eerst

## 2. Design-target (uit de video-frames, de look die Seyed toont)
- Fotog hero, donker, met mega-typografie "CORPORATE EXPERIENCE. BOUTIQUE EXECUTION."
- Service-tags-paneel rechts in hero (Strategy / Brand / Web / AI Systems / **Transformation** actief)
- Regel met "Founded from the inside · Amsterdam, NL — working internationally · hello@theoutlier.nl"
- Sectie **UNDERSTAND. SYSTEMISE. SCALE.** + proceskaarten: Understand / Map the friction / Build the system / Measure the gain (elk met mini-balk-icon in gold)
- **BRAND MANIFESTO**-regel
- **OUR SERVICES** accordion met genummerde rijen en prijzen: AI Friction Scan (€2.750), AI Systems Sprint (€12.500), Fractional AI Transformation Partner (€2.750/mo, "2 or 4 days a month... The transformation lead you cannot hire."), Partner Workshop (€1.650)
- Nav: THE OUTLIER-logo met balk-icon, Book a call + gele circle-arrow, MENU-overlay
- Donkerpaars/Ink-grootvlak, subtiele verticale gridlijnen (1px, wit ~8%)

## 3. Etappes
**Etappe 1 — Landingspagina opnieuw** 🔄 (nu)
- next/font Inter, Tailwind-v4 @theme tokens, logo's gerenderd, alt-teksten
- Hero met interactieve bar-visualisatie (gele balk schiet op bij Book-a-call-hover), foto-achtergrond, service-tags
- UNDERSTAND/SYSTEMISE/SCALE + proceskaarten, BRAND MANIFESTO, services-accordion (video-content), stats/authority-blok (TIPS), FAQ, footer met sitemap + nieuwsbrief-optin
- Progress-bar, sticky-scroll navbar, WhatsApp-widget
- Motion/react overal, lucide-icons, Lottie-animatie
- SEO volledig: metadataBase, OG/Twitter/canonical, JSON-LD (Organization/Person/WebSite/Service/FAQPage), robots.ts, sitemap.ts, opengraph-image.tsx
- Marktonderzoek-taal in de copy (bottleneck, systemen, geen hypetaal)
- PRELAUNCH-CHECKLIST site-niveau op ✅, mobile triple-check, deploy + screenshot-review

**Etappe 2 — /contact + /start**
- Normaal formulier + multistep assessment (quiz op haar methode, persoonlijke resultaten, call-aanbieding)
- Call-booking via Composio/Google Calendar
- Mail: bevestiging inzender + notificatie Fariza; Supabase + RLS/OAuth

**Etappe 3 — /services** (diepe content 1300+, foto's, Service-schema, breadcrumb)

**Etappe 4 — CMS + blog** (CMS-keuze, expert-artikelen, ecosystem: e-mail+LinkedIn+Instagram)

**Etappe 5 — Concurrentie-overzicht** (Mac-vs-PC-artikelen 1300+ woorden, backlinks)

**Etappe 6 — Funnel-iteratie & live-gang** (domein theoutlier.nl → Vercel na Fariza-akkoord, Search Console, checklist volledig ✅)

## 4. Verificatie per etappe
1. graphify --update op de repo (kennisgraf actueel)
2. PRELAUNCH-CHECKLIST diff: geen rode items meer
3. Mobile check op 3 breakpoints (375/768/1440)
4. Live smoke-test: curl-status, formulier-rij in Supabase, e-mailbevestiging
5. Screenshot-review naar Seyed (Cap-achtige beelden per sectie)
6. Commit + push naar main (auto-deploy)

## 5. Open vragen (blokkeren Etappe 2+)
1. Fariza's WhatsApp-nummer voor de widget (allowlist heeft +316****5182; nummer moet volledig)
2. Call-booking: Composio Google Calendar is verbonden? (token-check nodig)
3. CMS-keuze: voorstel Payload (Next.js-native, open-source) — te bevestigen
4. Fariza-akkoord: domeinkoppeling en definitieve copy (haar naam erop)
