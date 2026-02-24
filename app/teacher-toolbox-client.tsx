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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueForm),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not submit issue.");
      }
      setIssueMessage("Report submitted. We typically respond in under 24 hours.");
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
        headers: {
          "Content-Type": "application/json",
        },
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
          <a href="#report">Report</a>
          <a href="#reviews">Reviews</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.brandRow}>
            <img src="/gradebridge-logo.png" alt="GradeBridge logo" className={styles.brandLogo} />
            <div className={styles.brandMeta}>
              <span className={styles.brandKicker}>GradeBridge</span>
              <span className={styles.brandSub}>Official support channel</span>
            </div>
          </div>
          <p className={styles.eyebrow}>Teacher Tool Box</p>
          <h1>GradeBridge Support Center</h1>
          <p>
            Report bugs, request features, and leave reviews for GradeBridge in
            one place.
          </p>
          <div className={styles.heroActions}>
            <a href="#report" className={styles.primaryButton}>
              Report an Issue
            </a>
            <a href="#reviews" className={styles.secondaryButton}>
              Leave a Review
            </a>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <p className={styles.panelTitle}>What you can do here</p>
          <ul>
            <li>Report issues with clear debugging context.</li>
            <li>Submit product suggestions for the roadmap.</li>
            <li>Leave moderated reviews that help other teachers.</li>
          </ul>
        </div>
      </section>

      <section id="report" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Report an Issue</h2>
          <p>
            Include version, source mode, and expected vs actual behavior so we
            can reproduce quickly.
          </p>
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
                  setIssueForm((s) => ({ ...s, sourceMode: e.target.value }))
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
                  setIssueForm((s) => ({ ...s, reproSteps: e.target.value }))
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
            <label className={styles.full}>
              Details
              <textarea
                required
                value={issueForm.details}
                onChange={(e) =>
                  setIssueForm((s) => ({ ...s, details: e.target.value }))
                }
                rows={4}
                placeholder="Anything else that helps us debug faster."
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
            {issueMessage ? <p>{issueMessage}</p> : null}
          </div>
        </form>
      </section>

      <section id="reviews" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Reviews</h2>
          <p>
            Reviews are moderated before publishing. Share what worked and what
            needs improvement.
          </p>
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

        {reviewsError ? <p className={styles.errorText}>{reviewsError}</p> : null}

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
