import { Calendar, TrendingUp } from "lucide-react";

const DISPENSING_DATA = [
  { day: "Mon", volume: 450 },
  { day: "Tue", volume: 680 },
  { day: "Wed", volume: 520 },
  { day: "Thu", volume: 890 },
  { day: "Fri", volume: 750 },
  { day: "Sat", volume: 420 },
  { day: "Sun", volume: 310 },
];

const TOP_PRODUCTS = [
  { name: "Paracetamol", units: 2400, color: "bg-teal-500", percentage: 32 },
  { name: "Anti-Malarials", units: 1800, color: "bg-blue-500", percentage: 24 },
  { name: "Antibiotics", units: 1500, color: "bg-purple-500", percentage: 20 },
  { name: "Vitamins", units: 1200, color: "bg-orange-500", percentage: 16 },
  { name: "Others", units: 600, color: "bg-gray-400", percentage: 8 },
];

export const OversightDispensing = () => {
  const maxVolume = Math.max(...DISPENSING_DATA.map((d) => d.volume));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dispensing Trends</h2>
        <p className="text-gray-500">
          Analyze patient consumption patterns and facility outputs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">
              Total Dispensed (7 Days)
            </h4>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            4,020{" "}
            <span className="text-sm font-normal text-gray-500">Units</span>
          </p>
          <span className="text-xs text-green-600 font-medium">
            +18% vs last week
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Avg Daily Volume
          </h4>
          <p className="text-2xl font-bold text-gray-900">
            574 <span className="text-sm font-normal text-gray-500">Units</span>
          </p>
          <span className="text-xs text-gray-500 font-medium">
            Across 42 facilities
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Peak Day</h4>
          <p className="text-2xl font-bold text-gray-900">Thursday</p>
          <span className="text-xs text-gray-500 font-medium">
            890 units dispensed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dispensing Volume Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Weekly Dispensing Volume
          </h3>
          <div className="flex items-end justify-between gap-3 h-64">
            {DISPENSING_DATA.map((data) => {
              const heightPercent = (data.volume / maxVolume) * 100;
              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex flex-col justify-end items-center h-48">
                    <span className="text-xs font-medium text-gray-600 mb-1">
                      {data.volume}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-teal-500 cursor-pointer"
                      style={{ height: `${heightPercent}%` }}
                      title={`${data.day}: ${data.volume} units`}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Dispensed Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Top Dispensed Products
          </h3>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((product) => (
              <div key={product.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${product.color}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {product.units.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">units</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${product.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.percentage}% of total
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent High-Volume Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              facility: "Garki PHC Zone 1",
              drug: "Anti-Malarials",
              units: 500,
              time: "Today, 10:23 AM",
            },
            {
              facility: "Wuse District Hospital",
              drug: "Paracetamol",
              units: 380,
              time: "Today, 9:15 AM",
            },
            {
              facility: "Maitama General Hospital",
              drug: "Antibiotics",
              units: 420,
              time: "Yesterday, 4:30 PM",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">
                  <span className="font-bold">{activity.facility}</span>{" "}
                  dispensed{" "}
                  <span className="font-bold text-teal-600">
                    {activity.units} units
                  </span>{" "}
                  of {activity.drug}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" /> {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
