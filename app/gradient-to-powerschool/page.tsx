import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/gradient-to-powerschool",
  platform: "Gradient (GradeCam)",
  title: "How to Transfer Gradient (GradeCam) Scores to PowerSchool",
  description:
    "Step-by-step guide to moving scanned test scores from Gradient by GradeCam into the PowerSchool gradebook without retyping, with the GradeBridge Chrome extension.",
  shareDescription: "Copy a whole Gradient (GradeCam) assessment's scores into PowerSchool in two clicks.",
  intro: (
    <>
      Gradient scores a stack of bubble sheets in seconds, then the scores still have to be typed
      into PowerSchool. Here's how to move a whole assessment's scores at once, converted to the
      assignment's point value.
    </>
  ),
  demoLabel: "Gradient · Chapter 7 Test",
  demoRows: [
    { name: "Ortiz, Gabriel", status: "ok", score: "22 / 25" },
    { name: "Fischer, Nora", status: "ok", score: "19 / 25" },
    { name: "Adeyemi, Tolu", status: "ok", score: "25 / 25" },
    { name: "Morales, Eli", status: "unmatched", score: "—" },
  ],
  why: (
    <>
      <p>
        Gradient by GradeCam turns grading paper tests into a few seconds of scanning. Then comes
        the slow part: reading each result off the screen and typing it into the right row in
        PowerSchool, for every class that took the test.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that reads the scores from your Gradient
        results page, converts them if you need it to, and enters them into PowerSchool for you,
        all inside your own browser.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Open the results in Gradient",
      body: "Open the assessment's results page in Gradient and wait until every student has loaded.",
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects Gradient
          automatically. Click <strong>Copy grades</strong>. It scrolls through the whole class by
          itself.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Choose a scale and paste",
      body: (
        <>
          Open GradeBridge again and check the preview. When Gradient shows points, like 22/25, they
          paste as they are. If the scores are percentages and the PowerSchool assignment isn't out of
          100, choose <strong>Custom Points</strong> and set <strong>Raw score is out of</strong> to
          100 so GradeBridge converts each one. Then click <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Scores",
      body: "Every scanned student's score, as points when Gradient shows them or as a percentage.",
    },
    {
      title: "Point conversion",
      body: "Scores converted to your PowerSchool assignment's point value, or a 5-point scale, before anything is pasted.",
    },
    {
      title: "The whole class",
      body: "GradeBridge scrolls through long Gradient result lists itself, so students lower down aren't missed.",
    },
  ],
  troubleshooting: [
    {
      label: "“No grades found”:",
      body: "make sure you're on the Gradient results page and every student has loaded, then copy again.",
    },
    {
      label: "Scores look too high in PowerSchool:",
      body: "percentages were pasted into an assignment worth fewer points. Copy again and choose Custom Points in the preview before pasting.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "Is Gradient the same as GradeCam?",
      a: "Gradient is GradeCam's assessment platform for scanning and scoring tests. GradeBridge works on Gradient's results pages, so the steps are the same whichever name you know it by.",
    },
    {
      q: "How do I get Gradient scores into PowerSchool?",
      a: "Open the assessment's results in Gradient, copy the scores with GradeBridge, then open the same assignment's score-entry page in PowerSchool and paste. GradeBridge matches each student by name and enters the scores for you.",
    },
    {
      q: "Gradient shows percentages, but my PowerSchool assignment is out of 25. What do I do?",
      a: "Choose Custom Points in the GradeBridge preview and set “Raw score is out of” to 100. GradeBridge converts each percentage to the assignment's point value, so 88% becomes 22 out of 25.",
    },
    {
      q: "What if a student isn't matched?",
      a: "GradeBridge flags any student it can't match to your PowerSchool roster, so you can enter that score by hand instead of having it skipped silently.",
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
  closing: "Free for your first 10 pastes. Works with Google Classroom, Schoology and Google Sheets too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function GradientToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
