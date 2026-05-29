import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Stats from "./components/StatisticsSection";
import FeaturedUniversities from "./components/FeaturedUniversities";
import WhyChooseUs from "./components/WhyChooseUs";
import AdmissionProcess from "./components/AdmissionProcess";
import Scholarships from "./components/Scholarships";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Sparkles, GraduationCap, MapPin, Mail, PhoneCall } from "lucide-react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>("");

  // A stateful trigger that we bump when admin does CRUD updates
  // to force the child components (FeaturedUnivs, Scholarships, Testimonials) to query fresh listings instantly!
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check for cached administrator token session
    const cachedToken = localStorage.getItem("admin_token");
    const cachedName = localStorage.getItem("admin_name");
    if (cachedToken) {
      setAdminToken(cachedToken);
      if (cachedName) setAdminName(cachedName);
    }
  }, []);

  const handleLoginSuccess = (token: string, name: string) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_name", name);
    setAdminToken(token);
    setAdminName(name);
    setIsAdminOpen(true);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    setAdminToken(null);
    setAdminName("");
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRefreshSignal = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Smooth Navigation Anchor Jumper
  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Context-linking Apply Pathway Callbacks
  const handleApplyForUniversity = (univName: string, countryName: string) => {
    // Smooth jump to bottom lead form
    handleNavClick("contact");

    // Dynamic field injection sequence
    setTimeout(() => {
      const countrySel = document.getElementById("contact-country-select") as HTMLSelectElement;
      const nameInp = document.getElementById("contact-message-input") as HTMLTextAreaElement;
      const courseSel = document.getElementById("contact-course-select") as HTMLSelectElement;

      if (countrySel) {
        countrySel.value = countryName;
        // Trigger synthetic react change event
        const event = new Event("change", { bubbles: true });
        countrySel.dispatchEvent(event);
      }
      if (courseSel) {
        // Default to MBBS as standard indicator or match general Medicine
        const lowerName = univName.toLowerCase();
        if (lowerName.includes("medical") || lowerName.includes("medicine")) {
          courseSel.value = "General Medicine";
        } else if (lowerName.includes("computer") || lowerName.includes("tech")) {
          courseSel.value = "B.Tech Computer Science";
        } else {
          courseSel.value = "MBBS";
        }
        const event = new Event("change", { bubbles: true });
        courseSel.dispatchEvent(event);
      }
      if (nameInp) {
        nameInp.value = `I am highly interested in securing state admission at ${univName} (${countryName}). Please share fee checklists and NEET verification forms.`;
        const event = new Event("input", { bubbles: true });
        nameInp.dispatchEvent(event);
      }
    }, 400);
  };

  const handleApplyForScholarship = (scholarshipName: string, universityName?: string) => {
    handleNavClick("contact");

    setTimeout(() => {
      const nameInp = document.getElementById("contact-message-input") as HTMLTextAreaElement;
      if (nameInp) {
        nameInp.value = `I wish to apply for the "${scholarshipName}" fellowship scheme ${universityName ? `at ${universityName}` : ""}. Kindly review my academic history and bioscience GPA marks for grant eligibility.`;
        const event = new Event("input", { bubbles: true });
        nameInp.dispatchEvent(event);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans antialiased text-slate-100">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <Navbar 
        onAdminClick={() => setIsAdminOpen(true)}
        isAdminLoggedIn={!!adminToken}
        onLogout={handleLogout}
        onNavClick={handleNavClick}
      />

      {/* 2. HERO SECTION WITH CTA DIRECT REGISTRAR */}
      <Hero 
        onScrollToSection={handleNavClick}
        onInquirySubmitted={handleRefreshSignal}
      />

      {/* 3. STATISTICS SECTION */}
      <Stats />

      {/* 4. FEATURED UNIVERSITIES SEGMENT */}
      <FeaturedUniversities 
        onApplyForUniversity={handleApplyForUniversity}
        refreshTrigger={refreshTrigger}
      />

      {/* 5. WHY CHOOSE US BENEFITS PANEL */}
      <WhyChooseUs />

      {/* 6. ADMISSION PROCESS WORKFLOW STEPPER */}
      <AdmissionProcess />

      {/* 7. SCHOLARSHIP OPPORTUNITIES SEGMENT */}
      <Scholarships 
        onApplyForScholarship={handleApplyForScholarship}
        refreshTrigger={refreshTrigger}
      />

      {/* 8. TESTIMONIALS LEDGER FEEDBACK */}
      <Testimonials refreshTrigger={refreshTrigger} />

      {/* 9. FAQ ACCORDION */}
      <FAQ />

      {/* 10. CONTACT FORM SECTION */}
      <section 
        id="contact" 
        className="relative py-24 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden"
      >
        {/* Background ambient glowing shapes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ContactForm 
            onInquirySubmitted={handleRefreshSignal} 
            idPrefix="contact" 
          />
        </div>
      </section>

      {/* 11. FOOTER SEGMENT */}
      <Footer onNavClick={handleNavClick} />

      {/* FULL ADMIN INTERACTIVE CONSOLE DRAWER */}
      {isAdminOpen && (
        <AdminPanel 
          onClose={() => setIsAdminOpen(false)}
          token={adminToken}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onRefreshDataSignal={handleRefreshSignal}
        />
      )}

    </div>
  );
}
