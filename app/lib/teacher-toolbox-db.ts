type SupabaseInsertable = Record<string, unknown>;

export type ApprovedReview = {
  id: string;
  name: string | null;
  role: string | null;
  tool: string | null;
  rating: number;
  body: string;
  created_at: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return {
    url: SUPABASE_URL,
    key: SUPABASE_SERVICE_ROLE_KEY,
  };
}

async function supabaseRest<T>(
  endpoint: string,
  method: "GET" | "POST",
  body?: unknown
): Promise<T> {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${endpoint}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: method === "POST" ? "return=minimal" : "return=representation",
    },
    cache: "no-store",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${raw}`);
  }

  if (method === "POST") {
    return {} as T;
  }

  return (await response.json()) as T;
}

export async function insertIssueReport(payload: SupabaseInsertable) {
  await supabaseRest("issue_reports", "POST", payload);
}

export async function insertReview(payload: SupabaseInsertable) {
  await supabaseRest("reviews", "POST", payload);
}

export async function listApprovedReviews(limit = 24) {
  const query =
    `reviews?approved=eq.true` +
    `&select=id,name,role,tool,rating,body,created_at` +
    `&order=created_at.desc` +
    `&limit=${encodeURIComponent(String(limit))}`;

  return supabaseRest<ApprovedReview[]>(query, "GET");
}
