"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

// Inner component that uses the hooks
function SharePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const [lucky, setLucky] = useState<boolean | null>(null);

  useEffect(() => {
    const result = searchParams.get("result");
    if (!result) {
      router.replace("/");
      return;
    }
    setLucky(result === "lucky");
    setReady(true);
  }, [searchParams, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black text-zinc-700 dark:text-zinc-200">
        <p className="animate-pulse">Preparing your share summary...</p>
      </div>
    );
  }

  const journeySummary = `
- Uploaded a CV that wasn’t readable by the system 
- Manually re-entered my entire education & work history 
- Wrote a “mandatory” motivational cover letter 
- Recorded a 50-second corporate-approved motivation video 
- Passed the Corporate Ethics Acknowledgment Quiz by abandoning all morals 
- Solved logic puzzles with no actual logic 
- Completed a personality test that declared me “Concerningly Unstable” 
- Faced a final corporate coin toss deciding my entire fate 
`;

  const shareText = lucky
    ? `I got lucky — my application survived the corporate coin toss!  
Just finished the Internship Application Simulator™, a brutal satire of modern hiring hoops.  

Here’s what I had to do to “earn” my spot:
${journeySummary}
#InternshipSimulator #CareerLuck #CorporateSurvivor #ModernRecruitment`
    : `I got unlucky — my fake application was filtered out by the AI fairness model.  
Just finished the Internship Application Simulator™, a painfully accurate parody of the job process.  

Here’s what I had to do before being rejected by chance:
${journeySummary}
#InternshipSimulator #JobHunt #FailureIsExperience #CorporateNonsense`;

  const handleShare = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent("https://internship-simulator.vercel.app");
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${text}%20${url}`,
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
          You’ve completed the{" "}
          <span className="font-semibold">Internship Application Simulator™</span>.{" "}
          {lucky
            ? "Against all odds, your fake application has been approved for further bureaucratic suffering."
            : "Sadly, your fake application was rejected by our AI fairness model — but your resilience is unmatched."}
        </p>

        <div className="max-w-md w-full border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-6 text-left shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Your Share Preview
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 whitespace-pre-line">
            {shareText}
          </p>
          <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3 text-sm text-zinc-500 dark:text-zinc-400 italic">
            internship-simulator.vercel.app
          </div>
        </div>

        <button
          onClick={handleShare}
          className="rounded-full bg-[#0A66C2] px-8 py-3 text-lg font-medium text-white hover:bg-[#004182] transition"
        >
          Proceed on LinkedIn
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-full border border-zinc-300 px-8 py-3 text-lg font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 transition"
        >
          Return to Home
        </button>

        <div className="mt-12 max-w-lg text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <p>
            <strong>About this project:</strong> The Internship Application Simulator
            is a parody web experience created for humor and reflection — exaggerating
            the over-engineered, repetitive, and occasionally soul-draining internship
            application process.
          </p>
          <p className="mt-3">
            No data is stored or transmitted — everything runs entirely in your browser.
            This is 100% client-side satire, built to make you laugh (and maybe cry).
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ✅ Wrap with Suspense boundary so build won't fail
export default function SharePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SharePageInner />
    </Suspense>
  );
}
