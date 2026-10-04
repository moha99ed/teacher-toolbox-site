import { NextResponse } from "next/server";
import {
  insertReview,
  listApprovedReviews,
} from "@/app/lib/teacher-toolbox-db";

type ReviewPayload = {
  name?: string;
  role?: string;
  tool?: string;
  rating?: number;
  body?: string;
  noPii?: boolean;
  honeypot?: string;
};

function clean(value: unknown, maxLen = 2000) {
  return String(value ?? "").trim().slice(0, maxLen);
}

export async function GET() {
  try {
    const rows = await listApprovedReviews(30);
    return NextResponse.json({ ok: true, reviews: rows });
  } catch (error) {
    console.error("[teacher-toolbox/reviews] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load reviews right now." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ReviewPayload;

    if (clean(payload.honeypot)) {
      return NextResponse.json({ ok: true });
    }

    const rating = Number(payload.rating);
    const body = clean(payload.body, 5000);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    if (!body || body.length < 12) {
      return NextResponse.json(
        { ok: false, error: "Review must be at least 12 characters." },
        { status: 400 }
      );
    }

    await insertReview({
      name: clean(payload.name, 120) || "Anonymous Teacher",
      role: clean(payload.role, 160) || null,
      tool: clean(payload.tool, 80) || "GradeBridge",
      rating,
      body,
      approved: false,
      no_pii_confirmed: Boolean(payload.noPii),
    });

    // Email notification — best-effort, review is already saved
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.REPORT_TO;
    if (apiKey && to) {
      const displayName = clean(payload.name, 120) || "Anonymous Teacher";
      const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
      const esc = (s: unknown) =>
        String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.REPORT_FROM || "GradeBridge <onboarding@resend.dev>",
          to: [to],
          subject: `New GradeBridge review ${stars} from ${displayName}`,
          html:
            `<p><b>${esc(displayName)}</b>${clean(payload.role, 160) ? ` (${esc(clean(payload.role, 160))})` : ""} left a ${rating}-star review.</p>` +
            `<p style="white-space:pre-wrap">${esc(body)}</p>` +
            `<p style="color:#999;font-size:12px">Pending moderation — approve it in Supabase to publish.</p>`,
        }),
      }).catch((err) => console.error("[reviews] Resend failed:", err));
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your review was submitted for moderation.",
    });
  } catch (error) {
    console.error("[teacher-toolbox/reviews] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit review right now." },
      { status: 500 }
    );
  }
}
