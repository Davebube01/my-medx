import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Users,
  History,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const role = user.role;

  const getLinks = () => {
    if (role === "pharmacy") {
      return [
        { to: "/pharmacy/dashboard", icon: LayoutDashboard, label: "Overview" },
        { to: "/pharmacy/pos", icon: ShoppingCart, label: "Create Purchase" }, // POS
        { to: "/pharmacy/inventory", icon: Pill, label: "Inventory" },
        { to: "/pharmacy/sales", icon: History, label: "Sales History" },
        { to: "/pharmacy/profile", icon: Settings, label: "Profile" },
      ];
    }
    if (role === "phc") {
      return [
        { to: "/phc/dashboard", icon: LayoutDashboard, label: "Overview" },
        { to: "/phc/patients", icon: Users, label: "Patients" },
        { to: "/phc/dispense", icon: Activity, label: "Dispense" }, // Create Dispense
        { to: "/phc/inventory", icon: Pill, label: "Inventory" }, // No prices
        { to: "/phc/history", icon: History, label: "History" },
        { to: "/phc/settings", icon: Settings, label: "Settings" },
      ];
    }
    return [
      { to: "/search", icon: LayoutDashboard, label: "Search Drugs" },
      { to: "/history", icon: History, label: "My Purchases" },
    ];
  };

  const links = getLinks();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-20">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          MyMedX
        </h1>
        <span className="text-xs text-gray-500 font-medium px-2 py-0.5 bg-gray-100 rounded-full mt-2 inline-block capitalize">
          {role} Portal
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <link.icon className="w-5 h-5 transition-transform group-hover:scale-105" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
