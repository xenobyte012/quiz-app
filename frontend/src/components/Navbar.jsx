import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/teacher-dashboard",
      icon: <FaHome />,
    },
    {
      name: "Create Quiz",
      path: "/create-quiz",
      icon: <FaClipboardList />,
    },
    {
      name: "Students",
      path: "/teacher-analytics",
      icon: <FaUsers />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-72 min-h-screen bg-slate-900 text-white shadow-2xl ">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-indigo-400">
            Tsholofelo
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Teacher Portal
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="md:hidden sticky top-0 z-50 bg-slate-900 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <div>
            <h1 className="text-lg font-bold text-indigo-400">
              Tsholofelo
            </h1>
            <p className="text-xs text-slate-400">
              Teacher Portal
            </p>
          </div>
        </div>

        <nav className="flex justify-around p-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;