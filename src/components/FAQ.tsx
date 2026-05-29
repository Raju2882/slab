import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is NEET qualification mandatory to pursue MBBS abroad?",
      a: "Yes, for Indian nationals, qualifying the NEET exam is absolutely mandatory under NMC/MCI guidelines if you intend to return and sit for licensing tests (like NExT/FMGE) to practice medicine in India."
    },
    {
      q: "What is the medium of instruction in Georgia, Russia, and Central Asia?",
      a: "Our curated university partner roster exclusively lists 100% English medium courses. All textbooks, examinations, laboratory courses, clinical trials, and hospital rotations are administered in standard medical English."
    },
    {
      q: "Are the degrees recognized by major medical commissions globally?",
      a: "Absolutely. All represented medical academies are listed in the World Directory of Medical Schools (WDOMS) and approved by WHO, NMC (India), WFME, and FAIMER, enabling graduates to qualify for licensure in the USA (USMLE), the UK (PLAB), and India (NExT)."
    },
    {
      q: "What safety systems are enabled at student hostels overseas?",
      a: "Student hostels feature highly restrictive safety frameworks: separate boys and girls wings, 24/7 CCTV vigilance, biometric card lock validation, dedicated on-campus wardens, and on-premises Indian cooking mess with complete pure-vegetarian catering options."
    },
    {
      q: "How does your agency assist with student visa clearances?",
      a: "We manage the documentation sequence in its entirety. From acquiring apostille stamps on local secondary logs, translating records, applying for ministry invitation letters, right up to routing physical passports to the respective embassies."
    },
    {
      q: "Do universities offering low tuition fees have quality labs?",
      a: "Yes, because state medical academies are heavily funded by their respective federal governments. They feature modern smart simulation rooms, comprehensive diagnostic labs, and access to massive local multi-specialty clinical hospital networks."
    }
  ];

  return (
    <section 
      id="faqs" 
      className="relative py-24 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden"
    >
      <div className="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
            KNOWLEDGE BASE DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#111827] tracking-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-[#6B7280] text-sm font-sans font-medium">
            Need details about overseas regulations, local currency logistics, or admission timelines? Explore immediate responses below.
          </p>
        </div>

        {/* Dynamic Accordions list */}
        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? "bg-white border-[#2563EB]/40 shadow-[0_4px_25px_rgba(37,99,235,0.03)]" 
                    : "bg-white border-[#E5E7EB] hover:border-[#2563EB]/40"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`h-5 w-5 flex-shrink-0 transition-colors ${isOpen ? "text-[#2563EB]" : "text-slate-400"}`} />
                    <span className="font-sans font-black text-sm sm:text-base text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug">
                      {f.q}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full ${isOpen ? "bg-[#2563EB] text-white" : "bg-slate-50 text-slate-500 border border-[#E5E7EB]"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#E5E7EB] animate-in slide-in-from-top-2 duration-200">
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-sans font-medium pl-8">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
