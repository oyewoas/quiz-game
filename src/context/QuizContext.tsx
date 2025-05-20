import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameConfig } from '../components/GameSetup';
import { Question } from '../types/quiz';
import { questions } from '../data/questions';
import { addLeaderboardEntry, getLeaderboard } from '../utils/leaderboard';

interface QuizState {
  gameConfig: GameConfig | null;
  currentQuestionIndex: number;
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
  latestEntryId: string | undefined;
  leaderboard: Array<{
    id: string;
    playerName: string;
    score: number;
    date: string;
    category: string;
    difficulty: string;
  }>;
}

type QuizAction =
  | { type: 'SET_GAME_CONFIG'; payload: GameConfig }
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
  score: 0,
  answers: [],
  isComplete: false,
  timeRemaining: 0,
  selectedOption: null,
  showFeedback: false,
  playerName: '',
  showNamePrompt: false,
  latestEntryId: undefined,
  leaderboard: getLeaderboard(),
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_GAME_CONFIG':
      return {
        ...state,
        gameConfig: action.payload,
        timeRemaining: questions[0]?.timeLimit || 30,
      };

    case 'SELECT_OPTION':
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
      const isCorrect = state.selectedOption === currentQuestion?.correctAnswer;
      const timeSpent = (currentQuestion?.timeLimit || 30) - state.timeRemaining;

      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        answers: [
          ...state.answers,
          {
            questionId: currentQuestion?.id || '',
            selectedOption: state.selectedOption || '',
            isCorrect,
            timeSpent,
          },
        ],
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeRemaining: questions[state.currentQuestionIndex + 1]?.timeLimit || 30,
        isComplete: state.currentQuestionIndex + 1 >= questions.length,
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
      if (!state.playerName.trim() || !state.gameConfig) return state;

      const entry = {
        id: Date.now().toString(),
        playerName: state.playerName.trim(),
        score: state.score,
        date: new Date().toISOString(),
        category: state.gameConfig.category,
        difficulty: state.gameConfig.difficulty,
      };

      addLeaderboardEntry(entry);

      return {
        ...state,
        latestEntryId: entry.id,
        showNamePrompt: false,
        leaderboard: getLeaderboard(),
      };

    case 'RESET_QUIZ':
      return {
        ...initialState,
        gameConfig: state.gameConfig,
        timeRemaining: questions[0]?.timeLimit || 30,
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