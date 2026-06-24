import React, { useEffect, useMemo, useState } from "react";

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("view-quizzes");
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingResults, setLoadingResults] = useState(true);
  const [student, setStudent] = useState({
    name: "Student",
    email: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const studentId = user.id || user._id;

    setStudent({
      name: user.username || user.fullName || user.name || "Student",
      email: user.email || "",
    });

    if (studentId) {
      fetchQuizzes(studentId);
      fetchResults(studentId);
    } else {
      setLoading(false);
      setLoadingResults(false);
    }
  }, []);

  const fetchQuizzes = async (studentId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/quiz/student/${studentId}`);
      const data = await response.json();

      if (response.ok) {
        setQuizzes(data.quizzes || []);
      } else {
        console.error(data.message || "Failed to fetch quizzes");
      }
    } catch (error) {
      console.error("Server connection error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (studentId) => {
    try {
      setLoadingResults(true);
      const response = await fetch(`/api/v1/result/student/${studentId}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.results || []);
      } else {
        console.warn(data.message || "Failed to fetch results");
      }
    } catch (error) {
      console.error("Server connection error fetching results:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const selectAnswer = (questionIndex, answerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerValue,
    }));
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
          studentId,
          answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Could not submit quiz.");
      }

      setSubmissionResult(data.result);
      setQuizSubmitted(true);

      if (studentId) {
        fetchQuizzes(studentId);
        fetchResults(studentId);
      }

      setActiveTab("my-results");
    } catch (error) {
      console.error(error);
      alert("Network error saving responses.");
    }
  };

  const completedCount = useMemo(() => results.length, [results]);

  const availableCount = useMemo(() => {
    return quizzes.filter((quiz) => !quiz.completed).length;
  }, [quizzes]);

  const averageScore = useMemo(() => {
    if (!results.length) return 0;

    const total = results.reduce((sum, result) => {
      const score = Number(result.percentage ?? 0);
      return sum + score;
    }, 0);

    return Math.round(total / results.length);
  }, [results]);

  const bestScore = useMemo(() => {
    if (!results.length) return 0;

    return Math.max(...results.map((r) => Number(r.percentage ?? 0)));
  }, [results]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">
      <aside className="w-full md:w-80 bg-slate-950 text-white md:min-h-screen shadow-2xl">
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg">
              T
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">
                Tsholofelo Portal
              </h2>
              <p className="text-xs text-emerald-400 uppercase tracking-wider mt-1 font-bold">
                Student Room
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Logged in student
            </p>
            <p className="text-lg font-bold mt-1">{student.name}</p>
            {student.email ? (
              <p className="text-sm text-slate-400 mt-1 break-all">
                {student.email}
              </p>
            ) : null}
          </div>
        </div>

        <nav className="p-4 flex gap-2 md:flex-col overflow-x-auto md:overflow-visible">
          <button
            onClick={() => setActiveTab("view-quizzes")}
            className={`min-w-[160px] md:min-w-0 text-left px-4 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-3 ${
              activeTab === "view-quizzes" || activeTab === "take-quiz"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-base">📝</span>
            View Open Quizzes
          </button>

          <button
            onClick={() => setActiveTab("my-results")}
            className={`min-w-[160px] md:min-w-0 text-left px-4 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-3 ${
              activeTab === "my-results"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-base">🏆</span>
            View My Results
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                Student dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Welcome back, {student.name}
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Track your quizzes, results, and performance in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 min-w-[110px]">
                <p className="text-xs text-slate-500 font-semibold">Open</p>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {loading ? "..." : availableCount}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 min-w-[110px]">
                <p className="text-xs text-slate-500 font-semibold">Done</p>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {loadingResults ? "..." : completedCount}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 min-w-[110px]">
                <p className="text-xs text-slate-500 font-semibold">Avg</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">
                  {loadingResults ? "..." : `${averageScore}%`}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 min-w-[110px]">
                <p className="text-xs text-slate-500 font-semibold">Best</p>
                <p className="text-2xl font-black text-cyan-600 mt-1">
                  {loadingResults ? "..." : `${bestScore}%`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {activeTab === "view-quizzes" && (
          <div>
            <header className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Assigned Assessments
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Select an active card to begin your test.
              </p>
            </header>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 font-medium animate-pulse">
                Syncing quizzes with the server...
              </div>
            ) : quizzes.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500">
                No active assessments are available right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                            quiz.completed
                              ? "bg-slate-100 text-slate-600 border-slate-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}
                        >
                          {quiz.completed ? "Completed ✓" : "Available"}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {quiz.questions?.length || 0} questions
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {quiz.title}
                      </h3>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-2">
                        {quiz.subject}
                      </p>
                    </div>

                    <div className="mt-6">
                      {quiz.completed ? (
                        <button
                          disabled
                          className="w-full bg-slate-100 text-slate-400 border border-slate-200 font-bold py-3 px-4 rounded-2xl text-sm cursor-not-allowed"
                        >
                          Already Completed
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
                          className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl text-sm shadow-sm transition-colors"
                        >
                          Start Quiz
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "take-quiz" && activeQuiz && (
          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Leave this quiz? Your current answers will not be saved.",
                    )
                  ) {
                    setActiveTab("view-quizzes");
                  }
                }}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900"
              >
                ← Back to quizzes
              </button>

              <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-full">
                Secure exam mode
              </span>
            </div>

            {!quizSubmitted ? (
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className="bg-gradient-to-r from-slate-950 to-slate-800 text-white p-6 rounded-3xl shadow-sm border border-slate-800">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em]">
                    Quiz in progress
                  </p>
                  <h2 className="text-2xl font-black mt-2">
                    {activeQuiz.title}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    {activeQuiz.subject}
                  </p>
                </div>

                {activeQuiz.questions?.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8"
                  >
                    <div className="pb-4 mb-5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Question {qIndex + 1} of {activeQuiz.questions.length}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    <div className="grid gap-3">
                      {q.options?.map((opt, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                            answers[qIndex] === opt
                              ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`active-q-${qIndex}`}
                            checked={answers[qIndex] === opt}
                            onChange={() => selectAnswer(qIndex, opt)}
                            className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                            required
                          />
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 shrink-0">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="font-semibold text-sm sm:text-base text-slate-700">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-sm transition-colors"
                  >
                    Submit Quiz
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center max-w-xl mx-auto">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🏆
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Submission Successful
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  Your result has been saved and your teacher can now see it.
                </p>

                <div className="my-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Your score
                  </span>
                  <span className="text-4xl font-black text-emerald-600 block mt-2">
                    {submissionResult
                      ? Math.round(
                          (submissionResult.score /
                            submissionResult.totalQuestions) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                  <span className="text-sm text-slate-500 font-semibold mt-2 block">
                    Score: {submissionResult?.score || 0} /{" "}
                    {submissionResult?.totalQuestions || 0}
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab("view-quizzes")}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-sm transition-colors"
                >
                  Return to Quizzes
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "my-results" && (
          <div>
            <header className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {student.name}'s Report Card
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Review your quiz history and performance.
              </p>
            </header>

            {loadingResults ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 font-medium animate-pulse">
                Loading your results...
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-400">
                You have not completed any quizzes yet.
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((res) => {
                  const total =
                    res.totalQuestions || res.quizId?.questions?.length || 0;
                  const score = res.score ?? 0;
                  const percent =
                    res.percentage ??
                    (total > 0 ? Math.round((score / total) * 100) : 0);

                  const evaluationDate = res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Recent session";

                  return (
                    <div
                      key={res._id || res.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-300 transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm sm:text-base">
                          {res.quizId?.title || "Assessment Assignment"}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          {res.quizId?.subject || "General"}
                        </p>
                        <span className="text-xs text-slate-500 font-medium block mt-1">
                          Evaluated on {evaluationDate}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span
                          className={`text-xl font-black block ${
                            percent >= 50 ? "text-emerald-600" : "text-red-500"
                          }`}
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
