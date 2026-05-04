import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — GradeBridge",
  description:
    "How GradeBridge handles your data. Grades stay on your device. We adhere to the Google API Services Limited Use policy.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>GradeBridge · Last updated May 4, 2026</p>
        </div>

        <div className={styles.intro}>
          GradeBridge is a Chrome extension built by{" "}
          <strong>Teacher Tool Box LLC</strong> ("we", "us") that helps teachers
          transfer grades from grading platforms into PowerSchool. This policy
          explains exactly what data we access, why, and where it goes.
        </div>

        <Section n="1" title="What grade data we access">
          <p>
            When you click <strong>Copy Grades</strong>, GradeBridge reads
            grades from the active browser tab (Google Classroom, DeltaMath,
            Schoology, Wayground, Sheets, AP Classroom, or Gradient).
          </p>
          <ul>
            <li>
              Grades are held in your browser's local storage (
              <code>chrome.storage.local</code>) only long enough for you to
              paste them into PowerSchool.
            </li>
            <li>
              Grades are <strong>cleared automatically</strong> the next time
              you click Copy.
            </li>
            <li>
              Grades are <strong>never</strong> transmitted to our servers,
              never logged, and never shared with any third party.
            </li>
          </ul>
        </Section>

        <Section n="2" title="Account information we collect">
          <p>When you sign in with Google, we receive:</p>
          <ul>
            <li>
              <strong>Your name</strong> and <strong>email address</strong>{" "}
              (via the <code>userinfo.email</code> and{" "}
              <code>userinfo.profile</code> OAuth scopes)
            </li>
            <li>
              A <strong>paste counter</strong> (incremented each time you
              paste, used to enforce free-trial limits)
            </li>
          </ul>
          <p>
            This data is stored in our backend (Supabase, hosted in the U.S.)
            and is associated only with your account. We do{" "}
            <strong>not</strong> sell, rent, or share this data with
            advertisers or any third party.
          </p>
        </Section>

        <Section n="3" title="Data we do not access">
          <p>
            GradeBridge <strong>never</strong> reads your Gmail, Drive,
            Calendar, or any other Google data. The only Google scopes we use
            are <code>userinfo.email</code> and <code>userinfo.profile</code>.
          </p>
        </Section>

        <Section
          n="4"
          title="Google API Services Limited Use disclosure"
        >
          <p>
            GradeBridge's use of information received from Google APIs adheres
            to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the <strong>Limited Use</strong> requirements.
            Specifically:
          </p>
          <ul>
            <li>
              Google user data is used <strong>only</strong> to identify your
              account inside GradeBridge.
            </li>
            <li>
              Google user data is <strong>not</strong> transferred to anyone
              except as necessary to operate this app, comply with applicable
              law, or as part of a merger, acquisition, or sale of assets with
              user notice.
            </li>
            <li>
              Google user data is <strong>not</strong> used or transferred for
              serving ads, including retargeted, personalized, or
              interest-based advertising.
            </li>
            <li>
              Humans <strong>do not</strong> read Google user data unless we
              have your explicit consent, it's required for security purposes
              (e.g. investigating abuse), to comply with law, or the data is
              aggregated and used for internal operations consistent with the
              Limited Use policy.
            </li>
          </ul>
        </Section>

        <Section n="5" title="Third parties">
          <p>We use the following service providers:</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>What they receive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google (OAuth)</td>
                  <td>Sign-in</td>
                  <td>Your authentication request</td>
                </tr>
                <tr>
                  <td>Supabase</td>
                  <td>Account storage + paste counter</td>
                  <td>Your name, email, paste count</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Hosting our marketing site</td>
                  <td>Standard web request logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section n="6" title="Permissions explained">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Why we ask for it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>storage</code></td>
                  <td>Hold grades briefly in your browser between Copy and Paste</td>
                </tr>
                <tr>
                  <td><code>scripting</code>, <code>activeTab</code></td>
                  <td>Read grades from the tab you're on, only when you click Copy</td>
                </tr>
                <tr>
                  <td><code>identity</code></td>
                  <td>Sign in with your Google account</td>
                </tr>
                <tr>
                  <td><code>contextMenus</code></td>
                  <td>Add a "Copy Grades" right-click option on Google Sheets</td>
                </tr>
                <tr>
                  <td><code>clipboardRead</code> (optional)</td>
                  <td>Only requested if you choose "Paste from Clipboard"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section n="7" title="Children and student data">
          <p>
            GradeBridge is intended for use by{" "}
            <strong>teachers and school staff</strong>. We do not knowingly
            collect data from students. Grades that pass through the extension
            are not stored, indexed, or analyzed by us — they go from the
            source platform to PowerSchool through your browser, and that's
            it.
          </p>
          <p>
            If you are a school administrator with FERPA questions, please
            contact us.
          </p>
        </Section>

        <Section n="8" title="Your rights">
          <p>You can:</p>
          <ul>
            <li>
              <strong>Sign out</strong> from inside the extension at any time
              (deletes your local session)
            </li>
            <li>
              <strong>Request deletion</strong> of your account by emailing us
              — we'll remove your record from Supabase within 7 days
            </li>
          </ul>
        </Section>

        <Section n="9" title="Changes to this policy">
          <p>
            If we make material changes to this policy, we'll post the new
            version here and bump the "Last updated" date. Continued use after
            changes means you accept the updated policy.
          </p>
        </Section>

        <Section n="10" title="Contact">
          <p>Questions or requests:</p>
          <div className={styles.contactCard}>
            <div className={styles.contactName}>Teacher Tool Box LLC</div>
            <div className={styles.contactRow}>
              Email:{" "}
              <a href="mailto:gradebridgesupport@gmail.com">
                gradebridgesupport@gmail.com
              </a>
            </div>
            <div className={styles.contactRow}>
              Site:{" "}
              <a href="https://teacher-toolbox-site.vercel.app">
                teacher-toolbox-site.vercel.app
              </a>
            </div>
          </div>
        </Section>

        <p className={styles.disclaimer}>
          GradeBridge is not affiliated with, endorsed by, or sponsored by
          PowerSchool, Google, DeltaMath, Schoology, Wayground/Quizizz, Inc.,
          College Board, or Gradient. All trademarks are property of their
          respective owners.
        </p>
      </div>
    </main>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionNum}>{n}.</span> {title}
      </h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
