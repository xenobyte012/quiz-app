import React from "react";
import { Link } from "react-router-dom";

export default function Classes() {
  const grades = [
    { level: "Grade 10", classes: ["10A", "10B", "10C", "10D", "10E"] },
    { level: "Grade 11", classes: ["11A", "11B", "11C", "11D"] },
    { level: "Grade 12", classes: ["12A", "12B", "12C"] },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Select a Class
        </h1>
        <p className="text-slate-500 mb-8">
          Choose a grade and class to mark attendance.
        </p>

        <div className="space-y-8">
          {grades.map((grade) => (
            <div
              key={grade.level}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
                {grade.level}
              </h2>
              <div className="flex flex-wrap gap-4">
                {grade.classes.map((className) => (
                  <Link
                    key={className}
                    to={`/attendance/${grade.level.replace(" ", "").toLowerCase()}/${className}`}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 hover:border-slate-900"
                  >
                    Class {className}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
