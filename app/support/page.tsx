import type { Metadata } from "next";
import { GradeBridgeClient } from "../gradebridge-client";

export const metadata: Metadata = {
  title: "Support Center",
  description:
    "Report GradeBridge issues, manage billing, browse FAQs, and submit reviews.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return <GradeBridgeClient />;
}
