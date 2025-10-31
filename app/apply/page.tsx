"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation"; // ✅ Correct import

export default function Apply() {
  const router = useRouter(); // ✅ Correct hook usage
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  const [educationList, setEducationList] = useState([
    { university: "", program: "", gpa: "" },
  ]);
  const [workList, setWorkList] = useState([
    { company: "", role: "", description: "" },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setTimeout(() => setUploaded(true), 1500); // simulate upload delay
    }
  };

  const addEducation = () => {
    setEducationList([...educationList, { university: "", program: "", gpa: "" }]);
  };

  const addWork = () => {
    setWorkList([...workList, { company: "", role: "", description: "" }]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        {!showManualForm ? (
          <>
            {/* Step 1: Upload */}
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              Upload Your CV
            </h1>
            <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Please upload your most recent CV or resume in PDF or Word format.
              Ensure your document includes your contact information,
              educational background, and relevant experience.
            </p>

            {/* Upload box */}
            <label
              htmlFor="cvUpload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-400 bg-white px-10 py-16 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <input
                id="cvUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-lg font-medium">
                {fileName ? `📄 ${fileName}` : "Click to select your file"}
              </span>
              <span className="mt-2 text-sm text-zinc-500">
                Accepted formats: PDF, DOC, or DOCX
              </span>
            </label>

            {/* Upload messages */}
            {fileName && !uploaded && (
              <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">
                Uploading file, please wait...
              </p>
            )}

            {uploaded && (
              <>
                <p className="text-green-600 dark:text-green-400">
                  ✅ Your CV has been uploaded successfully.
                </p>

                {/* Confirmation checkbox */}
                <div className="flex items-center gap-3 mt-4">
                  <input
                    id="confirm"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="h-5 w-5 accent-black dark:accent-white"
                  />
                  <label
                    htmlFor="confirm"
                    className="text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    I confirm that my personal information is correct.
                  </label>
                </div>

                {/* Continue button */}
                <button
                  disabled={!confirmed}
                  onClick={() => setShowManualForm(true)}
                  className={`mt-6 rounded-full px-8 py-3 text-lg font-medium transition ${
                    confirmed
                      ? "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                      : "bg-zinc-300 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
                >
                  Continue to Step 2
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {/* Step 2: Manual Entry */}
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              Complete Your Application
            </h1>
            <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Unfortunately, our system could not extract your details from the
              uploaded CV. Please fill in all required information manually to
              continue your application.
            </p>

            <form className="w-full flex flex-col gap-8 text-left">
              {/* Personal Information */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  Personal Information
                </h2>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </section>

              {/* Education Section */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Education
                </h2>
                {educationList.map((_, index) => (
                  <div key={index} className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-700">
                    <input
                      type="text"
                      placeholder="University Name"
                      className="w-full mb-2 rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <select
                      className="w-full mb-2 rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      <option value="">Program / Degree</option>
                      <option value="bachelor">Bachelor’s</option>
                      <option value="master">Master’s</option>
                      <option value="phd">PhD</option>
                    </select>
                    <input
                      type="text"
                      placeholder="GPA (e.g. 3.8/5.0)"
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Add Another Education
                </button>
              </section>

              {/* Work Experience Section */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Work Experience
                </h2>
                {workList.map((_, index) => (
                  <div key={index} className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-700">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full mb-2 rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <input
                      type="text"
                      placeholder="Role / Position"
                      className="w-full mb-2 rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <textarea
                      rows={3}
                      placeholder="Describe your responsibilities"
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addWork}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Add Another Job
                </button>
              </section>

              {/* Submit */}
              <button
                type="button"
                onClick={() => router.push("/logical")} // ✅ now works correctly
                className="mt-8 rounded-full bg-black px-8 py-3 text-lg font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Submit Information
              </button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
