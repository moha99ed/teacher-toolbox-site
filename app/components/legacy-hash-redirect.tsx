"use client";

import { useEffect } from "react";

// The support center used to live at "/", so old links like /#report or
// /#billing should still land on the right section at /support.
const SUPPORT_SECTIONS = new Set(["#billing", "#support", "#faq", "#report", "#reviews"]);

export function LegacyHashRedirect() {
  useEffect(() => {
    if (SUPPORT_SECTIONS.has(window.location.hash)) {
      window.location.replace(`/support${window.location.hash}`);
    }
  }, []);
  return null;
}
