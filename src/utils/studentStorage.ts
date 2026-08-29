import { Student, DashboardStats } from '../types/student';

const STORAGE_KEY = 'tutor_students_data_v1';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    name: 'Emily Davis',
    rollNumber: 'MAT-101',
    grade: 'Grade 10-A',
    subject: 'Mathematics',
    email: 'emily.davis@school.edu',
    parentName: 'Robert Davis',
    parentContact: '+1 (555) 234-5678',
    attendance: 96,
    gradeScore: 'A+',
    status: 'Active',
    notes: 'Outstanding performance in Calculus and Algebra. Very active in discussions.',
    joinedDate: '2024-09-01',
    avatarBg: '#3B82F6',
  },
  {
    id: 'std-2',
    name: 'Liam Johnson',
    rollNumber: 'PHY-204',
    grade: 'Grade 11-B',
    subject: 'Physics',
    email: 'liam.johnson@school.edu',
    parentName: 'Sarah Johnson',
    parentContact: '+1 (555) 345-6789',
    attendance: 92,
    gradeScore: 'A',
    status: 'Active',
    notes: 'Strong analytical mindset in mechanics. Needs minor review in optics.',
    joinedDate: '2024-09-03',
    avatarBg: '#10B981',
  },
  {
    id: 'std-3',
    name: 'Sophia Martinez',
    rollNumber: 'CS-305',
    grade: 'Grade 12-A',
    subject: 'Computer Science',
    email: 'sophia.m@school.edu',
    parentName: 'Carlos Martinez',
    parentContact: '+1 (555) 456-7890',
    attendance: 98,
    gradeScore: 'A+',
    status: 'Active',
    notes: 'Built a top-tier React project. Excels at algorithms and data structures.',
    joinedDate: '2024-08-28',
    avatarBg: '#8B5CF6',
  },
  {
    id: 'std-4',
    name: 'Noah Williams',
    rollNumber: 'MAT-102',
    grade: 'Grade 10-A',
    subject: 'Mathematics',
    email: 'noah.w@school.edu',
    parentName: 'David Williams',
    parentContact: '+1 (555) 567-8901',
    attendance: 74,
    gradeScore: 'C+',
    status: 'Needs Attention',
    notes: 'Missed 3 homework assignments this month. Scheduled a 1-on-1 tutoring session.',
    joinedDate: '2024-09-05',
    avatarBg: '#F59E0B',
  },
  {
    id: 'std-5',
    name: 'Ava Brown',
    rollNumber: 'CHEM-110',
    grade: 'Grade 11-A',
    subject: 'Chemistry',
    email: 'ava.brown@school.edu',
    parentName: 'Jennifer Brown',
    parentContact: '+1 (555) 678-9012',
    attendance: 88,
    gradeScore: 'B+',
    status: 'Active',
    notes: 'Great lab partner, accurate in stoichiometry calculations.',
    joinedDate: '2024-09-02',
    avatarBg: '#EC4899',
  },
  {
    id: 'std-6',
    name: 'Lucas Garcia',
    rollNumber: 'CS-308',
    grade: 'Grade 12-A',
    subject: 'Computer Science',
    email: 'lucas.g@school.edu',
    parentName: 'Elena Garcia',
    parentContact: '+1 (555) 789-0123',
    attendance: 68,
    gradeScore: 'C',
    status: 'Needs Attention',
    notes: 'Struggling with asynchronous JavaScript concepts. Extra exercises provided.',
    joinedDate: '2024-09-10',
    avatarBg: '#EF4444',
  },
  {
    id: 'std-7',
    name: 'Mia Wilson',
    rollNumber: 'PHY-209',
    grade: 'Grade 11-B',
    subject: 'Physics',
    email: 'mia.wilson@school.edu',
    parentName: 'Thomas Wilson',
    parentContact: '+1 (555) 890-1234',
    attendance: 95,
    gradeScore: 'A',
    status: 'Active',
    notes: 'Consistently completes advanced problem sets ahead of schedule.',
    joinedDate: '2024-09-01',
    avatarBg: '#06B6D4',
  },
  {
    id: 'std-8',
    name: 'Ethan Miller',
    rollNumber: 'MAT-108',
    grade: 'Grade 10-B',
    subject: 'Mathematics',
    email: 'ethan.m@school.edu',
    parentName: 'Jessica Miller',
    parentContact: '+1 (555) 901-2345',
    attendance: 84,
    gradeScore: 'B',
    status: 'Active',
    notes: 'Shows good improvement in quadratic equations and geometry.',
    joinedDate: '2024-09-12',
    avatarBg: '#6366F1',
  },
];

export const studentStorage = {
  getStudents: (): Student[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
        return INITIAL_STUDENTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
      return INITIAL_STUDENTS;
    }
  },

  saveStudents: (students: Student[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },

  addStudent: (student: Omit<Student, 'id' | 'joinedDate'>): Student => {
    const students = studentStorage.getStudents();
    const newStudent: Student = {
      ...student,
      id: `std-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      joinedDate: new Date().toISOString().split('T')[0],
      avatarBg: student.avatarBg || getRandomAvatarColor(),
    };
    const updated = [newStudent, ...students];
    studentStorage.saveStudents(updated);
    return newStudent;
  },

  updateStudent: (student: Student): void => {
    const students = studentStorage.getStudents();
    const updated = students.map((s) => (s.id === student.id ? student : s));
    studentStorage.saveStudents(updated);
  },

  deleteStudent: (id: string): void => {
    const students = studentStorage.getStudents();
    const updated = students.filter((s) => s.id !== id);
    studentStorage.saveStudents(updated);
  },

  resetToDefault: (): Student[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    return INITIAL_STUDENTS;
  },

  getStats: (students: Student[]): DashboardStats => {
    if (!students.length) {
      return { totalStudents: 0, avgAttendance: 0, topPerformers: 0, needsAttention: 0 };
    }
    const totalStudents = students.length;
    const totalAttendance = students.reduce((acc, s) => acc + s.attendance, 0);
    const avgAttendance = Math.round(totalAttendance / totalStudents);
    const topPerformers = students.filter((s) => s.gradeScore.includes('A')).length;
    const needsAttention = students.filter((s) => s.status === 'Needs Attention' || s.attendance < 75).length;

    return {
      totalStudents,
      avgAttendance,
      topPerformers,
      needsAttention,
    };
  },

  exportToCSV: (students: Student[]): void => {
    const headers = [
      'Roll Number',
      'Name',
      'Grade/Class',
      'Subject',
      'Email',
      'Parent Contact',
      'Attendance (%)',
      'Grade/Score',
      'Status',
      'Joined Date',
      'Notes',
    ];

    const rows = students.map((s) => [
      `"${s.rollNumber}"`,
      `"${s.name}"`,
      `"${s.grade}"`,
      `"${s.subject}"`,
      `"${s.email}"`,
      `"${s.parentContact}"`,
      s.attendance,
      `"${s.gradeScore}"`,
      `"${s.status}"`,
      `"${s.joinedDate}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Tutor_Students_Records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};

const AVATAR_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
  '#14B8A6', // Teal
];

function getRandomAvatarColor(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}
