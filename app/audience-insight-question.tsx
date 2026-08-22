"use client";

import { useEffect, useState } from "react";
import { audienceNeedOptions, trustDriverOptions, type AnalyticsEvent } from "./audience-insight-model";
import { trackFunnelEvent } from "./analytics";

type QuestionKind = "audience_need_selected" | "submission_trust_driver";

const questionContent = {
  audience_need_selected: {
    title: "What would help you decide whether to share?",
    description: "Optional. Your answer is stored separately from any questionnaire and cannot identify you. It helps improve the participation process.",
    options: audienceNeedOptions,
  },
  submission_trust_driver: {
    title: "What helped you feel comfortable enough to submit?",
    description: "Optional. This answer is stored separately and is not linked to your questionnaire record.",
    options: trustDriverOptions,
  },
} as const;

export function AudienceInsightQuestion({ kind }: { kind: QuestionKind }) {
  const [answered, setAnswered] = useState(false);
  const storageKey = `inside_mecca_answered_${kind}`;
  const content = questionContent[kind];

  useEffect(() => {
    let active = true;
    let saved = false;
    try { saved = sessionStorage.getItem(storageKey) === "yes"; } catch { /* Device-only preference is optional. */ }
    queueMicrotask(() => { if (active) setAnswered(saved); });
    return () => { active = false; };
  }, [storageKey]);

  function choose(value: string) {
    trackFunnelEvent(kind as AnalyticsEvent, value);
    try { sessionStorage.setItem(storageKey, "yes"); } catch { /* The answer is still sent without device storage. */ }
    setAnswered(true);
  }

  return <section className={`ai-question ${kind === "submission_trust_driver" ? "compact" : ""}`} aria-labelledby={`${kind}-title`}>
    <p className="rb-kicker">One optional question</p>
    <h2 id={`${kind}-title`}>{content.title}</h2>
    {answered ? <p className="ai-question-thanks" role="status">Thank you. This will be reviewed as an audience signal, not linked to an individual.</p> : <>
      <p>{content.description}</p>
      <div className="ai-question-options">{content.options.map(option => <button type="button" key={option.value} onClick={() => choose(option.value)}>{option.label}</button>)}</div>
    </>}
  </section>;
}
