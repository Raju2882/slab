import React, { useState } from "react";
import axios from "axios";
import { 
  Loader2, 
  CheckCircle2, 
  Award, 
  CreditCard, 
  Plane, 
  ShieldCheck,
  ChevronDown 
} from "lucide-react";

interface ContactFormProps {
  onInquirySubmitted?: () => void;
  idPrefix: string;
}

export default function ContactForm({ onInquirySubmitted, idPrefix }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredCourse: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const courses = [
    "MBBS Abroad",
    "B.Tech Engineering",
    "General Medicine",
    "Aviation Studies",
    "Business Management",
    "Dentistry"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.fullName || !formData.email || !formData.phone || !formData.preferredCourse) {
      setError("Please fill out all mandatory fields.");
      setLoading(false);
      return;
    }

    try {
      // Send data to the real backend endpoint
      const response = await axios.post("/api/public/leads", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredCourse: formData.preferredCourse,
        selectedCountry: "Russia", // Default to Russia
        message: "Requested Free Session Counselling"
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredCourse: ""
        });
        if (onInquirySubmitted) {
          onInquirySubmitted();
        }
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      console.error("Inquiry form submission failure:", err);
      setError(err.response?.data?.error || "Connection failed. Please review your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* LEFT COLUMN: USP Text & Grid benefits */}
      <div className="lg:col-span-7 text-left space-y-8">
        
        {/* Active Badge Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#fa4d2c] animate-pulse" />
          <span>ADMISSION OPEN FOR 2026 BATCH</span>
        </div>

        {/* Title Content */}
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black font-sans text-[#111827] tracking-tight leading-tight">
          Your Path to a <span className="text-[#2563EB]">Global Medical Career</span> Starts Here
        </h2>

        {/* Description Body */}
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl font-medium">
          Join 5,000+ students who have successfully launched their medical careers through our expert guidance and end-to-end support.
        </p>

        {/* Bullet Grid Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          
          {/* Card 1: NMC APPROVED */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_25px_rgba(37,99,235,0.015)] hover:border-[#2563EB]/25 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#111827] tracking-wide uppercase leading-tight">
                NMC &amp; WHO APPROVED
              </h4>
              <p className="text-xs text-[#6B7280] leading-snug font-medium">
                Top-tier universities recognized globally by medical councils.
              </p>
            </div>
          </div>

          {/* Card 2: DIRECT PAYMENT */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_25px_rgba(37,99,235,0.015)] hover:border-[#2563EB]/25 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#111827] tracking-wide uppercase leading-tight">
                DIRECT FEE PAYMENT
              </h4>
              <p className="text-xs text-[#6B7280] leading-snug font-medium">
                Safe and transparent transactions directly to university accounts.
              </p>
            </div>
          </div>

          {/* Card 3: VISA MASTERY */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_25px_rgba(37,99,235,0.015)] hover:border-[#2563EB]/25 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#2563EB] shrink-0">
              <Plane className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#111827] tracking-wide uppercase leading-tight">
                VISA MASTERY
              </h4>
              <p className="text-xs text-[#6B7280] leading-snug font-medium">
                100% success rate with complete documentation support.
              </p>
            </div>
          </div>

          {/* Card 4: LOCAL GUARDIANSHIP */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_25px_rgba(37,99,235,0.015)] hover:border-[#2563EB]/25 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[#111827] tracking-wide uppercase leading-tight">
                LOCAL GUARDIANSHIP
              </h4>
              <p className="text-xs text-[#6B7280] leading-snug font-medium">
                Personalized support for Indian students in Russia.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: The White Counseling Form Card Container */}
      <div className="lg:col-span-5 relative">
        <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-[0_10px_45px_rgba(0,0,0,0.04)] relative overflow-hidden text-slate-800">
          
          <div className="space-y-1.5 pb-6 text-left">
            <h3 className="text-[25px] font-black text-slate-900 tracking-tight leading-tight">
              Get Free Counselling
            </h3>
            <p className="text-[12px] text-slate-400 font-medium leading-relaxed font-sans">
              Fill below details to get a call from expert career counsellor
            </p>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[16px] text-slate-800">Booking Complete!</h4>
                <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                  Thank you for registering. An expert academic counselor will call you within the next 24 business hours.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-[#1b56db] hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Submit New Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-semibold">
                  {error}
                </div>
              )}

              {/* Form Input: Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 font-sans tracking-wide">
                  <span className="text-red-500 mr-1">*</span>Name
                </label>
                <input 
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full text-[13px] py-2.5 px-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {/* Form Input: Phone with Flag prefix */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 font-sans tracking-wide">
                  <span className="text-red-500 mr-1">*</span>Phone
                </label>
                
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/25 transition-all">
                  {/* Country visual flag select match */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 border-r border-slate-200 text-slate-700 text-[13px] font-bold select-none cursor-pointer">
                    <span className="text-base leading-none">🇮🇳</span>
                    <span>+91</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <input 
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="81234 56789"
                    className="w-full text-[13px] py-2.5 px-4 bg-white text-slate-850 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Input: Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 font-sans tracking-wide">
                  <span className="text-red-500 mr-1">*</span>Email Address
                </label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full text-[13px] py-2.5 px-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {/* Form Input: Course Select Choice */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 font-sans tracking-wide">
                  <span className="text-red-500 mr-1">*</span>Course
                </label>
                <div className="relative">
                  <select 
                    name="preferredCourse"
                    required
                    value={formData.preferredCourse}
                    onChange={handleChange}
                    className="w-full text-[13px] py-2.5 pl-4 pr-10 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/25 transition-all appearance-none cursor-pointer font-sans"
                  >
                    <option value="" className="text-slate-400">Select course</option>
                    {courses.map((item) => (
                      <option key={item} value={item} className="text-slate-800">
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 px-6 bg-[#1b56db] hover:bg-blue-700 text-white font-extrabold text-[13px] uppercase tracking-wider rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>BOOK FREE COUNSELLING</span>
                )}
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  );
}
