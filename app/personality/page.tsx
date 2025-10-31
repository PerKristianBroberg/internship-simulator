"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

const QUESTIONS = [
  "I stay calm under pressure.",
  "I enjoy collaborating with others on projects.",
  "I take feedback well and use it constructively.",
  "I often finish tasks before deadlines.",
  "I consider myself highly organized.",
  "I adapt quickly to sudden changes.",
  "I prefer clear plans over spontaneous decisions.",
  "I take responsibility when things go wrong.",
  "I handle stress in a healthy and productive way.",
  "I see challenges as opportunities to grow.",
  "I communicate clearly and respectfully.",
  "I stay focused on long-term goals.",
  "I approach problems logically rather than emotionally.",
  "I work well in fast-paced environments.",
  "I maintain professionalism even when frustrated.",
  "I am detail-oriented and thorough in my work.",
  "I manage time effectively and prioritize well.",
  "I stay motivated even with repetitive tasks.",
  "I remain positive in difficult situations.",
  "I take initiative without being told what to do.",
];

export default function PersonalityPage() {
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnswer = (index: number, value: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSubmitted(true);
    }, 3000);
  };

  // --- Analyzing phase ---
  if (analyzing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black text-center">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Analyzing your personality profile...
        </h1>
        <div className="w-64 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-black dark:bg-white animate-pulse"
            style={{ width: "65%" }}
          />
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          Evaluating emotional stability... measuring leadership potential...
          estimating snack frequency...
        </p>
      </div>
    );
  }

  // --- Final results ---
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 dark:bg-black text-center">
        <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 sm:py-32 sm:px-16">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            Personality Assessment Results
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mb-10">
            After advanced AI-driven behavioral modeling and 17 milliseconds of
            deep analysis, your personality profile has been categorized as:
          </p>

          <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-6">
            Concerningly Unstable
          </div>

          <p className="max-w-md text-zinc-500 dark:text-zinc-400 mb-12">
            Your results indicate excessive impulsivity, minimal teamwork
            tendencies, questionable time management, and a fascinating disregard
            for feedback. While your energy is admirable, your overall workplace
            compatibility is... statistically improbable.
          </p>

          <ul className="text-zinc-700 dark:text-zinc-300 text-sm space-y-1">
            {[
              { label: "🧠 Logical Stability" },
              { label: "💬 Communication Clarity" },
              { label: "📅 Time Management" },
              { label: "🤝 Team Cooperation" },
              { label: "🔥 Emotional Regulation" },
            ].map((trait, i) => (
              <li key={i}>
                {trait.label}: {Math.floor(Math.random() * 26) + 20}%
              </li>
            ))}
            <li>☕ Dependence on Caffeine: 97%</li>
          </ul>

          {/* FIXED BUTTON BELOW ↓ */}
          <button
            onClick={() => router.push("/feeling-lucky")}
            className="mt-8 rounded-full bg-black px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Proceed
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Personality Test Form ---
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="flex flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-12 text-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Personality Assessment
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
            Please respond honestly to the following statements on a scale of
            1–5. (1 = Strongly Disagree, 5 = Strongly Agree)
          </p>
        </div>

        <div className="max-h-[60vh] w-full overflow-y-auto px-2 flex flex-col gap-6 text-left">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3"
            >
              <p className="text-zinc-800 dark:text-zinc-200 font-medium text-sm sm:text-base text-center sm:text-left">
                {i + 1}. {q}
              </p>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(i, val)}
                    className={`h-8 w-8 rounded-full text-sm font-semibold transition ${
                      answers[i] === val
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={answers.includes(0)}
          className={`mt-4 rounded-full px-8 py-3 text-lg font-medium transition ${
            answers.includes(0)
              ? "bg-zinc-300 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
              : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          }`}
        >
          Submit Assessment
        </button>
      </main>
      <Footer />
    </div>
  );
}
