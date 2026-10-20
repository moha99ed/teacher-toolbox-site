import type { Metadata } from "next";
import styles from "../components/marketing.module.css";
import { Faq, FaqEntry, InstallButton, JsonLd, SiteFooter, SiteNav, faqJsonLd } from "../components/site-chrome";
import { CHROME_STORE_URL, SITE_URL } from "../site";

const PATH = "/google-classroom-to-powerschool";

export const metadata: Metadata = {
  title: "How to Transfer Google Classroom Grades to PowerSchool",
  description:
    "Step-by-step guide to moving Google Classroom grades into PowerSchool without retyping, including Missing and Late flags, with the GradeBridge Chrome extension.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: "GradeBridge",
    title: "How to Transfer Google Classroom Grades to PowerSchool",
    description: "Copy a whole assignment's scores from Google Classroom into PowerSchool in two clicks.",
    url: PATH,
  },
};

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: "Can Google Classroom sync grades to PowerSchool automatically?",
    a: "Google offers a grade export to PowerSchool, but your district administrator has to set it up and it isn't included in every Google Workspace for Education edition. If your district hasn't turned it on, GradeBridge lets you move grades yourself from your own browser, with no setup on the district side.",
  },
  {
    q: "Do Missing and Late statuses transfer from Google Classroom?",
    a: "Yes. When status tags are included, GradeBridge sets the matching Missing and Late flags in PowerSchool along with the score.",
  },
  {
    q: "What if student names don't match between Classroom and PowerSchool?",
    a: "GradeBridge matches students by name and shows a preview before pasting. Any student it can't match is flagged so you can enter that score by hand instead of having it skipped silently.",
  },
  {
    q: "Will it overwrite comments I've already written in PowerSchool?",
    a: "No. Comments copied from Classroom are only added to cells that don't already have your own comment.",
  },
  {
    q: "Is this allowed under FERPA?",
    a: "GradeBridge processes student names and grades entirely in your browser and never sends them to our servers. Check your district's policy on Chrome extensions; your admin can allow GradeBridge from the Google Admin console if extensions are restricted.",
  },
  {
    q: "How much does it cost?",
    a: "Your first 10 pastes are free. Unlimited pastes are $5/month or $39/year.",
  },
];

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "GradeBridge", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Google Classroom to PowerSchool", item: `${SITE_URL}${PATH}` },
  ],
};

export default function ClassroomToPowerSchoolPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={BREADCRUMBS} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <SiteNav />

      <main className={styles.main}>
        <p className={styles.crumbs}>
          <a href="/">GradeBridge</a> / Google Classroom to PowerSchool
        </p>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>Guide</span>
            <h1 className={styles.h1}>
              Transfer Google Classroom grades to <em>PowerSchool</em>
            </h1>
            <p className={styles.heroDesc}>
              Google Classroom and PowerSchool don't talk to each other unless your district has set up
              a sync. Here's how to move a whole assignment's scores, including Missing and Late
              flags, in about the time it takes to type one.
            </p>
            <div className={styles.ctas}>
              <InstallButton />
              <a href="#steps" className={styles.btnOutlined}>Jump to the steps</a>
            </div>
            <p className={styles.trustLine}>🔒 10 free pastes · Grades never leave your browser</p>
          </div>

          <figure className={styles.demo} aria-label="Example of a Google Classroom assignment pasted into PowerSchool">
            <div className={styles.demoBar}>
              <span>Classroom · Unit 3 Quiz</span>
              <span className={styles.demoArrow}>→</span>
              <span>PowerSchool</span>
            </div>
            <table className={styles.demoTable}>
              <thead>
                <tr><th>Student</th><th>Status</th><th>Score</th></tr>
              </thead>
              <tbody>
                <tr><td>Alvarez, Sofia</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Matched</span></td><td>47 / 50</td></tr>
                <tr><td>Brooks, Tyler</td><td><span className={`${styles.tag} ${styles.tagLate}`}>Late</span></td><td>41 / 50</td></tr>
                <tr><td>Nguyen, Linh</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Matched</span></td><td>50 / 50</td></tr>
                <tr><td>Hassan, Omar</td><td><span className={`${styles.tag} ${styles.tagMissing}`}>Missing</span></td><td>—</td></tr>
              </tbody>
            </table>
            <figcaption className={styles.demoCaption}>Preview shown before pasting. Sample data.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Why this takes so long by hand</h2>
          <div className={styles.prose}>
            <p>
              Most teachers who grade in Google Classroom still have to put the official grade in
              PowerSchool. Doing that by hand means flipping between two tabs, finding each student,
              typing each score, and remembering who was missing or late. For a class of 30 it's a
              few minutes per assignment. Across five sections and a full quarter, it adds up to hours,
              and every retyped number is a chance for a mistake.
            </p>
            <p>
              <strong>Google's built-in option:</strong> Google Classroom can export grades to
              PowerSchool, but your district administrator has to turn it on, and it isn't included in
              every Google Workspace for Education edition. If you don't see a grade export option in
              your Classroom settings, your district probably hasn't enabled it.
            </p>
            <p>
              <strong>GradeBridge</strong> is a Chrome extension that does the copy and paste for you,
              from your own browser, with nothing for IT to set up.
            </p>
          </div>
        </section>

        <section id="steps" className={styles.section}>
          <h2 className={styles.h2}>Step by step: Google Classroom to PowerSchool</h2>
          <p className={styles.lead}>The first time takes about two minutes. After that, each assignment takes seconds.</p>
          <ol className={styles.guide}>
            <li>
              <h3>Install GradeBridge</h3>
              <p>
                Add GradeBridge from the <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, pin it to your toolbar,
                and sign in with your Google account.
              </p>
            </li>
            <li>
              <h3>Open the assignment in Google Classroom</h3>
              <p>
                Go to the assignment's <strong>Student work</strong> page, or open the class's{" "}
                <strong>Grades</strong> tab.
              </p>
            </li>
            <li>
              <h3>Copy the grades</h3>
              <p>
                Click the GradeBridge icon or press <span className={styles.kbd}>Ctrl+Shift+G</span>{" "}
                (<span className={styles.kbd}>⌘+Shift+G</span> on Mac). GradeBridge detects Google
                Classroom automatically. Choose whether to include status tags and comments, then click{" "}
                <strong>Copy grades</strong>.
              </p>
            </li>
            <li>
              <h3>Open the same assignment in PowerSchool</h3>
              <p>
                In your PowerSchool gradebook, open the class and go to the score-entry page for the
                matching assignment.
              </p>
            </li>
            <li>
              <h3>Check the preview and paste</h3>
              <p>
                Open GradeBridge again. The preview shows each student's score and status, and flags
                anyone who couldn't be matched. Click <strong>Paste into PowerSchool</strong>.
              </p>
            </li>
            <li>
              <h3>Spot-check and save</h3>
              <p>
                Look over the scores in PowerSchool, enter any flagged students by hand, and save as you
                normally would.
              </p>
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What carries over</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Scores</h3>
              <p className={styles.featureBody}>Every graded student's points, matched to the right PowerSchool row by name.</p>
            </div>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Missing &amp; Late</h3>
              <p className={styles.featureBody}>Classroom's missing and turned-in-late statuses become PowerSchool flags.</p>
            </div>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Comments</h3>
              <p className={styles.featureBody}>Added only where you haven't already written your own PowerSchool comment.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.callout}>
            <h2 className={styles.h2}>Troubleshooting</h2>
            <p>
              <strong>“No grades found”:</strong> make sure you're on the assignment's Student work page
              or the class Grades tab in Classroom, then reload the page and copy again.
            </p>
            <p>
              <strong>“Could not find the PowerSchool score keypad”:</strong> open the assignment's
              score-entry page in PowerSchool before clicking Paste.
            </p>
            <p>
              Still stuck? <a href="/support#report">Report the problem</a> and include your extension
              version. Please don't include student names.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Frequently asked questions</h2>
          <Faq items={FAQ_ITEMS} />
        </section>

        <section className={styles.ctaBand}>
          <h2 className={styles.h2}>Paste your next Classroom assignment in seconds</h2>
          <p className={styles.lead}>Free for your first 10 pastes. Works with DeltaMath, Quizizz and Schoology too.</p>
          <div className={styles.ctas}>
            <InstallButton />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
