import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  GradeLevel,
  ThemeMode,
  LessonTopic,
  HomeworkTask,
  HomeworkSubmission,
  StudentRecord,
  LeaderboardUser
} from './types';
import {
  LESSONS_DATA,
  INITIAL_HOMEWORKS,
  INITIAL_STUDENTS,
  INITIAL_LEADERBOARD
} from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { WelcomeModal } from './components/WelcomeModal';
import { GradeView } from './components/GradeView';
import { InteractiveGames } from './components/InteractiveGames';
import { LeaderboardView } from './components/LeaderboardView';
import { HomeworkPortal } from './components/HomeworkPortal';
import { StudentRegisterSection } from './components/StudentRegisterSection';
import { AiAssistant } from './components/AiAssistant';
import { Bot } from 'lucide-react';

export default function App() {
  // Theme state: 'light' | 'dark' | 'night'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('informatika_theme') as ThemeMode) || 'night';
  });

  // Current active view: 'curriculum' | 'games' | 'leaderboard' | 'register_student' | 'homework' | 'ai'
  const [activeView, setActiveView] = useState<
    'curriculum' | 'games' | 'leaderboard' | 'register_student' | 'homework' | 'ai'
  >('curriculum');

  // Selected grade for curriculum & homework
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(8);

  // User profile: Defaulted to teacher Axadboy Nishanov
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('informatika_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: 'teacher-nishanov',
      name: 'Axadboy Nishanov',
      role: 'teacher',
      avatar: '👨‍🏫',
      xp: 2500,
      completedTests: 24,
      completedTasks: 18,
      stars: 50,
      badges: ["Bosh O'qituvchi 🏆", "Informatika Master 💻", "Pro AI Murabbiy 🤖"],
    };
  });

  // Welcome / Login Modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // AI Drawer modal state
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  // Dynamic Lessons State (Allows adding new lessons to any grade!)
  const [lessons, setLessons] = useState<LessonTopic[]>(() => {
    const saved = localStorage.getItem('informatika_lessons_v2');
    return saved ? JSON.parse(saved) : LESSONS_DATA;
  });

  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>(() => {
    const saved = localStorage.getItem('informatika_homeworks');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORKS;
  });

  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(() => {
    const saved = localStorage.getItem('informatika_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Registered students: starts clean; populated when a student registers or teacher adds them
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('informatika_students_clean');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Leaderboard: starts clean; only populated when students register with their names
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(() => {
    const saved = localStorage.getItem('informatika_leaderboard_clean');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('informatika_theme', theme);
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('informatika_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('informatika_lessons_v2', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('informatika_homeworks', JSON.stringify(homeworkTasks));
  }, [homeworkTasks]);

  useEffect(() => {
    localStorage.setItem('informatika_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('informatika_students_clean', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('informatika_leaderboard_clean', JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Handle adding a new lesson (Requested by user)
  const handleAddNewLesson = (newLesson: LessonTopic) => {
    setLessons((prev) => [newLesson, ...prev]);
    setSelectedGrade(newLesson.grade);
  };

  // Add XP to current user and sync with leaderboard
  const handleAddXp = (amount: number, reason: string) => {
    setCurrentUser((prev) => {
      const nextXp = prev.xp + amount;
      return {
        ...prev,
        xp: nextXp,
      };
    });

    if (currentUser.role === 'student') {
      setLeaderboard((prev) => {
        const idx = prev.findIndex((u) => u.name === currentUser.name);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx].xp += amount;
          copy[idx].testsCompleted += 1;
          return copy.sort((a, b) => b.xp - a.xp);
        } else {
          return [
            ...prev,
            {
              rank: prev.length + 1,
              id: currentUser.id,
              name: currentUser.name,
              grade: currentUser.grade || 8,
              xp: currentUser.xp + amount,
              badge: currentUser.badges[0] || 'Faol Bilimdon 🌟',
              testsCompleted: 1,
            },
          ].sort((a, b) => b.xp - a.xp);
        }
      });
    }
  };

  // Add homework task
  const handleAddHomeworkTask = (task: HomeworkTask) => {
    setHomeworkTasks((prev) => [task, ...prev]);
  };

  // Submit student homework
  const handleSubmitHomework = (submission: HomeworkSubmission) => {
    setSubmissions((prev) => [submission, ...prev]);
    handleAddXp(40, 'Topshiriq yuborildi');
  };

  // Grade student homework
  const handleGradeSubmission = (subId: string, score: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === subId
          ? { ...sub, status: 'graded', score, teacherFeedback: feedback }
          : sub
      )
    );
  };

  // Register New Student (Only when student enters their name, appears in Leaderboard!)
  const handleRegisterStudent = (student: StudentRecord) => {
    setStudents((prev) => [student, ...prev]);
    setLeaderboard((prev) => {
      const existing = prev.find((u) => u.name.toLowerCase() === student.name.toLowerCase());
      if (existing) return prev;
      return [
        ...prev,
        {
          rank: prev.length + 1,
          id: student.id,
          name: student.name,
          grade: student.grade,
          xp: student.xp,
          badge: student.badge,
          testsCompleted: 0,
        },
      ].sort((a, b) => b.xp - a.xp);
    });
  };

  // Reward student with XP
  const handleRewardStudent = (studentId: string, xpAmount: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, xp: s.xp + xpAmount } : s))
    );
    setLeaderboard((prev) =>
      prev
        .map((u) => (u.id === studentId ? { ...u, xp: u.xp + xpAmount } : u))
        .sort((a, b) => b.xp - a.xp)
    );
  };

  // Delete student
  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setLeaderboard((prev) => prev.filter((u) => u.id !== studentId));
  };

  // Theme container classes
  const getThemeBgClass = () => {
    if (theme === 'light') return 'bg-slate-50 text-slate-900';
    if (theme === 'dark') return 'bg-slate-950 text-slate-100';
    return 'bg-[#030712] text-slate-100'; // night theme
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${getThemeBgClass()}`}>
      {/* Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        theme={theme}
        onThemeChange={(t) => setTheme(t)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAiChat={() => setIsAiDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Welcome Greeting Banner ("Salom, Axadboy Nishanov!") */}
        <WelcomeBanner
          currentUser={currentUser}
          onNavigate={(view) => setActiveView(view)}
          onOpenAi={() => setIsAiDrawerOpen(true)}
        />

        {/* Dynamic Views */}
        {activeView === 'curriculum' && (
          <GradeView
            currentUser={currentUser}
            lessons={lessons}
            selectedGrade={selectedGrade}
            onSelectGrade={(g) => setSelectedGrade(g)}
            onAddXp={handleAddXp}
            onOpenHomeworkForGrade={(g) => {
              setSelectedGrade(g);
              setActiveView('homework');
            }}
            onAddLesson={handleAddNewLesson}
          />
        )}

        {activeView === 'games' && (
          <InteractiveGames
            currentUser={currentUser}
            onAddXp={handleAddXp}
          />
        )}

        {/* Dedicated Section for Registering Students */}
        {activeView === 'register_student' && (
          <StudentRegisterSection
            currentUser={currentUser}
            students={students}
            onRegisterStudent={handleRegisterStudent}
            onRewardStudent={handleRewardStudent}
            onDeleteStudent={handleDeleteStudent}
            onNavigateToLeaderboard={() => setActiveView('leaderboard')}
          />
        )}

        {activeView === 'leaderboard' && (
          <LeaderboardView
            currentUser={currentUser}
            leaderboardData={leaderboard}
            onNavigateToRegister={() => setActiveView('register_student')}
          />
        )}

        {activeView === 'homework' && (
          <HomeworkPortal
            currentUser={currentUser}
            homeworkTasks={homeworkTasks}
            submissions={submissions}
            onAddHomeworkTask={handleAddHomeworkTask}
            onSubmitHomework={handleSubmitHomework}
            onGradeSubmission={handleGradeSubmission}
            filterGrade={selectedGrade}
          />
        )}
      </main>

      {/* Floating Pro AI Button (bottom right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 text-white font-bold text-sm shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all"
        >
          <Bot className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
          <span>Pro AI Ustoz</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
        </button>
      </div>

      {/* Pro AI Floating Modal / Drawer */}
      <AiAssistant
        currentUser={currentUser}
        currentGrade={selectedGrade}
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />

      {/* Login & Identity Switch Modal */}
      <WelcomeModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onSaveUser={(user) => setCurrentUser(user)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Informatika Ta'lim Portali</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">O'qituvchi: Axadboy Nishanov</span>
          </div>

          <p className="text-slate-400">
            5-11 sinflar uchun interaktiv darsliklar, yangi dars qo'shish, 6 ta ta'limiy o'yin va Pro AI Ustoz
          </p>

          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan
          </div>
        </div>
      </footer>
    </div>
  );
}
