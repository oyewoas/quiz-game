"use client";

import React, { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import Leaderboard from "./Leaderboard";

const QuizGame: React.FC = () => {
  const { state, dispatch, currentQuestion } = useQuizContext();

  useEffect(() => {
    if (!state.isComplete && state.timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);

      return () => clearInterval(timer);
    } else if (state.timeRemaining === 0 && !state.isComplete) {
      dispatch({ type: 'SUBMIT_ANSWER' });
    }
  }, [state.timeRemaining, state.isComplete, dispatch]);

  useEffect(() => {
    dispatch({ type: 'RESET_QUESTION' });
  }, [state.currentQuestionIndex, dispatch]);

  if (!currentQuestion && !state.isComplete) {
    return <div className="text-center mt-10">Loading question...</div>;
  }

  const handleOptionClick = (option: string) => {
    if (state.selectedOption || state.showFeedback) return;
    dispatch({ type: 'SELECT_OPTION', payload: option });
    dispatch({ type: 'SHOW_FEEDBACK' });
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_ANSWER' });
    }, 1200);
  };

  const getOptionClass = (option: string) => {
    if (!state.showFeedback) return "bg-white hover:bg-blue-100";
    if (option === currentQuestion?.correctAnswer) return "bg-green-200";
    if (option === state.selectedOption) return "bg-red-200";
    return "bg-white";
  };

  const handleSaveScore = () => {
    dispatch({ type: 'SAVE_SCORE' });
  };

  if (state.isComplete) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-2">Your Score: <span className="font-semibold">{state.score} / {state.answers.length}</span></p>
        {state.showNamePrompt ? (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={state.playerName}
              onChange={(e) => dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value })}
              className="border p-2 rounded mr-2"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSaveScore}
            >
              Save Score
            </button>
          </div>
        ) : (
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => dispatch({ type: 'SHOW_NAME_PROMPT' })}
          >
            Save Score
          </button>
        )}
        <button
          className="mt-4 ml-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          onClick={() => dispatch({ type: 'RESET_QUIZ' })}
        >
          Restart Quiz
        </button>
        <Leaderboard highlightId={state.latestEntryId} />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Question {state.currentQuestionIndex + 1} / {state.answers.length + 1}</span>
        <span className="font-mono text-lg">⏰ {state.timeRemaining}s</span>
      </div>
      <h2 className="text-xl font-semibold mb-6">{currentQuestion?.question}</h2>
      <div className="grid gap-4">
        {currentQuestion?.options.map((option) => (
          <button
            key={option}
            className={`w-full py-3 px-4 rounded border text-left transition-colors duration-200 ${getOptionClass(option)}`}
            disabled={!!state.selectedOption || state.showFeedback}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {state.showFeedback && state.selectedOption && (
        <div className="mt-4 text-lg font-semibold">
          {state.selectedOption === currentQuestion?.correctAnswer ? (
            <span className="text-green-600">Correct!</span>
          ) : (
            <span className="text-red-600">Incorrect. The correct answer is &ldquo;{currentQuestion?.correctAnswer}&rdquo;.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGame; 