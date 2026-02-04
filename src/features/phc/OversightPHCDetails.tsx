import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Activity,
  Package,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { OVERSIGHT_PHC_DATA } from "./oversightData";

export const OversightPHCDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const phc = OVERSIGHT_PHC_DATA.find((p) => p.id === Number(id));

  if (!phc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            PHC Not Found
          </h2>
          <button
            onClick={() => navigate("/oversight/dashboard")}
            className="text-teal-600 hover:text-teal-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const stockData = [
    {
      drug: "Paracetamol 500mg",
      currentStock: 450,
      minStock: 200,
      maxStock: 1000,
      status: "Healthy",
      lastRestocked: "2024-01-28",
    },
    {
      drug: "Amoxicillin 250mg",
      currentStock: 180,
      minStock: 200,
      maxStock: 800,
      status: "Low",
      lastRestocked: "2024-01-20",
    },
    {
      drug: "Metformin 500mg",
      currentStock: 45,
      minStock: 150,
      maxStock: 600,
      status: "Critical",
      lastRestocked: "2024-01-15",
    },
    {
      drug: "Ibuprofen 400mg",
      currentStock: 320,
      minStock: 150,
      maxStock: 700,
      status: "Healthy",
      lastRestocked: "2024-02-01",
    },
  ];

  const stockOutEvents = [
    {
      drug: "Artemether-Lumefantrine",
      dateOccurred: "2024-01-25",
      duration: "3 days",
      impact: "High",
      resolved: true,
    },
    {
      drug: "Oral Rehydration Salts",
      dateOccurred: "2024-01-18",
      duration: "5 days",
      impact: "Medium",
      resolved: true,
    },
    {
      drug: "Metformin 500mg",
      dateOccurred: "2024-02-02",
      duration: "Ongoing",
      impact: "High",
      resolved: false,
    },
  ];

  const dispenseTotals = [
    { drug: "Paracetamol 500mg", dispensed: 1240, period: "Last 30 days" },
    { drug: "Amoxicillin 250mg", dispensed: 890, period: "Last 30 days" },
    { drug: "Metformin 500mg", dispensed: 650, period: "Last 30 days" },
    { drug: "Ibuprofen 400mg", dispensed: 520, period: "Last 30 days" },
    { drug: "Artemether-Lumefantrine", dispensed: 380, period: "Last 30 days" },
  ];

  const lowStockAlerts = stockData.filter(
    (item) => item.status === "Low" || item.status === "Critical",
  );

  const trends = [
    {
      metric: "Total Patients Served",
      current: 450,
      previous: 420,
      change: "+7.1%",
      trend: "up",
    },
    {
      metric: "Average Daily Dispenses",
      current: 42,
      previous: 38,
      change: "+10.5%",
      trend: "up",
    },
    {
      metric: "Stock-out Incidents",
      current: 3,
      previous: 5,
      change: "-40%",
      trend: "down",
    },
    {
      metric: "Inventory Turnover",
      current: 2.4,
      previous: 2.1,
      change: "+14.3%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <button
          onClick={() => navigate("/oversight/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-2xl">
              {phc.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{phc.name}</h1>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {phc.ward}, {phc.lga}, {phc.state}
              </p>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <Phone className="w-4 h-4" />
                {phc.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-500">Status</p>
              <p
                className={`font-bold ${phc.status === "Active" ? "text-green-600" : "text-red-600"}`}
              >
                {phc.status}
              </p>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-500">Last Report</p>
              <p className="font-medium text-gray-900">{phc.lastReport}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Staff Count</p>
              <p className="text-xl font-bold text-gray-900">
                {phc.staffCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Patients (30d)</p>
              <p className="text-xl font-bold text-gray-900">
                {phc.patientsServed}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Inventory Value</p>
              <p className="text-xl font-bold text-gray-900">
                {phc.inventoryValue}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                phc.stockStatus === "Critical"
                  ? "bg-red-50"
                  : phc.stockStatus === "Low"
                    ? "bg-yellow-50"
                    : "bg-green-50"
              }`}
            >
              <Package
                className={`w-5 h-5 ${
                  phc.stockStatus === "Critical"
                    ? "text-red-600"
                    : phc.stockStatus === "Low"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              />
            </div>
            <div>
              <p className="text-xs text-gray-500">Stock Status</p>
              <p
                className={`text-xl font-bold ${
                  phc.stockStatus === "Critical"
                    ? "text-red-600"
                    : phc.stockStatus === "Low"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                {phc.stockStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Low Stock Alerts ({lowStockAlerts.length})
          </h2>
          <div className="space-y-3">
            {lowStockAlerts.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  item.status === "Critical"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.drug}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Current: {item.currentStock} units • Minimum:{" "}
                      {item.minStock} units
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Stock Levels */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-600" />
          Current Stock Levels
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Drug Name</th>
                <th className="px-4 py-3 text-left font-medium">
                  Current Stock
                </th>
                <th className="px-4 py-3 text-left font-medium">Min/Max</th>
                <th className="px-4 py-3 text-left font-medium">
                  Last Restocked
                </th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stockData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.drug}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.currentStock} units
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.minStock} / {item.maxStock}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.lastRestocked}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === "Critical"
                          ? "bg-red-50 text-red-700"
                          : item.status === "Low"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock-out Events */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-orange-600" />
          Stock-out Events
        </h2>
        <div className="space-y-3">
          {stockOutEvents.map((event, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{event.drug}</p>
                    {event.resolved ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.dateOccurred}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Duration: {event.duration}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        event.impact === "High"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {event.impact} Impact
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.resolved
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {event.resolved ? "Resolved" : "Ongoing"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispense Totals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Dispense Totals per Drug
        </h2>
        <div className="space-y-3">
          {dispenseTotals.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{item.drug}</p>
                <p className="text-xs text-gray-500">{item.period}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {item.dispensed}
                </p>
                <p className="text-xs text-gray-500">units dispensed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends & Program Indicators */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Trends & Program Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <p className="text-sm text-gray-500 mb-2">{trend.metric}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">
                  {trend.current}
                </p>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded ${
                    trend.trend === "up"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {trend.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{trend.change}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                vs previous period: {trend.previous}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
