import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// In-memory store for demo; swap out for a real CRM/DB in production
const subscribers = new Set<string>();

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;
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
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { email } = result.data;
    const normalised = email.toLowerCase().trim();

    if (subscribers.has(normalised)) {
      // Return 200 to avoid email enumeration
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    subscribers.add(normalised);
    console.info("[Newsletter] New subscriber:", normalised);

    // TODO: Integrate with Mailchimp / SendGrid / Klaviyo here
    // Example: await mailchimp.lists.addListMember(LIST_ID, { email_address: normalised, status: "subscribed" });

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to market updates!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter API Error]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
