import type { Metadata } from "next";
import { TeacherToolboxClient } from "./teacher-toolbox-client";

export const metadata: Metadata = {
  title: "Teacher Tool Box | Feedback & Support",
  description:
    "Report GradeBridge issues, ask questions, request features, and submit reviews.",
};

export default function HomePage() {
  return <TeacherToolboxClient />;
}
