# Pre-launch checklist — theoutlier.nl

Geconsolideerd uit twee Weblyfe-checklists:
1. **On-page SEO checklist** (Tornado Masterclass "Zoekwoorden-checklist", `seo-checklist` skill) — paginaniveau.
2. **Full-site SEO audit workflow** (`ai-search-optimization/references/full-site-seo-audit-checklist.md`) — siteniveau: source audit, live check, Google AI-optimization cross-reference.

Status per item: wat er **nog ontbreekt** in de huidige code (stand 1 okt 2026, pre-launch v0.1).

## A. Site-niveau / technische SEO (full-site audit)

| # | Item | Status | Ontbreekt nog |
|---|------|--------|---------------|
| A1 | `app/layout.tsx` globale metadata (title template, description) | 🟡 gedeeltelijk | Alleen statische `title` + `description`. Geen `metadataBase`, geen `title.template`, geen keywords, geen `openGraph`/`twitter` block. |
| A2 | `robots.ts` | 🔴 afwezig | **`app/robots.ts` bestaat niet.** Geen robots.txt → crawlers hebben geen sitemap-link. |
| A3 | `sitemap.ts` | 🔴 afwezig | **`app/sitemap.ts` bestaat niet.** Geen sitemap.xml voor `/` en `/bedankt` (bedankt mag deels geëxcludeerd worden). |
| A4 | Canonical / SITE_URL | 🔴 afwezig | Geen `metadataBase`, geen canonical per pagina; risico op Vercel-preview als canoniek domein. |
| A5 | JSON-LD structured data | 🔴 afwezig | **Geen enkele `application/ld+json`**: Organization, Person (Fariza/Seyed), WebSite, WebPage, Service, BreadcrumbList, FAQPage ontbreken allemaal. |
| A6 | OG image | 🔴 afwezig | Geen `og:image` in metadata; ook opengraph-image.jsx: 1200x630 in merkkleuren met balk-logo-asset in `public/`. |
| A7 | Logo's gebruiken | 🟡 | `public/brandmark.png/.svg`, `logo-vertical.png/.svg` staan er, maar worden **nergens** gerenderd (nav + footer zijn tekstlogo "OUTLIER"). |
| A8 | FAQPage schema + FAQ-sectie | 🔴 afwezig | Geen FAQ-content en dus geen FAQPage-schema — kritiek voor AI Overviews. |
| A9 | Per-pagina metadata | 🟡 | `/bedankt` heeft geen eigen metadata (erft alleen layout-title). |
| A10 | Search Console verificatie | 🔴 onbekend | Niet verifieerbaar uit code; vóór launch regelen + sitemap indienen. |
| A11 | Inter via `next/font` | 🟡 | Font is alleen een CSS-fallback (`font-family: "Inter", system-ui`) in `globals.css`; **niet geladen via `next/font/google`** → FOUT/CLS-risico, font laadt niet gegarandeerd. |
| A12 | Live browser check (title/meta/OG/ld+json renderen, robots.txt/sitemap.xml bereikbaar) | 🔴 | Kan pas ná A2/A3/A6; opnieuw draaien vóór launch. |
| A13 | PageSpeed / Core Web Vitals | 🟢 | Nog niet gemeten. |
| A14 | Content dieper dan taglines (data, first-hand claims) | 🟡 | Hero-lead is een quote; voeg concrete resultaten/cases toe. |

## B. Paginaniveau / on-page SEO (Tornado Masterclass)

| # | Element | Status | Ontbreekt nog |
|---|---------|--------|---------------|
| B1 | Title tag met primair zoekwoord, <60 tekens | 🟡 | Titel is een tagline ("The Outlier — Corporate experience. Boutique execution") zonder zoekwoord als "AI-transformatie" / "adviesbureau". Keyword vóórop zetten. |
| B2 | Meta description met zoekwoord, 140–155 tekens + CTA | 🟡 | Beschrijving bestaat maar mist zoekwoord en CTA. |
| B3 | SEO-vriendelijke slug met zoekwoord | ✅ | `/` is prima voor de homepage. |
| B4 | Eén H1 met zoekwoord | 🟡 | Eén H1 ✅ ("Corporate experience. Boutique execution."), maar zonder zoekwoordvariant. |
| B5 | Zoekwoord in eerste alinea | 🔴 | Lead-paragraph bevat het zoekwoord niet. |
| B6 | Zoekwoord meerdere malen in body | 🔴 | Komt niet voor. |
| B7 | Zoekwoord 1× vet in eerste alinea | 🔴 | Niet aanwezig. |
| B8 | H2/H3 met zoekwoord | 🔴 | Sectie-koppen ("Waar we in duiken", "De founder") bevatten geen zoekwoord. |
| B9 | Uitgelichte afbeelding: bestandsnaam + alt met zoekwoord | 🔴 | Geen featured image op de homepage. Logo's in `public/` zijn niet in gebruik en hebben geen alt-teksten. |
| B10 | Content-afbeeldingen: bestandsnaam + alt | 🔴 | Geen content-afbeeldingen; **alt-teksten ontbreken site-breed**. |
| B11 | Breadcrumb zichtbaar met zoekwoord | 🔴 | Geen breadcrumb in de UI én geen BreadcrumbList-schema. |
| B12 | Minstens één relevante media (video/afbeelding) | 🔴 | Alleen tekst; geen media ingebed. |

## Legenda
- ✅ aanwezig en correct · 🟡 gedeeltelijk — kleine fix nodig · 🔴 afwezig — moet vóór launch

## Prioriteitsvolgorde (quick wins, impact/inspanning)
1. `app/robots.ts` + `app/sitemap.ts` (1 uur, groot technisch effect)
2. Metadata uitbreiden: `metadataBase`, OG/Twitter, OG-image genereren
3. JSON-LD: Organization + Person + WebSite (daarna Service + FAQPage)
4. Inter via `next/font/google` in `layout.jsx`
5. Logo's in `public/` daadwerkelijk renderen (nav/footer) met alt-tekst
6. Zoekwoordstrategie vaststellen (seo-keyword-strategie) en title/H1/lead/H2's herschrijven
7. FAQ-sectie (12–15 vragen) + FAQPage-schema
8. Search Console verificeren, sitemap indienen, PageSpeed-meting
