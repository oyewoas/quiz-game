import { render, act } from "@testing-library/react";
import { QuizProvider, useQuizContext } from "../QuizContext";
import { getQuestions } from "../../data/questions";

// Mock the questions data
jest.mock("../../data/questions", () => ({
  getQuestions: jest.fn(),
  getAllQuestions: jest.fn(),
}));

// Test component that uses the context
const TestComponent = () => {
  const { state, dispatch } = useQuizContext();
  return (
    <div>
      <div data-testid="score">{state.score}</div>
      <div data-testid="current-index">{state.currentQuestionIndex}</div>
      <div data-testid="game-config">
        {state.gameConfig ? "configured" : "not-configured"}
      </div>
      <button
        data-testid="set-config"
        onClick={() =>
          dispatch({
            type: "SET_GAME_CONFIG",
            payload: { category: "general", difficulty: "easy" },
          })
        }
      >
        Set Config
      </button>
      <button
        data-testid="submit-answer"
        onClick={() =>
          dispatch({
            type: "SUBMIT_ANSWER",
            payload: "test-answer",
          })
        }
      >
        Submit Answer
      </button>
      <button
        data-testid="next-question"
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        Next Question
      </button>
      <button
        data-testid="reset-quiz"
        onClick={() => dispatch({ type: "RESET_QUIZ" })}
      >
        Reset Quiz
      </button>
    </div>
  );
};

describe("QuizContext", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { getByTestId } = render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    expect(getByTestId("score").textContent).toBe("0");
    expect(getByTestId("current-index").textContent).toBe("0");
    expect(getByTestId("game-config").textContent).toBe("not-configured");
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

    const { getByTestId } = render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    act(() => {
      getByTestId("set-config").click();
    });

    expect(getByTestId("game-config").textContent).toBe("configured");
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

    const { getByTestId } = render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    // Set game config first
    act(() => {
      getByTestId("set-config").click();
    });

    // Submit correct answer
    act(() => {
      getByTestId("submit-answer").click();
    });

    expect(getByTestId("score").textContent).toBe("1");
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

    const { getByTestId } = render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    // Set game config first
    act(() => {
      getByTestId("set-config").click();
    });

    // Move to next question
    act(() => {
      getByTestId("next-question").click();
    });

    expect(getByTestId("current-index").textContent).toBe("1");
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

    const { getByTestId } = render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    // Set game config and submit answer
    act(() => {
      getByTestId("set-config").click();
      getByTestId("submit-answer").click();
    });

    // Reset quiz
    act(() => {
      getByTestId("reset-quiz").click();
    });

    expect(getByTestId("score").textContent).toBe("0");
    expect(getByTestId("current-index").textContent).toBe("0");
    expect(getByTestId("game-config").textContent).toBe("not-configured");
  });
}); 