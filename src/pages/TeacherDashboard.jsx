import React from "react";

export default function TeacherDashboard() {
  // Mock data for UI purposes
  const rankings = [
    { id: 1, name: "Thabo M.", score: 95, grade: "10A" },
    { id: 2, name: "Lerato K.", score: 88, grade: "10A" },
    { id: 3, name: "Kagiso P.", score: 82, grade: "10B" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Tsholofelo</h2>
          <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <a
            href="#"
            className="block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Create Quiz
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Students
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Sir Sabelo!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your classes today.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm">
            + New Quiz
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">124</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">
              Active Quizzes
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">
              Avg. Class Score
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">76%</p>
          </div>
        </div>

        {/* Student Rankings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Top Performing Students
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Rank</th>
                  <th className="p-4 font-medium">Student Name</th>
                  <th className="p-4 font-medium">Class</th>
                  <th className="p-4 font-medium">Average Score</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="p-4 text-gray-700">{student.name}</td>
                    <td className="p-4 text-gray-600">{student.grade}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                        {student.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
