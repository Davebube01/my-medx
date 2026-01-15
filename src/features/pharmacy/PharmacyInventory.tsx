import { useState, useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { useInventory } from "../../hooks/useInventory";
import { Plus } from "lucide-react";
import { DrugSearchInput } from "../../components/shared/DrugSearchInput";
import type { Drug } from "../../types";
import type { ColDef } from "ag-grid-community";

export const PharmacyInventory = () => {
  const { getInventoryWithDetails, addToInventory, updateStock } =
    useInventory();
  const inventory = getInventoryWithDetails();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Column Definitions
  const colDefs = useMemo<ColDef[]>(
    () => [
      { field: "drugName", headerName: "Drug Name", flex: 2, filter: true },
      {
        field: "quantity",
        headerName: "Stock Level",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Status",
        valueGetter: (p) =>
          p.data.quantity <= p.data.lowStockThreshold
            ? "Low Stock"
            : "In Stock",
        cellRenderer: (p: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              p.value === "Low Stock"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {p.value}
          </span>
        ),
      },
      { field: "expiryDate", headerName: "Expiry Date" },
      {
        headerName: "Actions",
        cellRenderer: (p: any) => (
          <button
            onClick={() => updateStock(p.data.drugId, 10)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Restock (+10)
          </button>
        ),
      },
    ],
    [updateStock]
  );

  // Modal State
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [qty, setQty] = useState(0);
  const [threshold, setThreshold] = useState(10);
  const [expiry, setExpiry] = useState("");

  const handleAddSubmit = () => {
    if (!selectedDrug) return;
    addToInventory(selectedDrug.id, qty, threshold, expiry);
    setIsAddModalOpen(false);
    setSelectedDrug(null);
    setQty(0);
    setExpiry("");
  };

  return (
    <PageLayout
      title="Inventory Management"
      actions={
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Drug
        </button>
      }
    >
      <Datagrid rowData={inventory} colDefs={colDefs} />

      {/* Simple Add Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Add to Inventory</h3>

            {!selectedDrug ? (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Search Drug
                </label>
                <DrugSearchInput onSelect={setSelectedDrug} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                  <span className="font-medium text-blue-900">
                    {selectedDrug.name}
                  </span>
                  <button
                    onClick={() => setSelectedDrug(null)}
                    className="text-xs text-blue-600 underline"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Initial Quantity
                  </label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSubmit}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add to Inventory
                  </button>
                </div>
              </div>
            )}
            {/* Close button if no drug selected yet */}
            {!selectedDrug && (
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="mt-4 w-full text-center text-gray-500 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};
