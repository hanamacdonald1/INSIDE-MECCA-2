"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ResponsiveTable } from "./ResponsiveTable";
import { SitePage, PageHero } from "../site-shell";
import { recordContentAssist, trackFunnelEvent } from "../analytics";
import { AudienceInsightQuestion } from "../audience-insight-question";
import {
  consentAcknowledgements,
  contactChoices,
  identityChoices,
  knowledgeChoices,
  relations,
  supportingInformation,
} from "../share-story/research-questionnaire/config";

const sections = [
  { number: "01", label: "Privacy and contact", detail: "v3_privacy" },
  { number: "02", label: "Your story", detail: "v3_story" },
  { number: "03", label: "Check and send", detail: "v3_review" },
] as const;

const draftKey = "inside_mecca_questionnaire_draft_v2";
const legacyDraftKey = "inside_mecca_questionnaire_draft_v1";
const draftLifetime = 24 * 60 * 60 * 1000;
const maximumAccountLength = 30000;

type StoredFields = Record<string, string[]>;
type StoredDraft = {
  version: 1 | 2 | 3;
  savedAt: number;
  step: number;
  furthestStep?: number;
  fields: StoredFields;
};

type ReviewEntry = {
  group: "story" | "privacy";
  label: string;
  values: string[];
};

type FieldErrorKey = "account" | "connection" | "knowledge" | "identity" | "contact" | "email" | "consent";
type FieldErrors = Partial<Record<FieldErrorKey, string>>;

type ValidationIssue = {
  key: FieldErrorKey;
  detail: "story_missing" | "connection_missing" | "knowledge_missing" | "identity_missing" | "contact_choice_missing" | "contact_email_invalid" | "consent_incomplete";
  message: string;
  control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
};

type SubmissionSuccess = {
  ok: true;
  submissionRef: string;
  receivedAt: string;
  emailDelivered: boolean;
};

function formFields(form: HTMLFormElement) {
  const fields: StoredFields = {};
  for (const [key, value] of new FormData(form).entries()) {
    const text = String(value).trim();
    if (!text || key === "website") continue;
    fields[key] = [...(fields[key] || []), text];
  }
  return fields;
}

function preparedQuestionnaire(form: HTMLFormElement) {
  const lines = Object.entries(formFields(form)).flatMap(([key, values]) =>
    values.map(value => `${key}: ${value}`),
  );
  return `INSIDE MECCA RESEARCH QUESTIONNAIRE\n\n${lines.join("\n")}`;
}

function list(data: FormData, name: string) {
  return data.getAll(name).map(String).filter(Boolean);
}

function isStoredDraft(value: unknown): value is StoredDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<StoredDraft>;
  return (draft.version === 1 || draft.version === 2 || draft.version === 3)
    && typeof draft.savedAt === "number"
    && typeof draft.step === "number"
    && !!draft.fields
    && typeof draft.fields === "object";
}

function isSubmissionSuccess(value: unknown): value is SubmissionSuccess {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<SubmissionSuccess>;
  return result.ok === true
    && typeof result.submissionRef === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result.submissionRef)
    && typeof result.receivedAt === "string"
    && !Number.isNaN(Date.parse(result.receivedAt))
    && typeof result.emailDelivered === "boolean";
}

function responseError(value: unknown) {
  if (!value || typeof value !== "object" || !("error" in value)) return "";
  return typeof value.error === "string" ? value.error : "";
}

function failureCategory(status: number) {
  if (status === 400) return "validation";
  if (status === 503) return "configuration";
  if (status === 502) return "storage";
  return "invalid_response";
}

function formatRecordedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "long", timeZone: "Australia/Melbourne" }).format(date)} (${date.toISOString()})`;
}

function applyStoredFields(form: HTMLFormElement, fields: StoredFields) {
  const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input[name], select[name], textarea[name]");
  controls.forEach(control => {
    const values = fields[control.name] || [];
    if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) {
      control.checked = values.includes(control.value);
      return;
    }
    control.value = values[0] || "";
  });
}

function createStoredDraft(form: HTMLFormElement, step: number, furthest = step): StoredDraft {
  return { version: 3, savedAt: Date.now(), step, furthestStep: furthest, fields: formFields(form) };
}

function readDraftFromStorage(): StoredDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(draftKey) || sessionStorage.getItem(draftKey) || sessionStorage.getItem(legacyDraftKey);
    if (!raw) return null;
    const stored: unknown = JSON.parse(raw);
    if (!isStoredDraft(stored) || Date.now() - stored.savedAt > draftLifetime) {
      removeDraftFromStorage();
      return null;
    }
    return stored;
  } catch {
    return null;
  }
}

function writeDraftToStorage(draft: StoredDraft): boolean {
  if (typeof window === "undefined") return false;
  let success = false;
  try {
    localStorage.setItem(draftKey, JSON.stringify(draft));
    success = true;
  } catch {
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draft));
      success = true;
    } catch {
      success = false;
    }
  }
  return success;
}

function removeDraftFromStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(draftKey);
    sessionStorage.removeItem(draftKey);
    sessionStorage.removeItem(legacyDraftKey);
  } catch {
    // ignore
  }
}

function present(values: string[], fallback = "Not provided") {
  return values.length ? values : [fallback];
}

export function ResearchQuestionnaire() {
  const formRef = useRef<HTMLFormElement>(null);
  const dataNoticeRef = useRef<HTMLDetailsElement>(null);
  const started = useRef(false);
  const trackedScreens = useRef(new Set<string>());
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [saveInSession, setSaveInSession] = useState(false);
  const [availableDraft, setAvailableDraft] = useState<StoredDraft | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  const [hasAnswers, setHasAnswers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [accountLength, setAccountLength] = useState(0);
  const [identityPreference, setIdentityPreference] = useState("");
  const [contactPreference, setContactPreference] = useState("");
  const [reviewEntries, setReviewEntries] = useState<ReviewEntry[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submissionRef, setSubmissionRef] = useState("");
  const [receivedAt, setReceivedAt] = useState("");

  useEffect(() => {
    if (window.location.hash) {
      document.querySelector<HTMLDetailsElement>(window.location.hash)?.setAttribute("open", "");
    }
    const stored = readDraftFromStorage();
    if (stored) {
      queueMicrotask(() => setAvailableDraft(stored));
    }
  }, []);

  useEffect(() => {
    if (status === "sent") return;
    const detail = sections[currentStep].detail;
    if (trackedScreens.current.has(detail)) return;
    trackedScreens.current.add(detail);
    trackFunnelEvent("questionnaire_step_view", detail);
  }, [currentStep, status]);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackFunnelEvent("questionnaire_start");
  }

  function saveDraft(step = currentStep, explicit = false) {
    const form = formRef.current;
    if (!form) return;
    if (!explicit && !saveInSession) return;
    const draft = createStoredDraft(form, step, Math.max(step, furthestStep));
    const ok = writeDraftToStorage(draft);
    if (ok) {
      if (explicit) setSaveInSession(true);
      const timeFormatted = new Intl.DateTimeFormat("en-AU", { timeStyle: "short" }).format(new Date(draft.savedAt));
      setDraftMessage(`Draft saved locally on this device at ${timeFormatted}. You can safely pause and resume later.`);
    } else {
      setSaveInSession(false);
      setDraftMessage("This browser could not save the draft to local storage. Your answers remain on this page only.");
    }
  }

  function handleSavePreference(event: ChangeEvent<HTMLInputElement>) {
    const enabled = event.currentTarget.checked;
    setSaveInSession(enabled);
    if (!enabled) {
      removeDraftFromStorage();
      setDraftMessage("Saved draft deleted from this browser. Your current answers remain on this page.");
      return;
    }
    saveDraft(currentStep, true);
  }

  function resumeDraft() {
    const form = formRef.current;
    if (!form || !availableDraft) return;
    const fields = availableDraft.version === 3
      ? availableDraft.fields
      : Object.fromEntries(Object.entries(availableDraft.fields).filter(([name]) => name !== "Consent"));
    applyStoredFields(form, fields);
    const restoredStep = availableDraft.version === 3
      ? Math.max(0, Math.min(availableDraft.step, sections.length - 1))
      : 0;
    const restoredFurthest = Math.max(restoredStep, availableDraft.furthestStep || restoredStep);
    setIdentityPreference(fields["Identity preference"]?.[0] || "");
    setContactPreference(fields["Contact preference"]?.[0] || "");
    setAccountLength(fields["What happened?"]?.[0]?.length || 0);
    setCurrentStep(restoredStep);
    setFurthestStep(restoredFurthest);
    setSaveInSession(true);
    setHasAnswers(Object.keys(fields).length > 0);
    setAvailableDraft(null);
    setDraftMessage("Draft restored successfully. Your saved responses have been loaded.");
    requestAnimationFrame(() => {
      applyStoredFields(form, fields);
      if (restoredStep === 2) updateReview(form);
    });
    markStarted();
  }

  function deleteAvailableDraft() {
    removeDraftFromStorage();
    setAvailableDraft(null);
    setDraftMessage("Saved draft discarded.");
  }

  function updateReview(form = formRef.current) {
    if (!form) return;
    const fields = formFields(form);
    const entries: ReviewEntry[] = [
      { group: "story", label: "What happened", values: present(fields["What happened?"] || []) },
      { group: "story", label: "Connection to MECCA", values: present(fields.Connection || []) },
      { group: "story", label: "How you know this", values: present(fields["Primary knowledge basis"] || []) },
    ];
    const optionalStory: Array<[string, string]> = [
      ["Approximately when", "Approximately when did it happen?"],
      ["Broad location", "Broad location"],
      ["Internal reporting and response", "Was it reported internally? What response did you receive?"],
      ["Supporting information", "Supporting information"],
    ];
    for (const [label, name] of optionalStory) {
      if (fields[name]?.length) entries.push({ group: "story", label, values: fields[name] });
    }
    entries.push(
      { group: "privacy", label: "Identity preference", values: present(fields["Identity preference"] || []) },
      { group: "privacy", label: "Preferred name or pseudonym", values: present(fields["Preferred name or pseudonym"] || []) },
      { group: "privacy", label: "Contact preference", values: present(fields["Contact preference"] || [contactChoices[0]]) },
      { group: "privacy", label: "Contact email", values: present(fields["Contact email"] || []) },
    );
    setReviewEntries(entries);
  }

  function clearFieldError(key: FieldErrorKey) {
    setFieldErrors(previous => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function handleFormChange(event: ChangeEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (target.name === "website") return;
    markStarted();
    setHasAnswers(true);
    setCopied(false);
    setMessage("");
    if (status !== "idle") setStatus("idle");

    const errorByName: Record<string, FieldErrorKey> = {
      "What happened?": "account",
      Connection: "connection",
      "Primary knowledge basis": "knowledge",
      "Identity preference": "identity",
      "Contact preference": "contact",
      "Contact email": "email",
      "Consent acknowledgement": "consent",
    };
    const errorKey = errorByName[target.name];
    if (errorKey) clearFieldError(errorKey);
    if (target.name === "What happened?") setAccountLength(target.value.length);

    if (target.name === "Identity preference") {
      setIdentityPreference(target.value);
      clearFieldError("contact");
      clearFieldError("email");
      if (target.value === "Anonymous") {
        setContactPreference(contactChoices[0]);
        const email = formRef.current?.elements.namedItem("Contact email") as HTMLInputElement | null;
        if (email) email.value = "";
        const pseudonym = formRef.current?.elements.namedItem("Preferred name or pseudonym") as HTMLInputElement | null;
        if (pseudonym) pseudonym.value = "";
      } else if (target.value === "Confidential contact" && contactPreference === contactChoices[0]) {
        setContactPreference("");
      }
    }
    if (target.name === "Contact preference") {
      setContactPreference(target.value);
      if (target.value === contactChoices[0]) {
        const email = formRef.current?.elements.namedItem("Contact email") as HTMLInputElement | null;
        if (email) email.value = "";
      }
    }
    if (currentStep === 2) requestAnimationFrame(() => updateReview());
    if (saveInSession) requestAnimationFrame(() => saveDraft());
  }

  function namedControl(name: string) {
    const item = formRef.current?.elements.namedItem(name);
    if (item instanceof RadioNodeList) return item[0] as HTMLInputElement | null;
    return item instanceof HTMLInputElement || item instanceof HTMLSelectElement || item instanceof HTMLTextAreaElement ? item : null;
  }

  function validationIssueForStep(step: number): ValidationIssue | null {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    if (step === 1) {
      if (!String(data.get("What happened?") || "").trim()) return { key: "account", detail: "story_missing", message: "Please write something about what happened. A very short answer is okay.", control: namedControl("What happened?") };
      if (!String(data.get("Connection") || "")) return { key: "connection", detail: "connection_missing", message: "Choose your connection to MECCA, or choose Prefer not to say.", control: namedControl("Connection") };
      if (!String(data.get("Primary knowledge basis") || "")) return { key: "knowledge", detail: "knowledge_missing", message: "Choose how you know this, or choose Mixed or unsure.", control: namedControl("Primary knowledge basis") };
    }
    if (step === 0) {
      const identity = String(data.get("Identity preference") || "");
      const contact = identity === "Anonymous" ? contactChoices[0] : String(data.get("Contact preference") || "");
      const email = String(data.get("Contact email") || "").trim();
      if (!identity) return { key: "identity", detail: "identity_missing", message: "Choose how you want your identity handled.", control: namedControl("Identity preference") };
      if (!contact) return { key: "contact", detail: "contact_choice_missing", message: "Choose whether the research team may contact you.", control: namedControl("Contact preference") };
      if (identity === "Confidential contact" && contact === contactChoices[0]) return { key: "contact", detail: "contact_choice_missing", message: "Confidential contact requires an email contact option.", control: namedControl("Contact preference") };
      if (contact !== contactChoices[0] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { key: "email", detail: "contact_email_invalid", message: "Enter a valid personal email address for the contact option you selected.", control: namedControl("Contact email") };
    }
    if (step === 2) {
      const acknowledgements = list(data, "Consent acknowledgement");
      if (acknowledgements.length !== consentAcknowledgements.length) return { key: "consent", detail: "consent_incomplete", message: "Please confirm all four acknowledgements before sending.", control: namedControl("Consent acknowledgement") };
    }
    return null;
  }

  function showValidation(step: number, issue: ValidationIssue) {
    trackFunnelEvent("questionnaire_validation_error", issue.detail);
    setCurrentStep(step);
    setFieldErrors({ [issue.key]: issue.message });
    setMessage("");
    setStatus("error");
    requestAnimationFrame(() => {
      issue.control?.focus();
      issue.control?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function moveToStep(step: number) {
    const next = Math.max(0, Math.min(step, sections.length - 1));
    setCurrentStep(next);
    setFurthestStep(previous => Math.max(previous, next));
    setMessage("");
    setFieldErrors({});
    setStatus("idle");
    if (next === 2) updateReview();
    if (saveInSession) requestAnimationFrame(() => saveDraft(next));
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ block: "start" }));
  }

  function continueQuestionnaire() {
    const issue = validationIssueForStep(currentStep);
    if (issue) {
      showValidation(currentStep, issue);
      return;
    }
    moveToStep(currentStep + 1);
  }

  function goToVisitedStep(step: number) {
    if (step > furthestStep) return;
    moveToStep(step);
  }

  function clearAnswers() {
    if (!window.confirm("Clear every answer in this questionnaire? This cannot be undone.")) return;
    formRef.current?.reset();
    removeDraftFromStorage();
    setIdentityPreference("");
    setContactPreference("");
    setAccountLength(0);
    setCurrentStep(0);
    setFurthestStep(0);
    setHasAnswers(false);
    setReviewEntries([]);
    setFieldErrors({});
    setStatus("idle");
    setMessage("");
    setDraftMessage(saveInSession ? "Answers cleared. Draft saving remains on." : "Answers cleared.");
  }

  async function copyAnswers() {
    const form = formRef.current;
    if (!form || !hasAnswers) return;
    await navigator.clipboard.writeText(preparedQuestionnaire(form));
    setCopied(true);
  }

  async function copySubmissionReference() {
    if (!submissionRef) return;
    await navigator.clipboard.writeText(submissionRef);
    setCopied(true);
  }

  function validateEntireQuestionnaire() {
    for (let step = 0; step < sections.length; step += 1) {
      const issue = validationIssueForStep(step);
      if (issue) return { step, issue };
    }
    return null;
  }

  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const invalid = validateEntireQuestionnaire();
    if (invalid) {
      showValidation(invalid.step, invalid.issue);
      return;
    }

    const data = new FormData(form);
    const selectedIdentity = String(data.get("Identity preference") || "");
    const selectedContact = selectedIdentity === "Anonymous" ? contactChoices[0] : String(data.get("Contact preference") || "");
    const contactEmail = String(data.get("Contact email") || "").trim();
    const payload = {
      website: String(data.get("website") || ""),
      identity_preference: selectedIdentity,
      preferred_name_or_pseudonym: String(data.get("Preferred name or pseudonym") || ""),
      connection_to_mecca: String(data.get("Connection") || ""),
      primary_knowledge_basis: String(data.get("Primary knowledge basis") || ""),
      employment_period: "",
      region: "",
      workplace_type: "",
      broad_role_category: "",
      account_text: String(data.get("What happened?") || "").trim(),
      happened_when: String(data.get("Approximately when did it happen?") || ""),
      happened_where: String(data.get("Broad location") || ""),
      role_at_time: "",
      direct_witnesses: "",
      internal_report_and_response: String(data.get("Was it reported internally? What response did you receive?") || ""),
      repeated_or_affected_others: "",
      uncertainties: "",
      hearsay_details: "",
      supporting_information: list(data, "Supporting information"),
      themes: [],
      contact_email: selectedContact === contactChoices[0] ? "" : contactEmail,
      contact_preferences: [selectedContact],
      consent_acknowledgements: list(data, "Consent acknowledgement"),
      publication_permission: false,
    };

    trackFunnelEvent("questionnaire_submit_attempt");
    setStatus("sending");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let result: unknown;
      try {
        result = await response.json();
      } catch {
        trackFunnelEvent("questionnaire_submit_failure", "invalid_response");
        setStatus("error");
        setMessage("The submission response could not be confirmed. Your answers are still here. Copy them before retrying or contact the project for help.");
        if (saveInSession) saveDraft(currentStep);
        return;
      }
      if (!response.ok) {
        trackFunnelEvent("questionnaire_submit_failure", failureCategory(response.status));
        setStatus("error");
        setMessage(responseError(result) || "The questionnaire could not be recorded. Nothing was recorded, and your answers remain in place. Please try again.");
        if (saveInSession) saveDraft(currentStep);
        return;
      }
      if (!isSubmissionSuccess(result)) {
        trackFunnelEvent("questionnaire_submit_failure", "invalid_response");
        setStatus("error");
        setMessage("The submission response could not be confirmed. Your answers are still here. Copy them before retrying or contact the project for help.");
        if (saveInSession) saveDraft(currentStep);
        return;
      }
      trackFunnelEvent("questionnaire_submit_success");
      removeDraftFromStorage();
      setSubmissionRef(result.submissionRef);
      setReceivedAt(result.receivedAt);
      setStatus("sent");
      setMessage(result.emailDelivered
        ? "Your questionnaire was stored, and the email copy was accepted for delivery to the restricted project inboxes. Your information has not been published."
        : "Your questionnaire was stored. The email copy could not be sent, but your database record is safe. Your information has not been published.");
      setSaveInSession(false);
      setHasAnswers(false);
      setReviewEntries([]);
      setAccountLength(0);
      form.reset();
    } catch {
      trackFunnelEvent("questionnaire_submit_failure", "network");
      setStatus("error");
      setMessage("The submission could not be confirmed. Your answers remain in place. Copy them before retrying if you are unsure.");
      if (saveInSession) saveDraft(currentStep);
    }
  }

  const storyReview = reviewEntries.filter(entry => entry.group === "story");
  const privacyReview = reviewEntries.filter(entry => entry.group === "privacy");
  const showAnswerTools = currentStep === 2 || status === "error";

  return <SitePage>
    <div className="rb-questionnaire-page rb-questionnaire-v3">
      <PageHero label="Research questionnaire" title="Tell us what happened, in your own words">
        <p>Share a brief account, choose how your information should be handled, then check and send.</p>
        <p>There are three short steps. Sending this form does not give permission to publish your account or identity.</p>
        <div className="rb-actions rb-questionnaire-hero-actions"><a className="rb-button red" href="#questionnaire">Start questionnaire</a><a className="rb-link-button" href="#data-handling">Review data handling</a></div>
      </PageHero>

      <section className="rb-section rb-questionnaire-section" id="questionnaire">
        <p className="rb-kicker">Three short steps</p>
        <h2>A brief account is enough</h2>
        <p className="rb-lede">Only the clearly marked questions are required. The extra context section can be skipped.</p>

        {availableDraft && <div className="mb-6 p-4 sm:p-5 bg-[#fdfbf7] border-2 border-[#b42025] rounded shadow-xs" role="status">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b42025] animate-pulse" />
                <strong className="text-sm sm:text-base font-serif font-bold text-zinc-950">
                  A saved draft is available in this browser
                </strong>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 m-0">
                Saved on {new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short" }).format(availableDraft.savedAt)} at Step {availableDraft.step + 1} ({sections[availableDraft.step]?.label || "Section"}). Your responses are safely kept in your device&apos;s localStorage until you choose to resume or discard.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="rb-button red text-xs sm:text-sm py-2 px-3.5 font-bold" type="button" onClick={resumeDraft}>
                Resume draft
              </button>
              <button className="rb-button text-xs sm:text-sm py-2 px-3 text-stone-700 hover:text-stone-950" type="button" onClick={deleteAvailableDraft}>
                Discard draft
              </button>
            </div>
          </div>
        </div>}

        {status === "sent" ? <div className="rb-submission-success" role="status">
          <p className="rb-kicker">Questionnaire received</p>
          <h3>Save your private reference.</h3>
          <p>{message}</p>
          <code>{submissionRef}</code>
          <p><strong>Recorded:</strong> <time dateTime={receivedAt}>{formatRecordedAt(receivedAt)}</time></p>
          <div className="rb-actions"><button className="rb-button red" type="button" onClick={copySubmissionReference}>{copied ? "Reference copied" : "Copy private reference"}</button><button className="rb-button" type="button" onClick={() => { started.current = false; trackedScreens.current = new Set(); setStatus("idle"); setSubmissionRef(""); setReceivedAt(""); setCopied(false); setCurrentStep(0); setFurthestStep(0); setFieldErrors({}); }}>Start another questionnaire</button></div>
          <AudienceInsightQuestion kind="submission_trust_driver" />
        </div> : <form className="rb-form" ref={formRef} onSubmit={prepare} onChange={handleFormChange} noValidate>
          <details className="rb-pause-options mb-6 border border-stone-300 rounded bg-[#fbf9f5] p-3 sm:p-4">
            <summary className="font-semibold text-sm cursor-pointer text-stone-800 hover:text-stone-950">
              Need to pause or save your progress?
            </summary>
            <div className="rb-pause-options-body mt-3 pt-3 border-t border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="rb-save-option flex items-start gap-3 cursor-pointer" htmlFor="save-questionnaire-draft">
                  <input 
                    id="save-questionnaire-draft" 
                    type="checkbox" 
                    checked={saveInSession} 
                    onChange={handleSavePreference} 
                    className="w-4 h-4 mt-0.5 accent-[#b42025] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-stone-800">
                    <strong>Auto-save draft on this device (localStorage)</strong>
                    <small className="block text-[11px] text-stone-500 mt-0.5">
                      Your responses are stored safely in this browser&apos;s localStorage for up to 24 hours. The draft is deleted upon successful submission, when unticked, or when discarded.
                    </small>
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => saveDraft(currentStep, true)}
                  className="shrink-0 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Save draft now
                </button>
              </div>
              {draftMessage && (
                <p className="text-xs font-mono text-[#b42025] font-semibold m-0" role="status" aria-live="polite">
                  ✓ {draftMessage}
                </p>
              )}
            </div>
          </details>

          {/* Visual Progress Indicator */}
          <div 
            className="w-full mb-6 bg-white border border-[#cfc7bd] shadow-sm sticky top-[64px] md:top-[72px] z-30 transition-all"
            role="region" 
            aria-label="Questionnaire progress"
          >
            {/* Top summary row */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0a0a0a] text-white">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffdadd] bg-[#b42025] px-2 py-0.5 rounded-sm">
                  Step {currentStep + 1} of {sections.length}
                </span>
                <span className="text-sm md:text-base font-semibold text-zinc-100 truncate">
                  {sections[currentStep].label}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-zinc-300">
                <span className="hidden sm:inline font-medium text-stone-300">
                  {currentStep === 0 ? "2 steps remaining" : currentStep === 1 ? "1 step remaining" : "Final step · Ready to submit"}
                </span>
                <span className="bg-zinc-800 text-zinc-200 border border-zinc-700 px-2 py-0.5 font-bold rounded-sm">
                  {Math.round(((currentStep + 1) / sections.length) * 100)}% Complete
                </span>
              </div>
            </div>

            {/* Visual Progress Track */}
            <div 
              className="w-full bg-stone-200 h-2.5 relative overflow-hidden" 
              role="progressbar" 
              aria-label="Questionnaire completion progress" 
              aria-valuemin={1} 
              aria-valuemax={sections.length} 
              aria-valuenow={currentStep + 1}
              aria-valuetext={`Step ${currentStep + 1} of ${sections.length}: ${sections[currentStep].label}. ${Math.round(((currentStep + 1) / sections.length) * 100)}% complete.`}
            >
              <div 
                className="h-full bg-[#b42025] transition-all duration-300 ease-out" 
                style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }} 
              />
            </div>

            {/* Stepper Navigation */}
            <nav aria-label="Questionnaire step navigation" className="p-2 sm:p-3 bg-[#f7f5f1] border-t border-stone-200">
              <ol className="grid grid-cols-3 gap-2 sm:gap-3 m-0 p-0 list-none">
                {sections.map((section, index) => {
                  const isCurrent = index === currentStep;
                  const isCompleted = index < currentStep;
                  const isVisited = index <= furthestStep;

                  return (
                    <li key={section.number} className="list-none m-0 p-0">
                      <button
                        type="button"
                        onClick={() => goToVisitedStep(index)}
                        disabled={!isVisited}
                        className={`w-full flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 text-left rounded transition-all min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b42025] ${
                          isCurrent
                            ? "bg-white border-2 border-[#b42025] shadow-xs text-zinc-950 font-bold"
                            : isCompleted
                            ? "bg-white hover:bg-stone-50 border border-stone-300 text-zinc-800 cursor-pointer"
                            : isVisited
                            ? "bg-white hover:bg-stone-50 border border-stone-200 text-zinc-700 cursor-pointer"
                            : "bg-stone-100 border border-stone-200/80 text-stone-400 cursor-not-allowed opacity-75"
                        }`}
                        aria-current={isCurrent ? "step" : undefined}
                      >
                        <span 
                          className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[11px] sm:text-xs font-bold shrink-0 ${
                            isCurrent
                              ? "bg-[#b42025] text-white"
                              : isCompleted
                              ? "bg-zinc-900 text-white"
                              : "bg-stone-300 text-stone-600"
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[12px] sm:text-[13px] leading-tight truncate">
                            {section.label}
                          </span>
                          <span className="text-[10px] font-mono font-normal uppercase tracking-wider text-stone-500 hidden md:inline">
                            {isCurrent ? "Current step" : isCompleted ? "Completed" : "Upcoming"}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />

          <section className="rb-form-step" data-questionnaire-step="1" hidden={currentStep !== 1} aria-labelledby="questionnaire-step-story">
            <h3 id="questionnaire-step-story">02 · Tell us what happened</h3>
            <div className="rb-field"><label htmlFor="account">What happened? <span className="rb-required">Required</span></label><textarea id="account" name="What happened?" required maxLength={maximumAccountLength} aria-invalid={!!fieldErrors.account} aria-describedby="account-help account-count account-error" placeholder="A short answer is okay. You can add more detail later." /><div className="rb-field-meta"><p className="rb-small" id="account-help">Write only what you feel ready to share.</p><p className="rb-character-count" id="account-count">{accountLength.toLocaleString("en-AU")} / {maximumAccountLength.toLocaleString("en-AU")}</p></div>{fieldErrors.account && <p className="rb-field-error" id="account-error" role="alert">{fieldErrors.account}</p>}</div>
            <div className="rb-compact-fields">
              <div className="rb-field"><label htmlFor="connection">Your connection to MECCA <span className="rb-required">Required</span></label><select id="connection" name="Connection" required defaultValue="" aria-invalid={!!fieldErrors.connection} aria-describedby="connection-error"><option value="" disabled>Select one</option>{relations.map(value => <option key={value}>{value}</option>)}</select>{fieldErrors.connection && <p className="rb-field-error" id="connection-error" role="alert">{fieldErrors.connection}</p>}</div>
              <div className="rb-field"><label htmlFor="knowledge">How do you know this? <span className="rb-required">Required</span></label><select id="knowledge" name="Primary knowledge basis" required defaultValue="" aria-invalid={!!fieldErrors.knowledge} aria-describedby="knowledge-error"><option value="" disabled>Select one</option>{knowledgeChoices.map(value => <option key={value}>{value}</option>)}</select>{fieldErrors.knowledge && <p className="rb-field-error" id="knowledge-error" role="alert">{fieldErrors.knowledge}</p>}</div>
            </div>
            <details className="rb-optional-details"><summary>Add useful context (optional)</summary><div className="rb-optional-details-body"><div className="rb-field"><label htmlFor="when">Approximately when did it happen?</label><input id="when" name="Approximately when did it happen?" maxLength={2000} /></div><div className="rb-field"><label htmlFor="location">Broad location</label><input id="location" name="Broad location" maxLength={2000} placeholder="For example, Victoria or support office" /></div><div className="rb-field"><label htmlFor="reported">Was it reported internally? What response did you receive?</label><textarea id="reported" name="Was it reported internally? What response did you receive?" maxLength={10000} /></div><fieldset className="rb-field"><legend>Available supporting material</legend><p className="rb-small">You do not need documents to share an experience. This form does not upload files.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">{supportingInformation.map(value => <label key={value} className="relative flex items-center gap-3 p-4 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 cursor-pointer has-[:checked]:bg-red-50/70 has-[:checked]:border-red-300 transition-colors min-h-[48px] box-border"><input type="checkbox" name="Supporting information" value={value} className="w-5 h-5 shrink-0 accent-[#b42025] cursor-pointer" /><span className="text-sm font-semibold leading-tight text-zinc-900 flex-1 min-w-0 break-words">{value}</span></label>)}</div></fieldset></div></details>
          </section>

          <section className="rb-form-step" data-questionnaire-step="0" hidden={currentStep !== 0} aria-labelledby="questionnaire-step-privacy">
            <h3 id="questionnaire-step-privacy">01 · Privacy and contact</h3>
            <fieldset className="rb-field"><legend>How should we handle your identity? <span className="rb-required">Required</span></legend><div className="rb-options" aria-describedby="identity-error" aria-invalid={!!fieldErrors.identity}>{identityChoices.map(([title, description]) => <label className="rb-option" key={title}><input type="radio" name="Identity preference" value={title} checked={identityPreference === title} onChange={() => {}} /><span><strong>{title}</strong><br />{description}</span></label>)}</div>{fieldErrors.identity && <p className="rb-field-error" id="identity-error" role="alert">{fieldErrors.identity}</p>}</fieldset>
            {!identityPreference ? null : identityPreference === "Anonymous" ? <div className="rb-note"><strong>No contact details will be collected.</strong><p>The project will not be able to follow up. Return to a different privacy choice if you want to permit contact.</p><input type="hidden" name="Contact preference" value={contactChoices[0]} /></div> : <>
              <div className="rb-field"><label htmlFor="pseudonym">Preferred name or pseudonym (optional)</label><input id="pseudonym" name="Preferred name or pseudonym" maxLength={200} autoComplete="off" /></div>
              <fieldset className="rb-field"><legend>May the research team contact you? <span className="rb-required">Required</span></legend><div className="rb-options" aria-describedby="contact-error" aria-invalid={!!fieldErrors.contact}>{contactChoices.map(value => { const disabled = identityPreference === "Confidential contact" && value === contactChoices[0]; return <label className={`rb-option ${disabled ? "disabled" : ""}`} key={value}><input type="radio" name="Contact preference" value={value} checked={contactPreference === value} disabled={disabled} onChange={() => {}} /><span>{value}</span></label>; })}</div>{fieldErrors.contact && <p className="rb-field-error" id="contact-error" role="alert">{fieldErrors.contact}</p>}</fieldset>
              <div className="rb-field" hidden={!contactPreference || contactPreference === contactChoices[0]}><label htmlFor="email">Personal email <span className="rb-required">Required for this choice</span></label><input id="email" name="Contact email" type="email" maxLength={320} autoComplete="email" disabled={!contactPreference || contactPreference === contactChoices[0]} aria-invalid={!!fieldErrors.email} aria-describedby="email-error" />{fieldErrors.email && <p className="rb-field-error" id="email-error" role="alert">{fieldErrors.email}</p>}</div>
            </>}
            <p className="rb-small">Contact permission does not agree to an interview, identification or publication.</p>
          </section>

          <section className="rb-form-step rb-review" data-questionnaire-step="2" hidden={currentStep !== 2} aria-labelledby="questionnaire-step-review">
            <p className="rb-kicker">Nothing has been sent yet</p><h3 id="questionnaire-step-review">03 · Check and send</h3><p>Review your answers and confirm the four protections below.</p>
            <div className="rb-review-groups"><article><header><h4>Your story</h4><button type="button" className="rb-text-button font-semibold underline text-[#b42025]" onClick={() => moveToStep(1)}>Edit</button></header><dl className="rb-review-list">{storyReview.map(entry => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.values.map(value => <p key={`${entry.label}-${value}`}>{value}</p>)}</dd></div>)}</dl></article><article><header><h4>Privacy and contact</h4><button type="button" className="rb-text-button font-semibold underline text-[#b42025]" onClick={() => moveToStep(0)}>Edit</button></header><dl className="rb-review-list">{privacyReview.map(entry => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.values.map(value => <p key={`${entry.label}-${value}`}>{value}</p>)}</dd></div>)}</dl></article></div>
            <fieldset className="rb-field"><legend>Four acknowledgements <span className="rb-required">Required</span></legend><div className="flex flex-col gap-3 mt-3 w-full" aria-describedby="consent-error">{consentAcknowledgements.map(item => <label key={item.id} className="relative flex items-start gap-3.5 p-4 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 cursor-pointer has-[:checked]:bg-red-50/70 has-[:checked]:border-red-300 transition-colors w-full box-border"><input type="checkbox" name="Consent acknowledgement" value={item.id} aria-invalid={!!fieldErrors.consent} className="mt-0.5 w-5 h-5 shrink-0 accent-[#b42025] cursor-pointer" /><span className="text-sm leading-relaxed text-zinc-900 flex-1 min-w-0 break-words">{item.text}{item.id === "confidentiality_limits" && <> <a className="underline font-semibold text-[#b42025] hover:text-red-700 ml-1 inline" href="#data-handling" onClick={() => { dataNoticeRef.current?.setAttribute("open", ""); recordContentAssist("privacy_data_handling"); }}>Open the full notice.</a></>}</span></label>)}</div>{fieldErrors.consent && <p className="rb-field-error" id="consent-error" role="alert">{fieldErrors.consent}</p>}</fieldset>
            <p className="rb-note"><strong>Submission order:</strong> Your questionnaire is stored in the restricted database first. Only after storage succeeds is a secondary email copy attempted.</p><p className="rb-note"><strong>Publication boundary:</strong> Sending this questionnaire does not grant permission to quote, publish or identify you.</p>
          </section>

          {message && <p className="rb-note" role={status === "error" ? "alert" : "status"} aria-live="polite">{message}</p>}
          <div className="rb-step-actions">
            <div className="rb-step-nav">
              {currentStep > 0 && <button className="rb-button" type="button" onClick={() => moveToStep(currentStep - 1)}>Back</button>}
              {currentStep < 2 && <button className="rb-button red" type="button" onClick={continueQuestionnaire}>Continue</button>}
              {currentStep === 2 && <button className="rb-button red" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send research questionnaire"}</button>}
              <button 
                className="rb-button" 
                type="button" 
                onClick={() => saveDraft(currentStep, true)}
                title="Save your responses in this browser so you can pause and resume later"
              >
                Save draft
              </button>
            </div>
            {showAnswerTools && <div className="rb-step-tools">
              <button className="rb-button" type="button" onClick={copyAnswers} disabled={!hasAnswers}>{copied ? "Answers copied" : "Copy current answers"}</button>
              <button className="rb-text-button" type="button" onClick={clearAnswers} disabled={!hasAnswers}>Clear answers</button>
            </div>}
          </div>
        </form>}
      </section>

      <section className="rb-section rb-questionnaire-information" aria-labelledby="questionnaire-information-title"><p className="rb-kicker">Information and safeguards</p><h2 id="questionnaire-information-title">Read what you need, when you need it</h2><p className="rb-lede">These notices remain available without sitting between you and the questionnaire.</p>
        <details className="rb-data-notice" id="legal-limits"><summary><span className="rb-kicker">Legal and safety limits</span><strong>This is not a company hotline or automatically protected legal pathway.</strong><span>Open the important legal limits.</span></summary><div className="rb-data-notice-body"><div className="rb-data-grid"><article><span>01</span><h3>Not a company hotline</h3><p>Inside MECCA is not MECCA&apos;s whistleblower service and does not present itself as an eligible corporate recipient, regulator or law firm.</p></article><article><span>02</span><h3>No automatic legal protection</h3><p>Sending information here does not automatically create whistleblower protection, journalist-source privilege or legal professional privilege.</p></article><article><span>03</span><h3>Not for emergencies</h3><p>If anyone faces immediate danger, contact emergency services on 000. Seek independent legal advice before relying on a statutory disclosure pathway.</p></article></div><div className="rb-actions"><Link className="rb-button red" href="/legal-publication-policy#contributor-legal-limits">Read the Australian legal-risk explanation</Link></div></div></details>
        <details className="rb-data-notice" id="safety"><summary><span className="rb-kicker">Before you begin</span><strong>Ways to protect yourself and other people.</strong><span>Open the practical safety checklist.</span></summary><div className="rb-data-notice-body"><ul className="rb-list"><li>Use a personal device, email address and network.</li><li>Do not access, remove, record or send material unlawfully.</li><li>Include another person&apos;s name or identifying details only when genuinely necessary.</li><li>Consider whether your exact role, store, location, dates or wording could identify you.</li><li>Preserve original files, but contact the project before sending highly sensitive material.</li></ul></div></details>
        <details className="rb-data-notice" id="data-handling" ref={dataNoticeRef} onToggle={event => { if (event.currentTarget.open) recordContentAssist("privacy_data_handling"); }}><summary><span className="rb-kicker">Contributor data-handling notice</span><strong>Read the full notice before you submit.</strong><span>What is collected, why it is used, who can access it, and how long it is retained.</span></summary><div className="rb-data-notice-body"><h2 id="data-handling-title">What happens to the information you provide</h2><p className="rb-lede">Inside MECCA independently operates this questionnaire. The project applies data-minimisation, access, correction, security, retention and deletion practices modelled on the Australian Privacy Principles, without representing that every provision necessarily applies in every circumstance.</p><div className="rb-data-grid"><article><span>01</span><h3>What is collected</h3><p>Your answers, identity preference, contact and consent choices, optional email, submission time, private reference and browser user-agent string are recorded. This form records whether supporting material exists but does not upload files.</p></article><article><span>02</span><h3>Why it is used</h3><p>Information is used to assess your account, organise research, conduct verification and contact you only as selected. Separate, non-identifying audience analytics improve the participation process. Information is not sold or used for commercial marketing.</p></article><article><span>03</span><h3>Sensitive information</h3><p>Workplace accounts may include health, disability, racial or ethnic origin, union membership or other sensitive information. Include only what is necessary. The final consent section asks for express consent to collect what you choose to provide.</p></article><article><span>04</span><h3>Other people&apos;s information</h3><p>Details about managers, colleagues or witnesses are separated from public material and minimised. Unnecessary third-party identifying information may be removed or segregated from the working research record.</p></article><article><span>05</span><h3>Storage and providers</h3><p>The submission is stored in a restricted Supabase database. When email delivery is available, Resend sends a copy to the restricted submission inbox. Hosting infrastructure processes the request in transit. Providers may process information outside Australia.</p></article><article><span>06</span><h3>Access and disclosure</h3><p>Access is limited to people who need the information for verification, editorial, legal or necessary technical work. Disclosure may occur where required by valid legal process or necessary to address an immediate serious safety risk.</p></article><article><span>07</span><h3>Your requests</h3><p>Using your private reference, you can request correction, stop contact, withdrawal or deletion. Practical or legal limits, including backups, a legal hold or material already published with separate permission, will be explained.</p></article><article><span>08</span><h3>Publication boundary</h3><p>Submission is not consent to quote, publish or identify you. If public use is proposed, the exact material, identity treatment and intended format must be separately agreed.</p></article></div><div className="rb-retention-schedule" role="region" aria-labelledby="retention-schedule-title" tabIndex={0}><h3 id="retention-schedule-title">Retention schedule</h3><p className="rb-small">Effective 11 August 2026. Review due by 11 August 2027.</p><ResponsiveTable><table className="rb-table w-full"><thead><tr><th>Information</th><th>Standard period</th><th>Action at the end</th></tr></thead><tbody><tr><td>Spam, duplicate or test records</td><td>Within 30 days after identification</td><td>Delete.</td></tr><tr><td>Questionnaire funnel and optional audience feedback</td><td>12 months from the event</td><td>Delete or retain only a non-identifying aggregate. Analytics exclude questionnaire answers, names, contact details, exact locations, IP addresses and visitor profiles.</td></tr><tr><td>Optional email and contact preference</td><td>Up to 24 months after the last meaningful contact</td><td>Delete or de-identify earlier if contact permission is withdrawn, subject to a documented legal reason.</td></tr><tr><td>Submission not used in an active inquiry</td><td>3 years from receipt</td><td>Delete or de-identify.</td></tr><tr><td>Submission used in active verification, investigation or production</td><td>Until that work closes, then 3 years</td><td>Delete or de-identify unless a documented extension applies.</td></tr><tr><td>Minimum consent, correction, complaint, right-of-reply and editorial-decision records</td><td>7 years after the relevant publication or final decision</td><td>Remove avoidable identifying details, subject to legal obligations.</td></tr></tbody></table></ResponsiveTable></div><p className="rb-retention-rule"><strong>Extensions are not automatic.</strong> They require a recorded reason, scope and review date and are limited to 12 months at a time. Provider backups or delivery records may remain temporarily after deletion from active systems and must not be returned to routine use.</p><p className="rb-note"><strong>Privacy contact:</strong> <a href="mailto:shareyourstory@insidemecca.net?subject=Privacy%2C%20withdrawal%20or%20deletion%20request">shareyourstory@insidemecca.net</a>. Include your private submission reference if available, but do not send additional sensitive information in the first email.</p></div></details>
      </section>
    </div>
  </SitePage>;
}
