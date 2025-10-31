"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function CoverLetterPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tip, setTip] = useState("");

  // 🎓 Random corporate “inspiration” messages
  const tips = [
    "Tip: Make sure to mention how passionate you are about synergy.",
    "Tip: Recruiters love when you restate the job description in your own words.",
    "Tip: Keep it personal, but not too personal.",
    "Tip: Show that you’ve always dreamed of working here — since birth.",
    "Tip: Avoid sounding like AI, but write exactly like AI.",
    "Tip: Use at least three buzzwords: innovation, collaboration, and impact.",
    "Tip: Remember: this letter won’t be read, but it’s mandatory.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      router.push("/motivationvideo"); 
    }, 2500);
  };

  const remaining = Math.max(0, 500 - text.length);
  const disabled = text.length < 500 || submitting;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
          Mandatory Cover Letter
        </h1>

        <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Our automated system has detected that your motivation is unclear.
          Please write a short essay describing why you’re the perfect fit for
          this role, how your values align with ours, and how you plan to
          “deliver excellence” in everything you do.
        </p>

        <div className="w-full text-left">
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Begin typing your heartfelt and authentic cover letter here..."
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <div className="flex justify-between text-sm text-zinc-500 mt-2">
            <span>{remaining > 0 ? `${remaining} characters remaining` : "✅ Minimum reached"}</span>
            <span className="italic">{tip}</span>
          </div>
        </div>

        <button
          disabled={disabled}
          onClick={handleSubmit}
          className={`mt-6 rounded-full px-8 py-3 text-lg font-medium transition ${
            disabled
              ? "bg-zinc-300 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
              : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          }`}
        >
          {submitting ? "Reviewing your authenticity..." : "Continue to Next Step"}
        </button>

        {submitting && (
          <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">
            Please wait while our AI recruiter pretends to read your letter...
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
