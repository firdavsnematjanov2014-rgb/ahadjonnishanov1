import React, { useState } from 'react';
import {
  FileCheck2,
  Upload,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  Send,
  FileText,
  Download,
  Award,
  AlertCircle,
  FileCode,
  FileImage,
  ChevronDown
} from 'lucide-react';
import { HomeworkTask, HomeworkSubmission, GradeLevel, UserProfile } from '../types';

interface HomeworkPortalProps {
  currentUser: UserProfile;
  homeworkTasks: HomeworkTask[];
  submissions: HomeworkSubmission[];
  onAddHomeworkTask: (task: HomeworkTask) => void;
  onSubmitHomework: (sub: HomeworkSubmission) => void;
  onGradeSubmission: (subId: string, score: number, feedback: string) => void;
  filterGrade?: GradeLevel | null;
}

export const HomeworkPortal: React.FC<HomeworkPortalProps> = ({
  currentUser,
  homeworkTasks,
  submissions,
  onAddHomeworkTask,
  onSubmitHomework,
  onGradeSubmission,
  filterGrade = null,
}) => {
  const isTeacher = currentUser.role === 'teacher';
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | 'all'>(
    filterGrade || (currentUser.grade || 'all')
  );

  // Active task for student submission
  const [activeTaskForSubmit, setActiveTaskForSubmit] = useState<HomeworkTask | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; dataUrl: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Teacher modal to create task
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskGrade, setNewTaskGrade] = useState<GradeLevel>(8);
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('2026-10-15');
  const [newTaskMaxScore, setNewTaskMaxScore] = useState(100);

  // Teacher grading state
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradingScore, setGradingScore] = useState(90);
  const [gradingFeedback, setGradingFeedback] = useState('Yaxshi bajarilgan!');

  // Filter tasks
  const filteredTasks = homeworkTasks.filter((t) =>
    selectedGradeFilter === 'all' ? true : t.grade === selectedGradeFilter
  );

  // File change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Submit student homework
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTaskForSubmit) return;
    if (!answerText.trim() && !uploadedFile) {
      alert("Iltimos, javob matnini yozing yoki fayl yuklang!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newSubmission: HomeworkSubmission = {
        id: 'sub-' + Date.now(),
        homeworkId: activeTaskForSubmit.id,
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentGrade: (currentUser.grade || activeTaskForSubmit.grade) as GradeLevel,
        submittedAt: 'Bugun, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        textAnswer: answerText,
        fileName: uploadedFile?.name,
        fileData: uploadedFile?.dataUrl,
        fileSize: uploadedFile?.size,
        status: 'pending',
      };

      onSubmitHomework(newSubmission);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveTaskForSubmit(null);
        setAnswerText('');
        setUploadedFile(null);
      }, 1500);
    }, 400);
  };

  // Create new task by teacher
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: HomeworkTask = {
      id: 'hw-' + Date.now(),
      title: newTaskTitle.trim(),
      grade: newTaskGrade,
      description: newTaskDesc.trim(),
      deadline: newTaskDeadline,
      maxScore: Number(newTaskMaxScore),
      createdBy: 'Axadboy Nishanov',
      createdAt: new Date().toISOString().split('T')[0],
      submissionsCount: 0,
    };

    onAddHomeworkTask(task);
    setShowCreateModal(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            Topshiriqlar va Uyga Vazifalar Portali
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Topshiriq Yuklash va Baholash Tizimi
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Informatika amaliy ishlari, dasturlash kodlari va ijodiy loyihalarni yuklang va tekshiring.
          </p>
        </div>

        {isTeacher && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Yangi topshiriq e'lon qilish
          </button>
        )}
      </div>

      {/* Grade Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-slate-400 font-semibold mr-1">Sinf:</span>
        <button
          onClick={() => setSelectedGradeFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedGradeFilter === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Barcha sinflar
        </button>

        {([5, 6, 7, 8, 9, 10, 11] as GradeLevel[]).map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGradeFilter(g)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedGradeFilter === g
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {g}-sinf
          </button>
        ))}
      </div>

      {/* Grid of Homework Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.map((task) => {
          const studentSub = submissions.find(
            (s) => s.homeworkId === task.id && s.studentName === currentUser.name
          );
          const taskSubs = submissions.filter((s) => s.homeworkId === task.id);

          return (
            <div
              key={task.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    {task.grade}-sinf vazifasi
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Muddat: {task.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {task.description}
                </p>

                {task.attachmentName && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-indigo-300">
                    <span className="flex items-center gap-2 truncate">
                      <FileCode className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {task.attachmentName}
                    </span>
                    <span className="text-[10px] text-slate-400">Shablon</span>
                  </div>
                )}
              </div>

              {/* Status and Action */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Maksimal ball:</span>
                  <span className="font-bold text-amber-400">{task.maxScore} ball</span>
                </div>

                {isTeacher ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Topshirganlar: <strong className="text-emerald-400">{taskSubs.length} nafar</strong>
                    </span>
                    <button
                      onClick={() => setSelectedGradeFilter(task.grade)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                    >
                      Barchasini ko'rish
                    </button>
                  </div>
                ) : (
                  <div>
                    {studentSub ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          Topshirilgan
                        </span>
                        {studentSub.status === 'graded' ? (
                          <span className="font-bold text-amber-300">
                            Baho: {studentSub.score}/{task.maxScore}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Tekshirilmoqda</span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTaskForSubmit(task)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Javob yoki Fayl Yuklash
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions Review Table for Teacher */}
      {isTeacher && (
        <div className="mt-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              O'quvchilar Topshirgan Vazifalar ({submissions.length} ta)
            </h3>
            <span className="text-xs text-slate-400">O'qituvchi: Axadboy Nishanov tekshiruvi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">O'quvchi</th>
                  <th className="py-3 px-4">Sinf</th>
                  <th className="py-3 px-4">Vazifa</th>
                  <th className="py-3 px-4">Fayl / Javob</th>
                  <th className="py-3 px-4">Holat / Baho</th>
                  <th className="py-3 px-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.map((sub) => {
                  const task = homeworkTasks.find((t) => t.id === sub.homeworkId);
                  return (
                    <tr key={sub.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white">
                        {sub.studentName}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-xs font-bold">
                          {sub.studentGrade}-sinf
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-200">
                        {task?.title || 'Topshiriq'}
                      </td>
                      <td className="py-3 px-4">
                        {sub.fileName ? (
                          <span className="flex items-center gap-1.5 text-cyan-300 font-mono text-xs">
                            <FileCode className="w-3.5 h-3.5" />
                            {sub.fileName} ({sub.fileSize || 'Fayl'})
                          </span>
                        ) : (
                          <span className="text-slate-400 line-clamp-1 italic">
                            "{sub.textAnswer?.slice(0, 30)}..."
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {sub.status === 'graded' ? (
                          <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                            {sub.score} ball ({sub.teacherFeedback})
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                            Kutilmoqda
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setGradingSubId(sub.id);
                            setGradingScore(sub.score || 90);
                            setGradingFeedback(sub.teacherFeedback || 'Barakalla, to\'g\'ri bajarilgan!');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                        >
                          Baholash
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Student Submit Homework Modal */}
      {activeTaskForSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {activeTaskForSubmit.grade}-sinf topshirig'i
              </span>
              <h3 className="text-xl font-bold text-white">
                {activeTaskForSubmit.title}
              </h3>
              <p className="text-xs text-slate-400">
                {activeTaskForSubmit.description}
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Muvaffaqiyatli topshirildi!</h4>
                <p className="text-xs text-slate-300">
                  Axadboy Nishanov sizning vazifangizni ko'rib chiqadi va baholaydi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Javob matni yoki kod sharhi:
                  </label>
                  <textarea
                    rows={4}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Python kodingiz, masalaning javobi yoki amaliy ish bo'yicha hisobotingizni yozing..."
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Fayl yuklash (.py, .pdf, .docx, .png, .zip):
                  </label>
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl cursor-pointer bg-slate-950/60 transition-all">
                    <Upload className="w-6 h-6 text-emerald-400 mb-2" />
                    <span className="text-xs font-bold text-slate-300">
                      Faylni tanlash uchun bu yerga bosing
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Rasm, Python skripti, Word yoki PDF (Maks: 25MB)
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".py,.html,.css,.js,.pdf,.docx,.xlsx,.pptx,.png,.jpg,.zip"
                    />
                  </label>

                  {uploadedFile && (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                      <span className="truncate">{uploadedFile.name}</span>
                      <span className="text-slate-400 text-[10px]">{uploadedFile.size}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTaskForSubmit(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Yuklanmoqda...' : 'Topshiriqni Jo\'natish'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Teacher Grading Modal */}
      {gradingSubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">
              O'quvchi ishini baholash (Ustoz Axadboy Nishanov)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Qo'yiladigan ball (0 - 100):
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={gradingScore}
                  onChange={(e) => setGradingScore(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ustoz izohi va tavsiyasi:
                </label>
                <input
                  type="text"
                  value={gradingFeedback}
                  onChange={(e) => setGradingFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGradingSubId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  onGradeSubmission(gradingSubId, gradingScore, gradingFeedback);
                  setGradingSubId(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
              >
                Bahoni tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Teacher Create New Task */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white">
              Yangi Topshiriq E'lon Qilish
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topshiriq sarlavhasi:
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Masalan: Python da sikllar amaliyoti"
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
                    value={newTaskGrade}
                    onChange={(e) => setNewTaskGrade(Number(e.target.value) as GradeLevel)}
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
                    Topshirish muddati:
                  </label>
                  <input
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Batafsil talab va topshiriq matni:
                </label>
                <textarea
                  rows={4}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Vazifa shartlari, talablar va nima yuklanishi kerakligi..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg"
                >
                  E'lon qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
