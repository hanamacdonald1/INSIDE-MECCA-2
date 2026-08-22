export type CommitmentCategory = {
  slug: string;
  name: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  seoH1?: string;
  relatedLinks?: { href: string; label: string }[];
  documentSlugs: string[];
};

export type EvidenceDocument = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  category: string;
  date: string;
  status: "Reviewed" | "Awaiting source" | "Legal hold";
  description: string;
  tags: string[];
  overview: string;
  purpose: string;
  appliesTo: string[];
  managerResponsibilities: string[];
  employeeExpectations: string[];
  systems: string[];
  reviewFrequency: string;
  commitments: string[];
  extractions: { label: string; text: string; location: string }[];
  questions: string[];
  related: string[];
  timeline: { label: string; detail: string }[];
};

export type EditorialMetadata = {
  sourceKey: string;
  recordType: "Framework" | "Behavioural standard" | "Implementation tool" | "Systems evidence" | "Retrieval gap" | "Restricted source";
  scope: string;
  locatorSummary: string;
  sourceStatus: string;
};

export const categories: CommitmentCategory[] = [
  { slug: "career-development", name: "Career Development", description: "Career goals, development priorities, plans and progression conversations.", seoTitle: "MECCA Career Progression & Development | Inside MECCA", seoDescription: "Review MECCA career progression and development guidance, including planning, feedback and follow-up, with source status and evidence limits.", seoH1: "Career progression and development at MECCA", relatedLinks: [{ href: "/analysis/working-at-mecca-reviews", label: "How to read working-at-MECCA reviews" }, { href: "/employer-commitments/categories/performance-feedback", label: "Performance reviews and feedback at MECCA" }, { href: "/investigation", label: "The questions guiding the investigation" }], documentSlugs: ["development-planning-guidebook", "individual-development-plan", "career-development-meeting-agenda", "quarterly-check-in-template", "monthly-one-to-one-template", "core-competencies"] },
  { slug: "performance-feedback", name: "Performance & Feedback", description: "How performance, behaviour, outcomes and feedback are framed and reviewed.", seoTitle: "MECCA Performance Reviews & Feedback | Inside MECCA", seoDescription: "Explore MECCA performance review and feedback guidance, rating frameworks and check-in tools, with source status and limits on what the records establish.", seoH1: "Performance reviews and feedback at MECCA", relatedLinks: [{ href: "/employer-commitments/categories/career-development", label: "Career progression and development at MECCA" }, { href: "/analysis/working-at-mecca-reviews", label: "How to assess MECCA employee reviews" }, { href: "/investigation", label: "Performance and career research questions" }], documentSlugs: ["performance-rating-scale", "quarterly-check-in-template", "monthly-one-to-one-template", "core-competencies"] },
  { slug: "leadership-expectations", name: "Leadership Expectations", description: "Published responsibilities for managers and people leaders.", seoTitle: "MECCA Leadership Expectations | Inside MECCA", seoDescription: "Explore research records about MECCA leadership expectations, coaching, communication and accountability, with source status and evidence limits.", seoH1: "Leadership and management expectations at MECCA", relatedLinks: [{ href: "/analysis/working-at-mecca-reviews", label: "How to assess MECCA management reviews" }, { href: "/employer-commitments/categories/performance-feedback", label: "Performance reviews and feedback" }, { href: "/methodology", label: "How evidence is assessed" }], documentSlugs: ["development-planning-guidebook", "quarterly-check-in-template", "core-competencies", "monthly-one-to-one-template"] },
  { slug: "workplace-values", name: "Workplace Values", description: "The behavioural standards described as the organisation's living values.", seoTitle: "MECCA Workplace Values & Culture | Inside MECCA", seoDescription: "Review research records about MECCA workplace values, expected behaviours, feedback and wellbeing, with source status and evidence limits stated.", seoH1: "MECCA workplace values and culture", relatedLinks: [{ href: "/analysis/working-at-mecca-reviews", label: "Working at MECCA reviews and workplace culture" }, { href: "/research-centre/public-claims/2019-workplace-culture", label: "The 2019 workplace-culture public record" }, { href: "/evidence", label: "Evidence standards" }], documentSlugs: ["living-values-2024", "performance-rating-scale", "monthly-one-to-one-template"] },
  { slug: "learning-development", name: "Learning & Development", description: "Learning goals, experience, coaching, education and structured development activity.", seoTitle: "MECCA Learning & Development | Inside MECCA", seoDescription: "Explore independent research records about MECCA learning, coaching, development goals and training administration, with source status and evidence limits.", seoH1: "Learning and development at MECCA", relatedLinks: [{ href: "/employer-commitments/categories/career-development", label: "Career progression and development" }, { href: "/employer-commitments/categories/employee-wellbeing", label: "Employee wellbeing" }, { href: "/analysis/working-at-mecca-reviews", label: "How to assess employee reviews" }], documentSlugs: ["development-planning-guidebook", "individual-development-plan", "career-development-meeting-agenda", "workday-completions-report", "core-competencies"] },
  { slug: "recognition", name: "Recognition", description: "How achievement, contribution and growth are acknowledged.", seoTitle: "MECCA Employee Recognition | Inside MECCA", seoDescription: "Review independent research records about employee recognition, feedback and development at MECCA, with source status and evidence limits clearly stated.", seoH1: "Employee recognition at MECCA", relatedLinks: [{ href: "/employer-commitments/categories/performance-feedback", label: "Performance reviews and feedback" }, { href: "/employer-commitments/categories/workplace-values", label: "Workplace values and culture" }, { href: "/methodology", label: "How evidence is assessed" }], documentSlugs: ["quarterly-check-in-template", "monthly-one-to-one-template", "core-competencies", "living-values-2024"] },
  { slug: "employee-wellbeing", name: "Employee Wellbeing", description: "Support, workload, sustainability and care for individuals and teams.", seoTitle: "MECCA Employee Wellbeing | Inside MECCA", seoDescription: "Explore independent research records about support, workload, sustainable effort and employee wellbeing at MECCA, with source status and clear evidence limits.", seoH1: "Employee wellbeing at MECCA", relatedLinks: [{ href: "/research-centre/workplace-law", label: "Workplace law and psychosocial safety context" }, { href: "/analysis/working-at-mecca-reviews", label: "Working at MECCA reviews and employee experiences" }, { href: "/evidence", label: "Evidence standards" }], documentSlugs: ["living-values-2024", "monthly-one-to-one-template", "development-planning-guidebook"] },
  { slug: "recruitment", name: "Recruitment", description: "Hiring, selection and access to internal opportunity processes.", seoTitle: "MECCA Recruitment Process Research | Inside MECCA", seoDescription: "Review the current source status for MECCA recruitment and internal opportunity processes, including the documented retrieval gap and questions still open.", seoH1: "MECCA recruitment process research", relatedLinks: [{ href: "/analysis/working-at-mecca-reviews", label: "Working at MECCA reviews and employee experiences" }, { href: "/research-centre/investigation-notebook", label: "Open research questions" }, { href: "/methodology", label: "How evidence gaps are handled" }], documentSlugs: ["recruitment-policy-retrieval-note"] },
  { slug: "speaking-up", name: "Speaking Up", description: "Feedback, constructive dissent, escalation and acting when something is not right.", seoTitle: "MECCA Speaking-Up Commitments | Inside MECCA", seoDescription: "Explore MECCA guidance linked to speaking up, escalation and constructive dissent, with source status and clear limits on what the records establish.", seoH1: "Speaking up at MECCA: documented commitments", relatedLinks: [{ href: "/analysis/mecca-complaints-whistleblower-policy", label: "MECCA complaints and whistleblower policy explainer" }, { href: "/research-centre/workplace-law", label: "Workplace complaints, bullying and retaliation: legal context" }, { href: "/research-centre/public-claims/2019-workplace-culture", label: "The 2019 workplace-culture public record" }], documentSlugs: ["living-values-2024", "core-competencies", "monthly-one-to-one-template"] },
];

const baseDocuments: EvidenceDocument[] = [
  {
    slug: "development-planning-guidebook", title: "Development Planning Guidebook", category: "Career Development", date: "Represented as 2024", status: "Legal hold",
    description: "Contributor-supplied material. The source and source-derived analysis are withheld pending authentication, provenance review and qualified legal advice.",
    tags: ["restricted source", "authentication pending", "legal review"],
    overview: "No public source-derived analysis while legal review is pending.",
    purpose: "Not published.",
    appliesTo: ["Not established"],
    managerResponsibilities: ["Not published"],
    employeeExpectations: ["Not published"],
    systems: ["Not published"],
    reviewFrequency: "Not published.",
    commitments: ["Not published"],
    extractions: [],
    questions: ["Can provenance, authenticity, contributor authority and publication clearance be established?"],
    related: ["career-development-meeting-agenda", "monthly-one-to-one-template", "core-competencies"],
    timeline: [{ label: "Hold", detail: "Source and analysis restricted pending qualified legal review" }],
  },
  {
    slug: "performance-rating-scale", title: "Performance & Growth Rating Scale", seoTitle: "MECCA Performance Rating Scale | Inside MECCA", seoDescription: "An independent, source-labelled reconstruction of a MECCA Support Centre performance rating framework, with scope, source status and evidence limits stated.", category: "Performance & Feedback", date: "March 2024", status: "Reviewed",
    description: "A Support Centre rating framework combining values-aligned behaviours, described as the 'how', with delivery against objectives and big rocks, described as the 'what'.",
    tags: ["performance", "rating", "living values", "Workday", "Support Centre"],
    overview: "The two-page scale shows how behaviour and results are combined into an overall performance rating.",
    purpose: "To guide Support Centre performance ratings and show the relationship between behavioural and outcome measures.",
    appliesTo: ["MECCA Support Centre team members", "Managers assessing performance", "Workday performance processes"],
    managerResponsibilities: ["Assess values-aligned behaviour", "Assess outcomes against objectives and big rocks", "Provide real-time feedback and coaching", "Enter inputs into Workday"],
    employeeExpectations: ["Demonstrate behaviours aligned with the Living Values", "Deliver outcomes against objectives and quarterly big rocks", "Respond to feedback"],
    systems: ["Living Values", "Annual objectives", "Quarterly big rocks", "Workday"],
    reviewFrequency: "The scale refers to performance across each quarter of the year and an overall annual rating.",
    commitments: ["Behaviour and results both inform ratings", "Feedback should address concerns in real time", "Ratings use a published combination matrix", "Workday records the inputs"],
    extractions: [
      { label: "How", text: "Behaviour is assessed against the 'what it is' guidance across the Living Values.", location: "Page 1, step 1" },
      { label: "What", text: "Outcomes are assessed against objectives and quarterly big rocks.", location: "Page 1, step 2" },
      { label: "Overall rating", text: "Workday combines the how and what inputs to produce a rating.", location: "Page 1, step 3" },
    ],
    questions: ["Were employees told how both measures would be assessed?", "Was feedback provided in real time?", "Were objectives and big rocks documented?", "Could employees understand or challenge the inputs used?"],
    related: ["living-values-2024", "monthly-one-to-one-template", "core-competencies"],
    timeline: [{ label: "Set expectations", detail: "Values, objectives and big rocks" }, { label: "Assess how", detail: "Behaviour against Living Values" }, { label: "Assess what", detail: "Outcomes against goals" }, { label: "Record", detail: "Inputs entered in Workday" }, { label: "Rate", detail: "Overall rating produced" }],
  },
  {
    slug: "monthly-one-to-one-template", title: "Monthly 1:1 Template", category: "Performance & Feedback", date: "Date not shown", status: "Reviewed",
    description: "A manager and team member agenda covering mood, the month in review, support, Living Values, objectives, growth and next steps.",
    tags: ["monthly", "one-to-one", "wellbeing", "feedback", "actions"],
    overview: "The template creates a recurring structure for documenting a monthly conversation between a team member and manager.",
    purpose: "To prompt discussion of progress, challenges, support, values, objectives, development and agreed actions.",
    appliesTo: ["Team members", "Managers conducting monthly one-to-ones"],
    managerResponsibilities: ["Discuss wins and challenges", "Ask about support and resources", "Provide feedback", "Review objectives and development", "Confirm next steps"],
    employeeExpectations: ["Prepare notes", "Reflect on the month", "Raise support needs", "Discuss values and development", "Confirm actions"],
    systems: ["Living Values", "Compass plan", "Big rocks", "Development plan"],
    reviewFrequency: "Monthly, according to the document title.",
    commitments: ["Monthly manager conversation", "Mood and support check", "Review of development plan", "Documented actions and follow-up"],
    extractions: [{ label: "Support", text: "The agenda asks whether enough support was provided and what could have been done differently.", location: "Support/resources row" }, { label: "Growth", text: "The agenda asks participants to review development focus, roadblocks and required support.", location: "Growth row" }],
    questions: ["Did monthly conversations occur?", "Were support needs discussed and addressed?", "Were agreed next steps recorded and followed up?"],
    related: ["development-planning-guidebook", "career-development-meeting-agenda", "living-values-2024"],
    timeline: [{ label: "Prepare", detail: "Team member and manager notes" }, { label: "Check in", detail: "Mood, wins and challenges" }, { label: "Review", detail: "Values, objectives and growth" }, { label: "Agree", detail: "Actions and next steps" }],
  },
  {
    slug: "career-development-meeting-agenda", title: "Career & Development Planning Meeting Agenda", category: "Career Development", date: "Date not shown", status: "Reviewed",
    description: "A structured agenda for career aspirations, strengths, opportunities, development goals, activities, support and follow-up.",
    tags: ["career discussion", "development goals", "70:20:10", "follow-up"],
    overview: "The agenda translates the guidebook into a manager conversation with clear discussion topics and follow-up actions.",
    purpose: "To structure a career development discussion and convert aspirations into agreed development activities.",
    appliesTo: ["Employees discussing career growth", "Managers facilitating development conversations"],
    managerResponsibilities: ["Discuss short and long-term aspirations", "Provide performance feedback", "Agree development goals", "Identify support and obstacles", "Schedule follow-up meetings"],
    employeeExpectations: ["Discuss career interests", "Reflect on strengths and opportunities", "Agree priorities and activities", "Take action against timelines"],
    systems: ["Competency framework", "Development Planning Guidebook", "70:20:10 model"],
    reviewFrequency: "Follow-up meetings should be scheduled, but the template does not prescribe one interval.",
    commitments: ["Career path discussion", "Feedback linked to goals", "Agreed development goals", "Resources and obstacles identified", "Follow-up scheduled"],
    extractions: [{ label: "Career path", text: "The agenda calls for discussion of short and long-term aspirations and required skills or experience.", location: "Career path discussion" }, { label: "Follow-up", text: "Clear actions, timelines and follow-up meetings are to be defined.", location: "Action items and follow-up" }],
    questions: ["Were career discussions offered?", "Were goals and activities agreed rather than imposed?", "Were obstacles and support needs documented?", "Did follow-up meetings occur?"],
    related: ["development-planning-guidebook", "core-competencies", "monthly-one-to-one-template"],
    timeline: [{ label: "Aspirations", detail: "Short and long-term interests" }, { label: "Assess", detail: "Strengths and opportunities" }, { label: "Agree", detail: "Development goals" }, { label: "Plan", detail: "Activities and support" }, { label: "Follow up", detail: "Actions and review meetings" }],
  },
  {
    slug: "core-competencies", title: "MECCA's Core Competencies", seoDescription: "An independent reconstruction of a four-level MECCA competency framework covering skills, communication, collaboration and people-leader expectations.", category: "Leadership Expectations", date: "Date not shown", status: "Reviewed",
    description: "A four-level framework setting out knowledge, skills and people-leader behaviours across eight competencies.",
    tags: ["competencies", "people leaders", "growth", "communication", "collaboration"],
    overview: "The framework defines progression across plans and acts strategically, service, innovation, ambiguity and change, results, communication, collaboration, and growth and development.",
    purpose: "To help people identify strengths and opportunities for growth and describe expectations at four levels.",
    appliesTo: ["Employees across role levels", "People leaders", "Managers supporting progression"],
    managerResponsibilities: ["Set clear standards and priorities", "Coach and support development", "Communicate transparently", "Encourage diverse perspectives and constructive dissent", "Create regular feedback practices"],
    employeeExpectations: ["Seek feedback and coaching", "Communicate respectfully", "Collaborate across teams", "Own development", "Adapt and learn"],
    systems: ["Four competency levels", "People Leader expectations", "Performance conversations", "Annual objectives", "Quarterly big rocks"],
    reviewFrequency: "No fixed review interval is stated in the document.",
    commitments: ["Clear competency expectations", "People-leader coaching", "Open communication", "Constructive dissent", "Growth and development support"],
    extractions: [{ label: "Communication", text: "People leaders are expected to create environments where voices are heard and open communication is fostered.", location: "Communicates effectively" }, { label: "Development", text: "People leaders are expected to support career development and create regular feedback practices.", location: "Growth and development" }],
    questions: ["Were competency expectations explained consistently?", "Were employees assessed against the level relevant to their role?", "Did people leaders provide the described coaching, feedback and access to information?"],
    related: ["development-planning-guidebook", "performance-rating-scale", "living-values-2024"],
    timeline: [{ label: "Framework", detail: "Eight competencies" }, { label: "Level", detail: "Expectations across levels one to four" }, { label: "Apply", detail: "Performance and development conversations" }, { label: "Grow", detail: "Feedback, coaching and opportunity" }],
  },
  {
    slug: "living-values-2024", title: "MECCA's Living Values 2024", category: "Workplace Values", date: "2024", status: "Reviewed",
    description: "Five published values with examples of what each value is and is not, including respect, responsibility, wellbeing and sustainable effort.",
    tags: ["values", "respect", "responsibility", "wellbeing", "speaking up"],
    overview: "The document defines five behavioural values and sets boundaries around conduct that should not be justified in their name.",
    purpose: "To describe expected workplace behaviours and clarify conduct that is inconsistent with each value.",
    appliesTo: ["All team members", "Managers and leaders", "Performance and growth conversations"],
    managerResponsibilities: ["Deliver feedback with empathy and respect", "Value different perspectives", "Support team wellbeing", "Avoid unreasonable or unsustainable requests", "Act when something is not right"],
    employeeExpectations: ["Treat others with respect and courtesy", "Take responsibility", "Bring positive energy without pretending difficulties do not exist", "Work collaboratively", "Take care of wellbeing"],
    systems: ["Performance & Growth cycle", "Behavioural expectations", "Feedback conversations"],
    reviewFrequency: "No fixed review interval is stated in the document.",
    commitments: ["Respectful and inclusive conduct", "Honest feedback", "Shared accountability", "Sustainable work practices", "Employee wellbeing", "Acting when something is not right"],
    extractions: [{ label: "Respect", text: "The document says feedback should be delivered with empathy and respect without compromising the message.", location: "Value 1" }, { label: "Wellbeing", text: "It distinguishes doing whatever it takes from overwork, burnout and unreasonable requests.", location: "Value 4" }, { label: "Speaking up", text: "Taking responsibility includes acting when something is not right.", location: "Value 3" }],
    questions: ["How were the values communicated and modelled?", "Were difficult conversations handled with empathy and respect?", "Were workload and wellbeing boundaries observed?", "Could employees act on concerns without negative consequences?"],
    related: ["performance-rating-scale", "monthly-one-to-one-template", "core-competencies"],
    timeline: [{ label: "Publish", detail: "Define values and boundaries" }, { label: "Communicate", detail: "Explain expected behaviours" }, { label: "Apply", detail: "Use in day-to-day management" }, { label: "Assess", detail: "Reference in performance and growth" }],
  },
];

const bundleDocuments: EvidenceDocument[] = [
  {
    slug: "individual-development-plan", title: "Individual Development Plan Template", category: "Career Development", date: "February 2024", status: "Reviewed",
    description: "A two-page planning template for career aspirations, strengths, development opportunities, 70:20:10 activities, dates, support and measures of success.",
    tags: ["IDP", "career goals", "70:20:10", "support", "success measures"],
    overview: "The template provides a concrete record for translating career aspirations and development priorities into activities, dates, support and measures of success.",
    purpose: "To document an employee's career goals, strengths, development opportunities and an actionable individual development plan.",
    appliesTo: ["Employees preparing an individual development plan", "Managers providing coaching and support", "People using the development-planning process"],
    managerResponsibilities: ["Discuss career aspirations", "Provide regular coaching", "Help identify resources and support", "Support development activities", "Review success measures and target dates"],
    employeeExpectations: ["Identify two or three strengths", "Identify two or three development opportunities", "Define a specific learning goal", "Select 70:20:10 activities", "Set target dates and measures of success"],
    systems: ["70:20:10 development model", "Development Planning Guidebook", "Manager coaching", "Individual Development Plan"],
    reviewFrequency: "The template includes target dates but does not state a fixed review interval.",
    commitments: ["Documented career goals", "Two or three development priorities", "Manager and peer support", "Measurable development outcomes", "On-the-job, social and formal learning"],
    extractions: [
      { label: "Career horizon", text: "Employees are prompted to consider their career aspirations over the next two years.", location: "Slide 1, career goals" },
      { label: "Action record", text: "Each development goal can be linked to activities, a target date, support and a success measure.", location: "Slide 1, development plan" },
      { label: "70:20:10", text: "The guide describes learning through on-the-job experience, other people and formal learning.", location: "Slide 2, completion guide" },
    ],
    questions: ["Were employees offered this template or an equivalent record?", "Were plans completed and retained?", "Did managers provide the support recorded in the plan?", "Were outcomes reviewed against target dates?"],
    related: ["development-planning-guidebook", "career-development-meeting-agenda", "monthly-one-to-one-template", "quarterly-check-in-template"],
    timeline: [{ label: "Aspire", detail: "Define a two-year career direction" }, { label: "Reflect", detail: "Identify strengths and opportunities" }, { label: "Plan", detail: "Choose 70:20:10 activities" }, { label: "Support", detail: "Name people and resources" }, { label: "Measure", detail: "Set dates and success measures" }],
  },
  {
    slug: "quarterly-check-in-template", title: "Performance & Growth Quarterly Check-In Template", seoTitle: "MECCA Quarterly Performance Check-In | Inside MECCA", seoDescription: "An independent reconstruction of a MECCA quarterly performance and growth check-in template, with source status, scope and evidence limits stated.", category: "Performance & Feedback", date: "Date not shown", status: "Reviewed",
    description: "A quarterly conversation planner for achievements, Big Rocks, Living Values, manager notes, next-quarter goals and post-meeting actions.",
    tags: ["quarterly", "check-in", "Big Rocks", "living values", "manager notes"],
    overview: "The one-page planner structures a quarterly conversation and provides parallel space for employee reflection and manager notes.",
    purpose: "To review the previous quarter, discuss achievements and values, align goals for the next quarter and record actions.",
    appliesTo: ["Employees participating in quarterly check-ins", "Managers conducting performance and growth conversations"],
    managerResponsibilities: ["Review progress against Big Rocks", "Record manager notes", "Discuss Living Values", "Align next-quarter Big Rocks", "Record a conversation summary and actions"],
    employeeExpectations: ["Reflect on progress", "Identify achievements", "Consider values-aligned behaviour", "Complete and discuss the next Big Rocks plan"],
    systems: ["Performance & Growth", "Quarterly Big Rocks", "Living Values", "Conversation summary"],
    reviewFrequency: "Quarterly, according to the document title and prompts.",
    commitments: ["Quarterly performance conversations", "Two-way written reflection", "Values discussion", "Goal alignment with a manager", "Post-meeting actions"],
    extractions: [
      { label: "Quarterly reflection", text: "The planner asks employees to reflect on progress and achievements from the previous quarter.", location: "Quarterly check-in prompts" },
      { label: "Manager alignment", text: "Employees are asked to confirm whether next-quarter Big Rocks were discussed and aligned with their manager.", location: "Next-quarter planning" },
      { label: "Action record", text: "A post-meeting field records the conversation summary and actions.", location: "Final template row" },
    ],
    questions: ["Did quarterly check-ins occur?", "Were both employee reflections and manager notes recorded?", "Were next-quarter goals discussed and aligned?", "Were agreed actions followed up?"],
    related: ["performance-rating-scale", "monthly-one-to-one-template", "living-values-2024", "individual-development-plan"],
    timeline: [{ label: "Reflect", detail: "Review Big Rocks and achievements" }, { label: "Discuss", detail: "Consider Living Values" }, { label: "Align", detail: "Agree next-quarter Big Rocks" }, { label: "Record", detail: "Document summary and actions" }],
  },
  {
    slug: "workday-completions-report", title: "How to Download a Completions Report in Workday", seoTitle: "MECCA Workday Training Report Guide | Inside MECCA", seoDescription: "An independent reconstruction of a MECCA Workday training-completions guide, with authorised-user scope, source status and evidence limits stated.", category: "Learning & Development", date: "Date not shown", status: "Reviewed",
    description: "A 15-step illustrated guide for running the R04 Enrollment Audit Report and exporting course completion data to Excel.",
    tags: ["Workday", "completion report", "learning records", "R04", "Excel export"],
    overview: "The guide shows that Workday can be used to select learning content, completion statuses and date ranges, then export enrolment data.",
    purpose: "To instruct an authorised user how to retrieve training enrolment and completion information from Workday.",
    appliesTo: ["Authorised Workday users", "People responsible for monitoring learning completion", "Learning and development administrators"],
    managerResponsibilities: ["No direct manager responsibility is stated", "Where authorised, use completion data consistently and appropriately", "Protect personal information contained in exported reports"],
    employeeExpectations: ["No direct employee expectation is stated in this guide", "Course status may be recorded as completed, in progress or not started"],
    systems: ["Workday", "R04 Enrollment Audit Report", "Course catalogue", "Completion status", "Excel export"],
    reviewFrequency: "The guide allows a user to choose a date range. It does not prescribe a reporting frequency.",
    commitments: ["Learning completion can be queried", "Multiple completion statuses can be selected", "Results can be filtered by date", "Report data can be exported"],
    extractions: [
      { label: "Report", text: "The guide directs users to the R04 Enrollment Audit Report in Workday.", location: "Steps 1 to 5" },
      { label: "Filters", text: "Users can select content, completion status and a start and end date.", location: "Steps 6 to 13" },
      { label: "Export", text: "The resulting data can be downloaded into Excel.", location: "Steps 14 to 15" },
    ],
    questions: ["Which roles had access to the report?", "How often were completion records reviewed?", "Were learning records used consistently across teams?", "How were exported employee data and privacy protected?"],
    related: ["development-planning-guidebook", "individual-development-plan", "core-competencies"],
    timeline: [{ label: "Select report", detail: "Open R04 Enrollment Audit Report" }, { label: "Choose content", detail: "Select the program or course" }, { label: "Filter", detail: "Choose statuses and dates" }, { label: "Run", detail: "Generate results" }, { label: "Export", detail: "Download data to Excel" }],
  },
  {
    slug: "recruitment-policy-retrieval-note", title: "Recruitment Policy Retrieval Note", category: "Recruitment", date: "4 August 2026", status: "Awaiting source",
    description: "A provenance note recording that the linked Recruitment Policy destination did not expose a downloadable policy at the time of collection.",
    tags: ["recruitment", "retrieval", "missing source", "provenance"],
    overview: "The note documents an unsuccessful retrieval attempt. It is not the Recruitment Policy and must not be represented as one.",
    purpose: "To preserve the source locations checked, the observed result and the outstanding evidence gap.",
    appliesTo: ["Researchers tracking source provenance", "Future document retrieval and authentication"],
    managerResponsibilities: ["Not stated because the policy file was not retrieved"],
    employeeExpectations: ["Not stated because the policy file was not retrieved"],
    systems: ["MECCA Base recruitment page", "MECCA Policies catalogue", "Internal search"],
    reviewFrequency: "The source may be checked again if access or catalogue contents change.",
    commitments: ["No policy commitment extracted from the missing file", "The retrieval gap is disclosed rather than filled with assumptions"],
    extractions: [{ label: "Observed result", text: "The linked policy folder displayed no articles at the time recorded in the bundle.", location: "Retrieval note" }, { label: "Evidence status", text: "No downloadable file titled Recruitment Policy was included in the bundle.", location: "Bundle manifest" }],
    questions: ["Can an authenticated Recruitment Policy be obtained?", "What version, authority, scope and effective date would a retrieved policy establish?", "Can the source page be preserved with exact wording, date and provenance?"],
    related: ["core-competencies", "development-planning-guidebook"],
    timeline: [{ label: "Locate", detail: "Identify recruitment source page" }, { label: "Follow link", detail: "Open policy catalogue" }, { label: "Search", detail: "Check catalogue and internal search" }, { label: "Record gap", detail: "Preserve unsuccessful retrieval result" }],
  },
];

export const documents: EvidenceDocument[] = [...baseDocuments, ...bundleDocuments];

export const editorialMetadata: Record<string, EditorialMetadata> = {
  "development-planning-guidebook": { sourceKey: "S1", recordType: "Restricted source", scope: "Contents and analysis withheld pending provenance, authentication and legal review", locatorSummary: "Source restricted", sourceStatus: "Pre-publication legal hold; authenticity, contributor authority and publication clearance not established" },
  "individual-development-plan": { sourceKey: "S2", recordType: "Implementation tool", scope: "Individual development planning; distribution and completion not established", locatorSummary: "Slides 1 and 2", sourceStatus: "Supplied internal template; authenticity and currency not independently confirmed" },
  "career-development-meeting-agenda": { sourceKey: "S3", recordType: "Implementation tool", scope: "Career development discussions; universal availability not established", locatorSummary: "One-page agenda", sourceStatus: "Supplied internal template; visible date not stated" },
  "quarterly-check-in-template": { sourceKey: "S4", recordType: "Implementation tool", scope: "Quarterly performance and growth conversations; business-unit scope not stated", locatorSummary: "One-slide template", sourceStatus: "Supplied internal template with generic quarter placeholders" },
  "monthly-one-to-one-template": { sourceKey: "S5", recordType: "Implementation tool", scope: "Monthly one-to-one conversations; mandatory use not established", locatorSummary: "One substantive page", sourceStatus: "Supplied internal template; visible date not stated" },
  "performance-rating-scale": { sourceKey: "S6", recordType: "Behavioural standard", scope: "Support Centre only", locatorSummary: "Pages 1 and 2", sourceStatus: "Published for Support Centre in March 2024; wider workforce application not established" },
  "core-competencies": { sourceKey: "S7", recordType: "Framework", scope: "Four competency levels with additional people-leader expectations", locatorSummary: "Pages 1 to 9", sourceStatus: "Supplied internal framework; visible date not stated" },
  "living-values-2024": { sourceKey: "S8", recordType: "Behavioural standard", scope: "Workplace values described for team members", locatorSummary: "Values 1 to 5 across pages 1 and 2", sourceStatus: "Supplied internal material identified as the 2024 version" },
  "workday-completions-report": { sourceKey: "S9", recordType: "Systems evidence", scope: "Authorised Workday users and learning-completion administration", locatorSummary: "Pages 1 to 7", sourceStatus: "Administrative guide generated in December 2024; screenshots and identifiers restricted" },
  "recruitment-policy-retrieval-note": { sourceKey: "S10", recordType: "Retrieval gap", scope: "Recruitment Policy content, authority and effective date not established", locatorSummary: "Retrieval record dated 4 August 2026", sourceStatus: "Policy not retrieved; no substantive policy claims published" },
};

export const getEditorialMeta = (slug: string) => editorialMetadata[slug];

export const getDocument = (slug: string) => documents.find((document) => document.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);

export const commitmentCards = [
  ["Regular manager feedback", "monthly-one-to-one-template"],
  ["Career development planning", "development-planning-guidebook"],
  ["Growth conversations", "career-development-meeting-agenda"],
  ["Documented development plans", "development-planning-guidebook"],
  ["Manager coaching", "core-competencies"],
  ["Respectful workplace", "living-values-2024"],
  ["Shared accountability", "living-values-2024"],
  ["Employee wellbeing", "living-values-2024"],
] as const;
