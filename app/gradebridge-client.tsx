"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./gradebridge.module.css";

const SUPPORT_CHECKOUT_URL = "https://gradebridge.lemonsqueezy.com/checkout/buy/f35335e8-5cee-4b7c-a5db-8365f4232a1c";
const CHROME_STORE_URL = "https://chromewebstore.google.com/detail/olhkjgbdgjekbpkchieibbhnhmkplknd";


const SUPPORT_AMOUNTS = ["3", "5", "10", "20"] as const;
type SupportFreq = "monthly" | "once" | "annual";

type Review = {
  id: string;
  name: string | null;
  role: string | null;
  tool: string | null;
  rating: number;
  body: string;
  created_at: string;
};

const EMPTY_ISSUE_FORM = {
  type: "bug",
  name: "",
  email: "",
  tool: "GradeBridge",
  extensionVersion: "",
  sourceMode: "auto",
  pageUrl: "",
  reproSteps: "",
  expectedBehavior: "",
  actualBehavior: "",
  details: "",
  noPii: false,
  honeypot: "",
};

const EMPTY_REVIEW_FORM = {
  name: "",
  role: "",
  tool: "GradeBridge",
  rating: 5,
  body: "",
  noPii: false,
  honeypot: "",
};

const FAQ_ITEMS = [
  {
    q: "Which grade books does GradeBridge support?",
    a: "GradeBridge currently supports Google Classroom, DeltaMath, Schoology, Quizizz / Wayground, AP Classroom, Gradient, and Google Sheets. Additional integrations are on the roadmap — submit a feature request below.",
  },
  {
    q: "Is my students' data safe?",
    a: "GradeBridge processes grade data locally in your browser. No student PII is stored on our servers. Please avoid including student names or IDs in any support submissions.",
  },
  {
    q: "How do I find my extension version?",
    a: "Open Chrome and go to chrome://extensions, find GradeBridge in the list, and look for the version number displayed below the extension name.",
  },
  {
    q: "Grades aren't transferring — what should I check first?",
    a: "Ensure you're on the correct source page, the extension is enabled, and your Source Mode matches your grade book. If the problem persists, submit a bug report below with your extension version and reproduction steps.",
  },
  {
    q: "How do I update to the latest version?",
    a: "Chrome updates extensions automatically. You can force an update by going to chrome://extensions, enabling Developer mode, and clicking Update.",
  },
  {
    q: "Is GradeBridge free?",
    a: "GradeBridge includes 10 free pastes to get started. Premium plans unlock unlimited transfers. See the Billing section for details.",
  },
  {
    q: "How do I cancel or change my subscription?",
    a: "Use the Manage Subscription button in the Billing section — no need to contact support. Changes take effect at your next billing cycle.",
  },
];

function prettyDate(raw: string) {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "Recently";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className={styles.stars}>
      {"★".repeat(rating)}{"☆".repeat(Math.max(0, 5 - rating))}
    </span>
  );
}

export function GradeBridgeClient() {
  const [issueForm, setIssueForm] = useState(EMPTY_ISSUE_FORM);
  const [reviewForm, setReviewForm] = useState(EMPTY_REVIEW_FORM);

  // Support widget
  const [supportAmount, setSupportAmount] = useState<string>("5");
  const [supportCustom, setSupportCustom] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [supportFreq, setSupportFreq] = useState<SupportFreq>("monthly");

  const effectiveAmount = isCustom ? supportCustom || "?" : supportAmount;
  const freqLabel = supportFreq === "monthly" ? "/month" : supportFreq === "annual" ? "/year" : " once";

  const [issueLoading, setIssueLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [issueMessage, setIssueMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isBugReport = issueForm.type === "bug";

  const averageRating = useMemo(() => {
    if (!approvedReviews.length) return 0;
    const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / approvedReviews.length) * 10) / 10;
  }, [approvedReviews]);

  async function loadReviews() {
    setReviewsLoading(true);
    setReviewsError("");
    try {
      const res = await fetch("/api/teacher-toolbox/reviews", { method: "GET", cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not load reviews.");
      setApprovedReviews(data.reviews || []);
    } catch {
      setReviewsError("Could not load reviews right now.");
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => { loadReviews(); }, []);

  async function submitIssue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIssueLoading(true);
    setIssueMessage("");
    try {
      const res = await fetch("/api/teacher-toolbox/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueForm),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not submit.");
      setIssueMessage("Report submitted. We'll email you within 24 hours.");
      setIssueForm(EMPTY_ISSUE_FORM);
    } catch {
      setIssueMessage("Could not submit right now. Please try again.");
    } finally {
      setIssueLoading(false);
    }
  }

  async function submitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReviewLoading(true);
    setReviewMessage("");
    try {
      const res = await fetch("/api/teacher-toolbox/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not submit.");
      setReviewMessage("Thanks — your review is pending moderation.");
      setReviewForm(EMPTY_REVIEW_FORM);
    } catch {
      setReviewMessage("Could not submit right now. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#" className={styles.navBrand}>
            <img src="/gradebridge-logo.png" alt="" className={styles.navLogo} />
            GradeBridge
          </a>
          <div className={styles.navSep} />
          <div className={styles.navLinks}>
            <a href="#billing" className={styles.navLink}>Billing</a>
            <a href="#faq"     className={styles.navLink}>FAQ</a>
            <a href="#report"  className={styles.navLink}>Report</a>
            <a href="#reviews" className={styles.navLink}>Reviews</a>
          </div>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navInstall}
          >
            Add to Chrome
          </a>
        </div>
      </nav>

      <div className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <div className={styles.heroStatus}>
              <span className={styles.heroStatusDot} />
              All systems operational
            </div>

            <div className={styles.heroBrand}>
              <img src="/gradebridge-logo.png" alt="GradeBridge" className={styles.heroBrandLogo} />
              <div className={styles.heroBrandText}>
                <span className={styles.heroBrandName}>GradeBridge</span>
                <span className={styles.heroBrandSub}>Official support channel</span>
              </div>
            </div>

            <h1 className={styles.heroH1}>
              Support <em>Center</em>
            </h1>
            <p className={styles.heroDesc}>
              Report bugs, manage your subscription, get answers, and leave a
              review — all in one place.
            </p>

            <div className={styles.heroCtas}>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-5.6-2.68l2.6-4.5A3 3 0 0012 15a3 3 0 002.97-2.59l2.64 4.56A7.2 7.2 0 0112 20.2z"/>
                </svg>
                Add to Chrome — Free
              </a>
              <a href="#report" className={styles.btnOutlined}>Report an Issue</a>
              <a href="#billing" className={styles.btnOutlined}>Manage Billing</a>
            </div>
          </div>

          {/* Quick-action cards */}
          <div className={styles.quickCards}>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickCard}
            >
              <span className={styles.quickCardIcon} data-v="blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 4h14v-2H5v2z"/>
                </svg>
              </span>
              <div className={styles.quickCardText}>
                <p className={styles.quickCardTitle}>Install GradeBridge</p>
                <p className={styles.quickCardDesc}>Add the Chrome extension — free to start.</p>
              </div>
              <span className={styles.quickCardArrow}>›</span>
            </a>

            <a
              href="#report"
              className={styles.quickCard}
              onClick={() => setIssueForm((s) => ({ ...s, type: "bug" }))}
            >
              <span className={styles.quickCardIcon} data-v="red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 8h-2.81A5.985 5.985 0 0013 5.07V5a1 1 0 00-2 0v.07A5.985 5.985 0 006.81 8H4a1 1 0 000 2h1.1A6.02 6.02 0 005 12v1H4a1 1 0 000 2h1v1a6 6 0 003.22 5.34l-.93.93a1 1 0 001.42 1.42L10.58 22h2.84l1.87 1.69a1 1 0 001.42-1.42l-.93-.93A6 6 0 0019 16v-1h1a1 1 0 000-2h-1v-1c0-.7-.1-1.38-.28-2H20a1 1 0 000-2z"/>
                </svg>
              </span>
              <div className={styles.quickCardText}>
                <p className={styles.quickCardTitle}>Report a Bug</p>
                <p className={styles.quickCardDesc}>Something not working? Tell us what happened.</p>
              </div>
              <span className={styles.quickCardArrow}>›</span>
            </a>

            <a
              href="#report"
              className={styles.quickCard}
              onClick={() => setIssueForm((s) => ({ ...s, type: "feature" }))}
            >
              <span className={styles.quickCardIcon} data-v="amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                </svg>
              </span>
              <div className={styles.quickCardText}>
                <p className={styles.quickCardTitle}>Request a Feature</p>
                <p className={styles.quickCardDesc}>Suggest something for the roadmap.</p>
              </div>
              <span className={styles.quickCardArrow}>›</span>
            </a>

            <a href="#billing" className={styles.quickCard}>
              <span className={styles.quickCardIcon} data-v="green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </span>
              <div className={styles.quickCardText}>
                <p className={styles.quickCardTitle}>Billing & Payments</p>
                <p className={styles.quickCardDesc}>Manage your plan or make a payment.</p>
              </div>
              <span className={styles.quickCardArrow}>›</span>
            </a>
          </div>
        </section>

        {/* ── Billing ── */}
        <section id="billing" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Billing & Payments</h2>
            <p className={styles.sectionDesc}>Manage your GradeBridge subscription or make a one-time payment.</p>
          </div>

          <div className={styles.billingStack}>
            <div className={styles.billingCards}>
              <div className={styles.billingCard}>
                <div className={styles.billingCardHead}>
                  <span className={styles.billingIcon} data-v="blue">↺</span>
                  <p className={styles.billingCardTitle}>Manage Subscription</p>
                </div>
                <p className={styles.billingCardDesc}>
                  Update your plan, change your payment method, or cancel — any time from the LemonSqueezy customer portal.
                </p>
                <a
                  href="https://app.lemonsqueezy.com/my-orders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.billingBtn}
                >
                  Open Customer Portal →
                </a>
              </div>

              <div className={styles.billingCard}>
                <div className={styles.billingCardHead}>
                  <span className={styles.billingIcon} data-v="gold">★</span>
                  <p className={styles.billingCardTitle}>Upgrade to Premium</p>
                </div>
                <p className={styles.billingCardDesc}>
                  Unlock unlimited grade transfers with a monthly or annual GradeBridge plan.
                </p>
                <a href="/gradebridge/pricing" className={styles.billingBtn}>
                  View Plans →
                </a>
              </div>

              <div className={styles.billingCard}>
                <div className={styles.billingCardHead}>
                  <span className={styles.billingIcon} data-v="green">🏫</span>
                  <p className={styles.billingCardTitle}>District License</p>
                </div>
                <p className={styles.billingCardDesc}>
                  Need GradeBridge for your whole school or district? Contact us for volume pricing.
                </p>
                <a href="#report" className={styles.billingBtn}>
                  Contact Us →
                </a>
              </div>
            </div>

            {/* Support the developer card */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardHead}>
                <span className={styles.supportIcon}>☕</span>
                <div>
                  <p className={styles.supportCardTitle}>Support GradeBridge</p>
                  <p className={styles.supportCardSub}>
                    GradeBridge is free for early users. If it saves you time, a small contribution helps keep it maintained and growing.
                  </p>
                </div>
              </div>

              <div className={styles.supportPickers}>
                <div className={styles.supportPickerGroup}>
                  <p className={styles.supportPickerLabel}>Amount</p>
                  <div className={styles.amountRow}>
                    {SUPPORT_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`${styles.amountBtn} ${!isCustom && supportAmount === amt ? styles.amountBtnActive : ""}`}
                        onClick={() => { setSupportAmount(amt); setIsCustom(false); }}
                      >
                        ${amt}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`${styles.amountBtn} ${isCustom ? styles.amountBtnActive : ""}`}
                      onClick={() => setIsCustom(true)}
                    >
                      Other
                    </button>
                    {isCustom && (
                      <div className={styles.customAmountWrap}>
                        <span className={styles.customAmountDollar}>$</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          placeholder="Amount"
                          className={styles.customAmountInput}
                          value={supportCustom}
                          onChange={(e) => setSupportCustom(e.target.value)}
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.supportPickerGroup}>
                  <p className={styles.supportPickerLabel}>How often</p>
                  <div className={styles.freqRow}>
                    {(["monthly", "once", "annual"] as SupportFreq[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        className={`${styles.freqBtn} ${supportFreq === f ? styles.freqBtnActive : ""}`}
                        onClick={() => setSupportFreq(f)}
                      >
                        {f === "monthly" ? "Monthly" : f === "once" ? "One-time" : "Annual"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={SUPPORT_CHECKOUT_URL}
                className={styles.supportCtaBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                ☕ Support with ${effectiveAmount}{freqLabel} →
              </a>
            </div>
          </div>

          <p className={styles.billingNote}>
            Need a quote or purchase order?{" "}
            <a href="#report">Submit a request</a> with your district details and we'll respond within 1 business day.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDesc}>Quick answers before you submit a ticket.</p>
          </div>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqBtn}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  type="button"
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ""}`}>›</span>
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Report ── */}
        <section id="report" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Report an Issue</h2>
            <p className={styles.sectionDesc}>
              {isBugReport
                ? "Include your version, source mode, and expected vs. actual behavior so we can reproduce quickly."
                : issueForm.type === "feature"
                ? "Describe the feature and how it would help you in the classroom."
                : "Ask us anything — we'll get back to you within 24 hours."}
            </p>
          </div>
          <form className={styles.formCard} onSubmit={submitIssue}>
            <div className={styles.formGrid}>
              <label className={styles.formLabel}>
                Message Type
                <select
                  value={issueForm.type}
                  onChange={(e) => setIssueForm((s) => ({ ...s, type: e.target.value }))}
                >
                  <option value="bug">Bug report</option>
                  <option value="question">Question</option>
                  <option value="feature">Feature request</option>
                </select>
              </label>

              <label className={styles.formLabel}>
                Email
                <input
                  type="email"
                  required
                  value={issueForm.email}
                  onChange={(e) => setIssueForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="teacher@school.org"
                />
              </label>

              <label className={styles.formLabel}>
                Name
                <input
                  value={issueForm.name}
                  onChange={(e) => setIssueForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Optional"
                />
              </label>

              {isBugReport && (
                <>
                  <label className={styles.formLabel}>
                    Extension Version
                    <input
                      value={issueForm.extensionVersion}
                      onChange={(e) => setIssueForm((s) => ({ ...s, extensionVersion: e.target.value }))}
                      placeholder="e.g. 2.3.3"
                    />
                  </label>
                  <label className={styles.formLabel}>
                    Source Mode
                    <select
                      value={issueForm.sourceMode}
                      onChange={(e) => setIssueForm((s) => ({ ...s, sourceMode: e.target.value }))}
                    >
                      <option value="auto">Auto</option>
                      <option value="classroom">Google Classroom</option>
                      <option value="deltamath">DeltaMath</option>
                      <option value="schoology">Schoology</option>
                      <option value="quizizz">Quizizz / Wayground</option>
                      <option value="clipboard">Clipboard</option>
                    </select>
                  </label>
                  <label className={`${styles.formLabel} ${styles.formFull}`}>
                    Page URL
                    <input
                      value={issueForm.pageUrl}
                      onChange={(e) => setIssueForm((s) => ({ ...s, pageUrl: e.target.value }))}
                      placeholder="https://classroom.google.com/..."
                    />
                  </label>
                  <label className={`${styles.formLabel} ${styles.formFull}`}>
                    Reproduction Steps
                    <textarea
                      value={issueForm.reproSteps}
                      onChange={(e) => setIssueForm((s) => ({ ...s, reproSteps: e.target.value }))}
                      placeholder="1. Open ... 2. Click Copy ... 3. Click Paste ..."
                      rows={4}
                    />
                  </label>
                  <label className={styles.formLabel}>
                    Expected Behavior
                    <textarea
                      value={issueForm.expectedBehavior}
                      onChange={(e) => setIssueForm((s) => ({ ...s, expectedBehavior: e.target.value }))}
                      rows={3}
                    />
                  </label>
                  <label className={styles.formLabel}>
                    Actual Behavior
                    <textarea
                      value={issueForm.actualBehavior}
                      onChange={(e) => setIssueForm((s) => ({ ...s, actualBehavior: e.target.value }))}
                      rows={3}
                    />
                  </label>
                </>
              )}

              <label className={`${styles.formLabel} ${styles.formFull}`}>
                {isBugReport ? "Additional Details" : "Details"}
                <textarea
                  required
                  value={issueForm.details}
                  onChange={(e) => setIssueForm((s) => ({ ...s, details: e.target.value }))}
                  rows={4}
                  placeholder={
                    issueForm.type === "feature"
                      ? "Describe the feature and how it would help your workflow."
                      : issueForm.type === "question"
                      ? "What would you like to know?"
                      : "Anything else that helps us debug faster."
                  }
                />
              </label>

              <label className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  checked={issueForm.noPii}
                  onChange={(e) => setIssueForm((s) => ({ ...s, noPii: e.target.checked }))}
                />
                I confirm this report does not include student names or other PII.
              </label>

              <input
                tabIndex={-1}
                autoComplete="off"
                className={styles.honeypot}
                value={issueForm.honeypot}
                onChange={(e) => setIssueForm((s) => ({ ...s, honeypot: e.target.value }))}
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn} disabled={issueLoading}>
                {issueLoading ? "Submitting…" : "Submit Report"}
              </button>
              {issueMessage && (
                <p className={issueMessage.startsWith("Could") ? styles.errorMsg : styles.successMsg}>
                  {issueMessage}
                </p>
              )}
            </div>
          </form>
        </section>

        {/* ── Reviews ── */}
        <section id="reviews" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <p className={styles.sectionDesc}>
              Reviews are moderated before publishing. Share what worked and what needs improvement.
            </p>
          </div>

          <div className={styles.reviewStats}>
            <p className={styles.reviewAvg}>
              Average rating:{" "}
              <strong>{averageRating ? averageRating.toFixed(1) : "N/A"} / 5</strong>
            </p>
            <button
              onClick={loadReviews}
              type="button"
              disabled={reviewsLoading}
              className={styles.refreshBtn}
            >
              {reviewsLoading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {reviewsError && <p className={styles.errorMsg}>{reviewsError}</p>}

          <div className={styles.reviewGrid}>
            {approvedReviews.map((review) => (
              <article className={styles.reviewCard} key={review.id}>
                <div className={styles.reviewCardHeader}>
                  <p className={styles.reviewName}>{review.name || "Anonymous Teacher"}</p>
                  <Stars rating={review.rating} />
                </div>
                <p className={styles.reviewBody}>{review.body}</p>
                <div className={styles.reviewMeta}>
                  {review.role && <span className={styles.reviewChip}>{review.role}</span>}
                  <span className={styles.reviewChip}>{prettyDate(review.created_at)}</span>
                </div>
              </article>
            ))}
            {!approvedReviews.length && !reviewsLoading && (
              <article className={styles.reviewCard}>
                <p className={styles.reviewBody}>No approved reviews yet. Be the first to submit one.</p>
              </article>
            )}
          </div>

          <form className={styles.formCard} onSubmit={submitReview}>
            <div className={styles.formGrid}>
              <label className={styles.formLabel}>
                Name
                <input
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Optional"
                />
              </label>
              <label className={styles.formLabel}>
                Role / Context
                <input
                  value={reviewForm.role}
                  onChange={(e) => setReviewForm((s) => ({ ...s, role: e.target.value }))}
                  placeholder="e.g. High School Math Teacher"
                />
              </label>
              <label className={styles.formLabel}>
                Rating
                <select
                  value={String(reviewForm.rating)}
                  onChange={(e) => setReviewForm((s) => ({ ...s, rating: Number(e.target.value) }))}
                >
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Good</option>
                  <option value="3">3 — Okay</option>
                  <option value="2">2 — Poor</option>
                  <option value="1">1 — Bad</option>
                </select>
              </label>
              <label className={`${styles.formLabel} ${styles.formFull}`}>
                Review
                <textarea
                  required
                  minLength={12}
                  rows={4}
                  value={reviewForm.body}
                  onChange={(e) => setReviewForm((s) => ({ ...s, body: e.target.value }))}
                  placeholder="What worked well? What should be improved?"
                />
              </label>
              <label className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  checked={reviewForm.noPii}
                  onChange={(e) => setReviewForm((s) => ({ ...s, noPii: e.target.checked }))}
                />
                I confirm this review does not include student names or PII.
              </label>
              <input
                tabIndex={-1}
                autoComplete="off"
                className={styles.honeypot}
                value={reviewForm.honeypot}
                onChange={(e) => setReviewForm((s) => ({ ...s, honeypot: e.target.value }))}
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn} disabled={reviewLoading}>
                {reviewLoading ? "Submitting…" : "Submit Review"}
              </button>
              {reviewMessage && <p className={styles.successMsg}>{reviewMessage}</p>}
            </div>
          </form>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img src="/gradebridge-logo.png" alt="" className={styles.footerLogo} />
            <p className={styles.footerName}>GradeBridge</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
            <a href="#report" className={styles.footerLink}>Contact</a>
          </div>
          <p className={styles.footerCopy}>Please avoid sharing student PII in forms.</p>
        </div>
      </footer>

    </div>
  );
}
