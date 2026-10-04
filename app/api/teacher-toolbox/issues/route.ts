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

    // Email notification — best-effort, report is already saved
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.REPORT_TO;
    if (apiKey && to) {
      const name = clean(payload.name, 120) || email;
      const esc = (s: unknown) =>
        String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const typeLabel = type === "feature" ? "Feature request" : type === "question" ? "Question" : "Bug report";
      const subject = `GradeBridge ${typeLabel} from ${email}` +
        (details ? ` — ${details.slice(0, 60)}` : "");
      const rows = [
        ["type", type],
        ["version", clean(payload.extensionVersion, 60)],
        ["source", clean(payload.sourceMode, 60)],
        ["page", clean(payload.pageUrl, 200)],
      ]
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${k}</td><td>${esc(v)}</td></tr>`)
        .join("");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.REPORT_FROM || "GradeBridge <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          html:
            `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt; submitted a ${typeLabel.toLowerCase()}.</p>` +
            `<p style="white-space:pre-wrap">${esc(details)}</p>` +
            (clean(payload.reproSteps, 8000) ? `<p><b>Steps to reproduce:</b><br>${esc(clean(payload.reproSteps, 8000))}</p>` : "") +
            (clean(payload.expectedBehavior, 8000) ? `<p><b>Expected:</b><br>${esc(clean(payload.expectedBehavior, 8000))}</p>` : "") +
            (clean(payload.actualBehavior, 8000) ? `<p><b>Actual:</b><br>${esc(clean(payload.actualBehavior, 8000))}</p>` : "") +
            (rows ? `<table style="font:13px monospace">${rows}</table>` : "") +
            `<p style="color:#999;font-size:12px">Reply to this email to respond to the teacher.</p>`,
        }),
      }).catch((err) => console.error("[issues] Resend failed:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[teacher-toolbox/issues] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit report right now." },
      { status: 500 }
    );
  }
}
