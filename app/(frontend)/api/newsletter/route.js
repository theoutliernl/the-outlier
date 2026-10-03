import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isQaSubmission } from "../../../../lib/qa";

export async function POST(req) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim();

    if (!email.includes("@")) {
      return NextResponse.json({ error: "incomplete" }, { status: 400 });
    }

    if (isQaSubmission(req, email)) {
      return NextResponse.redirect(new URL("/bedankt?type=newsletter", req.url), 303);
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "backend not configured" }, { status: 500 });
    }

    const supabase = createClient(url, key);
    const { error } = await supabase
      .from("newsletter_optins")
      .upsert({ email, source: "footer" }, { onConflict: "email" });

    if (error) {
      return NextResponse.json({ error: "storage failed" }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/bedankt?type=newsletter", req.url), 303);
  } catch {
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}