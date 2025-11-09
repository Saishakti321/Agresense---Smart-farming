import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("Auth") === "true";

  if (!isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // If logged in, show the protected content
};

export default ProtectedRoute;
