import { Package, Search, Filter} from "lucide-react";

export const OversightInventory = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Inventory Analytics
        </h2>
        <p className="text-gray-500">
          Monitor stock levels and consumption rates across the network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Total SKU Valuation
          </h4>
          <p className="text-2xl font-bold text-gray-900">₦ 45.2M</p>
          <span className="text-xs text-green-600 font-medium">
            +12% vs last month
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Items Below Min Level
          </h4>
          <p className="text-2xl font-bold text-red-600">142</p>
          <span className="text-xs text-red-500 font-medium">
            Requires immediate action
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Expiring Soon (30 days)
          </h4>
          <p className="text-2xl font-bold text-orange-600">89</p>
          <span className="text-xs text-orange-500 font-medium">
            Batches flagged
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Stock Coverage
          </h4>
          <p className="text-2xl font-bold text-gray-900">
            3.2{" "}
            <span className="text-sm font-normal text-gray-500">Months</span>
          </p>
          <span className="text-xs text-gray-500 font-medium">
            Average across network
          </span>
        </div>
      </div>

      {/* Inventory Table Placeholder */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-900">
            Network Stock Levels
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search product..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Paracetamol 500mg
                  </h4>
                  <p className="text-sm text-gray-500">
                    Pack of 12 • 24,000 Units Total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${i === 2 ? "text-red-600" : "text-gray-900"}`}
                >
                  {i === 2 ? "Low Stock" : "Good Stock"}
                </p>
                <p className="text-sm text-gray-500">
                  Distributed in 38 Facilities
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
