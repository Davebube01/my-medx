
import { AlertTriangle, Edit2, RefreshCw } from "lucide-react";
import type { InventoryItem } from "../../types";

interface InventoryTableProps {
  items: (InventoryItem & { drugName: string })[]; // Items merged with drug names
  role: "pharmacy" | "phc";
  onUpdateStock: (id: string) => void;
}

export const InventoryTable = ({
  items,
  role,
  onUpdateStock,
}: InventoryTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Drug Name</th>
              <th className="px-6 py-4">Stock Level</th>
              <th className="px-6 py-4">Status</th>
              {role === "phc" && <th className="px-6 py-4">Batch / Expiry</th>}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr
                key={item.inventoryId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.drugName}
                  <div className="text-xs text-gray-400 font-normal mt-0.5">
                    {item.inventoryId}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.quantity}</span>
                    <span className="text-gray-400 text-xs">units</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.lowStockAlert ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                      <AlertTriangle className="w-3 h-3" />
                      Low Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                      In Stock
                    </span>
                  )}
                </td>
                {role === "phc" && (
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs">
                      <span>Batch: {item.batchNumber || "-"}</span>
                      <span className="text-gray-400">
                        Exp: {item.expiryDate || "-"}
                      </span>
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onUpdateStock(item.inventoryId)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Update Stock"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No inventory items found.
        </div>
      )}
    </div>
  );
};
