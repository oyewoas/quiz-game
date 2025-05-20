"use client";

import React, { Suspense } from "react";
import GameSetup from "../components/GameSetup";
import QuizGame from "../components/QuizGame";
import { QuizProvider } from "../context/QuizContext";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <QuizProvider>
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading quiz game...</p>
            </div>
          </div>
        }>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <GameSetup />
            <QuizGame />
          </div>
        </Suspense>
      </QuizProvider>
    </ErrorBoundary>
  );
}
