import { useEffect, useMemo, useState } from "react";
// import useInventory from "../hooks/useInventory";
// import Badge from "./Badge";
import type { InventoryItem } from "../../pharmacy/inventory/Inventory";
import { AlertTriangle,  Grid3x3, Loader2, Package, Plus } from "lucide-react";
import AddDrugModal from "../../pharmacy/inventory/components/AddDrugModal";
import RestockModal from "../../pharmacy/inventory/components/RestockModal";
import { Button } from "../../../components/ui/button";
import InventoryFilters from "../../pharmacy/inventory/components/InventoryFilters";
import BulkActions from "../../pharmacy/inventory/components/BulkActions";
import InventoryTable from "../../pharmacy/inventory/components/InventoryTable";
import { inventory } from "../services/phcApi";

type SortDirection = 'asc' | 'desc';
type SortConfig = { key: keyof InventoryItem; direction: SortDirection };

type StockFilterType = 'low' | 'adequate' | 'overstocked' | '';

export type BulkUpdateType = 'stock' | 'price' | 'threshold' | 'category';

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

type RestockInfo = {
  quantity: number;
  batchNumber?: string;
  expiryDate?: string;
};

export default function InventoryList() {
  const data2 = inventory
  const [inventorySet, setInventorySet] = useState<InventoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [stockFilter, setStockFilter] = useState<StockFilterType>('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'drugName', direction: 'asc' });
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showRestockModal, setShowRestockModal] = useState<boolean>(false);
    const [selectedDrug, setSelectedDrug] = useState<InventoryItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setInventorySet(data2);
      console.log(data2, "datttatay")
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  

  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventorySet?.filter(item => {
      const matchesSearch = !searchTerm || 
        item?.drugName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.brandName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesCategory = !categoryFilter || item?.category === categoryFilter;

      const matchesStock = !stockFilter || (() => {
        const stockStatus: StockFilterType = item?.currentStock <= item?.minThreshold ? 'low' :
                           item?.currentStock <= item?.minThreshold * 2 ? 'adequate' : 'overstocked';
        return stockStatus === stockFilter || 
               (stockFilter === 'adequate' && stockStatus === 'adequate');
      })();

      return matchesSearch && matchesCategory && matchesStock;
    });

    // Sort the filtered results
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [inventorySet, searchTerm, categoryFilter, stockFilter, sortConfig]);

   // Handle sorting
  const handleSort = (key: keyof InventoryItem): void => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle item selection
  const handleSelectItem = (id: string, checked: boolean): void => {
    setSelectedItems(prev => 
      checked ? [...prev, id] : prev?.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean): void => {
    setSelectedItems(checked ? filteredAndSortedInventory?.map(item => item?.id) : []);
  };

  const handleClearSelection = (): void => {
    setSelectedItems([]);
  };

  // Handle filters
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handleClearFilters = (): void => {
    setSearchTerm('');
    setCategoryFilter('');
    setStockFilter('');
  };

  // Handle drug operations
  const handleAddDrug = (newDrug: InventoryItem): void => {
    setInventorySet(prev => [...prev, newDrug]);
  };

  const handleEditDrug = (id: string, updates: Partial<InventoryItem>): void => {
    setInventorySet(prev => prev?.map(item => 
      item?.id === id 
        ? { ...item, ...updates, lastUpdated: new Date()?.toISOString() }
        : item
    ));
  };

  const handleRestockDrug = (drugId: string): void => {
    const drug = inventorySet?.find(item => item?.id === drugId);
    setSelectedDrug(drug || null);
    setShowRestockModal(true);
  };

  const handleRestock = (drugId: string, restockInfo: RestockInfo): void => {
    setInventorySet(prev => prev?.map(item => 
      item?.id === drugId 
        ? { 
            ...item, 
            currentStock: item?.currentStock + restockInfo?.quantity,
            ...(restockInfo?.batchNumber && { batchNumber: restockInfo.batchNumber }),
            ...(restockInfo?.expiryDate && { expiryDate: restockInfo.expiryDate }),
            lastUpdated: new Date()?.toISOString()
          }
        : item
    ));
  };

  const handleRemoveDrug = (id: string): void => {
    if (window.confirm('Are you sure you want to remove this drug from inventory?')) {
      setInventorySet(prev => prev?.filter(item => item?.id !== id));
      setSelectedItems(prev => prev?.filter(item => item !== id));
    }
  };

  // Handle bulk operations
  const handleBulkUpdate = (
    itemIds: string[], 
    updateType: BulkUpdateType, 
    value: string | number
  ): void => {
    setInventorySet(prev => prev?.map(item => {
      if (itemIds?.includes(item?.id)) {
        const updates: Partial<InventoryItem> = { 
          lastUpdated: new Date()?.toISOString() 
        };
        
        switch (updateType) {
          case 'stock':
            updates.currentStock = typeof value === 'string' ? parseInt(value) : value;
            break;
          case 'price':
            updates.price = typeof value === 'string' ? parseFloat(value) : value;
            break;
          case 'threshold':
            updates.minThreshold = typeof value === 'string' ? parseInt(value) : value;
            break;
          case 'category':
            updates.category = String(value);
            break;
        }
        
        return { ...item, ...updates };
      }
      return item;
    }));
    
    setSelectedItems([]);
  };

  const handleBulkExport = (itemIds: string[], format: ExportFormat): void => {
    const exportData = inventorySet?.filter(item => itemIds?.includes(item?.id));
    console.log(`Exporting ${exportData?.length} items as ${format}:`, exportData);
    // Implementation would handle actual export functionality
  };

  const handleBulkDelete = (itemIds: string[]): void => {
    if (window.confirm(`Are you sure you want to delete ${itemIds?.length} selected items?`)) {
      setInventorySet(prev => prev?.filter(item => !itemIds?.includes(item?.id)));
      setSelectedItems([]);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = inventorySet?.length;
    const lowStockItems = inventorySet?.filter(item => item?.currentStock <= item?.minThreshold)?.length;
    const totalValue = inventorySet?.reduce((sum, item) => sum + (item?.currentStock * item?.price), 0);
    const categories = [...new Set(inventorySet.map(item => item.category))]?.length;

    return { totalItems, lowStockItems, totalValue, categories };
  }, [inventorySet]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
          <div className="pt-20 lg:pt-4 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 size={32} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-text-secondary">Loading inventory...</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen ">
      
      <div className={`transition-all duration-300 `}>
        <div className="pt-20 lg:pt-4 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
                <p className="text-gray-400 mt-1">
                  Manage PHC's drug inventory and stock levels
                </p>
              </div>
              
              <Button
                variant="default"
                onClick={() => setShowAddModal(true)}
                className='rounded-md'
              >
                <Plus/>
                Add New Drug
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-border rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Items</p>
                    <p className="text-2xl font-bold text-gray-700">{stats?.totalItems}</p>
                  </div>
                  <Package size={24} className="text-primary" />
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Low Stock</p>
                    <p className="text-2xl font-bold text-red-500">{stats?.lowStockItems}</p>
                  </div>
                  <AlertTriangle size={24} className="text-red-500r" />
                </div>
              </div>

              {/* <div className="bg-white border border-border rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold text-gray-700">${stats?.totalValue?.toFixed(0)}</p>
                  </div>
                  <DollarSign size={24} className="text-green-600" />
                </div>
              </div> */}

              <div className="bg-white rounded-md border border-border p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Categories</p>
                    <p className="text-2xl font-bold text-gray-700">{stats?.categories}</p>
                  </div>
                  <Grid3x3 size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <InventoryFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedItems={selectedItems}
            onBulkUpdate={handleBulkUpdate}
            onBulkExport={handleBulkExport}
            onBulkDelete={handleBulkDelete}
            onClearSelection={handleClearSelection}
          />

          {/* Inventory Table */}
          <InventoryTable
            inventory={filteredAndSortedInventory}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onEdit={handleEditDrug}
            onRestock={handleRestockDrug}
            onRemove={handleRemoveDrug}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Empty State */}
          {filteredAndSortedInventory?.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Package size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No inventory items found</h3>
              <p className="text-text-secondary mb-4">
                {searchTerm || categoryFilter || stockFilter 
                  ? 'Try adjusting your filters or search terms' :'Start by adding your first drug to the inventory'
                }
              </p>
              {!searchTerm && !categoryFilter && !stockFilter && (
                <Button
                  variant="default"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus/>
                  Add First Drug
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <AddDrugModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddDrug}
      />
      <RestockModal
        isOpen={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        onRestock={handleRestock}
        drug={selectedDrug}
      />
    </div>
  );
}
