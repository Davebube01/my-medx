import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { Role } from "../../types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on their actual role
    // or a forbidden page
    if (user.role === "pharmacy")
      return <Navigate to="/pharmacy/dashboard" replace />;
    if (user.role === "phc") return <Navigate to="/phc/dashboard" replace />;
    if (user.role === "user") return <Navigate to="/search" replace />;
    return <Navigate to="/role-select" replace />;
  }

  return <>{children}</>;
};
