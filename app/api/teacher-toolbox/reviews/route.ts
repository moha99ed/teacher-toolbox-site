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
