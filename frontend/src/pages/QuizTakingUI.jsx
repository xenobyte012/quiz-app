import React, { useState } from "react";

export default function GeographyQuiz() {
  const [selectedOption, setSelectedOption] = useState(null);

  // Geography specific mock data
  const quizData = {
    subject: "Social Sciences: Geography",
    title: "Mapwork & Physical Features of South Africa",
    teacher: "Sir Sabelo",
    question:
      "Which major river forms the political border between South Africa and Namibia, flowing westward into the Atlantic Ocean?",
    options: [
      "Limpopo River",
      "Vaal River",
      "Orange (Gariep) River",
      "Tugela River",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-emerald-800 text-white p-6 rounded-xl shadow-md">
          <div>
            <span className="bg-emerald-600 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
              {quizData.subject}
            </span>
            <h1 className="text-xl md:text-2xl font-bold mt-2">
              {quizData.title}
            </h1>
            <p className="text-emerald-200 text-sm mt-1">
              Prepared by: {quizData.teacher} • Tsholofelo School
            </p>
          </div>
          <div className="bg-emerald-900/50 p-3 rounded-lg text-center min-w-[120px]">
            <span className="text-xs text-emerald-300 block font-medium">
              Progress
            </span>
            <span className="text-lg font-bold">
              Question 3{" "}
              <span className="text-sm font-normal text-emerald-300">
                of 15
              </span>
            </span>
          </div>
        </div>

        {/* Core Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
              Question 3
            </span>
            <h2 className="text-lg md:text-xl font-medium text-slate-900 mt-1">
              {quizData.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-4">
            {quizData.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedOption === index
                    ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedOption(index)}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center font-semibold text-sm ${
                    selectedOption === index
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 text-slate-500"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="ml-4 text-slate-700 font-medium">
                  {option}
                </span>
                <input
                  type="radio"
                  name="geo-option"
                  className="sr-only" // Hidden visually but accessible
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                />
              </label>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
            <button className="px-5 py-2 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Previous
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium shadow-sm transition-all ${
                selectedOption !== null
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
