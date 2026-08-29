import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, BookOpen, GraduationCap, Mail, Phone, Percent, Award, AlertCircle, FileText } from 'lucide-react';
import { Student } from '../../types/student';
import { sound } from '../../utils/sound';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id' | 'joinedDate'> | Student) => void;
  initialData?: Student | null;
}

const GRADES = ['Grade 9-A', 'Grade 9-B', 'Grade 10-A', 'Grade 10-B', 'Grade 11-A', 'Grade 11-B', 'Grade 12-A', 'Grade 12-B'];
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'English Literature'];
const SCORES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [attendance, setAttendance] = useState(90);
  const [gradeScore, setGradeScore] = useState('A');
  const [status, setStatus] = useState<'Active' | 'Needs Attention' | 'Inactive'>('Active');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRollNumber(initialData.rollNumber);
      setGrade(initialData.grade);
      setSubject(initialData.subject);
      setEmail(initialData.email);
      setParentName(initialData.parentName || '');
      setParentContact(initialData.parentContact);
      setAttendance(initialData.attendance);
      setGradeScore(initialData.gradeScore);
      setStatus(initialData.status);
      setNotes(initialData.notes || '');
    } else {
      // Default new student state
      setName('');
      setRollNumber(`STU-${Math.floor(100 + Math.random() * 900)}`);
      setGrade(GRADES[0]);
      setSubject(SUBJECTS[0]);
      setEmail('');
      setParentName('');
      setParentContact('');
      setAttendance(95);
      setGradeScore('A');
      setStatus('Active');
      setNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!name.trim()) err.name = 'Student name is required';
    if (!rollNumber.trim()) err.rollNumber = 'Roll / ID number is required';
    if (!email.trim() || !email.includes('@')) err.email = 'Valid email is required';
    if (!parentContact.trim()) err.parentContact = 'Parent contact number is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      sound.playBoing();
      return;
    }

    sound.playSuccess();
    if (initialData) {
      onSave({
        ...initialData,
        name,
        rollNumber,
        grade,
        subject,
        email,
        parentName,
        parentContact,
        attendance: Number(attendance),
        gradeScore,
        status,
        notes,
      });
    } else {
      onSave({
        name,
        rollNumber,
        grade,
        subject,
        email,
        parentName,
        parentContact,
        attendance: Number(attendance),
        gradeScore,
        status,
        notes,
      });
    }
    onClose();
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

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-gray-900 border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  {initialData ? 'Edit Student Details' : 'Add New Student'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {initialData ? 'Update student records, grades and attendance' : 'Fill in the information to enroll a student in your class'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" /> Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Emily Davis"
                    className={`w-full bg-gray-50 border ${
                      errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
                </div>

                {/* Roll / Student ID */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gray-500" /> Roll / ID Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. MAT-101"
                    className={`w-full bg-gray-50 border ${
                      errors.rollNumber ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium`}
                  />
                  {errors.rollNumber && <p className="text-[11px] text-red-500 mt-0.5">{errors.rollNumber}</p>}
                </div>

                {/* Grade / Class */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-gray-500" /> Class / Grade
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium cursor-pointer"
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-gray-500" /> Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium cursor-pointer"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Student Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-500" /> Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@school.edu"
                    className={`w-full bg-gray-50 border ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
                </div>

                {/* Parent Contact Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-500" /> Parent Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentContact}
                    onChange={(e) => setParentContact(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full bg-gray-50 border ${
                      errors.parentContact ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium`}
                  />
                  {errors.parentContact && <p className="text-[11px] text-red-500 mt-0.5">{errors.parentContact}</p>}
                </div>

                {/* Attendance Rate */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-gray-500" /> Attendance Rate
                    </span>
                    <span className="font-bold text-blue-600">{attendance}%</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={attendance}
                      onChange={(e) => setAttendance(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>

                {/* Grade / Academic Standing */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gray-500" /> Grade / Standing
                  </label>
                  <select
                    value={gradeScore}
                    onChange={(e) => setGradeScore(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors font-medium cursor-pointer"
                  >
                    {SCORES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-500" /> Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Active', 'Needs Attention', 'Inactive'] as const).map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setStatus(st)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        status === st
                          ? st === 'Active'
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                            : st === 'Needs Attention'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                            : 'bg-gray-700 text-white border-gray-700 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tutor Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gray-500" /> Tutor Notes & Observations
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private observations about student progress, homework submissions, strengths, or areas for improvement..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:border-black focus:bg-white focus:outline-none transition-colors resize-none font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-black hover:bg-neutral-900 text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{initialData ? 'Update Student' : 'Save & Enroll'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
