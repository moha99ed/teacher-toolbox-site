import { NextResponse } from "next/server";
import { insertIssueReport } from "@/app/lib/teacher-toolbox-db";

type IssuePayload = {
  type?: string;
  name?: string;
  email?: string;
  tool?: string;
  extensionVersion?: string;
  sourceMode?: string;
  pageUrl?: string;
  reproSteps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  details?: string;
  noPii?: boolean;
  honeypot?: string;
};

function clean(value: unknown, maxLen = 2000) {
  return String(value ?? "").trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IssuePayload;

    if (clean(payload.honeypot)) {
      return NextResponse.json({ ok: true });
    }

    const type = clean(payload.type, 40).toLowerCase();
    const details = clean(payload.details, 8000);
    const email = clean(payload.email, 255);

    if (!type || !["bug", "question", "feature"].includes(type)) {
      return NextResponse.json(
        { ok: false, error: "Invalid message type." },
        { status: 400 }
      );
    }

    if (!details) {
      return NextResponse.json(
        { ok: false, error: "Details are required." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    await insertIssueReport({
      type,
      name: clean(payload.name, 120) || null,
      email,
      tool: clean(payload.tool, 80) || "GradeBridge",
      extension_version: clean(payload.extensionVersion, 60) || null,
      source_mode: clean(payload.sourceMode, 60) || null,
      page_url: clean(payload.pageUrl, 2048) || null,
      repro_steps: clean(payload.reproSteps, 8000) || null,
      expected_behavior: clean(payload.expectedBehavior, 8000) || null,
      actual_behavior: clean(payload.actualBehavior, 8000) || null,
      details,
      no_pii_confirmed: Boolean(payload.noPii),
      status: "new",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[teacher-toolbox/issues] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit report right now." },
      { status: 500 }
    );
  }
}
