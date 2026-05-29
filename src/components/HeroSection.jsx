import { motion } from "motion/react";

export default function HeroSection({ onScrollToSection, onInquirySubmitted }) {
  // Stats/highlights list for the infinite scrolling bar at the bottom
  const highlights = [
    "WHO & NMC Recognized",
    "Free Counselling Support",
    "No Donation / Capitation Fee",
    "Admissions Open for 2025-26 Intake",
    "Top Government Medical Universities in Russia",
    "100% English Medium"
  ];

  // Doubling the array to allow seamless continuous marquee scroll
  const marqueeItems = [...highlights, ...highlights, ...highlights];

  return (
    <section 
      id="hero" 
      className="relative w-full bg-[#13141a] text-white flex flex-col justify-between overflow-hidden"
      style={{ minHeight: "calc(100vh - 125px)" }}
    >
      {/* Absolute Glow Background Elements */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-[#244391]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[5%] w-[450px] h-[450px] bg-[#fa4d2c]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sticky Tab anchored to the viewport/section right side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="bg-[#1b56db] text-white font-bold text-[11px] uppercase tracking-widest px-4 py-3 pb-4 rounded-l-2xl shadow-lg border-l border-t border-b border-white/20 origin-right cursor-pointer select-none"
             style={{ 
               writingMode: "vertical-lr", 
               textOrientation: "mixed",
               transform: "rotate(180deg) translateY(50%)" 
             }}
             onClick={() => onScrollToSection ? onScrollToSection("contact") : null}
        >
          MBBS ADMISSIONS 26-27
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-24 relative z-10">
        <div className="w-full max-w-4xl flex flex-col items-start text-left space-y-6 md:space-y-8">
          
          {/* Admissions Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold font-sans uppercase tracking-widest text-[#93b3f2] bg-[#1a2c4c] border border-[#2d4d82]"
          >
            ADMISSIONS OPEN 2025-26
          </motion.div>

          {/* Headline Title */}
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-black font-sans leading-tight tracking-tight text-white animate-fade-in"
            >
              Your Medical Career
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap"
            >
              <span className="text-4xl sm:text-5xl lg:text-[56px] font-black font-sans leading-none tracking-tight text-[#5fa7f6]">
                Starts Here
              </span>
              
              {/* Embedded Video Unavailable Placeholder */}
              <div className="inline-flex items-center gap-2 bg-[#1b1c21] border border-white/10 py-1.5 px-3.5 rounded-full text-slate-400 backdrop-blur-sm self-start sm:self-center">
                <div className="w-5 h-5 rounded-full border border-slate-500 bg-white/5 flex items-center justify-center text-slate-400 text-xs font-bold leading-none select-none">
                  !
                </div>
                <span className="text-[13px] font-sans font-medium tracking-wide">
                  This video is unavailable
                </span>
              </div>
            </motion.div>
          </div>

          {/* Paragraph Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans"
          >
            Join 5000+ students who have trusted Explore My University for their MBBS journey abroad. Transparent, Affordable, & Direct Admissions.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => onScrollToSection ? onScrollToSection("contact") : null}
              className="w-full sm:w-auto px-8 py-4 bg-[#1b56db] text-white font-bold text-sm tracking-wider rounded-xl hover:bg-[#1546b5] transition-all duration-200 shadow-lg shadow-[#1b56db]/30 cursor-pointer"
            >
              Free Consultation
            </button>
            <button 
              onClick={() => onScrollToSection ? onScrollToSection("universities") : null}
              className="w-full sm:w-auto px-8 py-4 bg-[#23242a] border border-white/10 text-white font-semibold text-sm tracking-wider rounded-xl hover:bg-[#2b2d35] hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              See Our Universities
            </button>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM TICKER / INFINITE HORIZONTAL MARQUEE BAR */}
      <div className="w-full bg-[#1b56db] overflow-hidden py-3 border-t border-white/10 flex items-center">
        <div className="relative w-full flex overflow-x-hidden">
          {/* Animated scrolling row */}
          <motion.div 
            className="flex whitespace-nowrap gap-12 text-white font-semibold text-xs md:text-sm tracking-wider uppercase font-sans py-1 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear"
              }
            }}
          >
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-3 select-none flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
