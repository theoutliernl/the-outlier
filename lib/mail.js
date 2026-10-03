// Mail route with an environment switch.
// MAIL_ENABLED=1 → verzend via SMTP (SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_FROM).
// otherwise (default) -> only console.log of the full message.
// Never enable mail to third parties without Fariza's approval of the templates.
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
  return process.env.NOTIFY_EMAIL || "fariza@theoutlier.nl";
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
    `New enquiry: ${name}`,
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\n\n${message}`
  );
  const confirm = await send(
    email,
    "Thank you for your message | The Outlier",
    `Hi ${name},\n\nThank you for your message. We reply within one business day.\n\nThe Outlier\nAmsterdam, NL · hello@theoutlier.nl\n\n---\nYour message:\n${message}`
  );
  return { notify, confirm };
}

export async function sendAssessmentMails({ a, result }) {
  const body =
    `Name: ${a.name}\nEmail: ${a.email}\nFirm: ${a.company || "-"}\nPhone: ${a.phone || "-"}\n\n` +
    `Firm type: ${a.firmType || "-"} · size: ${a.size || "-"}\n` +
    `Friction: ${(a.friction || []).join(", ") || "-"} · hours/person: ${a.hours || "-"}\n` +
    `Tooling: ${a.tooling || "-"} · ambition: ${a.ambition || "-"}\n` +
    `Role: ${a.role || "-"} · timing: ${a.timing || "-"} · interest: ${a.interest || "-"}\n\n` +
    `Profile: ${result.profile.name} · friction index ${result.score}/100 · outcome: ${result.outcome}\n` +
    result.lines.map((l) => `- ${l}`).join("\n");
  const notify = await send(notifyEmail(), `New assessment: ${a.name} (${result.profile.name}, ${result.score}/100)`, body);
  const confirm = await send(
    a.email,
    "Your friction profile | The Outlier",
    `Hi ${a.name},\n\nThank you for taking the assessment. Your profile: ${result.profile.name} (friction index ${result.score}/100).\n\n` +
      `${result.profile.summary}\n\nThree things to look at first:\n` +
      result.lines.map((l) => `- ${l}`).join("\n") +
      `\n\nThe Outlier\nAmsterdam, NL · hello@theoutlier.nl`
  );
  return { notify, confirm };
}
