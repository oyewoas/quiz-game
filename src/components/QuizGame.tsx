import React, { useState } from "react";
import { questions } from "../data/questions";
import { useQuiz } from "../hooks/useQuiz";

const QuizGame: React.FC = () => {
  const { quizState, currentQuestion, submitAnswer, resetQuiz, startQuiz } = useQuiz(questions);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  React.useEffect(() => {
    // Reset selection and feedback when question changes
    setSelectedOption(null);
    setShowFeedback(false);
  }, [quizState.currentQuestionIndex]);

  if (!currentQuestion && !quizState.isComplete) {
    return <div className="text-center mt-10">Loading question...</div>;
  }

  const handleOptionClick = (option: string) => {
    if (selectedOption || showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    setTimeout(() => {
      submitAnswer(option);
    }, 1200); // Show feedback for 1.2s before moving on
  };

  const getOptionClass = (option: string) => {
    if (!showFeedback) return "bg-white hover:bg-blue-100";
    if (option === currentQuestion?.correctAnswer) return "bg-green-200";
    if (option === selectedOption) return "bg-red-200";
    return "bg-white";
  };

  if (quizState.isComplete) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-2">Your Score: <span className="font-semibold">{quizState.score} / {questions.length}</span></p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={resetQuiz}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Question {quizState.currentQuestionIndex + 1} / {questions.length}</span>
        <span className="font-mono text-lg">⏰ {quizState.timeRemaining}s</span>
      </div>
      <h2 className="text-xl font-semibold mb-6">{currentQuestion?.question}</h2>
      <div className="grid gap-4">
        {currentQuestion?.options.map((option) => (
          <button
            key={option}
            className={`w-full py-3 px-4 rounded border text-left transition-colors duration-200 ${getOptionClass(option)}`}
            disabled={!!selectedOption || showFeedback}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && selectedOption && (
        <div className="mt-4 text-lg font-semibold">
          {selectedOption === currentQuestion?.correctAnswer ? (
            <span className="text-green-600">Correct!</span>
          ) : (
            <span className="text-red-600">Incorrect. The correct answer is "{currentQuestion?.correctAnswer}".</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGame; 