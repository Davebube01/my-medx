import { PageLayout } from "../../components/shared/PageLayout";
import { StatCard } from "../../components/shared/StatCard";
import { ShoppingCart, TrendingUp, AlertTriangle, Eye } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { useInventory } from "../../hooks/useInventory";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        {/* Recent Activity or Charts would go here */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Chart Placeholder: Weekly Sales Info
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Chart Placeholder: Most Sold Drugs
        </div>
      </div>
    </PageLayout>
  );
};
