const supabaseUrl = "https://xfoobfssfufhbgcxhbpm.supabase.co";

export const submissionStatuses = ["received", "triage", "reviewing", "follow_up", "closed", "archived"] as const;
export const verificationStatuses = ["unverified", "checking", "partly_corroborated", "corroborated", "conflicting", "not_for_publication"] as const;

export type SubmissionRecord = {
  id: number;
  submission_ref: string;
  received_at: string;
  status: typeof submissionStatuses[number];
  identity_preference: string | null;
  preferred_name_or_pseudonym: string | null;
  connection_to_mecca: string;
  primary_knowledge_basis: string | null;
  employment_period: string | null;
  region: string | null;
  workplace_type: string | null;
  broad_role_category: string | null;
  account_text: string;
  happened_when: string | null;
  happened_where: string | null;
  role_at_time: string | null;
  direct_witnesses: string | null;
  internal_report_and_response: string | null;
  repeated_or_affected_others: string | null;
  uncertainties: string | null;
  hearsay_details: string | null;
  supporting_information: string[];
  themes: string[];
  contact_email: string | null;
  contact_preferences: string[];
  consent_confirmations: string[];
  consent_version: string;
  publication_permission: boolean;
  email_delivery_status: string;
  email_attempted_at: string | null;
  email_delivered_at: string | null;
  email_provider_message_id: string | null;
  email_delivery_error_code: string | null;
  evidence_provided: boolean;
  verification_status: string;
  risk_or_safeguarding_flag: boolean;
  follow_up_required: boolean;
  assigned_reviewer: string | null;
  internal_notes: string | null;
  source: string;
  user_agent: string | null;
};

export class SubmissionsConfigurationError extends Error {}

function serviceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new SubmissionsConfigurationError("Private database access is not configured yet.");
  return key;
}

async function supabaseRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const key = serviceRoleKey();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!response.ok) throw new Error("The private submissions database could not be loaded.");
  return response;
}

export async function fetchSubmissions(): Promise<SubmissionRecord[]> {
  const response = await supabaseRequest("questionnaire_submissions?select=*&order=received_at.desc&limit=500");
  return response.json() as Promise<SubmissionRecord[]>;
}

export async function fetchSubmission(id: number): Promise<SubmissionRecord | null> {
  const response = await supabaseRequest(`questionnaire_submissions?select=*&id=eq.${id}&limit=1`);
  const records = await response.json() as SubmissionRecord[];
  return records[0] || null;
}

export async function updateSubmission(id: number, patch: Partial<SubmissionRecord>): Promise<void> {
  await supabaseRequest(`questionnaire_submissions?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  });
}
