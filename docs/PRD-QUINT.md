# PRD: The Outlier site, beheer en afronding door Quint

Versie 1, 3 oktober 2026. Opgesteld door de operator (Seyed via Claude). Dit document vervangt
`GOAL.md` en de oude takenstapel als werkopdracht. Lees eerst `docs/ARCHITECTURE.md` (hoe de code werkt)
en `AGENTS.md` (werkwijze). Bron van de wensen: `docs/briefing-transcript.txt` (Seyed's cap-video).

## 1. Doel

De site staat (v2, commit 82c96c8): alle pagina's uit de briefing zijn gebouwd op één designsysteem,
in het Engels, met assessment, contact, CMS, blog en vergelijking. Jouw taak: de site **afmaken met
Fariza's input**, **gezond houden** en **content laten groeien**, zonder het ontwerp te verslechteren.

Succes = elke taak hieronder op "done" met bewijs, QA 0 rood op de live reviewsite, en geen enkele
regel uit §2 geschonden.

## 2. Harde regels (altijd, ook als iets anders lijkt te vragen)

1. **Ontwerp niet opnieuw.** Gebruik de bestaande onderdelen uit `components/ui`, `components/site`,
   `components/home`. Geen nieuwe kleuren, lettertypes, schaduwen of animatiestijlen. Nieuwe kleur nodig?
   Stop en vraag Seyed.
2. **Merk:** logo alleen via `components/Brand.jsx`. Altijd "The Outlier" voluit. Goud nooit als tekstkleur
   (alleen balken, lijnen, stippen, vlakken en IER in het logo). Quint komt nooit op de site.
3. **Taal:** alle webcopy Engels, ook knoppen, meldingen en mailteksten. Met Fariza praat je Nederlands.
4. **Niets verzinnen:** geen klantcases, cijfers, reviews, logo's of quotes die Fariza niet heeft bevestigd.
   Elk feitelijk getal in een artikel heeft een bronlink die je zelf hebt geopend.
5. **Niets versturen namens Fariza** (mail, WhatsApp, LinkedIn, Instagram, nieuwsbrief) zonder haar
   expliciete akkoord op de exacte tekst. Berichten **aan Fariza zelf** mag je gewoon sturen.
6. **Database:** nooit `PAYLOAD_DB_PUSH` aanzetten. Schemawijziging = nieuw `supabase/*.sql` bestand,
   alleen `add column if not exists` / `create table if not exists`. Nooit `drop`, nooit rijen
   verwijderen zonder akkoord van Seyed.
7. **Elke pagina:** precies één `h1` (zit in `PageHero`), `metadata` met title (< 60 tekens), description
   (140-160 tekens) en `alternates.canonical`. Elke `Media` heeft een beschrijvende `alt`.
8. **Geen em-dashes** (—) in copy. Gebruik komma, dubbele punt of punt.
9. **Nieuwe npm-dependency?** Alleen als het niet met bestaande code kan, en eerst
   `python3 /root/.clark/tool-catalog/scripts/search_catalog.py "<vraag>"`. Noem het in je rapport.
10. **Domein theoutlier.nl, geld, juridische teksten publiceren:** alleen na Fariza's expliciete akkoord.

## 3. Standaardprocedure voor elke codewijziging (verplicht, in deze volgorde)

```bash
cd /workspace/outlier-site
git checkout main && git pull --ff-only origin main
git checkout -b <type>/<korte-naam>          # feat/... fix/... content/... chore/...
# ... wijziging maken ...
npx next build                                 # moet "Compiled successfully" geven
PORT=3100; ss -ltnp | grep -q ":$PORT " && PORT=3101
(npx next start -p $PORT > /tmp/outlier-start.log 2>&1 &) ; sleep 8
bash scripts/qa-tests.sh http://localhost:$PORT              # moet eindigen met "0 failed"
cd tools/qa && npm i --silent && node shot.mjs http://localhost:$PORT/<route> shots/<naam> 1440,390 1 && cd ../..
#   -> bekijk shots/<naam>-1440.png en -390.png zelf (vision). overflow moet 0px zijn, errors 0.
kill $(ss -ltnp | grep ":$PORT " | grep -o 'pid=[0-9]*' | cut -d= -f2)
git add -A && git commit -m "<type>(<scope>): <wat en waarom>"
git checkout main && git merge --ff-only <branch> && git push origin main <branch>
sleep 90 && bash scripts/qa-tests.sh                          # tegen de live reviewsite: 0 failed
cd tools/qa && node flow.mjs https://theoutlier-site.vercel.app && cd ../..   # moet "PASS" geven
```
Werk daarna `docs/OPERATOR-STATUS.md` bij (datum, commit, QA-uitslag, wat er veranderde).
Faalt een stap: herstel en begin opnieuw bij build. Nooit pushen met rode QA.
Faalt het live na de push: `git revert <commit>` + push, en meld het Seyed.

## 4. Taken

Status bijhouden in `scripts/clark-loop.json`. Type: **A** = autonoom, **F** = wacht op Fariza,
**S** = wacht op Seyed. Pak altijd eerst de A-taken; F/S-taken: vraag één keer, ga door met andere taken.

### F1. Vergelijkingsartikelen publiceren (F)
- Staan als concept in Payload: `vs-big-four`, `vs-strategy-houses`, `vs-it-integrators`
  (bron: `content/compare/*.md`).
- Stuur Fariza de drie teksten (als PDF of de Markdown) met de vraag of ze akkoord is. Vergelijkende
  reclame: alleen feiten met bron, nooit kleinerend. Verwerk haar wijzigingen in de `.md` bestanden.
- Na haar expliciete "ja": 
  `set -a; . /root/.hermes/env.d/tokens.env; set +a; python3 scripts/import-markdown.py --status published content/compare/vs-*.md`
- Done als: `/compare` toont de drie kaarten, elk artikel geeft 200, QA 0 failed.

### F2. Feiten en foto bevestigen (F)
- Laat Fariza deze waarden bevestigen of corrigeren (bestand `lib/content/site.js`):
  `stats` (~20 jaar, 14 jaar ING, 50-100 mensen, 2 weken), `founder.career` (ING 14 jaar,
  Heineken 8 maanden, Media.Monks 4 jaar, Senior Global Mobility Advisor), `founder.short`.
- Vraag een portretfoto in hoge resolutie (min. 1600px hoog). Vervang `public/founder.jpg`
  (zelfde bestandsnaam, JPG, < 400 KB na comprimeren met `sharp`).
- Done als: waarden aangepast of bevestigd, foto scherp op /about op 1440 en 390.

### F3. Prijzen bevestigen (F)
- `lib/content/services.js` toont €2.750 (scan), €12.500 / Light €7.500 (sprint), vanaf €2.750 p/m
  (partner), €1.650 (workshop). Vraag Fariza: kloppen deze, of liever "from" / "on request"?
- Done als: haar keuze staat in het bestand en op /services.

### F4. Contactadres (F)
- De site toont `hello@theoutlier.nl`. Vraag Fariza of die mailbox bestaat en wordt gelezen.
  Zo niet: zet haar gekozen adres in `contact.email` in `lib/content/site.js`.

### F5. Afspraken plannen (F, daarna A)
- Briefing: eigen boekingsagenda, liefst via Composio met haar Google Calendar.
- Stap 1 (Fariza): Google Calendar koppelen op dash.getclark.app/app/integrations, of een gratis
  Cal.com-account met haar agenda verbonden. Vraag welke ze kiest.
- Stap 2 (jij): maak een "20-minute intro call" boekingslink (Cal.com event of Google Calendar
  appointment schedule). Zet hem in Vercel:
  `npx vercel env add NEXT_PUBLIC_CAL_URL production --token $VERCEL_TOKEN` en redeploy.
- Done als: assessment-uitslag op live toont "Book a 20-minute call" en de link opent de agenda.
  Test zelf één boeking alleen als Fariza dat goedkeurt.

### F6. E-mail aanzetten (F, daarna A)
- Toon Fariza de vier teksten uit `lib/mail.js` (bevestiging + melding, voor contact en assessment).
  Na akkoord op de exacte tekst: kies samen het verzendaccount (haar Google Workspace via SMTP met
  app-wachtwoord, of een transactionele dienst). Zet `SMTP_*`, `NOTIFY_EMAIL`, `MAIL_ENABLED=1` in
  Vercel, redeploy.
- Test met een eigen adres van Fariza (niet een .test adres, die worden bewust niet gemaild).
- Done als: één echte test komt aan bij inzender en bij Fariza.

### F7. Privacyverklaring (F)
- `/privacy` is een korte, eerlijke tekst die past bij wat de site doet. Vraag Fariza of ze die wil
  laten toetsen. Wijzig alleen na haar akkoord.

### F8. Livegang op theoutlier.nl (F)
- Alleen na Fariza's expliciete akkoord en als F1 t/m F7 klaar of bewust overgeslagen zijn.
- Domein toevoegen in Vercel, DNS bij haar registrar (GoDaddy) naar Vercel, `NEXT_PUBLIC_SITE_URL=https://theoutlier.nl`,
  redeploy, Search Console verifiëren, `sitemap.xml` indienen.
- Done als: https://theoutlier.nl geeft 200 met de nieuwe site, QA tegen dat domein 0 failed.

### A1. Gezondheidscheck (A, elke ochtend)
- `bash scripts/qa-tests.sh` en `node tools/qa/flow.mjs https://theoutlier-site.vercel.app`.
- Rood? Zoek de oorzaak, herstel volgens §3, of meld Seyed in één zin wat stuk is.

### A2. Nieuw inzichtartikel (A, om de twee weken)
- Onderwerp uit Fariza's vakgebied (AI in boutique firms, systemen, compliance, transformatie).
  Kijk eerst of het nog niet bestaat (`content/articles/`).
- Schrijf `content/articles/<slug>.md` met dezelfde frontmatter als de bestaande artikelen,
  1300-1700 woorden, Engels, H2/H3, 3-6 bronlinks die je zelf opende, zachte afsluiting naar /start.
  Cover: een `public/images/px-*.jpg` die nog niet als cover gebruikt is.
- Importeer als concept: `python3 scripts/import-markdown.py --status draft content/articles/<slug>.md`
- Stuur Fariza titel, samenvatting en de tekst. Na haar "ja": opnieuw importeren met `--status published`.

### A3. Distributie per gepubliceerd artikel (A, concepten)
- Briefing: artikel → nieuwsbriefmail + LinkedIn-post + Instagram-carrousel.
- Maak `content/distribution/<slug>.md` met: LinkedIn-post (Engels, 120-200 woorden, haar stem),
  Instagram-carrousel (7 slides, max 20 woorden per slide), nieuwsbriefmail (onderwerp + 120 woorden).
- Stuur het naar Fariza ter goedkeuring. **Nooit zelf posten of versturen.**

### A4. Mobiele controle (A, wekelijks)
- `node tools/qa/shot.mjs https://theoutlier-site.vercel.app/<route> shots/<route> 390,768,1440 1`
  voor alle routes uit `PAGES` in `scripts/qa-tests.sh`. Bekijk elke screenshot.
- Repareer alleen echte fouten (overlap, afgesneden tekst, overflow) in de CSS module van het onderdeel.

### A5. Lottie-accent (A, optioneel, één keer)
- Seyed vroeg Lottie-animaties. `components/ui/LottieIcon.jsx` en `public/lottie/*.json` (goud) staan klaar.
- Plaats `bars-grow.json` klein (max 120px hoog) naast de kop van de sectie "How we work" op de homepage.
  Niet meer dan dat. Done als: speelt één keer bij in beeld komen, niet bij reduced motion, QA groen.

### S1. Oude QA-rijen opruimen (S)
- In `contact_submissions` en `assessment_submissions` staan ~31 testrijen met e-mail op `@theoutlier.test`.
  Vraag Seyed om akkoord. Daarna alleen:
  `delete from public.contact_submissions where email like '%@theoutlier.test';` en idem voor
  `assessment_submissions` en `newsletter_optins`. Meld het aantal verwijderde rijen.

## 5. Communicatie

- **Aan Fariza** (Nederlands, max 3 korte zinnen per vraag, één vraag tegelijk). Voorbeeld:
  "De drie vergelijkingsartikelen staan klaar als concept. Wil je ze lezen en laten weten of ze zo
  live mogen? Ik stuur ze hieronder als PDF."
- **Aan Seyed**: na elke afgeronde taak één regel: taak-id, wat er veranderde, commit, QA-uitslag, link.
- Verwerk geen privé-operatorgesprek in berichten aan Fariza; deel alleen projectfeiten.

## 6. Wanneer stoppen

- Alle A-taken voor vandaag gedaan en alle F/S-taken wachten op antwoord: stop en wacht.
- Twee keer dezelfde fout na herstelpoging: stop, meld Seyed de fout met het commando en de uitvoer.
- Een taak vraagt iets wat §2 verbiedt: niet doen, meld het in één zin.
