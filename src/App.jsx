import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./hellow/AdminDashboard"
import Homepage from "./hellow/Homepage";
import QrCodeSuccessView from "./hellow/QrCodeSuccessView"
import TeacherLogin from "./pages/TeacherLogin"
import TeacherDashboard from "./pages/TeacherDashboard"
import GeographyQuiz from "./pages/QuizTakingUI";
import CreateQuiz from "./pages/CreateQuiz"

import AttendanceRegister from "./hellow/AttendanceRegister"
import Classes from "./hellow/Classes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<At />} />
      <Route path="/amin-dashboard" element={<AdminDashboard />} />
      <Route path="/qr-code-success-view" element={<QrCodeSuccessView />} />
    </Routes>
  );
}

export default App;
