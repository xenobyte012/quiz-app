import React, { useState, useEffect } from "react";

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("view-quizzes");
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]); // Dynamic state replacing mock array
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    // Read local storage on initial mounting sequence
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const studentId = user.id || user._id;

    if (studentId) {
      fetchQuizzes(studentId);
      fetchResults(studentId);
    } else {
      console.error("No student identifier found in local storage.");
      setLoading(false);
      setLoadingResults(false);
    }
  }, []);

  // Fetching open quizzes assigned to student
  const fetchQuizzes = async (studentId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/quiz/student/${studentId}`);

      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      } else {
        console.warn(`Quizzes endpoint returned status: ${response.status}`);
      }
    } catch (error) {
      console.error("Server connection error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Fetching real database results evaluated for this specific student
  const fetchResults = async (studentId) => {
    try {
      setLoadingResults(true);
      const response = await fetch(`/api/v1/result/student/${studentId}`);

      if (response.ok) {
        const data = await response.json();
        // Adjust array assignment fallback matrix depending on backend payload wrappers
        setResults(data.results || data || []);
      } else {
        console.warn(
          `Results database endpoint returned status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error(
        "Server connection error fetching performance results:",
        error,
      );
    } finally {
      setLoadingResults(false);
    }
  };

  const selectAnswer = (questionIndex, answerValue) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerValue,
    });
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    if (!activeQuiz) return;

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const studentId = user.id || user._id;

      const response = await fetch("/api/v1/result/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: activeQuiz._id,
          studentId: studentId,
          answers: answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(
          data.message || "Could not complete evaluation submission.",
        );
      }

      setSubmissionResult(data.result);
      setQuizSubmitted(true);

      // Instantly refresh dashboard states and metrics collections
      if (studentId) {
        fetchQuizzes(studentId);
        fetchResults(studentId);
      }
    } catch (error) {
      console.error(error);
      alert("Network or database connection error saving responses.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800 bg-slate-950/40">
          <h2 className="text-xl font-black text-white tracking-tight">
            Tsholofelo Portal
          </h2>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-0.5">
            Student Room
          </p>
        </div>
        <nav className="p-4 flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("view-quizzes")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${activeTab === "view-quizzes" || activeTab === "take-quiz" ? "bg-emerald-600 text-white shadow-md" : "hover:bg-slate-800"}`}
          >
            📝 View Open Quizzes
          </button>
          <button
            onClick={() => setActiveTab("my-results")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${activeTab === "my-results" ? "bg-emerald-600 text-white shadow-md" : "hover:bg-slate-800"}`}
          >
            🏆 View My Results
          </button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        {activeTab === "view-quizzes" && (
          <div>
            <header className="mb-6">
              <h1 className="text-2xl font-black text-slate-900">
                Assigned Assessments
              </h1>
              <p className="text-slate-500 text-sm">
                Select an active card to begin your testing sequence.
              </p>
            </header>

            {loading ? (
              <div className="text-slate-500 font-medium text-sm animate-pulse">
                Syncing assessment rosters with server logs...
              </div>
            ) : quizzes.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm font-semibold">
                No active or scheduled evaluation modules found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        {quiz.completed ? (
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                            Completed ✓
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            Active Module
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-400">
                          {quiz.questions?.length || 0} Questions
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {quiz.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">
                        {quiz.subject}
                      </p>
                    </div>

                    {quiz.completed ? (
                      <button
                        disabled
                        className="w-full bg-slate-100 text-slate-400 border border-slate-200 font-bold py-2 px-4 rounded-xl text-sm cursor-not-allowed"
                      >
                        Completed
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveQuiz(quiz);
                          setAnswers({});
                          setQuizSubmitted(false);
                          setSubmissionResult(null);
                          setActiveTab("take-quiz");
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-sm shadow-md shadow-emerald-100 transition-colors"
                      >
                        Launch Quiz Interface
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Live Testing Interface Block */}
        {activeTab === "take-quiz" && activeQuiz && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Aborting this portal view will discard current selection configurations. Proceed?",
                    )
                  ) {
                    setActiveTab("view-quizzes");
                  }
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                &larr; Abort Assessment
              </button>
              <div className="text-right">
                <span className="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1 rounded-full block md:inline-block">
                  Secure Exam Environment
                </span>
              </div>
            </div>

            {!quizSubmitted ? (
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                    Unified Exam Heading
                  </span>
                  <h2 className="text-xl font-black mt-1">
                    {activeQuiz.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {activeQuiz.subject}
                  </p>
                </div>

                {activeQuiz.questions?.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8"
                  >
                    <div className="pb-4 mb-6 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Question {qIndex + 1} of {activeQuiz.questions.length}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 mt-1">
                        {q.question}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {q.options?.map((opt, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${answers[qIndex] === opt ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600" : "border-slate-200 hover:bg-slate-50"}`}
                        >
                          <input
                            type="radio"
                            name={`active-q-${qIndex}`}
                            checked={answers[qIndex] === opt}
                            onChange={() => selectAnswer(qIndex, opt)}
                            className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                            required
                          />
                          <span className="ml-3 font-semibold text-sm text-slate-700">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-end shadow-sm">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-100 transition-colors"
                  >
                    Submit Final Quiz Paper
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🏆
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Submission Successful!
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Your response metrics have been computed and logged onto the
                  administration database engine.
                </p>

                <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Calculated Result
                  </span>
                  <span className="text-4xl font-black text-emerald-600 block mt-1">
                    {submissionResult
                      ? Math.round(
                          (submissionResult.score /
                            submissionResult.totalQuestions) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                  <span className="text-xs text-slate-500 font-semibold mt-1 block">
                    Score: {submissionResult?.score || 0} /{" "}
                    {submissionResult?.totalQuestions || 0} Correct Marks
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab("view-quizzes")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Results Section Panel */}
        {activeTab === "my-results" && (
          <div>
            <header className="mb-6">
              <h1 className="text-2xl font-black text-slate-900">
                Personal Report Card
              </h1>
              <p className="text-slate-500 text-sm">
                Review individual performance records and historic testing
                parameters.
              </p>
            </header>

            {loadingResults ? (
              <div className="text-slate-500 font-medium text-sm animate-pulse">
                Retrieving report credentials from server database...
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm font-semibold">
                You have not completed any evaluated grading sequences yet.
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((res) => {
                  // Fallback safe calculations if backend properties shift fields
                  const total =
                    res.totalQuestions || res.quizId?.questions?.length || 0;
                  const score = res.score ?? 0;
                  const percent =
                    res.percentage ||
                    (total > 0 ? Math.round((score / total) * 100) : 0);

                  // Human-readable standard date localization handling
                  const evaluationDate = res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Recent Session";

                  return (
                    <div
                      key={res._id || res.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm sm:text-base">
                          {res.quizTitle ||
                            res.quizId?.title ||
                            "Assessment Assignment"}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium block mt-0.5">
                          Evaluated on {evaluationDate}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-lg font-black block ${percent >= 50 ? "text-emerald-600" : "text-red-500"}`}
                        >
                          {percent}%
                        </span>
                        <span className="text-xs text-slate-500 font-semibold block">
                          {score}/{total} marks
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
