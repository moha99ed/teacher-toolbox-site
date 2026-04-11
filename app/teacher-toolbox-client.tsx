"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./teacher-toolbox.module.css";

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
    a: "GradeBridge currently supports Google Classroom, DeltaMath, and Quizizz / Wayground. Additional integrations are on the roadmap — submit a feature request below.",
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
    a: "GradeBridge offers a free tier with core grading features. Premium plans unlock advanced integrations and priority support. See the Billing section for details.",
  },
  {
    q: "How do I cancel or change my subscription?",
    a: "Use the Manage Subscription button in the Billing section below — no need to contact support. Changes take effect at your next billing cycle.",
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

function ReviewStars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} stars`} className={styles.stars}>
      {"★".repeat(rating)}
      {"☆".repeat(Math.max(0, 5 - rating))}
    </span>
  );
}

export function TeacherToolboxClient() {
  const [issueForm, setIssueForm] = useState(EMPTY_ISSUE_FORM);
  const [reviewForm, setReviewForm] = useState(EMPTY_REVIEW_FORM);
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
    const sum = approvedReviews.reduce((acc, item) => acc + item.rating, 0);
    return Math.round((sum / approvedReviews.length) * 10) / 10;
  }, [approvedReviews]);

  async function loadReviews() {
    setReviewsLoading(true);
    setReviewsError("");
    try {
      const response = await fetch("/api/teacher-toolbox/reviews", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not load reviews.");
      }
      setApprovedReviews(data.reviews || []);
    } catch (error) {
      console.error(error);
      setReviewsError("Could not load reviews right now.");
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function submitIssue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIssueLoading(true);
    setIssueMessage("");
    try {
      const response = await fetch("/api/teacher-toolbox/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueForm),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not submit issue.");
      }
      setIssueMessage("Report submitted. We'll email you within 24 hours.");
      setIssueForm(EMPTY_ISSUE_FORM);
    } catch (error) {
      console.error(error);
      setIssueMessage("Could not submit right now. Please try again.");
    } finally {
      setIssueLoading(false);
    }
  }

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewLoading(true);
    setReviewMessage("");
    try {
      const response = await fetch("/api/teacher-toolbox/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not submit review.");
      }
      setReviewMessage("Thanks. Your review is submitted for moderation.");
      setReviewForm(EMPTY_REVIEW_FORM);
    } catch (error) {
      console.error(error);
      setReviewMessage("Could not submit review right now. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.topNav}>
        <a href="#" className={styles.navBrand}>
          <img
            src="/gradebridge-logo.png"
            alt="GradeBridge logo"
            className={styles.navLogo}
          />
          <span>GradeBridge</span>
        </a>
        <nav className={styles.navLinks}>
          <a href="#billing">Billing</a>
          <a href="#faq">FAQ</a>
          <a href="#report">Report</a>
          <a href="#reviews">Reviews</a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.brandRow}>
            <img
              src="/gradebridge-logo.png"
              alt="GradeBridge logo"
              className={styles.brandLogo}
            />
            <div className={styles.brandMeta}>
              <span className={styles.brandKicker}>GradeBridge</span>
              <span className={styles.brandSub}>Official support channel</span>
            </div>
          </div>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            All systems operational
          </div>
          <p className={styles.eyebrow}>Teacher Tool Box</p>
          <h1>GradeBridge <em>Support</em> Center</h1>
          <p>
            Report bugs, manage your subscription, and leave reviews — all in
            one place.
          </p>
          <div className={styles.heroActions}>
            <a
              href="https://chrome.google.com/webstore/detail/gradebridge"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.installButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-5.6-2.68l2.6-4.5A3 3 0 0012 15a3 3 0 002.97-2.59l2.64 4.56A7.2 7.2 0 0112 20.2z"/>
              </svg>
              Add to Chrome — It&apos;s Free
            </a>
            <a href="#report" className={styles.primaryButton}>
              Report an Issue
            </a>
            <a href="#billing" className={styles.secondaryButton}>
              Manage Billing
            </a>
          </div>
        </div>
        <div className={styles.quickCards}>
          <a
            href="https://chrome.google.com/webstore/detail/gradebridge"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.quickCard}
          >
            <span className={styles.quickCardBadge} data-color="purple">↓</span>
            <div>
              <p className={styles.quickCardTitle}>Install GradeBridge</p>
              <p className={styles.quickCardDesc}>
                Add the Chrome extension — free to start.
              </p>
            </div>
            <span className={styles.quickCardArrow}>›</span>
          </a>
          <a
            href="#report"
            className={styles.quickCard}
            onClick={() => setIssueForm((s) => ({ ...s, type: "bug" }))}
          >
            <span className={styles.quickCardBadge} data-color="red">B</span>
            <div>
              <p className={styles.quickCardTitle}>Report a Bug</p>
              <p className={styles.quickCardDesc}>
                Something not working? Tell us what happened.
              </p>
            </div>
            <span className={styles.quickCardArrow}>›</span>
          </a>
          <a
            href="#report"
            className={styles.quickCard}
            onClick={() => setIssueForm((s) => ({ ...s, type: "feature" }))}
          >
            <span className={styles.quickCardBadge} data-color="blue">F</span>
            <div>
              <p className={styles.quickCardTitle}>Request a Feature</p>
              <p className={styles.quickCardDesc}>
                Suggest something for the roadmap.
              </p>
            </div>
            <span className={styles.quickCardArrow}>›</span>
          </a>
          <a href="#billing" className={styles.quickCard}>
            <span className={styles.quickCardBadge} data-color="green">$</span>
            <div>
              <p className={styles.quickCardTitle}>Billing & Payments</p>
              <p className={styles.quickCardDesc}>
                Manage your plan or make a payment.
              </p>
            </div>
            <span className={styles.quickCardArrow}>›</span>
          </a>
        </div>
      </section>

      {/* Billing */}
      <section id="billing" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Billing & Payments</h2>
            <p>Manage your GradeBridge subscription or make a one-time payment.</p>
          </div>
        </div>
        <div className={styles.billingCards}>
          <div className={styles.billingCard}>
            <div className={styles.billingCardTop}>
              <span className={styles.billingBadge} data-color="orange">↺</span>
              <p className={styles.billingCardTitle}>Manage Subscription</p>
            </div>
            <p className={styles.billingCardDesc}>
              Update your plan, change your payment method, or cancel — any
              time from the LemonSqueezy customer portal.
            </p>
            <a
              href="https://app.lemonsqueezy.com/my-orders"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.billingButton}
            >
              Open Customer Portal &rarr;
            </a>
          </div>
          <div className={styles.billingCard}>
            <div className={styles.billingCardTop}>
              <span className={styles.billingBadge} data-color="blue">★</span>
              <p className={styles.billingCardTitle}>Upgrade to Premium</p>
            </div>
            <p className={styles.billingCardDesc}>
              Unlock unlimited grade transfers with a monthly or annual
              GradeBridge plan.
            </p>
            <a
              href="/gradebridge/pricing"
              className={styles.billingButton}
            >
              View Plans &rarr;
            </a>
          </div>
          <div className={styles.billingCard}>
            <div className={styles.billingCardTop}>
              <span className={styles.billingBadge} data-color="green">$</span>
              <p className={styles.billingCardTitle}>District License</p>
            </div>
            <p className={styles.billingCardDesc}>
              Need GradeBridge for your whole school or district? Contact us
              for volume pricing.
            </p>
            <a
              href="#report"
              className={styles.billingButton}
            >
              Contact Us &rarr;
            </a>
          </div>
        </div>
        <p className={styles.billingNote}>
          Need a quote or purchase order?{" "}
          <a href="#report">Submit a request</a> with your district details and
          we'll respond within 1 business day.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers before you submit a ticket.</p>
          </div>
        </div>
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                type="button"
              >
                <span>{item.q}</span>
                <span
                  className={`${styles.faqChevron} ${
                    openFaq === i ? styles.faqChevronOpen : ""
                  }`}
                >
                  ›
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openFaq === i ? styles.faqAnswerOpen : ""
                }`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Report */}
      <section id="report" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Report an Issue</h2>
            <p>
              {isBugReport
                ? "Include version, source mode, and expected vs actual behavior so we can reproduce quickly."
                : issueForm.type === "feature"
                ? "Describe the feature and how it would help you in the classroom."
                : "Ask us anything — we'll get back to you within 24 hours."}
            </p>
          </div>
        </div>
        <form className={styles.card} onSubmit={submitIssue}>
          <div className={styles.grid}>
            <label>
              Message Type
              <select
                value={issueForm.type}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, type: e.target.value }))
                }
              >
                <option value="bug">Bug report</option>
                <option value="question">Question</option>
                <option value="feature">Feature request</option>
              </select>
            </label>
            <label>
              Email
              <input
                type="email"
                required
                value={issueForm.email}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="teacher@school.org"
              />
            </label>
            <label>
              Name
              <input
                value={issueForm.name}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Optional"
              />
            </label>
            <label>
              Tool
              <select
                value={issueForm.tool}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, tool: e.target.value }))
                }
              >
                <option value="GradeBridge">GradeBridge</option>
                <option value="Other">Other</option>
              </select>
            </label>

            {/* Bug-only technical fields */}
            {isBugReport && (
              <>
                <label>
                  Extension Version
                  <input
                    value={issueForm.extensionVersion}
                    onChange={(e) =>
                      setIssueForm((s) => ({
                        ...s,
                        extensionVersion: e.target.value,
                      }))
                    }
                    placeholder="e.g. 2.0.3"
                  />
                </label>
                <label>
                  Source Mode
                  <select
                    value={issueForm.sourceMode}
                    onChange={(e) =>
                      setIssueForm((s) => ({
                        ...s,
                        sourceMode: e.target.value,
                      }))
                    }
                  >
                    <option value="auto">Auto</option>
                    <option value="classroom">Google Classroom</option>
                    <option value="deltamath">DeltaMath</option>
                    <option value="quizizz">Quizizz / Wayground</option>
                    <option value="clipboard">Clipboard</option>
                  </select>
                </label>
                <label className={styles.full}>
                  Page URL
                  <input
                    value={issueForm.pageUrl}
                    onChange={(e) =>
                      setIssueForm((s) => ({ ...s, pageUrl: e.target.value }))
                    }
                    placeholder="https://classroom.google.com/..."
                  />
                </label>
                <label className={styles.full}>
                  Reproduction Steps
                  <textarea
                    value={issueForm.reproSteps}
                    onChange={(e) =>
                      setIssueForm((s) => ({
                        ...s,
                        reproSteps: e.target.value,
                      }))
                    }
                    placeholder="1. Open ... 2. Click Copy ... 3. Click Paste ..."
                    rows={4}
                  />
                </label>
                <label>
                  Expected Behavior
                  <textarea
                    value={issueForm.expectedBehavior}
                    onChange={(e) =>
                      setIssueForm((s) => ({
                        ...s,
                        expectedBehavior: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </label>
                <label>
                  Actual Behavior
                  <textarea
                    value={issueForm.actualBehavior}
                    onChange={(e) =>
                      setIssueForm((s) => ({
                        ...s,
                        actualBehavior: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </label>
              </>
            )}

            <label className={styles.full}>
              {isBugReport ? "Additional Details" : "Details"}
              <textarea
                required
                value={issueForm.details}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, details: e.target.value }))
                }
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
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={issueForm.noPii}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, noPii: e.target.checked }))
                }
              />
              I confirm this report does not include student names or other PII.
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              className={styles.honeypot}
              value={issueForm.honeypot}
              onChange={(e) =>
                setIssueForm((s) => ({ ...s, honeypot: e.target.value }))
              }
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" disabled={issueLoading}>
              {issueLoading ? "Submitting..." : "Submit Report"}
            </button>
            {issueMessage ? (
              <p className={issueMessage.startsWith("Could") ? styles.errorText : styles.successText}>
                {issueMessage}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      {/* Reviews */}
      <section id="reviews" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Reviews</h2>
            <p>
              Reviews are moderated before publishing. Share what worked and
              what needs improvement.
            </p>
          </div>
        </div>

        <div className={styles.reviewStats}>
          <p>
            Average rating:{" "}
            <strong>
              {averageRating ? averageRating.toFixed(1) : "N/A"} / 5
            </strong>
          </p>
          <button onClick={loadReviews} type="button" disabled={reviewsLoading}>
            {reviewsLoading ? "Loading..." : "Refresh Reviews"}
          </button>
        </div>

        {reviewsError ? (
          <p className={styles.errorText}>{reviewsError}</p>
        ) : null}

        <div className={styles.reviewGrid}>
          {approvedReviews.map((review) => (
            <article className={styles.reviewCard} key={review.id}>
              <header>
                <p className={styles.reviewName}>
                  {review.name || "Anonymous Teacher"}
                </p>
                <ReviewStars rating={review.rating} />
              </header>
              <p className={styles.reviewBody}>{review.body}</p>
              <footer>
                <span>{review.role || "Teacher"}</span>
                <span>{review.tool || "GradeBridge"}</span>
                <span>{prettyDate(review.created_at)}</span>
              </footer>
            </article>
          ))}
          {!approvedReviews.length && !reviewsLoading ? (
            <article className={styles.reviewCard}>
              <p className={styles.reviewBody}>
                No approved reviews yet. Be the first to submit one.
              </p>
            </article>
          ) : null}
        </div>

        <form className={styles.card} onSubmit={submitReview}>
          <div className={styles.grid}>
            <label>
              Name
              <input
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Optional"
              />
            </label>
            <label>
              Role / Context
              <input
                value={reviewForm.role}
                onChange={(e) =>
                  setReviewForm((s) => ({ ...s, role: e.target.value }))
                }
                placeholder="e.g. High School Math Teacher"
              />
            </label>
            <label>
              Tool
              <select
                value={reviewForm.tool}
                onChange={(e) =>
                  setReviewForm((s) => ({ ...s, tool: e.target.value }))
                }
              >
                <option value="GradeBridge">GradeBridge</option>
              </select>
            </label>
            <label>
              Rating
              <select
                value={String(reviewForm.rating)}
                onChange={(e) =>
                  setReviewForm((s) => ({
                    ...s,
                    rating: Number(e.target.value),
                  }))
                }
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </label>
            <label className={styles.full}>
              Review
              <textarea
                required
                minLength={12}
                rows={4}
                value={reviewForm.body}
                onChange={(e) =>
                  setReviewForm((s) => ({ ...s, body: e.target.value }))
                }
                placeholder="What worked well? What should be improved?"
              />
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={reviewForm.noPii}
                onChange={(e) =>
                  setReviewForm((s) => ({ ...s, noPii: e.target.checked }))
                }
              />
              I confirm this review does not include student names or PII.
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              className={styles.honeypot}
              value={reviewForm.honeypot}
              onChange={(e) =>
                setReviewForm((s) => ({ ...s, honeypot: e.target.value }))
              }
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" disabled={reviewLoading}>
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
            {reviewMessage ? <p>{reviewMessage}</p> : null}
          </div>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img
            src="/gradebridge-logo.png"
            alt="GradeBridge logo"
            className={styles.footerLogo}
          />
          <div>
            <p className={styles.footerTitle}>GradeBridge</p>
            <p className={styles.footerSub}>Teacher Tool Box Support</p>
          </div>
        </div>
        <p className={styles.footerCopy}>
          Built for educators. Please avoid sharing student PII in forms.
        </p>
      </footer>
    </main>
  );
}
