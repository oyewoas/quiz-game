import { renderHook, act } from "@testing-library/react";
import { QuizProvider, useQuizContext } from "../QuizContext";
import { getQuestions } from "../../data/questions";

// Mock the questions data
jest.mock("../../data/questions", () => ({
  getQuestions: jest.fn(),
  getAllQuestions: jest.fn(),
}));

describe("QuizContext", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider,
    });

    expect(result.current.state.score).toBe(0);
    expect(result.current.state.currentQuestionIndex).toBe(0);
    expect(result.current.state.gameConfig).toBeNull();
  });

  it("should set game configuration correctly", () => {
    const mockQuestions = [
      {
        id: "1",
        question: "Test question",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        category: "general",
        difficulty: "easy",
        timeLimit: 30,
      },
    ];

    (getQuestions as jest.Mock).mockReturnValue(mockQuestions);

    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider,
    });

    act(() => {
      result.current.dispatch({
        type: "SET_GAME_CONFIG",
        payload: { category: "general", difficulty: "easy" },
      });
    });

    expect(result.current.state.gameConfig).toEqual({
      category: "general",
      difficulty: "easy",
    });
    expect(getQuestions).toHaveBeenCalledWith("general", "easy");
  });

  it("should handle correct answer submission", () => {
    const mockQuestions = [
      {
        id: "1",
        question: "Test question",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        category: "general",
        difficulty: "easy",
        timeLimit: 30,
      },
    ];

    (getQuestions as jest.Mock).mockReturnValue(mockQuestions);

    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider,
    });

    // Set game config first
    act(() => {
      result.current.dispatch({
        type: "SET_GAME_CONFIG",
        payload: { category: "general", difficulty: "easy" },
      });
    });

    // Select answer first
    act(() => {
      result.current.dispatch({
        type: "SELECT_OPTION",
        payload: "A",
      });
    });

    // Submit correct answer
    act(() => {
      result.current.dispatch({
        type: "SUBMIT_ANSWER",
      });
      result.current.dispatch({
        type: "RESET_QUESTION",
      });
    });

    expect(result.current.state.score).toBe(1);
  });

  it("should handle next question correctly", () => {
    const mockQuestions = [
      {
        id: "1",
        question: "Test question 1",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        category: "general",
        difficulty: "easy",
        timeLimit: 30,
      },
      {
        id: "2",
        question: "Test question 2",
        options: ["A", "B", "C", "D"],
        correctAnswer: "B",
        category: "general",
        difficulty: "easy",
        timeLimit: 30,
      },
    ];

    (getQuestions as jest.Mock).mockReturnValue(mockQuestions);

    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider,
    });

    // Set game config first
    act(() => {
      result.current.dispatch({
        type: "SET_GAME_CONFIG",
        payload: { category: "general", difficulty: "easy" },
      });
    });

    // Select answer first
    act(() => {
      result.current.dispatch({
        type: "SELECT_OPTION",
        payload: "A",
      });
    });

    // Submit an answer first to ensure we can move to next question
    act(() => {
      result.current.dispatch({
        type: "SUBMIT_ANSWER",
      });
    });

    // Move to next question
    act(() => {
      result.current.dispatch({
        type: "RESET_QUESTION"
      });
    });

    expect(result.current.state.currentQuestionIndex).toBe(1);
  });

  it("should reset quiz correctly", () => {
    const mockQuestions = [
      {
        id: "1",
        question: "Test question",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        category: "general",
        difficulty: "easy",
        timeLimit: 30,
      },
    ];

    (getQuestions as jest.Mock).mockReturnValue(mockQuestions);

    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider,
    });

    // Set game config and submit answer
    act(() => {
      result.current.dispatch({
        type: "SET_GAME_CONFIG",
        payload: { category: "general", difficulty: "easy" },
      });
      result.current.dispatch({
        type: "SELECT_OPTION",
        payload: "A",
      });
      result.current.dispatch({
        type: "SUBMIT_ANSWER",
      });
    });

    // Reset quiz
    act(() => {
      result.current.dispatch({
        type: "RESET_QUIZ",
      });
    });

    expect(result.current.state.score).toBe(0);
    expect(result.current.state.currentQuestionIndex).toBe(0);
    expect(result.current.state.gameConfig).toBeNull();
  });
}); 