import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Edit, Plus, Trash2, X } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import type { InventoryItem } from "../Inventory";

interface EditValues {
  currentStock?: number;
  minThreshold?: number;
  price?: number;
}

interface SortConfig {
  key: keyof InventoryItem;
  direction: 'asc' | 'desc';
}

interface InventoryTableProps {
  inventory: InventoryItem[];
  selectedItems: string[];
  onSelectItem: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (id: string, values: EditValues) => void;
  onRestock: (id: string) => void;
  onRemove: (id: string) => void;
  sortConfig: SortConfig | null;
  onSort: (key: keyof InventoryItem) => void;
}

type StockStatus = 'low' | 'medium' | 'high';

interface TableColumn {
  key: keyof InventoryItem;
  label: string;
}

const TABLE_COLUMNS: TableColumn[] = [
  { key: 'drugName', label: 'Drug Name' },
  { key: 'strength', label: 'Strength' },
  { key: 'form', label: 'Form' },
  { key: 'currentStock', label: 'Current Stock' },
  { key: 'minThreshold', label: 'Min Threshold' },
  { key: 'price', label: 'Price' },
  { key: 'lastUpdated', label: 'Last Updated' }
];

export default function InventoryTable({ 
  inventory, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onEdit, 
  onRestock, 
  onRemove,
  sortConfig,
  onSort 
}: InventoryTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<EditValues>({});

  const handleEditStart = (item: InventoryItem) => {
    setEditingId(item?.id);
    setEditValues({
      currentStock: item?.currentStock,
      minThreshold: item?.minThreshold,
      price: item?.price
    });
  };

  const handleEditSave = (id: string) => {
    onEdit(id, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const getStockStatus = (current: number, minimum: number): StockStatus => {
    if (current <= minimum) return 'low';
    if (current <= minimum * 2) return 'medium';
    return 'high';
  };

  const getStockStatusColor = (status: StockStatus): string => {
    switch (status) {
      case 'low': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getSortIcon = (column: keyof InventoryItem) => {
    if (sortConfig?.key !== column) return <ArrowUpDown size={14}/>;
    return sortConfig?.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>;
  };

  return (
    <div className="bg-white border border-border rounded-lg healthcare-shadow overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === inventory?.length && inventory?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              {TABLE_COLUMNS?.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left">
                  <button
                    onClick={() => onSort(column.key)}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary healthcare-transition"
                  >
                    <span>{column?.label}</span>
                    {getSortIcon(column.key)}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventory?.map((item) => {
              const stockStatus = getStockStatus(item?.currentStock, item?.minThreshold);
              const isEditing = editingId === item?.id;
              
              return (
                <tr key={item?.id} className="hover:bg-muted/50 healthcare-transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems?.includes(item?.id)}
                      onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">{item?.drugName}</div>
                      {item?.brandName && (
                        <div className="text-sm text-text-secondary">Brand: {item?.brandName}</div>
                      )}
                      <div className="text-xs text-text-secondary">{item?.category}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{item?.strength}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{item?.form}</td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editValues?.currentStock}
                        onChange={(e) => setEditValues({...editValues, currentStock: parseInt(e?.target?.value)})}
                        className="w-20"
                      />
                    ) : (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(stockStatus)}`}>
                        {item?.currentStock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editValues?.minThreshold}
                        onChange={(e) => setEditValues({...editValues, minThreshold: parseInt(e?.target?.value)})}
                        className="w-20"
                      />
                    ) : (
                      <span className="text-sm text-foreground">{item?.minThreshold}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={editValues?.price}
                        onChange={(e) => setEditValues({...editValues, price: parseFloat(e?.target?.value)})}
                        className="w-24"
                      />
                    ) : (
                      <span className="text-sm text-foreground">${item?.price?.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {new Date(item.lastUpdated)?.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => handleEditSave(item?.id)}
                          >
                            <Check size={14}/>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={handleEditCancel}
                          >
                            <X size={14}/>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => handleEditStart(item)}
                          >
                            <Edit size={14}/>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => onRestock(item?.id)}
                          >
                            <Plus size={14}/>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => onRemove(item?.id)}
                          >
                            <Trash2 size={14}/>
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {inventory?.map((item) => {
          const stockStatus = getStockStatus(item?.currentStock, item?.minThreshold);
          
          return (
            <div key={item?.id} className="bg-surface border border-border rounded-lg p-4 healthcare-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
                    className="mt-1 rounded border-border"
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{item?.drugName}</h3>
                    {item?.brandName && (
                      <p className="text-sm text-text-secondary">Brand: {item?.brandName}</p>
                    )}
                    <p className="text-xs text-text-secondary">{item?.category}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() => onEdit(item?.id, {})}
                  >
                    <Edit size={14}/>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onRestock(item?.id)}
                  >
                    <Plus size={14}/>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Strength:</span>
                  <span className="ml-2 text-foreground">{item?.strength}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Form:</span>
                  <span className="ml-2 text-foreground">{item?.form}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Stock:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(stockStatus)}`}>
                    {item?.currentStock}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Price:</span>
                  <span className="ml-2 text-foreground">${item?.price?.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border text-xs text-text-secondary">
                Last updated: {new Date(item.lastUpdated)?.toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}