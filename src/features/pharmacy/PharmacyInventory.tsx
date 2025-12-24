import { useState } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { InventoryTable } from "../../components/shared/InventoryTable";
import { useInventory } from "../../hooks/useInventory";
import { Plus } from "lucide-react";
import { DrugSearchInput } from "../../components/shared/DrugSearchInput";
import type { Drug } from "../../types";

export const PharmacyInventory = () => {
  const { getInventoryWithDetails, addToInventory, updateStock } =
    useInventory();
  const inventory = getInventoryWithDetails();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal State
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [qty, setQty] = useState(0);
  const [threshold, setThreshold] = useState(10);

  const handleAddSubmit = () => {
    if (!selectedDrug) return;
    addToInventory(selectedDrug.id, qty, threshold);
    setIsAddModalOpen(false);
    setSelectedDrug(null);
    setQty(0);
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
      <InventoryTable
        items={inventory}
        role="pharmacy"
        onUpdateStock={(id) => updateStock(id, 10)} // simple +10 mock
      />

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
