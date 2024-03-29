import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthStore();

  if (token === undefined || token === null) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};
