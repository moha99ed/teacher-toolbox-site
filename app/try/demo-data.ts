// Fictional class used by the /try simulation. No real students.

export type SourceId = "classroom" | "deltamath" | "sheets";
export type Flag = "missing" | "late";

export type SourceRow = {
  name: string; // as the source platform displays it
  score: number | null; // points, or a percentage for DeltaMath
  flags: Flag[];
};

export type Source = {
  id: SourceId;
  label: string;
  assignment: string;
  sourceMax: number; // 20 points, or 100 for percentages
  isPercent: boolean;
  hint: string; // what the sample shows off
  rows: SourceRow[];
};

export const POWERSCHOOL_MAX = 20;
export const POWERSCHOOL_ASSIGNMENT = "Unit 4 Lab: Forces";

// PowerSchool lists students by last name. "Bao Nguyen" has no copied grade.
export const ROSTER = [
  "Adams, Grace",
  "Baker, Noah",
  "Chen, Lily",
  "Diaz, Mateo",
  "Evans, Chloe",
  "Foster, Liam",
  "Garcia, Sofia",
  "Hughes, Ethan",
  "Ito, Hana",
  "Johnson, Marcus",
  "Kim, Daniel",
  "Lopez, Ava",
  "Nguyen, Bao",
];

// Base points out of 20, shared by every source so results are comparable.
const BASE: { first: string; last: string; points: number | null; flags: Flag[] }[] = [
  { first: "Ava", last: "Lopez", points: 18, flags: [] },
  { first: "Chloe", last: "Evans", points: 17, flags: [] },
  { first: "Daniel", last: "Kim", points: 12, flags: [] },
  { first: "Ethan", last: "Hughes", points: 14, flags: ["late"] },
  { first: "Grace", last: "Adams", points: 18, flags: [] },
  { first: "Hana", last: "Ito", points: 20, flags: [] },
  { first: "Liam", last: "Foster", points: 19, flags: [] },
  { first: "Lily", last: "Chen", points: 20, flags: [] },
  { first: "Marcus", last: "Johnson Jr.", points: 17, flags: [] },
  { first: "Mateo", last: "Diaz", points: null, flags: ["missing"] },
  { first: "Noah", last: "Baker", points: 15, flags: ["late"] },
  { first: "Sam", last: "Rivera", points: 19, flags: [] }, // not on the PowerSchool roster
  { first: "Sofia", last: "Garcia", points: 16, flags: [] },
];

export const SOURCES: Record<SourceId, Source> = {
  classroom: {
    id: "classroom",
    label: "Google Classroom",
    assignment: "Unit 4 Lab: Forces",
    sourceMax: 20,
    isPercent: false,
    hint: "Points out of 20, with Missing and Late statuses.",
    rows: BASE.map((s) => ({ name: `${s.first} ${s.last}`, score: s.points, flags: s.flags })),
  },
  deltamath: {
    id: "deltamath",
    label: "DeltaMath",
    assignment: "Forces Practice Set",
    sourceMax: 100,
    isPercent: true,
    hint: "Percentages, so they need converting to a 20-point assignment.",
    // DeltaMath reports a grade but no statuses; a missing student just has no grade.
    rows: BASE.map((s) => ({
      name: `${s.first} ${s.last}`,
      score: s.points == null ? null : Math.round((s.points / 20) * 100),
      flags: [],
    })),
  },
  sheets: {
    id: "sheets",
    label: "Google Sheets",
    assignment: "Period 2 Lab Scores",
    sourceMax: 20,
    isPercent: false,
    hint: "“Last, First” names, with status words typed in column C.",
    rows: BASE.map((s) => ({ name: `${s.last}, ${s.first}`, score: s.points, flags: s.flags })),
  },
};

// Same idea as the extension: ignore suffixes and punctuation, compare last name + first name.
export function nameKey(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv)\b\.?/g, "")
    .replace(/[^a-z,\s]/g, "")
    .trim();
  let first = "";
  let last = "";
  if (cleaned.includes(",")) {
    [last, first] = cleaned.split(",").map((part) => part.trim());
  } else {
    const parts = cleaned.split(/\s+/).filter(Boolean);
    first = parts[0] ?? "";
    last = parts[parts.length - 1] ?? "";
  }
  return `${last}|${first.split(/\s+/)[0] ?? ""}`;
}
