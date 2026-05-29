import { ShieldCheck, UserCheck, HeartHandshake, ArrowRight, Users } from "lucide-react";
import { motion } from "motion/react";

export default function StatisticsSection() {
  return (
    <section 
      id="statistics-section" 
      className="relative py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden border-b border-[#E5E7EB]"
    >
      {/* Background radial soft light-blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-200/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Highly Polished Doctors Group Image with Floating Badges */}
          <div className="lg:col-span-6 flex justify-center relative select-none">
            
            {/* The main image container frame */}
            <div className="relative w-full max-w-[480px]">
              
              {/* Floating Top-Right Badge: "HELPING 5000+ STUDENTS" */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-4 -right-2 sm:-right-6 bg-white border border-slate-100 rounded-2xl p-3 pr-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center gap-3.5 z-20 hover:translate-y-[-2px] transition-transform duration-200"
              >
                <div className="bg-[#fbc02d] text-slate-900 p-2.5 rounded-xl flex items-center justify-center shadow-inner">
                  <Users className="h-5 w-5 stroke-[2.5px]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    HELPING
                  </span>
                  <span className="text-[14px] font-extrabold text-slate-800 mt-1 leading-none">
                    5000+ STUDENTS
                  </span>
                </div>
              </motion.div>

              {/* Central Medical Image Frame */}
              <div className="rounded-[28px] border-[8px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden aspect-[4/3] sm:aspect-square relative group">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" 
                  alt="Explore My University Medical Doctors team" 
                  className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating Bottom-Left Badge: "10+ YEARS OF EXCELLENCE" */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -left-2 sm:-left-6 bg-white border border-slate-100 rounded-2xl p-3 pr-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center gap-3.5 z-20 hover:translate-y-[-2px] transition-transform duration-200"
              >
                <div className="bg-[#1b56db] text-white font-extrabold text-[16px] py-1.5 px-3 rounded-lg flex items-center justify-center shadow-lg shadow-[#1b56db]/20">
                  10+
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    YEARS OF
                  </span>
                  <span className="text-[13px] font-black text-slate-800 tracking-wide mt-1 leading-none">
                    EXCELLENCE
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: Heading text, details, and grid key points */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8">
            
            {/* Trusted Education Partner Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1b56db] bg-[#1b56db]/5 border border-[#1b56db]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b56db]" />
              <span>TRUSTED EDUCATION PARTNER</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-black font-sans leading-tight text-slate-900 tracking-tight">
              Your Path to <br /> becoming a <span className="text-[#1b56db]">Global Doctor</span>
            </h2>

            {/* Summary description */}
            <p className="text-slate-600 text-[15px] sm:text-base font-normal leading-relaxed">
              Explore My University is India's most trusted gateway for medical aspirants. We don't just provide admissions; we shape futures through dedicated mentorship and transparent guidance.
            </p>

            {/* Inner Cards List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              
              {/* Card 1: Official Partner */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1b56db] mb-4">
                  <ShieldCheck className="h-5 w-5 stroke-[2.2px]" />
                </div>
                <h4 className="text-[15px] font-bold italic text-slate-800 mb-1 leading-none">
                  Official Partner
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed font-sans mt-2">
                  Direct Tie-Ups With 30+ Govt Universities
                </p>
              </div>

              {/* Card 2: Expert Advice */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
                  <UserCheck className="h-5 w-5 stroke-[2.2px]" />
                </div>
                <h4 className="text-[15px] font-bold italic text-slate-800 mb-1 leading-none">
                  Expert Advice
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed font-sans mt-2">
                  Counselors With 10+ Years Experience
                </p>
              </div>

              {/* Card 3 (Spans full width across horizontal flex layout in mock) */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 sm:col-span-2 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#fa4d2c] flex-shrink-0">
                  <HeartHandshake className="h-5 w-5 stroke-[2.2px]" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-[15px] font-black italic uppercase text-slate-800 leading-none">
                    FULL SUPPORT
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans mt-2">
                    From University Selection To Campus Enrollment, And Beyond.
                  </p>
                </div>
              </div>

            </div>

            {/* Discovery Button CTA */}
            <button 
              onClick={() => {
                const trg = document.getElementById("why-us");
                if (trg) trg.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-[#0b1328] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#0b1328]/10 cursor-pointer"
            >
              <span>Discover Our Mission</span>
              <ArrowRight className="h-4 w-4 text-white hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
