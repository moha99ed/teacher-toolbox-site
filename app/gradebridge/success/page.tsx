import type { Metadata } from "next";
import styles from "./success.module.css";

export const metadata: Metadata = {
  title: "Welcome to GradeBridge — Teacher Tool Box",
  description: "Your GradeBridge subscription is active. Start transferring grades now.",
};

export default function SuccessPage() {
  return (
    <main className={styles.page}>
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.checkWrap}>
            <svg className={styles.check} viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
              <path d="M15 27l8 8 14-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <img src="/gradebridge-logo.png" alt="GradeBridge" className={styles.logo} />

          <h1 className={styles.title}>You&rsquo;re all set!</h1>
          <p className={styles.sub}>
            Your GradeBridge subscription is now active. Head back to the
            extension and start transferring grades.
          </p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <span className={styles.stepText}>Click the GradeBridge icon in your Chrome toolbar</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <span className={styles.stepText}>Sign in with the same Google account you used to pay</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <span className={styles.stepText}>Copy grades from your platform, then paste into PowerSchool</span>
            </div>
          </div>

          <div className={styles.actions}>
            <a href="/" className={styles.btnSecondary}>← Teacher Tool Box</a>
          </div>
        </div>
      </div>
    </main>
  );
}
