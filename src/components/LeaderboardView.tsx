import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  UserPlus,
  ArrowRight,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { LeaderboardUser, GradeLevel, UserProfile } from '../types';

interface LeaderboardViewProps {
  currentUser: UserProfile;
  leaderboardData: LeaderboardUser[];
  onNavigateToRegister?: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentUser,
  leaderboardData,
  onNavigateToRegister,
}) => {
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');

  const filteredUsers = [...leaderboardData]
    .filter((u) => (gradeFilter === 'all' ? true : u.grade === gradeFilter))
    .sort((a, b) => b.xp - a.xp);

  const top3 = filteredUsers.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            Maktab Informatika Reytingi
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Faol va Iqtidorli O'quvchilar Reytingi
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Faqat ro'yxatdan o'tgan o'quvchilar testlar, topshiriqlar va o'yinlarda to'plagan ballari bo'yicha saralanadi.
          </p>
        </div>

        {onNavigateToRegister && (
          <button
            onClick={onNavigateToRegister}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/30 flex items-center gap-2 self-start sm:self-auto transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yangi O'quvchi Qo'shish</span>
          </button>
        )}
      </div>

      {/* Grade Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-slate-400 font-semibold mr-1">Filtr:</span>
        <button
          onClick={() => setGradeFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            gradeFilter === 'all'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Barcha Sinflar
        </button>

        {[5, 6, 7, 8, 9, 10, 11].map((g) => (
          <button
            key={g}
            onClick={() => setGradeFilter(g)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              gradeFilter === g
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {g}-sinf
          </button>
        ))}
      </div>

      {/* Empty State when no registered students exist yet */}
      {filteredUsers.length === 0 ? (
        <div className="p-12 md:p-16 text-center rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center text-4xl shadow-inner">
            🏆
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-white">
              Reytingda hozircha o'quvchilar yo'q
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              O'quvchi o'z ismini yozib ro'yxatdan o'tsagina reyting jadvaliga qo'shiladi.
              "Yangi o'quvchi qo'shish" bo'limi orqali o'zingizni qo'shing va 1-o'rinni egallang!
            </p>
          </div>

          {onNavigateToRegister && (
            <div className="pt-2">
              <button
                onClick={onNavigateToRegister}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-indigo-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 inline-flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>O'quvchi sifatida ro'yxatdan o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Podium (Top 3) */}
          {top3.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-end">
              {/* 2nd place */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700 text-center flex flex-col items-center relative order-2 md:order-1 shadow-lg">
                <div className="w-14 h-14 rounded-full bg-slate-400/20 border-2 border-slate-300 text-slate-300 flex items-center justify-center font-black text-xl mb-3 shadow-md">
                  2
                </div>
                <h4 className="text-base font-bold text-white truncate max-w-full">
                  {top3[1].name}
                </h4>
                <div className="text-xs text-slate-400">{top3[1].grade}-sinf o'quvchisi</div>
                <div className="mt-3 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-bold font-mono">
                  {top3[1].xp} XP
                </div>
                <div className="mt-2 text-xs text-cyan-400 font-semibold">{top3[1].badge}</div>
              </div>

              {/* 1st place (Champion) */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/80 via-slate-900 to-indigo-950/80 border-2 border-amber-400/80 text-center flex flex-col items-center relative order-1 md:order-2 shadow-2xl scale-105">
                <Crown className="w-8 h-8 text-amber-400 absolute -top-4" />
                <div className="w-18 h-18 rounded-full bg-amber-500/20 border-4 border-amber-400 text-amber-300 flex items-center justify-center font-black text-3xl mb-3 shadow-xl shadow-amber-500/30">
                  🥇
                </div>
                <h4 className="text-lg font-black text-amber-200 truncate max-w-full">
                  {top3[0].name}
                </h4>
                <div className="text-xs text-amber-300/80 font-medium">{top3[0].grade}-sinf chempioni</div>
                <div className="mt-3 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-sm font-black font-mono shadow-md">
                  {top3[0].xp} XP
                </div>
                <div className="mt-2 text-xs text-amber-300 font-bold">{top3[0].badge}</div>
              </div>

              {/* 3rd place */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-700/50 text-center flex flex-col items-center relative order-3 shadow-lg">
                <div className="w-14 h-14 rounded-full bg-amber-700/20 border-2 border-amber-600 text-amber-500 flex items-center justify-center font-black text-xl mb-3 shadow-md">
                  3
                </div>
                <h4 className="text-base font-bold text-white truncate max-w-full">
                  {top3[2].name}
                </h4>
                <div className="text-xs text-slate-400">{top3[2].grade}-sinf o'quvchisi</div>
                <div className="mt-3 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold font-mono">
                  {top3[2].xp} XP
                </div>
                <div className="mt-2 text-xs text-cyan-400 font-semibold">{top3[2].badge}</div>
              </div>
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Medal className="w-5 h-5 text-indigo-400" />
              Natijalar Jadvali ({filteredUsers.length} nafar o'quvchi)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">O'rin</th>
                    <th className="py-3 px-4">O'quvchi</th>
                    <th className="py-3 px-4">Sinf</th>
                    <th className="py-3 px-4">Unvoni</th>
                    <th className="py-3 px-4 text-right">Umumiy XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredUsers.map((user, idx) => {
                    const isCurrent = user.name === currentUser.name;
                    return (
                      <tr
                        key={user.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isCurrent ? 'bg-indigo-950/40 border-l-4 border-indigo-500 font-bold' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-black">
                          {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <span>{user.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500 text-white font-normal">
                                Siz
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold text-xs">
                            {user.grade}-sinf
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">{user.badge}</td>
                        <td className="py-3.5 px-4 text-right font-black text-amber-400 font-mono text-sm">
                          {user.xp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
