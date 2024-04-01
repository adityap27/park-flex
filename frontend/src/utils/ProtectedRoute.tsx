/**
 * Author : Ketul Patel
 * This file declares Route component which checks user is logged in or not. if not logged route to login page.
 */
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
