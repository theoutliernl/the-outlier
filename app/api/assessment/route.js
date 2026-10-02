import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scoreAssessment } from "../../../lib/scoring";
import { sendAssessmentMails } from "../../../lib/mail";

function str(v, max = 200) {
  const s = String(v || "").trim();
  return s ? s.slice(0, max) : null;
}

function arr(v, allowed) {
  const list = Array.isArray(v) ? v : String(v || "").split(",");
  return list.map((x) => String(x).trim()).filter((x) => allowed.includes(x));
}

export async function POST(req) {
  try {
    let body;
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    }

    const name = str(body.name);
    const email = str(body.email, 200);
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "incomplete" }, { status: 400 });
    }

    const record = {
      bureau_type: str(body.bureauType, 60),
      bureau_size: str(body.bureauSize, 20),
      friction: arr(body.friction, ["schrijfwerk", "offertes", "processen", "sales"]),
      tooling: str(body.tooling, 20),
      ambition: arr(body.ambition, ["groei", "marges", "professionaliseren"]),
      name,
      email,
      phone: str(body.phone, 40),
      source: "site",
    };

    const result = scoreAssessment({
      bureauSize: record.bureau_size,
      tooling: record.tooling,
      friction: record.friction,
      ambition: record.ambition,
    });
    record.score = result.score;
    record.outcome = result.outcome;

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "backend not configured" }, { status: 500 });
    }

    const supabase = createClient(url, key);
    const { error } = await supabase.from("assessment_submissions").insert(record);
    if (error) {
      console.error("[assessment insert]", error.message);
      return NextResponse.json({ error: "storage failed" }, { status: 500 });
    }

    await sendAssessmentMails({ a: record, result });

    // Form-post (html) → redirect naar /bedankt; JSON (client fetch) → JSON-response.
    if (!ct.includes("application/json")) {
      return NextResponse.redirect(new URL("/bedankt", req.url), 303);
    }
    return NextResponse.json({
      ok: true,
      score: result.score,
      outcome: result.outcome,
      lines: result.lines,
    });
  } catch {
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
