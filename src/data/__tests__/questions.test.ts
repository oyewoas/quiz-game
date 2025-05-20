import {
  getQuestions,
  getAllQuestions,
  questionsByCategory,
} from "../questions";
import { Question } from "../../types/quiz";

describe("Questions Data", () => {
  describe("getQuestions", () => {
    it("should return questions for valid category and difficulty", () => {
      const questions = getQuestions("general", "easy");
      expect(questions).toBeDefined();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBe(5);
      expect(questions[0]).toHaveProperty("category", "general");
      expect(questions[0]).toHaveProperty("difficulty", "easy");
    });

    it("should return empty array for invalid category", () => {
      const questions = getQuestions("invalid", "easy");
      expect(questions).toEqual([]);
    });

    it("should return empty array for invalid difficulty", () => {
      const questions = getQuestions("general", "invalid");
      expect(questions).toEqual([]);
    });
  });

  describe("getAllQuestions", () => {
    it("should return all questions from all categories and difficulties", () => {
      const allQuestions = getAllQuestions();
      expect(allQuestions).toBeDefined();
      expect(Array.isArray(allQuestions)).toBe(true);

      // Should have 5 questions per category per difficulty
      // 4 categories * 3 difficulties * 5 questions = 60 questions
      expect(allQuestions.length).toBe(60);
    });
  });

  describe("Question Structure", () => {
    it("should have correct structure for all questions", () => {
      const allQuestions = getAllQuestions();

      allQuestions.forEach((question: Question) => {
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("question");
        expect(question).toHaveProperty("options");
        expect(question).toHaveProperty("correctAnswer");
        expect(question).toHaveProperty("category");
        expect(question).toHaveProperty("difficulty");
        expect(question).toHaveProperty("timeLimit");

        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBe(4);
        expect(question.options).toContain(question.correctAnswer);
      });
    });

    it("should have correct time limits based on difficulty", () => {
      const allQuestions = getAllQuestions();

      allQuestions.forEach((question: Question) => {
        switch (question.difficulty) {
          case "easy":
            expect(question.timeLimit).toBe(30);
            break;
          case "medium":
            expect(question.timeLimit).toBe(45);
            break;
          case "hard":
            expect(question.timeLimit).toBe(60);
            break;
        }
      });
    });
  });

  describe("Category Distribution", () => {
    it("should have equal number of questions per category", () => {
      const categories = Object.keys(questionsByCategory);
      const questionsPerCategory = categories.map(
        (category) => Object.values(questionsByCategory[category]).flat().length
      );

      // All categories should have 15 questions (5 per difficulty)
      questionsPerCategory.forEach((count) => {
        expect(count).toBe(15);
      });
    });

    it("should have equal number of questions per difficulty level", () => {
      const categories = Object.keys(questionsByCategory);
      const difficulties = ["easy", "medium", "hard"];

      categories.forEach((category) => {
        difficulties.forEach((difficulty) => {
          const questions = questionsByCategory[category][difficulty];
          expect(questions.length).toBe(5);
        });
      });
    });
  });
});
