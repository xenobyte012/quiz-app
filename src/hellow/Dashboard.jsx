import React from "react";
import { Link } from "react-router-dom";
import { Users, LayoutDashboard, Settings, UserPlus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Admin Panel</h2>
        <nav className="space-y-2 flex-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-medium"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/classes"
            className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
          >
            <Users size={20} /> Classes & Register
          </Link>
          <Link
            to="/students"
            className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
          >
            <UserPlus size={20} /> Manage Students
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Overview</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">1,248</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">
              Today's Attendance
            </h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">94.2%</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Quick Jump to Register
        </h2>
        <div className="flex gap-4">
          {["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(
            (grade) => (
              <Link
                key={grade}
                to="/classes"
                className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors font-medium text-slate-700"
              >
                {grade}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

