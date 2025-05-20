import { useState } from "react";
import { useQuizContext } from "../context/QuizContext";

const categories = [
  { id: "general", name: "General Knowledge" },
  { id: "science", name: "Science" },
  { id: "history", name: "History" },
  { id: "technology", name: "Technology" },
];

const difficulties = [
  { id: "easy", name: "Easy", timeLimit: 30 },
  { id: "medium", name: "Medium", timeLimit: 20 },
  { id: "hard", name: "Hard", timeLimit: 15 },
];

export default function GameSetup() {
  const { state, dispatch } = useQuizContext();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (state.gameConfig) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      dispatch({
        type: "SET_GAME_CONFIG",
        payload: {
          category: selectedCategory,
          difficulty: selectedDifficulty,
        },
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Quiz Game Setup
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Select Category
            </label>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(difficulty.id as "easy" | "medium" | "hard")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDifficulty === difficulty.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{difficulty.name}</div>
                  <div className="text-sm text-gray-500">
                    {difficulty.timeLimit}s per question
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-lg text-white font-medium text-lg
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]"
              }
              transition-all duration-300 shadow-md`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Starting Game...
              </div>
            ) : (
              "Start Quiz"
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 