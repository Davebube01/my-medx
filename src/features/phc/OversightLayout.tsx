import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Pill,
  ActivitySquare,
  LogOut,
  Building2,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const OversightLayout = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const navItems = [
    { path: "/oversight/dashboard", icon: LayoutDashboard, label: "Overview" },
    {
      path: "/oversight/inventory",
      icon: Package,
      label: "Inventory Analysis",
    },
    { path: "/oversight/dispensing", icon: Pill, label: "Dispensing Trends" },
    { path: "/oversight/quality", icon: ActivitySquare, label: "Data Quality" },
    {
      path: "/oversight/phc-management",
      icon: Settings,
      label: "PHC Management",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed */}
      <div className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-10 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">
                PHC Oversight
              </h1>
              <p className="text-xs text-gray-500">Monitor Portal</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-teal-50 text-teal-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${isActive(item.path) ? "text-teal-600" : "text-gray-400"}`}
              />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64">
        <main className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
