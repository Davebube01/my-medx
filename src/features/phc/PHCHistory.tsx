import { useState, useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { Search, Calendar, Filter } from "lucide-react";
import type { ColDef } from "ag-grid-community";

// Mock Data for PHC History
const MOCK_PHC_DISPENSES = [
  {
    id: "D-20251101-001",
    date: "2025-11-01T09:30:00",
    patientName: "James O.",
    items: "Paracetamol 500mg (2), Ibuprofen (1)",
    dispenser: "Nurse Amina",
  },
  {
    id: "D-20251101-002",
    date: "2025-11-01T10:15:00",
    patientName: "Fatima B.",
    items: "Amoxicillin (1), Vitamin C (2)",
    dispenser: "Dr. Chioma",
  },
];

export const PHCHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_PHC_DISPENSES.filter(
    (d) =>
      d.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "date",
        headerName: "Date / Time",
        valueFormatter: (p) => new Date(p.value).toLocaleString(),
      },
      { field: "patientName", headerName: "Patient", filter: true },
      {
        field: "items",
        headerName: "Drugs Dispensed",
        flex: 2,
        wrapText: true,
        autoHeight: true,
      },
      {
        field: "dispenser",
        headerName: "Dispensed By",
        cellRenderer: (p: any) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            {p.value}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <PageLayout title="Dispensing History">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient or drug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Datagrid */}
        <Datagrid rowData={filtered} colDefs={colDefs} />
      </div>
    </PageLayout>
  );
};
