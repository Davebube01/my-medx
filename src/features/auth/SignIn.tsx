import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export const SignIn = () => {
  const { user, signInWithGoogle, loading } = useAuth();
  // const navigate = useNavigate();

  // If already signed in, redirect based on role
  if (user) {
    if (!user.role || user.role === "user")
      return <Navigate to="/role-select" replace />;
    if (user.role === "pharmacy")
      return <Navigate to="/pharmacy/dashboard" replace />;
    if (user.role === "phc") return <Navigate to="/phc/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to MyMedX
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Trusted drug availability & tracking platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
