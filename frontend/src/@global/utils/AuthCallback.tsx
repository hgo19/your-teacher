import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const AuthCallback: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/teacher-room" />;
};

export default AuthCallback;
