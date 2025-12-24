import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Building2, User, Activity } from "lucide-react";
import type { Role } from "../../types";

export const RoleSelect = () => {
  const { user, setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleSelect = async (role: Role) => {
    await setUserRole(role);
    if (role === "pharmacy") navigate("/pharmacy/dashboard");
    else if (role === "phc") navigate("/phc/dashboard");
    else navigate("/search");
  };

  if (!user) return null; // Should be protected by Route anyway

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-3xl w-full text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Choose your account type
        </h2>
        <p className="mt-3 text-gray-600">
          Select how you will be using MyMedX today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Pharmacy Option */}
        <RoleCard
          icon={Building2}
          title="Pharmacy"
          description="Manage inventory, record sales, and be visible to patients."
          onClick={() => handleSelect("pharmacy")}
          color="blue"
        />

        {/* PHC Option */}
        <RoleCard
          icon={Activity}
          title="PHC"
          description="Manage patient records, dispense drugs, and track inventory."
          onClick={() => handleSelect("phc")}
          color="green"
        />

        {/* User Option */}
        <RoleCard
          icon={User}
          title="Patient"
          description="Search for drugs and view your purchase history."
          onClick={() => handleSelect("user")}
          color="purple"
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
