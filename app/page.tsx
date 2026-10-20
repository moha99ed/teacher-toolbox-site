import type { Metadata } from "next";
import styles from "./components/marketing.module.css";
import { LegacyHashRedirect } from "./components/legacy-hash-redirect";
import { Faq, FaqEntry, InstallButton, JsonLd, SiteFooter, SiteNav, faqJsonLd } from "./components/site-chrome";
import { CHROME_STORE_URL, SITE_NAME, SITE_URL, SOURCE_PLATFORMS } from "./site";

export const metadata: Metadata = {
  title: { absolute: "GradeBridge — Copy Google Classroom Grades into PowerSchool" },
  description:
    "Stop retyping scores. GradeBridge copies grades from Google Classroom, DeltaMath, Quizizz, Schoology and more into PowerSchool in two clicks, with missing and late flags included.",
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    title: "Matches students by name",
    body: "Scores land on the right row in PowerSchool, even when the two rosters are sorted differently. Students who share a name are handled too.",
  },
  {
    title: "Flags anyone it can't match",
    body: "If a student is in one roster but not the other, GradeBridge tells you before pasting so nobody silently gets skipped.",
  },
  {
    title: "Preview before you paste",
    body: "See every score and status side by side with your PowerSchool roster, then paste when it looks right.",
  },
  {
    title: "Missing, late and exempt",
    body: "Carries over status tags like Missing and Late, plus teacher comments, without overwriting comments you've already written.",
  },
  {
    title: "Built-in grade curve",
    body: "Set a target class average and GradeBridge adjusts scores before they go into the gradebook.",
  },
  {
    title: "Auto-detects the source",
    body: "Open your assignment, press Ctrl+Shift+G (⌘+Shift+G on Mac), and GradeBridge knows which platform you're on.",
  },
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: "What does GradeBridge do?",
    a: "GradeBridge is a Chrome extension for teachers who use PowerSchool. It copies scores from Google Classroom, DeltaMath, Quizizz / Wayground, Schoology, Google Sheets, AP Classroom and Gradient, then enters them into the PowerSchool assignment score page for you, so you never retype a gradebook again.",
  },
  {
    q: "Does it work with PowerTeacher Pro?",
    a: "Yes. GradeBridge pastes into the assignment score-entry page in the PowerSchool teacher gradebook (PowerTeacher Pro), including Missing, Late, Exempt and Incomplete flags.",
  },
  {
    q: "Is it safe for student data?",
    a: "Student names and grades are processed locally in your browser and are never sent to GradeBridge servers. We only store your Google sign-in details, your plan and how many pastes you've used.",
  },
  {
    q: "Do I need my district's IT team to set it up?",
    a: "No. GradeBridge runs in your own Chrome browser and doesn't need a district integration. If your school restricts Chrome extensions, your admin can allow it from the Google Admin console. Setup steps for school IT are at gradebridge.support/schools.",
  },
  {
    q: "How much does it cost?",
    a: "Your first 10 pastes are free. After that, unlimited pastes are $5/month or $39/year. District licenses are available with volume pricing.",
  },
];

function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    downloadUrl: CHROME_STORE_URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Chrome",
    description:
      "Chrome extension that copies grades from Google Classroom and other platforms into PowerSchool.",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Monthly", price: "5", priceCurrency: "USD" },
      { "@type": "Offer", name: "Annual", price: "39", priceCurrency: "USD" },
    ],
  };
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <LegacyHashRedirect />
      <JsonLd data={softwareJsonLd()} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <SiteNav />

      <main className={styles.main}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>Chrome extension for PowerSchool teachers</span>
            <h1 className={styles.h1}>
              Move grades into PowerSchool in <em>two clicks</em>
            </h1>
            <p className={styles.heroDesc}>
              Copy scores from Google Classroom, DeltaMath, Quizizz, Schoology and more, then paste
              them straight into your PowerSchool gradebook. They're matched to the right students,
              and Missing and Late flags come along.
            </p>
            <div className={styles.ctas}>
              <InstallButton />
              <a href="#how-it-works" className={styles.btnOutlined}>See how it works</a>
            </div>
            <p className={styles.trustLine}>
              🔒 10 free pastes · Student names and grades never leave your browser
            </p>
          </div>

          <figure className={styles.demo} aria-label="Example of grades copied from Google Classroom into PowerSchool">
            <div className={styles.demoBar}>
              <span>Google Classroom</span>
              <span className={styles.demoArrow}>→</span>
              <span>PowerSchool</span>
            </div>
            <table className={styles.demoTable}>
              <thead>
                <tr><th>Student</th><th>Status</th><th>Score</th></tr>
              </thead>
              <tbody>
                <tr><td>Rivera, Ana</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Matched</span></td><td>18 / 20</td></tr>
                <tr><td>Chen, Marcus</td><td><span className={`${styles.tag} ${styles.tagLate}`}>Late</span></td><td>16 / 20</td></tr>
                <tr><td>Okafor, Jade</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Matched</span></td><td>20 / 20</td></tr>
                <tr><td>Patel, Dev</td><td><span className={`${styles.tag} ${styles.tagMissing}`}>Missing</span></td><td>—</td></tr>
              </tbody>
            </table>
            <figcaption className={styles.demoCaption}>Preview shown before pasting. Sample data.</figcaption>
          </figure>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.h2}>How it works</h2>
          <p className={styles.lead}>No spreadsheets, no CSV exports, no district integration to wait on.</p>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <h3 className={styles.stepTitle}>Copy from your platform</h3>
              <p className={styles.stepBody}>
                Open the assignment in Google Classroom (or another supported platform) and click{" "}
                <strong>Copy grades</strong> in GradeBridge.
              </p>
            </li>
            <li className={styles.step}>
              <h3 className={styles.stepTitle}>Open PowerSchool</h3>
              <p className={styles.stepBody}>
                Go to the same assignment's score-entry page in your PowerSchool gradebook.
              </p>
            </li>
            <li className={styles.step}>
              <h3 className={styles.stepTitle}>Review and paste</h3>
              <p className={styles.stepBody}>
                Check the preview, click <strong>Paste into PowerSchool</strong>, and watch every score
                fill in.
              </p>
            </li>
          </ol>
        </section>

        {/* ── Features ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Built for real gradebooks</h2>
          <p className={styles.lead}>The details that make copying grades by hand slow and error-prone.</p>
          <div className={styles.features}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.feature}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Platforms ── */}
        <section id="platforms" className={styles.section}>
          <h2 className={styles.h2}>Copy from the tools you already use</h2>
          <p className={styles.lead}>GradeBridge reads scores from these platforms and pastes them into PowerSchool.</p>
          <ul className={styles.platforms}>
            {SOURCE_PLATFORMS.map((p) => (
              <li key={p.name}>
                <a href={p.href} className={styles.platform}>{p.name} → PowerSchool guide</a>
              </li>
            ))}
          </ul>
          <p className={styles.platformsNote}>
            Using something else? <a href="/support#report">Request a platform</a> and we'll look at adding it.
          </p>
        </section>

        {/* ── Privacy ── */}
        <section className={styles.section}>
          <div className={styles.callout}>
            <h2 className={styles.h2}>Student data stays on your computer</h2>
            <p>
              GradeBridge reads grades from the page you have open and enters them into PowerSchool
              inside your own browser. Student names and grades are never uploaded to our servers.
              We only store what runs your account: your Google sign-in details, your plan and your
              paste count.
            </p>
            <p><a href="/privacy">Read the privacy policy →</a> · <a href="/schools">Information for school IT →</a></p>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Simple pricing</h2>
          <p className={styles.lead}>Try it on a real assignment before you pay anything.</p>
          <div className={styles.priceRow}>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Free</p>
              <p className={styles.priceValue}>$0</p>
              <p className={styles.priceDesc}>Your first 10 pastes, every feature included.</p>
            </div>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Premium</p>
              <p className={styles.priceValue}>$5<span>/month</span></p>
              <p className={styles.priceDesc}>
                Unlimited pastes, or $39/year (save 35%). <a href="/pricing">See plans</a>
              </p>
            </div>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Schools &amp; districts</p>
              <p className={styles.priceValue}>Volume</p>
              <p className={styles.priceDesc}>
                Licenses for a whole department or district. <a href="/schools">Learn more</a>
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Questions</h2>
          <p className={styles.lead}>
            More answers in the <a href="/support#faq">support center</a>.
          </p>
          <Faq items={FAQ_ITEMS} />
        </section>

        <section className={styles.ctaBand}>
          <h2 className={styles.h2}>Get your grading time back</h2>
          <p className={styles.lead}>Install GradeBridge and paste your next assignment in seconds.</p>
          <div className={styles.ctas}>
            <InstallButton />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
