import { PageLayout } from "../../components/shared/PageLayout";
import { StatCard } from "../../components/shared/StatCard";
import { Users, Activity, AlertTriangle, Pill } from "lucide-react";
import { useInventory } from "../../hooks/useInventory";
import { Link } from "react-router-dom";
import ReactECharts from "echarts-for-react";

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
      {/* Quick Actions */}
      <div className="mb-8 flex gap-4">
        <Link
          to="/phc/dispense"
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-xl transition-all font-semibold flex items-center gap-2"
        >
          <Pill className="w-5 h-5" />
          Dispense Drugs
        </Link>
        <Link
          to="/phc/inventory"
          className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
        >
          View Inventory
        </Link>
        <Link
          to="/phc/patients"
          className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
        >
          View Patients
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        {/* Patient Visits Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Patient Visits Trend
          </h3>
          <ReactECharts
            option={{
              tooltip: { trigger: "axis" },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              yAxis: { type: "value" },
              series: [
                {
                  name: "Patients",
                  type: "line",
                  data: [12, 18, 15, 25, 20, 10, 5],
                  lineStyle: { color: "#10b981", width: 4 },
                  itemStyle: { color: "#10b981" },
                },
              ],
            }}
            style={{ height: "300px", width: "100%" }}
          />
        </div>

        {/* Dispense Category Summary */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Dispense Category Summary
          </h3>
          <ReactECharts
            option={{
              tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: { type: "value" },
              yAxis: {
                type: "category",
                data: [
                  "Antimalarial",
                  "Antibiotics",
                  "Analgesics",
                  "Vitamins",
                  "Supplements",
                ],
              },
              series: [
                {
                  name: "Dispensed",
                  type: "bar",
                  stack: "total",
                  label: { show: true },
                  emphasis: { focus: "series" },
                  data: [120, 132, 101, 134, 90],
                  itemStyle: { color: "#10b981" },
                },
              ],
            }}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
      </div>
    </PageLayout>
  );
};
