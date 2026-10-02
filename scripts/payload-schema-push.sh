#!/usr/bin/env bash
# Payload-schema push (ontwikkeling / one-off). Draai alleen bewust:
# zet PAYLOAD_DB_PUSH=true en wijzig niets in de bestaande Supabase-tabellen.
set -euo pipefail
cd "$(dirname "$0")/.."
source .env.local
# DDL/batch-statements over de Supavisor session pooler (5432) — transaction pooler (6543) kan hieraan stikken.
export DATABASE_URL="${DATABASE_URL/pooler.supabase.com:6543/pooler.supabase.com:5432}"
export PAYLOAD_DB_PUSH=true
node -e "
(async()=>{
  const {getPayload}=await import('payload');
  const config=(await import('./payload.config.js')).default;
  const payload=await getPayload({config});
  await payload.destroy();
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message,e.cause&&e.cause.message);process.exit(1)})"
