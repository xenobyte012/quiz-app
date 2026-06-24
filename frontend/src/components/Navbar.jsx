import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
function Navbar() {
      const navigate = useNavigate();

      const [active, setActive] = useState("dashboard");

  return (
    <aside className="w-full md:w-64 bg-white shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">Tsholofelo</h2>
        <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        <a
          onClick={() => {
            navigate("/teacher-dashboard");
            setActive("dashboard");
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            active === "dashboard"
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          Dashboard
        </a>
        <a
          onClick={() => {
            navigate("/create-quiz");
            setActive("create-quiz");
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            active === "create-quiz"
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          Create Quiz
        </a>
        <a
          onClick={() => {
            navigate("/student-analytics");
            setActive("student-analytics");
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            active === "student-analytics"
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          Students
        </a>
      </nav>
    </aside>
  );
}

export default Navbar