# Incident: formuliertabellen weggevallen (2 okt 2026)

## Wat er gebeurde
Tijdens de Payload CMS-fundatie werd eenmalig een schema-push gedraaid. Drizzle zag
onze formuliertabellen (contact_submissions, assessment_submissions, newsletter_optins)
als "vreemde" tabellen en bood aan ze te hernoemen naar Payload-namen (users_roles e.d.).
In de interactieve bevestiging is dat doorgevoerd: de drie formuliertabellen verdwenen
uit de database en de formulier-API's gaven 500 ("storage failed").

## Impact
- contact_submissions, assessment_submissions, newsletter_optins: weg (inclusief kolommen + RLS).
- Data: op dat moment alleen QA-testrijen (we hadden eerder alle testrijen opgeruimd).
  Als er in de tussentijd een echte lead was binnengekomen, is die rij verloren.

## Herstel
- supabase/restore-form-tables.sql: drie tabellen opnieuw aangemaakt, identiek aan origineel,
  RLS aan, geen publieke policies (alleen service-role schrijft).
- QA-suite draait weer 20/20 groen (routes, content, SEO, formulieren, CMS).

## Preventie
- PAYLOAD_DB_PUSH blijft UIT op Vercel-builds (staat zo in payload.config.js).
- scripts/payload-schema-push.sh alleen draaien na expliciete controle: de drizzle-prompt
  mag NEVER "rename" van niet-Payload-tabellen bevestigen.
- qa-tests.sh draait als poortwachter: formulier-POSTs falen -> alarm.
