import { audienceNeedOptions, contentAssistLabels, historicalQuestionnaireStepLabels, questionnaireStepLabels, trustDriverOptions, type AnalyticsEvent, type ContentAssist } from "../audience-insight-model";
import { AccessDenied, AdminShell, ConfigurationPending } from "../submissions/admin-shell";
import { requireSubmissionsViewer } from "../submissions/auth";
import { fetchAudienceActions, fetchAudienceEvents, type AudienceAction, type AudienceEvent } from "./data";

export const dynamic = "force-dynamic";

type Search = Promise<{ days?: string; error?: string }>;
type SuggestedAction = { signal: string; interpretation: string; strength: string; action: string };

const allowedDays = [30, 90, 365] as const;
const actionStatuses = ["planned", "testing", "review_due", "complete", "held"];
const evidenceStrengths = ["hypothesis", "directional", "repeated", "supported"];

function count(events: AudienceEvent[], event: AnalyticsEvent, detail?: string) {
  return events.filter(item => item.event === event && (!detail || item.eventDetail === detail)).length;
}

function rate(numerator: number, denominator: number) {
  return denominator ? Math.round((numerator / denominator) * 100) : null;
}

function displayRate(value: number | null) {
  return value === null ? "Baseline pending" : `${value}%`;
}

function detailCounts(events: AudienceEvent[], event: AnalyticsEvent) {
  const counts = new Map<string, number>();
  for (const item of events) {
    if (item.event !== event || !item.eventDetail) continue;
    counts.set(item.eventDetail, (counts.get(item.eventDetail) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function optionLabel(value: string, options: readonly { value: string; label: string }[]) {
  return options.find(option => option.value === value)?.label || value.replaceAll("_", " ");
}

function detailLabel(value: string) {
  const screen = [...questionnaireStepLabels, ...historicalQuestionnaireStepLabels].find(item => item.detail === value);
  return screen?.label || value.replaceAll("_", " ");
}

function generateSuggestions(events: AudienceEvent[]): SuggestedAction[] {
  const suggestions: SuggestedAction[] = [];
  const views = count(events, "questionnaire_view");
  const starts = count(events, "questionnaire_start");
  const submissions = count(events, "questionnaire_submit_success");
  const startRate = rate(starts, views);
  const completionRate = rate(submissions, starts);
  const topNeed = detailCounts(events, "audience_need_selected")[0];
  const topError = detailCounts(events, "questionnaire_validation_error")[0];

  if (views < 10) suggestions.push({
    signal: `${views} questionnaire views in this period`,
    interpretation: "The baseline is still small, so percentages could be misleading.",
    strength: "Baseline pending",
    action: "Keep the current experience stable and review raw counts after more visits are recorded.",
  });
  if (views >= 10 && startRate !== null && startRate < 50) suggestions.push({
    signal: `${starts} starts from ${views} questionnaire views (${startRate}%)`,
    interpretation: "Visitors may need more reassurance or a clearer estimate of the effort before beginning.",
    strength: views >= 30 ? "Repeated" : "Directional",
    action: "Compare the top stated need with the form introduction, then test one concise reassurance above the start point.",
  });
  if (starts >= 10 && completionRate !== null && completionRate < 50) suggestions.push({
    signal: `${submissions} submissions from ${starts} starts (${completionRate}%)`,
    interpretation: "The questionnaire may create friction after people decide to begin.",
    strength: starts >= 30 ? "Repeated" : "Directional",
    action: "Review step reach and validation errors, then change only the clearest friction point.",
  });
  if (topNeed) suggestions.push({
    signal: `${topNeed[1]} visitors selected ${optionLabel(topNeed[0], audienceNeedOptions)}`,
    interpretation: "This is the most common stated need in a self-selected optional response.",
    strength: topNeed[1] >= 10 ? "Repeated" : "Directional",
    action: "Check whether the relevant answer is visible before the main participation call to action.",
  });
  if (topError) suggestions.push({
    signal: `${topError[1]} validation errors at ${detailLabel(topError[0])}`,
    interpretation: "Visitors are being blocked at this step, although repeat attempts may be included.",
    strength: topError[1] >= 10 ? "Repeated" : "Directional",
    action: "Review the required fields and error wording at this step before changing the questionnaire structure.",
  });
  if (!suggestions.length) suggestions.push({
    signal: "No strong friction signal yet",
    interpretation: "The current counts do not justify a major experience change.",
    strength: "Baseline pending",
    action: "Continue collecting the privacy-safe baseline and review stated needs alongside funnel counts.",
  });
  return suggestions;
}

export default function AudienceInsightsPage({ searchParams }: { searchParams: Search }) {
  return <AudienceInsightsDashboard searchParams={searchParams} />;
}

async function AudienceInsightsDashboard({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  const requestedDays = Number(query.days || 90);
  const days = allowedDays.includes(requestedDays as typeof allowedDays[number]) ? requestedDays : 90;
  const returnTo = `/audience-insights?days=${days}`;
  const { user, allowed } = await requireSubmissionsViewer(returnTo);
  if (!allowed) return <AccessDenied user={user} area="Audience insight records" returnTo={returnTo} />;

  let events: AudienceEvent[];
  let actions: AudienceAction[];
  try {
    [events, actions] = await Promise.all([fetchAudienceEvents(days), fetchAudienceActions()]);
  } catch {
    return <AdminShell user={user} section="Private audience insight workspace"><ConfigurationPending /></AdminShell>;
  }

  const shareViews = count(events, "share_path_view");
  const questionnaireViews = count(events, "questionnaire_view");
  const starts = count(events, "questionnaire_start");
  const reviewReached = count(events, "questionnaire_step_view", "v3_review") + count(events, "questionnaire_step_view", "step_7");
  const submitAttempts = count(events, "questionnaire_submit_attempt");
  const submissions = count(events, "questionnaire_submit_success");
  const steps = questionnaireStepLabels.map(screen => ({
    label: screen.label,
    reached: count(events, "questionnaire_step_view", screen.detail),
    errors: 0,
  }));
  const validationDetails = detailCounts(events, "questionnaire_validation_error")
    .filter(([detail]) => !detail.startsWith("step_"));
  const needs = detailCounts(events, "audience_need_selected");
  const trustDrivers = detailCounts(events, "submission_trust_driver");
  const suggestions = generateSuggestions(events);
  const maxNeed = Math.max(...needs.map(item => item[1]), 1);
  const maxTrust = Math.max(...trustDrivers.map(item => item[1]), 1);

  const devices = ["mobile", "tablet", "desktop"].map(device => {
    const filtered = events.filter(event => event.device === device);
    const deviceViews = count(filtered, "questionnaire_view");
    const deviceStarts = count(filtered, "questionnaire_start");
    const deviceSubmissions = count(filtered, "questionnaire_submit_success");
    return { device, views: deviceViews, starts: deviceStarts, submissions: deviceSubmissions, startRate: rate(deviceStarts, deviceViews), completionRate: rate(deviceSubmissions, deviceStarts) };
  });

  const referrers = new Map<string, { starts: number; submissions: number }>();
  for (const event of events) {
    if (event.event !== "questionnaire_start" && event.event !== "questionnaire_submit_success") continue;
    const key = event.referrer || "Direct or unavailable";
    const current = referrers.get(key) || { starts: 0, submissions: 0 };
    if (event.event === "questionnaire_start") current.starts += 1;
    if (event.event === "questionnaire_submit_success") current.submissions += 1;
    referrers.set(key, current);
  }
  const topReferrers = [...referrers.entries()].sort((a, b) => (b[1].starts + b[1].submissions) - (a[1].starts + a[1].submissions)).slice(0, 8);

  const assists = (Object.keys(contentAssistLabels) as ContentAssist[]).map(assist => ({
    assist,
    starts: events.filter(event => event.event === "questionnaire_start" && event.contentAssists?.includes(assist)).length,
    submissions: events.filter(event => event.event === "questionnaire_submit_success" && event.contentAssists?.includes(assist)).length,
  }));

  return <AdminShell user={user} section="Private audience insight workspace">
    <section className="sd-hero ai-admin-hero"><div><p className="sd-kicker">Signal to action</p><h1>Audience insights</h1><p>Understand what visitors do, what they say they need, and which hypothesis should be tested next. Counts are non-identifying and never include questionnaire answers.</p></div><form method="get" className="ai-period"><label><span>Reporting period</span><select name="days" defaultValue={days}>{allowedDays.map(value => <option key={value} value={value}>Last {value} days</option>)}</select></label><button className="sd-button" type="submit">Update</button></form></section>

    <section className="sd-kpis ai-kpis" aria-label="Audience funnel summary">
      <InsightKpi label="Share-path views" value={shareViews} detail="Entry to participation options" />
      <InsightKpi label="Questionnaire views" value={questionnaireViews} detail={`${displayRate(rate(questionnaireViews, shareViews))} from share-path views`} />
      <InsightKpi label="Questionnaire starts" value={starts} detail={`${displayRate(rate(starts, questionnaireViews))} from form views`} />
      <InsightKpi label="Review reached" value={reviewReached} detail={`${displayRate(rate(reviewReached, starts))} from starts`} />
      <InsightKpi label="Send attempts" value={submitAttempts} detail={`${displayRate(rate(submissions, submitAttempts))} stored successfully`} />
      <InsightKpi label="Submitted" value={submissions} detail={`${displayRate(rate(submissions, starts))} from starts`} />
    </section>

    <section className="sd-workspace ai-workspace">
      {query.error && <p className="pc-admin-error" role="alert">{query.error}</p>}
      <div className="ai-boundary"><strong>Interpretation boundary</strong><span>These are counts, self-selected responses and associations. They are not representative audience research and do not establish why a person acted.</span></div>

      <section className="ai-panel"><div className="ai-panel-head"><div><p className="sd-kicker">Funnel</p><h2>Where people move or stop</h2></div><p>Screen reach is recorded once per questionnaire attempt in the active tab. Validation counts can include repeat attempts.</p></div><div className="ai-step-grid">{steps.map(step => <article key={step.label}><span>{step.label}</span><strong>{step.reached}</strong><small>reached</small></article>)}</div>{validationDetails.length > 0 && <div className="ai-detail-list">{validationDetails.map(([detail, value]) => <p key={detail}><strong>{value}</strong> {detailLabel(detail)}</p>)}</div>}</section>

      <div className="ai-two-column">
        <SignalList title="What visitors say they need" subtitle="Optional, self-selected pre-form responses" rows={needs.map(([value, valueCount]) => ({ label: optionLabel(value, audienceNeedOptions), count: valueCount, width: (valueCount / maxNeed) * 100 }))} empty="No optional need responses yet." />
        <SignalList title="What helped contributors proceed" subtitle="Optional responses stored separately from submissions" rows={trustDrivers.map(([value, valueCount]) => ({ label: optionLabel(value, trustDriverOptions), count: valueCount, width: (valueCount / maxTrust) * 100 }))} empty="No post-submission trust responses yet." />
      </div>

      <section className="ai-panel"><div className="ai-panel-head"><div><p className="sd-kicker">Context</p><h2>Device and referral signals</h2></div><p>Use sample sizes with every rate. A difference is a lead until it repeats or is supported by stated feedback.</p></div><div className="ai-table-pair"><InsightTable headings={["Device", "Views", "Starts", "Start rate", "Submitted", "Completion"]} rows={devices.map(item => [item.device, item.views, item.starts, displayRate(item.startRate), item.submissions, displayRate(item.completionRate)])} /><InsightTable headings={["Referral", "Starts", "Submitted", "Completion"]} rows={topReferrers.map(([referrer, values]) => [referrer, values.starts, values.submissions, displayRate(rate(values.submissions, values.starts))])} empty="No referral-linked starts yet." /></div></section>

      <section className="ai-panel"><div className="ai-panel-head"><div><p className="sd-kicker">Content assists</p><h2>Trust information seen before action</h2></div><p>These are broad page categories remembered only in the active browser tab. They show association, not causation.</p></div><div className="ai-assists">{assists.map(item => <article key={item.assist}><span>{contentAssistLabels[item.assist]}</span><strong>{item.starts}</strong><small>starts</small><strong>{item.submissions}</strong><small>submissions</small></article>)}</div></section>

      <section className="ai-panel"><div className="ai-panel-head"><div><p className="sd-kicker">Suggested hypotheses</p><h2>Signals that may deserve action</h2></div><p>Review these suggestions before logging an action. No recommendation is applied automatically.</p></div><div className="ai-suggestions">{suggestions.map((item, index) => <article key={`${item.signal}-${index}`}><span>{item.strength}</span><h3>{item.signal}</h3><p><strong>Interpretation:</strong> {item.interpretation}</p><p><strong>Possible action:</strong> {item.action}</p></article>)}</div></section>

      <section className="ai-panel ai-action-panel"><div className="ai-panel-head"><div><p className="sd-kicker">Decision record</p><h2>Action queue</h2></div><p>Log the signal, interpretation, action, owner and review date. Record the result after the test.</p></div><ActionCreateForm days={days} /><div className="ai-action-list">{actions.map(action => <ActionCard key={action.id} action={action} days={days} />)}</div>{actions.length === 0 && <p className="sd-empty">No actions logged yet. Use the form above to turn the first reviewed signal into a decision.</p>}</section>
    </section>
  </AdminShell>;
}

function InsightKpi({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <article><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function SignalList({ title, subtitle, rows, empty }: { title: string; subtitle: string; rows: { label: string; count: number; width: number }[]; empty: string }) {
  return <section className="ai-panel"><p className="sd-kicker">Stated signal</p><h2>{title}</h2><p>{subtitle}</p>{rows.length ? <div className="ai-bars">{rows.map(row => <div key={row.label}><span>{row.label}</span><strong>{row.count}</strong><i aria-hidden="true"><b style={{ width: `${row.width}%` }} /></i></div>)}</div> : <p className="sd-empty">{empty}</p>}</section>;
}

function InsightTable({ headings, rows, empty }: { headings: string[]; rows: (string | number)[][]; empty?: string }) {
  if (!rows.length) return <p className="sd-empty">{empty || "No data yet."}</p>;
  return <div className="sd-table-wrap"><table className="sd-table ai-table"><thead><tr>{headings.map(heading => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((value, cell) => <td key={`${index}-${cell}`}>{value}</td>)}</tr>)}</tbody></table></div>;
}

function ActionCreateForm({ days }: { days: number }) {
  return <form className="ai-admin-form" method="post" action="/api/admin/audience-actions"><input type="hidden" name="intent" value="create" /><input type="hidden" name="days" value={days} /><label><span>Signal and raw count</span><textarea name="signal" rows={3} maxLength={1000} required /></label><label><span>Interpretation or hypothesis</span><textarea name="interpretation" rows={3} maxLength={2000} required /></label><label><span>Proposed action</span><textarea name="proposed_action" rows={3} maxLength={2000} required /></label><div className="ai-form-row"><label><span>Evidence strength</span><select name="evidence_strength" defaultValue="hypothesis">{evidenceStrengths.map(value => <option key={value}>{value}</option>)}</select></label><label><span>Owner</span><input name="owner" maxLength={120} /></label><label><span>Review date</span><input name="review_date" type="date" /></label></div><button className="sd-button" type="submit">Add to action queue</button></form>;
}

function ActionCard({ action, days }: { action: AudienceAction; days: number }) {
  return <article><header><span className={`ai-action-status ${action.status}`}>{action.status.replaceAll("_", " ")}</span><small>Updated {new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeZone: "Australia/Melbourne" }).format(action.updatedAt)}</small></header><h3>{action.signal}</h3><p><strong>Interpretation:</strong> {action.interpretation}</p><p><strong>Action:</strong> {action.proposedAction}</p><dl><div><dt>Evidence</dt><dd>{action.evidenceStrength}</dd></div><div><dt>Owner</dt><dd>{action.owner || "Not assigned"}</dd></div><div><dt>Review</dt><dd>{action.reviewDate || "Not scheduled"}</dd></div></dl><form method="post" action="/api/admin/audience-actions" className="ai-action-update"><input type="hidden" name="intent" value="update" /><input type="hidden" name="id" value={action.id} /><input type="hidden" name="days" value={days} /><label><span>Status</span><select name="status" defaultValue={action.status}>{actionStatuses.map(value => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label><label><span>Owner</span><input name="owner" defaultValue={action.owner || ""} maxLength={120} /></label><label><span>Review date</span><input name="review_date" type="date" defaultValue={action.reviewDate || ""} /></label><label className="result"><span>Result or learning</span><textarea name="result" rows={2} maxLength={3000} defaultValue={action.result || ""} /></label><button className="sd-button" type="submit">Save review</button></form></article>;
}
