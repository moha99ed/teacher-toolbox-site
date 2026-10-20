import type { Metadata } from "next";
import styles from "./components/marketing.module.css";
import { SiteFooter, SiteNav } from "./components/site-chrome";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SiteNav />
      <main className={styles.main}>
        <section className={styles.ctaBand}>
          <span className={styles.eyebrow}>404</span>
          <h1 className={styles.h2}>We couldn't find that page</h1>
          <p className={styles.lead}>It may have moved. These are good places to start.</p>
          <div className={styles.ctas}>
            <a href="/" className={styles.btnPrimary}>GradeBridge home</a>
            <a href="/try" className={styles.btnOutlined}>Try the demo</a>
            <a href="/support" className={styles.btnOutlined}>Support</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
