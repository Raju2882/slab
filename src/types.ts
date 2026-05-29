export interface User {
  id: string;
  email: string;
  role: 'admin';
  name: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  logoUrl?: string;
  image?: string;
  courses: string[];
  established: number;
  globalRank?: number;
  tuitionFeePerYear: number;
  currency: string;
  description: string;
  highlights: string[];
  accreditation: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  universityId?: string; // Optional: can be a general country or global scholarship
  universityName?: string;
  country: string;
  coverage: 'Full' | 'Partial' | 'Stipend Only';
  value: string;
  eligibility: string;
  deadline: string;
  description: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  university: string;
  country: string;
  rating: number;
  text: string;
  avatarUrl?: string;
  date: string;
}

export interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  selectedCountry: string;
  preferredCourse: string;
  message?: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Enrolled' | 'Rejected';
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalUniversities: number;
  totalScholarships: number;
  averageTuition: number;
  leadStatusData: { name: string; value: number }[];
  leadTrendData: { date: string; leads: number }[];
}
