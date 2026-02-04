import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Activity,
  UserCog,
  Stethoscope,
  ChevronLeft,
} from "lucide-react";
import type { Role } from "../../types";

export const RoleSelect = () => {
  const navigate = useNavigate();
  const [showPhcOptions, setShowPhcOptions] = useState(false);

  const handleSelect = (role: Role) => {
    if (role === "pharmacy") navigate("/login?role=pharmacy");
    else if (role === "phc") {
      setShowPhcOptions(true);
    }
    // else navigate("/login");
  };

  const handlePhcSubRole = (subRole: "staff" | "oversight") => {
    if (subRole === "staff") navigate("/login?role=phc");
    else navigate("/login?role=oversight");
  };

  if (showPhcOptions) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 animate-in fade-in slide-in-from-right-8 duration-300">
        <div className="max-w-3xl w-full mb-8 relative">
          <button
            onClick={() => setShowPhcOptions(false)}
            className="absolute -left-12 top-1 p-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              PHC Access Portal
            </h2>
            <p className="mt-3 text-gray-600">
              Select your specific role within the Primary Healthcare system.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
          <RoleCard
            icon={Stethoscope}
            title="Facility Staff"
            description="For clinical staff working at a specific PHC facility."
            onClick={() => handlePhcSubRole("staff")}
            color="green"
          />
          <RoleCard
            icon={UserCog}
            title="Oversight / Monitor"
            description="For LGA or State supervisors monitoring multiple facilities."
            onClick={() => handlePhcSubRole("oversight")}
            color="teal"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-300">
      <div className="max-w-3xl w-full text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Choose your account type
        </h2>
        <p className="mt-3 text-gray-600">
          Select how you will be using MyMedX today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Pharmacy Option */}
        <RoleCard
          icon={Building2}
          title="Pharmacy Partner"
          description="Manage inventory, record sales, and be visible to patients."
          onClick={() => handleSelect("pharmacy")}
          color="blue"
        />

        {/* PHC Option */}
        <RoleCard
          icon={Activity}
          title="PHC System"
          description="Access for PHC facilities and oversight monitors."
          onClick={() => handleSelect("phc")}
          color="green"
        />
      </div>
    </div>
  );
};

const RoleCard = ({ icon: Icon, title, description, onClick, color }: any) => {
  const colors = {
    blue: "hover:border-blue-500 hover:ring-blue-100",
    green: "hover:border-green-500 hover:ring-green-100",
    purple: "hover:border-purple-500 hover:ring-purple-100",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-white p-8 rounded-2xl border-2 border-transparent shadow-sm hover:shadow-xl transition-all duration-200 text-left group ${
        colors[color as keyof typeof colors]
      } hover:scale-[1.02]`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
          color === "blue"
            ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
            : color === "green"
              ? "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white"
              : "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </button>
  );
};
