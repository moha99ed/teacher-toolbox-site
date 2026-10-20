import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./marketing.module.css";
import { Faq, FaqEntry, InstallButton, JsonLd, SiteFooter, SiteNav, faqJsonLd } from "./site-chrome";
import { CHROME_STORE_URL, SITE_NAME, SITE_URL } from "../site";

// Steps that read the same on every platform guide.
export const COMMON_STEPS = {
  install: {
    title: "Install GradeBridge",
    body: (
      <>
        Add GradeBridge from the{" "}
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, pin it
        to your toolbar, and sign in with your Google account.
      </>
    ),
  },
  openPowerSchool: {
    title: "Open the same assignment in PowerSchool",
    body: "In your PowerSchool gradebook, open the class and go to the score-entry page for the matching assignment.",
  },
  spotCheck: {
    title: "Spot-check and save",
    body: "Look over the scores in PowerSchool, enter any flagged students by hand, and save as you normally would.",
  },
};

export function ShortcutKeys() {
  return (
    <>
      <span className={styles.kbd}>Ctrl+Shift+G</span> (<span className={styles.kbd}>⌘+Shift+G</span> on Mac)
    </>
  );
}

export const POWERSCHOOL_KEYPAD_TIP = {
  label: "“Could not find the PowerSchool score keypad”:",
  body: "open the assignment's score-entry page in PowerSchool before clicking Paste.",
};

type DemoRow = { name: string; status: "ok" | "late" | "missing" | "unmatched"; score: string };

export type PlatformGuideContent = {
  path: string;
  platform: string;
  title: string;
  description: string;
  shareDescription: string;
  intro: ReactNode;
  demoLabel: string;
  demoRows: DemoRow[];
  why: ReactNode;
  steps: { title: string; body: ReactNode }[];
  carriesOver: { title: string; body: string }[];
  troubleshooting: { label: string; body: ReactNode }[];
  faq: FaqEntry[];
  closing: string;
};

const STATUS_TAG: Record<DemoRow["status"], { label: string; className: string }> = {
  ok: { label: "Matched", className: styles.tagOk },
  late: { label: "Late", className: styles.tagLate },
  missing: { label: "Missing", className: styles.tagMissing },
  unmatched: { label: "Not matched", className: styles.tagLate },
};

export function platformGuideMetadata(content: PlatformGuideContent): Metadata {
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: content.path },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: content.title,
      description: content.shareDescription,
      url: content.path,
    },
  };
}

export function PlatformGuide({ content }: { content: PlatformGuideContent }) {
  const crumbLabel = `${content.platform} to PowerSchool`;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: crumbLabel, item: `${SITE_URL}${content.path}` },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqJsonLd(content.faq)} />
      <SiteNav />

      <main className={styles.main}>
        <p className={styles.crumbs}>
          <a href="/">GradeBridge</a> / {crumbLabel}
        </p>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>Guide</span>
            <h1 className={styles.h1}>
              Transfer {content.platform} grades to <em>PowerSchool</em>
            </h1>
            <p className={styles.heroDesc}>{content.intro}</p>
            <div className={styles.ctas}>
              <InstallButton />
              <a href="#steps" className={styles.btnOutlined}>Jump to the steps</a>
            </div>
            <p className={styles.trustLine}>🔒 10 free pastes · Grades never leave your browser</p>
          </div>

          <figure
            className={styles.demo}
            aria-label={`Example of ${content.platform} grades pasted into PowerSchool`}
          >
            <div className={styles.demoBar}>
              <span>{content.demoLabel}</span>
              <span className={styles.demoArrow}>→</span>
              <span>PowerSchool</span>
            </div>
            <table className={styles.demoTable}>
              <thead>
                <tr><th>Student</th><th>Status</th><th>Score</th></tr>
              </thead>
              <tbody>
                {content.demoRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>
                      <span className={`${styles.tag} ${STATUS_TAG[row.status].className}`}>
                        {STATUS_TAG[row.status].label}
                      </span>
                    </td>
                    <td>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <figcaption className={styles.demoCaption}>Preview shown before pasting. Sample data.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Why this takes so long by hand</h2>
          <div className={styles.prose}>{content.why}</div>
        </section>

        <section id="steps" className={styles.section}>
          <h2 className={styles.h2}>Step by step: {content.platform} to PowerSchool</h2>
          <p className={styles.lead}>The first time takes about two minutes. After that, each assignment takes seconds.</p>
          <ol className={styles.guide}>
            {content.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What carries over</h2>
          <div className={styles.features}>
            {content.carriesOver.map((item) => (
              <div key={item.title} className={styles.feature}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.callout}>
            <h2 className={styles.h2}>Troubleshooting</h2>
            {content.troubleshooting.map((item) => (
              <p key={item.label}>
                <strong>{item.label}</strong> {item.body}
              </p>
            ))}
            <p>
              Still stuck? <a href="/support#report">Report the problem</a> and include your extension
              version. Please don't include student names.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Frequently asked questions</h2>
          <Faq items={content.faq} />
        </section>

        <section className={styles.ctaBand}>
          <h2 className={styles.h2}>Paste your next {content.platform} assignment in seconds</h2>
          <p className={styles.lead}>{content.closing}</p>
          <div className={styles.ctas}>
            <InstallButton />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
