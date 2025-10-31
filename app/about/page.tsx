"use client";
import React from "react";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 dark:bg-black text-center font-sans">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 sm:py-32 sm:px-16 max-w-3xl">
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          About Internship Application Simulator
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl leading-relaxed">
          <strong>Internship Application Simulator</strong> is a lighthearted
          satire of modern recruitment processes — a playful commentary on the endless forms,
          broken CV parsers, personality quizzes, and “AI-driven assessments” that students
          face when applying for internships.
        </p>

        <div className="text-left text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 mb-10 shadow-sm max-w-xl">
          <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
            Technical Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li>
              There is <strong>no backend</strong> — all data is handled locally in your browser.
            </li>
            <li>
              Uploaded files (like your CV) are <strong>not stored</strong>, uploaded, or shared anywhere.
            </li>
            <li>
              The “tests” and “results” are <strong>completely random</strong> and have no real scoring logic.
            </li>
            <li>
              No analytics, cookies, or tracking are used. Your data doesn’t leave your computer.
            </li>
            <li>
              The site exists purely for entertainment, parody, and education in front-end development.
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
          This project aims to highlight how over-automation and impersonal systems can make
          something as human as job-seeking feel robotic. Hopefully, it makes you laugh — and
          think twice before filling out your next 12-step “culture-fit” survey.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-10 rounded-full bg-black px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition"
        >
          Return to Home
        </button>
      </main>

      <Footer />
    </div>
  );
}
