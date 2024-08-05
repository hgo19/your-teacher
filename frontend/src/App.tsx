import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./@global/context/auth-context";
import Register from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import AuthCallback from "./@global/utils/AuthCallback";
import TeacherRoom from "./pages/teacher-room/TeacherRoom";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthCallback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/teacher-room" element={<TeacherRoom />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
