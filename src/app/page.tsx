"use client";

import React, { useState } from "react";
import QuizGame from "../components/QuizGame";
import GameSetup, { GameConfig } from "../components/GameSetup";

export default function Home() {
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  const handleGameStart = (config: GameConfig) => {
    setGameConfig(config);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {gameConfig ? (
        <QuizGame config={gameConfig} />
      ) : (
        <GameSetup onStart={handleGameStart} />
      )}
    </div>
  );
}
