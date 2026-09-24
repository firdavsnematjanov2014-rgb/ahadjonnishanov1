import React from 'react';
import {
  GraduationCap,
  Gamepad2,
  Trophy,
  UserPlus,
  FileCheck2,
  Bot,
  Sun,
  Moon,
  Sparkles,
  Laptop
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  activeView: 'curriculum' | 'games' | 'leaderboard' | 'register_student' | 'homework' | 'ai';
  onNavigate: (view: any) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenLoginModal: () => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeView,
  onNavigate,
  theme,
  onThemeChange,
  onOpenLoginModal,
  onOpenAiChat,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 border-slate-800/80 bg-slate-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-2">
          {/* Logo and Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('curriculum')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Laptop className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  Informatika Portali
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  5-11 Sinf
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                O'qituvchi: <span className="text-amber-400 font-semibold">Axadboy Nishanov</span>
              </p>
            </div>
          </div>

          {/* Nav links (Library completely removed as requested) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeView === 'curriculum'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Darsliklar & Testlar
            </button>

            <button
              onClick={() => onNavigate('games')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeView === 'games'
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Interaktiv O'yinlar (6 ta)
            </button>

            {/* Dedicated section requested: "yangi o'quvchi qo'shish degan alohida bo'limni ochib qo'y" */}
            <button
              onClick={() => onNavigate('register_student')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeView === 'register_student'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Yangi O'quvchi Qo'shish
            </button>

            <button
              onClick={() => onNavigate('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeView === 'leaderboard'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Reyting
            </button>

            <button
              onClick={() => onNavigate('homework')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeView === 'homework'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              Topshiriqlar
            </button>
          </nav>

          {/* Right actions: Pro AI summon, Themes, User button */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Quick Button */}
            <button
              onClick={onOpenAiChat}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Bot className="w-4 h-4 text-cyan-200" />
              <span className="hidden sm:inline">Pro AI Ustoz</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
            </button>

            {/* Theme selector: Light / Dark / Night */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => onThemeChange('light')}
                title="Yorug' rejim (Light)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === 'light' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onThemeChange('dark')}
                title="Qorong'i rejim (Dark)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === 'dark' ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onThemeChange('night')}
                title="IT Tun rejimi (Cyberpunk Night)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === 'night' ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* User Profile / Login Button */}
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-all text-left"
            >
              <span className="text-xl">{currentUser.avatar || '👨‍🏫'}</span>
              <div className="hidden md:block leading-tight">
                <div className="text-xs font-bold text-white max-w-[120px] truncate">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                  {currentUser.role === 'teacher' ? "O'qituvchi" : `${currentUser.grade}-sinf`}
                  <span>• {currentUser.xp} XP</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => onNavigate('curriculum')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeView === 'curriculum' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900/60'
            }`}
          >
            Darsliklar
          </button>
          <button
            onClick={() => onNavigate('games')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeView === 'games' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-slate-900/60'
            }`}
          >
            O'yinlar (6)
          </button>
          <button
            onClick={() => onNavigate('register_student')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeView === 'register_student' ? 'bg-rose-600 text-white' : 'text-slate-400 bg-slate-900/60'
            }`}
          >
            O'quvchi Qo'shish
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeView === 'leaderboard' ? 'bg-amber-600 text-white' : 'text-slate-400 bg-slate-900/60'
            }`}
          >
            Reyting
          </button>
          <button
            onClick={() => onNavigate('homework')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeView === 'homework' ? 'bg-emerald-600 text-white' : 'text-slate-400 bg-slate-900/60'
            }`}
          >
            Topshiriqlar
          </button>
        </div>
      </div>
    </header>
  );
};
