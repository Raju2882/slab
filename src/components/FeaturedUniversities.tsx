import { useState, useEffect } from "react";
import axios from "axios";
import { University } from "../types";
import { Search, MapPin, Landmark, Award, BookOpen, Clock, DollarSign, X, CheckCircle } from "lucide-react";

interface FeaturedUniversitiesProps {
  onApplyForUniversity: (univName: string, countryName: string) => void;
  refreshTrigger: number;
}

export default function FeaturedUniversities({ onApplyForUniversity, refreshTrigger }: FeaturedUniversitiesProps) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Search & Filter state
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUnivDetails, setActiveUnivDetails] = useState<University | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, [refreshTrigger]);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/public/universities");
      setUniversities(response.data);
    } catch (err: any) {
      console.error("Failed to query universities:", err);
      setError("Unable to stream partners database at this time.");
    } finally {
      setLoading(false);
    }
  };

  // Extract unique countries list
  const countriesList = ["All", ...Array.from(new Set(universities.map(u => u.country)))];

  // Filtering Logic
  const filteredUniversities = universities.filter(u => {
    const matchesCountry = selectedCountry === "All" || u.country === selectedCountry;
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  return (
    <section 
      id="universities" 
      className="relative py-24 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden"
    >
      {/* Background radial effects */}
      <div className="absolute top-[30%] -right-20 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] -left-20 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
            PROVEN HIGH-LEVEL PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#111827] tracking-tight">
            Accredited Global Universities
          </h2>
          <p className="text-[#6B7280] font-sans text-sm font-medium">
            Search top medical and technical state universities verified directly by NMC, WHO, and international curriculum councils. Choose elite English-medium options.
          </p>
        </div>

        {/* Filters and Search panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-[#E5E7EB]">
          {/* Countries tab slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {countriesList.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 text-xs font-bold font-sans rounded-xl border transition-all flex-shrink-0 cursor-pointer ${
                  selectedCountry === country
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_4px_15px_rgba(37,99,235,0.2)]"
                    : "bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#111827]"
                }`}
              >
                {country}
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
              placeholder="Search by name, city, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#6B7280]/60 focus:outline-none focus:border-[#2563EB] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827] text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid List Renderer */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="h-8 w-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-[#6B7280]">Streaming Partners Database...</span>
          </div>
        ) : error ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-[#E5E7EB]">
            <p className="text-sm text-red-500 font-semibold">{error}</p>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-50 border border-[#E5E7EB] space-y-3">
            <p className="text-sm text-[#6B7280]">No universities match your current search query or country tab.</p>
            <button 
              onClick={() => { setSelectedCountry("All"); setSearchQuery(""); }} 
              className="px-4 py-1.5 text-xs text-[#2563EB] border border-[#2563EB]/30 bg-[#2563EB]/5 rounded hover:bg-[#2563EB] hover:text-white transition-all cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((univ) => (
              <div
                key={univ.id}
                id={`univ-card-${univ.id}`}
                className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] flex flex-col hover:border-[#2563EB]/30 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* Cover visual frame */}
                <div className="relative h-48 overflow-hidden bg-slate-50">
                  <img
                    src={univ.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"}
                    alt={univ.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating labels */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E5E7EB] px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <MapPin className="h-3 w-3 text-[#2563EB]" />
                    <span className="text-[10px] font-bold text-[#111827] tracking-wide uppercase">{univ.country}</span>
                  </div>
                  {univ.globalRank && (
                    <div className="absolute top-4 right-4 bg-[#2563EB] text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md shadow-md">
                      Rank #{univ.globalRank}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-sans font-black text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-1">
                      {univ.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] font-sans line-clamp-2 leading-relaxed">
                      {univ.description}
                    </p>

                    {/* Features overview */}
                    <div className="grid grid-cols-2 gap-y-2 pt-1">
                      <div className="flex items-center gap-1.5 text-[#111827] font-semibold">
                        <DollarSign className="h-4 w-4 text-[#2563EB]" />
                        <span className="text-xs font-mono font-extrabold">${univ.tuitionFeePerYear.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#111827] font-semibold">
                        <Clock className="h-4 w-4 text-[#2563EB]" />
                        <span className="text-xs font-sans">Est. {univ.established}</span>
                      </div>
                    </div>

                    {/* Courses pill grid */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {univ.courses.slice(0, 3).map((course, idx) => (
                        <span key={idx} className="bg-[#2563EB]/5 border border-[#2563EB]/10 text-[10px] px-2.5 py-1 rounded-lg text-[#2563EB] font-bold font-mono">
                          {course}
                        </span>
                      ))}
                      {univ.courses.length > 3 && (
                        <span className="text-[10px] text-[#6B7280] font-sans pl-1 pt-1 font-medium">
                          +{univ.courses.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => setActiveUnivDetails(univ)}
                      className="flex-1 py-3 text-xs text-center border border-[#E5E7EB] text-[#6B7280] font-bold rounded-xl hover:bg-slate-50 hover:text-[#111827] transition-all cursor-pointer"
                    >
                      View Highlights
                    </button>
                    <button
                      onClick={() => onApplyForUniversity(univ.name, univ.country)}
                      className="flex-1 py-3 text-xs text-center bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer shadow-[0_4px_12px_rgba(37,99,235,0.15)]"
                    >
                      Instant Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* DETAIL DRAWER / MODAL POPUP */}
      {activeUnivDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header backdrop banner */}
            <div className="relative h-48 bg-slate-100">
              <img
                src={activeUnivDetails.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"}
                alt={activeUnivDetails.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/20 to-transparent" />
              <button
                onClick={() => setActiveUnivDetails(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] rounded-full transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] font-sans uppercase bg-[#2563EB] text-white font-extrabold px-2.5 py-1 rounded mb-1 inline-block">
                  {activeUnivDetails.country}
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-[#111827] drop-shadow-sm">
                  {activeUnivDetails.name}
                </h3>
              </div>
            </div>

            {/* Modal Body Contents */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/10 text-center sm:text-left">
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-[#6B7280] uppercase">Year Founded</span>
                  <span className="text-sm font-extrabold text-[#111827] mt-1 block">{activeUnivDetails.established}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-[#6B7280] uppercase">Estimated Tuition</span>
                  <span className="text-sm font-extrabold text-[#2563EB] mt-1 block">${activeUnivDetails.tuitionFeePerYear.toLocaleString()} / year</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-[#6B7280] uppercase">Global Ranking</span>
                  <span className="text-sm font-extrabold text-[#111827] mt-1 block">QS #{activeUnivDetails.globalRank || "N/A"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono tracking-wider text-[#6B7280] uppercase font-bold">About the Academy</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed font-sans">
                  {activeUnivDetails.description}
                </p>
              </div>

              {/* Programs and Accreditations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-wider text-[#6B7280] uppercase font-bold">Supported Core Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeUnivDetails.courses.map((course, idx) => (
                      <span key={idx} className="bg-slate-50 border border-[#E5E7EB] text-xs px-2.5 py-1 rounded-lg text-slate-700">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-wider text-[#6B7280] uppercase font-bold font-sans">International Accreditation</h4>
                  <div className="space-y-1.5">
                    {activeUnivDetails.accreditation.map((acc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#111827]">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono tracking-wider text-[#6B7280] uppercase font-bold font-sans">Premium Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#111827]">
                  {activeUnivDetails.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E5E7EB]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer action */}
            <div className="p-4 bg-slate-50 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveUnivDetails(null)}
                className="px-4 py-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
              >
                Close Back
              </button>
              <button
                onClick={() => {
                  onApplyForUniversity(activeUnivDetails.name, activeUnivDetails.country);
                  setActiveUnivDetails(null);
                }}
                className="px-5 py-2.5 text-xs font-bold bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg cursor-pointer animate-none"
              >
                Apply for {activeUnivDetails.name}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
