import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Users, Landmark, Award, ShieldAlert, Lock, LogIn, ChevronRight, CheckCircle2,
  AlertTriangle, RefreshCw, Trash2, Plus, Edit3, X, Eye, FileText, Check, DollarSign,
  UserCheck, ShieldCheck, PieChart, TrendingUp, HelpCircle
} from "lucide-react";
import { University, Scholarship, Testimonial, ContactLead } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  token: string | null;
  onLoginSuccess: (token: string, userName: string) => void;
  onLogout: () => void;
  onRefreshDataSignal: () => void;
}

export default function AdminPanel({ 
  onClose, 
  token, 
  onLoginSuccess, 
  onLogout,
  onRefreshDataSignal 
}: AdminPanelProps) {
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Administrative Section Routing
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'universities' | 'scholarships' | 'testimonials'>('dashboard');

  // Backend state
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  // Operations busy states
  const [loadingContent, setLoadingContent] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ text: "", type: "success" });

  // Creation Modals Modal triggers
  const [editingUniversity, setEditingUniversity] = useState<Partial<University> | null>(null);
  const [editingScholarship, setEditingScholarship] = useState<Partial<Scholarship> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  useEffect(() => {
    if (token) {
      loadAdminPayloads();
    }
  }, [token, activeTab]);

  const loadAdminPayloads = async () => {
    setLoadingContent(true);
    setFeedbackMsg({ text: "", type: "success" });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      if (activeTab === 'dashboard') {
        const res = await axios.get("/api/admin/stats", config);
        setAnalytics(res.data);
      } else if (activeTab === 'leads') {
        const res = await axios.get("/api/admin/leads", config);
        setLeads(res.data);
      } else if (activeTab === 'universities') {
        const res = await axios.get("/api/public/universities");
        setUniversities(res.data);
      } else if (activeTab === 'scholarships') {
        const res = await axios.get("/api/public/scholarships");
        setScholarships(res.data);
      } else if (activeTab === 'testimonials') {
        const res = await axios.get("/api/public/testimonials");
        setTestimonials(res.data);
      }
    } catch (err: any) {
      console.error("Failure loading admin data modules:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        onLogout();
        setLoginError("Session expired. Please log in again.");
      } else {
        setFeedbackMsg({ text: "Unable to sync with master backend database.", type: "error" });
      }
    } finally {
      setLoadingContent(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please enter academic email and security passcode.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      onLoginSuccess(response.data.token, response.data.user.name);
    } catch (err: any) {
      console.error("Admin portal login rejection:", err);
      setLoginError(err.response?.data?.error || "Connection failed. Please retry.");
    } finally {
      setLoginLoading(false);
    }
  };

  // ----------------------------------------------------
  // LEAD INTERACTIONS ACTIONS
  // ----------------------------------------------------
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.put(`/api/admin/leads/${leadId}`, { status: newStatus }, config);
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus as any } : l));
      setFeedbackMsg({ text: "Student inquiry workflow updated.", type: "success" });
    } catch (err) {
      console.error("Failed to alter lead status:", err);
      setFeedbackMsg({ text: "Could not alter lead criteria.", type: "error" });
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Delete this student lead inquiry permanently?")) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`/api/admin/leads/${leadId}`, config);
      setLeads(leads.filter(l => l.id !== leadId));
      onRefreshDataSignal();
      setFeedbackMsg({ text: "Lead entry cleared successfully.", type: "success" });
    } catch (err) {
      console.error("Lead cleanup failure:", err);
      setFeedbackMsg({ text: "Could not delete lead record.", type: "error" });
    }
  };

  // ----------------------------------------------------
  // UNIVERSITY ACTIONS
  // ----------------------------------------------------
  const handleSaveUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUniversity) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (editingUniversity.id) {
        // Edit existing
        const res = await axios.put(`/api/admin/universities/${editingUniversity.id}`, editingUniversity, config);
        setUniversities(universities.map(u => u.id === editingUniversity.id ? res.data : u));
        setFeedbackMsg({ text: "University profile altered successfully.", type: "success" });
      } else {
        // Create new
        const res = await axios.post("/api/admin/universities", editingUniversity, config);
        setUniversities([...universities, res.data]);
        setFeedbackMsg({ text: "New state university profile registered.", type: "success" });
      }
      setEditingUniversity(null);
      onRefreshDataSignal();
    } catch (err) {
      console.error("University persistence failures:", err);
      setFeedbackMsg({ text: "Could not persist university changes.", type: "error" });
    }
  };

  const handleDeleteUniversity = async (id: string) => {
    if (!confirm("Delete university profile permanently?")) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`/api/admin/universities/${id}`, config);
      setUniversities(universities.filter(u => u.id !== id));
      onRefreshDataSignal();
      setFeedbackMsg({ text: "University profiles released.", type: "success" });
    } catch (err) {
      console.error("University delete failure:", err);
      setFeedbackMsg({ text: "Could not delete university.", type: "error" });
    }
  };

  // ----------------------------------------------------
  // SCHOLARSHIP ACTIONS
  // ----------------------------------------------------
  const handleSaveScholarship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScholarship) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (editingScholarship.id) {
        const res = await axios.put(`/api/admin/scholarships/${editingScholarship.id}`, editingScholarship, config);
        setScholarships(scholarships.map(s => s.id === editingScholarship.id ? res.data : s));
        setFeedbackMsg({ text: "Scholarship altered.", type: "success" });
      } else {
        const res = await axios.post("/api/admin/scholarships", editingScholarship, config);
        setScholarships([...scholarships, res.data]);
        setFeedbackMsg({ text: "New scholarship scheme launched.", type: "success" });
      }
      setEditingScholarship(null);
      onRefreshDataSignal();
    } catch (err) {
      console.error("Scholarship save error:", err);
      setFeedbackMsg({ text: "Failed to persist scholarship conditions.", type: "error" });
    }
  };

  const handleDeleteScholarship = async (id: string) => {
    if (!confirm("Are you positive you wish to remove this scholarship?")) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`/api/admin/scholarships/${id}`, config);
      setScholarships(scholarships.filter(s => s.id !== id));
      onRefreshDataSignal();
      setFeedbackMsg({ text: "Scholarship entry deleted.", type: "success" });
    } catch (err) {
      console.error("Failed to discard scholarship:", err);
      setFeedbackMsg({ text: "Failure discarding scholarship record.", type: "error" });
    }
  };

  // ----------------------------------------------------
  // TESTIMONIAL ACTIONS
  // ----------------------------------------------------
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (editingTestimonial.id) {
        const res = await axios.put(`/api/admin/testimonials/${editingTestimonial.id}`, editingTestimonial, config);
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? res.data : t));
        setFeedbackMsg({ text: "Student testimonial record modernized.", type: "success" });
      } else {
        const res = await axios.post("/api/admin/testimonials", editingTestimonial, config);
        setTestimonials([...testimonials, res.data]);
        setFeedbackMsg({ text: "New success story mounted.", type: "success" });
      }
      setEditingTestimonial(null);
      onRefreshDataSignal();
    } catch (err) {
      console.error("Testimonial save error:", err);
      setFeedbackMsg({ text: "Testimonial filing failed.", type: "error" });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Abolish student review entry?")) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`/api/admin/testimonials/${id}`, config);
      setTestimonials(testimonials.filter(t => t.id !== id));
      onRefreshDataSignal();
      setFeedbackMsg({ text: "Student review discarded.", type: "success" });
    } catch (err) {
      console.error("Feedback cleanup fault:", err);
      setFeedbackMsg({ text: "Unable to wipe student entry.", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 md:p-10 flex justify-center">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-7xl flex flex-col overflow-hidden shadow-2xl h-[90vh]">
        
        {/* TOP STATUS CONTROL BAR */}
        <div className="px-6 py-5 bg-slate-950 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 text-slate-950 rounded-xl">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display font-medium text-white text-base">Elite Access Terminal</h1>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {token ? "SECURED LOGGED SESSION" : "ACCESS GATEWAY REQUIREMENT"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {token && (
              <button 
                onClick={onLogout}
                className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                Terminate Session
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1 px-3 text-xs border border-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Exit Console
            </button>
          </div>
        </div>

        {/* NOT LOGGED INDEX GATEWAY SCREEN */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
            <div className="w-full max-w-md p-8 rounded-2xl glass-panel border-white/10 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-yellow-400" />
                </div>
                <h2 className="text-xl font-display font-bold text-white">Administrator Credentials</h2>
                <p className="text-xs text-slate-400">
                  Enter authorized email and passcode to manage partner listings, inquiries and analytics.
                </p>
              </div>

              {loginError && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Guide credentials helper to make testing easy */}
              <div className="p-3.5 bg-yellow-400/5 border border-yellow-400/20 rounded-xl text-yellow-400 text-xs font-mono space-y-1">
                <span className="font-bold uppercase tracking-wider block">Authorized Demo Login:</span>
                <div>Email: <strong className="text-white">admin@exploreuniversity.com</strong></div>
                <div>Passcode: <strong className="text-white">admin123</strong></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-1">Passcode Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@exploreuniversity.com"
                    className="w-full py-2.5 px-3.5 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-1">Security Code</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-2.5 px-3.5 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
                >
                  {loginLoading ? "Verifying..." : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Authenticate Terminal
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* MAIN ACTIVE MANAGEMENT LAYOUT SCREEN */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* LEFT NAVIGATION COLUMN */}
            <div className="w-full md:w-64 bg-slate-950 p-6 flex flex-col justify-between border-r border-white/5 space-y-6">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Operation Console</span>
                  <div className="h-px bg-white/5 mt-1.5" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === 'dashboard' ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Analytics Dashboard
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === 'leads' ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Students Leads
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => setActiveTab('universities')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === 'universities' ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       <Landmark className="h-4 w-4" />
                      Partner Academies
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => setActiveTab('scholarships')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === 'scholarships' ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Grants &amp; Scholarships
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === 'testimonials' ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Graduate Feedbacks
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Status footer inside menu */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Terminal Online
                </span>
                <span className="block text-[9px] text-slate-500 font-mono">
                  Port: 3000 Ingress Secure
                </span>
              </div>
            </div>

            {/* MAIN DATA RENDERING CANVAS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/20">

              {/* Header Feedbacks */}
              {feedbackMsg.text && (
                <div className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
                  feedbackMsg.type === 'success' 
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : "bg-red-500/15 border-red-500/30 text-red-300"
                }`}>
                  <div className="flex items-center gap-2">
                    {feedbackMsg.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span>{feedbackMsg.text}</span>
                  </div>
                  <button onClick={() => setFeedbackMsg({ text: "", type: "success" })} className="text-slate-400 hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {loadingContent ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-2">
                  <RefreshCw className="h-6 w-6 animate-spin text-yellow-400" />
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase">Synchronizing Ledger...</span>
                </div>
              ) : (
                <>
                  {/* DASHBOARD TAB SEGMENT */}
                  {activeTab === 'dashboard' && analytics && (
                    <div className="space-y-8 animate-in fade-in duration-200">
                      
                      {/* Metric cards rows */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Accumulated Leads</span>
                          <span className="text-3xl font-display font-medium text-white block">{analytics.totalLeads}</span>
                          <span className="text-[10px] text-emerald-400 font-sans mt-0.5 block font-medium">✨ Real student admissions requests</span>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Active New Leads</span>
                          <span className="text-3xl font-display font-medium text-yellow-400 block">{analytics.newLeads}</span>
                          <span className="text-[10px] text-yellow-400/70 font-sans mt-0.5 block">Waiting initial callbacks</span>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Offered Academies</span>
                          <span className="text-3xl font-display font-medium text-white block">{analytics.totalUniversities}</span>
                          <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">NMC / WHO Registered State systems</span>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Waivers Listed</span>
                          <span className="text-3xl font-display font-medium text-white block">{analytics.totalScholarships}</span>
                          <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">Up to 100% tuition offsets</span>
                        </div>
                      </div>

                      {/* Customized In-House Data Visualizer */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Status analytics custom bar chart */}
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
                          <div className="flex items-center gap-2">
                            <PieChart className="h-4.5 w-4.5 text-yellow-400" />
                            <h3 className="text-sm font-semibold text-white">Student Inquiries Funnel Share</h3>
                          </div>
                          
                          <div className="space-y-4 pt-2">
                            {analytics.leadStatusData.map((d: any, idx: number) => {
                              const pct = analytics.totalLeads > 0 ? Math.round((d.value / analytics.totalLeads) * 100) : 0;
                              const colorsBucket = ["bg-yellow-500", "bg-sky-500", "bg-teal-500", "bg-emerald-500", "bg-red-500"];
                              const col = colorsBucket[idx % colorsBucket.length];
                              return (
                                <div key={idx} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-300">
                                    <span className="font-sans font-medium">{d.name} ({d.value})</span>
                                    <span className="font-mono">{pct}%</span>
                                  </div>
                                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className={`h-full ${col} rounded-full`} style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Recent submission ledger list */}
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4.5 w-4.5 text-yellow-400" />
                              <h3 className="text-sm font-semibold text-white">Latest Student Leads</h3>
                            </div>
                            <button 
                              onClick={() => { setActiveTab('leads'); }}
                              className="text-[10px] font-mono text-yellow-400 hover:underline uppercase"
                            >
                              Explore Ledger
                            </button>
                          </div>

                          <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2">
                            {leads.slice(0, 5).map((l, idx) => (
                              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                                <div>
                                  <strong className="text-slate-200 block">{l.fullName}</strong>
                                  <span className="text-slate-500 text-[10px] block">{l.preferredCourse} | {l.selectedCountry}</span>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 uppercase">
                                  {l.status}
                                </span>
                              </div>
                            ))}
                            {leads.length === 0 && (
                              <p className="text-center text-slate-500 text-xs py-8">No incoming lead entries filed.</p>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* STUDENTS LEADS GRID TAB SEGMENT */}
                  {activeTab === 'leads' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">Admissions Request Ledger</h2>
                        <span className="text-xs font-mono text-slate-400">{leads.length} Records Detected</span>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950 text-slate-400 font-mono">
                              <th className="p-4 uppercase tracking-wider font-semibold">Student Profiling</th>
                              <th className="p-4 uppercase tracking-wider font-semibold">Path Wish</th>
                              <th className="p-4 uppercase tracking-wider font-semibold">Comments / Message</th>
                              <th className="p-4 uppercase tracking-wider font-semibold">Current Pipeline Check</th>
                              <th className="p-4 uppercase tracking-wider font-semibold text-right">Delete</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300">
                            {leads.map((l) => (
                              <tr key={l.id} className="hover:bg-white/[0.01]">
                                <td className="p-4 space-y-1">
                                  <strong className="text-white text-sm block">{l.fullName}</strong>
                                  <span className="text-slate-400 block">{l.email}</span>
                                  <span className="text-slate-500 block font-mono">{l.phone}</span>
                                </td>
                                <td className="p-4">
                                  <span className="text-yellow-400 font-sans block font-semibold">{l.preferredCourse}</span>
                                  <span className="text-slate-400 text-[10px] uppercase block">{l.selectedCountry}</span>
                                </td>
                                <td className="p-4 max-w-xs">
                                  <p className="text-slate-400 italic line-clamp-2">{l.message || "(No auxiliary comment filed)"}</p>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <select
                                    value={l.status}
                                    onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                                    className="p-1 px-2.5 bg-slate-950 border border-white/10 rounded-lg text-xs font-semibold uppercase tracking-wider text-yellow-400 cursor-pointer"
                                  >
                                    <option value="New">New Contact</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Enrolled">Enrolled</option>
                                    <option value="Rejected">Rejected Case</option>
                                  </select>
                                </td>
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => handleDeleteLead(l.id)}
                                    className="p-2 border border-red-500/20 hover:border-red-500 rounded-lg text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {leads.length === 0 && (
                              <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                                  No student inquiries registered yet.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PARTNER UNIVERSITIES CRUD TAB SEGMENT */}
                  {activeTab === 'universities' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-base font-semibold text-white">State Partner Academies Listings</h2>
                          <p className="text-xs text-slate-400">Add, edit, or clean active university listings displayed on the home directory.</p>
                        </div>
                        <button
                          onClick={() => setEditingUniversity({
                            name: "", country: "", city: "", established: 1990, globalRank: 1000,
                            courses: ["MBBS"], tuitionFeePerYear: 4000, currency: "USD",
                            description: "", highlights: [], accreditation: ["WHO"]
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-lg"
                        >
                          <Plus className="h-4 w-4 text-slate-950" />
                          Launch New Academy Profile
                        </button>
                      </div>

                      {/* Form overlay modal for editing university */}
                      {editingUniversity && (
                        <div className="p-6 bg-slate-900 border border-yellow-400/30 rounded-2xl space-y-6 mb-6">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <h3 className="font-display font-medium text-white text-sm">
                              {editingUniversity.id ? `Adjust Academy Profile: ${editingUniversity.name}` : "Mount Brand New Partner Academy"}
                            </h3>
                            <button onClick={() => setEditingUniversity(null)} className="text-slate-400 hover:text-white">
                              <X className="h-4.5 w-4.5" />
                            </button>
                          </div>

                          <form onSubmit={handleSaveUniversity} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="text-slate-400 block mb-1">Academy Name *</label>
                              <input 
                                type="text" required 
                                value={editingUniversity.name || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, name: e.target.value})}
                                placeholder="State Medical Academy"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Accredited Country *</label>
                              <input 
                                type="text" required
                                value={editingUniversity.country || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, country: e.target.value})}
                                placeholder="Georgia"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">City Location *</label>
                              <input 
                                type="text" required
                                value={editingUniversity.city || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, city: e.target.value})}
                                placeholder="Tbilisi"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Year Established</label>
                              <input 
                                type="number" 
                                value={editingUniversity.established || 1990}
                                onChange={(e) => setEditingUniversity({...editingUniversity, established: Number(e.target.value)})}
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">QS Global Rank</label>
                              <input 
                                type="number"
                                value={editingUniversity.globalRank || 1000}
                                onChange={(e) => setEditingUniversity({...editingUniversity, globalRank: Number(e.target.value)})}
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Tuition Cost (USD/yr) *</label>
                              <input 
                                type="number" required
                                value={editingUniversity.tuitionFeePerYear || 3000}
                                onChange={(e) => setEditingUniversity({...editingUniversity, tuitionFeePerYear: Number(e.target.value)})}
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Cover Image Unsplash URL</label>
                              <input 
                                type="text"
                                value={editingUniversity.image || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, image: e.target.value})}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Core Courses (Comma Separated) *</label>
                              <input 
                                type="text" required
                                value={editingUniversity.courses?.join(", ") || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, courses: e.target.value.split(",").map(c => c.trim())})}
                                placeholder="MBBS, B.Tech, Dentistry"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-slate-400 block mb-1">Brief Descriptive Summary *</label>
                              <textarea 
                                required rows={2}
                                value={editingUniversity.description || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, description: e.target.value})}
                                placeholder="Provide brief summary about infrastructure levels, labs and ranking details..."
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white resize-none"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Highlights Bullets (Comma Separated)</label>
                              <input 
                                type="text"
                                value={editingUniversity.highlights?.join(", ") || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, highlights: e.target.value.split(",").map(h => h.trim())})}
                                placeholder="WHO approved curricula, State hostel support"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Accreditation Seals (Comma Separated)</label>
                              <input 
                                type="text"
                                value={editingUniversity.accreditation?.join(", ") || ""}
                                onChange={(e) => setEditingUniversity({...editingUniversity, accreditation: e.target.value.split(",").map(a => a.trim())})}
                                placeholder="WHO, NMC India, UNESCO"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>

                            <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-4">
                              <button 
                                type="button" onClick={() => setEditingUniversity(null)}
                                className="px-4 py-2 border border-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="px-5 py-2 bg-yellow-400 text-slate-950 font-bold rounded-lg cursor-pointer hover:bg-yellow-300"
                              >
                                Save Profile Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Display table of Universities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {universities.map((u) => (
                          <div key={u.id} className="p-5 rounded-2xl bg-slate-900 border border-white/5 space-y-4 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start gap-4">
                                <h3 className="font-semibold text-white tracking-wide text-sm">{u.name}</h3>
                                <span className="font-mono text-[10px] text-yellow-400 uppercase bg-yellow-400/5 px-2 py-0.5 rounded">
                                  {u.country}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-2">{u.description}</p>
                              <div className="text-[11px] text-slate-500 font-mono">
                                Annual Cost: <strong className="text-slate-300">${u.tuitionFeePerYear} USD</strong> | QS: #{u.globalRank || "N/A"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                              <button
                                onClick={() => setEditingUniversity(u)}
                                className="flex-1 py-1.5 bg-slate-950 border border-white/10 hover:border-yellow-400/30 text-slate-400 hover:text-white rounded-lg flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                Edit specs
                              </button>
                              <button
                                onClick={() => handleDeleteUniversity(u.id)}
                                className="p-2 border border-red-500/10 hover:border-red-500/40 text-rose-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCHOLARSHIPS PANEL CRUD TAB SEGMENT */}
                  {activeTab === 'scholarships' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-base font-semibold text-white">Active Fellowship &amp; Scholar Registrars</h2>
                          <p className="text-xs text-slate-400">Launch and configure support terms for deserving, high merit-score applicants.</p>
                        </div>
                        <button
                          onClick={() => setEditingScholarship({
                            name: "", country: "", coverage: "Full", value: "$3000 fee waiver",
                            eligibility: "Top 10% NEET scores", deadline: "2026-09-01", description: ""
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-lg"
                        >
                          <Plus className="h-4 w-4 text-slate-950" />
                          Launch Scholar Program
                        </button>
                      </div>

                      {/* Edit Scholarship design row */}
                      {editingScholarship && (
                        <div className="p-6 bg-slate-900 border border-yellow-400/30 rounded-2xl space-y-4 mb-6">
                          <h3 className="font-display font-medium text-white text-xs border-b border-white/5 pb-2">
                            {editingScholarship.id ? "Alter Fellowship Terms" : "Deploy New Overseas Scholarship Option"}
                          </h3>
                          <form onSubmit={handleSaveScholarship} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="text-slate-400 block mb-1">Scholarship Title Name *</label>
                              <input 
                                type="text" required
                                value={editingScholarship.name || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, name: e.target.value})}
                                placeholder="Elite NMC Merit Waiver"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Linked Academy / Institution</label>
                              <input 
                                type="text"
                                value={editingScholarship.universityName || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, universityName: e.target.value})}
                                placeholder="Tbilisi State Medical University"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Eligibility Zone Country *</label>
                              <input 
                                type="text" required
                                value={editingScholarship.country || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, country: e.target.value})}
                                placeholder="Kazakhstan"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Grant Coverage Type *</label>
                              <select
                                value={editingScholarship.coverage || "Partial"}
                                onChange={(e) => setEditingScholarship({...editingScholarship, coverage: e.target.value as any})}
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white cursor-pointer"
                              >
                                <option value="Full">Full Waiver (100%)</option>
                                <option value="Partial">Partial Waiver</option>
                                <option value="Stipend Only">Stipend Only</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Award Value Statement *</label>
                              <input 
                                type="text" required
                                value={editingScholarship.value || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, value: e.target.value})}
                                placeholder="100% Tuition housing free"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Filing Deadline Date *</label>
                              <input 
                                type="text" required
                                value={editingScholarship.deadline || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, deadline: e.target.value})}
                                placeholder="2026-08-30"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-slate-400 block mb-1">Grant Description Specs *</label>
                              <textarea 
                                required rows={2}
                                value={editingScholarship.description || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, description: e.target.value})}
                                placeholder="Describe academic focus or fund background details..."
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white resize-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-slate-400 block mb-1">Prerequisite Grade / Score Eligibility *</label>
                              <input 
                                type="text" required
                                value={editingScholarship.eligibility || ""}
                                onChange={(e) => setEditingScholarship({...editingScholarship, eligibility: e.target.value})}
                                placeholder="GPA over 3.7 or secondary biology core score of 90%+"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>

                            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                              <button 
                                type="button" onClick={() => setEditingScholarship(null)}
                                className="px-4 py-2 border border-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="px-5 py-2 bg-yellow-400 text-slate-950 font-bold rounded-lg cursor-pointer hover:bg-yellow-300"
                              >
                                Save Scholarship
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Display list of Scholarships */}
                      <div className="space-y-4">
                        {scholarships.map((s) => (
                          <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-yellow-400">
                                {s.coverage} Scholarship • {s.country}
                              </span>
                              <h3 className="font-semibold text-white text-sm">{s.name}</h3>
                              {s.universityName && <span className="text-slate-400 block text-xs">At: {s.universityName}</span>}
                              <p className="text-[11px] text-emerald-400">Worth: <strong>{s.value}</strong> | Ends: <strong>{s.deadline}</strong></p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => setEditingScholarship(s)}
                                className="px-3.5 py-1.5 bg-slate-950 border border-white/10 hover:border-yellow-400/45 text-slate-300 hover:text-white rounded-lg cursor-pointer text-xs font-semibold"
                              >
                                Edit Specs
                              </button>
                              <button
                                onClick={() => handleDeleteScholarship(s.id)}
                                className="p-2 border border-red-500/10 hover:border-rose-500 rounded-lg text-rose-500 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TESTIMONIALS PANEL CRUD TAB SEGMENT */}
                  {activeTab === 'testimonials' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-base font-semibold text-white">Student Testimonials CMS Ledger</h2>
                          <p className="text-xs text-slate-400">Handle student review files reflecting verified consultancy achievements.</p>
                        </div>
                        <button
                          onClick={() => setEditingTestimonial({
                            studentName: "", course: "MD Dentistry", university: "Tbilisi State",
                            country: "Georgia", rating: 5, text: "", avatarUrl: ""
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-lg"
                        >
                          <Plus className="h-4 w-4 text-slate-950" />
                          Publish Customer Feedback
                        </button>
                      </div>

                      {/* Feed editor layout modal */}
                      {editingTestimonial && (
                        <div className="p-6 bg-slate-900 border border-yellow-400/30 rounded-2xl space-y-4 mb-6">
                          <h3 className="font-display font-medium text-white text-xs border-b border-white/5 pb-2">
                            {editingTestimonial.id ? "Alter Testimonial Logs" : "File Real Class Testimonial Card"}
                          </h3>
                          <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="text-slate-400 block mb-1">Student Full Name *</label>
                              <input 
                                type="text" required
                                value={editingTestimonial.studentName || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, studentName: e.target.value})}
                                placeholder="Jane Doe"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Enrolled Course Title *</label>
                              <input 
                                type="text" required
                                value={editingTestimonial.course || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, course: e.target.value})}
                                placeholder="General Medicine (MBBS)"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Admitted Institution *</label>
                              <input 
                                type="text" required
                                value={editingTestimonial.university || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, university: e.target.value})}
                                placeholder="Kursk State Medical"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Destination Country State *</label>
                              <input 
                                type="text" required
                                value={editingTestimonial.country || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, country: e.target.value})}
                                placeholder="Russia"
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Satisfied Score Rating (1 to 5) *</label>
                              <input 
                                type="number" min={1} max={5} required
                                value={editingTestimonial.rating || 5}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, rating: Number(e.target.value)})}
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-slate-400 block mb-1">Avatar Profile image URL</label>
                              <input 
                                type="text"
                                value={editingTestimonial.avatarUrl || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, avatarUrl: e.target.value})}
                                placeholder="https://unsplash.com/..."
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-slate-400 block mb-1">Testimonial Quote Statement *</label>
                              <textarea 
                                required rows={3}
                                value={editingTestimonial.text || ""}
                                onChange={(e) => setEditingTestimonial({...editingTestimonial, text: e.target.value})}
                                placeholder="Enter detailed student experience narrative..."
                                className="w-full p-2 bg-slate-950 border border-white/10 rounded-lg text-white resize-none"
                              />
                            </div>

                            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                              <button 
                                type="button" onClick={() => setEditingTestimonial(null)}
                                className="px-4 py-2 border border-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="px-5 py-2 bg-yellow-400 text-slate-950 font-bold rounded-lg cursor-pointer hover:bg-yellow-300"
                              >
                                Save Feedback Card
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Display list of testimonial specs */}
                      <div className="divide-y divide-white/5 space-y-4">
                        {testimonials.map((t) => (
                          <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex gap-3 text-xs">
                              <img 
                                src={t.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.studentName)}`}
                                alt={t.studentName} 
                                className="w-10 h-10 object-cover rounded-full border bg-slate-950 border-white/10"
                              />
                              <div>
                                <strong className="text-white text-sm block">{t.studentName}</strong>
                                <span className="text-slate-500 block text-[10px]">{t.course} @ {t.university} ({t.country})</span>
                                <p className="text-slate-400 mt-1 italic max-w-2xl">"{t.text}"</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-start">
                              <button
                                onClick={() => setEditingTestimonial(t)}
                                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 rounded transition-colors text-[10px] font-semibold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(t.id)}
                                className="p-1.5 border border-red-500/15 text-rose-500 hover:border-rose-500 rounded cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                </>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
