import React from 'react';

export interface GameConfig {
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameSetupProps {
  onStart: (config: GameConfig) => void;
}

const categories = [
  { id: 'general', name: 'General Knowledge' },
  { id: 'science', name: 'Science' },
  { id: 'history', name: 'History' },
  { id: 'art', name: 'Art & Culture' },
];

const difficulties = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const GameSetup: React.FC<GameSetupProps> = ({ onStart }) => {
  const [config, setConfig] = React.useState<GameConfig>({
    category: 'general',
    difficulty: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(config);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`p-4 rounded-lg border-2 transition-colors ${
                  config.category === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setConfig({ ...config, category: category.id })}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Difficulty
          </label>
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                type="button"
                className={`p-4 rounded-lg border-2 transition-colors ${
                  config.difficulty === difficulty.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setConfig({ ...config, difficulty: difficulty.id as 'easy' | 'medium' | 'hard' })}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default GameSetup; 