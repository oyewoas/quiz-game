import { useState, useEffect, useCallback } from "react";
import { Question, QuizState, Answer, QuizConfig } from "../types/quiz";

export const useQuiz = (questions: Question[], config?: QuizConfig) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    timeRemaining: 0,
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const startQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isComplete: false,
      timeRemaining: currentQuestion?.timeLimit || 30,
    });
  }, [currentQuestion?.timeLimit]);

  const submitAnswer = useCallback(
    (selectedOption: string) => {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      const timeSpent =
        (currentQuestion.timeLimit || 30) - quizState.timeRemaining;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        timeSpent,
      };

      setQuizState((prev) => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: [...prev.answers, newAnswer],
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining:
          questions[prev.currentQuestionIndex + 1]?.timeLimit || 30,
        isComplete: prev.currentQuestionIndex + 1 >= questions.length,
      }));
    },
    [currentQuestion, questions, quizState.timeRemaining]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!quizState.isComplete && quizState.timeRemaining > 0) {
      timer = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (quizState.timeRemaining === 0 && !quizState.isComplete) {
      submitAnswer(""); // Auto-submit when time runs out
    }

    return () => clearInterval(timer);
  }, [quizState.timeRemaining, quizState.isComplete, submitAnswer]);

  const resetQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  return {
    quizState,
    currentQuestion,
    submitAnswer,
    resetQuiz,
    startQuiz,
  };
};
