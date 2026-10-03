import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendContactMails } from "../../../../lib/mail";
import { isQaSubmission } from "../../../../lib/qa";

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").slice(0, 200);
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim().slice(0, 40);
    const message = String(form.get("message") || "").slice(0, 4000);

    if (!name || !email.includes("@")) {
      return NextResponse.json({ error: "incomplete" }, { status: 400 });
    }

    if (isQaSubmission(req, email)) {
      return NextResponse.redirect(new URL("/bedankt", req.url), 303);
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "backend not configured" }, { status: 500 });
    }

    const supabase = createClient(url, key);
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, message, source: "site" });

    if (error) {
      return NextResponse.json({ error: "storage failed" }, { status: 500 });
    }

    // Mail alleen verzenden als MAIL_ENABLED=1; anders alleen logging (lib/mail.js).
    await sendContactMails({ name, email, phone, message });

    return NextResponse.redirect(new URL("/bedankt", req.url), 303);
  } catch {
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
