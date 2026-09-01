import {
  consentAcknowledgementIds,
  consentStatementsV2,
  consentStatementsV3,
  contactChoices,
  identityChoices,
  knowledgeChoices,
  legacyConsentStatements,
  relations,
  supportingInformation,
  themes,
} from "../../share-story/research-questionnaire/config";

const primaryRecipient = process.env.SUBMISSION_EMAIL || "shareyourstory@insidemecca.net";
const backupRecipient = process.env.SUBMISSION_BACKUP_EMAIL || "insidemecca@mail2australia.net";
const recipients = Array.from(
  new Set([primaryRecipient, backupRecipient].map((value) => value.trim()).filter(Boolean)),
);
const sender = process.env.SUBMISSION_FROM || "Inside MECCA Submissions <submissions@send.insidemecca.net>";
const supabaseUrl = "https://xfoobfssfufhbgcxhbpm.supabase.co";
const maximumRequestBytes = 100_000;

type PreparedPayload = {
  website: string;
  identity_preference: string;
  preferred_name_or_pseudonym: string;
  connection_to_mecca: string;
  primary_knowledge_basis: string;
  employment_period: string;
  region: string;
  workplace_type: string;
  broad_role_category: string;
  account_text: string;
  happened_when: string;
  happened_where: string;
  role_at_time: string;
  direct_witnesses: string;
  internal_report_and_response: string;
  repeated_or_affected_others: string;
  uncertainties: string;
  hearsay_details: string;
  supporting_information: string[];
  themes: string[];
  contact_email: string;
  contact_preferences: string[];
  consent_confirmations: string[];
  publication_permission: false;
  user_agent: string;
};

type StoredSubmission = {
  submission_ref: string;
  received_at: string;
  consent_version: "current_4_v3_plain" | "current_4_v2" | "legacy_7_v1";
};

type DeliveryPatch = {
  email_delivery_status: "sent" | "failed";
  email_attempted_at: string;
  email_delivered_at: string | null;
  email_provider_message_id: string | null;
  email_delivery_error_code: string | null;
};

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "Send the questionnaire as JSON." }, { status: 400 });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumRequestBytes) {
    return Response.json({ error: "The questionnaire is too large to process." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maximumRequestBytes) {
      return Response.json({ error: "The questionnaire is too large to process." }, { status: 400 });
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "The questionnaire could not be read. Nothing was recorded." }, { status: 400 });
  }

  if (text(body.website, 200)) return Response.json({ ok: true });

  const accountText = text(body.account_text, 30000);
  const identityPreference = text(body.identity_preference, 100);
  const primaryKnowledgeBasis = text(body.primary_knowledge_basis, 200);
  const connectionToMecca = text(body.connection_to_mecca, 200);
  const contactPreferences = stringList(body.contact_preferences, 1);
  const contactPreference = contactPreferences[0] || "";
  const contactEmail = text(body.contact_email, 320);
  const selectedThemes = stringList(body.themes, themes.length);
  const selectedSupport = stringList(body.supporting_information, supportingInformation.length);
  const hasAcknowledgementPayload = body.consent_acknowledgements !== undefined;
  const hasConfirmationPayload = body.consent_confirmations !== undefined;
  const acknowledgementIds = stringList(body.consent_acknowledgements, consentAcknowledgementIds.length);
  const submittedConsentConfirmations = stringList(body.consent_confirmations, legacyConsentStatements.length);

  if (!validTextFields(body) || !validChoiceArray(body.supporting_information, supportingInformation) ||
    !validChoiceArray(body.themes, themes) || !validChoiceArray(body.contact_preferences, contactChoices) ||
    hasAcknowledgementPayload === hasConfirmationPayload ||
    (hasAcknowledgementPayload && !validChoiceArray(body.consent_acknowledgements, consentAcknowledgementIds)) ||
    (hasConfirmationPayload && !validConsentArray(body.consent_confirmations))) {
    return Response.json({ error: "One or more questionnaire fields are invalid or too long. Nothing was recorded." }, { status: 400 });
  }

  const hasV3Consent = hasAcknowledgementPayload && sameStringSet(acknowledgementIds, consentAcknowledgementIds);
  const hasV2Consent = hasConfirmationPayload && sameStringSet(submittedConsentConfirmations, consentStatementsV2);
  const hasLegacyConsent = hasConfirmationPayload && sameStringSet(submittedConsentConfirmations, legacyConsentStatements);
  const usesV3Contract = hasAcknowledgementPayload;
  const consentConfirmations = hasV3Consent
    ? [...consentStatementsV3]
    : submittedConsentConfirmations;

  if (!accountText || (!usesV3Contract && accountText.length < 20)) {
    return Response.json({ error: "Please complete the account before submitting. Nothing was recorded." }, { status: 400 });
  }
  if (!identityChoices.some(([value]) => value === identityPreference)) {
    return Response.json({ error: "Choose a valid identity preference. Nothing was recorded." }, { status: 400 });
  }
  if (!knowledgeChoices.includes(primaryKnowledgeBasis as typeof knowledgeChoices[number]) || !relations.includes(connectionToMecca as typeof relations[number])) {
    return Response.json({ error: "Choose a valid connection and knowledge basis. Nothing was recorded." }, { status: 400 });
  }
  if (!usesV3Contract && (connectionToMecca === "Prefer not to say" || primaryKnowledgeBasis === "Mixed or unsure")) {
    return Response.json({ error: "Choose options supported by this version of the questionnaire. Nothing was recorded." }, { status: 400 });
  }
  if (contactPreferences.length !== 1 || !contactChoices.includes(contactPreference as typeof contactChoices[number])) {
    return Response.json({ error: "Choose one contact preference. Nothing was recorded." }, { status: 400 });
  }
  if (identityPreference === "Anonymous" && (contactEmail || contactPreference !== contactChoices[0])) {
    return Response.json({ error: "Anonymous submissions cannot include contact details. Nothing was recorded." }, { status: 400 });
  }
  if (identityPreference === "Anonymous" && text(body.preferred_name_or_pseudonym, 200)) {
    return Response.json({ error: "Choose pseudonymous if you want to include a preferred name or pseudonym. Nothing was recorded." }, { status: 400 });
  }
  if (identityPreference === "Confidential contact" && contactPreference === contactChoices[0]) {
    return Response.json({ error: "Confidential contact requires an email contact option. Nothing was recorded." }, { status: 400 });
  }
  if (contactPreference !== contactChoices[0] && !validEmail(contactEmail)) {
    return Response.json({ error: "Enter a valid personal email for the selected contact option. Nothing was recorded." }, { status: 400 });
  }
  if (contactPreference === contactChoices[0] && contactEmail) {
    return Response.json({ error: "Remove the email address or permit email contact. Nothing was recorded." }, { status: 400 });
  }
  if (!selectedThemes.every(value => themes.includes(value as typeof themes[number])) || !selectedSupport.every(value => supportingInformation.includes(value as typeof supportingInformation[number]))) {
    return Response.json({ error: "Choose valid research themes and supporting-information options. Nothing was recorded." }, { status: 400 });
  }

  if ((!hasV3Consent && !hasV2Consent && !hasLegacyConsent) || body.publication_permission !== false) {
    return Response.json({ error: "Complete every consent acknowledgement. Publication permission is not collected by this form. Nothing was recorded." }, { status: 400 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return Response.json({ error: "Submission storage is temporarily unavailable. Nothing was recorded." }, { status: 503 });
  }

  const payload: PreparedPayload = {
    website: "",
    identity_preference: identityPreference,
    preferred_name_or_pseudonym: text(body.preferred_name_or_pseudonym, 200),
    connection_to_mecca: connectionToMecca,
    primary_knowledge_basis: primaryKnowledgeBasis,
    employment_period: text(body.employment_period, 250),
    region: text(body.region, 250),
    workplace_type: text(body.workplace_type, 120),
    broad_role_category: text(body.broad_role_category, 250),
    account_text: accountText,
    happened_when: text(body.happened_when, 2000),
    happened_where: text(body.happened_where, 2000),
    role_at_time: text(body.role_at_time, 2000),
    direct_witnesses: text(body.direct_witnesses, 5000),
    internal_report_and_response: text(body.internal_report_and_response, 10000),
    repeated_or_affected_others: text(body.repeated_or_affected_others, 5000),
    uncertainties: text(body.uncertainties, 5000),
    hearsay_details: text(body.hearsay_details, 5000),
    supporting_information: selectedSupport,
    themes: selectedThemes,
    contact_email: contactEmail,
    contact_preferences: contactPreferences,
    consent_confirmations: consentConfirmations,
    publication_permission: false,
    user_agent: request.headers.get("user-agent")?.slice(0, 1000) || "",
  };

  let stored: StoredSubmission;
  try {
    const rpcName = hasV3Consent ? "submit_research_questionnaire_v3" : "submit_research_questionnaire_v2";
    const storageResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/${rpcName}`, {
      method: "POST",
      headers: supabaseHeaders(serviceRoleKey),
      body: JSON.stringify({ payload }),
    });
    if (!storageResponse.ok) {
      console.error("questionnaire_storage_failed", { status: storageResponse.status });
      return Response.json({ error: "The questionnaire could not be recorded. Nothing was recorded. Your answers remain on this page." }, { status: 502 });
    }

    const result: unknown = await storageResponse.json();
    if (!isStoredSubmission(result)) {
      console.error("questionnaire_storage_response_invalid");
      return Response.json({ error: "The questionnaire was sent, but its private reference could not be confirmed. Please copy your answers and contact the project before retrying." }, { status: 502 });
    }
    stored = { ...result, received_at: new Date(result.received_at).toISOString() };
  } catch {
    console.error("questionnaire_storage_request_failed");
    return Response.json({ error: "The questionnaire could not be recorded. Nothing was recorded. Your answers remain on this page." }, { status: 502 });
  }

  const attemptedAt = new Date().toISOString();
  const apiKey = process.env.RESEND_API_KEY;
  let emailDelivered = false;
  let providerMessageId: string | null = null;
  let deliveryErrorCode: string | null = null;

  if (!apiKey) {
    deliveryErrorCode = "configuration_missing";
  } else {
    try {
      const emailPayload: Record<string, unknown> = {
        from: sender,
        to: recipients,
        subject: `Confidential contributor account ${stored.submission_ref}`,
        text: buildCanonicalQuestionnaire(payload, stored),
      };
      if (contactEmail) emailPayload.reply_to = contactEmail;
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
      if (emailResponse.ok) {
        emailDelivered = true;
        const providerResult: unknown = await emailResponse.json().catch(() => null);
        if (providerResult && typeof providerResult === "object" && "id" in providerResult && typeof providerResult.id === "string") {
          providerMessageId = providerResult.id.slice(0, 200);
        }
      } else {
        deliveryErrorCode = `provider_http_${emailResponse.status}`;
      }
    } catch {
      deliveryErrorCode = "provider_request_failed";
    }
  }

  const deliveryPatch: DeliveryPatch = {
    email_delivery_status: emailDelivered ? "sent" : "failed",
    email_attempted_at: attemptedAt,
    email_delivered_at: emailDelivered ? new Date().toISOString() : null,
    email_provider_message_id: providerMessageId,
    email_delivery_error_code: deliveryErrorCode,
  };
  await recordEmailDelivery(serviceRoleKey, stored.submission_ref, deliveryPatch);

  if (!emailDelivered) {
    console.error("questionnaire_email_delivery_failed", { submissionRef: stored.submission_ref, code: deliveryErrorCode });
  }

  return Response.json({
    ok: true,
    submissionRef: stored.submission_ref,
    receivedAt: stored.received_at,
    emailDelivered,
  });
}

async function recordEmailDelivery(serviceRoleKey: string, submissionRef: string, patch: DeliveryPatch) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/questionnaire_submissions?submission_ref=eq.${encodeURIComponent(submissionRef)}`, {
      method: "PATCH",
      headers: { ...supabaseHeaders(serviceRoleKey), Prefer: "return=minimal" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) console.error("questionnaire_email_audit_update_failed", { submissionRef, status: response.status });
  } catch {
    console.error("questionnaire_email_audit_request_failed", { submissionRef });
  }
}

function supabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function buildCanonicalQuestionnaire(payload: PreparedPayload, stored: StoredSubmission) {
  const entries: Array<[string, string | string[]]> = [
    ["Identity preference", payload.identity_preference],
    ["Preferred name or pseudonym", payload.preferred_name_or_pseudonym],
    ["Connection to MECCA", payload.connection_to_mecca],
    ["Primary knowledge basis", payload.primary_knowledge_basis],
    ["Approximate employment period", payload.employment_period],
    ["Broad region", payload.region],
    ["Workplace type", payload.workplace_type],
    ["Broad role category", payload.broad_role_category],
    ["What happened", payload.account_text],
    ["Approximately when", payload.happened_when],
    ["Where", payload.happened_where],
    ["Role at the time", payload.role_at_time],
    ["Direct witnesses", payload.direct_witnesses],
    ["Internal report and response", payload.internal_report_and_response],
    ["Repeated or affected others", payload.repeated_or_affected_others],
    ["Uncertainties", payload.uncertainties],
    ["Hearsay details", payload.hearsay_details],
    ["Supporting information", payload.supporting_information],
    ["Research themes", payload.themes],
    ["Contact email", payload.contact_email],
    ["Contact preference", payload.contact_preferences],
    ["Consent confirmations", payload.consent_confirmations],
    ["Consent version", stored.consent_version],
    ["Publication permission", "Not granted"],
  ];
  const answers = entries.map(([label, value]) => {
    const formatted = Array.isArray(value) ? (value.length ? `\n- ${value.join("\n- ")}` : "Not provided") : (value || "Not provided");
    return `${label}: ${formatted}`;
  });
  return [
    "INSIDE MECCA RESEARCH QUESTIONNAIRE",
    "",
    `Supabase submission reference: ${stored.submission_ref}`,
    `Supabase received timestamp: ${stored.received_at}`,
    "",
    ...answers,
  ].join("\n");
}

function isStoredSubmission(value: unknown): value is StoredSubmission {
  if (!value || typeof value !== "object") return false;
  const stored = value as Partial<StoredSubmission>;
  return typeof stored.submission_ref === "string"
    && typeof stored.received_at === "string"
    && !Number.isNaN(Date.parse(stored.received_at))
    && (stored.consent_version === "current_4_v3_plain" || stored.consent_version === "current_4_v2" || stored.consent_version === "legacy_7_v1");
}

function sameStringSet(values: string[], expected: readonly string[]) {
  return values.length === expected.length && expected.every(value => values.includes(value));
}

function validTextFields(body: Record<string, unknown>) {
  const limits: Array<[string, number]> = [
    ["website", 200],
    ["identity_preference", 100],
    ["preferred_name_or_pseudonym", 200],
    ["connection_to_mecca", 200],
    ["primary_knowledge_basis", 200],
    ["employment_period", 250],
    ["region", 250],
    ["workplace_type", 120],
    ["broad_role_category", 250],
    ["account_text", 30000],
    ["happened_when", 2000],
    ["happened_where", 2000],
    ["role_at_time", 2000],
    ["direct_witnesses", 5000],
    ["internal_report_and_response", 10000],
    ["repeated_or_affected_others", 5000],
    ["uncertainties", 5000],
    ["hearsay_details", 5000],
    ["contact_email", 320],
  ];
  return limits.every(([field, maximum]) => body[field] == null || (typeof body[field] === "string" && body[field].trim().length <= maximum));
}

function validChoiceArray(value: unknown, allowed: readonly string[]) {
  if (!Array.isArray(value) || value.length > allowed.length) return false;
  if (!value.every(item => typeof item === "string" && allowed.includes(item.trim()))) return false;
  return new Set(value.map(item => item.trim())).size === value.length;
}

function validConsentArray(value: unknown) {
  if (!Array.isArray(value) || value.length > legacyConsentStatements.length) return false;
  if (!value.every(item => typeof item === "string" && item.trim().length <= 1000)) return false;
  return new Set(value.map(item => item.trim())).size === value.length;
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function stringList(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(item => typeof item === "string").map(item => item.trim()).filter(Boolean))].slice(0, maxItems);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
