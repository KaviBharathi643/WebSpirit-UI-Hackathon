import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, Award, Percent, Edit3, Trash2 } from 'lucide-react';
import { Student } from '../../types/student';
import { sound } from '../../utils/sound';

interface StudentDetailModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!student) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (rate >= 75) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-gray-900 border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-gray-100">
              <div
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shrink-0"
                style={{ backgroundColor: student.avatarBg || '#3B82F6' }}
              >
                {getInitials(student.name)}
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{student.name}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      student.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : student.status === 'Needs Attention'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 flex items-center justify-center sm:justify-start gap-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-mono">{student.rollNumber}</span>
                  <span>•</span>
                  <span>{student.grade}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-bold">{student.subject}</span>
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-6">
              {/* Attendance Card */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-blue-500" /> Attendance
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-gray-900">{student.attendance}%</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getAttendanceColor(student.attendance)}`}>
                    {student.attendance >= 90 ? 'High' : student.attendance >= 75 ? 'Moderate' : 'Low'}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 75 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${student.attendance}%` }}
                  />
                </div>
              </div>

              {/* Grade Standing Card */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-pink-500" /> Academic Grade
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-gray-900">{student.gradeScore}</span>
                  <span className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                    Score
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">Core Subject Evaluation</p>
              </div>

              {/* Enrolled Date Card */}
              <div className="col-span-2 sm:col-span-1 bg-gray-50/80 border border-gray-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" /> Enrolled
                </span>
                <div className="mt-2">
                  <span className="text-sm font-bold text-gray-900">{student.joinedDate}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">Active Class Session</p>
              </div>
            </div>

            {/* Contact & Parent Information */}
            <div className="space-y-3 pb-6 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-400">Student Email</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-400">
                      {student.parentName ? `Parent (${student.parentName})` : 'Parent Phone'}
                    </p>
                    <p className="text-xs font-bold text-gray-800 truncate">{student.parentContact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tutor Notes */}
            <div className="py-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Tutor Observations & Remarks</h4>
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                {student.notes || 'No custom notes added for this student yet.'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  sound.playBoing();
                  if (confirm(`Are you sure you want to remove ${student.name} from your class records?`)) {
                    onDelete(student.id);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Student</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop(600);
                    onEdit(student);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-black hover:bg-neutral-900 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Records</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
