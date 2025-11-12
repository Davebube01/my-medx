import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetricCard from "./components/MetricCard";
import { AlertTriangle, Package, TrendingUp, Users } from "lucide-react";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import NotificationPanel from "./components/NotificationPanel";
import StaffOverview from "./components/StaffOverview";


export default function PharmacyDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalInventory: 1247,
    lowStockAlerts: 23,
    staffCount: 8,
    todaysSales: 156
  });

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        todaysSales: prev?.todaysSales + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMetricClick = (metric: string) => {
    switch (metric) {
      case 'inventory': navigate('/inventory-management');
        break;
      case 'staff': console.log('Navigate to staff management');
        break;
      case 'profile': navigate('/pharmacy-profile');
        break;
      default:
        break;
    }
  };
  return (
     <div className="min-h-screen ">
      <main className={`transition-all duration-300`}>
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
            <p className="text-gray-500">
              Welcome back! Here's what's happening at your pharmacy today.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Total Inventory"
              value={dashboardData?.totalInventory?.toLocaleString()}
              subtitle="Active medications"
              icon={Package}
              trend="up"
              trendValue="+12 this week"
              color="primary"
              onClick={() => handleMetricClick('inventory')}
            />
            <MetricCard
              title="Low Stock Alerts"
              value={dashboardData?.lowStockAlerts}
              subtitle="Require attention"
              icon={AlertTriangle}
              trend="down"
              trendValue="-5 from yesterday"
              color="warning"
              onClick={() => handleMetricClick('inventory')}
            />
            <MetricCard
              title="Staff Members"
              value={dashboardData?.staffCount}
              subtitle="Active accounts"
              icon={Users}
              trend="up"
              trendValue="+2 this month"
              color="secondary"
              onClick={() => handleMetricClick('staff')}
            />
            <MetricCard
              title="Today's Sales"
              value={dashboardData?.todaysSales}
              subtitle="Transactions completed"
              icon={TrendingUp}
              trend="up"
              trendValue="+8% vs yesterday"
              color="success"
              onClick={() => handleMetricClick('sales')}
            />
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* <InventoryChart
              type="bar"
              title="Inventory Trends"
              height={300}
              data={[]}
            /> */}
            {/* <InventoryChart
              type="pie"
              title="Stock Status Distribution"
              height={300}
              data={[]}
            /> */}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Activity and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RecentActivity />
            <NotificationPanel />
          </div>

          {/* Staff Overview */}
          <div className="mb-8">
            <StaffOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
