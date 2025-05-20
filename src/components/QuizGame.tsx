"use client";

import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { questions } from "../data/questions";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function QuizGame() {
  const { state, dispatch, currentQuestion } = useQuizContext();

  useEffect(() => {
    if (!state.gameConfig) return;

    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameConfig, dispatch]);

  if (!state.gameConfig) {
    return null;
  }

  const handleOptionClick = (option: string) => {
    if (state.selectedOption) return;
    dispatch({ type: "SELECT_OPTION", payload: option });
    dispatch({ type: "SHOW_FEEDBACK" });

    setTimeout(() => {
      dispatch({ type: "SUBMIT_ANSWER" });
      dispatch({ type: "RESET_QUESTION" });
    }, 1500);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_SCORE" });
  };

  const progress = ((state.currentQuestionIndex) / questions.length) * 100;

  // Show completion UI when quiz is complete and not showing name prompt
  if (state.isComplete && !state.showNamePrompt && !state.latestEntryId) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Quiz Complete!
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Your Score: {state.score} out of {questions.length}
            </p>
            <p className="text-gray-600">
              {state.score === questions.length
                ? "Perfect score! Amazing job! 🎉"
                : state.score >= questions.length * 0.7
                ? "Great job! Well done! 👏"
                : "Keep practicing! You'll get better! 💪"}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => dispatch({ type: "SHOW_NAME_PROMPT" })}
              className="w-full py-4 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Score to Leaderboard
            </button>
            <button
              onClick={() => dispatch({ type: "RESET_QUIZ" })}
              className="w-full py-4 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {state.currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {state.score}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-8 text-center">
          <div className={`text-2xl font-bold ${
            state.timeRemaining <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-700'
          }`}>
            {state.timeRemaining}s
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          {state.showFeedback ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Preparing next question...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentQuestion?.question}
              </h2>
              <div className="grid gap-4">
                {currentQuestion?.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={state.selectedOption !== null}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      state.selectedOption === option
                        ? option === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    } ${
                      state.selectedOption ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Feedback */}
        {state.showFeedback && state.selectedOption && (
          <div className={`p-4 rounded-lg mb-8 ${
            state.selectedOption === currentQuestion?.correctAnswer
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}>
            {state.selectedOption === currentQuestion?.correctAnswer
              ? "Correct! Well done!"
              : `Incorrect. The correct answer is: ${currentQuestion?.correctAnswer}`}
          </div>
        )}

        {/* Name Prompt Modal */}
        <Modal
          isOpen={state.isComplete && state.showNamePrompt}
          title="Quiz Complete!"
        >
          <p className="text-gray-600 mb-6">
            Your score: {state.score} out of {questions.length}
          </p>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name to save your score
              </label>
              <input
                type="text"
                id="playerName"
                value={state.playerName}
                onChange={(e) => dispatch({ type: "SET_PLAYER_NAME", payload: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Score
            </button>
          </form>
        </Modal>

        {/* Score Saved Modal */}
        <Modal
          isOpen={!!state.latestEntryId}
          title="Score Saved!"
        >
          <p className="text-gray-600 mb-6">
            Your score has been added to the leaderboard.
          </p>
          <button
            onClick={() => dispatch({ type: "RESET_QUIZ" })}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Play Again
          </button>
        </Modal>
      </div>
    </div>
  );
} 