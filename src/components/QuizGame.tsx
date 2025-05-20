"use client";

import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { questions } from "../data/questions";

export default function QuizGame() {
  const { state, dispatch, currentQuestion } = useQuizContext();

  useEffect(() => {
    if (!state.gameConfig) return;

    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameConfig, dispatch]);

  if (!state.gameConfig || !currentQuestion) {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
          <div className="grid gap-4">
            {currentQuestion.options.map((option) => (
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
        </div>

        {/* Feedback */}
        {state.showFeedback && state.selectedOption && (
          <div className={`p-4 rounded-lg mb-8 ${
            state.selectedOption === currentQuestion.correctAnswer
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}>
            {state.selectedOption === currentQuestion.correctAnswer
              ? "Correct! Well done!"
              : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
          </div>
        )}

        {/* Name Prompt */}
        {state.isComplete && state.showNamePrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h3>
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
            </div>
          </div>
        )}

        {/* Leaderboard Entry */}
        {state.latestEntryId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Score Saved!</h3>
              <p className="text-gray-600 mb-6">
                Your score has been added to the leaderboard.
              </p>
              <button
                onClick={() => dispatch({ type: "RESET_QUIZ" })}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 