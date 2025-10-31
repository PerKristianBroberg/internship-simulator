"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function MotivationVideoPage() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<string[] | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Now includes .mp4
    const allowed = [".flv", ".mov", ".corpvid", ".mp4"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowed.includes(ext)) {
      alert(
        "❌ Invalid format. Accepted formats are: .flv, .mov, .mp4, or .corpvid (our proprietary standard)."
      );
      setFileName(null);
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      runFakeAnalysis();
    }, 1500);
  };

  const runFakeAnalysis = () => {
    setProcessing(true);

    const possibleKeywords = [
      "teamwork",
      "innovation",
      "leadership",
      "synergy",
      "growth mindset",
      "collaboration",
      "strategic thinking",
      "agility",
      "impact",
      "problem solving",
      "results-driven",
      "stakeholder alignment",
      "initiative",
    ];

    const randomSubset = possibleKeywords
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 4);

    setTimeout(() => {
      setProcessing(false);
      setAnalysis(randomSubset);
      setSuccess(true);

      setTimeout(() => {
        router.push("/ethics");
      }, 4000);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
          Mandatory Motivation Video Upload
        </h1>

        <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          To ensure cultural and skill alignment, please upload a short (max 60 seconds)
          video describing why you’re excited to join our company and how your
          experience aligns with our core values.
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Accepted formats: <strong>.flv</strong>, <strong>.mov</strong>, <strong>.mp4</strong>, or proprietary <strong>.corpvid</strong>.
        </p>

        {/* Upload box */}
        <label
          htmlFor="videoUpload"
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-10 py-16 transition
            ${
              processing
                ? "border-zinc-400 bg-zinc-100 text-zinc-500 cursor-wait"
                : "border-zinc-400 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700"
            }`}
        >
          <input
            id="videoUpload"
            type="file"
            accept=".flv,.mov,.mp4,.corpvid" // ✅ Updated here
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading || processing}
          />
          <span className="text-lg font-medium">
            {fileName
              ? `🎥 ${fileName}`
              : uploading
              ? "Uploading video..."
              : "Click to select your motivational video"}
          </span>
          <span className="mt-2 text-sm text-zinc-500">
            Must clearly articulate motivation and include at least 3 corporate buzzwords.
          </span>
        </label>

        {/* Status messages */}
        {uploading && (
          <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">
            Uploading your inspiration...
          </p>
        )}

        {processing && (
          <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">
            Running AI enthusiasm &amp; buzzword analysis...
          </p>
        )}

        {analysis && (
          <div className="mt-6 w-full max-w-md text-left rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
              🔍 AI Video Analysis Report
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-2">
              Detected keywords related to the job description:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300">
              {analysis.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
            <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
              ✅ Video approved. You have demonstrated sufficient corporate alignment.
            </p>
          </div>
        )}

        {success && (
          <p className="text-zinc-500 dark:text-zinc-400 animate-pulse mt-2">
            Redirecting to the next step (Corporate Ethics Quiz)...
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
