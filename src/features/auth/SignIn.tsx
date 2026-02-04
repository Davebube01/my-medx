import { useAuth } from "../../hooks/useAuth";
import { Navigate, useSearchParams } from "react-router-dom";
import { Activity, Building2, UserCog } from "lucide-react";
import type { Role } from "../../types";

export const SignIn = () => {
  const { user, signInWithGoogle, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") as Role | null;

  // If no role specified, redirect to selection
  if (!role && !user) {
    return <Navigate to="/role-select" replace />;
  }

  // If already signed in, redirect based on role
  if (user) {
    if (!user.role || user.role === "user")
      return <Navigate to="/role-select" replace />;
    if (user.role === "pharmacy")
      return <Navigate to="/pharmacy/dashboard" replace />;
    if (user.role === "phc") return <Navigate to="/phc/dashboard" replace />;
    if (user.role === "oversight")
      return <Navigate to="/oversight/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  const handleLogin = () => {
    if (role) signInWithGoogle(role);
    else signInWithGoogle();
  };

  const isPhc = role === "phc";
  const isOversight = role === "oversight";

  const getPortalTitle = () => {
    if (isPhc) return "PHC Staff Portal";
    if (isOversight) return "PHC Oversight Network";
    return "Pharmacy Partner Portal";
  };

  const getThemeColor = () => {
    if (isPhc) return "blue";
    if (isOversight) return "teal";
    return "blue";
  };

  const theme = getThemeColor();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className={`p-3 rounded-xl bg-${theme}-600`}>
            {isPhc ? (
              <Activity className="w-8 h-8 text-white" />
            ) : isOversight ? (
              <UserCog className="w-8 h-8 text-white" />
            ) : (
              <Building2 className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {getPortalTitle()}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
