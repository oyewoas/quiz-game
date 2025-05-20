"use client";

import React from "react";
import QuizGame from "../components/QuizGame";
import GameSetup from "../components/GameSetup";
import { QuizProvider } from "../context/QuizContext";

export default function Home() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <GameSetup />
      </div>
    </QuizProvider>
  );
}
