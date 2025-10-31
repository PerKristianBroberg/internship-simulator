"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function EthicsPage() {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const [correctAnswersShown, setCorrectAnswersShown] = useState(false);

  // Questions and corporate-approved "correct" answers
  const questions = [
    {
      q: "A coworker accidentally CCs you on an email complaining about management. What do you do?",
      options: [
        "Immediately forward it to management for 'transparency'",
        "Privately tell them you understand, but screenshot it for later",
        "Delete it to preserve workplace harmony (and deniability)",
        "Reply-all with 'Interesting perspective, let’s discuss offline'",
      ],
      correct: "Immediately forward it to management for 'transparency'",
    },
    {
      q: "Your boss asks you to stay late again, unpaid, for 'team morale.' You should:",
      options: [
        "Gladly accept — loyalty is its own reward",
        "Pretend to hesitate for optics, then say yes anyway",
        "Offer to stay but loudly sigh while doing it",
        "Send a Teams message about 'work-life balance' and vanish",
      ],
      correct: "Gladly accept — loyalty is its own reward",
    },
    {
      q: "A new project has no direction, leadership, or purpose. How do you stand out?",
      options: [
        "Schedule daily status meetings to seem proactive",
        "Speak confidently and vaguely until people assume you’re in charge",
        "Make a colorful PowerPoint summarizing other people's ideas",
        "Quietly fix everything but let your manager take the credit",
      ],
      correct: "Quietly fix everything but let your manager take the credit",
    },
    {
      q: "You notice the company values poster says 'Integrity' right next to 'Profitability.' What does that mean to you?",
      options: [
        "It’s about maintaining ethics until quarterly earnings are released",
        "Integrity is a flexible concept, best defined by upper management",
        "It means we do the right thing, as long as it’s billable",
        "It's a great conversation starter for performance reviews",
      ],
      correct: "It means we do the right thing, as long as it’s billable",
    },
    {
      q: "To ensure promotion during annual reviews, you should:",
      options: [
        "Publicly agree with leadership opinions — especially the bad ones",
        "Lead unnecessary projects and write long recaps no one reads",
        "Use phrases like 'strategic alignment' until people stop asking questions",
        "Pretend to mentor interns while subtly competing with them",
      ],
      correct: "Publicly agree with leadership opinions — especially the bad ones",
    },
  ];

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  const handleVerify = () => {
    setVerifying(true);

    setTimeout(() => {
      const incorrect = questions.filter(
        (q, i) => selectedAnswers[i] !== q.correct
      );

      if (incorrect.length > 0) {
        setVerifying(false);
        setFailed(true);
        setCorrectAnswersShown(true);
      } else {
        setVerifying(false);
        setVerified(true);
      }
    }, 2000);
  };

  const handleRetry = () => {
    setFailed(false);
    setSelectedAnswers({});
  };

  const handleContinue = () => {
    router.push("/logical");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">

        {/* --- NOT VERIFIED YET --- */}
        {!verified && !failed && (
          <>
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">
              Corporate Ethics Acknowledgment Quiz™
            </h1>

            <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Please complete this brief ethics assessment.  
              Answer according to **real-world corporate expectations**, not your conscience.
            </p>

            <div className="w-full text-left bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
              {questions.map((item, i) => (
                <div key={i}>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                    {i + 1}. {item.q}
                  </p>
                  <div className="flex flex-col gap-2">
                    {item.options.map((opt, j) => (
                      <label
                        key={j}
                        className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <input
                          type="radio"
                          name={`q${i}`}
                          value={opt}
                          checked={selectedAnswers[i] === opt}
                          onChange={() =>
                            setSelectedAnswers({ ...selectedAnswers, [i]: opt })
                          }
                          className="accent-black dark:accent-white"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {verifying ? (
              <p className="text-zinc-500 dark:text-zinc-400 animate-pulse mt-4">
                Evaluating moral flexibility... scanning for blind loyalty...
              </p>
            ) : (
              <button
                onClick={handleVerify}
                disabled={!allAnswered}
                className={`mt-6 rounded-full px-8 py-3 text-lg font-medium transition ${
                  !allAnswered
                    ? "bg-zinc-300 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
                    : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                }`}
              >
                Submit for Ethics Calibration →
              </button>
            )}
          </>
        )}

        {/* --- FAILED QUIZ --- */}
        {failed && (
          <>
            <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400">
              ⚠️ Insufficient Moral Alignment Detected
            </h1>

            <p className="max-w-lg text-zinc-600 dark:text-zinc-400">
              Some of your responses suggested integrity, self-respect, or empathy.  
              These traits may interfere with effective corporate performance.  
              Please review the *approved answers* below and try again.
            </p>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-left w-full shadow-sm">
              {questions.map((q, i) => (
                <div key={i} className="mb-5">
                  <p className="text-zinc-800 dark:text-zinc-100 font-medium mb-1">
                    {i + 1}. {q.q}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400 italic">
                    ✅ Correct corporate response: “{q.correct}”
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleRetry}
              className="mt-8 rounded-full bg-black text-white px-8 py-3 text-lg font-medium hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition"
            >
              Redo Ethics Assessment →
            </button>
          </>
        )}

        {/* --- PASSED QUIZ --- */}
        {verified && (
          <>
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">
              Ethics Verification Complete ✅
            </h1>

            <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Congratulations! Our compliance AI has confirmed you possess the
              optimal balance of obedience and moral flexibility.
            </p>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm max-w-md text-left">
              <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Certified Morally Alignable™
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Ethics Verification ID: {Math.floor(Math.random() * 900000) + 100000}
                <br />
                Status: <span className="text-green-600 dark:text-green-400 font-medium">Compliant</span>
                <br />
                Validity: Until next reorganization or whistleblower incident
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                This certificate confirms your readiness to adapt to evolving corporate ethics
                in any fiscal environment.
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="mt-10 rounded-full px-8 py-3 text-lg font-medium bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition"
            >
              Continue to Logical Test →
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
