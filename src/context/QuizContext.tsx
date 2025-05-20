import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Question, QuizConfig, LeaderboardEntry } from '../types/quiz';
import { questions } from '../data/questions';
import { addLeaderboardEntry, getLeaderboard } from '../utils/leaderboard';

interface QuizState {
  gameConfig: QuizConfig | null;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  score: number;
  answers: Array<{
    questionId: string;
    selectedOption: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  isComplete: boolean;
  timeRemaining: number;
  selectedOption: string | null;
  showFeedback: boolean;
  playerName: string;
  showNamePrompt: boolean;
  latestEntryId: string | null;
  leaderboard: LeaderboardEntry[];
}

type QuizAction =
  | { type: 'SET_GAME_CONFIG'; payload: QuizConfig }
  | { type: 'SELECT_OPTION'; payload: string }
  | { type: 'SHOW_FEEDBACK' }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'RESET_QUESTION' }
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'SHOW_NAME_PROMPT' }
  | { type: 'SAVE_SCORE' }
  | { type: 'RESET_QUIZ' }
  | { type: 'UPDATE_TIMER' };

const initialState: QuizState = {
  gameConfig: null,
  currentQuestionIndex: 0,
  currentQuestion: null,
  score: 0,
  answers: [],
  isComplete: false,
  timeRemaining: 0,
  selectedOption: null,
  showFeedback: false,
  playerName: '',
  showNamePrompt: false,
  latestEntryId: null,
  leaderboard: getLeaderboard(),
};

// Add validation functions
const validateGameConfig = (config: QuizConfig): boolean => {
  if (!config) return false;
  if (!config.category || !config.difficulty) return false;
  if (!['easy', 'medium', 'hard'].includes(config.difficulty)) return false;
  return true;
};

const validateQuestion = (question: Question | undefined): boolean => {
  if (!question) return false;
  if (!question.id || !question.question) return false;
  if (!Array.isArray(question.options) || question.options.length === 0) return false;
  if (!question.correctAnswer || !question.options.includes(question.correctAnswer)) return false;
  return true;
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  try {
    switch (action.type) {
      case 'SET_GAME_CONFIG':
        if (!validateGameConfig(action.payload)) {
          throw new Error('Invalid game configuration');
        }
        const firstQuestion = questions[0];
        if (!validateQuestion(firstQuestion)) {
          throw new Error('Invalid question data');
        }
        return {
          ...state,
          gameConfig: action.payload,
          currentQuestion: firstQuestion,
          currentQuestionIndex: 0,
          timeRemaining: firstQuestion.timeLimit || 30,
          score: 0,
          answers: [],
          isComplete: false,
          selectedOption: null,
          showFeedback: false,
        };

      case 'SELECT_OPTION':
        if (!state.currentQuestion) {
          throw new Error('No active question');
        }
        return {
          ...state,
          selectedOption: action.payload,
        };

      case 'SHOW_FEEDBACK':
        return {
          ...state,
          showFeedback: true,
        };

      case 'SUBMIT_ANSWER':
        const currentQuestion = questions[state.currentQuestionIndex];
        if (!validateQuestion(currentQuestion)) {
          throw new Error('Invalid question data');
        }
        if (!state.selectedOption) {
          throw new Error('No option selected');
        }

        const isCorrect = state.selectedOption === currentQuestion.correctAnswer;
        const timeSpent = (currentQuestion.timeLimit || 30) - state.timeRemaining;
        const nextQuestionIndex = state.currentQuestionIndex + 1;
        const nextQuestion = questions[nextQuestionIndex];

        const isLastQuestion = nextQuestionIndex >= questions.length;

        return {
          ...state,
          score: isCorrect ? state.score + 1 : state.score,
          answers: [
            ...state.answers,
            {
              questionId: currentQuestion.id,
              selectedOption: state.selectedOption,
              isCorrect,
              timeSpent,
            },
          ],
          currentQuestionIndex: nextQuestionIndex,
          currentQuestion: nextQuestion || null,
          timeRemaining: nextQuestion?.timeLimit || 30,
          isComplete: isLastQuestion,
          showNamePrompt: isLastQuestion,
        };

      case 'RESET_QUESTION':
        return {
          ...state,
          selectedOption: null,
          showFeedback: false,
        };

      case 'SET_PLAYER_NAME':
        return {
          ...state,
          playerName: action.payload,
        };

      case 'SHOW_NAME_PROMPT':
        return {
          ...state,
          showNamePrompt: true,
        };

      case 'SAVE_SCORE':
        if (!state.playerName.trim() || !state.gameConfig) {
          throw new Error('Invalid player name or game configuration');
        }

        const entry: LeaderboardEntry = {
          id: Date.now().toString(),
          playerName: state.playerName.trim(),
          score: state.score,
          date: new Date().toISOString(),
          category: state.gameConfig.category || 'general',
          difficulty: state.gameConfig.difficulty || 'medium',
        };

        try {
          addLeaderboardEntry(entry);
        } catch (error) {
          console.error('Failed to save score:', error);
          throw new Error('Failed to save score');
        }

        return {
          ...state,
          latestEntryId: entry.id,
          showNamePrompt: false,
          leaderboard: getLeaderboard(),
        };

      case 'RESET_QUIZ':
        return {
          ...initialState,
          leaderboard: state.leaderboard,
        };

      case 'UPDATE_TIMER':
        return {
          ...state,
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        };

      default:
        return state;
    }
  } catch (error) {
    console.error('Quiz state error:', error);
    // Return a safe state that allows the user to continue or restart
    return {
      ...state,
      showFeedback: false,
      selectedOption: null,
    };
  }
}

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  currentQuestion: Question | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const currentQuestion = questions[state.currentQuestionIndex];

  return (
    <QuizContext.Provider value={{ state, dispatch, currentQuestion }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
} 