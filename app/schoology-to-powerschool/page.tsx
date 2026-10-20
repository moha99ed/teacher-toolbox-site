import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/schoology-to-powerschool",
  platform: "Schoology",
  title: "How to Transfer Schoology Grades to PowerSchool",
  description:
    "Step-by-step guide to moving Schoology assignment grades into the PowerSchool gradebook without retyping, with the GradeBridge Chrome extension.",
  shareDescription: "Copy a whole Schoology assignment's grades into PowerSchool in two clicks.",
  intro: (
    <>
      Schoology and PowerSchool only share grades if your district has set up a sync between them.
      Here's how to move a whole assignment's grades yourself, with each score keeping its point
      value, in about the time it takes to type one.
    </>
  ),
  demoLabel: "Schoology · Lab Report 4",
  demoRows: [
    { name: "Price, Ava", status: "ok", score: "18 / 20" },
    { name: "Johnson, Marcus Jr.", status: "ok", score: "17 / 20" },
    { name: "Dubois, Léa", status: "ok", score: "20 / 20" },
    { name: "Tran, Bao", status: "unmatched", score: "—" },
  ],
  why: (
    <>
      <p>
        If you grade in Schoology but your school's official gradebook is PowerSchool, every
        assignment gets graded twice: once where students turned it in, and again by hand in
        PowerSchool. That means scrolling a long Schoology list, finding each student in another tab,
        and retyping each score, for every section.
      </p>
      <p>
        <strong>The built-in option:</strong> PowerSchool owns Schoology and offers a grade sync
        between the two, but your district has to set it up. If grades don't show up in PowerSchool
        on their own, your district probably hasn't turned it on.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that does the copy and paste for you,
        from your own browser, with nothing for IT to set up.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Open the assignment in Schoology",
      body: "Open the assignment so the list of students and their grades is showing.",
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects Schoology
          automatically. Click <strong>Copy grades</strong> and wait a moment: GradeBridge scrolls
          through the whole list by itself, so you don't need to scroll down first.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Check the preview and paste",
      body: (
        <>
          Open GradeBridge again. Scores keep their Schoology point values, so if the PowerSchool
          assignment is worth the same, paste them as they are. If it's worth a different amount,
          choose <strong>Custom Points</strong> and GradeBridge converts each score; both point values
          are usually filled in for you. Then click <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Scores and point values",
      body: "Every graded student's score, with its point value, so 17 / 20 in Schoology stays 17 / 20 in PowerSchool.",
    },
    {
      title: "The whole class",
      body: "GradeBridge scrolls through long Schoology lists itself, so students lower down aren't missed.",
    },
    {
      title: "Name matching",
      body: "Matches through middle names, suffixes like Jr. or III, nicknames in parentheses and accented letters.",
    },
  ],
  troubleshooting: [
    {
      label: "“No Schoology grades found”:",
      body: "open the assignment so students and their grades are visible, then copy again.",
    },
    {
      label: "Some students weren't copied:",
      body: "students without a grade in Schoology (shown as --) are skipped. Grade them in Schoology first, or enter them in PowerSchool by hand.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "Does Schoology sync grades to PowerSchool automatically?",
      a: "Only if your district has set up the sync between Schoology and PowerSchool. If it hasn't, GradeBridge lets you move grades yourself from your own browser, with no setup on the district side.",
    },
    {
      q: "How do I get Schoology grades into PowerSchool?",
      a: "Open the assignment in Schoology, copy the grades with GradeBridge, then open the same assignment's score-entry page in PowerSchool and paste. GradeBridge matches each student by name and enters the scores for you.",
    },
    {
      q: "What if the assignment is worth different points in PowerSchool?",
      a: "Choose Custom Points in the GradeBridge preview. GradeBridge already knows each Schoology score's point value and can usually detect the PowerSchool one, so it converts the scores for you.",
    },
    {
      q: "Do Missing and Late statuses copy from Schoology?",
      a: "No. GradeBridge copies Schoology scores, not statuses, so set any Missing or Late flags in PowerSchool after pasting.",
    },
    {
      q: "Is student data safe?",
      a: "Yes. Student names and grades are processed entirely in your browser and are never sent to GradeBridge servers.",
    },
    {
      q: "How much does it cost?",
      a: "Your first 10 pastes are free. Unlimited pastes are $5/month or $39/year.",
    },
  ],
  closing: "Free for your first 10 pastes. Works with Google Classroom, DeltaMath and Quizizz too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function SchoologyToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
