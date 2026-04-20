"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  lang: z.enum(["en", "fr"]).default("en"),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL!;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL!;

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    lang: formData.get("lang") ?? "en",
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const { name, email, message, lang } = parsed.data;

  try {
    // 1 — Notification to you
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} — Bly Analytics`,
      html: notificationHtml({ name, email, message }),
    });

    // 2 — Auto-reply to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject:
        lang === "fr"
          ? "Message reçu — Bly Analytics"
          : "Got your message — Bly Analytics",
      html: autoReplyHtml({ name, lang }),
    });

    return { status: "success" };
  } catch (err) {
    console.error("[contact action]", err);
    return {
      status: "error",
      message:
        lang === "fr"
          ? "Une erreur s'est produite. Réessayez ou écrivez directement à contact@blyanalytics.com"
          : "Something went wrong. Try again or email contact@blyanalytics.com directly.",
    };
  }
}

/* ── Email templates ── */

function notificationHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0b0b0b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:6px;overflow:hidden;">
        <tr>
          <td style="padding:32px 36px 24px;border-bottom:1px solid #1e1e1e;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4f72ff;">bly.dj</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#ddd8ce;letter-spacing:-0.02em;">New message from ${escHtml(name)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:20px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#444;">From</p>
                  <p style="margin:0;font-size:14px;color:#ddd8ce;">${escHtml(name)}</p>
                  <p style="margin:2px 0 0;font-size:13px;color:#4f72ff;">${escHtml(email)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-top:20px;border-top:1px solid #1e1e1e;">
                  <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#444;">Message</p>
                  <p style="margin:0;font-size:14px;color:#aaa;line-height:1.8;white-space:pre-wrap;">${escHtml(message)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #1e1e1e;">
            <a href="mailto:${escHtml(email)}" style="display:inline-block;font-size:12px;font-weight:600;color:#4f72ff;text-decoration:none;border:1px solid #4f72ff;border-radius:4px;padding:8px 16px;">
              Reply to ${escHtml(name)}
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyHtml({ name, lang }: { name: string; lang: string }) {
  const isFr = lang === "fr";
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0b0b0b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:6px;overflow:hidden;">
        <tr>
          <td style="padding:40px 36px 32px;">
            <p style="margin:0 0 24px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4f72ff;">bly.dj</p>
            <h1 style="margin:0 0 16px;font-size:26px;font-weight:400;color:#ddd8ce;letter-spacing:-0.025em;line-height:1.2;">
              ${isFr ? `Bonjour ${escHtml(name)},` : `Hey ${escHtml(name)},`}
            </h1>
            <p style="margin:0 0 14px;font-size:15px;color:#888;line-height:1.8;">
              ${
                isFr
                  ? "Nous avons bien reçu votre message et nous vous répondrons dans les 24 heures."
                  : "Got your message. We'll get back to you within 24 hours."
              }
            </p>
            <p style="margin:0;font-size:15px;color:#888;line-height:1.8;">
              ${
                isFr
                  ? "En attendant, si votre demande est urgente, écrivez-nous directement à <a href='mailto:hello@bly.dj' style='color:#4f72ff;text-decoration:none;'>hello@bly.dj</a>."
                  : "In the meantime, if it's urgent, you can reach us directly at <a href='mailto:hello@bly.dj' style='color:#4f72ff;text-decoration:none;'>hello@bly.dj</a>."
              }
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 36px;border-top:1px solid #1e1e1e;">
            <p style="margin:0;font-size:13px;color:#444;">— The Bly team</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
