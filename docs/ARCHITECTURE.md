# Architectuur — theoutlier.nl (theoutlier-site)

## Stack
| Onderdeel | Versie |
|---|---|
| Next.js | 16.3.6 (App Router, `.jsx`, geen TypeScript, geen Tailwind-package — styling via `globals.css` custom properties) |
| React / react-dom | 19.1.0 |
| @supabase/supabase-js | ^2.49.0 |
| Hosting | Vercel (project `theoutlier-site`) |
| Backend/DB | Supabase project `vidqebtlybyxfrcppgye` |
| Scripts | `dev`, `build`, `start` (standaard Next) |

## Mapstructuur
```
app/
  layout.jsx          RootLayout, html lang="nl", globale metadata (title/description), import globals.css
  page.jsx            Homepage: nav, hero (payoff), values (5 kaarten), services (5), founder, contact-form, footer
  bedankt/page.jsx    Bedankpagina na form-submit (link terug naar /)
  globals.css         Design tokens als CSS-variabelen (--ink/--slate/--gold/--panel/--grey) + alle layout-styling
  api/contact/route.js  POST-handler (zie data-flow)
design/tokens.js       Brand tokens uit Figma: kleuren (incl. text-ramps op Ink en Clean Slate), gradients, typografie (Inter, display 64/headline 40/body 16), logo-regels (clearance 34/27px, "IER" gold-italic, never-rules)
docs/                  Referentie-screenshots (altero-ref/) + deze docs
public/                brandmark.png/.svg, logo-vertical.png/.svg, color-palette.png (nog niet gerenderd op de site)
supabase/schema.sql    contact_submissions-tabel + RLS
graphify-out/          Knowledge graph (graph.json, graph.html, GRAPH_REPORT.md) — gegenereerd door graphify
.env.example           SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
```

## Data-flow (contactformulier)
1. `app/page.jsx` — HTML-form, `action="/api/contact" method="POST"` (server-side, geen JS-hydratatie nodig), velden `name`, `email`, `message`.
2. `app/api/contact/route.js` — `POST(req)`:
   - `req.formData()`, trim + limiet (name 200, message 4000 tekens), validatie `!name || !email.includes("@")` → 400.
   - Supabase-client met `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (fallback anon key).
   - Insert in `public.contact_submissions` (kolommen: name, email, message, source='site', status='new', created_at) → bij fout 500 "storage failed".
   - Succes: `NextResponse.redirect(new URL("/bedankt", req.url), 303)`.
3. Supabase: RLS aan, **geen publieke policies** — alleen service-role kan schrijven/lezen (service key mag nooit naar de client).

## Brand tokens
- Ink `#1F1D2B` (donker oppervlak), Clean Slate `#F3EDE1` (licht), Gold `#E0A828` (accent), Panel `#2A2740`, Grey `#5A5568`.
- Tekstramps: op Ink `#F3EDE1/#C7C3D3/#9995AB/#8A85A0`; op Clean Slate ink/`#5A5568`. Gouden gradient primitives `#F0C85A→#B8851C`.
- Typografie: Inter (display 700/64, headline 700/40, subheading 400/26, body 400/16). Payoff: "Corporate experience. Boutique execution." Logo-regel: "IER" in gold, italic; rest upright.
- In code geïmplementeerd via CSS-variabelen in `globals.css`; `design/tokens.js` is de kanonieke referentie (wordt nog nergens geïmporteerd).

## Deployment
- Vercel project `theoutlier-site`, repo `github.com/theoutliernl/theoutlier-site`, branch `main` → productie.
- Environment variables (project + lokaal `.env.local`, niet in git): `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (service-role alleen server-side via de route handler).
- Build: `next build` (standaard Vercel pipeline, Node via Vercel-oidc).

## Bekende gaten (zie docs/PRELAUNCH-CHECKLIST.md)
Geen robots.ts, geen sitemap.ts, minimale metadata (geen metadataBase/OG/OG-image), geen JSON-LD, geen FAQ, Inter niet via next/font, logo's ongebruikt, geen alt-teksten.

## v2 landing (1 okt 2026)
Components (client, motion/react): NavBar (sticky, hide bij scroll-omlaag, slide-back bij omhoog), Hero (bar-visualisatie: balkenrij + gold outlier-bar die opschiet bij hover op de assessment-CTA), Ticker (scroll-linked marquee), Understand (mega koppen + proceskaarten), Stats (count-up bij in-view), Services (accordion met prijzen), Footer (sitemap + nieuwsbrief opt-in), WhatsAppWidget (env-gated via NEXT_PUBLIC_WA_NUMBER), Progress (scroll progress).
SEO: metadataBase + OG/Twitter in layout, robots.js, sitemap.js, opengraph-image.jsx (ImageResponse 1200x630), JSON-LD: Organization/Person/WebSite (layout) en ItemList Services + FAQPage (lib/schema.js). Inter via next/font.
Stubpagina's (etappes 2-4): /services, /contact, /start, /blog. Menu-links zichtbaar.
Database: nieuwe tabel newsletter_optins (RLS). Nieuwe API: /api/newsletter (upsert op email).
Referenties: docs/altero-ref/ (patroon-analyse, geen kopie), video-transcript /tmp/capvid/transcript.txt.
Open vars: NEXT_PUBLIC_WA_NUMBER (widget verborgen tot gezet), NEXT_PUBLIC_SITE_URL (default https://theoutlier.nl).

## Etappe 2: /contact + /start + mailroute (2 okt 2026)
### Pagina's
- `/contact` (app/contact/page.jsx): adresblok (The Outlier · Amsterdam NL · hello@theoutlier.nl), server-rendered HTML-formulier (naam, e-mail, telefoon optioneel, bericht) → `POST /api/contact` → Supabase → redirect `/bedankt`. Eigen metadata + JSON-LD `ContactPage` (lib/schema.js → `jsonLdContact`).
- `/start` (app/start/page.jsx) + `components/Assessment.jsx` (client): multistep assessment in 5 stappen met motion/react stap-animaties (AnimatePresence, slide in/uit) en progress-balk:
  1. bureau-profiel (type + grootte), 2. friction (schrijfwerk / offertes-facturatie / processen / sales, multi-select), 3. gereedschap (Excel/Sheets, losse tools, één systeem), 4. ambitie (groei fte / marges / professionaliseren zonder corporate, multi-select), 5. contactgegevens (naam, e-mail, telefoon optioneel).
  - Scoring in `lib/scoring.js` (score 0–12, gedeeld client/server); server berekent opnieuw in de API.
  - Eindresultaat: insight-blok ("Uw profiel in één oogopslag") met score + één inzicht-regel per antwoord.
  - Score ≥ 6 → outcome `call`: CTA "Plan je gesprek" naar `NEXT_PUBLIC_CAL_URL` (placeholder-booking-link, env-gated). Zonder env of lage score → contactformulier-block ("we nemen contact op") geprefill met het assessment-resultaat.
### Data & API
- Supabase (etappe2.sql): `contact_submissions.phone` (text) toegevoegd; nieuwe tabel `assessment_submissions` (bureau_type, bureau_size, friction text[], tooling, ambition text[], ambition_extra, name, email, phone, score, outcome, source). RLS aan op beide, **geen publieke policies** — alleen service-role.
- `POST /api/assessment`: JSON (client fetch → JSON-response met score/outcome/lines) of form-post (→ redirect /bedankt). Validatie: naam + e-mail verplicht; friction/ambition array-normalisatie naar whitelist; phone ≤ 40 tekens.
- `POST /api/contact`: zoals voorheen + `phone` (optioneel, ≤ 40 tekens).
### Mailflow (lib/mail.js)
- Schakelaar: `MAIL_ENABLED=1` → verzend; anders (default) → `console.log` van het volledige bericht (destination, subject, body). Default staat UIT.
- Bij AAN: nodemailer + SMTP (SMTP_HOST/SMTP_PORT/SMTP_SECURE/SMTP_USER/SMTP_PASS/SMTP_FROM). `NOTIFY_EMAIL` (default fariza.sbaa@gmail.com) krijgt de notificatie; inzender krijgt een bevestiging. Mail-fouten blokkeren de insert/redirect niet (alleen logging).
- **Nog niet live geactiveerd**: e-mail naar Fariza en inzenders gaat pas aan na Fariza's akkoord (pre-launch checklist-item).
### Env-vars etappe 2 (.env.example)
MAIL_ENABLED, SMTP_HOST/PORT/SECURE/USER/PASS/FROM, NOTIFY_EMAIL, NEXT_PUBLIC_CAL_URL.

## CMS-fundatie (etappe 4, 2 okt 2026)

**Keuze: Payload CMS 3 (3.90.2) + @payloadcms/db-postgres, op het bestaande Supabase Postgres-project.**

Waarom Payload:
- Open-source (BSD-3), Next.js-native: de admin UI is een route in deze Next.js-app (app/(payload)), geen losse dienst of proxy.
- Postgres-adapter praat direct met Supabase via DATABASE_URL — dezelfde DB als contact/assessment/newsletter; geen tweede infrastructuur, geen sync-stap.
- Content-modellen (collections) zijn code in de repo; drafts/versions, RLS-polyfill-vangnet via Payload access control.

Geïnstalleerd: payload, @payloadcms/next, @payloadcms/db-postgres, @payloadcms/richtext-lexical (+ sharp, graphql, @payloadcms/translations, sass). Payload 3.73+ ondersteunt Next 16 expliciet; met 3.90.2 op Next 16.3.x is de build groen op Turbopack.

Structuur:
```
payload.config.js              buildConfig: db-postgres (DATABASE_URL), admin op /admin
collections/Users.js           auth email+wachtwoord; create alleen zolang users-leeg of admin; geen publieke signup
collections/Posts.js           title, slug (auto), excerpt, content (Lexical), coverImage (URL), author, publishedAt, _status draft/published, versions+drafts
collections/Pages.js           title, slug, content — fundatie voor concurrentie-/services-uitwerking (read: false)
app/(payload)/                 admin layout/routes + REST-API bridging (@payload-config alias via tsconfig)
app/(frontend)/                alle site-routes (homepage onaangetast qua output)
lib/blog.js                    Payload local API: getPublishedPosts / getPublishedPostBySlug
scripts/payload-schema-push.sh one-off schema-push (session pooler 5432, PAYLOAD_DB_PUSH=true)
```

Routes: /blog (ISR 60s, lege staat net), /blog/[slug] (dynamic, BlogPosting JSON-LD, canonical), sitemap.xml bevat published posts, robots.txt disallowt /admin.

Env vars (Vercel project env, production+preview): DATABASE_URL (Supabase pooler), PAYLOAD_SECRET (openssl rand -hex 24). Lokaal in .env.local (niet in git) en /root/.hermes/env.d/tokens.env. **Nooit committen.**

Ontdekte dingen tijdens de bouw (bewaard zodat niemand er weer tegenaan loopt):
1. `DATABASE_URL` in /tmp/goal_db_url.txt wees naar **aws-0-eu-west-1.pooler.supabase.com** — Supavisor accepteert dat niet ("tenant/user not found"); de juiste host is **aws-1-eu-west-1.pooler.supabase.com**. Gecorrigeerd in .env.local, tokens.env en op Vercel.
2. Schema-push (PAYLOAD_DB_PUSH=true) moet via de **session pooler (poort 5432)** — de transaction pooler (6543) hangt op de drizzle DDL-batch; en drizzle-kit vraagt interactieve rename-vragen (bestaande Supabase-tabellen), dus dit is een bewuste one-off stap, geen build-onderdeel. Payload's eigen `push`-optie staat daarom uit op Vercel (PAYLOAD_DB_PUSH wordt daar niet gezet).
3. `next/font/google` breekt de Turbopack-build in Next 16.3 ("Unknown font"); opgelost met **next/font/local** + Inter-variable-woff2 in app/(frontend)/fonts — visueel identiek.
4. De Payload admin heeft de 3.9x-layoutshape nodig: `(payload)/layout.jsx` met `RootLayout`+`handleServerFunctions` uit @payloadcms/next/layouts, en REST-routes als `REST_GET(configPromise)`-calls (handlerBuilder), niet als bare re-exports.
5. `type: "module"` is gezet in package.json: Payload's CLI kan anders de config (ESM + top-level-await dependency van richtext-lexical) niet laden op Node ≥22.
6. In Next 16 genereert `robots.js` alleen een robots.txt-route als hij op de **app-root** staat, niet binnen een route group (sitemap.js werkt wel binnen een group). app/robots.js staat daarom op de root.

Dingen die bewust (nog) anders zijn:
- `coverImage` is een URL-veld (Supabase Storage/CDN), géén Payload upload-collectie: Vercel heeft geen persistent filesystem; storage-bucket volgt later.
- `Pages` is nog niet publiek gerenderd (access.read: false) — de etappe-3-/services-rendering bepaalt straks de mapping.
- E-mailverzending blijft uit (MAIL_ENABLED), Payload-emailadapter is niet ingesteld (console-warn).
