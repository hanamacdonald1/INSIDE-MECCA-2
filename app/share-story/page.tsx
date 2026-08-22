import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { AudienceInsightQuestion } from "../audience-insight-question";

const paths = [
  ["Share an account", "Describe what you experienced or directly witnessed.", "This is for current or former employees, contractors, managers and direct witnesses.", "/share-story/research-questionnaire", "Start the questionnaire"],
  ["Provide records", "Send material that may support, challenge or add context to an account.", "Read the safety and legal guidance before sending documents, screenshots or recordings.", "/share-story/evidence", "Read the guidance"],
  ["Ask about an interview", "Talk with us about a documentary interview and the effect your experience had on you.", "Asking about it does not commit you to recording, identification or publication.", "/documentary", "Learn about interviews"],
];

const faqs = [
  ["Can I submit anonymously?", "Yes. Choose Anonymous in the questionnaire and do not provide an email or details that identify you. Without contact information, follow-up and verification may be limited."],
  ["What does confidential mean?", "The project may know who you are but restricts your identity to verification, editorial, legal or necessary technical work. Confidentiality has technical and legal limits and is not the same as legal privilege."],
  ["Will my words be published?", "No submission grants publication permission. If the project wants to quote or use contributor material, it must seek separate, specific permission for the proposed words, identity treatment and format."],
  ["Does submitting make me a legally protected whistleblower?", "Not automatically. Inside MECCA is not MECCA's whistleblower hotline, a regulator or a law firm. Statutory protections depend on who you are, what is disclosed, who receives it and the steps followed. Seek independent legal advice before relying on them."],
  ["How are recurring themes counted?", "One eligible submission from one contributor is the primary unit. Duplicate or linked material is not counted as independent. Recurring tags are research flags, not proof or estimates of workforce prevalence."],
  ["Can I withdraw or delete my submission?", "You may request correction, withdrawal, deletion or an end to contact using your private submission reference. Any practical or legal limit, such as backups, a legal hold or material already published with separate permission, will be explained."],
];

export default function Participate() {
  return <SitePage>
    <PageHero label="Share your story" title="Start with the kind of contribution you want to make">
      <p>You can tell us what happened, provide relevant records or ask about a documentary interview. You may use more than one option, and you do not have to decide everything now.</p>
      <p>Sending information does not make it proven or give Inside MECCA permission to publish it.</p>
    </PageHero>
    <section className="rb-section"><div className="participation-grid">{paths.map(([title, description, audience, href, callToAction]) => <article key={title}><h2>{title}</h2><p>{description}</p><small>{audience}</small><Link className="rb-button red" href={href} data-analytics-event={href === "/share-story/research-questionnaire" ? "questionnaire_click" : undefined} data-analytics-detail={href === "/share-story/research-questionnaire" ? "share_story_hub" : undefined}>{callToAction}</Link></article>)}</div></section>
    <section className="rb-section ai-question-wrap"><AudienceInsightQuestion kind="audience_need_selected" /></section>
    <section className="rb-section dark"><p className="rb-kicker">You stay in control</p><h2>These decisions are separate</h2><div className="rb-grid">{[["Who knows your identity", "Remain anonymous, use a pseudonym or allow confidential contact."], ["Whether we contact you", "Choose whether the project may come back with verification questions."], ["Whether you are interviewed", "Completing a research form does not agree to a recorded or documentary interview."], ["Whether anything is published", "Quoting you, identifying you or using your material publicly requires separate, specific permission."]].map(([title, description]) => <article className="rb-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><p className="rb-note">No digital system can guarantee absolute anonymity. This project is not a company whistleblower service, regulator, legal practice or emergency service.</p></section>
    <section className="rb-section rb-faq" id="contributor-faq"><p className="rb-kicker">Before you decide</p><h2>Questions contributors often ask</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<div className="rb-actions"><Link className="rb-button red" href="/share-story/research-questionnaire" data-analytics-event="questionnaire_click" data-analytics-detail="share_story_faq">Read the full data notice and form</Link><Link className="rb-button" href="/methodology">How submissions are coded and checked</Link><Link className="rb-button" href="/legal-publication-policy#contributor-legal-limits">Australian legal-risk explanation</Link></div></section>
  </SitePage>;
}
