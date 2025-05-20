import { useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import { QuizConfig } from "../types/quiz";

const categories = [
  { id: "blockchain", name: "Blockchain Basics" },
  { id: "web3", name: "Web3 & dApps" },
  { id: "defi", name: "DeFi" },
  { id: "nft", name: "NFTs" },
  { id: "cryptocurrency", name: "Cryptocurrency" },
];

const difficulties = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

export default function GameSetup() {
  const { state, dispatch } = useQuizContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizConfig["difficulty"]>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Don't show setup if game is already configured
  if (state.gameConfig) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    setIsSubmitting(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      const config: QuizConfig = {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        timePerQuestion: 30, // 30 seconds per question
      };
      
      dispatch({ type: "SET_GAME_CONFIG", payload: config });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Setup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Select Difficulty
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as QuizConfig["difficulty"])}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedCategory || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              !selectedCategory || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Starting Quiz..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
} 