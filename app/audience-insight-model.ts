export const analyticsEvents = [
  "share_path_view",
  "share_path_click",
  "content_path_click",
  "questionnaire_view",
  "questionnaire_click",
  "questionnaire_start",
  "questionnaire_step_view",
  "questionnaire_validation_error",
  "questionnaire_submit_attempt",
  "questionnaire_submit_success",
  "questionnaire_submit_failure",
  "evidence_guidance_view",
  "private_share_click",
  "audience_need_selected",
  "submission_trust_driver",
] as const;

export type AnalyticsEvent = typeof analyticsEvents[number];

export const contentAssistValues = [
  "privacy_data_handling",
  "methodology_evidence",
  "accountability_updates",
  "evidence_guidance",
] as const;

export type ContentAssist = typeof contentAssistValues[number];

export const questionnaireStepLabels = [
  { detail: "v3_story", label: "Screen 1: Story" },
  { detail: "v3_privacy", label: "Screen 2: Privacy and contact" },
  { detail: "v3_review", label: "Screen 3: Check and send" },
] as const;

export const historicalQuestionnaireStepLabels = [
  { detail: "step_1", label: "Legacy step 1: Privacy" },
  { detail: "step_2", label: "Legacy step 2: Connection" },
  { detail: "step_3", label: "Legacy step 3: Experience" },
  { detail: "step_4", label: "Legacy step 4: Supporting context" },
  { detail: "step_5", label: "Legacy step 5: Contact" },
  { detail: "step_6", label: "Legacy step 6: Consent" },
  { detail: "step_7", label: "Legacy step 7: Review" },
] as const;

export const audienceNeedOptions = [
  { value: "anonymity", label: "Understand how anonymity works" },
  { value: "after_submit", label: "Know what happens after I submit" },
  { value: "evidence_checking", label: "See how information is checked" },
  { value: "time_required", label: "Know how long the questionnaire takes" },
  { value: "helping_someone", label: "I am helping someone else" },
  { value: "not_ready", label: "I am not ready to share" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const trustDriverOptions = [
  { value: "anonymity_choices", label: "Clear anonymity and contact choices" },
  { value: "data_handling", label: "The data-handling notice" },
  { value: "methodology", label: "The evidence methodology" },
  { value: "review_answers", label: "Being able to review answers before sending" },
  { value: "trusted_referral", label: "Someone I trust shared the project" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

const questionnaireSteps = Array.from({ length: 9 }, (_, index) => `step_${index + 1}`);
const questionnaireScreens = questionnaireStepLabels.map(screen => screen.detail);
const questionnaireValidationDetails = [
  ...questionnaireSteps,
  "story_missing",
  "connection_missing",
  "knowledge_missing",
  "identity_missing",
  "contact_choice_missing",
  "contact_email_invalid",
  "consent_incomplete",
] as const;

export const analyticsEventDetails: Partial<Record<AnalyticsEvent, readonly string[]>> = {
  share_path_view: ["share_story_hub"],
  share_path_click: ["announcement", "header", "homepage_hero", "homepage_participation", "homepage_contact"],
  content_path_click: ["homepage_hero_evidence", "homepage_workplace_analysis", "homepage_analysis_index", "homepage_change_agenda", "homepage_accountability", "homepage_research_topics", "homepage_development_planning", "homepage_updates", "homepage_evidence_standards", "homepage_source_safety"],
  questionnaire_view: ["research_questionnaire"],
  questionnaire_click: ["share_story_hub", "share_story_faq"],
  questionnaire_step_view: [...questionnaireSteps, ...questionnaireScreens],
  questionnaire_validation_error: questionnaireValidationDetails,
  questionnaire_submit_failure: ["validation", "configuration", "storage", "invalid_response", "network"],
  evidence_guidance_view: ["evidence_guidance"],
  private_share_click: ["email_share"],
  audience_need_selected: audienceNeedOptions.map(option => option.value),
  submission_trust_driver: trustDriverOptions.map(option => option.value),
};

export const contentAssistLabels: Record<ContentAssist, string> = {
  privacy_data_handling: "Privacy and data handling",
  methodology_evidence: "Methodology and evidence standards",
  accountability_updates: "Project updates and accountability",
  evidence_guidance: "Evidence submission guidance",
};
