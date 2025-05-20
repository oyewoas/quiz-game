"use client";

import React, { Suspense } from "react";
import GameSetup from "../components/GameSetup";
import QuizGame from "../components/QuizGame";
import { QuizProvider } from "../context/QuizContext";
import ErrorBoundary from "../components/ErrorBoundary";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <ErrorBoundary>
      <QuizProvider>
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Web3Bridge Quiz Game
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Suspense fallback={
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading quiz game...</p>
                    </div>
                  </div>
                }>
                  <GameSetup />
                  <QuizGame />
                </Suspense>
              </div>
              
              <div className="lg:col-span-1">
                <Suspense fallback={<div>Loading leaderboard...</div>}>
                  <Leaderboard />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
      </QuizProvider>
    </ErrorBoundary>
  );
}
