import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Search 
} from "lucide-react";

export default function Footer({ onNavClick }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id) => {
    if (onNavClick) {
      onNavClick(id);
    }
  };

  return (
    <footer 
      id="main-footer" 
      className="bg-[#060913] text-slate-300 pt-16 pb-12 border-t border-slate-900 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* COLUMN 1: Logo, Description & Social Icons */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-start pr-4">
            
            {/* Logo box matching header style */}
            <div 
              onClick={() => handleLinkClick("hero")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-10.5 h-10.5 flex items-center justify-center bg-[#244391] rounded-full border border-white/10 shrink-0">
                <Search className="h-5.5 w-5.5 text-white stroke-[2.5px]" />
                <div className="absolute inset-0 flex items-center justify-center pb-0.5">
                  <GraduationCap className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-white/95 uppercase tracking-widest leading-none">
                  EXPLORE
                </span>
                <span className="text-15 font-black text-white leading-tight tracking-tight mt-0.5">
                  My University
                </span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-sm text-left">
              Explore My University is a search engine for students who wants to pursue higher education from Abroad in different courses.
            </p>

            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#244391] text-white flex items-center justify-center transition-all duration-200 border border-white/5"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-orange-400 text-white flex items-center justify-center transition-all duration-200 border border-white/5"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 border border-white/5"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#244391] text-white flex items-center justify-center transition-all duration-200 border border-white/5"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* COLUMN 2: MAIN NAVIGATION */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5 font-sans">
              MAIN NAVIGATION
            </h4>
            <ul className="space-y-3.5 text-[13px] text-slate-400">
              <li>
                <button 
                  onClick={() => handleLinkClick("hero")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("why-us")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("universities")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Universities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("universities")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("contact")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: INFORMATION FOR */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5 font-sans">
              INFORMATION FOR
            </h4>
            <ul className="space-y-3.5 text-[13px] text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => handleLinkClick("faqs")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("faqs")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("scholarships")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Videos
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: QUICK LINKS */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5 font-sans">
              QUICK LINKS
            </h4>
            <ul className="space-y-3.5 text-[13px] text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => handleLinkClick("contact")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Free Consultation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("why-us")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  How To Apply
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("contact")} 
                  className="hover:text-blue-400 text-slate-400 font-medium transition-colors cursor-pointer"
                >
                  Application Form
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: CONTACT US */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5 font-sans">
              CONTACT US
            </h4>
            
            <div className="space-y-4 text-[13px] text-slate-400 font-sans">
              
              {/* Address Noida */}
              <div className="flex items-start gap-2 max-w-[210px]">
                <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  22nd Floor, Unit 2240, Tower-A, Bhutani Alphathum, Sector 90, Noida
                </span>
              </div>

              {/* Address Raipur */}
              <div className="flex items-start gap-2 max-w-[210px]">
                <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  425 4th floor Golden Trade Center, New Rajendra Nagar Raipur (C.G) - 492001
                </span>
              </div>

              {/* Phone contact */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <a href="tel:+919993336778" className="hover:text-white transition-colors">
                  +91-9993336778
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Credit & Disclaimer Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500 gap-4">
          <span className="font-mono">
            &copy; {currentYear} Explore My University. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer select-none">Privacy Policy</span>
            <span className="hover:text-slate-400">|</span>
            <span className="hover:text-white cursor-pointer select-none">Terms &amp; Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
