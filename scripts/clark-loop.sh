#!/usr/bin/env bash
# clark-loop: self-improvement coding loop voor the-outlier
# Gebruik: bash scripts/clark-loop.sh           (voer de volgende ready-taak uit)
#          bash scripts/clark-loop.sh --status  (toon de taakstack)
set -euo pipefail
cd "$(dirname "$0")/.."

CFG="scripts/clark-loop.json"
MODE="${1:---run}"
case "$MODE" in
  --status|--run) ;;
  *) MODE="--run" ;;
esac

status() {
  python3 - "$CFG" <<'PY'
import json,sys
cfg=json.load(open(sys.argv[1]))
print("=== CLARK-LOOP STATUS ===")
for t in cfg["tasks"]:
    print(f"[{t['status']:>12}] {t['id']}: {t['wish'][:70]}")
blocked=[t for t in cfg["tasks"] if t["status"]=="blocked"]
ready=[t for t in cfg["tasks"] if t["status"]=="ready"]
print(f"\nopen: {len(ready)} ready | {len(blocked)} blocked | {len([t for t in cfg['tasks'] if t['status']=='done'])} done")
for b in blocked:
    print(f"  blocked: {b['id']} -> {b['blocker']}")
PY
}

run() {
  echo "=== CLARK-LOOP RUN ==="
  python3 - "$CFG" <<'PY'
import json,sys
cfg=json.load(open(sys.argv[1]))
ready=[t for t in cfg["tasks"] if t["status"]=="ready"]
if not ready:
    print("GEEN ready-taken. blocked:", [t["id"] for t in cfg["tasks"] if t["status"]=="blocked"])
    sys.exit(0)
print("PICK:", ready[0]["id"], "-", ready[0]["wish"][:80])
open("/tmp/clark-task.txt","w").write(ready[0]["id"])
PY
  TASK=$(cat /tmp/clark-task.txt)
  echo "EXECUTE: $TASK  (de agent bouwt, verifieert en markeert done)"
  echo "  verify-criterium: $(python3 -c "import json; c=json.load(open('$CFG')); print([t['verify'] for t in c['tasks'] if t['id']=='$TASK'][0])")"
}

run_mode="${MODE//--/}"
if [ "$run_mode" = "status" ]; then status; else run; fi
