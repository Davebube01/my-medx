import React from "react";
import usePhcMetrics from "../hooks/usePhcMetrics";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import MetricCard from "../../pharmacy/dashboard/components/MetricCard";
import {
  Building2,
  Package,
  Plus,
  TrendingDown,
  Users,
} from "lucide-react";

export default function PhcHome() {
  const { metrics, loading } = usePhcMetrics();
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Dispense",
      description: "Create Dispense record for patients",
      icon: <Plus size={20} />,
      color: "success",
      onClick: () => navigate("/phc/dispense/create"),
    },
    {
      title: "View Patients",
      description: "Add or manage patients accounts",
      icon: <Users size={20} />,
      color: "primary",
      onClick: () => console.log("Navigate to staff management"),
    },
    {
      title: "View Inventory",
      description: "View Inventory",
      icon: <Building2 size={20} />,
      color: "secondary",
      onClick: () => navigate("/pharmacy/pharmacy-profile"),
    },
    
  ];

  if (loading || !metrics) return <div>Loading metrics...</div>;

  return (
    <div className="min-h-screen ">
      <main className={`transition-all duration-300`}>
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              PHC Dashboard Overview
            </h1>
            <p className="text-gray-500">
              Welcome back! Here's what's happening at your pharmacy today.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Patients Today"
              value={metrics.totalPatientsToday}
              subtitle="Patients visits today"
              icon={Users}
            />

            <MetricCard
              title=" Drugs Dispensed Today"
              value={metrics.drugsDispensedToday}
              subtitle="drug dispensed"
              icon={Package}
              color="secondary"
            />

            <MetricCard
              title="Low Stock Alerts"
              value={metrics.lowStockAlerts}
              subtitle="Low stock"
              icon={TrendingDown}
              color="warning"
            />

            <MetricCard
              title="Registered Patients"
              value={metrics.registeredPatients}
              subtitle="Total patients registered"
              icon={Users}
              color="success"
            />
          </div>
          <div className="bg-white border border-border rounded-lg p-6 healthcare-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:border-primary/20 outline-none border-none shadow-xs"
                  onClick={action?.onClick}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        action?.color === "success"
                          ? "bg-green-600 text-white"
                          : action?.color === "primary"
                          ? "bg-primary text-white"
                          : action?.color === "secondary"
                          ? "bg-teal-600 text-white"
                          : "bg-orange-400 text-warning-foreground"
                      }`}
                    >
                      {React.cloneElement(action.icon, {
                        className: "text-inherit hover:bg-transparent",
                      })}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">
                        {action?.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {action?.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
