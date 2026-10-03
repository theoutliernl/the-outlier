# The Outlier: gecontroleerde projectstand

Operator-check: 2026-10-03 ~05:50 UTC. Dit is een gedateerd bewijsrecord, geen toestemming om te
publiceren of berichten te sturen. Ververs de controles voor een nieuw statusantwoord.
Werkvolgorde: `docs/FINISH-PLAN.md`. Werkwijze: `AGENTS.md`.

## Bron en daadwerkelijk gecontroleerd
- Checkout /workspace/outlier-site, branch main, commit 8f33ac6 (fase 0).
- `npx next build` groen; `bash scripts/qa-tests.sh` tegen https://theoutlier-site.vercel.app: 27 groen, 0 rood
  (routes, content, SEO, formulieren in dry-run, footer, merk, CMS-loginpagina).
- QA-formulierchecks schrijven sinds fase 0 niets meer naar Supabase (gecontroleerd: geen nieuwe
  qa@theoutlier.test-rijen na de deploy). Er staan nog 29 oude QA-rijen in contact_submissions en
  assessment_submissions en 1 in newsletter_optins.
- Blog toont 2 gepubliceerde artikelen; het testartikel staat op concept.
- Logo in nav, header, footer en OG via components/Brand.jsx; visueel gecontroleerd op desktop.

## Voor Fariza
Het logo klopt nu met haar merk (THE naast OUTLIER, alleen IER cursief) en het testartikel is offline.
De site is nog niet af: zie de fasen in docs/FINISH-PLAN.md.

## Nog niet bewezen of nog niet gedaan
- Nav, voortgangsbalk, WhatsApp-widget en footer alleen op de homepage (fase 1).
- Subpagina's en footerteksten deels Nederlands; de webcopy moet Engels (fase 1b).
- Agenda, mailverzending, compare, About/Team/Projects, ecosysteem, domein: fase 2 t/m 10.
- Mobiele screenshots van fase 0 nog niet gemaakt (alleen desktop gecontroleerd).

## Statusdiscipline
Lees projectbewijs voordat je een status geeft. Noem werk niet klaar op basis van een belofte, build of oude chat.
