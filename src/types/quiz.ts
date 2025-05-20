export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number; // in seconds
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Answer[];
  isComplete: boolean;
  timeRemaining: number;
}

export interface Answer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  date: string;
  category: string;
  difficulty: string;
}

export interface QuizConfig {
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
  timeLimit?: number;
  totalQuestions?: number;
}
