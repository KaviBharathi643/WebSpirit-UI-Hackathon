import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Percent,
  Award,
  AlertCircle,
  Plus,
  Search,
  Download,
  LayoutGrid,
  List,
  LogOut,
  Filter,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { Student } from '../../types/student';
import { studentStorage } from '../../utils/studentStorage';
import { sound } from '../../utils/sound';
import { StudentTable } from './StudentTable';
import { StudentCardGrid } from './StudentCardGrid';
import { StudentFormModal } from './StudentFormModal';
import { StudentDetailModal } from './StudentDetailModal';

interface TutorDashboardProps {
  user: { email: string; name: string };
  onLogout: () => void;
}

export const TutorDashboard: React.FC<TutorDashboardProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedDetailStudent, setSelectedDetailStudent] = useState<Student | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load students from storage
  useEffect(() => {
    const loaded = studentStorage.getStudents();
    setStudents(loaded);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Stats calculation
  const stats = useMemo(() => {
    return studentStorage.getStats(students);
  }, [students]);

  // Unique filters lists
  const allGrades = useMemo(() => {
    const set = new Set(students.map((s) => s.grade));
    return ['All', ...Array.from(set)];
  }, [students]);

  const allSubjects = useMemo(() => {
    const set = new Set(students.map((s) => s.subject));
    return ['All', ...Array.from(set)];
  }, [students]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchQuery === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
      const matchesSubject = selectedSubject === 'All' || student.subject === selectedSubject;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;

      return matchesSearch && matchesGrade && matchesSubject && matchesStatus;
    });
  }, [students, searchQuery, selectedGrade, selectedSubject, selectedStatus]);

  // Handlers
  const handleAddStudent = (studentData: Omit<Student, 'id' | 'joinedDate'>) => {
    const newStudent = studentStorage.addStudent(studentData);
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Enrolled ${newStudent.name} successfully!`);
  };

  const handleUpdateStudent = (updatedData: Student) => {
    studentStorage.updateStudent(updatedData);
    setStudents((prev) => prev.map((s) => (s.id === updatedData.id ? updatedData : s)));
    showToast(`Updated ${updatedData.name}'s records!`);
  };

  const handleDeleteStudent = (id: string) => {
    const studentToRemove = students.find((s) => s.id === id);
    studentStorage.deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Removed student ${studentToRemove?.name || ''}`);
  };

  const handleExportCSV = () => {
    sound.playPop(700);
    studentStorage.exportToCSV(filteredStudents);
    showToast(`Exported ${filteredStudents.length} student records to CSV!`);
  };

  const handleResetData = () => {
    if (confirm('Reset student records to default sample data?')) {
      const reset = studentStorage.resetToDefault();
      setStudents(reset);
      sound.playSuccess();
      showToast('Reset to default sample class records.');
    }
  };

  const tutorDisplayName = user.name || (user.email ? user.email.split('@')[0] : 'Tutor');

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-gray-800 text-xs sm:text-sm font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">TutorPortal</h1>
              <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Classroom Suite
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Manage student records, attendance, and academic performance
            </p>
          </div>
        </div>

        {/* Right: Tutor Profile + Add Student + Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Add Student CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => {
              sound.playPop(700);
              setEditingStudent(null);
              setIsFormModalOpen(true);
            }}
            className="bg-black hover:bg-neutral-900 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </motion.button>

          {/* Tutor Info Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-200">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              {tutorDisplayName[0].toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800 leading-tight capitalize">{tutorDisplayName}</p>
              <p className="text-[10px] text-gray-400 font-medium">Head Tutor</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              sound.playPop(450);
              if (confirm('Log out from tutor dashboard?')) {
                onLogout();
              }
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Welcome Banner + Key Metrics Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Welcome back, <span className="text-blue-600 capitalize">{tutorDisplayName}</span> 👋
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                Here is the latest attendance and academic overview for your active students.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetData}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Restore default student records"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

          {/* Metric Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {/* 1. Total Students */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Enrolled</span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">{stats.totalStudents}</span>
                <p className="text-xs text-gray-500 font-medium mt-1">Across all registered classes</p>
              </div>
            </div>

            {/* 2. Avg Attendance */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg Attendance</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Percent className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900">{stats.avgAttendance}%</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {stats.avgAttendance >= 85 ? 'Healthy' : 'Needs boost'}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.avgAttendance}%` }} />
                </div>
              </div>
            </div>

            {/* 3. Top Performers */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Top Performers</span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">{stats.topPerformers}</span>
                <p className="text-xs text-gray-500 font-medium mt-1">Students with A or A+ marks</p>
              </div>
            </div>

            {/* 4. Needs Attention */}
            <div
              onClick={() => {
                sound.playPop(500);
                setSelectedStatus(selectedStatus === 'Needs Attention' ? 'All' : 'Needs Attention');
              }}
              className={`bg-white rounded-3xl p-5 border shadow-xs flex flex-col justify-between cursor-pointer transition-all ${
                selectedStatus === 'Needs Attention' ? 'border-amber-400 ring-2 ring-amber-400/20 bg-amber-50/20' : 'border-gray-200/80 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Needs Attention</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-600">{stats.needsAttention}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Click to filter
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">Low attendance / missed work</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Control Bar */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students by name, roll no, or email..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Actions: Export CSV + View Switcher */}
            <div className="flex items-center gap-2 self-end lg:self-center">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Download CSV spreadsheet of current students"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Export CSV</span>
              </button>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setViewMode('table');
                  }}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setViewMode('grid');
                  }}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filters:
            </span>

            {/* Grade Filter */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5">
              <span className="text-gray-400 font-semibold">Class:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-transparent text-gray-800 font-bold focus:outline-none cursor-pointer"
              >
                {allGrades.map((g) => (
                  <option key={g} value={g}>{g === 'All' ? 'All Classes' : g}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5">
              <span className="text-gray-400 font-semibold">Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-transparent text-gray-800 font-bold focus:outline-none cursor-pointer"
              >
                {allSubjects.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5">
              <span className="text-gray-400 font-semibold">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-gray-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Reset Filters button */}
            {(selectedGrade !== 'All' || selectedSubject !== 'All' || selectedStatus !== 'All' || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedGrade('All');
                  setSelectedSubject('All');
                  setSelectedStatus('All');
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline ml-auto cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>
        </section>

        {/* Students List Display */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-extrabold text-gray-900">
              Students List{' '}
              <span className="text-xs font-bold text-gray-400 ml-1">
                ({filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'})
              </span>
            </h3>
          </div>

          {viewMode === 'table' ? (
            <StudentTable
              students={filteredStudents}
              onView={(s) => {
                setSelectedDetailStudent(s);
                setIsDetailModalOpen(true);
              }}
              onEdit={(s) => {
                setEditingStudent(s);
                setIsFormModalOpen(true);
              }}
              onDelete={handleDeleteStudent}
            />
          ) : (
            <StudentCardGrid
              students={filteredStudents}
              onView={(s) => {
                setSelectedDetailStudent(s);
                setIsDetailModalOpen(true);
              }}
              onEdit={(s) => {
                setEditingStudent(s);
                setIsFormModalOpen(true);
              }}
              onDelete={handleDeleteStudent}
            />
          )}
        </section>
      </main>

      {/* Add / Edit Student Modal */}
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={(data) => {
          if ('id' in data) {
            handleUpdateStudent(data as Student);
          } else {
            handleAddStudent(data);
          }
        }}
        initialData={editingStudent}
      />

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedDetailStudent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailStudent(null);
        }}
        onEdit={(s) => {
          setEditingStudent(s);
          setIsFormModalOpen(true);
        }}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};
