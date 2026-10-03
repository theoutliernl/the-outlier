<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# The Outlier: werkwijze voor elke agent

1. Werkopdracht: `docs/PRD-QUINT.md`. Hoe de code werkt + onderdelencatalogus: `docs/ARCHITECTURE.md`.
2. Elke wijziging volgt de standaardprocedure in PRD-QUINT §3: eigen branch, `npx next build`,
   `bash scripts/qa-tests.sh http://localhost:<poort>` (0 failed), screenshots met `tools/qa/shot.mjs`
   op 1440 en 390 zelf bekeken, pas dan merge naar `main`, daarna QA en `tools/qa/flow.mjs` op live.
3. Bouw met de bestaande onderdelen (`components/ui`, `components/site`, `components/home`).
   Geen nieuwe kleuren of stijlen; tokens staan in `app/globals.css`.
4. Logo alleen via `components/Brand.jsx`. Webcopy Engels. Goud nooit als tekstkleur. Geen em-dashes.
5. Nooit `PAYLOAD_DB_PUSH` aan (zie `docs/INCIDENT-formuliertabellen.md`). Schema: additief `supabase/*.sql`.
