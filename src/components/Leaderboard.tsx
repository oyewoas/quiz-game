import React from 'react';
import { getLeaderboard } from '../utils/leaderboard';
import { LeaderboardEntry } from '../types/quiz';

interface LeaderboardProps {
  highlightId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ highlightId }) => {
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([]);

  React.useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  if (!entries.length) return <div className="mt-6">No high scores yet.</div>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
      <ol className="bg-gray-100 rounded p-4">
        {entries.map((entry, idx) => (
          <li
            key={entry.id}
            className={`flex justify-between py-1 px-2 rounded ${highlightId === entry.id ? 'bg-yellow-200 font-bold' : ''}`}
          >
            <span>{idx + 1}. {entry.playerName}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard; 