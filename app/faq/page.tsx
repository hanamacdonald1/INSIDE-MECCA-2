import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";

export const metadata = {
  title: "FAQ | Inside MECCA",
  description: "Frequently asked questions regarding submission handling, anonymity, and data retention.",
};

const faqs = [
  [
    "Can I submit anonymously or use a pseudonym?", 
    "Yes. Choose Anonymous in the questionnaire and do not provide an email or details that identify you. If you choose Confidential, we may know who you are but will restrict your identity to verification, editorial, legal, or necessary technical work. Using a pseudonym is acceptable."
  ],
  [
    "Why are documents not mandatory for first-hand accounts?", 
    "While primary documents are helpful for verification, they are not mandatory to submit an account. Many significant workplace experiences do not generate a paper trail. We cross-reference first-hand testimonies with other accounts and our broader research."
  ],
  [
    "Does submitting make me a legally protected whistleblower?", 
    "Not automatically. Inside MECCA is not MECCA's official whistleblower hotline, nor is it a regulator or a law firm. Sending information does not automatically grant statutory whistleblower protections or legal professional privilege. Seek independent legal advice before relying on a statutory disclosure pathway."
  ],
  [
    "How is my data handled and retained?", 
    "Data from submissions is routed securely. Forms are processed through secure endpoints and stored in restricted Supabase databases. Communications are handled via secured Resend infrastructure. We maintain strict data retention schedules, deleting unverified or unnecessary personal data in accordance with our legal publication policy."
  ],
  [
    "What about casual employee protections?", 
    "Casual employees share the same right to provide an account as permanent staff. However, because casual employment often carries different practical job-security risks, we strongly advise using personal devices and reviewing our source safety guidelines before submitting."
  ],
  [
    "Will my words be published immediately?", 
    "No submission grants immediate publication permission. If we intend to quote or use contributor material, we will seek separate, specific permission for the proposed words, identity treatment, and format."
  ],
];

export default function FAQPage() {
  return (
    <SitePage>
      <PageHero label="FREQUENTLY ASKED QUESTIONS" title="Questions contributors often ask">
        <p>Information on anonymity, evidentiary thresholds, data handling, and statutory limits.</p>
      </PageHero>
      
      <section className="px-6 md:px-12 py-12 md:py-16 max-w-4xl mx-auto w-full box-border">
        <div className="flex flex-col gap-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="border border-stone-300 rounded bg-[#f7f5f1] p-4 group cursor-pointer">
              <summary className="font-bold text-lg text-stone-900 group-open:mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-sm list-none flex justify-between items-center">
                {question}
                <span className="text-red-700 font-mono text-xl group-open:hidden">+</span>
                <span className="text-red-700 font-mono text-xl hidden group-open:block">-</span>
              </summary>
              <p className="text-stone-700 leading-[1.65]">
                {answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-4">
          <Link 
            className="flex items-center justify-center min-h-[48px] px-6 font-bold text-[15px] tracking-wide rounded-sm transition-colors text-center bg-[#b42025] hover:bg-[#8b181c] text-white border border-[#b42025] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2" 
            href="/share-story"
          >
            Share your experience
          </Link>
          <Link 
            className="flex items-center justify-center min-h-[48px] px-6 font-bold text-[15px] tracking-wide rounded-sm transition-colors text-center bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2" 
            href="/legal-publication-policy"
          >
            Legal and publication policy
          </Link>
        </div>
      </section>
    </SitePage>
  );
}
