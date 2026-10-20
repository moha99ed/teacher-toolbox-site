import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export async function renderOgImage({ headline, kicker }: { headline: string; kicker: string }) {
  const logo = await readFile(path.join(process.cwd(), "public/gradebridge-logo-dark.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F8F9FA",
          borderTop: "12px solid #1A73E8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={72} height={72} alt="" />
          <span style={{ fontSize: 40, fontWeight: 700, color: "#202124" }}>GradeBridge</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#1967D2", textTransform: "uppercase", letterSpacing: 2 }}>
            {kicker}
          </span>
          <span style={{ fontSize: 68, fontWeight: 700, color: "#202124", lineHeight: 1.1, maxWidth: 1000 }}>
            {headline}
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#5F6368" }}>
          Chrome extension · 10 free pastes · Grades never leave your browser
        </span>
      </div>
    ),
    OG_SIZE
  );
}
