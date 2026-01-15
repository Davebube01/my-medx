import { useState, useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { Search, Download, Calendar, Filter } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import type { ColDef } from "ag-grid-community";

// Mock Data for Sales History
const MOCK_SALES = [
  {
    purchaseId: "P-20251101-001",
    date: "2025-11-01T10:30:00",
    phone: "+2348099990000",
    items: "Paracetamol 500mg (2), Ibuprofen (1)",
    total: 4500,
    attendant: "Sarah J.",
  },
  {
    purchaseId: "P-20251101-002",
    date: "2025-11-01T11:15:00",
    phone: "+2348012345678",
    items: "Amoxicillin (1)",
    total: 2500,
    attendant: "Sarah J.",
  },
  {
    purchaseId: "P-20251101-003",
    date: "2025-11-01T12:00:00",
    phone: "+2348100000000",
    items: "Vitamin C (3), Zinc (3)",
    total: 6000,
    attendant: "Mike T.",
  },
];

export const PharmacyHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = MOCK_SALES.filter(
    (sale) =>
      sale.phone.includes(searchTerm) ||
      sale.purchaseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "date",
        headerName: "Date / Time",
        valueFormatter: (p) => new Date(p.value).toLocaleString(),
        minWidth: 180,
      },
      { field: "purchaseId", headerName: "Purchase ID", filter: true },
      { field: "phone", headerName: "Customer Phone", filter: true },
      {
        field: "items",
        headerName: "Items",
        flex: 2,
        wrapText: true,
        autoHeight: true,
      },
      {
        field: "total",
        headerName: "Total Amount",
        valueFormatter: (p) => formatCurrency(p.value),
        type: "numericColumn",
      },
      { field: "attendant", headerName: "Attendant" },
      {
        headerName: "Actions",
        cellRenderer: () => (
          <button className="text-blue-600 hover:text-blue-800 text-xs font-medium underline">
            View
          </button>
        ),
        width: 100,
        suppressMenu: true,
      },
    ],
    []
  );

  return (
    <PageLayout title="Sales History">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        {/* Filters and Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by phone or Purchase ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-sm font-medium hover:bg-blue-100 ml-auto md:ml-0">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Datagrid */}
        <Datagrid rowData={filteredSales} colDefs={colDefs} />
      </div>
    </PageLayout>
  );
};
