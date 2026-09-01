
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "../seo";
import { PageHero, SitePage } from "../site-shell";

export const metadata: Metadata = buildMetadata({
  title: "MECCA Workplace Investigation Updates",
  description: "Follow new MECCA workplace culture analysis, document breakdowns, investigation progress, evidence gaps, corrections and research milestones.",
  path: "/updates"
});

export default function Updates() {
  return (
    <SitePage>
      <PageHero label="Project updates · Last reviewed 30 August 2026" title="Where the investigation is up to">
        <p>Inside MECCA remains in the source-collection and structured-review phase. No findings about MECCA have been published.</p>
        <p>This page records significant project, publication and platform developments. Platform actions are described according to the information available to us. We do not attribute a report or restriction to any person or organisation without evidence.</p>
      </PageHero>

      <section className="rb-section">
        <div className="max-w-3xl space-y-16">
          <article className="border-b border-stone-300 pb-16">
            <p className="rb-kicker">MEDIA COVERAGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-950 mt-2 mb-3 leading-tight">
              Daily Mail reports on Inside MECCA and publishes MECCA’s response
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-mono text-stone-600 pb-4 border-b border-stone-200">
              <span><strong>Source:</strong> Daily Mail, Madeleine Damo, published and updated 27 August 2026 AEST.</span>
            </div>

            <div className="rb-lede space-y-6 mt-6">
              <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif">
                On 27 August 2026, the <em>Daily Mail</em> published a report by Madeleine Damo concerning the launch of the Inside MECCA research project, early submission accounts, and correspondence between MECCA Brands management and the project lead.
              </p>

              {/* Section 1 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                1. The project described by Daily Mail
              </h3>
              <p>
                The <em>Daily Mail</em> describes Inside MECCA as an independent public-interest research and advocacy project established online in August 2026 by Hana McDonald, a retail host employed casually with MECCA for nearly nine years.
              </p>
              <p>
                According to the report, the project invites current and former MECCA team members across the company&apos;s more than 100 Australian and New Zealand stores to contribute structured accounts of workplace culture, management conduct, bullying, favouritism, rostering, career progression, and mental health.
              </p>
              <p>
                The article notes that the website features an interactive chronology, research frameworks, and historical documentation detailing previous public workplace controversies, regulatory records, and legal proceedings involving the retailer.
              </p>

              {/* Section 2 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                2. Independence and contributor warnings
              </h3>
              <p>
                The report highlights that the Inside MECCA platform displays prominent disclaimers establishing that the initiative is independent and is not affiliated with, operated by, or endorsed by MECCA Brands Pty Ltd.
              </p>
              <p>
                The <em>Daily Mail</em> also notes that the website provides guidance regarding contributor boundaries, privacy protections, and legal considerations, advising respondents that uncorroborated submissions and public commentary do not constitute established findings of fact.
              </p>

              {/* Section 3 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                3. The Reddit post
              </h3>
              <p>
                According to the <em>Daily Mail</em>, Ms McDonald first shared a link to the research initiative anonymously within the Reddit community <code>r/Australianmakeup</code> in early August 2026.
              </p>
              <p>
                The article states that the Reddit post generated immediate community engagement, recording 259 comments and 278 upvotes before being removed from the subreddit within 48 hours.
              </p>

              {/* Section 4 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                4. How the project lead was identified
              </h3>
              <p>
                The report describes how MECCA&apos;s human resources department contacted Ms McDonald by email shortly after the Reddit post was published.
              </p>
              <p>
                Despite posting under an anonymous Reddit handle, MECCA identified her because the username matched the name of her pet dog—a detail Ms McDonald stated she had never communicated to head office management.
              </p>
              
              <blockquote className="my-4 p-4 sm:p-5 bg-stone-100 border-l-4 border-[#b42025] text-stone-800 italic font-serif text-sm sm:text-base leading-relaxed">
                &ldquo;We also wanted to ask you about a Reddit post we understand you authored under your dog&apos;s name and the associated website (insidemecca.net). For obvious reasons we need to discuss this with you. Please take the website and Reddit page down as soon as possible.&rdquo;
                <footer className="not-italic font-mono text-xs text-stone-600 mt-2 font-bold">— MECCA Human Resources email, 6 August 2026</footer>
              </blockquote>

              {/* Section 5 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                5. Further communications from MECCA
              </h3>
              <p>
                The <em>Daily Mail</em> reports that approximately one week later, MECCA HR sent a follow-up email regarding project accounts established across social media platforms:
              </p>
              
              <blockquote className="my-4 p-4 sm:p-5 bg-stone-100 border-l-4 border-[#b42025] text-stone-800 italic font-serif text-sm sm:text-base leading-relaxed">
                &ldquo;We still haven&apos;t heard from you in relation to our email below but we can see that you remain active on social media. In addition to the Reddit post and website, we can see that your related TikTok page went live last Friday and you set up an Instagram account earlier this week. All four of these forums incite disparaging comments about MECCA and MECCA personnel.&rdquo;
                <footer className="not-italic font-mono text-xs text-stone-600 mt-2 font-bold">— MECCA Human Resources follow-up communication</footer>
              </blockquote>

              <p>
                In the correspondence reported by the <em>Daily Mail</em>, MECCA expressed disappointment, asserted that confidential or proprietary information was being disclosed, and alleged unauthorized use of company trademarks.
              </p>

              {/* Section 6 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                6. Website and social-platform restrictions
              </h3>
              <p>
                The article details several third-party platform actions that occurred shortly after the project&apos;s initial launch:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>
                  <strong>Hosting Disruption:</strong> The original website instance was taken offline by hosting provider OpenAI citing &ldquo;legal reasons&rdquo; (returning a 404 error), after which Ms McDonald migrated the project to independent hosting infrastructure.
                </li>
                <li>
                  <strong>TikTok Account Ban:</strong> The project&apos;s TikTok account was banned under platform enforcement procedures.
                </li>
                <li>
                  <strong>Instagram Temporary Suspension:</strong> The associated Instagram account was temporarily suspended before access was restored.
                </li>
              </ul>
              <p>
                The <em>Daily Mail</em> notes that the underlying triggers and the specific reporting parties behind the third-party platform actions remain unconfirmed.
              </p>

              {/* Section 7 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                7. The project lead’s reported concerns
              </h3>
              <p>
                Speaking to the <em>Daily Mail</em>, Ms McDonald stated that the project operates under fair dealing provisions for criticism, review, and public reporting under Australian copyright law, and maintained that proprietary trade secrets were not disclosed:
              </p>
              <blockquote className="my-4 p-4 sm:p-5 bg-stone-100 border-l-4 border-stone-400 text-stone-800 italic font-serif text-sm sm:text-base leading-relaxed">
                &ldquo;My moral compass couldn&apos;t take a backseat. MECCA was Australia&apos;s fifth-best workplace in 2018, but behind the &lsquo;job a million girls would kill for&rsquo; is a culture of favouritism and bullying that mentally and physically damages young women.&rdquo;
                <footer className="not-italic font-mono text-xs text-stone-600 mt-2 font-bold">— Hana McDonald, speaking to Daily Mail</footer>
              </blockquote>
              <p>
                Ms McDonald also stated that favouritism often favoured employees matching a perceived &ldquo;Mecca look,&rdquo; asserting that qualified retail makeup artists were sometimes overlooked for career progression in favour of less experienced staff. She additionally raised concerns regarding MECCA&apos;s internal Whistleblower Policy, observing that it explicitly excludes personal workplace grievances such as interpersonal bullying and harassment.
              </p>

              {/* Section 8 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                8. MECCA’s response
              </h3>
              <p>
                When approached for comment by the <em>Daily Mail</em>, a spokesperson for MECCA Brands provided the following official response:
              </p>
              <blockquote className="my-4 p-4 sm:p-5 bg-[#eee9e2] border-l-4 border-[#b42025] text-stone-900 font-serif text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  &ldquo;MECCA Brands fully respects the right of team members to speak openly about their experiences. At the same time, we have a responsibility to protect MECCA&apos;s proprietary information and trademarks, as well as the privacy, health, and safety of other team members.&rdquo;
                </p>
                <p>
                  &ldquo;The welfare of our team members is our highest priority. We understand from Ms McDonald&apos;s recent online activity that she has concerns about her experience working at MECCA as a casual team member.&rdquo;
                </p>
                <p>
                  &ldquo;To date, she has not raised these issues with us directly or shared the details through any of the channels available to MECCA team members, so we have not had the opportunity to fully understand or respond to them.&rdquo;
                </p>
                <footer className="not-italic font-mono text-xs text-stone-600 pt-1 font-bold">— MECCA Brands Spokesperson statement, 27 August 2026</footer>
              </blockquote>

              {/* Section 9 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                9. Reader response
              </h3>
              <p>
                The <em>Daily Mail</em> article included reader comments submitted beneath the publication. These comments represent illustrative public reactions from general readers of an online news publication. They are not verified employee accounts, corroborated testimonies, or representative public sentiment:
              </p>
              <div className="space-y-3 my-4">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-sm">
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif">
                    &ldquo;Good for her, too many companies in Australia have a culture of bullying and silencing people. I support people taking a stand.&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 mt-1 font-medium">— Daily Mail reader comment</p>
                </div>
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-sm">
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif">
                    &ldquo;Working at Mecca is not my dream job. But good for her calling them out. It&apos;s in every industry, unfortunately.&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 mt-1 font-medium">— Daily Mail reader comment</p>
                </div>
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-sm">
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif">
                    &ldquo;Good for her! I love shopping at Mecca but after hearing this I will think twice.&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 mt-1 font-medium">— Daily Mail reader comment</p>
                </div>
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-sm">
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif">
                    &ldquo;Retail culture needs real transparency. Workers should have safe ways to speak up without fear of shift reductions.&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 mt-1 font-medium">— Daily Mail reader comment</p>
                </div>
              </div>

              {/* Section 10 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                10. What this source establishes
              </h3>
              <div className="p-4 sm:p-5 bg-stone-50 border border-stone-300 rounded-sm space-y-2 text-sm text-stone-800">
                <p>
                  The <em>Daily Mail</em> report establishes that:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>A mainstream news outlet published an article reporting on the launch, public profile, and scope of Inside MECCA.</li>
                  <li>MECCA confirmed in written correspondence that it contacted Ms McDonald regarding the Reddit post, website, and social media channels, requesting their removal and alleging trademark and confidentiality issues.</li>
                  <li>MECCA officially confirmed that Ms McDonald was employed as a casual team member and stated she had not raised these specific issues through internal grievance channels.</li>
                  <li>Ms McDonald publicly outlined her motivations, concerns regarding retail workplace culture and favouritism, and her view of Whistleblower Policy limitations.</li>
                  <li>The project experienced third-party hosting disruption and social media platform enforcement actions.</li>
                </ul>
              </div>

              {/* Section 11 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3">
                11. What this source does not establish
              </h3>
              <div className="p-4 sm:p-5 bg-stone-50 border border-stone-300 rounded-sm space-y-2 text-sm text-stone-800">
                <p>
                  The <em>Daily Mail</em> report does not establish:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The factual veracity of unverified allegations submitted by individual questionnaire respondents or online commenters.</li>
                  <li>Whether the experiences described by contributors reflect systemic conditions across MECCA&apos;s 100+ stores or the company as a whole.</li>
                  <li>Media attention is not independent legal or investigative corroboration, and reported claims are not investigative findings.</li>
                  <li>Who, if anyone, initiated reports resulting in the TikTok account ban or hosting platform suspension.</li>
                  <li>Workplace disputes remain subject to ongoing evidence review, right of reply, and objective verification.</li>
                </ul>
              </div>

              {/* Prominent external button & Access note */}
              <div className="pt-6 border-t border-stone-200">
                <a
                  className="rb-button red inline-flex items-center gap-2"
                  href="https://www.dailymail.com/news/article-16077185/mecca-hana-mcdonald-inside-mecca-reddit-favouritism-bullying-whistleblower-workplace.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the original Daily Mail report
                </a>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 max-w-2xl">
                  The original report may require a subscription. Inside MECCA does not reproduce the article or provide methods for bypassing publisher access controls.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#eee9e2] border-l-4 border-[#b42025] space-y-2">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">
                Status: External media coverage recorded. Claims, responses and reported platform events remain subject to source checking and evidence review.
              </p>
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">
                Source: Daily Mail, Madeleine Damo, published and updated 27 August 2026 AEST.
              </p>
              <p className="pt-2 border-t border-stone-300 text-xs font-semibold">
                <Link className="text-[#b42025] underline hover:text-red-800 transition-colors" href="/accountability">
                  Read how Inside MECCA assesses evidence
                </Link>
              </p>
            </div>
          </article>
          <article>
            <p className="rb-kicker">SUBMISSION REVIEW</p>
            <h2>A recurring concern about favouritism</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>An initial thematic review of Inside MECCA&apos;s private follow-up register has identified favouritism as a recurring concern.</p>
              <p>The register currently contains 28 submissions classified for substantive review. In at least 11, contributors explicitly describe favouritism, workplace cliques, inner circles, arbitrary decisions or staff being treated differently depending on their relationship with management.</p>

              {/* Compact statistic panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-4 sm:p-5 bg-[#eee9e2] border border-stone-300">
                <div className="border-l-2 border-[#b42025] pl-3.5">
                  <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#b42025]">28</span>
                  <span className="block text-xs sm:text-sm text-stone-700 font-medium mt-1 leading-snug">Submissions classified for substantive review</span>
                </div>
                <div className="border-l-2 border-[#b42025] pl-3.5">
                  <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#b42025]">At least 11</span>
                  <span className="block text-xs sm:text-sm text-stone-700 font-medium mt-1 leading-snug">Explicitly describing favouritism, cliques, inner circles, arbitrary decisions or unequal treatment</span>
                </div>
              </div>

              <h3 className="font-bold text-lg text-zinc-900 mt-6 mb-2">How the reported pattern appears</h3>
              <p>Contributors connect perceived favouritism with:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 mb-4">
                <li>access to training, promotions and specialist roles</li>
                <li>rostering, breaks and distribution of work</li>
                <li>management scrutiny and disciplinary treatment</li>
                <li>whether workplace concerns receive a meaningful response</li>
                <li>who feels supported and who feels pushed out</li>
              </ul>

              <p>Some contributors describe being qualified, experienced and actively seeking progression while watching other employees receive coaching or opportunities they believed were unavailable to them. Others describe carrying heavier workloads, receiving fewer shifts or being treated more harshly after falling out of favour.</p>

              <p>Several accounts also contain positive descriptions of customers, colleagues, friendships, product education or the work itself. In these accounts, the criticism is not a lack of commitment to the role. It is a perception that effort, experience and consistent standards could be outweighed by personal relationships and internal politics.</p>

              {/* Evidence boundary box */}
              <div className="mt-8 p-5 bg-[#eee9e2] border border-stone-300 border-l-4 border-l-[#b42025]">
                <h3 className="font-bold text-base text-[#b42025] m-0 mb-2">Evidence boundary</h3>
                <div className="space-y-3 text-sm text-stone-800 leading-relaxed">
                  <p>These submissions are contributor accounts, not findings of fact. Most have not been independently verified. Repeated accounts are not automatically independent corroboration, and this register cannot establish how common these experiences are across MECCA workplaces.</p>
                  <p>Supporting evidence, alternative explanations, publication permission and a fair opportunity for MECCA to respond remain separate stages of review.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Recurring theme identified. Confidential follow-up, evidence review and corroboration work continuing.</p>
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0 mt-1">Updated: 30 August 2026</p>
            </div>
          </article>

          <article>
            <h2>Culture-review public record expanded</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>Inside MECCA has expanded its 2019 workplace-culture record to connect the Estée Laundry reporting with MECCA&apos;s documented immediate response, including an external culture review, listening process, Stopline and workplace training.</p>
              <p>The update also records the later Whistleblower Policy amendment while making clear that the available sources do not establish that the culture review caused the policy change.</p>
              <p>No publicly released final review report, methodology, findings, recommendations or implementation plan has been located. This remains an evidence gap, not proof that the review was incomplete.</p>
              <p><a className="rb-button" href="/research-centre/public-claims/2019-workplace-culture">Read the full analysis</a></p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Updated: 23 August 2026</p>
            </div>
          </article>
          
          <article>
            <h2>Website moved to a new platform</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>Following an access restriction affecting the previous hosting platform, the Inside MECCA website was migrated to a different platform.</p>
              <p>The move reduces reliance on a single provider and protects the continuity of the project. The website&apos;s source material and existing research were preserved during the migration.</p>
              <p>The migration does not change Inside MECCA&apos;s evidence, privacy, editorial or legal-review standards.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Platform migration completed. Website continuity is being monitored.</p>
            </div>
          </article>

          <article>
            <h2>Three separate website backups</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>The Inside MECCA website and project source have been preserved in three separate backup locations.</p>
              <p>The backups exist to protect the project against technical failure, account loss or an interruption involving a single provider. Their locations and access details are not published for security reasons.</p>
              <p>They are continuity copies, not alternative public websites and not a way of bypassing platform or legal requirements.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Three separate backup copies created. Restoration testing and backup records will be maintained privately.</p>
            </div>
          </article>

          <article>
            <h2>TikTok account banned</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>Inside MECCA&apos;s TikTok account was banned following a platform enforcement action.</p>
              <p>We are using TikTok&apos;s official appeal and account-recovery processes. Relevant notices and account records are being retained privately.</p>
              <p>The information currently available does not identify who, if anyone, reported the account. There is no evidence establishing that MECCA or any other particular party caused the ban.</p>
              <p>We are reworking the username to match community standards and continue the project.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: TikTok account unavailable. Appeal and recovery work underway.</p>
            </div>
          </article>

          <article>
            <h2>Instagram account recovered</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>Inside MECCA&apos;s Instagram account was temporarily restricted but has since been recovered.</p>
              <p>During this period, Instagram removed one post containing detailed descriptive information. A private record of the post and its removal has been retained. We are reviewing how detailed and potentially sensitive descriptions are presented on social platforms.</p>
              <p>The cause of the restriction and the identity of any reporting party have not been confirmed. The recovery establishes that access was restored. It does not establish why the restriction occurred.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Instagram account recovered. Removed content under review.</p>
            </div>
          </article>

          <article>
            <h2>Public-commentary research completed</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>A wider review of public workplace commentary about MECCA has been completed.</p>
              <p>The material collected was weighted towards critical experiences. Across Reddit and employee-review platforms, recurring concerns included inconsistent or controlling management, micromanagement, favouritism, cliques, irregular casual hours, limited progression, inadequate training, burnout and difficulty raising concerns.</p>
              <p>Some workers also described supportive managers, strong friendships, enjoyable customer contact, product education and valuable employee benefits. In several accounts, these positive features appeared alongside serious criticism of management or working conditions.</p>
              <p>The collection was designed to locate recurring concerns and usable public quotations. It was not a representative workforce survey. The predominance of negative material in this archive cannot establish that most MECCA employees had a negative experience.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Research completed. Critical, mixed and positive excerpts undergoing final source, privacy and editorial checks.</p>
            </div>
          </article>

          <article>
            <h2>What employee-review sites show</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>The research included employee reviews published on SEEK, Indeed and Glassdoor.</p>
              
              <h3 className="font-bold text-lg mt-6">SEEK</h3>
              <p>SEEK reviews presented a mixed but frequently critical picture. Reported concerns included micromanagement, favouritism, inconsistent management, limited support on the shop floor, workplace cliques, irregular casual hours and limited career development.</p>
              <p>Positive reviews referred to product benefits, discounts, colleagues and opportunities to learn.</p>
              
              <h3 className="font-bold text-lg mt-6">Indeed</h3>
              <p>Indeed&apos;s overall company profile appeared more positive than SEEK&apos;s, but individual reviews still contained strongly critical accounts involving management, favouritism, insufficient training, unclear expectations and workplace culture.</p>
              <p>Other reviewers described supportive management, friendships, employee benefits and development opportunities.</p>
              
              <h3 className="font-bold text-lg mt-6">Glassdoor</h3>
              <p>Glassdoor presented a mixed overall picture. Individual reviews included both positive workplace experiences and criticism involving management, culture, progression and expectations.</p>
              <p>The number of reviews displayed in different parts of the platform was inconsistent during the research check. Raw review totals should therefore not be published without fresh verification.</p>
              
              <h3 className="font-bold text-lg mt-6">What these sites can establish</h3>
              <p>Employee-review sites establish that people posted these descriptions publicly. They can help identify recurring questions and contrasting experiences.</p>
              <p>They do not independently verify:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The reviewer&apos;s identity or employment</li>
                <li>Whether an account is complete or accurate</li>
                <li>Whether multiple comments are independent</li>
                <li>How common an experience is</li>
                <li>Whether a comment represents a particular store, team or the company as a whole</li>
              </ul>
              <p>Review platforms are self-selecting, and strongly negative experiences may be more likely to be posted. Platform ratings, review totals and recommendation percentages can also change and must be checked immediately before publication.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: SEEK, Indeed and Glassdoor included as public research sources. Individual quotations remain unverified public commentary.</p>
            </div>
          </article>

          <article>
            <h2>Public-commentary archive being expanded</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>A dedicated public-commentary archive has been prepared to show selected excerpts without publishing usernames, profile images, account handles or direct links that could unnecessarily identify commenters.</p>
              <p>Each approved excerpt will explain:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>What the public comment establishes</li>
                <li>What it does not establish</li>
                <li>Whether its viewpoint is positive, mixed or critical</li>
                <li>Which workplace topics it discusses</li>
                <li>That the account and employment status have not been independently verified</li>
              </ul>
              <p>Comments involving distinctive health, disability, discrimination or crisis details will remain withheld unless consent, careful paraphrasing and appropriate legal review make publication responsible.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Archive structure prepared. Additional excerpts awaiting final approval.</p>
            </div>
          </article>

          <article>
            <h2>Evidence review continues</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>The investigation remains focused on collecting and organising material by research question, workplace type, role, period and evidence status.</p>
              <p>Current work includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Separating first-hand accounts from public commentary and second-hand claims</li>
                <li>Reviewing documents while retaining their source and authenticity limitations</li>
                <li>Looking for independent support, contradictions and alternative explanations</li>
                <li>Identifying evidence gaps</li>
                <li>Preparing questions for a future MECCA right of reply</li>
                <li>Maintaining privacy and publication-permission records</li>
                <li>Preserving records of platform restrictions and content removals</li>
              </ul>
              <p>A repeated claim is not automatically corroboration, and a submission count is not a finding.</p>
            </div>
            <div className="mt-6 p-4 bg-[#eee9e2] border-l-4 border-[#b42025]">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-[#b42025] m-0">Status: Source collection and structured evidence review underway.</p>
            </div>
          </article>

        </div>
      </section>

      <section className="rb-section dark">
        <div className="max-w-3xl space-y-16">
          <article>
            <p className="rb-kicker">Open questions</p>
            <h2>What remains unconfirmed</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>The project has not established:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#b42025]">
                <li>Who reported the TikTok or Instagram accounts, if a user report was involved</li>
                <li>Whether the platform actions were automated or followed an external complaint</li>
                <li>Why the removed Instagram post was selected</li>
                <li>Whether TikTok will restore the banned account</li>
                <li>How common the experiences described in public workplace comments are</li>
                <li>Whether the experiences described occurred as reported</li>
                <li>Whether conditions are consistent across MECCA teams, stores, roles and periods</li>
              </ul>
              <p className="mt-6 italic">These are unresolved questions, not findings.</p>
            </div>
          </article>

          <article>
            <p className="rb-kicker">Next steps</p>
            <h2>What happens next</h2>
            <div className="rb-lede space-y-4 mt-4">
              <p>The next operational steps are:</p>
              <ol className="list-decimal pl-5 space-y-2 marker:text-[#b42025] marker:font-bold">
                <li>Continue the official TikTok appeal and recovery process. OR create a new one</li>
                <li>Monitor the recovered Instagram account and retain future platform notices.</li>
                <li>Test and document restoration from the website backups.</li>
                <li>Complete source, quotation and privacy checks for the public-commentary archive.</li>
                <li>Continue organising evidence by research question.</li>
                <li>Identify material that requires corroboration, expert review or legal advice.</li>
                <li>Prepare a specific and fair opportunity for MECCA to respond before analytical findings are finalised.</li>
              </ol>
              <p className="mt-8 font-bold text-[#b42025]">No publication date will be promised before the evidence, consent, fairness and review requirements are met.</p>
            </div>
          </article>
        </div>
      </section>
    </SitePage>
  );
}
