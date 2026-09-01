import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, siteUrl, defaultSocialImage } from "../../seo";
import { PageHero, SitePage } from "../../site-shell";
import { getAnalysisEntry } from "../data";

const entry = getAnalysisEntry("identity-inclusion")!;
const pageUrl = `${siteUrl}/analysis/${entry.slug}`;

export const metadata: Metadata = buildMetadata({
  title: "Identity, inclusion and workplace experience at MECCA",
  description: "An evidence-led examination of reported experiences involving appearance, race, disability, belonging, progression and speaking up.",
  path: `/analysis/${entry.slug}`,
  type: "article",
  publishedTime: entry.published,
  modifiedTime: entry.updated,
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.published,
    dateModified: entry.updated,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: `${siteUrl}${defaultSocialImage}`,
    isAccessibleForFree: true,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: ["MECCA Brands workplace culture", "MECCA identity and inclusion", "MECCA disability adjustments", "MECCA presentation standards"],
    inLanguage: "en-AU",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Analysis", item: `${siteUrl}/analysis` },
      { "@type": "ListItem", position: 3, name: entry.shortTitle, item: pageUrl },
    ],
  },
];

export default function IdentityInclusionPage() {
  return (
    <SitePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero label="Analysis / Identity and inclusion" title="Identity, inclusion and workplace experience at MECCA">
        <p>Public workplace accounts raise questions about whether identity, presentation, disability and belonging can affect people’s experiences at MECCA. This page organises those reported concerns, supportive experiences, company statements and evidence gaps without treating unverified accounts as established facts.</p>
      </PageHero>

      <section className="rb-section">
        <div className="rb-grid mt-8 mb-8">
          <article className="rb-card">
            <h3>Public commentary</h3>
            <p>Unverified research leads</p>
          </article>
          <article className="rb-card">
            <h3>Employee reviews</h3>
            <p>Self-selected public accounts</p>
          </article>
          <article className="rb-card">
            <h3>Company material</h3>
            <p>Attributed statements and commitments</p>
          </article>
          <article className="rb-card">
            <h3>Findings status</h3>
            <p>No findings published</p>
          </article>
        </div>
        <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
          <p className="text-sm">Some accounts describe treatment that their authors interpreted as discriminatory, exclusionary or connected to disability. Inside MECCA has not independently verified the identities, employment status or underlying events. These accounts identify questions for further investigation. They do not establish unlawful conduct or company-wide conditions.</p>
        </div>
      </section>

      <section className="rb-section">
        <h2>What this analysis is asking</h2>
        <div className="rb-lede mt-4 space-y-4">
          <p>Workplace inclusion is not limited to whether people feel welcome. It can also involve access to training, workplace adjustments, fair development opportunities, consistent presentation standards, psychological safety and confidence that concerns will be handled fairly.</p>
          <p>The current source material includes both supportive and critical experiences. However, the material collected for this analysis leans towards critical accounts because it was assembled to identify potential problems requiring further examination. It is not a representative survey of the MECCA workforce.</p>
        </div>
      </section>

      <section className="rb-section dark">
        <h2>Reported signals in the material reviewed</h2>
        <div className="rb-grid mt-8">
          <article className="rb-card">
            <h3>Appearance and presentation</h3>
            <p>Some public comments and employee reviews raise questions about makeup, tattoos, piercings, personal presentation and expectations about fitting a particular workplace image.</p>
            <p>The available material does not establish whether these expectations were formal company policy, local management practice or individual interpretation.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Unverified reported signal</p>
          </article>
          <article className="rb-card">
            <h3>Race and cultural identity</h3>
            <p>A small number of sensitive public accounts describe experiences their authors interpreted as racial or cultural exclusion.</p>
            <p>Because these accounts contain distinctive details, do not reproduce their exact wording. Removing a username would not make the authors fully unidentifiable.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Limited and sensitive reported signal</p>
          </article>
          <article className="rb-card">
            <h3>Disability and workplace adjustments</h3>
            <p>Public commentary and employee-review sites contain contrasting accounts. Some people describe supportive and compassionate management, while others describe exclusion, inadequate training or employment decisions they believed were connected to disability or health.</p>
            <p>These accounts require careful separation between the author’s interpretation, any supporting records and the legal elements of disability discrimination.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Mixed, sensitive and unverified accounts</p>
          </article>
          <article className="rb-card">
            <h3>Belonging and workplace cliques</h3>
            <p>Comments across Reddit and employee-review platforms repeatedly refer to friendships, supportive teams, workplace cliques, favouritism and pressure to fit in.</p>
            <p>Repetition across public platforms can identify a question for investigation. It does not prove that the comments are independent or that the experience was widespread.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Recurring public commentary, not a finding</p>
          </article>
          <article className="rb-card">
            <h3>Progression and visibility</h3>
            <p>Some public accounts question how training, specialist opportunities, permanent roles and promotions are allocated. Concerns include perceived favouritism, visibility to management and unclear development pathways.</p>
            <p>Other reviews describe meaningful learning and career-development opportunities.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Contrasting public accounts</p>
          </article>
          <article className="rb-card">
            <h3>Speaking up and psychological safety</h3>
            <p>Some public accounts describe difficulty raising concerns or feeling unheard. Historical reporting from 2019 records that MECCA announced an independent culture review and expanded reporting arrangements.</p>
            <p>The current research has not located a public result from that review or a current company response specifically addressing the later public comments.</p>
            <p className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#d2a6aa]">Evidence status: Historical context and unverified later commentary</p>
          </article>
        </div>
      </section>

      <section className="rb-section">
        <h2>What employee-review sites contribute</h2>
        <p className="rb-lede mt-4 mb-8">The research reviewed public workplace material on SEEK, Indeed and Glassdoor. These platforms contain both positive and critical accounts, but they are self-selecting and use different moderation and verification systems.</p>
        
        <div className="rb-grid">
          <article className="rb-card">
            <h3>SEEK</h3>
            <p>Reviews contain positive references to benefits, products and colleagues alongside recurring criticism involving management, career development, cliques, floor support and irregular casual hours.</p>
          </article>
          <article className="rb-card">
            <h3>Indeed</h3>
            <p>The overall company profile appears more positive than some other platforms, while individual reviews include criticism involving training, favouritism, unclear expectations and management. Other reviewers describe supportive managers, friendships and valuable benefits.</p>
          </article>
          <article className="rb-card">
            <h3>Glassdoor</h3>
            <p>Glassdoor presents a mixed picture involving culture, progression, management and work-life expectations. Review totals appeared inconsistent across different parts of the platform during the research check.</p>
          </article>
        </div>
        <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
          <p className="text-sm font-bold">Do not publish star ratings, recommendation percentages or review totals unless they are checked again immediately before publication. Platform figures can change and do not represent a scientific workforce survey.</p>
        </div>
      </section>

      <section className="rb-section dark">
        <h2>What the evidence can and cannot currently support</h2>
        <div className="mt-8 overflow-hidden rounded border border-stone-800">
          <div className="hidden md:grid grid-cols-4 gap-4 p-4 font-bold bg-[#1a1a1a] border-b border-stone-800 text-[#fff]">
            <div>Question</div>
            <div>Material currently available</div>
            <div>Current evidence status</div>
            <div>What would strengthen it</div>
          </div>
          <div className="divide-y divide-stone-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Appearance expectations</div>
              <div className="hidden md:block font-bold">Appearance expectations</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>Public comments and employee reviews</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Unverified signal</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Current written presentation standards, evidence of how they are applied and independent accounts across locations</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Race and cultural inclusion</div>
              <div className="hidden md:block font-bold">Race and cultural inclusion</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>A small number of sensitive public accounts</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Limited research lead</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Independent corroboration, relevant policies, complaint records and a company response</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Disability and adjustments</div>
              <div className="hidden md:block font-bold">Disability and adjustments</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>Contrasting public accounts and employee reviews</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Mixed and sensitive research leads</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Adjustment procedures, documented requests and responses, training records and independently verified accounts</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Belonging and cliques</div>
              <div className="hidden md:block font-bold">Belonging and cliques</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>Recurring public commentary across several sources</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Recurring theme, not corroborated fact</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Independent accounts, staff survey material, management practices and evidence offering alternative explanations</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Development and progression</div>
              <div className="hidden md:block font-bold">Development and progression</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>Public comments and employee reviews</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Contrasting accounts</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Promotion criteria, development pathways, allocation records and audit or monitoring information</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-[#ccc]">
              <div className="md:hidden font-bold text-[#fff]">Question: Speaking up</div>
              <div className="hidden md:block font-bold">Speaking up</div>
              <div><span className="md:hidden font-bold block mb-1">Material currently available:</span>Public commentary, 2019 reporting and historical public records</div>
              <div><span className="md:hidden font-bold block mb-1">Current evidence status:</span>Unresolved question</div>
              <div><span className="md:hidden font-bold block mb-1">What would strengthen it:</span>Current reporting procedures, complaint outcome information, review findings and evidence about changes since 2019</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rb-section">
        <h2>MECCA’s public position and historical response</h2>
        <div className="rb-lede mt-4 space-y-4">
          <p>MECCA’s employer-authored material describes learning opportunities, product education, workplace benefits and a culture intended to support team members.</p>
          <p>In November 2019, MECCA said it was taking allegations concerning bullying, harassment and discrimination seriously, apologised to anyone whose experience had not been positive, and announced an independent culture review and expanded reporting channels.</p>
          <p>Contemporary reporting also referred to a listening tour, Stopline, respect-at-work training and an Employee Assistance Program.</p>
          <p>A 2019 Fair Work Commission appeal decision records that an applicant sought stop-bullying orders and that workplace changes were implemented without an admission that bullying occurred. The decision is evidence of proceedings and remedial steps. It is not a finding that the alleged bullying occurred.</p>
          <p>Later public comments do not, by themselves, prove that the 2019 measures failed or that the reported conditions were uniform.</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="font-bold">Public context sources:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="https://au.seek.com/companies/mecca-brands-813817/culture" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">MECCA Brands on SEEK</a> (Employer-authored material)</li>
            <li><a href="https://www.pedestrian.tv/news/mecca-investigating-bullying-claims/" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">MECCA Investigating Bullying Claims (Pedestrian.tv)</a></li>
            <li><a href="https://insideretail.com.au/news/our-culture-may-have-been-tested-mecca-201911" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">&quot;Our culture may have been tested&quot;: MECCA (Inside Retail)</a></li>
            <li><a href="https://www.fwc.gov.au/documents/decisionssigned/html/pdf/2019fwcfb2771.pdf" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">Fair Work Commission Appeal Decision PR713735 (PDF)</a></li>
          </ul>
        </div>
      </section>

      <section className="rb-section dark">
        <h2>The limits stay attached</h2>
        <div className="rb-lede mt-4 space-y-4">
          <p>The current material cannot establish:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#b42025]">
            <li>How common any reported experience is</li>
            <li>Whether a commenter worked for MECCA</li>
            <li>Whether an account is complete or accurate</li>
            <li>Whether similar comments are genuinely independent</li>
            <li>Whether treatment occurred because of a protected attribute</li>
            <li>Whether an individual manager’s conduct represented company policy</li>
            <li>Whether conditions were consistent across stores, teams, roles or periods</li>
            <li>Whether any conduct met the legal definition of discrimination, bullying or adverse action</li>
          </ul>
          <p>Do not infer a person’s race, disability, gender, sexuality, religion or other identity from appearance, language, location or online activity.</p>
          <p>Use &quot;reported signal&quot; for isolated or sensitive accounts. Use &quot;recurring public commentary&quot; when similar accounts appear across sources. Do not call something a pattern or finding unless the underlying evidence justifies that description.</p>
        </div>
      </section>

      <section className="rb-section">
        <h2>Questions requiring a company response</h2>
        <div className="rb-lede mt-4 space-y-4">
          <ol className="list-decimal pl-5 space-y-2 marker:text-[#b42025] marker:font-bold">
            <li>What current presentation standards apply to makeup, tattoos, piercings and personal appearance?</li>
            <li>How are those standards monitored for consistency across stores, distribution centres and head office?</li>
            <li>What process is used to request, assess and document disability-related workplace adjustments?</li>
            <li>How are training, specialist opportunities, permanent roles and promotions allocated and reviewed for fairness?</li>
            <li>What reporting options are available to casual workers and people who do not feel safe reporting through local management?</li>
            <li>What recommendations resulted from the independent culture review announced in 2019, and which recommendations were implemented?</li>
            <li>How does MECCA assess psychological safety, inclusion and management consistency across locations?</li>
            <li>Does MECCA dispute that these themes remain current, and what evidence can it provide about changes since 2019?</li>
          </ol>
        </div>
        <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
          <p className="text-sm">These questions are prepared for a future right-of-reply process. Do not imply that they have already been sent or answered unless the project records confirm that.</p>
        </div>
      </section>

      <section className="rb-section dark">
        <h2>Help us examine the question responsibly</h2>
        <div className="rb-lede mt-4 space-y-4 mb-8">
          <p>Inside MECCA is seeking information that supports, challenges or adds context to these reported experiences. This may include first-hand accounts, written policies, training material, adjustment requests, complaint records, development criteria or evidence of supportive workplace practices.</p>
          <p>Sharing information does not give Inside MECCA permission to identify you, contact other people, quote you or publish your material. Those decisions remain separate.</p>
        </div>
        <div className="rb-actions">
          <Link className="rb-button red" href="/share-story">Share your experience</Link>
          <Link className="rb-button" href="/evidence">Read the evidence standards</Link>
          <Link className="rb-button" href="/accountability">Request a correction or removal</Link>
        </div>
      </section>
    </SitePage>
  );
}
