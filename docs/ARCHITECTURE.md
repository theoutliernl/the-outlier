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
