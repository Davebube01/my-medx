import { useNavigate } from "react-router-dom";
import { Activity, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";

export const PHCLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <nav className="top-0 z-50 w-full pt-6 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
              <Activity className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              MyMed<span className="text-emerald-300">X</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/30">
                PHC
              </span>
            </span>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-lg shadow-emerald-500/20 transition-all rounded-full px-6"
          >
            Staff Login
          </Button>
        </div>
      </nav>

      <main className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl w-full items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 font-medium text-sm">
              <ShieldCheck size={16} />
              Secure PHC Management Terminal
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight">
              Smart Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                Management System
              </span>
            </h1>

            <p className="text-xl text-teal-100/80 max-w-xl leading-relaxed">
              A comprehensive tool for Primary Healthcare Centers to digitized
              patient records, manage dispense inventory, and track basic health
              indicators in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 h-12 text-lg font-medium shadow-emerald-900/20"
                onClick={() => navigate("/login")} // Assuming login is the entry point
              >
                Access Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-12 text-lg bg-transparent"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-teal-200/60 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Inventory Tracking
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Patient Records
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Offline Sync
              </div>
            </div>
          </div>

          {/* Right Column: Visual/Login Card */}
          <div className="hidden lg:block relative animate-in slide-in-from-right-8 fade-in duration-1000 delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 p-8 transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-300">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Authorized Access
                    </h3>
                    <p className="text-xs text-teal-200/60">PHC Staff Only</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/20">
                  Secured
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="h-12 rounded-xl bg-black/20 border border-white/5 animate-pulse"></div>
                <div className="h-12 rounded-xl bg-black/20 border border-white/5 animate-pulse delay-100"></div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white h-12 rounded-xl font-medium shadow-lg shadow-emerald-900/20"
                onClick={() => navigate("/login")}
              >
                Sign In to Portal
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-teal-900/90 border border-white/10 shadow-xl backdrop-blur-md animate-bounce duration-[3000ms]">
              <div className="text-xs text-teal-200/60 uppercase tracking-wider mb-1">
                Active Centers
              </div>
              <div className="text-2xl font-bold text-white">124+</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
