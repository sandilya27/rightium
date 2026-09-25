/**
 * Contact endpoint: validate → verify Turnstile → save to Payload → notify.
 *
 * Every enquiry is stored in the Payload `enquiries` collection (Neon
 * Postgres) first, so a lead is never lost to an email outage. Email is a
 * notification on top, sent through Resend when configured.
 *
 * Preview mode (no DATABASE_URI yet): nothing is stored; the enquiry is
 * emailed if Resend is configured, otherwise only logged.
 *
 * Secrets (optional locally, set in production):
 *   TURNSTILE_SECRET_KEY  → verifies the Cloudflare Turnstile token.
 *                           Set together with NEXT_PUBLIC_TURNSTILE_SITE_KEY.
 *   RESEND_API_KEY        → sends the team notification and client acknowledgement
 *   CONTACT_TO            → notification recipient (defaults to site.email)
 *   CONTACT_FROM          → verified sender, e.g. "Rightium <noreply@rightium.in>"
 */

import { getPayload } from "payload";
import config from "@payload-config";
import { cmsEnabled } from "@/lib/cms";
import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  deadline?: string;
  message?: string;
  page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  company_website?: string; // honeypot
  turnstileToken?: string;
};

const clip = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return bad("Malformed request.");
  }

  // Honeypot: silently accept so a bot learns nothing from the response.
  if (body.company_website) {
    return Response.json({ ok: true });
  }

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) return bad("Name is required.");
  if (!EMAIL.test(email)) return bad("A valid work email is required.");
  if (message.length < 20) return bad("Please add a little more detail.");
  if (message.length > 5000) return bad("That message is too long to send.");

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: body.turnstileToken ?? "",
        remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
      }),
    });
    const result = (await verify.json()) as { success?: boolean };
    if (!result.success) return bad("Verification failed. Please try again.", 403);
  }

  const enquiry = {
    name,
    email,
    phone: clip(body.phone, 40) || undefined,
    company: clip(body.company, 160) || undefined,
    service: clip(body.service, 200) || undefined,
    deadline: clip(body.deadline, 80) || undefined,
    message,
    status: "new" as const,
    source: {
      page: clip(body.page, 300) || undefined,
      country: request.headers.get("CF-IPCountry") ?? undefined,
      utmSource: clip(body.utm_source, 120) || undefined,
      utmMedium: clip(body.utm_medium, 120) || undefined,
      utmCampaign: clip(body.utm_campaign, 120) || undefined,
    },
  };

  if (!cmsEnabled) {
    try {
      await notify(null, enquiry);
    } catch (err) {
      console.error("[contact] preview mode: notification email failed", err);
      return bad(`We couldn't send that just now. Please email ${site.email} directly.`, 502);
    }
    return Response.json({ ok: true });
  }

  const payload = await getPayload({ config });
  let savedId: number | string | null = null;
  try {
    // The collection blocks public creates; this server route is the only way in.
    const saved = await payload.create({ collection: "enquiries", data: enquiry, overrideAccess: true });
    savedId = saved.id;
  } catch (err) {
    // Don't lose the lead: fall through and still email it, flagged as unsaved.
    payload.logger.error({ err, msg: "Failed to save enquiry; emailing it instead" });
  }

  try {
    await notify(savedId, enquiry);
  } catch (err) {
    payload.logger.error({ err, msg: "Enquiry notification email failed", id: savedId });
    // Neither stored nor emailed: tell the visitor so they can use another channel.
    if (savedId === null) {
      return bad(`We couldn't send that just now. Please email ${site.email} directly.`, 500);
    }
  }

  return Response.json({ ok: true });
}

async function notify(
  id: number | string | null,
  e: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    deadline?: string;
    message: string;
    source: { page?: string; country?: string };
  },
) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(
      id === null
        ? "[contact] enquiry received (not stored, no RESEND_API_KEY):"
        : `[contact] enquiry ${id} saved (no RESEND_API_KEY, email skipped)`,
      id === null ? { name: e.name, email: e.email, service: e.service } : "",
    );
    return;
  }

  const from = process.env.CONTACT_FROM ?? `${site.name} <noreply@${new URL(site.url).hostname}>`;
  const send = async (payload: object) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  };

  const adminLine =
    id === null
      ? "NOT SAVED to the admin — reply from this email."
      : `Open in admin: ${site.url}/admin/collections/enquiries/${id}`;

  await Promise.all([
    send({
      from,
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: e.email,
      subject: `New enquiry — ${e.service ?? "General"} — ${e.name}`,
      text: [
        `Name:     ${e.name}`,
        `Email:    ${e.email}`,
        `Phone:    ${e.phone ?? "—"}`,
        `Company:  ${e.company ?? "—"}`,
        `Service:  ${e.service ?? "Not specified"}`,
        `Deadline: ${e.deadline ?? "Not specified"}`,
        `Country:  ${e.source.country ?? "—"}`,
        `Page:     ${e.source.page ?? "—"}`,
        "",
        e.message,
        "",
        adminLine,
      ].join("\n"),
    }),
    send({
      from,
      to: [e.email],
      reply_to: site.email,
      subject: `We've received your enquiry — ${site.name}`,
      text: [
        `Hi ${e.name.split(" ")[0]},`,
        "",
        `Thanks for getting in touch with ${site.name}. Your brief has reached our team and we will come back to you within one working day with a scope, a price and a date.`,
        "",
        `If it's urgent, call us on ${site.phone} (${site.hours.label}) or reply to this email.`,
        "",
        `— The ${site.name} team`,
        site.url,
      ].join("\n"),
    }),
  ]);
}
