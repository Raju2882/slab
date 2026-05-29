import { Compass, FileSearch, MailCheck, FileText, Send, UserCheck } from "lucide-react";

export default function AdmissionProcess() {
  const steps = [
    {
      step: "01",
      title: "Candid Counseling",
      desc: "Connect for a free professional guidance audit. We analyze NEET scores, global budgets, and preference sets.",
      icon: Compass,
      color: "border-blue-200 text-blue-600 bg-blue-50/50"
    },
    {
      step: "02",
      title: "Document Screening",
      desc: "Submit transcripts and passport scans. We verify transcripts against target countries' absolute criteria.",
      icon: FileSearch,
      color: "border-teal-200 text-teal-600 bg-teal-50/50"
    },
    {
      step: "03",
      title: "Invitation Issuance",
      desc: "Within 48 hours of securing matching criteria, the partner university issues your guaranteed formal admission.",
      icon: MailCheck,
      color: "border-sky-200 text-sky-600 bg-sky-50/50"
    },
    {
      step: "04",
      title: "Embassy Formalities",
      desc: "We manage official apostille, translating high school logs, getting medical cards, and processing student visas.",
      icon: FileText,
      color: "border-purple-200 text-purple-600 bg-purple-50/50"
    },
    {
      step: "05",
      title: "On-Flight Escorts",
      desc: "Secure discount bulk group tickets. Our senior coordinators fly directly with you to handle customs on arrival.",
      icon: Send,
      color: "border-rose-200 text-rose-600 bg-rose-50/50"
    },
    {
      step: "06",
      title: "Campus Handover",
      desc: "We allocate separate residential warden locks, handle local physical registration, and escort your first class.",
      icon: UserCheck,
      color: "border-emerald-200 text-emerald-600 bg-emerald-50/50"
    }
  ];

  return (
    <section 
      id="admissions" 
      className="relative py-24 bg-[#FFFFFF] border-b border-[#E5E7EB]"
    >
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
            TRANSPARENT WORKFLOWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#111827] tracking-tight">
            Streamlined Enrollment Lifecycle
          </h2>
          <p className="text-[#6B7280] text-sm font-sans font-medium">
            Our specialized board coordinates everything end-to-end. Rest easy knowing our timeline avoids administrative delays.
          </p>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Decorative Connecting Lines (Hidden on Mobile) */}
          <div className="hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-teal-500/10 -z-10 pointer-events-none" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#E5E7EB] relative flex flex-col justify-between hover:border-[#2563EB]/40 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.04)] transition-all duration-300 group"
              >
                {/* Floating Index Node */}
                <span className="absolute top-4 right-6 text-3xl font-mono font-extrabold text-[#E5E7EB] group-hover:text-[#2563EB]/10 transition-colors">
                  {s.step}
                </span>

                <div className="space-y-6">
                  {/* Step Icon Frame */}
                  <div className={`p-3.5 rounded-xl border-2 w-fit ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-sans font-extrabold text-[#111827] tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed font-sans font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
