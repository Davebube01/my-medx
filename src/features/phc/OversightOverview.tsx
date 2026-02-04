import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  Search,
  MapPin,
  ArrowRight,
  Filter,
} from "lucide-react";

const PHC_DATA = [
  {
    id: 1,
    name: "Garki PHC Zone 1",
    ward: "Garki",
    lga: "AMAC",
    state: "FCT",
    address: "Plot 45, Garki District, Abuja",
    phone: "+234 803 456 7890",
    lastReport: "2 hours ago",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 12,
    patientsServed: 450,
    inventoryValue: "₦2.4M",
    coordinates: "9.0579° N, 7.4951° E",
  },
  {
    id: 2,
    name: "Wuse District Hospital",
    ward: "Wuse",
    lga: "AMAC",
    state: "FCT",
    address: "Wuse Zone 3, Abuja",
    phone: "+234 805 123 4567",
    lastReport: "10 mins ago",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 18,
    patientsServed: 680,
    inventoryValue: "₦3.8M",
    coordinates: "9.0643° N, 7.4892° E",
  },
  {
    id: 3,
    name: "Maitama General Hospital",
    ward: "Maitama",
    lga: "AMAC",
    state: "FCT",
    address: "Maitama District, Abuja",
    phone: "+234 807 890 1234",
    lastReport: "1 day ago",
    status: "Inactive",
    stockStatus: "Critical",
    staffCount: 8,
    patientsServed: 120,
    inventoryValue: "₦890K",
    coordinates: "9.0820° N, 7.4950° E",
  },
  {
    id: 4,
    name: "Asokoro District Hospital",
    ward: "Asokoro",
    lga: "AMAC",
    state: "FCT",
    address: "Asokoro Extension, Abuja",
    phone: "+234 809 234 5678",
    lastReport: "5 hours ago",
    status: "Active",
    stockStatus: "Low",
    staffCount: 15,
    patientsServed: 520,
    inventoryValue: "₦1.9M",
    coordinates: "9.0333° N, 7.5333° E",
  },
  {
    id: 5,
    name: "Nyanya General Hospital",
    ward: "Nyanya",
    lga: "Kuje",
    state: "FCT",
    address: "Nyanya-Karu Road, Abuja",
    phone: "+234 810 345 6789",
    lastReport: "Just now",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 20,
    patientsServed: 890,
    inventoryValue: "₦4.2M",
    coordinates: "8.9833° N, 7.4167° E",
  },
  {
    id: 6,
    name: "Kararuwa PHC",
    ward: "Kararuwa",
    lga: "Bwari",
    state: "FCT",
    address: "Kararuwa Village, Abuja",
    phone: "+234 812 456 7890",
    lastReport: "3 days ago",
    status: "Inactive",
    stockStatus: "Unknown",
    staffCount: 6,
    patientsServed: 85,
    inventoryValue: "₦450K",
    coordinates: "9.1000° N, 7.3500° E",
  },
];

const STATES = ["FCT", "Lagos", "Kano"];
const LGAS: Record<string, string[]> = {
  FCT: ["AMAC", "Bwari", "Gwagwalada", "Kuje"],
  Lagos: ["Ikeja", "Lagos Island", "Surulere"],
  Kano: ["Kano Municipal", "Nassarawa"],
};

export const OversightOverview = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterLGA, setFilterLGA] = useState("");
  const [filterWard, setFilterWard] = useState("");

  const filteredPHCs = PHC_DATA.filter((phc) => {
    const matchesSearch =
      phc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phc.ward.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !filterState || phc.state === filterState;
    const matchesLGA = !filterLGA || phc.lga === filterLGA;
    const matchesWard =
      !filterWard || phc.ward.toLowerCase().includes(filterWard.toLowerCase());

    return matchesSearch && matchesState && matchesLGA && matchesWard;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500">
          Real-time insights across your monitored facilities.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Facilities
              </p>
              <h3 className="text-2xl font-bold text-gray-900">42</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Reporting
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                38{" "}
                <span className="text-sm font-normal text-green-600 ml-1">
                  (90%)
                </span>
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Critical Stockouts
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                5{" "}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  Facilities
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-teal-600" />
          Geographic Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              State
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filterState}
              onChange={(e) => {
                setFilterState(e.target.value);
                setFilterLGA("");
              }}
            >
              <option value="">All States</option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              LGA
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filterLGA}
              onChange={(e) => setFilterLGA(e.target.value)}
              disabled={!filterState}
            >
              <option value="">All LGAs</option>
              {filterState &&
                LGAS[filterState]?.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ward
            </label>
            <input
              type="text"
              placeholder="Filter by ward..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filterWard}
              onChange={(e) => setFilterWard(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterState("");
                setFilterLGA("");
                setFilterWard("");
                setSearchTerm("");
              }}
              className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* PHC List Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900">
            Registered Facilities ({filteredPHCs.length})
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search PHC name or ward..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Facility Name</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Last Report</th>
                <th className="px-6 py-4 font-medium text-center">
                  Stock Status
                </th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPHCs.map((phc) => (
                <tr
                  key={phc.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold shrink-0">
                      {phc.name.charAt(0)}
                    </div>
                    {phc.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {phc.ward}, {phc.lga}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{phc.lastReport}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        phc.stockStatus === "Critical"
                          ? "bg-red-50 text-red-700"
                          : phc.stockStatus === "Low"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {phc.stockStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/oversight/phc/${phc.id}`)}
                      className="text-teal-600 hover:text-teal-700 font-medium text-xs flex items-center justify-center gap-1 mx-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPHCs.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No facilities found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
