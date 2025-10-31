"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import { FIGURE_PUZZLES } from "../data/figurePuzzles";

export default function TestsPage() {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step < FIGURE_PUZZLES.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setLoadingResult(true);
      setTimeout(() => {
        setFinished(true);
        setLoadingResult(false);
      }, 3500);
    }
  };

  // --- Loading screen ---
  if (loadingResult) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black text-center">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Analyzing your test results...
        </h1>
        <div className="w-64 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white animate-pulse"
            style={{ width: "70%" }}
          />
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-4">
          Evaluating pattern recognition... estimating neural efficiency...
        </p>
      </div>
    );
  }

  // --- Finished screen ---
  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 dark:bg-black text-center">
        <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 sm:py-32 sm:px-16">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            Cognitive Reasoning Results
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mb-10">
            Following a comprehensive AI-assisted psychometric evaluation, our
            system has assessed your logical reasoning performance as:
          </p>

          <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-6">
            Below Average
          </div>

          <p className="max-w-md text-zinc-500 dark:text-zinc-400 mb-12">
            The analysis suggests commendable enthusiasm and effort, paired with
            a creative interpretation of pattern recognition that defies
            traditional logic. We recommend proceeding to the personality
            assessment to help us better understand your uniquely abstract
            approach to reasoning.
          </p>

          <button
            onClick={() => router.push("/personality")}
            className="rounded-full bg-black px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Continue to Personality Test
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Active question ---
  const puzzle = FIGURE_PUZZLES[step];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 dark:bg-black font-sans">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-8 px-6 py-20 text-center sm:py-32 sm:px-16">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Logical Reasoning Test
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Question {step + 1} of {FIGURE_PUZZLES.length}
        </p>

        {/* Puzzle grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {puzzle.grid.flat().map((cell, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-md border border-zinc-300 bg-white text-3xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              {cell}
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-3">
          {puzzle.options.map((opt, i) => (
            <button
              key={i}
              onClick={handleNext}
              className="flex h-14 w-14 items-center justify-center rounded-md border border-zinc-300 bg-white text-3xl hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {opt}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
