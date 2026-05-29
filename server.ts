import express, { Request, Response, NextFunction } from "express";
import path from "path";
import jwt from "jsonwebtoken";
import { createServer as createViteServer } from "vite";
import { getDatabase, saveDatabase } from "./server_db";
import { University, Scholarship, Testimonial, ContactLead } from "./src/types";

const JWT_SECRET = process.env.JWT_SECRET || "elite-explore-university-key-2026";
const PORT = 3000;

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

// Global JWT verification middleware
function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token missing. Authentication failed." });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid or expired token." });
      return;
    }
    req.user = decoded as { id: string; email: string; role: string; name: string };
    next();
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // ----------------------------------------------------
  // AUTH ROUTE
  // ----------------------------------------------------
  app.post("/api/auth/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // We provide a quick standard credential for testing easily
    if (email === "admin@exploreuniversity.com" && password === "admin123") {
      const payload = {
        id: "u1",
        email: "admin@exploreuniversity.com",
        role: "admin",
        name: "Education Admin Console"
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
      res.json({
        token,
        user: payload
      });
    } else {
      res.status(401).json({ error: "Invalid administrator credentials. Match admin@exploreuniversity.com / admin123" });
    }
  });

  app.get("/api/auth/me", authenticateToken, (req: AuthenticatedRequest, res: Response) => {
    res.json({ user: req.user });
  });

  // ----------------------------------------------------
  // PUBLIC QUERIES
  // ----------------------------------------------------
  app.get("/api/public/universities", (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.universities);
  });

  app.get("/api/public/scholarships", (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.scholarships);
  });

  app.get("/api/public/testimonials", (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.testimonials);
  });

  // STUDENT LEAD SUBMISSION FROM THE THE HERO/CONTACT FORM
  app.post("/api/public/leads", (req: Request, res: Response) => {
    const { fullName, email, phone, selectedCountry, preferredCourse, message } = req.body;
    
    if (!fullName || !email || !phone || !selectedCountry || !preferredCourse) {
      res.status(400).json({ error: "All required form fields are mandatory." });
      return;
    }

    const db = getDatabase();
    
    const newLead: ContactLead = {
      id: `lead-${Date.now()}`,
      fullName,
      email,
      phone,
      selectedCountry,
      preferredCourse,
      message: message || "",
      status: "New",
      createdAt: new Date().toISOString()
    };

    db.leads.unshift(newLead);
    saveDatabase(db);

    // Simulated Real-Time Email Notification feature
    console.log("=========================================");
    console.log("[SYSTEM] New Student Inquiry Email Alert Sent!");
    console.log(`[TO] info@exploremyuniversity.com, admin@exploreuniversity.com`);
    console.log(`[SUBJECT] Elite Inquiry Notification: ${newLead.fullName}`);
    console.log(`[BODY]\nStudent: ${newLead.fullName}\nEmail: ${newLead.email}\nPhone: ${newLead.phone}\nCountry: ${newLead.selectedCountry}\nCourse: ${newLead.preferredCourse}\nInquiry: ${newLead.message}`);
    console.log("=========================================");

    res.status(201).json({ success: true, lead: newLead });
  });

  // ----------------------------------------------------
  // ADMIN CONTROL ENDPOINTS (PROTECTED BY JWT)
  // ----------------------------------------------------

  // UNIVERSITIES PANEL CRUD
  app.post("/api/admin/universities", authenticateToken, (req: Request, res: Response) => {
    const universityData = req.body;
    const db = getDatabase();
    
    const newUniv: University = {
      ...universityData,
      id: `univ-${Date.now()}`,
      established: Number(universityData.established || 2000),
      tuitionFeePerYear: Number(universityData.tuitionFeePerYear || 5000),
      courses: Array.isArray(universityData.courses) ? universityData.courses : [universityData.courses],
      highlights: Array.isArray(universityData.highlights) ? universityData.highlights : [universityData.highlights],
      accreditation: Array.isArray(universityData.accreditation) ? universityData.accreditation : [universityData.accreditation],
    };

    db.universities.push(newUniv);
    saveDatabase(db);
    res.status(201).json(newUniv);
  });

  app.put("/api/admin/universities/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const universityData = req.body;
    const db = getDatabase();
    
    const index = db.universities.findIndex(u => u.id === id);
    if (index === -1) {
      res.status(404).json({ error: "University profile not found." });
      return;
    }

    db.universities[index] = {
      ...db.universities[index],
      ...universityData,
      id, // secure ID
      established: Number(universityData.established || db.universities[index].established),
      tuitionFeePerYear: Number(universityData.tuitionFeePerYear || db.universities[index].tuitionFeePerYear),
    };

    saveDatabase(db);
    res.json(db.universities[index]);
  });

  app.delete("/api/admin/universities/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    
    db.universities = db.universities.filter(u => u.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: "University profile cleared." });
  });

  // SCHOLARSHIPS PANEL CRUD
  app.post("/api/admin/scholarships", authenticateToken, (req: Request, res: Response) => {
    const scholarshipData = req.body;
    const db = getDatabase();
    
    const newSchol: Scholarship = {
      ...scholarshipData,
      id: `schol-${Date.now()}`
    };

    db.scholarships.push(newSchol);
    saveDatabase(db);
    res.status(201).json(newSchol);
  });

  app.put("/api/admin/scholarships/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const scholarshipData = req.body;
    const db = getDatabase();
    
    const index = db.scholarships.findIndex(s => s.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Scholarship scheme not found." });
      return;
    }

    db.scholarships[index] = {
      ...db.scholarships[index],
      ...scholarshipData,
      id
    };

    saveDatabase(db);
    res.json(db.scholarships[index]);
  });

  app.delete("/api/admin/scholarships/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    
    db.scholarships = db.scholarships.filter(s => s.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: "Scholarship listing cleared." });
  });

  // TESTIMONIALS PANEL CRUD
  app.post("/api/admin/testimonials", authenticateToken, (req: Request, res: Response) => {
    const testimonialData = req.body;
    const db = getDatabase();
    
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: `testimonial-${Date.now()}`,
      rating: Number(testimonialData.rating || 5),
      date: new Date().toISOString().split('T')[0]
    };

    db.testimonials.push(newTestimonial);
    saveDatabase(db);
    res.status(201).json(newTestimonial);
  });

  app.put("/api/admin/testimonials/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const testimonialData = req.body;
    const db = getDatabase();
    
    const index = db.testimonials.findIndex(t => t.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Testimonial record not found." });
      return;
    }

    db.testimonials[index] = {
      ...db.testimonials[index],
      ...testimonialData,
      id,
      rating: Number(testimonialData.rating || db.testimonials[index].rating)
    };

    saveDatabase(db);
    res.json(db.testimonials[index]);
  });

  app.delete("/api/admin/testimonials/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    
    db.testimonials = db.testimonials.filter(t => t.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: "Testimonial listing cleared." });
  });

  // INQUIRIES LEADS PANEL CRUD
  app.get("/api/admin/leads", authenticateToken, (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.leads);
  });

  app.put("/api/admin/leads/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = getDatabase();
    
    const lead = db.leads.find(l => l.id === id);
    if (!lead) {
      res.status(404).json({ error: "Student lead not found." });
      return;
    }

    lead.status = status;
    saveDatabase(db);
    res.json(lead);
  });

  app.delete("/api/admin/leads/:id", authenticateToken, (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    
    db.leads = db.leads.filter(l => l.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: "Lead inquiry record cleared." });
  });

  // ANALYTICS PANEL Aggregated Metrics
  app.get("/api/admin/stats", authenticateToken, (req: Request, res: Response) => {
    const db = getDatabase();
    
    const totalLeads = db.leads.length;
    const newLeads = db.leads.filter(l => l.status === "New").length;
    const totalUniversities = db.universities.length;
    const totalScholarships = db.scholarships.length;
    
    let sumTuition = 0;
    db.universities.forEach(un => { sumTuition += un.tuitionFeePerYear; });
    const averageTuition = totalUniversities > 0 ? Math.round(sumTuition / totalUniversities) : 0;

    // Status distributions
    const statusCounts: Record<string, number> = {
      New: 0,
      "In Progress": 0,
      Contacted: 0,
      Enrolled: 0,
      Rejected: 0
    };
    db.leads.forEach(l => {
      if (statusCounts[l.status] !== undefined) {
        statusCounts[l.status]++;
      } else {
        statusCounts[l.status] = 1;
      }
    });

    const leadStatusData = Object.keys(statusCounts).map(k => ({
      name: k,
      value: statusCounts[k]
    }));

    // Simple time-series trend grouping
    const dateGroups: Record<string, number> = {};
    db.leads.forEach(l => {
      // ISO Date extraction e.g. "2026-05-25"
      const d = l.createdAt ? l.createdAt.split('T')[0] : "Pre-2026";
      dateGroups[d] = (dateGroups[d] || 0) + 1;
    });

    const leadTrendData = Object.keys(dateGroups)
      .sort()
      .map(d => ({
        date: d,
        leads: dateGroups[d]
      }));

    res.json({
      totalLeads,
      newLeads,
      totalUniversities,
      totalScholarships,
      averageTuition,
      leadStatusData,
      leadTrendData
    });
  });

  // ----------------------------------------------------
  // VITE DEVELOPMENT MIDDLEWARE / STATIC ASSETS ROUTING
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    console.log("Serving application in [Development] sandboxed environment.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving build outputs in [Production] compiled environment.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dynamic Core Services launched at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical: Failed to boot Dynamic server core:", err);
});
