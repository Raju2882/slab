import { useState, useEffect } from "react";
import axios from "axios";
import { Scholarship } from "../types";
import { Award, GraduationCap, Calendar, CheckCircle, Search, AlertCircle, Bookmark } from "lucide-react";

interface ScholarshipsProps {
  onApplyForScholarship: (scholarshipName: string, universityName?: string) => void;
  refreshTrigger: number;
}

export default function Scholarships({ onApplyForScholarship, refreshTrigger }: ScholarshipsProps) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtering criteria
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoverage, setSelectedCoverage] = useState("All");

  useEffect(() => {
    fetchScholarships();
  }, [refreshTrigger]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/public/scholarships");
      setScholarships(response.data);
    } catch (err: any) {
      console.error("Failed to query scholarships database:", err);
      setError("Failed to fetch scholarship opportunities database.");
    } finally {
      setLoading(false);
    }
  };

  const coverages = ["All", "Full", "Partial", "Stipend Only"];

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.universityName && s.universityName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCoverage = selectedCoverage === "All" || s.coverage === selectedCoverage;
    return matchesSearch && matchesCoverage;
  });

  return (
    <section 
      id="scholarships" 
      className="relative py-24 bg-[#FFFFFF] border-b border-[#E5E7EB]"
    >
      <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
            FINANCIAL AID FELLOWSHIPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#111827] tracking-tight">
            Scholarship &amp; Grant Pathways
          </h2>
          <p className="text-[#6B7280] text-sm font-sans font-medium">
            Reduce financial stress. Explore merit-based fee waivers, fully-funded state scholarship pools, and monthly room subsidies optimized for high-performing international candidates.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E5E7EB]">
          {/* Coverage Filter buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {coverages.map((cov) => (
              <button
                key={cov}
                onClick={() => setSelectedCoverage(cov)}
                className={`px-4 py-2 text-xs font-bold font-sans rounded-xl border transition-all flex-shrink-0 cursor-pointer ${
                  selectedCoverage === cov
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                    : "bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#111827]"
                }`}
              >
                {cov} Coverage
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#6B7280]" />
            </span>
            <input
              type="text"
              placeholder="Search by grant name, university, land..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#6B7280]/60 focus:outline-[#2563EB] focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>
        </div>

        {/* Grid List view */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="h-8 w-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-[#6B7280]">Filtering Active Foundations...</span>
          </div>
        ) : error ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-[#E5E7EB]">
            <p className="text-sm text-red-500 font-semibold">{error}</p>
          </div>
        ) : filteredScholarships.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-3">
            <p className="text-sm text-[#6B7280]">No active scholarships match your query criteria.</p>
            <button 
              onClick={() => { setSelectedCoverage("All"); setSearchTerm(""); }} 
              className="px-4 py-1.5 text-xs text-[#2563EB] border border-[#2563EB]/30 bg-[#2563EB]/5 rounded hover:bg-[#2563EB] hover:text-white transition-all cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredScholarships.map((sch) => (
              <div
                key={sch.id}
                id={`schol-card-${sch.id}`}
                className="rounded-2xl pb-6 overflow-hidden bg-white border border-[#E5E7EB] flex flex-col justify-between hover:border-[#2563EB]/30 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 group"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top line with category info */}
                  <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                    <span className="text-xs font-mono bg-emerald-50 text-emerald-600 font-extrabold px-3 py-1 rounded-lg border border-emerald-100">
                      {sch.coverage} Waiver
                    </span>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280] font-sans font-medium">
                      <Calendar className="h-4 w-4 text-[#2563EB]/70" />
                      <span>Apply by: <strong className="text-[#111827] font-semibold">{sch.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-sans font-black text-[#111827] group-hover:text-[#2563EB] transition-colors duration-200">
                      {sch.name}
                    </h3>
                    {sch.universityName && (
                      <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                        <GraduationCap className="h-4 w-4 text-[#2563EB]/80" />
                        <span>{sch.universityName}</span>
                        <span className="text-[#6B7280]">({sch.country})</span>
                      </div>
                    )}
                    <p className="text-xs text-[#6B7280] leading-relaxed font-sans font-medium">
                      {sch.description}
                    </p>
                  </div>

                  {/* Criteria Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#111827]">
                      <Bookmark className="h-4 w-4 text-[#2563EB]" />
                      <span>Required Eligibility Scenarios</span>
                    </div>
                    <p className="text-xs text-[#6B7280] font-sans font-medium leading-relaxed">
                      {sch.eligibility}
                    </p>
                  </div>

                  {/* Fellowship Value line */}
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Estimated Award: <strong className="text-emerald-600 font-mono font-black text-base">{sch.value}</strong></span>
                  </div>
                </div>

                {/* Apply trigger row */}
                <div className="px-6 sm:px-8">
                  <button
                    onClick={() => onApplyForScholarship(sch.name, sch.universityName)}
                    className="w-full py-3 bg-slate-50 border border-[#E5E7EB] hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5 text-[#111827] hover:text-[#2563EB] font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award className="h-4 w-4 text-[#2563EB] group-hover:scale-110 transition-transform" />
                    Apply for this Fellowship Scheme
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
