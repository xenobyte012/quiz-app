import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    avgClassScore: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBoard, setLoadingBoard] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchSummary();
    fetchLeaderboard();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/dashboard/summary");
      const data = await response.json();

      if (response.ok) {
        setSummary(data);
      }
    } catch (error) {
      console.error("Failed to load dashboard summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoadingBoard(true);
      const response = await fetch("/api/v1/dashboard/leaderboard");
      const data = await response.json();

      if (response.ok) {
        setLeaderboard(data.leaderboard || []);
      }
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    } finally {
      setLoadingBoard(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome back, {user.username || "Teacher"}!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Here is your live classroom overview.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm transition-colors"
          >
            + New Quiz
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {loading ? "..." : summary.totalStudents}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">
              Active Quizzes
            </h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {loading ? "..." : summary.totalQuizzes}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">
              Quiz Attempts
            </h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {loading ? "..." : summary.totalAttempts}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">
              Avg. Class Score
            </h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {loading ? "..." : `${summary.avgClassScore}%`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Leaderboard</h2>
              <p className="text-sm text-slate-500">
                Based on average quiz scores from student results.
              </p>
            </div>
          </div>

          {loadingBoard ? (
            <div className="p-6 text-slate-500">Loading leaderboard...</div>
          ) : leaderboard.length === 0 ? (
            <div className="p-6 text-slate-500">
              No quiz results yet. Once students start submitting quizzes, the
              leaderboard will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-slate-50 text-slate-600 text-sm">
                  <tr>
                    <th className="p-4 font-medium">Rank</th>
                    <th className="p-4 font-medium">Student</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Attempts</th>
                    <th className="p-4 font-medium">Average Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 font-semibold text-slate-900">
                        #{index + 1}
                      </td>
                      <td className="p-4 text-slate-800">{student.name}</td>
                      <td className="p-4 text-slate-500">{student.email}</td>
                      <td className="p-4 text-slate-600">{student.attempts}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                            student.averageScore >= 80
                              ? "bg-emerald-100 text-emerald-700"
                              : student.averageScore >= 50
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.averageScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
