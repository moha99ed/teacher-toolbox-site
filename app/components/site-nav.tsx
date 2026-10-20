"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CHROME_STORE_URL } from "../site";
import styles from "./marketing.module.css";

type NavLink = { href: string; label: string; isActive: (path: string) => boolean };

const NAV_LINKS: NavLink[] = [
  { href: "/try", label: "Try it", isActive: (p) => p === "/try" },
  { href: "/#how-it-works", label: "How it works", isActive: () => false },
  { href: "/#platforms", label: "Platforms", isActive: (p) => p.endsWith("-to-powerschool") },
  { href: "/pricing", label: "Pricing", isActive: (p) => p === "/pricing" },
  { href: "/schools", label: "Schools", isActive: (p) => p === "/schools" },
  { href: "/support", label: "Support", isActive: (p) => p === "/support" },
];

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Close the phone menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = NAV_LINKS.map((link) => {
    const active = link.isActive(pathname);
    return (
      <a
        key={link.href}
        href={link.href}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </a>
    );
  });

  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={styles.navInner}>
        <a href="/" className={styles.navBrand}>
          <img src="/gradebridge-logo-dark.svg" alt="" className={styles.navLogo} />
          GradeBridge
        </a>
        <div className={styles.navLinks}>{links}</div>
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.navInstall}>
          Add to Chrome
        </a>
        <button
          type="button"
          className={styles.navToggle}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.navToggleBar} />
          <span className={styles.navToggleBar} />
          <span className={styles.navToggleBar} />
        </button>
      </div>
      <div id="site-menu" className={`${styles.navMenu} ${open ? styles.navMenuOpen : ""}`} hidden={!open}>
        {links}
      </div>
    </nav>
  );
}
