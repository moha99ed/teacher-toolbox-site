import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GradeBridge — Copy Google Classroom Grades into PowerSchool",
    template: "%s | GradeBridge",
  },
  description:
    "GradeBridge is a Chrome extension that copies grades from Google Classroom, DeltaMath, Quizizz, Schoology and more straight into the PowerSchool gradebook.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
