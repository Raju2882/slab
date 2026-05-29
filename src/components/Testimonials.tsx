import { useState, useEffect } from "react";
import axios from "axios";
import { Testimonial } from "../types";
import { Star, Quote, MapPin, GraduationCap } from "lucide-react";

interface TestimonialsProps {
  refreshTrigger: number;
}

export default function Testimonials({ refreshTrigger }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [refreshTrigger]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/public/testimonials");
      setTestimonials(response.data);
    } catch (err) {
      console.error("Testimonials query failure:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="testimonials" 
      className="relative py-24 bg-[#FFFFFF] overflow-hidden border-b border-[#E5E7EB]"
    >
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
            PROVEN STUDENT OUTCOMES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#111827] tracking-tight">
            Our Graduates Share Their Experience
          </h2>
          <p className="text-[#6B7280] text-sm font-sans font-medium">
            Hear directly from medical researchers and software engineering specialists who started their overseas paths through our trusted advisory channel.
          </p>
        </div>

        {/* Load indicators or testimonials Grid */}
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-[#6B7280] text-sm font-sans font-semibold">No testimonials posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                id={`testimonial-card-${t.id}`}
                className="p-8 rounded-2xl bg-white border border-[#E5E7EB] relative flex flex-col justify-between hover:border-[#2563EB]/40 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 group"
              >
                {/* Floating Quote accent */}
                <span className="absolute top-6 right-8 text-[#2563EB]/5 group-hover:text-[#2563EB]/10 transition-colors">
                  <Quote className="h-10 w-10 rotate-180" />
                </span>

                <div className="space-y-6">
                  {/* Star review ratings */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${idx < t.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`}
                      />
                    ))}
                  </div>

                  {/* Feedback Text content */}
                  <p className="text-sm text-slate-700 leading-relaxed font-sans italic font-normal">
                    "{t.text}"
                  </p>
                </div>

                {/* Patient / Profile Line */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#E5E7EB] mt-6">
                  <img
                    src={t.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.studentName)}`}
                    alt={t.studentName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E5E7EB] group-hover:border-[#2563EB]/30 transition-colors bg-slate-50"
                  />
                  <div className="space-y-0.5">
                    <span className="block font-sans font-bold text-[#111827] text-sm">
                      {t.studentName}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#2563EB] font-mono font-bold">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {t.course}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[#6B7280] font-sans font-medium">
                      <MapPin className="h-3 w-3 text-[#2563EB]" />
                      {t.university}, {t.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
