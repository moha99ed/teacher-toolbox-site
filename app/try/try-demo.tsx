"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./try.module.css";
import {
  Flag,
  POWERSCHOOL_ASSIGNMENT,
  POWERSCHOOL_MAX,
  ROSTER,
  SOURCES,
  SourceId,
  nameKey,
} from "./demo-data";
import { CHROME_STORE_URL } from "../site";

type Tab = "source" | "powerschool";
type Scale = "raw" | "custom";
type Copied = { name: string; key: string; score: number | null; flags: Flag[] };
type Cell = { value: number | null; flags: Flag[] };

const PASTE_STEP_MS = 140;
const SECONDS_PER_STUDENT_BY_HAND = 10;

const round1 = (n: number) => Math.round(n * 10) / 10;

export function TryDemo() {
  const [sourceId, setSourceId] = useState<SourceId>("classroom");
  const [tab, setTab] = useState<Tab>("source");
  const [copied, setCopied] = useState<Copied[] | null>(null);
  const [scale, setScale] = useState<Scale>("raw");
  const [sourceMax, setSourceMax] = useState(SOURCES.classroom.sourceMax);
  const [cells, setCells] = useState<Record<string, Cell>>({});
  const [pasteIndex, setPasteIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const source = SOURCES[sourceId];

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  function reset(nextSource: SourceId = sourceId) {
    if (timer.current) clearInterval(timer.current);
    setSourceId(nextSource);
    setTab("source");
    setCopied(null);
    setScale("raw");
    setSourceMax(SOURCES[nextSource].sourceMax);
    setCells({});
    setPasteIndex(null);
    setDone(false);
  }

  function copyGrades() {
    // Like the extension, students with no score and no status aren't copied.
    const rows = source.rows
      .filter((row) => row.score != null || row.flags.length > 0)
      .map((row) => ({ name: row.name, key: nameKey(row.name), score: row.score, flags: row.flags }));
    setCopied(rows);
  }

  const rosterKeys = useMemo(() => new Map(ROSTER.map((name) => [nameKey(name), name])), []);

  const plan = useMemo(() => {
    if (!copied) return null;
    const byKey = new Map(copied.map((entry) => [entry.key, entry]));
    const matched = ROSTER.flatMap((rosterName) => {
      const entry = byKey.get(nameKey(rosterName));
      if (!entry) return [];
      const value =
        entry.score == null
          ? null
          : scale === "custom"
            ? round1((entry.score / (sourceMax || 1)) * POWERSCHOOL_MAX)
            : entry.score;
      return [{ rosterName, sourceName: entry.name, value, flags: entry.flags }];
    });
    const unmatched = copied.filter((entry) => !rosterKeys.has(entry.key)).map((entry) => entry.name);
    const overMax = matched.filter((m) => m.value != null && m.value > POWERSCHOOL_MAX).length;
    return { matched, unmatched, overMax };
  }, [copied, scale, sourceMax, rosterKeys]);

  function paste() {
    if (!plan) return;
    setCells({});
    setDone(false);
    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCells(Object.fromEntries(plan.matched.map((m) => [m.rosterName, { value: m.value, flags: m.flags }])));
      setDone(true);
      return;
    }
    let i = 0;
    setPasteIndex(0);
    timer.current = setInterval(() => {
      const m = plan.matched[i];
      setCells((prev) => ({ ...prev, [m.rosterName]: { value: m.value, flags: m.flags } }));
      i += 1;
      if (i >= plan.matched.length) {
        if (timer.current) clearInterval(timer.current);
        setPasteIndex(null);
        setDone(true);
      } else {
        setPasteIndex(i);
      }
    }, PASTE_STEP_MS);
  }

  const pasting = pasteIndex != null;
  const activeRow = pasting && plan ? plan.matched[pasteIndex]?.rosterName : null;
  const flagCount = plan ? plan.matched.reduce((n, m) => n + m.flags.length, 0) : 0;
  const step = !copied ? 1 : !done ? 2 : 3;

  return (
    <div className={styles.demo}>
      {/* ── Source picker + progress ── */}
      <div className={styles.toolbar}>
        <div className={styles.sourcePicker} role="group" aria-label="Choose a sample source">
          <span className={styles.toolbarLabel}>Copy from:</span>
          {(Object.keys(SOURCES) as SourceId[]).map((id) => (
            <button
              key={id}
              type="button"
              className={`${styles.chip} ${id === sourceId ? styles.chipActive : ""}`}
              aria-pressed={id === sourceId}
              onClick={() => reset(id)}
              disabled={pasting}
            >
              {SOURCES[id].label}
            </button>
          ))}
        </div>
        <ol className={styles.progress} aria-label="Demo progress">
          {["Copy", "Preview", "Paste"].map((label, i) => (
            <li
              key={label}
              className={i + 1 < step ? styles.progressDone : i + 1 === step ? styles.progressNow : ""}
              aria-current={i + 1 === step ? "step" : undefined}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      {/* ── Simulated browser ── */}
      <div className={styles.browser}>
        <div className={styles.tabs} role="tablist" aria-label="Browser tabs">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "source"}
            className={`${styles.tab} ${tab === "source" ? styles.tabActive : ""}`}
            onClick={() => setTab("source")}
            disabled={pasting}
          >
            {source.label} <span className={styles.sample}>sample</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "powerschool"}
            className={`${styles.tab} ${tab === "powerschool" ? styles.tabActive : ""}`}
            onClick={() => setTab("powerschool")}
            disabled={pasting}
          >
            PowerSchool <span className={styles.sample}>sample</span>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.page} role="tabpanel">
            {tab === "source" ? (
              <SourcePage sourceId={sourceId} highlight={!!copied} />
            ) : (
              <PowerSchoolPage cells={cells} activeRow={activeRow} />
            )}
          </div>

          {/* ── Simulated GradeBridge popup ── */}
          <aside className={styles.popup} aria-label="GradeBridge extension (simulated)">
            <div className={styles.popupHead}>
              <span className={styles.popupLogo}>
                <img src="/gradebridge-logo-dark.svg" alt="" />
              </span>
              <strong>GradeBridge</strong>
              <span className={styles.popupSim}>Simulation</span>
            </div>

            <div className={styles.popupBody} aria-live="polite">
              {tab === "source" && !copied && (
                <>
                  <p className={styles.detected}>
                    <span className={styles.dot} /> Detected: {source.label}
                  </p>
                  <p className={styles.popupText}>{source.hint}</p>
                  <button type="button" className={styles.primary} onClick={copyGrades}>
                    Copy grades
                  </button>
                </>
              )}

              {tab === "source" && copied && (
                <>
                  <p className={styles.success}>
                    ✓ Copied {copied.length} grades from {source.label}.
                  </p>
                  <p className={styles.popupText}>Now open the same assignment in PowerSchool.</p>
                  <button type="button" className={styles.primary} onClick={() => setTab("powerschool")}>
                    Open PowerSchool tab →
                  </button>
                </>
              )}

              {tab === "powerschool" && !copied && (
                <>
                  <p className={styles.popupText}>Copy grades from a platform first.</p>
                  <button type="button" className={styles.secondary} onClick={() => setTab("source")}>
                    ← Back to {source.label}
                  </button>
                </>
              )}

              {tab === "powerschool" && plan && !done && (
                <>
                  <p className={styles.popupText}>
                    <strong>{plan.matched.length} students matched</strong> to this scoresheet.
                  </p>
                  {plan.unmatched.length > 0 && (
                    <p className={styles.warning}>
                      ⚠ {plan.unmatched.length} name not on this scoresheet: {plan.unmatched.join(", ")}. It
                      won't be pasted.
                    </p>
                  )}

                  <div className={styles.scale} role="group" aria-label="Score scale">
                    <button
                      type="button"
                      className={`${styles.seg} ${scale === "raw" ? styles.segActive : ""}`}
                      aria-pressed={scale === "raw"}
                      onClick={() => setScale("raw")}
                      disabled={pasting}
                    >
                      Raw Points
                    </button>
                    <button
                      type="button"
                      className={`${styles.seg} ${scale === "custom" ? styles.segActive : ""}`}
                      aria-pressed={scale === "custom"}
                      onClick={() => setScale("custom")}
                      disabled={pasting}
                    >
                      Custom Points
                    </button>
                  </div>

                  {scale === "custom" && (
                    <div className={styles.scaleInputs}>
                      <label>
                        Raw score is out of
                        <input
                          type="number"
                          min={1}
                          value={sourceMax}
                          onChange={(e) => setSourceMax(Number(e.target.value))}
                          disabled={pasting}
                        />
                      </label>
                      <span className={styles.popupText}>PowerSchool max: {POWERSCHOOL_MAX} (detected)</span>
                    </div>
                  )}

                  {plan.overMax > 0 && (
                    <p className={styles.warning}>
                      ⚠ These look like percentages, but the assignment is out of {POWERSCHOOL_MAX}. Choose
                      Custom Points to convert them.
                    </p>
                  )}

                  <ul className={styles.previewList}>
                    {plan.matched.slice(0, 4).map((m) => (
                      <li key={m.rosterName}>
                        <span>{m.rosterName}</span>
                        <span>{formatCell({ value: m.value, flags: m.flags })}</span>
                      </li>
                    ))}
                    <li className={styles.previewMore}>+ {plan.matched.length - 4} more</li>
                  </ul>

                  <button type="button" className={styles.primary} onClick={paste} disabled={pasting}>
                    {pasting ? `Entering ${pasteIndex! + 1} of ${plan.matched.length}…` : "Paste into PowerSchool"}
                  </button>
                </>
              )}

              {tab === "powerschool" && plan && done && (
                <>
                  <p className={styles.success}>
                    ✓ Entered {plan.matched.length} scores
                    {flagCount > 0 ? ` and ${flagCount} flags` : ""}.
                  </p>
                  <p className={styles.popupText}>
                    Typing these by hand takes about {Math.round((plan.matched.length * SECONDS_PER_STUDENT_BY_HAND) / 60)}{" "}
                    minutes per class, at roughly {SECONDS_PER_STUDENT_BY_HAND} seconds a student.
                  </p>
                  {plan.overMax > 0 && scale === "raw" && (
                    <p className={styles.warning}>
                      Some scores are above {POWERSCHOOL_MAX}. In real use you'd pick Custom Points first.
                    </p>
                  )}
                  <a
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primary}
                  >
                    Add to Chrome — Free
                  </a>
                  <button type="button" className={styles.secondary} onClick={() => reset()}>
                    Start over
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
      <p className={styles.footnote}>
        A simulation with fictional students. Nothing here connects to Google, DeltaMath or PowerSchool,
        and nothing you do is saved.
      </p>
    </div>
  );
}

function formatCell(cell: Cell) {
  const flags = cell.flags.map((f) => (f === "missing" ? "Missing" : "Late"));
  const value = cell.value == null ? "—" : String(cell.value);
  return flags.length ? `${value} · ${flags.join(", ")}` : value;
}

function SourcePage({ sourceId, highlight }: { sourceId: SourceId; highlight: boolean }) {
  const source = SOURCES[sourceId];

  if (sourceId === "sheets") {
    return (
      <div>
        <p className={styles.pageTitle}>{source.assignment}</p>
        <p className={styles.pageSub}>Columns A–C selected</p>
        <table className={`${styles.grid} ${styles.sheet}`}>
          <thead>
            <tr><th aria-hidden="true" /><th>A</th><th>B</th><th>C</th></tr>
          </thead>
          <tbody>
            <tr className={styles.sheetHeader}>
              <td>1</td><td>Name</td><td>Score</td><td>Status</td>
            </tr>
            {source.rows.map((row, i) => (
              <tr key={row.name} className={highlight ? styles.copiedRow : styles.selectedRow}>
                <td>{i + 2}</td>
                <td>{row.name}</td>
                <td>{row.score ?? ""}</td>
                <td>{row.flags.map((f) => (f === "missing" ? "Missing" : "Late")).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <p className={styles.pageTitle}>{source.assignment}</p>
      <p className={styles.pageSub}>{sourceId === "deltamath" ? "Assignment report" : "Student work"}</p>
      <table className={styles.grid}>
        <thead>
          <tr>
            <th>Student</th>
            {sourceId === "classroom" && <th>Status</th>}
            <th className={styles.num}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {source.rows.map((row) => (
            <tr key={row.name} className={highlight ? styles.copiedRow : ""}>
              <td>{row.name}</td>
              {sourceId === "classroom" && (
                <td>
                  {row.flags.includes("missing") ? (
                    <span className={`${styles.badge} ${styles.badgeMissing}`}>Missing</span>
                  ) : row.flags.includes("late") ? (
                    <span className={`${styles.badge} ${styles.badgeLate}`}>Done late</span>
                  ) : (
                    <span className={styles.muted}>Turned in</span>
                  )}
                </td>
              )}
              <td className={styles.num}>
                {row.score == null ? "—" : source.isPercent ? `${row.score}%` : `${row.score}/${source.sourceMax}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PowerSchoolPage({ cells, activeRow }: { cells: Record<string, Cell>; activeRow: string | null }) {
  return (
    <div>
      <p className={styles.pageTitle}>{POWERSCHOOL_ASSIGNMENT}</p>
      <p className={styles.pageSub}>Score entry · out of {POWERSCHOOL_MAX}</p>
      <table className={styles.grid}>
        <thead>
          <tr>
            <th>Student</th>
            <th className={styles.num}>Score</th>
          </tr>
        </thead>
        <tbody>
          {ROSTER.map((name) => {
            const cell = cells[name];
            const over = cell?.value != null && cell.value > POWERSCHOOL_MAX;
            return (
              <tr
                key={name}
                className={`${name === activeRow ? styles.activeRow : ""} ${cell ? styles.filledRow : ""}`}
              >
                <td>{name}</td>
                <td className={`${styles.num} ${over ? styles.overMax : ""}`}>
                  {cell?.flags.map((f) => (
                    <span
                      key={f}
                      className={`${styles.flag} ${f === "missing" ? styles.badgeMissing : styles.badgeLate}`}
                      title={f === "missing" ? "Missing" : "Late"}
                    >
                      {f === "missing" ? "M" : "L"}
                    </span>
                  ))}
                  {cell ? (cell.value ?? (cell.flags.includes("missing") ? "" : "—")) : ""}
                  {over && <span className={styles.srOnly}> (above the {POWERSCHOOL_MAX}-point max)</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
