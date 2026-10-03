# The Outlier: gecontroleerde projectstand

Operator-check: 2026-10-03 (UTC). Gedateerd bewijsrecord, geen toestemming om te publiceren of berichten te sturen.
Werkopdracht: `docs/PRD-QUINT.md`. Code: `docs/ARCHITECTURE.md`.

## Gecontroleerd
- Site v2 (commit 82c96c8 + docs/tools) op main, live op https://theoutlier-site.vercel.app.
- `npx next build` groen. `bash scripts/qa-tests.sh` tegen live: 79 passed, 0 failed.
- `tools/qa/flow.mjs` tegen live: gouden balk reageert op Book a call, assessment loopt tot uitslag.
- Screenshots 1440 en 390 van alle routes: geen horizontale overflow, geen console-fouten.
- Payload: 4 Engelse inzichtartikelen gepubliceerd; 3 vergelijkingsartikelen (vs-*) als concept;
  2 oude Nederlandse artikelen en het testartikel op concept (oude URL's sturen door naar de Engelse versies).
- Supabase: assessment_submissions kreeg additieve kolommen (answers, company, role, timing, interest, profile).

## Voor Fariza
De website is volledig vernieuwd: alle pagina's uit de briefing staan, in het Engels en in haar huisstijl.
Wat nog op haar wacht: akkoord op de vergelijkingsartikelen, feiten en foto, prijzen, agenda, e-mail en het domein.

## Nog niet gedaan
- E-mail staat uit (MAIL_ENABLED niet gezet), geen boekingslink (NEXT_PUBLIC_CAL_URL leeg).
- Domein theoutlier.nl niet gekoppeld.
- ~31 oude QA-testrijen staan nog in Supabase (taak S1).
