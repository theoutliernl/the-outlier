import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ALLOWED, scoreAssessment } from "../../../../lib/scoring";
import { sendAssessmentMails } from "../../../../lib/mail";
import { isQaSubmission } from "../../../../lib/qa";

function str(v, max = 200) {
  const s = String(v ?? "").trim();
  return s ? s.slice(0, max) : null;
}
function pick(v, key) {
  return ALLOWED[key].includes(v) ? v : null;
}

export async function POST(req) {
  try {
    const ct = req.headers.get("content-type") || "";
    const body = ct.includes("application/json") ? await req.json() : Object.fromEntries((await req.formData()).entries());

    const name = str(body.name);
    const email = str(body.email);
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "incomplete" }, { status: 400 });
    }

    const answers = {
      firmType: pick(body.firmType, "firmType"),
      size: pick(body.size, "size"),
      friction: (Array.isArray(body.friction) ? body.friction : String(body.friction || "").split(","))
        .map((x) => String(x).trim())
        .filter((x) => ALLOWED.friction.includes(x))
        .slice(0, 3),
      hours: pick(body.hours, "hours"),
      tooling: pick(body.tooling, "tooling"),
      ambition: pick(body.ambition, "ambition"),
      role: pick(body.role, "role"),
      timing: pick(body.timing, "timing"),
    };
    const result = scoreAssessment(answers);

    if (!isQaSubmission(req, email)) {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key) return NextResponse.json({ error: "backend not configured" }, { status: 500 });

      const record = {
        // legacy columns, kept filled for existing views
        bureau_type: answers.firmType,
        bureau_size: answers.size,
        friction: answers.friction,
        tooling: answers.tooling,
        ambition: answers.ambition ? [answers.ambition] : [],
        // columns added in supabase/assessment-v2.sql
        answers,
        company: str(body.company),
        role: answers.role,
        timing: answers.timing,
        interest: str(body.interest, 60),
        profile: result.profile.key,
        name,
        email,
        phone: str(body.phone, 40),
        score: result.score,
        outcome: result.outcome,
        source: "site",
      };
      const supabase = createClient(url, key);
      const { error } = await supabase.from("assessment_submissions").insert(record);
      if (error) {
        console.error("[assessment] insert failed:", error.message);
        return NextResponse.json({ error: "storage failed" }, { status: 500 });
      }
      await sendAssessmentMails({ a: { ...record, ...answers }, result });
    }

    return NextResponse.json({ ok: true, score: result.score, outcome: result.outcome, profile: result.profile.key });
  } catch (err) {
    console.error("[assessment] unexpected:", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
