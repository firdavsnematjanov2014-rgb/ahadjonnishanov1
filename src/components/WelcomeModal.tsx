import React, { useState } from 'react';
import { User, GraduationCap, X, Check, Laptop, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile, GradeLevel, UserRole } from '../types';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveUser: (user: UserProfile) => void;
}

const AVATARS = ['👨‍🏫', '👨‍💻', '👩‍💻', '🧑‍🎓', '🤖', '⚡', '🚀', '🧠', '🌟', '💻'];

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveUser,
}) => {
  const [role, setRole] = useState<UserRole>(currentUser.role);
  const [name, setName] = useState(currentUser.name);
  const [grade, setGrade] = useState<GradeLevel>(currentUser.grade || 8);
  const [avatar, setAvatar] = useState(currentUser.avatar || '👨‍🏫');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelectTeacher = () => {
    setRole('teacher');
    setName('Axadboy Nishanov');
    setAvatar('👨‍🏫');
  };

  const handleSelectStudent = () => {
    setRole('student');
    if (name === 'Axadboy Nishanov') {
      setName('');
    }
    setAvatar('👨‍💻');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Iltimos, ismingizni kiriting!');
      return;
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      id: currentUser.id || 'user-' + Date.now(),
      name: name.trim(),
      role,
      grade: role === 'student' ? grade : undefined,
      avatar,
      xp: currentUser.xp || 100,
    };

    onSaveUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close button if user already exists */}
        {currentUser.name && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-1">
            <Laptop className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Informatika Portaliga Kirish
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Darslarda qatnashish, testlar topshirish va natijalarni saqlash uchun profilingizni tanlang
          </p>
        </div>

        {/* Quick Role Selection Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={handleSelectTeacher}
            className={`p-3.5 rounded-2xl border text-left transition-all relative ${
              role === 'teacher'
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800/50 border-slate-750 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl">👨‍🏫</span>
              {role === 'teacher' && <ShieldCheck className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className="font-bold text-sm text-white">Axadboy Nishanov</div>
            <div className="text-[11px] text-indigo-400 font-semibold">O'qituvchi Kabineti</div>
          </button>

          <button
            type="button"
            onClick={handleSelectStudent}
            className={`p-3.5 rounded-2xl border text-left transition-all relative ${
              role === 'student'
                ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg shadow-cyan-600/20'
                : 'bg-slate-800/50 border-slate-750 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl">👨‍🎓</span>
              {role === 'student' && <Check className="w-4 h-4 text-cyan-400" />}
            </div>
            <div className="font-bold text-sm text-white">O'quvchi</div>
            <div className="text-[11px] text-cyan-400 font-semibold">5 - 11 Sinf O'quvchisi</div>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {role === 'teacher' ? "O'qituvchi Ismi va Familiyasi" : "O'quvchining Ismi va Familiyasi"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Masalan: Axadboy Nishanov yoki Jasur Rustamov"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              autoFocus
            />
            {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
          </div>

          {/* Grade selection (Only for students) */}
          {role === 'student' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Sinfingizni tanlang:
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {([5, 6, 7, 8, 9, 10, 11] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      grade === g
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {g}-sinf
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Avatar selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Avatar belgisi:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    avatar === av
                      ? 'bg-indigo-600 scale-110 shadow-lg shadow-indigo-600/40'
                      : 'bg-slate-800/80 hover:bg-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Tizimga Kirish va Boshlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
