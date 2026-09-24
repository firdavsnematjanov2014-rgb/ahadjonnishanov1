import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Star,
  Award,
  Phone,
  CheckCircle,
  MoreVertical,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { StudentRecord, GradeLevel, UserProfile } from '../types';

interface StudentManagementProps {
  currentUser: UserProfile;
  students: StudentRecord[];
  onAddStudent: (student: StudentRecord) => void;
  onRewardStudent: (studentId: string, xpAmount: number) => void;
  onDeleteStudent: (studentId: string) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  currentUser,
  students,
  onAddStudent,
  onRewardStudent,
  onDeleteStudent,
}) => {
  const isTeacher = currentUser.role === 'teacher';
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New student form
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(8);
  const [phone, setPhone] = useState('+998 90 ');
  const [badge, setBadge] = useState('Yosh Dasturchi 🚀');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: StudentRecord = {
      id: 'std-' + Date.now(),
      name: name.trim(),
      grade,
      phone: phone.trim(),
      xp: 200,
      completedQuizzes: 0,
      submittedTasks: 0,
      averageScore: 100,
      lastActive: "Yangi qo'shildi",
      badge,
      status: 'active',
    };

    onAddStudent(newStudent);
    setShowAddModal(false);
    setName('');
    setPhone('+998 90 ');
  };

  const filteredStudents = students.filter((s) => {
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone && s.phone.includes(searchQuery));
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-rose-500/30">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            O'quvchilar Boshqaruvi
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Informatika Sinf O'quvchilari Ro'yxati
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Axadboy Nishanov boshchiligidagi 5-11 sinf o'quvchilari davomati, to'plagan ballari va yutuqlari.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Yangi O'quvchi Qo'shish
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="O'quvchi ismini izlash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <span className="text-xs text-slate-400 font-semibold mr-1">Sinf:</span>
          <button
            onClick={() => setGradeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              gradeFilter === 'all'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Barchasi
          </button>
          {[5, 6, 7, 8, 9, 10, 11].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                gradeFilter === g
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g}-sinf
            </button>
          ))}
        </div>
      </div>

      {/* Students Table / Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">O'quvchi Ismi</th>
                <th className="py-3.5 px-4">Sinf</th>
                <th className="py-3.5 px-4">Bog'lanish (Telefon)</th>
                <th className="py-3.5 px-4">XP Ball</th>
                <th className="py-3.5 px-4">Test & Vazifalar</th>
                <th className="py-3.5 px-4">Unvon (Badge)</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center">
                        {std.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{std.name}</div>
                        <div className="text-[10px] text-slate-400">{std.lastActive}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 font-bold text-xs border border-slate-700">
                      {std.grade}-sinf
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                    {std.phone || 'Kiritilmagan'}
                  </td>

                  <td className="py-3.5 px-4 font-black text-amber-400 text-sm">
                    {std.xp} XP
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <span className="text-emerald-400 font-bold">{std.completedQuizzes} test</span> /{' '}
                    <span className="text-cyan-400 font-bold">{std.submittedTasks} vazifa</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs border border-indigo-500/30 font-medium">
                      {std.badge}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onRewardStudent(std.id, 50)}
                        title="+50 XP Rag'batlantirish"
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Star className="w-3 h-3" />
                        +50 XP
                      </button>

                      {isTeacher && (
                        <button
                          onClick={() => onDeleteStudent(std.id)}
                          title="Ro'yxatdan o'chirish"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/40 text-rose-400 hover:text-rose-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-rose-400" />
              Yangi O'quvchi Qo'shish
            </h3>
            <p className="text-xs text-slate-400">
              Axadboy Nishanovning informatika darsi jurnali uchun yangi o'quvchi ma'lumotlarini kiriting.
            </p>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  O'quvchining F.I.Sh:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Sardor Komilov"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sinf:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>
                        {g}-sinf
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefon raqami:
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dastlabki unvoni (Badge):
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                >
                  <option value="Yosh Dasturchi 🚀">Yosh Dasturchi 🚀</option>
                  <option value="Python Havaskori 🐍">Python Havaskori 🐍</option>
                  <option value="Algoritm Bilimdoni 🧠">Algoritm Bilimdoni 🧠</option>
                  <option value="Web Ijodkori 🌐">Web Ijodkori 🌐</option>
                  <option value="Kiber Qalqon 🛡️">Kiber Qalqon 🛡️</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg"
                >
                  O'quvchini Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
