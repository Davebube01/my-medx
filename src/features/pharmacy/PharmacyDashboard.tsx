import { PageLayout } from "../../components/shared/PageLayout";
import { StatCard } from "../../components/shared/StatCard";
import { ShoppingCart, TrendingUp, AlertTriangle, Eye } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { useInventory } from "../../hooks/useInventory";
import { Link } from "react-router-dom";
import ReactECharts from "echarts-for-react";

export const PharmacyDashboard = () => {
  const { getInventoryWithDetails } = useInventory();
  const inventory = getInventoryWithDetails();

  // Mock aggregations
  const lowStockCount = inventory.filter((i) => i.lowStockAlert).length;
  // Sales data would come from a "usePurchases" or similar in real app
  const salesToday = 45000;
  const purchasesToday = 12;
  const viewsToday = 156;

  return (
    <PageLayout title="Pharmacy Overview">
      {/* Quick Actions */}
      <div className="mb-8 flex gap-4">
        <Link
          to="/pharmacy/pos"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all font-semibold flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Create Purchase
        </Link>
        <Link
          to="/pharmacy/inventory"
          className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
        >
          View Inventory
        </Link>
        <Link
          to="/pharmacy/sales"
          className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
        >
          View All Sales
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales Today"
          value={formatCurrency(salesToday)}
          icon={TrendingUp}
          trend="+12%"
          color="green"
        />
        <StatCard
          title="Purchases Today"
          value={purchasesToday}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockCount}
          icon={AlertTriangle}
          color={lowStockCount > 0 ? "red" : "green"}
        />
        <StatCard
          title="Pharmacy Views"
          value={viewsToday}
          icon={Eye}
          trend="+5%"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Sales Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Weekly Sales Overview
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
                  name: "Sales",
                  type: "line",
                  smooth: true,
                  data: [12000, 15000, 18000, 14000, 21000, 25000, 23000],
                  areaStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        { offset: 0, color: "rgba(59, 130, 246, 0.5)" },
                        { offset: 1, color: "rgba(59, 130, 246, 0.0)" },
                      ],
                    },
                  },
                  itemStyle: { color: "#3b82f6" },
                },
              ],
            }}
            style={{ height: "300px", width: "100%" }}
          />
        </div>

        {/* Top Selling Drugs Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Top Selling Drugs
          </h3>
          <ReactECharts
            option={{
              tooltip: { trigger: "item" },
              legend: { bottom: "0%" },
              series: [
                {
                  name: "Units Sold",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                  label: { show: false, position: "center" },
                  emphasis: {
                    label: { show: true, fontSize: "18", fontWeight: "bold" },
                  },
                  labelLine: { show: false },
                  data: [
                    { value: 1048, name: "Paracetamol" },
                    { value: 735, name: "Amoxicillin" },
                    { value: 580, name: "Ibuprofen" },
                    { value: 484, name: "Vitamin C" },
                    { value: 300, name: "Artemether" },
                  ],
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
