import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { SitePage } from "./site-shell";
import { inquiryAreas } from "./research-data";
import { buildMetadata } from "./seo";
import { FAQAccordion } from "./faq-accordion";

const faqs: [string, string][] = [
  [
    "Do I need documents?",
    "No. First-hand testimony matters most, and many workplace experiences leave little or no documentary record. Notes, messages, or rosters can help provide supporting evidence when they exist."
  ],
  [
    "Will you publish what I submit?",
    "Not unless you explicitly agree to publication. Sending information to Inside MECCA is never treated as permission to publish."
  ],
  [
    "Can I stay anonymous?",
    "Yes. You choose whether to remain anonymous, use a pseudonym, or provide confidential contact details. If you stay fully anonymous, keep in mind I won't be able to reach out with follow-up questions."
  ],
  [
    "Does submitting make me a protected whistleblower?",
    "Not automatically. Inside MECCA is an independent research project—not a corporate hotline, regulator, or law firm. Statutory protection depends on specific legal criteria, so seek independent legal advice if you need formal whistleblower protections."
  ],
  [
    "Will my account be treated as proven?",
    "Every account is assessed carefully in context: direct knowledge, level of detail, consistency, supporting evidence, and any conflicting information."
  ],
  [
    "How do you count multiple reports?",
    "Each contributor is counted once. Duplicate or linked submissions aren't counted as separate sources, and raw submission numbers don't necessarily reflect how common an experience was across MECCA's entire workforce."
  ]
];

export const metadata: Metadata = buildMetadata({
  title: "MECCA Workplace Culture & Employee Experiences",
  description:
    "Independent analysis of working at MECCA, employee experiences, management, workplace culture, company commitments and evidence-led reform.",
  path: "/"
});

const plannedOutputs: [string, string, string][] = [
  [
    "Research framework",
    "Published",
    "The questions, modules and boundaries governing the investigation."
  ],
  [
    "Evidence repository",
    "In development",
    "A source-labelled archive of records, commitments, public materials and evidence gaps."
  ],
  [
    "Employee case studies",
    "In development",
    "De-identified accounts published only with separate permission and appropriate context."
  ],
  [
    "Written investigation",
    "Planned",
    "Findings organised by research question, including evidence strength, contradictions and company response."
  ],
  [
    "Documentary",
    "In development",
    "Narrative interviews and evidence-led reporting kept distinct from the research questionnaire."
  ],
  [
    "Recommendations report",
    "Planned",
    "Practical proposals for MECCA, employees, industry and policymakers based on supported findings."
  ]
];

const takingPartOptions = [
  {
    title: "If you worked at MECCA",
    desc: "Tell me what you experienced or directly witnessed on the retail floor, in store management, or at head office.",
    href: "/share-story",
    cta: "Share your MECCA experience",
    isExternal: false,
    analyticsDetail: "homepage_participation"
  },
  {
    title: "If you have relevant records",
    desc: "Review the quick source-safety guidance before securely sharing documents, schedules, or messages.",
    href: "/share-story/evidence",
    cta: "Provide records safely",
    isExternal: false,
    analyticsDetail: "homepage_source_safety"
  },
  {
    title: "If you know someone who worked there",
    desc: "Send them the link privately so they can explore the investigation and decide on their own terms.",
    href: "mailto:?subject=Have%20you%20worked%20at%20MECCA%3F&body=I%20thought%20you%20might%20want%20to%20see%20this%20independent%20workplace%20investigation%3A%20https%3A%2F%2Finsidemecca.net%2F",
    cta: "Send link privately",
    isExternal: true,
    analyticsDetail: "email_share"
  }
];

export default function Home() {
  return (
    <SitePage>
      {/* 1. Hero Section with Fluid Typography Clamps and Constrained Prose */}
      <section className="rb-section py-10 sm:py-14 md:py-18 lg:py-20 border-b border-stone-300 overflow-hidden" id="hero">
        <div className="max-w-4xl mx-auto md:mx-0 w-full">
          <p className="rb-kicker mb-2.5">For current and former MECCA employees</p>
          
          <h1 className="text-clamp-hero font-serif font-bold tracking-tight mt-0 mb-3 sm:mb-4 text-slate-950">
            Worked at MECCA? Tell me what happened.
          </h1>
          
          <div className="max-w-prose text-stone-700 text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-[1.6] mb-6 space-y-3 sm:space-y-4">
            <p>
              Inside MECCA independently examines employee experiences, workplace practices and company commitments.
            </p>
            <p>
              First-hand accounts help decide what to investigate. A submission is not treated as proof.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 mb-6 w-full max-w-2xl">
            <Link
              className="rb-button bg-[#b42025] hover:bg-[#8e171b] border-[#b42025] hover:border-[#8e171b] text-white flex-1 sm:flex-initial flex items-center justify-center gap-2.5 min-h-[52px] sm:min-h-[50px] px-6 sm:px-8 text-base sm:text-[17px] font-bold rounded-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-700 text-center"
              href="/share-story"
              data-analytics-event="share_path_click"
              data-analytics-detail="homepage_hero"
            >
              <span className="text-center whitespace-normal sm:whitespace-nowrap">Share your MECCA experience</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              className="rb-button flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px] px-5 sm:px-6 bg-white sm:bg-transparent text-stone-800 hover:text-red-700 hover:border-red-700 border-stone-300 font-semibold text-sm sm:text-base rounded-sm transition-colors text-center"
              href="/evidence"
              data-analytics-event="content_path_click"
              data-analytics-detail="homepage_hero_evidence"
            >
              <span>See how evidence is assessed</span>
            </Link>
          </div>
          
          <div className="max-w-prose text-stone-600 text-sm sm:text-base leading-relaxed">
            <p>
              You control whether you identify yourself, whether I may contact you, and whether anything may be published.
            </p>
          </div>
        </div>
      </section>

      {/* Independence Banner */}
      <div className="rb-independence-bar text-sm font-semibold tracking-wide py-3 px-4 text-center">
        Created and run independently by a current MECCA employee with 7 years and 10 months of experience across multiple stores and Australian states.
      </div>

      {/* 2. Workplace Culture Analysis */}
      <section className="rb-section seo-entry py-10 sm:py-12 md:py-16" id="workplace-culture">
        <div className="rb-split !gap-4 sm:!gap-6 md:!gap-8 lg:!gap-12 items-start">
          <div className="space-y-1">
            <p className="rb-kicker !mb-1 text-xs font-mono font-bold tracking-wider text-[#b42025] uppercase">MECCA workplace culture</p>
            <h2 className="text-clamp-heading font-serif font-normal !mt-0 !mb-0 text-zinc-900 leading-tight">
              What was it actually like to work at MECCA?
            </h2>
          </div>
          <div className="rb-lede max-w-prose space-y-3 text-stone-700 leading-relaxed pt-0 sm:pt-0.5">
            <p className="!mt-0 text-base sm:text-lg">
              Public reviews can tell us something about a workplace, but they have limits. They
              are anonymous, self-selecting and often impossible to independently verify. Inside
              MECCA looks beyond individual reviews. I am examining employee accounts alongside
              company commitments, management practices, available records and other evidence to
              understand where MECCA&apos;s stated workplace standards matched employees&apos;
              experiences, and where they may not have.
            </p>
            <p>
              Positive experiences matter too. An investigation looking for patterns has to be
              capable of finding disagreement, variation and evidence that contradicts initial
              assumptions.
            </p>
            <p className="text-stone-600 text-sm md:text-base">
              Explore the source-labelled records about{" "}
              <Link
                href="/employer-commitments/categories/career-development"
                className="text-red-700 underline underline-offset-4 hover:text-red-900"
              >
                career progression and development at MECCA
              </Link>
              ,{" "}
              <Link
                href="/employer-commitments/categories/performance-feedback"
                className="text-red-700 underline underline-offset-4 hover:text-red-900"
              >
                performance reviews and feedback
              </Link>
              , and the public-source guide to{" "}
              <Link
                href="/analysis/mecca-complaints-whistleblower-policy"
                className="text-red-700 underline underline-offset-4 hover:text-red-900"
              >
                MECCA complaints and whistleblower pathways
              </Link>
              .
            </p>
            <div className="rb-actions flex flex-wrap gap-3.5 pt-2 !my-2">
              <Link
                className="rb-button red"
                href="/analysis/working-at-mecca-reviews"
                data-analytics-event="content_path_click"
                data-analytics-detail="homepage_workplace_analysis"
              >
                Read the workplace culture analysis
              </Link>
              <Link
                className="rb-button"
                href="/analysis"
                data-analytics-event="content_path_click"
                data-analytics-detail="homepage_analysis_index"
              >
                Browse all analysis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote Section */}
      <section className="bg-[#111] text-stone-100 py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-8 md:px-12 flex flex-col justify-center border-y border-stone-800" aria-labelledby="dream-job-heading">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col -mt-2 sm:-mt-3 md:-mt-4">
            <p className="text-[#b42025] font-mono text-xs sm:text-[13px] font-bold tracking-widest uppercase mb-1 sm:mb-1.5 -mt-1 sm:-mt-2">CULTURE & EXPECTATIONS</p>
            <div className="relative -mt-0.5">
              <span className="absolute -top-2 sm:-top-3 md:-top-5 -left-1 sm:-left-2 md:-left-3 text-[#b42025] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif opacity-30 select-none pointer-events-none leading-none" aria-hidden="true">&ldquo;</span>
              <h2 id="dream-job-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-serif font-bold leading-[1.12] sm:leading-[1.06] text-white relative z-10 pl-6 sm:pl-8 md:pl-10 lg:pl-12 italic break-words tracking-tight mt-0">
                A million girls would kill for this job.
              </h2>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-5 flex flex-col lg:-mt-2">
            <p className="text-base sm:text-[17px] md:text-[18px] text-stone-300 leading-relaxed -mt-1 sm:-mt-2 lg:mt-0 mb-5 sm:mb-6">
              Inside MECCA compares employee accounts with public company commitments and available records to understand where workplace reality meets prestige brand expectations.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full">
              <Link
                className="flex items-center justify-center min-h-[48px] px-6 bg-[#b42025] text-white font-bold text-[15px] tracking-wide rounded-sm transition-colors hover:bg-[#8b181c] border border-[#b42025] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                href="/investigation"
              >
                See what I’m investigating
              </Link>
              <Link
                className="flex items-center justify-center min-h-[48px] px-6 bg-transparent text-stone-300 hover:text-white border border-stone-600 hover:border-stone-400 font-bold text-[15px] tracking-wide rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                href="/evidence"
              >
                How evidence is assessed
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. Purpose and Change */}
      <section className="rb-section dark strategy-section py-16 md:py-24" id="goal">
        <p className="rb-kicker">Purpose and change</p>
        <h2 className="text-clamp-heading font-serif font-normal max-w-3xl">
          What am I trying to change?
        </h2>
        <div className="rb-lede max-w-prose space-y-5 text-stone-300 leading-relaxed my-6">
          <p>
            My goal is not simply to publish stories about MECCA. It is to build a credible body
            of evidence that can support meaningful, measurable workplace change: documenting what
            employees say happened, testing those accounts against supporting evidence, identifying
            patterns where the facts support them, and being equally clear when they do not.
          </p>
          <p>
            If problems are established, the response should be something employees can actually
            see and feel: safer ways to raise concerns, fairer management practices, meaningful
            employee voice, and clear proof that promised changes have happened. Attention can
            create pressure, but accountability requires real follow-through.
          </p>
          <p>
            I will compare experiences across stores, teams, managers, roles and time periods,
            examine MECCA&apos;s documented commitments, look for contradictions and seek responses
            where appropriate. From there, the question is simple: what does the evidence actually
            show?
          </p>
          <p>
            This project may produce case studies, written findings, an evidence repository,
            documentary reporting and recommendations for reform, but none of those outputs will
            outrun the evidence behind them. The ultimate test is whether supported findings lead
            to changes that employees and the public can independently verify.
          </p>
        </div>
        <div className="rb-actions flex flex-wrap gap-4 pt-4">
          <Link
            className="rb-button red"
            href="/change-agenda"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_change_agenda"
          >
            See the path to impact
          </Link>
          <Link
            className="rb-button"
            href="/accountability"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_accountability"
          >
            How success is judged
          </Link>
        </div>
      </section>

      {/* 4. Taking Part: Refactored into Responsive 3-Column Grid Cards */}
      <section className="rb-section py-16 md:py-24" id="taking-part">
        <p className="rb-kicker">Taking part</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          You can help in more than one way
        </h2>
        <p className="rb-lede max-w-prose text-stone-600 my-4">
          Choose the pathway that matches your situation and comfort level.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {takingPartOptions.map((opt, idx) => (
            <article
              key={opt.title}
              className="flex flex-col justify-between p-6 md:p-8 bg-white border border-stone-300 rounded-lg shadow-sm hover:shadow-md hover:border-red-600 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-red-600 uppercase tracking-widest mb-4">
                  <span>Pathway 0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-stone-400 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-normal text-stone-900 group-hover:text-red-700 transition-colors mb-3">
                  {opt.title}
                </h3>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  {opt.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200">
                {opt.isExternal ? (
                  <a
                    href={opt.href}
                    data-analytics-event="private_share_click"
                    data-analytics-detail={opt.analyticsDetail}
                    className="inline-flex items-center gap-2 font-bold text-sm text-red-700 hover:text-red-900 group-hover:translate-x-0.5 transition-transform min-h-[44px]"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={opt.href}
                    data-analytics-event={
                      opt.href === "/share-story" ? "share_path_click" : "content_path_click"
                    }
                    data-analytics-detail={opt.analyticsDetail}
                    className="inline-flex items-center gap-2 font-bold text-sm text-red-700 hover:text-red-900 group-hover:translate-x-0.5 transition-transform min-h-[44px]"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Why Take Part */}
      <section className="rb-section dark py-16 md:py-24" id="why-take-part">
        <p className="rb-kicker">Why take part</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          Why your account matters
        </h2>
        <div className="rb-lede max-w-prose space-y-4 text-stone-300 leading-relaxed my-6">
          <p>
            One experience cannot tell us what an entire workplace is like. Multiple independently
            sourced accounts may help the project understand whether workplace experiences are shared
            or isolated. Repetition alone does not establish accuracy, prevalence or a systemic pattern.
          </p>
          <p>
            What contributors share also helps determine where the investigation goes next: what
            questions need more evidence, and which issues warrant deeper examination.
          </p>
        </div>
        <p className="rb-note max-w-prose bg-stone-900 border-l-4 border-red-500 text-stone-300 p-4 text-sm leading-relaxed">
          Taking part does not guarantee that your account will be published, that a particular
          finding will be reached, or that MECCA will make changes.
        </p>
      </section>

      {/* 6. Research Scope: Refactored into Responsive 3-Column Grid Cards */}
      <section className="rb-section py-16 md:py-24" id="research-scope">
        <p className="rb-kicker">Research scope</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          What I am investigating
        </h2>
        <p className="rb-lede max-w-prose text-stone-600 my-4">
          These themes were selected from public reporting, company policies and early research questions. Their inclusion does not mean findings have been made. The project is testing whether reported experiences are shared, isolated, contradicted or unsupported.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {inquiryAreas.slice(0, 6).map(([topic, description], idx) => (
            <article
              key={topic}
              className="flex flex-col justify-between p-6 bg-white border border-stone-300 rounded-lg shadow-sm hover:shadow-md hover:border-stone-500 transition-all duration-200 group"
            >
              <div>
                <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
                  Area 0{idx + 1}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-normal text-stone-900 group-hover:text-red-700 transition-colors mb-3">
                  {topic}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="rb-note max-w-prose bg-stone-100 border-l-4 border-red-600 text-stone-700 p-4 text-sm leading-relaxed mb-6">
          These are the core areas I am investigating, but the collected evidence will decide the final outcome.
        </p>

        <div className="rb-actions">
          <Link
            className="rb-button flex items-center gap-2"
            href="/investigation#research-questions"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_research_topics"
          >
            <span>See all research topics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. Current Work */}
      <section className="rb-section dark py-16 md:py-24" id="current-work">
        <p className="rb-kicker">Current work</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          Development, management and speaking up
        </h2>
        <p className="rb-lede max-w-prose text-stone-300 my-4 leading-relaxed">
          A supplied 2024 development-planning document is currently on a pre-publication legal
          hold. Neither the source nor analysis derived from it will be published unless questions
          around authenticity, provenance, contributor authority and publication clearance are
          resolved.
        </p>
        <div className="rb-actions flex flex-wrap gap-4 mt-6">
          <Link
            className="rb-button red"
            href="/investigation/development-planning"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_development_planning"
          >
            Read the review status
          </Link>
          <Link
            className="rb-button"
            href="/updates"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_updates"
          >
            See project updates
          </Link>
        </div>
      </section>

      {/* Investigation Hub Links */}
      <section className="rb-section py-16 md:py-24" id="investigation-hub">
        <p className="rb-kicker">Investigation Hub</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          Explore the evidence and analysis
        </h2>
        <p className="rb-lede max-w-prose text-stone-600 my-4 leading-relaxed">
          Access the core databases driving this independent investigation into workplace accountability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <article className="flex flex-col p-6 bg-stone-100 border border-stone-200 rounded-lg hover:border-red-300 transition-colors group">
            <h3 className="font-serif text-xl mb-3 group-hover:text-red-700">Research Centre</h3>
            <p className="text-sm text-stone-600 mb-6 flex-grow">Deep-dive into verified public claims, workplace law context, internal documents, and corporate history.</p>
            <Link href="/research-centre" className="text-sm font-bold text-red-700 hover:text-red-900 flex items-center gap-2 uppercase tracking-wide min-h-[44px]">
              Browse Research <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
          <article className="flex flex-col p-6 bg-stone-100 border border-stone-200 rounded-lg hover:border-red-300 transition-colors group">
            <h3 className="font-serif text-xl mb-3 group-hover:text-red-700">Evidence Library</h3>
            <p className="text-sm text-stone-600 mb-6 flex-grow">Review the evidence thresholds, coding practices, and labels applied to public and internal sources.</p>
            <Link href="/evidence" className="text-sm font-bold text-red-700 hover:text-red-900 flex items-center gap-2 uppercase tracking-wide min-h-[44px]">
              View Evidence <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
          <article className="flex flex-col p-6 bg-stone-100 border border-stone-200 rounded-lg hover:border-red-300 transition-colors group">
            <h3 className="font-serif text-xl mb-3 group-hover:text-red-700">Employer Commitments</h3>
            <p className="text-sm text-stone-600 mb-6 flex-grow">MECCA publishes workplace policies, values and statements about learning and inclusion. These company statements are relevant context and are assessed separately from evidence about implementation.</p>
            <Link href="/employer-commitments" className="text-sm font-bold text-red-700 hover:text-red-900 flex items-center gap-2 uppercase tracking-wide min-h-[44px]">
              Read Commitments <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        </div>
      </section>

      {/* 8. Evidence Assessment Standards */}
      <section className="rb-section py-16 md:py-24" id="evidence-standards">
        <p className="rb-kicker">Evidence</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          How I assess evidence
        </h2>
        <div className="rb-lede max-w-prose space-y-4 text-stone-700 leading-relaxed my-6">
          <p>
            I do not treat a submission as proof simply because it has been submitted. Accounts
            are assessed for direct knowledge, specificity, consistency, source independence,
            supporting evidence, and any conflicting accounts. Relevant company records and official
            responses are also considered wherever available.
          </p>
          <p>
            Sometimes the evidence will support a finding. Sometimes it will support only part of a
            claim. Sometimes it will not be strong enough to reach a conclusion. Those distinctions
            matter.
          </p>
          <p>
            Contributors choose to participate voluntarily. Experiences shared with Inside MECCA
            should not be assumed to represent every single employee across the entire business.
          </p>
        </div>
        <div className="rb-actions">
          <Link
            className="rb-button red flex items-center gap-2"
            href="/evidence"
            data-analytics-event="content_path_click"
            data-analytics-detail="homepage_evidence_standards"
          >
            <span>Read the evidence standards</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 9. Published and Planned Work: Refactored into Responsive 3-Column Grid Cards */}
      <section className="rb-section dark py-16 md:py-24" id="published-and-planned">
        <p className="rb-kicker">Published and planned work</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          What will Inside MECCA publish?
        </h2>
        <p className="rb-lede max-w-prose text-stone-300 my-4">
          Some parts of this project are already published. Others are actively in development. I
          share the current status openly so you know exactly where the investigation stands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {plannedOutputs.map(([title, status, desc]) => (
            <article
              key={title}
              className="flex flex-col justify-between p-6 bg-stone-900 border border-stone-800 rounded-lg hover:border-stone-600 transition-all duration-200 group"
            >
              <div>
                <span
                  className={`output-status ${status.toLowerCase().replace(" ", "-")} mb-4`}
                >
                  {status}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-normal text-white group-hover:text-red-400 transition-colors my-3">
                  {title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="rb-actions">
          <Link className="rb-button" href="/updates">
            Track current progress
          </Link>
        </div>
      </section>

      {/* 10. About the Project */}
      <section className="rb-section py-12 sm:py-16 md:py-20" id="about-project">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5 sm:mb-6">
            <p className="rb-kicker !mb-1.5 inline-block">About the project</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-950 tracking-tight !mt-0 !mb-0 text-center">
              Who is behind Inside MECCA?
            </h2>
          </div>
          <div className="rb-lede space-y-4 text-stone-700 leading-relaxed text-base sm:text-lg">
            <p>
              As at 27 August 2026, I remain employed by MECCA and have worked there for seven years and ten months across multiple stores and Australian states.
            </p>
            <p>
              I created and run Inside MECCA independently. I do not act or speak on behalf of MECCA Brands, and this project is not affiliated with, endorsed by or operated by the company.
            </p>
            <p>
              I initially used a public pseudonym to protect my identity and keep the focus on the evidence and employee voices. Within days of the project becoming public, MECCA contacted me and said it had identified me as the person behind Inside MECCA.
            </p>
            <p>
              I had posted about the project on Reddit using an account named after my dog, a personal detail I did not believe anyone at MECCA&apos;s head office or in any store knew. MECCA has not explained how it connected that Reddit account or the project to me.
            </p>
            <p>
              In those circumstances, I no longer feel that remaining anonymous offers me meaningful protection. I now feel I have little choice but to identify myself publicly and publish my photograph alongside this disclosure.
            </p>
            <p>
              I am dedicating my time to documenting workplace realities, testing claims against evidence and advocating for transparent industry standards. My employment background, identity and the project&apos;s advocacy goals are disclosed as relevant context.
            </p>
            <p>
              Inside MECCA is an independent workplace accountability initiative. It is not MECCA&apos;s official whistleblower hotline, a union or employee representative body, a government regulator or a legal firm.
            </p>
            <div className="rb-actions flex flex-wrap justify-center gap-4 pt-4">
              <Link className="rb-button red" href="/accountability">
                Read the accountability disclosure
              </Link>
              <Link className="rb-button" href="/methodology">
                Read the investigation method
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ: Interactive Accordion / Disclosure Component */}
      <section className="rb-section dark py-16 md:py-24" id="faq">
        <p className="rb-kicker">FAQ</p>
        <h2 className="text-clamp-heading font-serif font-normal">
          Questions people reasonably ask
        </h2>
        <p className="rb-lede max-w-prose text-stone-400 my-4">
          Key clarifications on anonymity, evidence standards, whistleblower rights, and publication consent.
        </p>
        <FAQAccordion items={faqs} />
      </section>

      {/* 12. Source Safety */}
      <section className="rb-section py-10 sm:py-14 md:py-20" id="source-safety">
        <p className="rb-kicker !mb-1.5">Source safety</p>
        <h2 className="text-clamp-heading font-serif font-normal !mt-0 !mb-3">
          Before sending records
        </h2>
        <div className="rb-lede max-w-prose space-y-3.5 text-stone-700 text-base sm:text-[17px] md:text-lg leading-relaxed my-3 sm:my-4">
          <p>
            For your safety, always submit from your personal phone on your home network. Never use
            a store device or <span className="whitespace-nowrap">company Wi&#8209;Fi</span>.
          </p>
          <p>
            Photos and documents can contain hidden metadata (like timestamps or account numbers).
            Where possible, take a screenshot or crop out personal details before uploading.
          </p>
          <p>
            Only share material you have legitimate access to. If you have something particularly
            sensitive or want advice on redacting records, reach out before sending.
          </p>
        </div>
        <p className="rb-note max-w-prose bg-amber-50 border-l-4 border-amber-600 text-amber-900 p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed mb-6 rounded-r-sm">
          <strong>Tip for your protection:</strong> Always submit from your personal phone or computer using home <span className="whitespace-nowrap">Wi&#8209;Fi</span> or mobile data—never a work device or store network.
        </p>
        <div className="rb-actions mt-4">
          <Link className="rb-button flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto" href="/share-story/evidence">
            <span>Read the source-safety guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 13. Final CTA & Participation Box */}
      <section className="rb-section dark py-16 md:py-24" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <p className="rb-kicker">Worked at MECCA?</p>
            <h2 className="text-clamp-heading font-serif font-normal">
              Start with what you know first-hand.
            </h2>
            <p className="rb-lede max-w-prose text-stone-300 my-4 leading-relaxed">
              You do not need exact dates. You do not need to remember every single detail. And you
              certainly do not need a folder of documents for your experience to matter. Tell me what
              happened, in your own words, and share only what you feel comfortable providing.
            </p>
            <div className="rb-actions flex flex-wrap gap-4 mt-6">
              <Link
                className="rb-button red flex items-center gap-2"
                href="/share-story"
                data-analytics-event="share_path_click"
                data-analytics-detail="homepage_contact"
              >
                <span>Share your MECCA experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a className="rb-button flex items-center gap-2" href="mailto:shareyourstory@insidemecca.net">
                <Mail className="w-4 h-4" />
                <span>Ask me a question first</span>
              </a>
            </div>
          </div>

          <aside
            className="lg:col-span-5 bg-[#181818] text-white p-6 md:p-8 border border-neutral-800 rounded-sm"
            aria-label="Your participation choices"
          >
            <div className="space-y-5">
              <div>
                <p className="text-[#b42025] font-mono text-[11px] font-bold tracking-widest uppercase mb-2.5">Your participation, your terms</p>
                <div className="space-y-3 text-stone-300 text-[14px] md:text-[15px] leading-relaxed">
                  <p>
                    You choose what you tell me, whether you identify yourself, and whether I can contact you afterwards. Submitting your experience does not give me permission to publish it.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#222] p-4 border-l-2 border-[#b42025]">
                <p className="text-stone-300 text-[13px] md:text-[14px] leading-relaxed">
                  <strong>For your safety:</strong> always submit from your personal phone on your home network. Never use a store device or <span className="whitespace-nowrap">company Wi&#8209;Fi</span>.
                </p>
              </div>
              
              <div className="pt-4 border-t border-neutral-800 flex items-center gap-3 text-[11px] text-stone-400 font-mono uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-[#b42025] shrink-0" />
                <span>Confidentiality Options Available</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SitePage>
  );
}
