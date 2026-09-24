import React from 'react';
import { Sparkles, Terminal, BookOpen, Gamepad2, Bot, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomeBannerProps {
  currentUser: UserProfile;
  onNavigate: (view: any) => void;
  onOpenAi: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ currentUser, onNavigate, onOpenAi }) => {
  const isTeacher = currentUser.role === 'teacher';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-950 border border-indigo-500/30 p-6 md:p-8 shadow-2xl shadow-indigo-950/50">
      {/* Decorative background glow & code grid */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>INFORMATIKA DARSI PORTALI</span>
            <span className="text-slate-400">•</span>
            <span className="text-indigo-300">5 - 11 SINFLAR</span>
          </div>

          {/* User Request Requirement: "kirishing bilan salom Axadboy Nishanov deb yozuv tusin" */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Salom,{' '}
            <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              {isTeacher ? 'Axadboy Nishanov' : currentUser.name}!
            </span>{' '}
            👋
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {isTeacher
              ? "Bugungi informatika darsingizga xush kelibsiz! Bu yerda 5-dan 11-sinfgacha barcha darsliklar, interaktiv testlar, kodlash o'yinlari, o'quvchilarni boshqarish va topshiriqlarni tekshirish imkoniyati jamlangan."
              : `Bugungi darsingizga xush kelibsiz! ${currentUser.grade || 8}-sinf informatika darsliklarini o'qing, testlarni yeching, o'yinlarda XP to'plang va AI ustoz bilan dasturlashni o'rganing.`}
          </p>

          {/* Quick chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              5-11 Sinf Darsliklari
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
              Interaktiv O'yinlar
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Reyting & XP Tizimi
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              Ovozli AI Ustoz
            </span>
          </div>
        </div>

        {/* Action buttons & Card widget */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('curriculum')}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Darsliklar va Testlarga o'tish
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAi}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border-2 border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-bold text-sm shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            AI Ustozga Savol Berish
          </button>
        </div>
      </div>
    </div>
  );
};
