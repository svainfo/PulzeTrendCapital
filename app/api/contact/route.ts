import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Combined schema to handle both contact and partner form submissions
const contactSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3).max(100),
  message: z.string().min(20).max(2000),
  consent: z.boolean(),
  // Optional partner fields
  country: z.string().optional(),
  partnerType: z.string().optional(),
  website: z.string().optional(),
  clientsPerMonth: z.string().optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // Return null — will skip email sending in dev/missing-config environments
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: true },
  });
}

function buildEmailHtml(data: ContactPayload): string {
  const rows = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ...(data.phone ? [["Phone", data.phone]] : []),
    ...(data.country ? [["Country", data.country]] : []),
    ...(data.partnerType ? [["Partner Type", data.partnerType]] : []),
    ...(data.website ? [["Website", data.website]] : []),
    ["Subject", data.subject],
  ] as [string, string][];

  const tableRows = rows
    .map(
      ([key, val]) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#94a3b8;background:#0d2240;border-bottom:1px solid #1e3a5f;width:130px">${key}</td>
      <td style="padding:8px 12px;color:#e2e8f0;border-bottom:1px solid #1e3a5f">${val}</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Enquiry — PulzeTrend Capital</title></head>
<body style="margin:0;padding:0;background:#071A35;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:linear-gradient(135deg,#0d2240,#071A35);border:1px solid rgba(212,175,55,0.2);border-radius:16px;overflow:hidden">
      <div style="padding:24px 28px;background:linear-gradient(135deg,rgba(212,175,55,0.1),transparent);border-bottom:1px solid rgba(212,175,55,0.15)">
        <h1 style="margin:0;color:#D4AF37;font-size:20px;font-weight:700">New Enquiry — PulzeTrend Capital</h1>
        <p style="margin:4px 0 0;color:#64748b;font-size:13px">${new Date().toUTCString()}</p>
      </div>
      <div style="padding:24px 28px">
        <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden">
          <tbody>${tableRows}</tbody>
        </table>
        <div style="margin-top:20px;padding:16px;background:#0a1e36;border-left:3px solid #D4AF37;border-radius:0 8px 8px 0">
          <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</p>
          <p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.7;white-space:pre-wrap">${data.message}</p>
        </div>
      </div>
      <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.05)">
        <p style="margin:0;color:#475569;font-size:11px">This message was submitted via the PulzeTrend Capital website contact form.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Simple in-memory rate limiting (per deployment instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Parse & validate
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    if (!result.data.consent) {
      return NextResponse.json(
        { success: false, message: "Consent is required." },
        { status: 422 }
      );
    }

    const data = result.data;

    // Send email
    const transporter = createTransporter();
    const toEmail = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER;

    if (transporter && toEmail) {
      await transporter.sendMail({
        from: `"PulzeTrend Website" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: data.email,
        subject: `[PulzeTrend] ${data.subject}`,
        html: buildEmailHtml(data),
        text: `New enquiry from ${data.firstName} ${data.lastName} (${data.email})\n\nSubject: ${data.subject}\n\n${data.message}`,
      });
    } else {
      // Log to console in dev when SMTP not configured
      console.info("[Contact Form Submission]", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        subject: data.subject,
        message: data.message.slice(0, 120),
      });
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent. We'll be in touch shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
