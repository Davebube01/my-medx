import { PageLayout } from "../../components/shared/PageLayout";
import { StatCard } from "../../components/shared/StatCard";
import { Users, Activity, AlertTriangle, Pill } from "lucide-react";
import { useInventory } from "../../hooks/useInventory";

export const PHCDashboard = () => {
  const { getInventoryWithDetails } = useInventory();
  const inventory = getInventoryWithDetails();

  const lowStockCount = inventory.filter((i) => i.lowStockAlert).length;
  // Mock metrics
  const patientsToday = 24;
  const dispensedToday = 56;
  const registeredPatients = 1205;

  return (
    <PageLayout title="PHC Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Patients Seen Today"
          value={patientsToday}
          icon={Users}
          trend="+4"
          color="blue"
        />
        <StatCard
          title="Drugs Dispensed"
          value={dispensedToday}
          icon={Pill}
          color="green"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockCount}
          icon={AlertTriangle}
          color={lowStockCount > 0 ? "red" : "green"}
        />
        <StatCard
          title="Total Registered"
          value={registeredPatients}
          icon={Activity}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity or Charts would go here */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Chart Placeholder: Patient Visits
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
          List Placeholder: Recently Dispensed
        </div>
      </div>
    </PageLayout>
  );
};
