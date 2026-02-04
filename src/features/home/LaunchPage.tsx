
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Search,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "../../components/ui/button";

export const LaunchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans selection:bg-blue-100 overflow-hidden relative">
      {/* Background Dot Pattern - exactly like ChronoTask */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, #9CA3AF 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 w-full pt-6 px-6 sm:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-1.5 rounded-lg shadow-md">
            <Activity size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-gray-900">
            MyMedX
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[15px] text-gray-600">
          <button
            onClick={() => navigate("/pharmacies")}
            className="hover:text-gray-900 transition-colors"
          >
            Find Drugs
          </button>
          {/* <button
            onClick={() => navigate("/pharmacies")}
            className="hover:text-gray-900 transition-colors hover:cursor-pointer"
          >
            By Pharmacy
          </button> */}
          <button
            onClick={() => navigate("/phc")}
            className="hover:text-gray-900 transition-colors hover:cursor-pointer"
          >
            For PHCs
          </button>
        </div>
        {/* <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </button>
          <Button
            onClick={() => navigate("/pharmacies")}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm rounded-lg px-5 py-2 text-[15px] font-medium transition-all"
          >
            Get Started
          </Button>
        </div> */}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-16 pb-32  mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        {/* Central Logo/Icon - exactly like ChronoTask */}
        <div className="mb-10 relative">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center z-20 relative">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Hero Text - matching ChronoTask typography */}
        <h1 className="text-[56px] sm:text-[72px] lg:text-[80px] font-bold text-gray-900 mb-6 leading-[1.1] max-w-5xl mx-auto tracking-tight">
          Connect, Locate, and Manage
          <br />
          <span className="text-[#BBBCC0]">all in one place</span>
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you are finding meds or managing a clinic, MyMedX brings
          verified healthcare solutions to your fingertips.
        </p>

        <Button
          onClick={() => navigate("/pharmacies")}
          className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[15px] font-medium shadow-md transition-all"
        >
          Find Medications Now
        </Button>

        {/* Floating Cards - positioned exactly like ChronoTask */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible w-full h-full max-w-[1400px] mx-auto">
          
          {/* Top Left: Yellow Sticky Note with handwriting */}
          <div className="absolute top-[100px] left-[50px] pointer-events-auto">
            <div className="w-[220px] h-[220px] bg-[#FEFCE8] shadow-xl rounded-br-[60px] p-5 flex flex-col justify-between relative hover:-rotate-3 transition-transform duration-300"
                 style={{ transform: 'rotate(-6deg)' }}>
              {/* Red pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md"></div>
              
              <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'Caveat, cursive', fontSize: '19px' }}>
                Need to find Paracetamol and Amoxicillin nearby...
              </p>
              
              <div className="flex gap-2 mt-auto">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <Search className="h-5 w-5 text-gray-700" />
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg shadow-sm flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Today's Tasks Card */}
          <div className="absolute bottom-[80px] left-[60px] pointer-events-auto">
            <div className="w-[280px] bg-white shadow-xl rounded-2xl p-5 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">Health Center</h3>
                <Activity className="h-5 w-5 text-red-500" />
              </div>
              
              <div className="space-y-3">
                {/* Task 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">Malaria Cases</div>
                    <div className="text-xs text-gray-500 mb-1.5">Sep 10</div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">60%</span>
                </div>

                {/* Task 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">Recovered</div>
                    <div className="text-xs text-gray-500 mb-1.5">Sep 16</div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Reminders Card with Clock */}
          <div className="absolute top-[120px] right-[50px] pointer-events-auto">
            <div className="w-[260px] bg-white shadow-xl rounded-2xl p-5 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-gray-900 mb-4">Inventory Alert</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <Clock className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900">Low Stock</div>
                    <div className="text-xs text-gray-500">Ciprofloxacin 500mg</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Action</span>
                  <span className="text-sm font-semibold text-amber-600">Restock Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Integrations Card */}
          <div className="absolute bottom-[100px] right-[40px] pointer-events-auto">
            <div className="w-[280px] bg-white shadow-xl rounded-2xl p-5 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-gray-900 mb-4">Verified Partners</h3>
              
              <div className="flex gap-2.5 mb-4">
                <div className="w-14 h-14 rounded-xl shadow-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <span className="text-white text-lg font-bold">P1</span>
                </div>
                <div className="w-14 h-14 rounded-xl shadow-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <span className="text-white text-lg font-bold">P2</span>
                </div>
                <div className="w-14 h-14 rounded-xl shadow-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <span className="text-white text-lg font-bold">P3</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 w-fit px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={14} />
                100% Trusted
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Bottom Actions */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200 py-4 px-6 md:hidden z-40">
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/pharmacies")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Find Drugs
          </Button>
          <Button
            onClick={() => navigate("/phc")}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-lg font-medium"
          >
            PHC Login
          </Button>
        </div>
      </div>

    </div>
  );
};