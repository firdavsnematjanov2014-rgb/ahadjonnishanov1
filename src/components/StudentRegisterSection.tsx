import React, { useState } from 'react';
import {
  UserPlus,
  Sparkles,
  Trophy,
  CheckCircle,
  Star,
  Search,
  Users,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  Flame,
  Trash2
} from 'lucide-react';
import { StudentRecord, GradeLevel, UserProfile } from '../types';

interface StudentRegisterSectionProps {
  currentUser: UserProfile;
  students: StudentRecord[];
  onRegisterStudent: (student: StudentRecord) => void;
  onRewardStudent: (studentId: string, amount: number) => void;
  onDeleteStudent: (studentId: string) => void;
  onNavigateToLeaderboard: () => void;
}

const AVATARS = ['👨‍💻', '👩‍💻', '🧑‍🎓', '🚀', '⚡', '🤖', '🧠', '🌟', '💻', '🎯', '🔥', '🛡️'];

const INTERESTS = [
  { label: 'Python Dasturlash', badge: 'Python Ustasi 🐍' },
  { label: 'Web Texnologiyalar (HTML/CSS)', badge: 'Web Ijodkori 🌐' },
  { label: 'Algoritmlar va Mantiq', badge: 'Algoritm Bilimdoni 🧠' },
  { label: 'Sun\'iy Intellekt & ML', badge: 'AI Tadqiqotchi 🤖' },
  { label: 'Kiberxavfsizlik & Tarmoq', badge: 'Kiber Qalqon 🛡️' },
  { label: 'Kompyuter Savodxonligi', badge: 'Yosh IT-chi 💻' },
];

export const StudentRegisterSection: React.FC<StudentRegisterSectionProps> = ({
  currentUser,
  students,
  onRegisterStudent,
  onRewardStudent,
  onDeleteStudent,
  onNavigateToLeaderboard,
}) => {
  const isTeacher = currentUser.role === 'teacher';

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(8);
  const [selectedInterest, setSelectedInterest] = useState(INTERESTS[0]);
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍💻');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState<StudentRecord | null>(null);

  // Search & Filter for Registered List
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Iltimos, o'quvchining ismi va familiyasini kiriting!");
      return;
    }

    const newStudent: StudentRecord = {
      id: 'student-' + Date.now(),
      name: fullName.trim(),
      grade: selectedGrade,
      phone: phone.trim() || undefined,
      xp: 150, // Initial registration starter bonus
      completedQuizzes: 0,
      submittedTasks: 0,
      averageScore: 100,
      lastActive: 'Hozir ro\'yxatdan o\'tdi',
      badge: selectedInterest.badge,
      status: 'active',
    };

    onRegisterStudent(newStudent);
    setSuccessInfo(newStudent);
    setFullName('');
    setPhone('');
    setErrorMsg('');
  };

  const filteredStudents = students.filter((s) => {
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone && s.phone.includes(searchQuery));
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/70 border border-rose-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold">
            <UserPlus className="w-4 h-4 text-rose-400" />
            <span>YANGI O'QUVCHI RO'YXATDAN O'TISH BO'LIMI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            O'zingizni Ro'yxatdan O'tkazing va Reytingga Qo'shiling!
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Har bir o'quvchi o'z ismini yozib ro'yxatdan o'tgach, maktabning umumiy informatika reyting jadvalida paydo bo'ladi.
            Testlarni yechib, o'yinlarda qatnashib, Axadboy Nishanov darslarida XP ballaringizni oshiring!
          </p>
        </div>
      </div>

      {/* Main Registration Form Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              O'quvchi Ro'yxatdan O'tish Formasi
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ism va sinfingizni tanlang, boshlang'ich +150 XP bonusiga ega bo'ling!
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            +150 XP Boshlang'ich Bonus
          </span>
        </div>

        {/* Success Modal / Alert */}
        {successInfo && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                🎉
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  Tabriklaymiz, {successInfo.name}!
                </h4>
                <p className="text-xs text-emerald-300">
                  Siz {successInfo.grade}-sinf o'quvchisi sifatida reytingga muvaffaqiyatli qo'shildingiz (+150 XP).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setSuccessInfo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Yana qo'shish
              </button>
              <button
                onClick={onNavigateToLeaderboard}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5" />
                Reytingda ko'rish
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                O'quvchining Ismi va Familiyasi <span className="text-rose-400">*</span>:
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Masalan: Sardor Komilov yoki Dilnoza Umarova"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm font-medium"
                required
              />
              {errorMsg && <p className="text-xs text-rose-400 mt-1.5">{errorMsg}</p>}
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Telefon yoki Bog'lanish (Ixtiyoriy):
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123-45-67"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-sm font-mono"
              />
            </div>
          </div>

          {/* Grade selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Sinfingizni tanlang:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {([5, 6, 7, 8, 9, 10, 11] as GradeLevel[]).map((g) => {
                const isSelected = selectedGrade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-0.5 border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white border-rose-400 shadow-lg shadow-rose-600/30 scale-105'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 uppercase">Sinf</span>
                    <span className="text-base font-black">{g}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interest / Direction */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Qiziqish yo'nalishingiz va unvoningiz:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {INTERESTS.map((item, idx) => {
                const isChosen = selectedInterest.label === item.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedInterest(item)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isChosen
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-indigo-400 font-semibold">{item.badge}</div>
                    </div>
                    {isChosen && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Avatar belgisini tanlang:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-11 h-11 rounded-2xl text-xl flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'bg-rose-600 scale-110 shadow-lg shadow-rose-600/40 text-white'
                      : 'bg-slate-950 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>O'quvchini Ro'yxatdan O'tkazish va Reytingga Qo'shish</span>
            </button>
          </div>
        </form>
      </div>

      {/* Currently Registered Students List */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Ro'yxatdan O'tgan O'quvchilar ({students.length} nafar)
            </h3>
            <p className="text-xs text-slate-400">
              Ushbu o'quvchilar platformada faoliyat yuritib, reytingda ball to'plamoqda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Ismni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Grade filter */}
            <select
              value={gradeFilter}
              onChange={(e) =>
                setGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
            >
              <option value="all">Barcha sinflar</option>
              {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                <option key={g} value={g}>
                  {g}-sinf
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table or Empty state */}
        {students.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-3xl">
              📝
            </div>
            <h4 className="text-base font-bold text-white">
              Hozircha o'quvchilar ro'yxatdan o'tmagan
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Yuqoridagi formadan o'z ismingizni yozib birinchi bo'lib ro'yxatdan o'ting!
              Siz to'plagan ballar to'g'ridan-to'g'ri reyting shohsupasiga chiqadi.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">O'quvchi</th>
                  <th className="py-3 px-4">Sinf</th>
                  <th className="py-3 px-4">Yo'nalish / Unvon</th>
                  <th className="py-3 px-4">XP Ball</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {std.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{std.name}</div>
                          <div className="text-[10px] text-slate-400">{std.lastActive}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-cyan-300 font-bold text-xs">
                        {std.grade}-sinf
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-xs text-indigo-300 font-medium">
                        {std.badge}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-black text-amber-400 font-mono text-sm">
                      {std.xp} XP
                    </td>

                    <td className="py-3 px-4 text-right">
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
                            title="O'chirish"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/40 text-rose-400 hover:text-rose-200"
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
        )}
      </div>
    </div>
  );
};
