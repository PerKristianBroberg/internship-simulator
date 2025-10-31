"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-between bg-zinc-50 font-sans dark:bg-black">
      {/* Main content */}
      <main className="flex flex-1 w-full max-w-2xl mx-auto flex-col items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
            Internship Application Simulator
          </h1>
          <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Experience the joy of filling out endless forms, uploading your CV
            three times, and still getting ghosted — all from the comfort of
            your browser.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            className="rounded-full bg-black px-8 py-3 text-lg font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            onClick={() => router.push("/apply")}
          >
            Apply Here
          </button>

          <button
            onClick={() => router.push("/about")}
            className="rounded-full border border-zinc-300 px-8 py-3 text-lg font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Learn More
          </button>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
