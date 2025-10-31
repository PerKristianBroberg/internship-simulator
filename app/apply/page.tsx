"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function Apply() {
  const router = useRouter();
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
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setTimeout(() => setUploaded(true), 1500);
    }
  };

  const addEducation = () => {
    setEducationList([...educationList, { university: "", program: "", gpa: "" }]);
  };

  const addWork = () => {
    setWorkList([...workList, { company: "", role: "", description: "" }]);
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    // Personal info validation
    Object.entries(personalInfo).forEach(([key, val]) => {
      if (!val.trim()) newErrors.push(key);
    });

    // Education validation
    educationList.forEach((edu, idx) => {
      if (!edu.university.trim() || !edu.program.trim() || !edu.gpa.trim()) {
        newErrors.push(`education-${idx}`);
      }
    });

    // Work validation
    workList.forEach((work, idx) => {
      if (!work.company.trim() || !work.role.trim() || !work.description.trim()) {
        newErrors.push(`work-${idx}`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      router.push("/coverletter");
    } else {
      alert(
        "❌ Please fill out all required fields before proceeding. Corporate compliance requires full data completeness."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col w-full max-w-2xl items-center justify-center gap-10 px-6 py-20 text-center sm:py-32 sm:px-16">
        {!showManualForm ? (
          <>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              Upload Your CV
            </h1>
            <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Please upload your most recent CV or resume in PDF or Word format.
              Ensure it includes your full history, achievements, and your cat’s name.
            </p>

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
                    I confirm that my personal information is correct (or close enough).
                  </label>
                </div>

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
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              Complete Your Application
            </h1>
            <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Our system failed to read your CV (as always).  
              Please re-enter every detail manually for your convenience.
            </p>

            <form className="w-full flex flex-col gap-8 text-left">
              {/* Personal Information */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  Personal Information
                </h2>
                <div className="flex flex-col gap-4">
                  {["name", "email", "phone", "address"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      placeholder={
                        field === "name"
                          ? "Full Name"
                          : field === "email"
                          ? "Email Address"
                          : field === "phone"
                          ? "Phone Number"
                          : "Address"
                      }
                      value={(personalInfo as any)[field]}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, [field]: e.target.value })
                      }
                      className={`rounded-md border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${
                        errors.includes(field)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white"
                      }`}
                    />
                  ))}
                </div>
              </section>

              {/* Education Section */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Education
                </h2>
                {educationList.map((edu, index) => (
                  <div key={index} className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-700">
                    <input
                      type="text"
                      placeholder="University Name"
                      value={edu.university}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].university = e.target.value;
                        setEducationList(updated);
                      }}
                      className={`w-full mb-2 rounded-md border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${
                        errors.includes(`education-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Program / Degree"
                      value={edu.program}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].program = e.target.value;
                        setEducationList(updated);
                      }}
                      className={`w-full mb-2 rounded-md border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${
                        errors.includes(`education-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="GPA (e.g. 3.8/5.0)"
                      value={edu.gpa}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].gpa = e.target.value;
                        setEducationList(updated);
                      }}
                      className={`w-full rounded-md border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${
                        errors.includes(`education-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white"
                      }`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Add Another Education
                </button>
              </section>

              {/* Work Experience Section */}
              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Work Experience
                </h2>
                {workList.map((work, index) => (
                  <div key={index} className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-700">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={work.company}
                      onChange={(e) => {
                        const updated = [...workList];
                        updated[index].company = e.target.value;
                        setWorkList(updated);
                      }}
                      className={`w-full mb-2 rounded-md border px-3 py-2 ${
                        errors.includes(`work-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Role / Position"
                      value={work.role}
                      onChange={(e) => {
                        const updated = [...workList];
                        updated[index].role = e.target.value;
                        setWorkList(updated);
                      }}
                      className={`w-full mb-2 rounded-md border px-3 py-2 ${
                        errors.includes(`work-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      }`}
                    />
                    <textarea
                      rows={3}
                      placeholder="Describe your responsibilities"
                      value={work.description}
                      onChange={(e) => {
                        const updated = [...workList];
                        updated[index].description = e.target.value;
                        setWorkList(updated);
                      }}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors.includes(`work-${index}`)
                          ? "border-red-500"
                          : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      }`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addWork}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Add Another Job
                </button>
              </section>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-8 rounded-full bg-black px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
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
