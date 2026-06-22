import React, { useState } from "react";

export default function CreateQuiz() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Dynamic Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Tsholofelo School</h2>
          <p className="text-xs text-emerald-400 mt-0.5">Sir Sabelo's Portal</p>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          <a
            href="#"
            className="block px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg shadow-sm"
          >
            Create Quiz
          </a>
          <a
            href="#"
            className="block px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            Student Insights
          </a>
        </nav>
      </aside>

      {/* Primary Workshop Area */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <header className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Create New Assessment
          </h1>
          <p className="text-slate-500 mt-1">
            Design questions, assign correct keys, and publish instantly.
          </p>
        </header>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Section: Basic Metadata */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                placeholder="e.g., Term 2 Social Sciences Assessment"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject Category
              </label>
              <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-shadow">
                <option>Social Sciences: Geography</option>
                <option>Social Sciences: History</option>
                <option>Mathematics</option>
                <option>Natural Sciences</option>
              </select>
            </div>
          </div>

          {/* Section: Interactive Question Form Block */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-md font-bold text-slate-800 uppercase tracking-wide">
                Question #1
              </h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                Multiple Choice
              </span>
            </div>

            {/* Question Text Prompt */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Question Prompt
              </label>
              <textarea
                rows="2"
                placeholder="Enter the question text here..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow resize-none"
              ></textarea>
            </div>

            {/* Response Options Inputs */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-semibold text-slate-700">
                Answer Options & Correct Key
              </label>

              {[0, 1, 2, 3].map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200">
                    {String.fromCharCode(65 + val)}
                  </span>
                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + val)}`}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-shadow"
                  />
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-500 hover:text-emerald-600 select-none">
                    <input
                      type="radio"
                      name="correct-answer-key"
                      className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <button
              type="button"
              className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              + Add Next Question
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
              Publish Quiz to Students
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
