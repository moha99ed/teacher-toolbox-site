import type { Metadata } from "next";
import styles from "../components/marketing.module.css";
import { Faq, FaqEntry, JsonLd, SiteFooter, SiteNav, faqJsonLd } from "../components/site-chrome";
import { EXTENSION_ID, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "../site";

const PATH = "/schools";
const QUOTE_HREF = "/support#report";

export const metadata: Metadata = {
  title: "For Schools & Districts: Privacy, Permissions and Deployment",
  description:
    "What GradeBridge stores, which Chrome permissions it uses, how to force-install it for teachers from the Google Admin console, and district licensing.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: "GradeBridge for Schools & Districts",
    description: "Student grades stay in the teacher's browser. Deploy to every teacher from the Google Admin console.",
    url: PATH,
  },
};

const STORAGE_ROWS: { what: string; where: string; detail: string }[] = [
  {
    what: "Student names, grades and comments",
    where: "Teacher's browser only",
    detail:
      "Read from the page the teacher has open and kept in Chrome's local extension storage on their computer. Replaced on every copy and deleted if the extension is removed. Never sent to GradeBridge or anyone else.",
  },
  {
    what: "Teacher's Google email, name and account ID",
    where: "GradeBridge account",
    detail: "Received from Google sign-in and used to run the teacher's account. GradeBridge can't access Gmail, Drive or other Google content.",
  },
  {
    what: "Plan status and paste count",
    where: "GradeBridge account",
    detail: "A count of pastes only, never what was pasted.",
  },
  {
    what: "Problem reports",
    where: "GradeBridge support",
    detail:
      "Only when a teacher sends one: their message, version and error details, and optionally the page layout with all names, grades and other text removed.",
  },
];

const PERMISSION_ROWS: { name: string; why: string }[] = [
  { name: "activeTab, scripting", why: "Read grades from, or enter grades into, the tab the teacher is on, only after they click GradeBridge on that tab. GradeBridge has no content scripts and doesn't run in the background on any site." },
  { name: "storage", why: "Keep copied grades in local extension storage between the copy and the paste." },
  { name: "identity", why: "Google sign-in, limited to the teacher's email address and basic profile." },
  { name: "contextMenus", why: "Adds GradeBridge to the right-click menu in Google Sheets." },
  { name: "clipboardRead (optional)", why: "Requested only if a teacher chooses Clipboard as the paste source. Chrome asks the teacher first." },
  { name: "Host access", why: "Only GradeBridge's own account server. No access to PowerSchool, Google or other sites beyond the tab the teacher clicks on." },
];

const SUBPROCESSORS = [
  { name: "Google", why: "Sign-in" },
  { name: "Supabase", why: "Hosts the account database" },
  { name: "Resend", why: "Delivers problem reports to the support inbox" },
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: "Is GradeBridge FERPA compliant?",
    a: "GradeBridge was built so student records stay on the teacher's computer: names, grades and comments are copied and pasted inside the teacher's own Chrome browser and are never sent to GradeBridge's servers. GradeBridge doesn't collect, store or transmit education records. Each district makes its own decisions about the tools its staff use, and we're happy to answer questions for your review.",
  },
  {
    q: "Does GradeBridge need a PowerSchool or Google Classroom integration?",
    a: "No. GradeBridge works on the pages teachers already have open in Chrome. There are no API keys, SIS credentials or district-level integrations to set up.",
  },
  {
    q: "Can we install GradeBridge for all teachers at once?",
    a: `Yes. In the Google Admin console, add extension ID ${EXTENSION_ID} to your teachers' organizational unit and set it to Force install. If your district blocks extensions by default, setting it to Allow install lets teachers add it themselves.`,
  },
  {
    q: "Does it work on Chromebooks?",
    a: "Yes. GradeBridge is a Chrome extension, so it works in Chrome on Chromebooks, Windows and Mac.",
  },
  {
    q: "What happens to data if a teacher stops using GradeBridge?",
    a: "Copied grades are deleted from the teacher's computer when the extension is removed. Teachers can ask us to delete their account information at any time.",
  },
  {
    q: "Do you offer district pricing and purchase orders?",
    a: "Yes. Volume licenses are available for schools and districts, and we can work with quotes and purchase orders. Send a request with your district details and we'll reply within one business day.",
  },
  {
    q: "Will you sign our data privacy agreement?",
    a: "Contact us with your district's agreement or security questionnaire and we'll work through it with you.",
  },
];

export default function SchoolsPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Schools & districts", item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <SiteNav />

      <main className={styles.main}>
        <p className={styles.crumbs}>
          <a href="/">GradeBridge</a> / Schools &amp; districts
        </p>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>For IT, coaches and administrators</span>
            <h1 className={styles.h1}>
              GradeBridge for <em>schools and districts</em>
            </h1>
            <p className={styles.heroDesc}>
              Everything you need to review GradeBridge: what it stores, which Chrome permissions it
              uses, how to install it for every teacher from the Google Admin console, and how
              district licensing works.
            </p>
            <div className={styles.ctas}>
              <a href={QUOTE_HREF} className={styles.btnPrimary}>Request a district quote</a>
              <a href="#deploy" className={styles.btnOutlined}>Deployment steps</a>
            </div>
            <p className={styles.trustLine}>
              🔒 Student names and grades never leave the teacher's browser
            </p>
          </div>

          <figure className={styles.demo} aria-label="Summary of where GradeBridge data lives">
            <div className={styles.demoBar}>
              <span>Where data lives</span>
            </div>
            <table className={styles.demoTable}>
              <thead>
                <tr><th>Data</th><th>Location</th></tr>
              </thead>
              <tbody>
                <tr><td>Student names</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Browser only</span></td></tr>
                <tr><td>Grades &amp; comments</td><td><span className={`${styles.tag} ${styles.tagOk}`}>Browser only</span></td></tr>
                <tr><td>Teacher email &amp; plan</td><td><span className={`${styles.tag} ${styles.tagInfo}`}>GradeBridge account</span></td></tr>
                <tr><td>Paste count</td><td><span className={`${styles.tag} ${styles.tagInfo}`}>GradeBridge account</span></td></tr>
              </tbody>
            </table>
            <figcaption className={styles.demoCaption}>Summary of the privacy policy.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What GradeBridge stores</h2>
          <p className={styles.lead}>
            Copying and pasting happens entirely inside the teacher's Chrome browser. GradeBridge
            doesn't collect, store or transmit education records.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Data</th><th>Where it lives</th><th>Details</th></tr>
              </thead>
              <tbody>
                {STORAGE_ROWS.map((row) => (
                  <tr key={row.what}>
                    <td>{row.what}</td>
                    <td data-label="Where it lives">{row.where}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className={styles.subhead}>Service providers</h3>
          <div className={styles.features}>
            {SUBPROCESSORS.map((s) => (
              <div key={s.name} className={styles.feature}>
                <h4 className={styles.featureTitle}>{s.name}</h4>
                <p className={styles.featureBody}>{s.why}</p>
              </div>
            ))}
          </div>
          <p className={styles.platformsNote}>
            GradeBridge doesn't sell data or use it for advertising. Full details are in the{" "}
            <a href="/privacy">privacy policy</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Chrome permissions</h2>
          <p className={styles.lead}>
            Every permission GradeBridge requests, and why. GradeBridge only reads a page after a
            teacher clicks it on that page; Chrome enforces this.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Permission</th><th>Why it's needed</th></tr>
              </thead>
              <tbody>
                {PERMISSION_ROWS.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="deploy" className={styles.section}>
          <h2 className={styles.h2}>Install it for every teacher</h2>
          <p className={styles.lead}>
            Use the Google Admin console to push GradeBridge to teachers' Chrome browsers, or to
            allow it if your district blocks extensions by default.
          </p>
          <p className={styles.lead}>
            Extension ID: <span className={styles.codeBox}>{EXTENSION_ID}</span>
          </p>
          <ol className={styles.guide}>
            <li>
              <h3>Open Chrome app settings</h3>
              <p>
                In the Google Admin console, go to <strong>Devices → Chrome → Apps &amp; extensions →
                Users &amp; browsers</strong>.
              </p>
            </li>
            <li>
              <h3>Choose who gets it</h3>
              <p>Select the organizational unit for your teachers. Students don't need GradeBridge.</p>
            </li>
            <li>
              <h3>Add GradeBridge</h3>
              <p>
                Click the add button, choose <strong>Add Chrome app or extension by ID</strong>, paste the
                extension ID above, and choose <strong>From the Chrome Web Store</strong>.
              </p>
            </li>
            <li>
              <h3>Set the installation policy</h3>
              <p>
                Choose <strong>Force install</strong> (or <strong>Force install + pin to browser
                toolbar</strong>) to add it for every teacher, or <strong>Allow install</strong> to let
                teachers add it themselves. Save your changes.
              </p>
            </li>
            <li>
              <h3>Let teachers know</h3>
              <p>
                Policy changes can take a little while to reach teachers' browsers. Point teachers to
                the <a href="/#platforms">platform guides</a> to get started.
              </p>
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Licensing</h2>
          <div className={styles.priceRow}>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Free trial</p>
              <p className={styles.priceValue}>10 pastes</p>
              <p className={styles.priceDesc}>Every teacher can try GradeBridge on real assignments first.</p>
            </div>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Individual teachers</p>
              <p className={styles.priceValue}>$5<span>/month</span></p>
              <p className={styles.priceDesc}>
                Or $39/year. <a href="/pricing">See plans</a>
              </p>
            </div>
            <div className={styles.priceCard}>
              <p className={styles.priceName}>Schools &amp; districts</p>
              <p className={styles.priceValue}>Volume</p>
              <p className={styles.priceDesc}>
                Quotes and purchase orders welcome. <a href={QUOTE_HREF}>Request a quote</a>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Questions from IT and administrators</h2>
          <Faq items={FAQ_ITEMS} />
        </section>

        <section className={styles.ctaBand}>
          <h2 className={styles.h2}>Reviewing GradeBridge for your district?</h2>
          <p className={styles.lead}>
            Send your questions, data privacy agreement or quote request, and we'll reply within one
            business day. You can also email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
          <div className={styles.ctas}>
            <a href={QUOTE_HREF} className={styles.btnPrimary}>Contact us</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
