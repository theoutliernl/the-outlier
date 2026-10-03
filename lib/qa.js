// QA-inzendingen (scripts/qa-tests.sh) mogen productie niet vervuilen:
// geen database-rij, geen mail. Herkenning via het gereserveerde .test-domein
// (RFC 2606) of de header x-qa-dry-run: 1. De route geeft hetzelfde antwoord terug,
// zodat de QA-suite de echte validatie- en responsepaden test.
export function isQaSubmission(req, email) {
  if (req.headers.get("x-qa-dry-run") === "1") return true;
  return /@[^@\s]+\.test$/i.test(String(email || "").trim());
}
