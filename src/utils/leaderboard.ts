import { LeaderboardEntry } from "../types/quiz";

const STORAGE_KEY = "quiz_leaderboard";

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(entry: LeaderboardEntry) {
  if (typeof window === "undefined") return;
  try {
    const leaderboard = getLeaderboard();
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard.slice(0, 10)));
  } catch {
    // fail silently
  }
}
