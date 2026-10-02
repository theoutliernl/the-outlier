// E-mailroute met omgevingsschakelaar.
// MAIL_ENABLED=1 → verzend via SMTP (SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_FROM).
// anders (default) → alleen console.log van het volledige bericht.
// Geen mail naar derden activeren zonder akkoord van Fariza.
import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "") === "1",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

export function mailEnabled() {
  return String(process.env.MAIL_ENABLED || "") === "1";
}

export function notifyEmail() {
  return process.env.NOTIFY_EMAIL || "fariza.sbaa@gmail.com";
}

function from() {
  return process.env.SMTP_FROM || `The Outlier <${process.env.SMTP_USER || "hello@theoutlier.nl"}>`;
}

async function send(to, subject, text) {
  if (!mailEnabled()) {
    console.log("[mail disabled] ->:", to, "| subject:", subject, "\n", text);
    return { skipped: true };
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.error("[mail enabled maar SMTP niet geconfigureerd] ->:", to, subject);
    return { error: true };
  }
  try {
    await getTransporter().sendMail({ from: from(), to, subject, text });
    return { ok: true };
  } catch (err) {
    console.error("[mail send failed]", err && err.message);
    return { error: true };
  }
}

export async function sendContactMails({ name, email, phone, message }) {
  const notify = await send(
    notifyEmail(),
    `Nieuw contactformulier: ${name}`,
    `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone || "-"}\n\n${message}`
  );
  const confirm = await send(
    email,
    "Bedankt voor je bericht — The Outlier",
    `Hoi ${name},\n\nBedankt voor je bericht. We reageren binnen één werkdag.\n\n— The Outlier\nAmsterdam, NL · hello@theoutlier.nl\n\n---\nJouw bericht:\n${message}`
  );
  return { notify, confirm };
}

export async function sendAssessmentMails({ a, result }) {
  const body = `Naam: ${a.name}\nE-mail: ${a.email}\nTelefoon: ${a.phone || "-"}\n\n` +
    `Bureau: ${a.bureauType || "-"} / ${a.bureauSize || "-"}\n` +
    `Friction: ${(a.friction || []).join(", ") || "-"}\n` +
    `Tooling: ${a.tooling || "-"}\n` +
    `Ambitie: ${(a.ambition || []).join(", ") || "-"}\n\n` +
    `Score: ${result.score}/12 — outcome: ${result.outcome}\n` +
    result.lines.map((l) => `- ${l}`).join("\n");
  const notify = await send(notifyEmail(), `Nieuwe assessment: ${a.name} (${result.score}/12)`, body);
  const confirm = await send(
    a.email,
    "Jouw profiel in één oogopslag — The Outlier",
    `Hoi ${a.name},\n\nBedankt voor de assessment. Jouw score: ${result.score}/12.\n\n` +
      result.lines.map((l) => `- ${l}`).join("\n") +
      `\n\n— The Outlier\nAmsterdam, NL · hello@theoutlier.nl`
  );
  return { notify, confirm };
}
