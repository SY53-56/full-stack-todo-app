import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ToggleContext } from "../context/context";

export default function PrivateRoute({ children }) {
  const { isAuth } = useContext(ToggleContext);

  // If user is NOT authenticated, redirect to login
  if (!isAuth) {
    return <Navigate to="/signup" replace />;
  }

  // If authenticated, render the protected children
  return children;
}
