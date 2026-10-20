import type { Metadata } from "next";
import styles from "../components/marketing.module.css";
import { InstallButton, JsonLd, SiteFooter, SiteNav } from "../components/site-chrome";
import { SITE_NAME, SITE_URL } from "../site";
import { TryDemo } from "./try-demo";

const PATH = "/try";

export const metadata: Metadata = {
  title: "Try GradeBridge Without Installing",
  description:
    "An interactive demo of GradeBridge: copy a class's grades from Google Classroom, DeltaMath or Google Sheets and watch them paste into a PowerSchool gradebook. No install, fictional data.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Try GradeBridge without installing",
    description: "Copy a class's grades and watch them paste into PowerSchool in a live demo.",
    url: PATH,
  },
};

const TAKEAWAYS = [
  {
    title: "Names are matched, not lined up",
    body: "The two lists are in different orders and “Marcus Johnson Jr.” is just “Johnson, Marcus” in PowerSchool. GradeBridge still puts every score on the right row.",
  },
  {
    title: "Nobody is skipped silently",
    body: "Sam Rivera isn't on the PowerSchool roster, so GradeBridge says so before pasting instead of guessing.",
  },
  {
    title: "Statuses come along",
    body: "Missing and Late from Classroom, or status words typed in a spreadsheet, become PowerSchool flags.",
  },
  {
    title: "Percentages get converted",
    body: "Try DeltaMath: its grades are percentages, and Custom Points turns 90% into 18 on a 20-point assignment.",
  },
];

export default function TryPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Try it", item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <SiteNav />

      <main className={styles.main}>
        <p className={styles.crumbs}>
          <a href="/">GradeBridge</a> / Try it
        </p>

        <section className={styles.section} style={{ marginTop: "1.5rem" }}>
          <span className={styles.eyebrow}>Interactive demo</span>
          <h1 className={styles.h1}>
            Try GradeBridge <em>without installing</em>
          </h1>
          <p className={styles.lead}>
            Copy a sample class's grades, switch to the PowerSchool tab, and paste. It works the way the
            extension does, using fictional students.
          </p>
          <TryDemo />
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What you just saw</h2>
          <div className={`${styles.features} ${styles.featuresTwo}`}>
            {TAKEAWAYS.map((t) => (
              <div key={t.title} className={styles.feature}>
                <h3 className={styles.featureTitle}>{t.title}</h3>
                <p className={styles.featureBody}>{t.body}</p>
              </div>
            ))}
          </div>
          <p className={styles.platformsNote}>
            Step-by-step guides for each platform are on the <a href="/#platforms">homepage</a>.
          </p>
        </section>

        <section className={styles.ctaBand}>
          <h2 className={styles.h2}>Do it with your real gradebook</h2>
          <p className={styles.lead}>Your first 10 pastes are free. Student data never leaves your browser.</p>
          <div className={styles.ctas}>
            <InstallButton />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
