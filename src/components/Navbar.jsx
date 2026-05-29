import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Phone, 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  ShieldAlert, 
  UserCheck,
  ChevronRight,
  FileText,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Laptop
} from "lucide-react";

export default function Navbar({ onAdminClick, isAdminLoggedIn, onLogout, onNavClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Monitor scroll positioning
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "why-us" },
    { 
      label: "Courses", 
      id: "universities", 
      dropdown: ["MBBS Abroad", "B.Tech Engineering", "General Medicine", "Aviation Studies", "Business Management"]
    },
    { 
      label: "University", 
      id: "universities", 
      dropdown: ["Universities in Russia", "Universities in Georgia", "Universities in Philippines", "Universities in Kazakhstan", "Universities in Kyrgyzstan"]
    },
    { label: "Blog", id: "testimonials" },
    { label: "Videos", id: "admissions" },
    { label: "Contact", id: "contact" }
  ];

  const handleNavItemClick = (id) => {
    if (onNavClick) {
      onNavClick(id);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (id, detail) => {
    if (onNavClick) {
      onNavClick(id);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Auto-fill inquiry fields if elements exist on page
    setTimeout(() => {
      const fieldInput = document.getElementById("contact-message-input") || document.getElementById("search-input");
      if (fieldInput) {
        fieldInput.value = `Hello! I would love to check eligibility requirements, syllabus catalogs, and application cycles for: ${detail}.`;
        const ev = new Event("input", { bubbles: true });
        fieldInput.dispatchEvent(ev);
      }
    }, 450);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
          isScrolled 
            ? "shadow-lg shadow-black/5" 
            : ""
        }`}
      >
        {/* -- TIER 1: Metadata Top Bar (collapses smoothly on scroll) -- */}
        <div 
          className={`bg-[#0a0f1d] border-b border-white/5 overflow-hidden transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0" : "h-[38px] opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-300 select-none">
            {/* Left side actions */}
            <div className="hidden sm:flex items-center gap-4">
              <button 
                onClick={() => handleNavItemClick("contact")}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-[11px] font-semibold cursor-pointer whitespace-nowrap"
              >
                <Phone className="h-3 w-3 text-amber-400 fill-amber-400/20 shrink-0" />
                <span>Request a call back</span>
              </button>
              
              <span className="text-white/10">|</span>
              
              <button 
                onClick={() => handleNavItemClick("contact")}
                className="flex items-center gap-1.5 hover:text-[#fa4c2c] transition-colors text-[11px] font-semibold cursor-pointer whitespace-nowrap"
              >
                <FileText className="h-3 w-3 text-slate-200 shrink-0" />
                <span>Apply Online</span>
              </button>
            </div>

            {/* Right side details */}
            <div className="flex items-center gap-3 sm:gap-5 ml-auto sm:ml-0">
              <span className="hidden md:inline-block text-[11px] font-medium text-slate-400 whitespace-nowrap">
                Live Counselling
              </span>
              
              <a 
                href="tel:+919993336778" 
                className="flex items-center gap-1.5 hover:text-white transition-colors text-[11px] font-bold whitespace-nowrap"
              >
                <Phone className="h-3 w-3 shrink-0" />
                <span>+91 9993336778</span>
              </a>

              {/* WhatsApp direct portal */}
              <a 
                href="https://wa.me/919993336778"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba56] text-white text-[10px] font-black uppercase tracking-wider rounded-full transition-all shadow-sm active:scale-95 shrink-0 whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current text-white inline shrink-0">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.177 3.464L6.5 20.5l5.228-1.371c.915.545 1.986.858 3.134.858 3.181 0 5.767-2.586 5.768-5.766 0-3.181-2.585-5.766-5.768-5.766zm3.921 8.232c-.156.442-.777.838-1.21 1.01-.397.159-.913.292-2.483-.359-2.008-.832-3.3-2.883-3.4-3.017-.1-.134-.813-.1.173a.81.81 0 011.134.25c.148.2.296.4.408.625.074.151.037.332-.037.483l-.333.673c-.112.226-.037.45.074.625.321.498.71 1.066 1.341 1.626.812.723 1.494.945 1.705 1.05.21.107.333.091.458-.041.125-.132.533-.625.683-.837.151-.212.3-.18.5-.106.2.074 1.258.591 1.474.698.217.106.363.159.416.25a1.111 1.111 0 01-.156.76z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* -- TIER 2: Main Branding Row -- */}
        <div 
          className={`w-full transition-all duration-300 ${
            isScrolled 
              ? "bg-white border-b border-slate-200/80 h-[82px]" 
              : "bg-transparent h-[88px]"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full flex items-stretch justify-between pl-0 pr-4 sm:pr-6 lg:pr-8">
            
            {/* LEFT: Complete full-height branding container styled block */}
            <div 
              onClick={() => handleNavItemClick("hero")}
              className="h-full bg-[#244391] px-4 sm:px-5 lg:px-6 flex items-center gap-2 sm:gap-3 cursor-pointer select-none transition-colors duration-300 hover:bg-[#1a3272] shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[2px] sm:border-[2.5px] border-white flex items-center justify-center shrink-0 shadow-inner">
                {/* Custom inner magnifying glass wrapping a cap */}
                <GraduationCap className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-white stroke-[2.2px]" />
                <div className="absolute -bottom-[2px] -left-[2px] w-2.5 h-1.5 bg-white rotate-[135deg] rounded-full" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[9px] sm:text-[10px] font-black text-white/80 uppercase tracking-[0.25em] leading-none font-mono">
                  EXPLORE
                </span>
                <span className="text-[14px] sm:text-[16px] font-extrabold text-white leading-tight tracking-tight mt-0.5 whitespace-nowrap">
                  My University
                </span>
              </div>
            </div>

            {/* CENTER: Grid aligned links with elegant spacings */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 shrink">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative py-7"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavItemClick(item.id)}
                    className={`px-1.5 xl:px-2.5 py-1.5 text-xs xl:text-[13px] 2xl:text-[14px] font-bold tracking-tight rounded-lg transition-all duration-200 flex items-center gap-0.5 xl:gap-1 cursor-pointer whitespace-nowrap ${
                      isScrolled 
                        ? "text-slate-700 hover:text-[#244391] hover:bg-slate-50" 
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-3 w-3 xl:h-3.5 xl:w-3.5 opacity-80 transition-transform ${
                        activeDropdown === item.label ? "rotate-180 text-[#244391]" : ""
                      }`} />
                    )}
                  </button>

                  {/* High quality shadow dropdown panel */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] bg-white border border-slate-100 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] py-2 mt-1.5 z-50 origin-top"
                      >
                        {/* Little triangle arrow indicator */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 bg-white border-t border-l border-slate-100 rotate-45" />
                        
                        <div className="relative z-10 w-full">
                          {item.dropdown.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleDropdownItemClick(item.id, sub)}
                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-[#244391] hover:bg-blue-50/50 transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span className="truncate">{sub}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* RIGHT: High conversion premium CTAs */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 shrink-0">
              
              {/* Button A: Free Consultation (Outline styled) */}
              <button
                onClick={() => handleNavItemClick("contact")}
                className={`hidden xl:inline-block px-3 py-2 xl:px-4 xl:py-2.5 2xl:px-5 text-xs xl:text-[13px] font-bold rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer whitespace-nowrap ${
                  isScrolled 
                    ? "border-[#244391] text-[#244391] hover:bg-[#244391] hover:text-white" 
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                Free Consultation
              </button>

              {/* Button B: Special red-orange sunset action CTA */}
              <button
                onClick={() => handleNavItemClick("contact")}
                className="px-3.5 py-2 lg:px-4 lg:py-2.5 xl:px-6 xl:py-2.5 text-xs xl:text-[13px] font-black text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center gap-1.5 xl:gap-2 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md shadow-orange-500/10 active:scale-95 transform cursor-pointer whitespace-nowrap"
              >
                <span>Application Form 2026-27</span>
                <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 stroke-[2.5px] shrink-0" />
              </button>

              {/* Secure portal gate */}
              <div className={`border-l pl-2 xl:pl-3 flex items-center ${isScrolled ? "border-slate-200" : "border-white/10"}`}>
                {isAdminLoggedIn ? (
                  <button
                    onClick={onAdminClick}
                    title="Developer console key active"
                    className="p-1.5 sm:p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-150 transition-colors shrink-0"
                  >
                    <UserCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                ) : (
                  <button
                    onClick={onAdminClick}
                    title="Administrative dashboard link"
                    className={`p-1.5 sm:p-2 rounded-full transition-colors shrink-0 ${
                      isScrolled ? "text-slate-300 hover:text-slate-500 hover:bg-slate-50" : "text-white/20 hover:text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* MOBILE INTERACTIVE Hamburger toggle */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-3 shrink-0">
              {isAdminLoggedIn ? (
                <button
                  onClick={onAdminClick}
                  className="flex items-center gap-1 py-1 px-2.5 sm:px-3 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full cursor-pointer shadow-sm whitespace-nowrap shrink-0"
                >
                  <UserCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>Admin</span>
                </button>
              ) : null}
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isScrolled 
                    ? "text-slate-800 bg-slate-50 hover:bg-slate-100 border-slate-200" 
                    : "text-white bg-white/5 hover:bg-white/10 border-white/10"
                }`}
                aria-label="Toggle Side Drawer"
              >
                <Menu className="h-5.5 w-5.5 stroke-[2.5px]" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAVIGATION SIDE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm lg:hidden flex justify-end"
          >
            {/* Backdrop close */}
            <div className="absolute inset-0" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Sliding Drawer Canvas container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Mobile Drawer Top Banner */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8.5 h-8.5 rounded-full bg-[#244391] flex items-center justify-center shadow-md">
                      <GraduationCap className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="font-extrabold text-slate-950 font-sans tracking-tight text-sm">Explore My University</span>
                  </div>
                  
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Staggered Navigation Items */}
                <div className="space-y-1">
                  {navItems.map((item, idx) => {
                    const isDropdownActive = activeDropdown === item.label;
                    return (
                      <div key={idx} className="border-b border-slate-50 pb-1.5 last:border-0">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleNavItemClick(item.id)}
                            className="text-left font-sans text-sm font-extrabold text-slate-800 hover:text-[#244391] py-2 w-full"
                          >
                            {item.label}
                          </button>
                          
                          {item.dropdown && (
                            <button
                              onClick={() => setActiveDropdown(isDropdownActive ? null : item.label)}
                              className="p-2 text-slate-400 hover:text-[#244391]"
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownActive ? "rotate-180 text-[#244391]" : ""}`} />
                            </button>
                          )}
                        </div>

                        {/* Child sub-items */}
                        {item.dropdown && isDropdownActive && (
                          <div className="pl-3 pr-2 py-2 space-y-2.5 bg-slate-50 rounded-xl mt-1">
                            {item.dropdown.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleDropdownItemClick(item.id, sub)}
                                className="w-full text-left py-1 text-xs font-bold text-slate-600 hover:text-[#244391] flex items-center gap-2 cursor-pointer"
                              >
                                <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                                <span className="truncate">{sub}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Contents */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Inquiry Helpline Desk</span>
                  
                  <div className="flex items-center gap-2">
                    <a 
                      href="https://wa.me/919993336778" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1.5"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current text-[#25D366] inline">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.177 3.464L6.5 20.5l5.228-1.371c.915.545 1.986.858 3.134.858 3.181 0 5.767-2.586 5.768-5.766 0-3.181-2.585-5.766-5.768-5.766zm3.921 8.232c-.156.442-.777.838-1.21 1.01-.397.159-.913.292-2.483-.359-2.008-.832-3.3-2.883-3.4-3.017-.1-.134-.813-.1.173a.81.81 0 011.134.25c.148.2.296.4.408.625.074.151.037.332-.037.483l-.333.673c-.112.226-.037.45.074.625.321.498.71 1.066 1.341 1.626.812.723 1.494.945 1.705 1.05.21.107.333.091.458-.041.125-.132.533-.625.683-.837.151-.212.3-.18.5-.106.2.074 1.258.591 1.474.698.217.106.363.159.416.25a1.111 1.111 0 01-.156.76z" />
                      </svg>
                      <span>Connect on WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                    <Phone className="h-3.5 w-3.5 text-[#244391]" />
                    <a href="tel:+919993336778" className="hover:underline">+91 9993336778</a>
                  </div>
                </div>

                {/* Primary CTA Bottom button */}
                <button
                  onClick={() => handleNavItemClick("contact")}
                  className="w-full py-3.5 text-center bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply Now 2026-27</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Quick sessions logic */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 select-none">
                  <span>Counseling Verification ID</span>
                  {isAdminLoggedIn ? (
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      Logout Session
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        onAdminClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="font-bold text-[#244391] hover:underline cursor-pointer"
                    >
                      Admin Sign In
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
