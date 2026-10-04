import type { Metadata } from "next";
import { GradeBridgeClient } from "./gradebridge-client";

export const metadata: Metadata = {
  title: "GradeBridge — Support Center",
  description:
    "Report GradeBridge issues, manage billing, browse FAQs, and submit reviews.",
};

export default function HomePage() {
  return <GradeBridgeClient />;
}
