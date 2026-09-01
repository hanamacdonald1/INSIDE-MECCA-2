import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { AudienceInsightQuestion } from "../audience-insight-question";

const faqs = [
  ["Can I submit anonymously?", "Yes. Choose Anonymous in the questionnaire and do not provide an email or details that identify you. Without contact information, follow-up and verification may be limited."],
  ["What does confidential mean?", "I may know who you are but restrict your identity to verification, editorial, legal or necessary technical work. Confidentiality has technical and legal limits and is not the same as legal privilege."],
  ["Will my words be published?", "No submission grants publication permission. If I want to quote or use contributor material, I must seek separate, specific permission for the proposed words, identity treatment and format."],
  ["Does submitting make me a legally protected whistleblower?", "Not automatically. Inside MECCA is not MECCA's whistleblower hotline, a regulator or a law firm. Statutory protections depend on who you are, what is disclosed, who receives it and the steps followed. Seek independent legal advice before relying on them."],
  ["How are recurring themes counted?", "One eligible submission from one contributor is the primary unit. Duplicate or linked material is not counted as independent. Recurring tags are research flags, not proof or estimates of workforce prevalence."],
  ["Can I withdraw or delete my submission?", "You may request correction, withdrawal, deletion or an end to contact using your private submission reference. Any practical or legal limit, such as backups, a legal hold or material already published with separate permission, will be explained."],
];

export default function Participate() {
  return (
    <SitePage>
      <PageHero label="SHARE YOUR STORY" title="How would you like to take part?">
        <p>Choose the option that fits your situation. You can use more than one pathway, and you do not need to make any decision about publication now.</p>
        <p>Sending information does not make it proven or give Inside MECCA permission to publish it.</p>
      </PageHero>
      
      {/* 3 Pathway Cards */}
      <section className="px-6 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto w-full box-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <article className="bg-[#f7f5f1] border border-stone-200 p-6 md:p-8 flex flex-col h-full rounded-sm">
            <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">YOUR EXPERIENCE</p>
            <h2 className="text-2xl font-serif text-stone-900 mb-4">Tell me what happened</h2>
            <p className="text-stone-700 text-[16px] md:text-[17px] leading-[1.6] mb-6 flex-grow">
              Share a first-hand workplace experience. A brief account is enough, and only clearly marked questions are required.
            </p>
            <div className="pt-6 border-t border-stone-200 mt-auto">
              <p className="text-stone-500 text-[11px] uppercase tracking-wider font-bold font-mono mb-4">Approximately 5 to 10 minutes</p>
              <Link 
                className="flex items-center justify-center min-h-[48px] px-4 font-bold text-[15px] tracking-wide rounded-sm transition-colors w-full text-center bg-[#b42025] hover:bg-[#8b181c] text-white border border-[#b42025] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                href="/share-story/research-questionnaire" 
                data-analytics-event="questionnaire_click" 
                data-analytics-detail="share_story_hub"
              >
                Start the questionnaire
              </Link>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-[#f7f5f1] border border-stone-200 p-6 md:p-8 flex flex-col h-full rounded-sm">
            <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">RECORDS OR DOCUMENTS</p>
            <h2 className="text-2xl font-serif text-stone-900 mb-4">Provide records safely</h2>
            <p className="text-stone-700 text-[16px] md:text-[17px] leading-[1.6] mb-6 flex-grow">
              Review the source-safety guidance before sharing messages, rosters, documents or other records you have legitimate access to.
            </p>
            <div className="pt-6 border-t border-stone-200 mt-auto">
              <p className="text-stone-500 text-[11px] uppercase tracking-wider font-bold font-mono mb-4">Safety guidance before upload</p>
              <Link 
                className="flex items-center justify-center min-h-[48px] px-4 font-bold text-[15px] tracking-wide rounded-sm transition-colors w-full text-center bg-transparent text-stone-800 border border-stone-300 hover:text-red-700 hover:border-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                href="/share-story/evidence" 
              >
                Read the source-safety guide
              </Link>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-[#f7f5f1] border border-stone-200 p-6 md:p-8 flex flex-col h-full rounded-sm">
            <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">DOCUMENTARY INTERVIEW</p>
            <h2 className="text-2xl font-serif text-stone-900 mb-4">Ask about an interview</h2>
            <p className="text-stone-700 text-[16px] md:text-[17px] leading-[1.6] mb-6 flex-grow">
              Ask questions before deciding whether a documentary conversation is right for you. Completing the research questionnaire does not consent to an interview.
            </p>
            <div className="pt-6 border-t border-stone-200 mt-auto">
              <p className="text-stone-500 text-[11px] uppercase tracking-wider font-bold font-mono mb-4">An initial question creates no commitment</p>
              <a 
                className="flex items-center justify-center min-h-[48px] px-4 font-bold text-[15px] tracking-wide rounded-sm transition-colors w-full text-center bg-transparent text-stone-800 border border-stone-300 hover:text-red-700 hover:border-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                href="mailto:shareyourstory@insidemecca.net" 
              >
                Ask a question first
              </a>
            </div>
          </article>

        </div>
      </section>

      {/* Participation control summary */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-[#111] text-white w-full box-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">You stay in control</p>
          <h2 className="text-3xl font-serif mb-8 text-stone-100">These decisions are separate</h2>
          
          <ul className="space-y-6 md:space-y-4 mb-8">
            {[
              ["Who knows your identity", "Remain anonymous, use a pseudonym or allow confidential contact."], 
              ["Whether I may contact you", "Choose whether I may come back with verification questions."], 
              ["Whether you are interviewed", "Completing a research form does not agree to a recorded or documentary interview."], 
              ["Whether anything is published", "Quoting you, identifying you or using your material publicly requires separate, specific permission."]
            ].map(([title, description]) => (
              <li key={title} className="bg-[#1a1a1a] border-l-2 border-[#b42025] p-5 md:p-6 rounded-r-sm">
                <h3 className="text-[17px] font-bold text-stone-100 mb-1">{title}</h3>
                <p className="text-stone-300 text-[16px] md:text-[17px] leading-relaxed">{description}</p>
              </li>
            ))}
          </ul>
          
          <p className="text-stone-400 text-sm leading-relaxed max-w-prose">
            No digital system can guarantee absolute anonymity. This project is not a company whistleblower service, regulator, legal practice or emergency service.
          </p>
        </div>
      </section>

      {/* Optional feedback */}
      <section className="px-6 md:px-12 py-12 border-b border-stone-200 bg-stone-50 w-full box-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">Optional feedback</p>
          <p className="text-stone-700 text-[16px] mb-6">Answering this is not required to continue.</p>
          <AudienceInsightQuestion kind="audience_need_selected" />
        </div>
      </section>

      <section className="rb-section rb-faq" id="contributor-faq">
        <p className="rb-kicker">Before you decide</p>
        <h2>Questions contributors often ask</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
        <div className="rb-actions">
          <Link className="rb-button red" href="/share-story/research-questionnaire" data-analytics-event="questionnaire_click" data-analytics-detail="share_story_faq">Read the full data notice and form</Link>
          <Link className="rb-button" href="/methodology">How submissions are coded and checked</Link>
          <Link className="rb-button" href="/legal-publication-policy#contributor-legal-limits">Australian legal-risk explanation</Link>
        </div>
      </section>
    </SitePage>
  );
}
