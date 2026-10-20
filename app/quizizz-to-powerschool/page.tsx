import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/quizizz-to-powerschool",
  platform: "Quizizz (Wayground)",
  title: "How to Transfer Quizizz (Wayground) Grades to PowerSchool",
  description:
    "Step-by-step guide to moving Quizizz, now Wayground, quiz scores into PowerSchool without retyping, with the GradeBridge Chrome extension.",
  shareDescription: "Copy a whole Quizizz (Wayground) quiz's scores into PowerSchool in two clicks.",
  intro: (
    <>
      Quizizz, now called Wayground, scores every quiz for you, but you still have to type the
      scores into PowerSchool yourself. Here's how to move a whole quiz's scores at once, converted to
      the assignment's point value.
    </>
  ),
  demoLabel: "Wayground · Chapter 5 Review",
  demoRows: [
    { name: "Lopez, Daniela", status: "ok", score: "90% → 9 / 10" },
    { name: "Murphy, Sean", status: "ok", score: "80% → 8 / 10" },
    { name: "Ito, Kenji", status: "ok", score: "100% → 10 / 10" },
    { name: "“jake r.”", status: "unmatched", score: "—" },
  ],
  why: (
    <>
      <p>
        Wayground shows each student's result as a percentage on the quiz report. Getting those
        scores into PowerSchool by hand means reading down one list, finding each student in
        another, and converting percentages to the assignment's point value as you go. Quizzes tend
        to be frequent, so the retyping adds up fast.
      </p>
      <p>
        <strong>GradeBridge</strong> is a Chrome extension that reads the scores from your Wayground
        results page, converts them if you need it to, and enters them into PowerSchool for you,
        all inside your own browser.
      </p>
    </>
  ),
  steps: [
    COMMON_STEPS.install,
    {
      title: "Open the quiz results in Wayground",
      body: "Open the quiz's report in Wayground and wait until every participant has loaded.",
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects Wayground
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
          paste the scores as they are. If it's worth fewer points, choose <strong>Custom Points</strong> and set{" "}
          <strong>Raw score is out of</strong> to 100. GradeBridge usually fills in the assignment's
          point value from PowerSchool, then converts each score: on a 10-point assignment, 90% becomes
          9. Then click{" "}
          <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    {
      title: "Scores",
      body: "Every participant's percentage, or their raw points when the report shows them, matched to the right PowerSchool row.",
    },
    {
      title: "Point conversion",
      body: "Percentages converted to your assignment's point value, or a 5-point scale, before anything is pasted.",
    },
    {
      title: "Unmatched names flagged",
      body: "Nicknames and typos that don't match your PowerSchool roster are flagged in the preview instead of skipped silently.",
    },
  ],
  troubleshooting: [
    {
      label: "“No grades found”:",
      body: "make sure you're on the Wayground results page and every student has loaded, then copy again.",
    },
    {
      label: "Lots of students aren't matched:",
      body: "students who join with a game code type their own names, so “jake r.” won't match “Rodriguez, Jacob”. Assigning quizzes to a Wayground class that uses your roster, or one imported from Google Classroom, keeps names consistent.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "Is Quizizz the same as Wayground?",
      a: "Yes. Quizizz renamed itself Wayground. GradeBridge works with the Wayground results page, so the steps are the same whichever name you know it by.",
    },
    {
      q: "How do I get Quizizz scores into PowerSchool?",
      a: "Open the quiz's results in Wayground, copy the scores with GradeBridge, then open the same assignment's score-entry page in PowerSchool and paste. GradeBridge matches each student by name and enters the scores for you.",
    },
    {
      q: "My PowerSchool assignment is out of 10, but Wayground shows percentages. What do I do?",
      a: "Choose Custom Points in the GradeBridge preview and set “Raw score is out of” to 100. It converts each percentage to the assignment's point value, so 90% becomes 9 out of 10.",
    },
    {
      q: "Why are some students not matched?",
      a: "When students join with a game code they type their own names, which often don't match your PowerSchool roster. GradeBridge flags those students so you can enter their scores by hand. Assigning quizzes to a rostered class avoids this.",
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

export default function QuizizzToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
