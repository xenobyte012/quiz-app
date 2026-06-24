import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState({
    title: "",
    subject: "Social Sciences: Geography",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    });
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...quiz.questions];
    updated[index].question = value;

    setQuiz({
      ...quiz,
      questions: updated,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...quiz.questions];
    updated[questionIndex].options[optionIndex] = value;

    setQuiz({
      ...quiz,
      questions: updated,
    });
  };

  const handleCorrectAnswer = (questionIndex, value) => {
    const updated = [...quiz.questions];
    updated[questionIndex].correctAnswer = value;

    setQuiz({
      ...quiz,
      questions: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/quiz/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...quiz,
            teacherId: user?.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message);
      }

      alert("Quiz Created Successfully");

      setQuiz({
        title: "",
        subject: "Social Sciences: Geography",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ],
      });
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Shared Navigation Component */}
      <Navbar />

      {/* Primary Workshop Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-5xl w-full mx-auto">
        <header className="mb-6 sm:mb-8 border-b border-slate-200 pb-4 sm:pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create New Assessment
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Design questions, assign correct keys, and publish instantly.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Section: Basic Metadata */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Quiz Title
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    title: e.target.value,
                  })
                }
                placeholder="e.g., Term 2 Social Sciences Assessment"
                className="w-full px-3.5 py-2 sm:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-base sm:text-sm transition-shadow"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Subject Category
              </label>
              <select
                value={quiz.subject}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    subject: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 sm:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-base sm:text-sm transition-shadow"
              >
                <option value="Social Sciences: Geography">
                  Social Sciences: Geography
                </option>
                <option value="Social Sciences: History">
                  Social Sciences: History
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="Natural Sciences">Natural Sciences</option>
              </select>
            </div>
          </div>

          {/* Section: Dynamic Map Iteration Questions Block */}
          <div className="space-y-4 sm:space-y-6">
            {quiz.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 relative"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-md font-bold text-slate-800 uppercase tracking-wide">
                    Question #{qIndex + 1}
                  </h3>
                  <span className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                    Multiple Choice
                  </span>
                </div>

                {/* Question Text Prompt */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Question Prompt
                  </label>
                  <textarea
                    rows="2"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                    placeholder="Enter the question text here..."
                    className="w-full px-3.5 py-2 sm:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-base sm:text-sm transition-shadow resize-none"
                    required
                  />
                </div>

                {/* Response Options Inputs */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                    Answer Options & Correct Key
                  </label>

                  {question.options.map((option, optionIndex) => {
                    const isCorrect =
                      question.correctAnswer === option && option !== "";
                    return (
                      <div
                        key={optionIndex}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-2.5 sm:p-0 rounded-lg border border-slate-100 sm:border-0 bg-slate-50/50 sm:bg-transparent"
                      >
                        <div className="flex items-center gap-2.5 flex-1">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 transition-colors ${isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-100 border-slate-200 text-slate-500"}`}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                qIndex,
                                optionIndex,
                                e.target.value,
                              )
                            }
                            placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            className={`flex-1 px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-base sm:text-sm transition-all ${isCorrect ? "border-emerald-500 bg-emerald-50/10 shadow-sm" : "border-slate-300 bg-white"}`}
                            required
                          />
                        </div>
                        <label
                          className={`flex items-center justify-center gap-2 cursor-pointer text-xs font-bold select-none shrink-0 px-3 py-2 sm:py-2 rounded-lg transition-all w-full sm:w-auto border ${isCorrect ? "bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-100" : "bg-white border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200"}`}
                        >
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={isCorrect}
                            onChange={() => handleCorrectAnswer(qIndex, option)}
                            className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 accent-emerald-600"
                            required
                          />
                          <span>Correct Key</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Form Action Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={addQuestion}
              className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
            >
              + Add Next Question
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm shadow-md shadow-emerald-100 transition-colors text-center"
            >
              Publish Quiz to Students
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
