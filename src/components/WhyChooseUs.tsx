import { motion } from "motion/react";
import { GraduationCap, FileText, Plane, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const cards = [
    {
      id: "expert-counseling",
      title: "Expert Counseling",
      description: "Personalized career mapping to help you select the ideal university based on your academic goals and budget.",
      icon: GraduationCap,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      id: "zero-hassle",
      title: "Zero Hassle Docs",
      description: "Complete assistance with complex admission forms, apostille, notarization and local translations.",
      icon: FileText,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
      highlighted: true // Replicating the highlighted active glow on the 2nd card
    },
    {
      id: "visa-mastery",
      title: "Visa Mastery",
      description: "Proven 100% success rate. We handle everything from invitation letters to visa stamping and flight booking.",
      icon: Plane,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50"
    },
    {
      id: "local-guardianship",
      title: "Local Guardianship",
      description: "Our support stays with you. From airport pickup to hostel allotment and local registration.",
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50"
    }
  ];

  return (
    <section 
      id="why-us" 
      className="relative py-20 lg:py-28 bg-white overflow-hidden select-none"
    >
      {/* Soft vector circular ambient rays in the background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/10 to-indigo-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Caption Tagline */}
        <span className="text-[11px] font-black tracking-widest text-[#1b56db] uppercase block mb-3 font-sans">
          OUR GLOBAL ADVANTAGES
        </span>

        {/* Title Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-sans">
          Why Choose Explore My University?
        </h2>

        {/* Description Text */}
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4 mb-16 font-sans">
          We provide end-to-end support that simplifies your journey to becoming a global medical professional.
        </p>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch pt-2">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`flex flex-col justify-between p-8 rounded-[28px] bg-white transition-all duration-300 relative text-left h-full ${
                  card.highlighted 
                    ? "border-2 border-blue-500/80 shadow-[0_15px_30px_rgba(37,99,235,0.18)]" 
                    : "border-2 border-slate-100 hover:border-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Visual top smooth border/curving line accent matching the screenshot exactly */}
                <div 
                  className={`absolute top-0 left-6 right-6 h-[2px] rounded-full ${
                    card.highlighted 
                      ? "bg-gradient-to-r from-blue-400 to-indigo-600" 
                      : "bg-gradient-to-r from-slate-100 via-sky-100 to-slate-100"
                  }`} 
                />

                <div className="space-y-6">
                  {/* Icon Block */}
                  <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${card.iconColor} stroke-[2.2px]`} />
                  </div>

                  {/* Title & Description Text Block Accent */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight font-sans">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic indicator line for card interaction feedback */}
                {card.highlighted && (
                  <div className="w-12 h-1 bg-[#1b56db] rounded-full mt-6 opacity-80" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
