import {
  COMMON_STEPS,
  POWERSCHOOL_KEYPAD_TIP,
  PlatformGuide,
  PlatformGuideContent,
  ShortcutKeys,
  platformGuideMetadata,
} from "../components/platform-guide";

const CONTENT: PlatformGuideContent = {
  path: "/google-classroom-to-powerschool",
  platform: "Google Classroom",
  title: "How to Transfer Google Classroom Grades to PowerSchool",
  description:
    "Step-by-step guide to moving Google Classroom grades into PowerSchool without retyping, including Missing and Late flags, with the GradeBridge Chrome extension.",
  shareDescription: "Copy a whole assignment's scores from Google Classroom into PowerSchool in two clicks.",
  intro: (
    <>
      Google Classroom and PowerSchool don't talk to each other unless your district has set up a sync.
      Here's how to move a whole assignment's scores, including Missing and Late flags, in about the
      time it takes to type one.
    </>
  ),
  demoLabel: "Classroom · Unit 3 Quiz",
  demoRows: [
    { name: "Alvarez, Sofia", status: "ok", score: "47 / 50" },
    { name: "Brooks, Tyler", status: "late", score: "41 / 50" },
    { name: "Nguyen, Linh", status: "ok", score: "50 / 50" },
    { name: "Hassan, Omar", status: "missing", score: "—" },
  ],
  why: (
    <>
      <p>
        Most teachers who grade in Google Classroom still have to put the official grade in
        PowerSchool. Doing that by hand means flipping between two tabs, finding each student,
        typing each score, and remembering who was missing or late. For a class of 30 it's a
        few minutes per assignment. Across five sections and a full quarter, it adds up to hours,
        and every retyped number is a chance for a mistake.
      </p>
      <p>
        <strong>Google's built-in option:</strong> Google Classroom can export grades to
        PowerSchool, but your district administrator has to turn it on, and it isn't included in
        every Google Workspace for Education edition. If you don't see a grade export option in
        your Classroom settings, your district probably hasn't enabled it.
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
      title: "Open the assignment in Google Classroom",
      body: (
        <>
          Go to the assignment's <strong>Student work</strong> page, or open the class's{" "}
          <strong>Grades</strong> tab.
        </>
      ),
    },
    {
      title: "Copy the grades",
      body: (
        <>
          Click the GradeBridge icon or press <ShortcutKeys />. GradeBridge detects Google Classroom
          automatically. Choose whether to include status tags and comments, then click{" "}
          <strong>Copy grades</strong>.
        </>
      ),
    },
    COMMON_STEPS.openPowerSchool,
    {
      title: "Check the preview and paste",
      body: (
        <>
          Open GradeBridge again. The preview shows each student's score and status, and flags anyone
          who couldn't be matched. Click <strong>Paste into PowerSchool</strong>.
        </>
      ),
    },
    COMMON_STEPS.spotCheck,
  ],
  carriesOver: [
    { title: "Scores", body: "Every graded student's points, matched to the right PowerSchool row by name." },
    { title: "Missing & Late", body: "Classroom's missing and turned-in-late statuses become PowerSchool flags." },
    { title: "Comments", body: "Added only where you haven't already written your own PowerSchool comment." },
  ],
  troubleshooting: [
    {
      label: "“No grades found”:",
      body: "make sure you're on the assignment's Student work page or the class Grades tab in Classroom, then reload the page and copy again.",
    },
    POWERSCHOOL_KEYPAD_TIP,
  ],
  faq: [
    {
      q: "Can Google Classroom sync grades to PowerSchool automatically?",
      a: "Google offers a grade export to PowerSchool, but your district administrator has to set it up and it isn't included in every Google Workspace for Education edition. If your district hasn't turned it on, GradeBridge lets you move grades yourself from your own browser, with no setup on the district side.",
    },
    {
      q: "Do Missing and Late statuses transfer from Google Classroom?",
      a: "Yes. When status tags are included, GradeBridge sets the matching Missing and Late flags in PowerSchool along with the score.",
    },
    {
      q: "What if student names don't match between Classroom and PowerSchool?",
      a: "GradeBridge matches students by name and shows a preview before pasting. Any student it can't match is flagged so you can enter that score by hand instead of having it skipped silently.",
    },
    {
      q: "Will it overwrite comments I've already written in PowerSchool?",
      a: "No. Comments copied from Classroom are only added to cells that don't already have your own comment.",
    },
    {
      q: "Is this allowed under FERPA?",
      a: "GradeBridge processes student names and grades entirely in your browser and never sends them to our servers. Check your district's policy on Chrome extensions; your admin can allow GradeBridge from the Google Admin console if extensions are restricted.",
    },
    {
      q: "How much does it cost?",
      a: "Your first 10 pastes are free. Unlimited pastes are $5/month or $39/year.",
    },
  ],
  closing: "Free for your first 10 pastes. Works with DeltaMath, Quizizz and Schoology too.",
};

export const metadata = platformGuideMetadata(CONTENT);

export default function ClassroomToPowerSchoolPage() {
  return <PlatformGuide content={CONTENT} />;
}
