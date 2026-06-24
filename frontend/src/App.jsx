import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard"
import Home from "./pages/Home"
import Register from "./pages/Register"
import StudentPortal from "./pages/StudentDashboard";
import CreateQuiz from "./pages/CreateQuiz";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/teacher-dashboard"
        element={<TeacherDashboard />}
      />
      <Route path="/create-quiz" element={ <CreateQuiz /> } /> 
      <Route path="student-dashboard" element={ <StudentPortal /> } /> 
    </Routes>
  );
}

export default App;
