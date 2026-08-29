import React from 'react';
import { Student } from '../../types/student';
import { Eye, Edit3, Trash2, AlertTriangle, Phone, Mail } from 'lucide-react';
import { sound } from '../../utils/sound';

interface StudentTableProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onToggleAttendance?: (id: string, current: number) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
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
    if (rate >= 90) return 'text-emerald-700 bg-emerald-100/80 border-emerald-300';
    if (rate >= 75) return 'text-amber-700 bg-amber-100/80 border-amber-300';
    return 'text-red-700 bg-red-100/80 border-red-300';
  };

  const getGradeScoreBadge = (score: string) => {
    if (score.startsWith('A')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (score.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score.startsWith('C')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  if (students.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-gray-200/80 shadow-sm flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-gray-800">No students match your filter</h4>
        <p className="text-xs text-gray-500 max-w-sm mt-1">
          Try changing your search query, grade selection, or status filters above to find enrolled students.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Student Info</th>
              <th className="py-3.5 px-4">Class & Subject</th>
              <th className="py-3.5 px-4">Attendance</th>
              <th className="py-3.5 px-4">Academic Grade</th>
              <th className="py-3.5 px-4">Parent Contact</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50/60 transition-colors group"
              >
                {/* Student Info */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-sm shrink-0"
                      style={{ backgroundColor: student.avatarBg || '#3B82F6' }}
                    >
                      {getInitials(student.name)}
                    </div>
                    <div className="min-w-0">
                      <p
                        onClick={() => {
                          sound.playPop(600);
                          onView(student);
                        }}
                        className="text-sm font-extrabold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer truncate"
                      >
                        {student.name}
                      </p>
                      <p className="text-[11px] text-gray-500 font-mono truncate">{student.rollNumber}</p>
                    </div>
                  </div>
                </td>

                {/* Class & Subject */}
                <td className="py-4 px-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900">{student.grade}</p>
                    <p className="text-[11px] text-blue-600 font-semibold truncate">{student.subject}</p>
                  </div>
                </td>

                {/* Attendance */}
                <td className="py-4 px-4">
                  <div className="w-28">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-extrabold px-1.5 py-0.2 rounded border ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          student.attendance >= 90
                            ? 'bg-emerald-500'
                            : student.attendance >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${student.attendance}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Academic Grade */}
                <td className="py-4 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black border ${getGradeScoreBadge(student.gradeScore)}`}>
                    {student.gradeScore}
                  </span>
                </td>

                {/* Parent Contact */}
                <td className="py-4 px-4">
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="text-gray-900 font-medium truncate flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                      <span>{student.parentContact}</span>
                    </p>
                    <p className="text-[11px] text-gray-500 truncate flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                      <span>{student.email}</span>
                    </p>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      student.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : student.status === 'Needs Attention'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        student.status === 'Active'
                          ? 'bg-emerald-500'
                          : student.status === 'Needs Attention'
                          ? 'bg-amber-500'
                          : 'bg-gray-400'
                      }`}
                    />
                    {student.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop(550);
                        onView(student);
                      }}
                      className="p-2 rounded-xl text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                      title="View Student Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop(650);
                        onEdit(student);
                      }}
                      className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Student Records"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playBoing();
                        if (confirm(`Remove ${student.name} from records?`)) {
                          onDelete(student.id);
                        }
                      }}
                      className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
