"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function SharePage() {
  const router = useRouter();

  const handleShare = () => {
    const text = encodeURIComponent(
      `Just completed the Internship Application Simulator 🧠💼
Apparently, I'm below average in both logic and personality — a bold start to my career journey! 
#InternshipSimulator #SelfGrowth #JobReady`
    );
    const url = encodeURIComponent("https://internship-simulator.fake/results");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`,
      "_blank"
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black text-center font-sans">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 sm:py-32 sm:px-16">
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Final Step: Share Your Results
        </h1>

        <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400 mb-10">
          You’ve successfully completed the <span className="font-semibold">Internship Application Simulator</span> —
          a satirical project highlighting the sometimes absurd hoops students jump through in modern recruitment.
        </p>

        <div className="max-w-md w-full border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-6 text-left shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Your Share Preview
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            "Just completed the Internship Application Simulator 🧠💼  
            Apparently, I'm below average in both logic and personality — a bold start to my career journey!"
          </p>
          <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3 text-sm text-zinc-500 dark:text-zinc-400 italic">
            internship-simulator.fake/results
          </div>
        </div>

        <button
          onClick={handleShare}
          className="rounded-full bg-[#0A66C2] px-8 py-3 text-lg font-medium text-white hover:bg-[#004182] transition"
        >
          Post on LinkedIn
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-full border border-zinc-300 px-8 py-3 text-lg font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 transition"
        >
          Return to Home
        </button>

        <div className="mt-12 max-w-lg text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <p>
            <strong>About this project:</strong> The Internship Application Simulator is a parody web experience that
            exaggerates the repetitive, over-engineered, and emotionally draining process of applying for internships.
            It’s not meant to mock applicants — it’s meant to laugh *with* them.
          </p>
          <p className="mt-3">
            Every screen, delay, and “assessment” is intentionally designed to feel a little too real — because, well,
            it often is.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
