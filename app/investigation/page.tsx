import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import { PageHero, SitePage } from "../site-shell";

interface TopicItem {
  name: string;
  description: string;
}

interface ResearchGroup {
  id: string;
  name: string;
  description: string;
  topics: TopicItem[];
}

const researchGroups: ResearchGroup[] = [
  {
    id: "working-life-and-culture",
    name: "Group 1: Working life and culture",
    description: "Examining interpersonal dynamics, team atmosphere, store leadership practices, and daily workplace wellbeing.",
    topics: [
      {
        name: "Leadership and management",
        description: "Communication styles, supervisory accountability, leadership conduct, and local decision-making standards.",
      },
      {
        name: "Bullying and interpersonal conduct",
        description: "Reported experiences of exclusion, intimidation, hostility, humiliation, or inappropriate workplace behaviour.",
      },
      {
        name: "Psychological safety",
        description: "Employee comfort in speaking up, workplace stress levels, wellbeing support, and management responses to vulnerability.",
      },
      {
        name: "Organisational culture",
        description: "Team dynamics, shared values, unspoken expectations, and cultural consistency across different store locations.",
      },
      {
        name: "Diversity, inclusion and accessibility",
        description: "Workplace accommodation, representation, inclusive practices, discrimination concerns, and stated company commitments.",
      },
      {
        name: "Customer behaviour and employee safety",
        description: "Store protocols, management support, and safety responses during aggressive or abusive customer interactions.",
      },
    ],
  },
  {
    id: "employment-systems",
    name: "Group 2: Employment systems",
    description: "Investigating the formal and informal mechanisms governing hiring, scheduling, advancement, and role transitions.",
    topics: [
      {
        name: "Career progression",
        description: "Promotion pathways, transparent criteria, access to specialist roles, development plans, and perceived favouritism.",
      },
      {
        name: "Performance and feedback",
        description: "Formal appraisal processes, informal check-ins, coaching consistency, performance expectations, and disciplinary steps.",
      },
      {
        name: "Training and education",
        description: "Onboarding preparation, product masterclasses, professional skill development, and equitable access to MECCAversity learning.",
      },
      {
        name: "Casual employment, rostering and job security",
        description: "Roster allocations, shift predictability, communication, conversion practices, and seasonal workforce management.",
      },
      {
        name: "Organisational change",
        description: "Store restructures, role redesigns, headcount adjustments, and communication during operational changes.",
      },
    ],
  },
  {
    id: "speaking-up-and-accountability",
    name: "Group 3: Speaking up and accountability",
    description: "Evaluating the channels available for raising grievances, protection mechanisms, and governance oversight.",
    topics: [
      {
        name: "Reporting concerns",
        description: "Availability, accessibility, and employee awareness of internal grievance channels and independent avenues.",
      },
      {
        name: "Complaint and escalation processes",
        description: "How grievances are received, triaged, investigated, and concluded across store leadership and People Support.",
      },
      {
        name: "Retaliation concerns",
        description: "Protections against adverse action, shift reductions, social ostracisation, or career detriment after speaking up.",
      },
      {
        name: "Management and organisational accountability",
        description: "Executive oversight, leadership responsibility, record-keeping, and whether systems improve after issues are flagged.",
      },
      {
        name: "Whether documented commitments operated in practice",
        description: "Comparing written employer policies, values, and public statements against real day-to-day employee experiences.",
      },
    ],
  },
];

interface ModuleItem {
  part: string;
  id: string;
  title: string;
  purpose: string;
  centralQuestion: string;
  topics: string[];
  actionLink?: {
    label: string;
    href: string;
  };
}

const investigationModules: ModuleItem[] = [
  {
    part: "A",
    id: "how-the-work-is-done",
    title: "How the work is done",
    purpose: "Sets the rules and standards for gathering, checking, and describing evidence with transparent research limits.",
    centralQuestion: "How was the evidence collected, checked and analysed?",
    topics: ["Consent protocols", "Verification standards", "Evidence grading", "Scope limitations", "Privacy safeguards"],
    actionLink: {
      label: "Read evidence methodology",
      href: "/methodology",
    },
  },
  {
    part: "B",
    id: "what-employees-experienced",
    title: "What employees experienced",
    purpose: "Examines day-to-day working life to assess whether reported patterns appear across stores, regions, roles, and timeframes.",
    centralQuestion: "What did employees experience while working at MECCA?",
    topics: ["Store culture", "Interpersonal conduct", "Workload pressures", "Mental health impact", "Favouritism concerns"],
    actionLink: {
      label: "Complete research questionnaire",
      href: "/share-story/research-questionnaire",
    },
  },
  {
    part: "C",
    id: "performance-and-careers",
    title: "Performance and careers",
    purpose: "Assesses how MECCA's documented development and appraisal systems functioned in practice across the retail network.",
    centralQuestion: "Did MECCA's people systems operate as described?",
    topics: ["Performance reviews", "Development planning", "Promotion criteria", "MECCAversity access", "Manager responsibilities"],
    actionLink: {
      label: "View development planning note",
      href: "/investigation/development-planning",
    },
  },
  {
    part: "D",
    id: "speaking-up",
    title: "Speaking up",
    purpose: "Examines the handling of employee complaints, investigation processes, resolution outcomes, and post-report treatment.",
    centralQuestion: "What happened after employees raised concerns?",
    topics: ["HR escalation", "Stopline reporting", "Whistleblower protections", "Retaliation risks", "Investigation outcomes"],
    actionLink: {
      label: "Read complaints policy analysis",
      href: "/analysis/mecca-complaints-whistleblower-policy",
    },
  },
  {
    part: "E",
    id: "records",
    title: "Records",
    purpose: "Corroborates and tests employee accounts against contemporaneous documentation, rosters, contracts, and policies.",
    centralQuestion: "What parts of an employee account can be checked against records?",
    topics: ["Employment contracts", "Rostering records", "Performance appraisals", "Written grievances", "Exit documentation"],
    actionLink: {
      label: "Provide relevant records safely",
      href: "/share-story/evidence",
    },
  },
  {
    part: "F",
    id: "leadership-and-accountability",
    title: "Leadership and accountability",
    purpose: "Examines systemic governance, supervisory responsibility, and organisational responses to reported culture issues.",
    centralQuestion: "How were workplace systems governed, monitored and improved?",
    topics: ["Store leadership", "Regional management", "People Support / HR", "Executive governance", "Systemic monitoring"],
    actionLink: {
      label: "Explore public record",
      href: "/public-record",
    },
  },
  {
    part: "G",
    id: "documentary-interviews",
    title: "Documentary interviews",
    purpose: "Explores the deeper personal, relational, and career significance of lived workplace experiences for participating workers.",
    centralQuestion: "What did these experiences mean to the people who lived them?",
    topics: ["Career trajectories", "Interpersonal relationships", "Turning points", "Ongoing impact", "Perspectives on reform"],
    actionLink: {
      label: "Ask about a documentary interview",
      href: "/documentary",
    },
  },
  {
    part: "H",
    id: "what-the-evidence-supports",
    title: "What the evidence supports",
    purpose: "Tests potential findings against all available evidence, including contradictions, alternative explanations, and company replies.",
    centralQuestion: "What can the evidence responsibly support?",
    topics: ["Source weighting", "Independent corroboration", "Contradictory evidence", "Company responses", "Substantive thresholds"],
    actionLink: {
      label: "Explore evidence library",
      href: "/evidence",
    },
  },
  {
    part: "I",
    id: "what-should-happen-next",
    title: "What should happen next",
    purpose: "Develops constructive, evidence-based recommendations for employees, management, retail industry bodies, and regulators.",
    centralQuestion: "What should change, and who can act?",
    topics: ["Employer practices", "Employee safeguards", "Retail industry standards", "Regulatory oversight", "Public accountability"],
    actionLink: {
      label: "View change agenda",
      href: "/change-agenda",
    },
  },
];

export default function InvestigationPage() {
  return (
    <SitePage>
      {/* 1. Page Purpose (Hero) */}
      <PageHero
        label="The investigation"
        title="What Inside MECCA is investigating, and why"
      >
        <p>
          Inside MECCA examines employee experiences, workplace systems, company commitments and available records to understand what happened in practice and what the evidence can responsibly support.
        </p>
        <div className="rb-actions">
          <Link className="rb-button red" href="/share-story">
            Share your experience
          </Link>
          <Link className="rb-button" href="/evidence">
            Explore the evidence
          </Link>
        </div>
      </PageHero>

      {/* 2. Current Status */}
      <section className="border-b border-[#cfc7bd] bg-[#161616] text-white py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="border-l-2 border-[#b42025] pl-3 py-1">
            <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mb-1">
              Current phase
            </span>
            <strong className="text-sm sm:text-base font-sans text-stone-100 font-semibold leading-snug">
              Source collection and structured evidence review
            </strong>
          </div>
          <div className="border-l-2 border-stone-600 pl-3 py-1">
            <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mb-1">
              Findings published
            </span>
            <strong className="text-sm sm:text-base font-sans text-stone-100 font-semibold leading-snug">
              No findings about MECCA have been published
            </strong>
          </div>
          <div className="border-l-2 border-stone-600 pl-3 py-1">
            <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mb-1">
              Evidence position
            </span>
            <strong className="text-sm sm:text-base font-sans text-stone-100 font-semibold leading-snug">
              Research questions and recurring concerns are not findings
            </strong>
          </div>
          <div className="border-l-2 border-stone-600 pl-3 py-1">
            <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mb-1">
              Last reviewed
            </span>
            <strong className="text-sm sm:text-base font-sans text-stone-100 font-semibold leading-snug">
              30 August 2026
            </strong>
          </div>
        </div>
      </section>

      {/* 3. Main Research Questions */}
      <section id="research-questions" className="rb-section scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="rb-kicker">Research scope & inquiries</p>
          <h2 className="text-clamp-heading font-serif font-normal">
            The core research questions guiding the investigation
          </h2>
          <p className="rb-lede mt-3">
            These themes have been identified from public records, company policies, media reporting, and initial contributor submissions. They represent the systematic questions guiding our research.
          </p>

          <div className="mt-4 p-4 md:p-5 bg-amber-50/80 border border-amber-200 text-stone-800 rounded-sm text-sm md:text-[15px] leading-relaxed max-w-4xl">
            <strong className="font-semibold text-amber-950 block mb-1">
              Important research note:
            </strong>
            These are questions guiding the investigation. Their inclusion does not mean that misconduct, a recurring pattern or a systemic problem has been established.
          </div>

          <div className="mt-10 space-y-12">
            {researchGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <div className="border-b border-stone-300 pb-3 mb-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-zinc-900 font-normal">
                    {group.name}
                  </h3>
                  <p className="text-stone-600 text-sm md:text-base mt-1 max-w-3xl">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {group.topics.map((topic) => (
                    <article
                      key={topic.name}
                      className="p-5 bg-white border border-[#cfc7bd] rounded-sm hover:border-[#b42025]/60 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#b42025] font-bold block mb-2">
                          Inquiry topic
                        </span>
                        <h4 className="font-sans font-bold text-base md:text-lg text-zinc-950 mb-2 leading-snug">
                          {topic.name}
                        </h4>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Investigation Structure */}
      <section id="structure" className="rb-section dark py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <p className="rb-kicker text-red-400">Nine-part framework</p>
          <h2 className="text-clamp-heading font-serif font-normal text-white">
            How the investigation is organised
          </h2>
          <p className="rb-lede text-stone-300 mt-3 max-w-3xl">
            To ensure analytical rigor and prevent testimony, documents, interviews, findings, and policy proposals from being conflated, the inquiry operates across nine discrete parts.
          </p>

          {/* Quick jump navigation */}
          <nav aria-label="Investigation parts index" className="mt-8 flex flex-wrap gap-2 pb-4">
            {investigationModules.map((m) => (
              <a
                key={m.part}
                href={`#part-${m.part.toLowerCase()}`}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-xs font-mono text-stone-300 hover:text-white rounded-sm transition-colors"
              >
                Part {m.part}: {m.title}
              </a>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {investigationModules.map((m) => (
              <article
                key={m.part}
                id={`part-${m.part.toLowerCase()}`}
                className="p-6 bg-zinc-900 border border-zinc-700/80 rounded-sm flex flex-col justify-between scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                      Part {m.part}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      Module {m.part}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-white font-normal mb-2 leading-tight">
                    {m.title}
                  </h3>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    {m.purpose}
                  </p>

                  <div className="bg-zinc-950/80 p-3.5 border-l-2 border-red-500 rounded-sm mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                      Central question
                    </span>
                    <p className="font-serif text-sm md:text-base text-zinc-200 italic leading-snug">
                      “{m.centralQuestion}”
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-2">
                      Topic examples
                    </span>
                    <ul className="space-y-1">
                      {m.topics.map((item) => (
                        <li key={item} className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-red-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {m.actionLink && (
                  <div className="pt-4 mt-2 border-t border-zinc-800">
                    <Link
                      href={m.actionLink.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                    >
                      <span>{m.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <p className="m-0">
              For comprehensive details on evidence thresholds, rights of reply, and corrections, see our dedicated standards pages.
            </p>
            <div className="flex gap-4">
              <Link href="/methodology" className="text-red-400 underline underline-offset-2 hover:text-red-300">
                Evidence Methodology
              </Link>
              <Link href="/evidence" className="text-red-400 underline underline-offset-2 hover:text-red-300">
                Evidence Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Evidence Boundary */}
      <section className="rb-section bg-[#eee9e2] py-14 md:py-18">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 bg-white border border-[#cfc7bd] border-l-4 border-l-[#b42025] rounded-sm shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#b42025]">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                Evidence boundary
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-zinc-950 font-normal mb-3">
              A research question is not a finding
            </h3>

            <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-4">
              The investigation must remain capable of finding shared concerns, isolated experiences, conflicting accounts, positive experiences, mixed evidence or insufficient support for a proposed claim. Repetition alone does not establish accuracy, prevalence or a systemic pattern.
            </p>

            <div className="border-t border-stone-200 pt-4 mt-4 space-y-2.5 text-xs md:text-sm text-stone-600">
              <div className="flex items-start gap-2">
                <span className="text-[#b42025] font-bold">•</span>
                <p className="m-0">
                  <strong className="text-zinc-900">Submissions are research leads, not proof:</strong> Contributor accounts indicate areas for structured inquiry and corroboration rather than verified factual findings.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#b42025] font-bold">•</span>
                <p className="m-0">
                  <strong className="text-zinc-900">Company policies show stated expectations, not necessarily implementation:</strong> Documented human resources materials reflect written rules, which must be independently tested against workplace reality.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#b42025] font-bold">•</span>
                <p className="m-0">
                  <strong className="text-zinc-900">Public comments and media reports remain attributed source material:</strong> External commentary and news stories are documented as public reaction and reporting, not investigative determinations.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#b42025] font-bold">•</span>
                <p className="m-0">
                  <strong className="text-zinc-900">Findings require multi-stage verification:</strong> Any published finding requires formal evidence assessment, review of contradictory material, and a fair, timely opportunity for MECCA to respond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ways to Contribute (Contribution Section) */}
      <section className="rb-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="rb-kicker">Participation & evidence</p>
          <h2 className="text-clamp-heading font-serif font-normal text-zinc-950">
            Ways to contribute to the investigation
          </h2>
          <p className="rb-lede text-stone-600 mt-3 max-w-3xl">
            Inside MECCA provides separate, confidential participation pathways depending on whether you wish to submit an account, supply contemporary records, or register interest in an interview.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pathway 1 */}
            <article className="p-6 md:p-8 bg-white border border-[#cfc7bd] rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center text-[#b42025] mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#b42025] font-bold block mb-1">
                  Pathway 1
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 font-normal mb-3">
                  Share a workplace experience
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Provide a confidential first-hand account or witness submission regarding store culture, management practices, development, or speaking up.
                </p>
              </div>
              <Link
                href="/share-story"
                className="w-full flex items-center justify-center min-h-[46px] bg-[#b42025] text-white font-bold text-sm hover:bg-[#8e171b] transition-colors rounded-sm"
              >
                Share your experience
              </Link>
            </article>

            {/* Pathway 2 */}
            <article className="p-6 md:p-8 bg-white border border-[#cfc7bd] rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-stone-100 border border-stone-300 flex items-center justify-center text-zinc-800 mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600 font-bold block mb-1">
                  Pathway 2
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 font-normal mb-3">
                  Provide relevant records safely
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Contemporaneous emails, rosters, performance plans, policies, or communications can be provided under secure source-protection protocols.
                </p>
              </div>
              <Link
                href="/share-story/evidence"
                className="w-full flex items-center justify-center min-h-[46px] bg-[#eba9eb] text-zinc-900 font-bold text-sm hover:opacity-90 transition-colors rounded-sm"
              >
                Supply relevant records
              </Link>
            </article>

            {/* Pathway 3 */}
            <article className="p-6 md:p-8 bg-white border border-[#cfc7bd] rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-stone-100 border border-stone-300 flex items-center justify-center text-zinc-800 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600 font-bold block mb-1">
                  Pathway 3
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 font-normal mb-3">
                  Ask about a documentary interview
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Participate in an in-depth recorded or confidential background interview exploring the personal and career impact of working at MECCA.
                </p>
              </div>
              <Link
                href="/documentary"
                className="w-full flex items-center justify-center min-h-[46px] border border-zinc-900 text-zinc-900 font-bold text-sm hover:bg-stone-100 transition-colors rounded-sm"
              >
                Learn about interviews
              </Link>
            </article>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
