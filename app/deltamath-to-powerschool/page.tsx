import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/deltamath-to-powerschool",
  platform: "DeltaMath",
  title: "How to Transfer DeltaMath Grades to PowerSchool",
  description:
    "Step-by-step guide to moving DeltaMath assignment grades into PowerSchool without retyping, including converting percentages to your assignment's point value.",
  shareDescription: "Copy a DeltaMath assignment's grades into PowerSchool in two clicks, converted to the right point value.",
  intro: (
    <>
      DeltaMath grades your students' practice automatically, but the grades still have to end up in
      PowerSchool. Here's how to move a whole assignment's grades at once, converted to whatever the
      PowerSchool assignment is worth.
    </>
  ),
  demoLabel: "DeltaMath · Systems of Equations",
  demoRows: [
    { name: "Garcia, Mateo", status: "ok", score: "85% → 17 / 20" },
    { name: "Kim, Hana", status: "ok", score: "100% → 20 / 20" },
    { name: "Wright, Ella", status: "ok", score: "70% → 14 / 20" },
    { name: "Osei, Kwame", status: "unmatched", score: "—" },
  ],
  why: (
    <>
      <p>
        DeltaMath shows each student's grade as a percentage. PowerSchool assignments are often worth
        10, 20 or 50 points, so typing grades in by hand means converting every score in your head
        as well as finding each student in a second tab. With several sections and weekly DeltaMath
        assignments, that's a lot of retyping and a lot of chances for a mistake.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that reads the grade table from your
        DeltaMath assignment report, converts the scores if you need it to, and enters them into
        PowerSchool for you, all inside your own browser.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Open the assignment report in DeltaMath",
      body: "In your DeltaMath teacher account, open the assignment's report: the page with a table of students and their grades.",
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects DeltaMath
          automatically. Click <strong>Copy grades</strong>.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Choose a scale and paste",
      body: (
        <>
          Open GradeBridge again and check the preview. If the PowerSchool assignment is out of 100,
          paste the grades as they are. If it's worth fewer points, choose <strong>Custom Points</strong> and set{" "}
          <strong>Raw score is out of</strong> to 100. GradeBridge usually fills in the assignment's
          point value from PowerSchool, then converts each score: on a 20-point assignment, 85% becomes
          17. Then click{" "}
          <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Grades",
      body: "Every student's DeltaMath grade, matched to the right PowerSchool row by name.",
    },
    {
      title: "Point conversion",
      body: "Percentages converted to your assignment's point value, or a 5-point scale, before anything is pasted.",
    },
    {
      title: "Name matching",
      body: "Works with separate first and last name columns, and still matches when one system includes a middle name.",
    },
  ],
  troubleshooting: [
    {
      label: "“No DeltaMath grades found”:",
      body: "open an assignment report that shows a table of students and their grades, then copy again.",
    },
    {
      label: "Scores look too high in PowerSchool:",
      body: "the grades were pasted as percentages into an assignment worth fewer points. Copy again and choose Custom Points in the preview before pasting.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "How do I get DeltaMath grades into PowerSchool?",
      a: "Open the assignment's report in DeltaMath, copy the grades with GradeBridge, then open the same assignment's score-entry page in PowerSchool and paste. GradeBridge matches each student by name and enters the scores for you.",
    },
    {
      q: "DeltaMath gives percentages, but my PowerSchool assignment is out of 20. What do I do?",
      a: "Choose Custom Points in the GradeBridge preview and set “Raw score is out of” to 100. It converts each percentage to the assignment's point value (85% becomes 17 out of 20), and it can detect that point value from PowerSchool.",
    },
    {
      q: "What if a student's name is different in DeltaMath and PowerSchool?",
      a: "GradeBridge handles differences like middle names automatically. If it still can't find a match, it flags that student in the preview so you can enter the score by hand.",
    },
    {
      q: "What happens if two students share a name?",
      a: "GradeBridge flags students who share a name so you can confirm which score belongs to whom instead of having it guessed.",
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
  closing: "Free for your first 10 pastes. Works with Google Classroom, Quizizz and Schoology too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function DeltaMathToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
