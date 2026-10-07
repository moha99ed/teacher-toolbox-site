import type { Metadata } from "next";
import styles from "./pricing.module.css";

const CHECKOUT_BASE = "https://gradebridge.lemonsqueezy.com/checkout/buy";
const MONTHLY_CHECKOUT_URL = `${CHECKOUT_BASE}/5b0afb20-ef95-4959-b421-7e93ef6a41a6?checkout[custom][plan]=monthly`;
const ANNUAL_CHECKOUT_URL = `${CHECKOUT_BASE}/d7d74b1d-5c06-49c0-b885-a4304532b810?checkout[custom][plan]=yearly`;

export const metadata: Metadata = {
  title: "GradeBridge Pricing",
  description: "Upgrade GradeBridge for unlimited grade transfers. $5/month or $39/year.",
};

export default function PricingPage() {
  return (
    <main className={styles.page}>
      {/* Ambient blobs */}
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <img src="/gradebridge-logo.png" alt="GradeBridge" className={styles.logo} />
          <h1 className={styles.title}>GradeBridge Pricing</h1>
          <p className={styles.sub}>
            Transfer grades from Google Classroom, DeltaMath, Schoology, and Quizizz
            into PowerSchool — in seconds.
          </p>
          <div className={styles.trialBadge}>10 free pastes included · Upgrade anytime</div>
        </div>

        {/* Plans */}
        <div className={styles.plans}>

          {/* Monthly */}
          <div className={styles.card}>
            <div className={styles.planName}>Monthly</div>
            <div className={styles.price}>
              <span className={styles.dollar}>$</span>5
              <span className={styles.period}>/month</span>
            </div>
            <ul className={styles.features}>
              <li>Unlimited grade pastes</li>
              <li>All platforms supported</li>
              <li>Auto-detect source</li>
              <li>Cancel anytime</li>
            </ul>
            <a
              href={MONTHLY_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Get Monthly →
            </a>
          </div>

          {/* Annual */}
          <div className={`${styles.card} ${styles.featured}`}>
            <div className={styles.bestValue}>BEST VALUE</div>
            <div className={styles.planName}>Annual</div>
            <div className={styles.price}>
              <span className={styles.dollar}>$</span>39
              <span className={styles.period}>/year</span>
            </div>
            <div className={styles.savings}>Save 35% vs monthly</div>
            <ul className={styles.features}>
              <li>Unlimited grade pastes</li>
              <li>All platforms supported</li>
              <li>Auto-detect source</li>
              <li>Priority support</li>
            </ul>
            <a
              href={ANNUAL_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Get Annual →
            </a>
          </div>

        </div>

        <p className={styles.checkoutNote}>
          Check out with the same Google email you use to sign in to the GradeBridge
          extension — your account upgrades automatically.
        </p>

        {/* FAQ */}
        <div className={styles.faq}>
          <h2 className={styles.faqTitle}>Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>What counts as a paste?</div>
              <div className={styles.faqA}>Each time you click "Paste into PowerSchool" in the extension, that's one paste. Copying grades never counts.</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Can I cancel anytime?</div>
              <div className={styles.faqA}>Yes. You can cancel from the GradeBridge popup or by contacting support. Your access continues until the end of the billing period.</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Which platforms are supported?</div>
              <div className={styles.faqA}>Google Classroom, DeltaMath, Schoology, Quizizz, and plain clipboard text.</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Is my data safe?</div>
              <div className={styles.faqA}>Grade data never leaves your browser — it's copied and pasted locally. Only your email and usage count are stored.</div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <a href="/" className={styles.backLink}>← Back to GradeBridge Support</a>
        </div>

      </div>
    </main>
  );
}
