"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function FeelingLuckyPage() {
  const router = useRouter();
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFlip = () => {
    if (flipping || result) return; // ✅ only one flip
    setFlipping(true);
    setMessage("Engaging fairness protocol...");
    setResult(null);

    setTimeout(() => setMessage("Consulting algorithmic ethics committee..."), 1200);

    setTimeout(() => {
      setFlipping(false);
      const lucky = Math.random() < 0.5;
      if (lucky) {
        setResult("Approved");
        setMessage("Congratulations! You’ve been randomly selected for final human indifference review.");
      } else {
        setResult("Rejected");
        setMessage("Unfortunately, your application has been filtered out by our AI fairness model.");
      }
    }, 2500);
  };

  const handleContinue = () => {
    if (result === "Approved") router.push("/share?result=lucky");
    if (result === "Rejected") router.push("/share?result=unlucky");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
          Are You Feeling Lucky?
        </h1>

        <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          You’ve completed our Personality Compatibility Evaluation™.  
          Now, as part of our fairness-through-chance policy, please flip the
          corporate coin to determine whether your results will be reviewed by a real person.
        </p>

        {/* Coin Display */}
        <div className="relative w-32 h-32">
          <div
            className={`absolute inset-0 flex items-center justify-center text-4xl font-bold rounded-full border-4 border-zinc-700 bg-gradient-to-b from-zinc-100 to-zinc-300 text-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-100 transition-transform duration-700 ${
              flipping ? "animate-spin" : ""
            }`}
          >
            {flipping ? "💼" : "🪙"}
          </div>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 h-6">{message}</p>

        {result && (
          <p
            className={`text-xl font-semibold ${
              result === "Rejected"
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {result === "Rejected"
              ? "❌ Application filtered out by AI."
              : "✅ Application advanced to the next bureaucratic phase!"}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleFlip}
            disabled={flipping || result !== null}
            className={`rounded-full px-8 py-3 text-lg font-medium transition ${
              flipping || result
                ? "bg-zinc-300 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
                : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            }`}
          >
            {flipping ? "Flipping..." : "Flip the Coin"}
          </button>

          {result && (
            <button
              onClick={handleContinue}
              className={`rounded-full px-8 py-3 text-lg font-medium ${
                result === "Approved"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              } transition`}
            >
              Continue →
            </button>
          )}
        </div>

        {result && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mt-3">
            Note: This decision was made entirely by our patented Randomized
            Fairness Model™. No human intervention was involved.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}

