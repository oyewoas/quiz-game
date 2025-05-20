import { useQuizContext } from "../context/QuizContext";

interface LeaderboardProps {
  highlightId?: string;
}

export default function Leaderboard({ highlightId }: LeaderboardProps) {
  const { state } = useQuizContext();
  const { leaderboard } = state;

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No scores yet. Be the first to play!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Player</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Difficulty</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`border-b border-gray-100 transition-colors ${
                    entry.id === highlightId
                      ? "bg-indigo-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <span className={`text-lg font-bold ${
                          index === 0 ? "text-yellow-500" :
                          index === 1 ? "text-gray-400" :
                          "text-amber-600"
                        }`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </span>
                      ) : (
                        <span className="text-gray-500">{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">{entry.playerName}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-indigo-600">{entry.score}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{entry.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.difficulty === "easy" ? "bg-green-100 text-green-800" :
                      entry.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {entry.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 