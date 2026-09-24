export type UserRole = 'teacher' | 'student';

export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type ThemeMode = 'light' | 'dark' | 'night';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  grade?: GradeLevel;
  avatar: string;
  xp: number;
  completedTests: number;
  completedTasks: number;
  stars: number;
  badges: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface LessonTopic {
  id: string;
  grade: GradeLevel;
  title: string;
  subtitle: string;
  chapterNumber: number;
  durationMinutes: number;
  overview: string;
  sections: {
    title: string;
    content: string;
    codeExample?: string;
    codeLanguage?: string;
    note?: string;
  }[];
  keyTerms: string[];
  practicalTask: {
    title: string;
    description: string;
    sampleSolution?: string;
  };
  videoTutorial?: {
    title: string;
    duration: string;
    url: string;
    isLocalOrSample?: boolean;
  };
  quiz: QuizQuestion[];
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  grade: GradeLevel | 'all';
  type: 'video' | 'pdf' | 'document' | 'presentation' | 'image' | 'code';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  createdAt: string;
  downloadCount: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  studentGrade: GradeLevel;
  submittedAt: string;
  textAnswer?: string;
  fileName?: string;
  fileData?: string; // base64 or object URL
  fileSize?: string;
  status: 'pending' | 'graded';
  score?: number; // 0 - 100
  teacherFeedback?: string;
}

export interface HomeworkTask {
  id: string;
  title: string;
  grade: GradeLevel;
  description: string;
  attachmentName?: string;
  attachmentUrl?: string;
  deadline: string;
  maxScore: number;
  createdBy: string;
  createdAt: string;
  submissionsCount?: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  grade: GradeLevel;
  phone?: string;
  xp: number;
  completedQuizzes: number;
  submittedTasks: number;
  averageScore: number;
  lastActive: string;
  badge: string;
  status: 'active' | 'inactive';
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  grade: GradeLevel;
  xp: number;
  badge: string;
  testsCompleted: number;
  isCurrentUser?: boolean;
}
