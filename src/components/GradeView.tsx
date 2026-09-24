import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  FileQuestion,
  Code,
  Terminal,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  Plus,
  X,
  Check
} from 'lucide-react';
import { GradeLevel, LessonTopic, QuizQuestion, UserProfile } from '../types';
import { GRADE_INFO } from '../data/curriculumData';

interface GradeViewProps {
  currentUser: UserProfile;
  lessons: LessonTopic[];
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onAddXp: (amount: number, reason: string) => void;
  onOpenHomeworkForGrade: (grade: GradeLevel) => void;
  onAddLesson: (newLesson: LessonTopic) => void;
}

export const GradeView: React.FC<GradeViewProps> = ({
  currentUser,
  lessons,
  selectedGrade,
  onSelectGrade,
  onAddXp,
  onOpenHomeworkForGrade,
  onAddLesson,
}) => {
  // Lessons for the active grade
  const gradeLessons = lessons.filter((l) => l.grade === selectedGrade);
  const [activeLessonId, setActiveLessonId] = useState<string>(
    gradeLessons[0]?.id || ''
  );

  // Active view inside the lesson: 'content' | 'quiz' | 'video' | 'practice'
  const [lessonSubTab, setLessonSubTab] = useState<'content' | 'quiz' | 'video' | 'practice'>('content');

  // Currently viewed lesson
  const currentLesson = gradeLessons.find((l) => l.id === activeLessonId) || gradeLessons[0];

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // "Yangi dars qo'shish" Modal State
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonSubtitle, setNewLessonSubtitle] = useState('');
  const [newLessonGrade, setNewLessonGrade] = useState<GradeLevel>(selectedGrade);
  const [newLessonChapter, setNewLessonChapter] = useState(gradeLessons.length + 1);
  const [newLessonDuration, setNewLessonDuration] = useState(45);
  const [newLessonOverview, setNewLessonOverview] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [newLessonCode, setNewLessonCode] = useState('');
  const [newLessonCodeLang, setNewLessonCodeLang] = useState('python');
  const [newLessonPractice, setNewLessonPractice] = useState('');

  // Sample quiz for new lesson
  const [newQuizQ, setNewQuizQ] = useState('');
  const [newQuizOptA, setNewQuizOptA] = useState('');
  const [newQuizOptB, setNewQuizOptB] = useState('');
  const [newQuizOptC, setNewQuizOptC] = useState('');
  const [newQuizOptD, setNewQuizOptD] = useState('');
  const [newQuizCorrect, setNewQuizCorrect] = useState(0);

  // Switch lesson
  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setLessonSubTab('content');
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Switch grade
  const handleGradeChange = (grade: GradeLevel) => {
    onSelectGrade(grade);
    const firstLessonOfGrade = lessons.find((l) => l.grade === grade);
    if (firstLessonOfGrade) {
      setActiveLessonId(firstLessonOfGrade.id);
    }
    setLessonSubTab('content');
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Handle quiz option select
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    if (!currentLesson?.quiz) return;
    let totalPoints = 0;
    let earned = 0;

    currentLesson.quiz.forEach((q) => {
      totalPoints += q.points;
      if (selectedAnswers[q.id] === q.correctIndex) {
        earned += q.points;
      }
    });

    setQuizScore(earned);
    setQuizSubmitted(true);

    if (earned > 0) {
      onAddXp(earned, `${currentLesson.title} testi`);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Submit New Lesson
  const handleCreateLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newLessonContent.trim()) {
      alert("Iltimos, dars nomi va konspekt matnini to'liq yozing!");
      return;
    }

    const quizzes: QuizQuestion[] = [];
    if (newQuizQ.trim() && newQuizOptA.trim() && newQuizOptB.trim()) {
      quizzes.push({
        id: 'q-' + Date.now(),
        question: newQuizQ.trim(),
        options: [
          newQuizOptA.trim(),
          newQuizOptB.trim(),
          newQuizOptC.trim() || 'Javob C',
          newQuizOptD.trim() || 'Javob D',
        ],
        correctIndex: Number(newQuizCorrect),
        explanation: "Axadboy Nishanov darsligi bo'yicha to'g'ri javob.",
        points: 15,
      });
    }

    const newLesson: LessonTopic = {
      id: 'lesson-' + Date.now(),
      grade: newLessonGrade,
      chapterNumber: Number(newLessonChapter),
      title: newLessonTitle.trim(),
      subtitle: newLessonSubtitle.trim() || "Informatika fani bo'yicha yangi dars mavzusi.",
      durationMinutes: Number(newLessonDuration),
      overview: newLessonOverview.trim() || newLessonTitle.trim(),
      sections: [
        {
          title: "1. Asosiy tushunchalar va nazariya",
          content: newLessonContent.trim(),
          codeExample: newLessonCode.trim() || undefined,
          codeLanguage: newLessonCodeLang,
        },
      ],
      keyTerms: [newLessonTitle.split(' ')[0], "Informatika", "Amaliyot"],
      practicalTask: {
        title: "Amaliy topshiriq",
        description: newLessonPractice.trim() || "Darsda o'rganilgan mavzuni amalda mustahkamlang.",
      },
      quiz: quizzes.length > 0 ? quizzes : [
        {
          id: 'q-default-' + Date.now(),
          question: `${newLessonTitle} bo'yicha asosiy tushuncha qaysi?`,
          options: ["To'g'ri tushuncha", "Noto'g'ri variant", "Qo'shimcha variant", "Boshqa"],
          correctIndex: 0,
          explanation: "Mavzu konspektiga e'tibor bering.",
          points: 10,
        },
      ],
    };

    onAddLesson(newLesson);
    setActiveLessonId(newLesson.id);
    setShowAddLessonModal(false);

    // Reset form
    setNewLessonTitle('');
    setNewLessonSubtitle('');
    setNewLessonOverview('');
    setNewLessonContent('');
    setNewLessonCode('');
    setNewLessonPractice('');
    setNewQuizQ('');
    setNewQuizOptA('');
    setNewQuizOptB('');
    setNewQuizOptC('');
    setNewQuizOptD('');
  };

  const activeGradeMeta = GRADE_INFO[selectedGrade];

  return (
    <div className="space-y-6">
      {/* Grade Selector Tabs: 5, 6, 7, 8, 9, 10, 11 */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Sinflar Bo'yicha Informatika Darsliklari
          </h2>

          <div className="flex items-center gap-2">
            {/* User Requested: "hamda darslar borku ana usha darslarga yana darslarni qo'shish mumkin bo'lisin" */}
            <button
              onClick={() => {
                setNewLessonGrade(selectedGrade);
                setShowAddLessonModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Dars Qo'shish</span>
            </button>

            <span className="text-xs text-slate-400 hidden sm:inline">
              Tanlangan: <strong className="text-cyan-400">{selectedGrade}-sinf</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {([5, 6, 7, 8, 9, 10, 11] as GradeLevel[]).map((grade) => {
            const isSelected = selectedGrade === grade;
            const countForGrade = lessons.filter((l) => l.grade === grade).length;
            return (
              <button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                className={`py-3 px-3 rounded-2xl font-bold text-sm transition-all flex flex-col items-center justify-center gap-0.5 border ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-600 to-blue-700 text-white border-indigo-400/80 shadow-lg shadow-indigo-600/30 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400">{grade}-Sinf</span>
                <span className="text-lg font-black">{grade}</span>
                <span className="text-[10px] text-cyan-400 font-normal">{countForGrade} ta dars</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grade Overview Header */}
      <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeGradeMeta.color} bg-opacity-20 border border-slate-700/50 backdrop-blur-md relative overflow-hidden text-white`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-black/30 text-xs font-semibold uppercase tracking-wider mb-2">
              Davlat Ta'lim Standarti Dasturi
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              {activeGradeMeta.title}
            </h3>
            <p className="text-white/80 text-sm mt-1 max-w-2xl">
              {activeGradeMeta.desc}
            </p>
          </div>

          <button
            onClick={() => onOpenHomeworkForGrade(selectedGrade)}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <span>{selectedGrade}-sinf topshiriqlari</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grade Curriculum Layout: Sidebar Topics + Active Topic Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topics List (Left Column) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-sm font-bold text-slate-300 px-1 flex items-center justify-between">
            <span>Dars mavzulari ({gradeLessons.length} ta)</span>
            <button
              onClick={() => {
                setNewLessonGrade(selectedGrade);
                setShowAddLessonModal(true);
              }}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3 h-3" />
              Dars qo'shish
            </button>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto no-scrollbar">
            {gradeLessons.map((lesson, idx) => {
              const isActive = lesson.id === (currentLesson?.id || '');
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-600/10'
                      : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-bold leading-snug line-clamp-2 ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                        {lesson.subtitle}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.durationMinutes} daq
                        </span>
                        <span>•</span>
                        <span className="text-indigo-400 font-semibold">
                          {lesson.quiz?.length || 0} ta test
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Topic Detail View (Right Column) */}
        {currentLesson ? (
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
            {/* Topic Header & Subtabs */}
            <div className="border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedGrade}-sinf • {currentLesson.chapterNumber}-bob
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentLesson.durationMinutes} daqiqalik darslik
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white">
                {currentLesson.title}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {currentLesson.subtitle}
              </p>

              {/* Subtabs: Nazariya, Testlar, Amaliyot */}
              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  onClick={() => setLessonSubTab('content')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    lessonSubTab === 'content'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Nazariy Darslik
                </button>

                <button
                  onClick={() => setLessonSubTab('quiz')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    lessonSubTab === 'quiz'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FileQuestion className="w-4 h-4" />
                  Interaktiv Test ({currentLesson.quiz?.length || 0})
                </button>

                <button
                  onClick={() => setLessonSubTab('practice')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    lessonSubTab === 'practice'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  Amaliy Mashg'ulot
                </button>
              </div>
            </div>

            {/* TAB 1: CONTENT */}
            {lessonSubTab === 'content' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-slate-300 text-sm leading-relaxed">
                  <strong className="text-indigo-400 font-semibold block mb-1">
                    Darsning qisqacha mazmuni:
                  </strong>
                  {currentLesson.overview}
                </div>

                {currentLesson.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {sec.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>

                    {sec.codeExample && (
                      <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner">
                        <div className="px-4 py-2 bg-slate-800/60 border-b border-slate-700 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-2 text-cyan-400 font-bold">
                            <Code className="w-3.5 h-3.5" />
                            {sec.codeLanguage?.toUpperCase() || 'KOD NAMUNASI'}
                          </span>
                          <span>Informatika dars kodi</span>
                        </div>
                        <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto">
                          <code>{sec.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    {sec.note && (
                      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{sec.note}</span>
                      </div>
                    )}
                  </div>
                ))}

                {currentLesson.keyTerms?.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Asosiy kalit atamalar:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentLesson.keyTerms.map((term, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-slate-800 text-cyan-300 text-xs font-medium border border-slate-700"
                        >
                          #{term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setLessonSubTab('quiz')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>Mavzuni test bilan mustahkamlash</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE QUIZ */}
            {lessonSubTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Mavzulashtirilgan Test Sinovi
                    </h3>
                    <p className="text-xs text-slate-400">
                      Har bir to'g'ri javob uchun XP ball beriladi!
                    </p>
                  </div>

                  {quizSubmitted && (
                    <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-bold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      To'plangan: {quizScore} ball
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  {currentLesson.quiz?.map((q, qIndex) => {
                    const selectedIdx = selectedAnswers[q.id];

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600/40 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {qIndex + 1}
                          </span>
                          <div className="text-sm sm:text-base font-semibold text-white">
                            {q.question}
                          </div>
                        </div>

                        {q.codeSnippet && (
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                            {q.codeSnippet}
                          </div>
                        )}

                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedIdx === optIdx;
                            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                            if (quizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                              } else if (isSelected && optIdx !== q.correctIndex) {
                                btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                              } else {
                                btnStyle = 'bg-slate-900/40 border-slate-850 text-slate-500';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                disabled={quizSubmitted}
                                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </span>

                                {quizSubmitted && optIdx === q.correctIndex && (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-white">Izoh: </strong>
                              {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-amber-600/30 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Test Natijasini Tekshirish
                    </button>
                  ) : (
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Testni Qaytadan Topshirish
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: PRACTICAL TASK */}
            {lessonSubTab === 'practice' && (
              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Terminal className="w-4 h-4" />
                    Amaliy Mashg'ulot Topshirig'i
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {currentLesson.practicalTask.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {currentLesson.practicalTask.description}
                  </p>

                  {currentLesson.practicalTask.sampleSolution && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Namunaviy yechim:
                      </span>
                      <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                        <code>{currentLesson.practicalTask.sampleSolution}</code>
                      </pre>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs text-slate-400">
                      Ishingizni tayyorlab, topshiriqlar bo'limida fayl sifatida yuklashingiz mumkin.
                    </span>
                    <button
                      onClick={() => onOpenHomeworkForGrade(selectedGrade)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 flex items-center gap-2"
                    >
                      Topshiriq yuklash sahifasiga o'tish
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Modal: Add New Lesson */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setShowAddLessonModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
                <Plus className="w-3.5 h-3.5" />
                YANGI DARSLIK QO'SHISH
              </div>
              <h3 className="text-xl font-bold text-white">
                Informatika Fani Bo'yicha Yangi Dars Qo'shish
              </h3>
              <p className="text-xs text-slate-400">
                Axadboy Nishanov dars dasturiga yangi mavzu, nazariya, kod va test kiritish
              </p>
            </div>

            <form onSubmit={handleCreateLessonSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Dars Mavzusi (Sarlavha) *:
                  </label>
                  <input
                    type="text"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="Masalan: Python da funksiyalar va return"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sinf:
                  </label>
                  <select
                    value={newLessonGrade}
                    onChange={(e) => setNewLessonGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>
                        {g}-sinf
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Qisqacha mazmun (Subtitle):
                </label>
                <input
                  type="text"
                  value={newLessonSubtitle}
                  onChange={(e) => setNewLessonSubtitle(e.target.value)}
                  placeholder="Darsda nimalar o'rganilishi haqida qisqa satr"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nazariy Darslik Matni (Konspekt) *:
                </label>
                <textarea
                  rows={4}
                  value={newLessonContent}
                  onChange={(e) => setNewLessonContent(e.target.value)}
                  placeholder="Mavzuning batafsil tushuntirilishi, qoidalar va ta'riflar..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kod namunasi (ixtiyoriy):
                  </label>
                  <textarea
                    rows={3}
                    value={newLessonCode}
                    onChange={(e) => setNewLessonCode(e.target.value)}
                    placeholder="def salom():\n    print('Salom, Informatika!')"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Til:
                  </label>
                  <select
                    value={newLessonCodeLang}
                    onChange={(e) => setNewLessonCodeLang(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="cpp">C++</option>
                    <option value="sql">SQL</option>
                    <option value="javascript">JavaScript</option>
                    <option value="scratch">Scratch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Amaliy Topshiriq matni:
                </label>
                <input
                  type="text"
                  value={newLessonPractice}
                  onChange={(e) => setNewLessonPractice(e.target.value)}
                  placeholder="Masalan: Konsolga 1 dan 10 gacha sonlarni chiqaruvchi dastur tuzing"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              {/* Quick Quiz Section for New Lesson */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Dars uchun test savoli qo'shish:
                </span>
                <input
                  type="text"
                  value={newQuizQ}
                  onChange={(e) => setNewQuizQ(e.target.value)}
                  placeholder="Test savoli matni..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newQuizOptA}
                    onChange={(e) => setNewQuizOptA(e.target.value)}
                    placeholder="Variant A (To'g'ri bo'lishi mumkin)"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newQuizOptB}
                    onChange={(e) => setNewQuizOptB(e.target.value)}
                    placeholder="Variant B"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newQuizOptC}
                    onChange={(e) => setNewQuizOptC(e.target.value)}
                    placeholder="Variant C"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newQuizOptD}
                    onChange={(e) => setNewQuizOptD(e.target.value)}
                    placeholder="Variant D"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-xs"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>To'g'ri javob:</span>
                  <select
                    value={newQuizCorrect}
                    onChange={(e) => setNewQuizCorrect(Number(e.target.value))}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value={0}>Variant A</option>
                    <option value={1}>Variant B</option>
                    <option value={2}>Variant C</option>
                    <option value={3}>Variant D</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Darsni Saqlash va Chiqarish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
