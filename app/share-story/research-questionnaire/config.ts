export const relations = [
  "Current employee",
  "Former employee",
  "Contractor",
  "Former contractor",
  "Former manager",
  "Direct witness",
  "Other first-hand workplace connection",
  "Prefer not to say",
] as const;

export const identityChoices = [
  ["Anonymous", "I will not provide contact details. The project will not be able to follow up."],
  ["Pseudonymous", "I may use a separate email or chosen name, without providing my legal name."],
  ["Confidential contact", "The project may know who I am, but must not publish my identity without separate permission."],
] as const;

export const knowledgeChoices = [
  "I experienced it personally",
  "I directly witnessed it",
  "I have relevant records or documents",
  "It was told to me by another person",
  "Mixed or unsure",
] as const;

export const themes = [
  "Bullying and harassment",
  "Management and leadership",
  "Psychological safety",
  "Workload and staffing",
  "Training and development",
  "Pay and benefits",
  "Career progression",
  "Inclusion and accessibility",
  "Team culture",
  "Work-life balance",
  "Reporting concerns and retaliation",
  "Employment security and rostering",
  "Other",
] as const;

export const supportingInformation = [
  "Emails",
  "Messages",
  "Rosters",
  "Diary notes",
  "Calendar records",
  "Performance documents",
  "Photographs",
  "Direct witnesses",
  "No supporting material",
  "Other relevant information",
] as const;

export const contactChoices = [
  "I do not want to provide contact details",
  "The project may email me with verification questions",
  "I am open to a confidential research conversation",
] as const;

export const consentStatementsV2 = [
  "I confirm this account distinguishes what I experienced or directly witnessed from what others told me, and I am not knowingly submitting false information.",
  "I consent to Inside MECCA collecting the personal and sensitive information I choose to include for research and verification, and I have limited other people's identifying information to what is necessary.",
  "I understand this submission is a research lead, not a verified finding, and does not grant permission to quote, publish or identify me; separate, specific permission is required.",
  "I have read the contributor data handling notice and understand that confidentiality and anonymity have technical and legal limits, including possible re-identification or legally compelled disclosure.",
] as const;

export const consentAcknowledgements = [
  {
    id: "accuracy",
    text: "I have separated what I experienced or witnessed from what other people told me, and I am not knowingly submitting false information.",
  },
  {
    id: "sensitive_information",
    text: "I consent to Inside MECCA collecting the personal and sensitive information I choose to provide, and I have limited identifying details about other people to what is necessary.",
  },
  {
    id: "no_publication",
    text: "I understand this is a research lead, not a verified finding, and I am not giving permission to quote, publish or identify me.",
  },
  {
    id: "confidentiality_limits",
    text: "I have read the contributor data-handling notice and understand that anonymity and confidentiality have technical and legal limits.",
  },
] as const;

export const consentAcknowledgementIds = consentAcknowledgements.map(item => item.id);
export const consentStatementsV3 = consentAcknowledgements.map(item => item.text);
export const requiredConsentStatements = [...consentStatementsV2];

export const legacyConsentStatements = [
  "I have separated what I experienced or directly witnessed from what other people told me.",
  "I consent to Inside MECCA collecting the personal and sensitive information I choose to include for research and verification.",
  "I have limited identifying information about other people to what I believe is necessary.",
  "I understand this submission is a research lead, not a verified finding.",
  "I understand this submission grants no permission to quote or publish any part of it; separate, specific permission is required.",
  "I understand confidentiality and anonymity have technical and legal limits, including possible re-identification or legally compelled disclosure.",
  "I confirm I am not knowingly submitting false information and have read the contributor data handling notice.",
] as const;
