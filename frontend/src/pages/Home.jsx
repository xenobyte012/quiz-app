import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Header / Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200">
              T
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-950 block tracking-tight">
                Tsholofelo
              </span>
              <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider block -mt-1">
                Quiz Portal
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a
              href="#how-it-works"
              className="hover:text-indigo-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#how-to-use"
              className="hover:text-indigo-600 transition-colors"
            >
              User Guide
            </a>
            <a
              href="#advantages"
              className="hover:text-indigo-600 transition-colors"
            >
              Advantages
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/register")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all transform hover:-translate-y-0.5">
              Portal Sign In
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-4">
              Welcome to Tsholofelo School Digital Portal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none mb-6">
              Smart Assessments, <br />
              <span className="text-indigo-600">Instant Insights.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
              An interactive evaluation web application designed to bridge the
              gap between testing, immediate feedback, and structural classroom
              rankings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all">
                Access Student Portal
              </button>
              <button className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-3.5 rounded-xl font-bold transition-all">
                Staff Dashboard Access
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
      </section>

      {/* 3. How the System Works */}
      <section
        id="how-it-works"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            How the System Works
          </h2>
          <p className="text-slate-500 mt-2">
            A synchronized workflow linking educators directly to student
            outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Dynamic Creation
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Teachers specify topics like Social Sciences Geography or
              Mathematics, configure optional configurations, input custom
              questions, and lock in the correct key choices securely.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Instant Execution
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Students authenticate safely using prescribed configurations,
              launch standard modular testing interfaces, and select options
              step-by-step.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Real-Time Aggregation
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The engine automatically calculates accurate scoring ratios upon
              completion, generates absolute metrics, and populates the master
              grading sheet.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How to Use (Step-by-Step Roles) */}
      <section id="how-to-use" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              System User Guide
            </h2>
            <p className="text-slate-400 mt-2">
              Tailored instructions based on system authorization criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Teacher Instructions */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
                For Teachers{" "}
                <span className="text-xs font-normal text-slate-400 block">
                  (e.g., Sir Sabelo)
                </span>
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    1
                  </span>
                  <span>
                    Log into the management panel through the staff gateway
                    secure module.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    2
                  </span>
                  <span>
                    Navigate to <strong>"Create Quiz"</strong> to input
                    questions, set subjects, and declare answers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    3
                  </span>
                  <span>
                    Review student results and real-time rank updates via the
                    main <strong>Admin Dashboard</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Student Instructions */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                For Students
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    1
                  </span>
                  <span>
                    Authenticate using your unique school portal login criteria.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    2
                  </span>
                  <span>
                    Select an assigned quiz from the main display list to launch
                    it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mt-0.5 text-white">
                    3
                  </span>
                  <span>
                    Submit final logs to view individual totals, metric marks,
                    and ranks instantly.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Advantages of the System */}
      <section
        id="advantages"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Platform Advantages
          </h2>
          <p className="text-slate-500 mt-2">
            Why Tsholofelo School utilizes digital assessment integration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold mb-4">
              📊
            </div>
            <h4 className="font-bold text-slate-950 mb-2">Automated Grading</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Eliminates paperwork delays by delivering instantaneous
              calculation logic directly on screen submission.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold mb-4">
              🏆
            </div>
            <h4 className="font-bold text-slate-950 mb-2">Live Leaderboards</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Encourages positive student alignment through immediate score
              updates and ranking grids.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold mb-4">
              👁️
            </div>
            <h4 className="font-bold text-slate-950 mb-2">Teacher Oversight</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Provides clear insight metrics for educators to determine which
              specific content sectors require review blocks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold mb-4">
              📱
            </div>
            <h4 className="font-bold text-slate-950 mb-2">
              Responsive Styling
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Built with robust responsive setups allowing fluid access across
              desktops, tablets, or smartphones.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
        <p>
          &copy; {new Date().getFullYear()} Tsholofelo School Quiz Portal. Built
          for excellence.
        </p>
      </footer>
    </div>
  );
}
