import React from 'react';
import { Student } from '../../types/student';
import { Eye, Edit3, Trash2, Phone, Mail, Award, GraduationCap } from 'lucide-react';
import { sound } from '../../utils/sound';

interface StudentCardGridProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export const StudentCardGrid: React.FC<StudentCardGridProps> = ({
  students,
  onView,
  onEdit,
  onDelete,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-700 bg-emerald-100 border-emerald-200';
    if (rate >= 75) return 'text-amber-700 bg-amber-100 border-amber-200';
    return 'text-red-700 bg-red-100 border-red-200';
  };

  if (students.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
        >
          {/* Top section: Avatar + Status */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-black shadow-sm"
                style={{ backgroundColor: student.avatarBg || '#3B82F6' }}
              >
                {getInitials(student.name)}
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
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

            {/* Student Name + Roll */}
            <h4
              onClick={() => {
                sound.playPop(600);
                onView(student);
              }}
              className="text-base font-extrabold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer truncate"
            >
              {student.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] text-gray-700">{student.rollNumber}</span>
              <span>•</span>
              <span className="text-gray-700 font-bold">{student.grade}</span>
            </div>

            {/* Subject badge */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{student.subject}</span>
              </span>
            </div>

            {/* Metrics: Attendance + Grade */}
            <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Attendance</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-extrabold text-gray-900">{student.attendance}%</span>
                  <span className={`text-[9px] font-bold px-1 py-0.2 rounded border ${getAttendanceColor(student.attendance)}`}>
                    {student.attendance >= 90 ? 'High' : 'Low'}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Grade Score</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-extrabold text-purple-700">{student.gradeScore}</span>
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="mt-3 space-y-1 text-xs text-gray-500">
              <p className="truncate flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="font-medium text-gray-700">{student.parentContact}</span>
              </p>
              <p className="truncate flex items-center gap-1.5 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{student.email}</span>
              </p>
            </div>
          </div>

          {/* Bottom Card Actions */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                sound.playPop(550);
                onView(student);
              }}
              className="text-xs font-bold text-gray-700 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  sound.playPop(650);
                  onEdit(student);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="Edit Student"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playBoing();
                  if (confirm(`Remove ${student.name} from records?`)) {
                    onDelete(student.id);
                  }
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Student"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
