import { CHROME_STORE_URL } from "../site";
import styles from "./marketing.module.css";

export function SiteNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <a href="/" className={styles.navBrand}>
          <img src="/gradebridge-logo-dark.svg" alt="" className={styles.navLogo} />
          GradeBridge
        </a>
        <div className={styles.navLinks}>
          <a href="/#how-it-works" className={styles.navLink}>How it works</a>
          <a href="/#platforms" className={styles.navLink}>Platforms</a>
          <a href="/pricing" className={styles.navLink}>Pricing</a>
          <a href="/support" className={styles.navLink}>Support</a>
        </div>
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.navInstall}>
          Add to Chrome
        </a>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <img src="/gradebridge-logo-dark.svg" alt="" className={styles.navLogo} />
          GradeBridge
        </div>
        <div className={styles.footerLinks}>
          <a href="/google-classroom-to-powerschool" className={styles.footerLink}>Google Classroom to PowerSchool</a>
          <a href="/pricing" className={styles.footerLink}>Pricing</a>
          <a href="/support" className={styles.footerLink}>Support</a>
          <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
        </div>
        <p className={styles.footerCopy}>
          GradeBridge is an independent tool and is not affiliated with or endorsed by PowerSchool or Google.
        </p>
      </div>
    </footer>
  );
}

export function InstallButton({ label = "Add to Chrome — Free" }: { label?: string }) {
  return (
    <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-5.6-2.68l2.6-4.5A3 3 0 0012 15a3 3 0 002.97-2.59l2.64 4.56A7.2 7.2 0 0112 20.2z" />
      </svg>
      {label}
    </a>
  );
}

export type FaqEntry = { q: string; a: string };

export function Faq({ items }: { items: FaqEntry[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.q} className={styles.faqItem}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function faqJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
