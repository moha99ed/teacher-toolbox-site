import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/google-sheets-to-powerschool",
  platform: "Google Sheets",
  title: "How to Import Grades from Google Sheets (or Excel) into PowerSchool",
  description:
    "Step-by-step guide to copying grades from a Google Sheets or Excel spreadsheet into PowerSchool, including Missing and Late flags and letter grades, with GradeBridge.",
  shareDescription: "Copy a column of grades from Google Sheets or Excel into PowerSchool in two clicks.",
  intro: (
    <>
      PowerSchool won't take a column pasted from a spreadsheet, so grades you keep in Google Sheets
      usually get typed in one at a time. Here's how to move a whole column at once, with Missing and
      Late flags, and the same trick for Excel.
    </>
  ),
  demoLabel: "Sheets · Period 2 Labs",
  demoRows: [
    { name: "Rivera, Ana", status: "ok", score: "18 / 20" },
    { name: "Lee, Sam", status: "late", score: "15 / 20" },
    { name: "Novak, Iris", status: "ok", score: "19 / 20" },
    { name: "Bello, Tunde", status: "missing", score: "—" },
  ],
  why: (
    <>
      <p>
        Lots of teachers keep scores in a spreadsheet first: lab and rubric totals, curved quiz
        results, participation, or grades exported from another tool. Getting them into PowerSchool
        still means reading down the sheet and typing each score into the right row.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that reads the cells you select, matches
        each name to your PowerSchool roster, and enters the scores for you. Your spreadsheet isn't
        changed.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Lay out your sheet",
      body: (
        <>
          Put one student per row, with the name in one column (or first and last name in two
          columns side by side) and the score to its right. A header row is fine. To flag a student,
          type a status like <strong>Missing</strong>, <strong>Late</strong>, <strong>Exempt</strong>,{" "}
          <strong>Absent</strong> or <strong>Incomplete</strong> in the score cell or the cell just
          after it.
        </>
      ),
    },
    {
      title: "Select the names and scores",
      body: "Highlight from the first name down to the last score. Make the score column the last column with numbers in your selection, so GradeBridge doesn't pick up a different column by mistake.",
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects Google Sheets
          automatically. Click <strong>Copy grades</strong>. If it asks you to, press{" "}
          <strong>Ctrl+C</strong> (<strong>⌘+C</strong> on Mac) with the cells still selected and click{" "}
          <strong>Copy grades</strong> again.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Choose a scale and paste",
      body: (
        <>
          Open GradeBridge again and check the preview. Scores paste exactly as you typed them. If
          your sheet uses a different total than the PowerSchool assignment, choose{" "}
          <strong>Custom Points</strong> and set <strong>Raw score is out of</strong> to your sheet's
          total. For letter grades, choose <strong>Letter grades</strong> and set the percentage for
          each letter. Then click <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Scores",
      body: "Numbers paste exactly as typed, or converted to the assignment's point value if you choose.",
    },
    {
      title: "Status flags",
      body: "Missing, Late, Exempt (or Excused), Absent, Incomplete and Collected become PowerSchool flags.",
    },
    {
      title: "Letter grades",
      body: "A through F, with pluses and minuses, mapped to the percentages you choose before pasting.",
    },
  ],
  troubleshooting: [
    {
      label: "“Select the Name + Score columns”:",
      body: "highlight the names and scores, press Ctrl+C (⌘+C on Mac) and click Copy grades again. Chrome may ask once for permission to read your clipboard.",
    },
    {
      label: "The wrong numbers were copied:",
      body: "GradeBridge uses the right-most column with numbers in your selection. Select only the name and score columns, or move notes and other number columns out of the way.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "How do I import grades from Google Sheets into PowerSchool?",
      a: "Select the name and score columns in your sheet, copy them with GradeBridge, then open the assignment's score-entry page in PowerSchool and paste. GradeBridge matches each name to your roster and enters the scores for you.",
    },
    {
      q: "Can I paste grades from Excel into PowerSchool?",
      a: "Yes. Copy the name and score cells in Excel (or Numbers), open the assignment in PowerSchool, switch GradeBridge's paste section to Clipboard and paste. Chrome asks once for permission to read your clipboard.",
    },
    {
      q: "How do I mark students as Missing or Late?",
      a: "Type Missing, Late, Exempt, Absent or Incomplete in the score cell or the cell right after it. GradeBridge sets the matching flag in PowerSchool.",
    },
    {
      q: "Does it work with letter grades?",
      a: "Yes. Choose Letter grades in the preview and set the percentage for each letter, and GradeBridge pastes those percentages.",
    },
    {
      q: "Is student data safe?",
      a: "Yes. GradeBridge only reads the cells you select, never changes your spreadsheet, and processes names and grades in your browser without sending them to our servers.",
    },
    {
      q: "How much does it cost?",
      a: "Your first 10 pastes are free. Unlimited pastes are $5/month or $39/year.",
    },
  ],
  closing: "Free for your first 10 pastes. Works with Excel, Google Classroom and Schoology too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function GoogleSheetsToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
