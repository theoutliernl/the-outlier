<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# The Outlier: werkwijze voor elke agent

Lees eerst `docs/FINISH-PLAN.md` (vaste regels + fasen). Kort:

1. Werk op een eigen branch (`feat/...`, `fix/...`, `chore/...`), nooit direct op `main`.
2. `npx next build` groen.
3. Start de build (`npx next start -p <vrije poort>`, check met `ss -ltnp` dat de poort vrij is)
   en draai `bash scripts/qa-tests.sh http://localhost:<poort>`: 0 rood.
   Formulier-checks zijn dry-run en schrijven niets naar Supabase en mailen niet.
4. Screenshots 375/768/1440 van elke geraakte pagina en zelf bekijken tegen de merkregels.
5. Merge naar `main` (Vercel deployt de reviewsite), daarna `bash scripts/qa-tests.sh`
   tegen de reviewsite en `docs/OPERATOR-STATUS.md` bijwerken.
6. Logo alleen via `components/Brand.jsx`. Webcopy in het Engels. Nooit `PAYLOAD_DB_PUSH` aan
   (zie `docs/INCIDENT-formuliertabellen.md`).
