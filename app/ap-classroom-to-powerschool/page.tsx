import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/ap-classroom-to-powerschool",
  platform: "AP Classroom",
  title: "How to Transfer AP Classroom Scores to PowerSchool",
  description:
    "Step-by-step guide to moving AP Classroom progress check and assignment scores into PowerSchool without retyping, including converting points to your gradebook's scale.",
  shareDescription: "Copy AP Classroom scores from the Enter Scores page into PowerSchool in two clicks.",
  intro: (
    <>
      AP Classroom keeps your students' progress check and free-response scores on College Board's
      site, and PowerSchool needs them too. Here's how to move a whole assignment's scores at once,
      as points or rescaled to fit your gradebook.
    </>
  ),
  demoLabel: "AP Classroom · Unit 2 FRQ",
  demoRows: [
    { name: "Shah, Priya", status: "ok", score: "14 / 18" },
    { name: "Coleman, Jordan", status: "ok", score: "16 / 18" },
    { name: "Mendez, Luis", status: "ok", score: "11 / 18" },
    { name: "Park, Grace", status: "unmatched", score: "—" },
  ],
  why: (
    <>
      <p>
        AP teachers score free-response questions and progress checks in AP Classroom, but the
        grade that counts lives in PowerSchool. Moving it over by hand means reading each student's
        points off the Enter Scores page, finding them in a second tab, and deciding how those points
        translate to your gradebook, for every section you teach.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that reads the scores and the point total
        from the Enter Scores page, rescales them if you want, and enters them into PowerSchool for
        you, all inside your own browser.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Open the Enter Scores page in AP Classroom",
      body: (
        <>
          Open the assignment in AP Classroom and go to its <strong>Enter Scores</strong> page, where
          each student's points are listed.
        </>
      ),
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects AP Classroom
          automatically. Click <strong>Copy grades</strong>. It reads the point total from the column
          header and scrolls through the whole class by itself.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Choose a scale and paste",
      body: (
        <>
          Open GradeBridge again and check the preview. Points paste as they are, so 14 of 18 stays
          14. If the PowerSchool assignment is worth a different amount, choose{" "}
          <strong>Custom Points</strong> to convert. To record a 1–5 score, choose{" "}
          <strong>AP / 5</strong>, which converts proportionally (14 of 18 becomes 3.9). Then click{" "}
          <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Points earned",
      body: "Every scored student's points, with the point total read straight from the Enter Scores page.",
    },
    {
      title: "The whole class",
      body: "GradeBridge scrolls through long AP Classroom lists itself, so students lower down aren't missed.",
    },
    {
      title: "Rescaling",
      body: "Convert to your PowerSchool assignment's point value, or onto a proportional 1–5 scale, before pasting.",
    },
  ],
  troubleshooting: [
    {
      label: "“No grades found”:",
      body: "make sure you're on the assignment's Enter Scores page in AP Classroom, then copy again.",
    },
    {
      label: "Some students weren't copied:",
      body: "students with no response in AP Classroom are skipped. Enter their scores in PowerSchool by hand.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "How do I get AP Classroom scores into PowerSchool?",
      a: "Open the assignment's Enter Scores page in AP Classroom, copy the scores with GradeBridge, then open the same assignment's score-entry page in PowerSchool and paste. GradeBridge matches each student by name and enters the scores for you.",
    },
    {
      q: "Can GradeBridge convert scores to a 1–5 AP scale?",
      a: "Yes. Choose AP / 5 in the preview and GradeBridge converts each score proportionally, so 14 out of 18 becomes 3.9. It's a straight conversion, not the College Board's official score cutoffs, so adjust any scores by hand if you use your own cutoffs.",
    },
    {
      q: "What if the assignment is worth different points in PowerSchool?",
      a: "Choose Custom Points in the preview. GradeBridge already knows the AP Classroom point total and converts each score to the PowerSchool assignment's point value.",
    },
    {
      q: "What happens to students who didn't respond?",
      a: "Students with no response in AP Classroom aren't copied, so their PowerSchool cells are left for you to fill in.",
    },
    {
      q: "Is student data safe?",
      a: "Yes. Student names and scores are processed entirely in your browser and are never sent to GradeBridge servers.",
    },
    {
      q: "How much does it cost?",
      a: "Your first 10 pastes are free. Unlimited pastes are $5/month or $39/year.",
    },
  ],
  closing: "Free for your first 10 pastes. Works with Google Classroom, DeltaMath and Schoology too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function APClassroomToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
