export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string; // e.g., 'Grade 10-A', 'Grade 11-B'
  subject: string; // e.g., 'Mathematics', 'Physics'
  email: string;
  parentContact: string;
  parentName?: string;
  attendance: number; // 0 - 100
  gradeScore: string; // e.g., 'A+', '94%'
  status: 'Active' | 'Needs Attention' | 'Inactive';
  notes: string;
  joinedDate: string;
  avatarBg?: string;
}

export interface DashboardStats {
  totalStudents: number;
  avgAttendance: number;
  topPerformers: number;
  needsAttention: number;
}

export interface StudentFilterOptions {
  searchQuery: string;
  grade: string;
  subject: string;
  status: string;
  sortBy: 'name' | 'rollNumber' | 'attendance' | 'gradeScore' | 'joinedDate';
  sortOrder: 'asc' | 'desc';
}
