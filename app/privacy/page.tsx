import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — GradeBridge",
  description:
    "How GradeBridge handles your data. Student grades stay in your browser and are never sent to our servers.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>GradeBridge · Effective October 3, 2026 · Teacher Tool Box LLC</p>
        </div>

        <div className={styles.intro}>
          GradeBridge is a Chrome extension that copies grades from platforms
          such as Google Classroom, DeltaMath, Wayground, Schoology, AP
          Classroom, Gradient and Google Sheets and pastes them into the
          PowerSchool gradebook. This policy explains what information
          GradeBridge handles, why, and who it is shared with.
        </div>

        <Section n="1" title="Student data stays in your browser">
          <p>
            GradeBridge was built with FERPA in mind. Copying and pasting
            grades happens entirely inside your own Chrome browser. Student
            names, grades and comments are <strong>never</strong> sent to
            GradeBridge's servers or to anyone else.
          </p>
          <ul>
            <li>
              When you click <strong>Copy grades</strong>, GradeBridge reads
              the grades on the page you are viewing and saves them in your
              browser's local extension storage on your computer.
            </li>
            <li>
              When you click <strong>Paste grades</strong>, it reads them from
              that same local storage and enters them into PowerSchool for you.
            </li>
            <li>
              Saved grades are replaced each time you copy again, and are
              deleted if you remove the extension.
            </li>
            <li>
              GradeBridge can only read a page after you click it on that page
              (its toolbar button, or its right-click menu in Google Sheets).
              Chrome enforces this; GradeBridge does not run in the background
              on your sites.
            </li>
            <li>
              If you choose Clipboard as the paste source, GradeBridge reads
              your clipboard once, when you click Paste grades, and only after
              you grant Chrome's clipboard permission. Clipboard contents stay
              in your browser.
            </li>
          </ul>
        </Section>

        <Section n="2" title="Information we collect">
          <p>
            To run your account, GradeBridge stores information about you, the
            teacher:
          </p>
          <ul>
            <li>
              Your Google account email address, name and account ID, received
              from Google sign-in.
            </li>
            <li>
              Your plan status and the number of pastes you have made (a count
              only, never what was pasted).
            </li>
          </ul>
          <p>
            If you use <strong>Report a problem</strong> or{" "}
            <strong>Request a feature</strong>, we also receive:
          </p>
          <ul>
            <li>The message you type.</li>
            <li>
              Technical details: the GradeBridge and Chrome versions, the last
              error message, the name of the website you were on, the platform
              you last copied from, and how many students were in that copy.
            </li>
            <li>
              If you choose to include it, a page layout: the structure of the
              page with all names, grades and other text removed.
            </li>
          </ul>
          <p>Please do not type student names or grades into a report.</p>
        </Section>

        <Section n="3" title="How we use it">
          <p>
            We use this information only to provide and improve GradeBridge:
          </p>
          <ul>
            <li>To sign you in and keep your account and plan working.</li>
            <li>
              To answer your problem reports and feature requests, and to add
              support for new platforms.
            </li>
            <li>
              To understand overall usage, such as how often grades are pasted.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> sell your information, use it for
            advertising, or use it to determine creditworthiness or for
            lending.
          </p>
        </Section>

        <Section n="4" title="Google user data">
          <p>
            GradeBridge uses Google sign-in only to read your email address,
            name and Google account ID. Its use of information received from
            Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome Web Store User Data Policy
            </a>
            , including the <strong>Limited Use</strong> requirements. We do
            not access your Gmail, Google Drive or other Google account
            content.
          </p>
        </Section>

        <Section n="5" title="Who we share it with">
          <p>
            We share information only with service providers that help us run
            GradeBridge, and only for that purpose:
          </p>
          <ul>
            <li>
              <strong>Google</strong>, for sign-in.
            </li>
            <li>
              <strong>Supabase</strong>, which hosts our account database.
            </li>
            <li>
              <strong>Resend</strong>, which delivers report emails to our
              support inbox.
            </li>
          </ul>
          <p>
            We may also disclose information if required by law. Like most web
            services, our providers may keep standard server logs, such as IP
            addresses, for security and reliability. We do not use them to
            track you.
          </p>
        </Section>

        <Section n="6" title="How long we keep it">
          <p>
            We keep your account information while you use GradeBridge. Problem
            reports and feature requests are kept as long as needed to resolve
            them and improve the extension. You can ask us to delete your
            account information and reports at any time, and we will do so.
          </p>
        </Section>

        <Section n="7" title="Security">
          <p>
            Information sent between GradeBridge and our servers travels over
            encrypted HTTPS connections. Access to our account database is
            limited to the GradeBridge team.
          </p>
        </Section>

        <Section n="8" title="For schools and districts">
          <p>
            Because student records stay on the teacher's computer, GradeBridge
            does not collect, store or transmit education records. Each district
            makes its own decisions about the tools its staff use. If your
            district needs more information to review GradeBridge, we are happy
            to help.
          </p>
        </Section>

        <Section n="9" title="Children">
          <p>
            GradeBridge is a tool for teachers. It is not directed to children,
            and we do not knowingly collect information from children under 13.
          </p>
        </Section>

        <Section n="10" title="Changes to this policy">
          <p>
            If we change this policy, we will update the effective date above.
            If a change affects how we handle your information, we will explain
            it in the extension's listing or popup before it takes effect.
          </p>
        </Section>

        <Section n="11" title="Contact us">
          <p>Questions or deletion requests:</p>
          <div className={styles.contactCard}>
            <div className={styles.contactName}>Teacher Tool Box LLC</div>
            <div className={styles.contactRow}>
              <a href="mailto:gradebridgesupport@gmail.com">
                gradebridgesupport@gmail.com
              </a>
            </div>
          </div>
        </Section>
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
