import { AlertTriangle, DollarSign, Grid3x3, Loader2, Package, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../../components/ui/button';
import InventoryFilters from './components/InventoryFilters';
import BulkActions from './components/BulkActions';
import InventoryTable from './components/InventoryTable';
import AddDrugModal from './components/AddDrugModal';
import RestockModal from './components/RestockModal';

export interface InventoryItem {
  id: string;
  drugName: string;
  brandName: string;
  strength: string;
  form: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  price: number;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  lastUpdated: string;
};

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

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<StockFilterType>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'drugName', direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRestockModal, setShowRestockModal] = useState<boolean>(false);
  const [selectedDrug, setSelectedDrug] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mockInventory: InventoryItem[] = [
    {
      id: '1',
      drugName: 'Acetaminophen',
      brandName: 'Tylenol',
      strength: '500mg',
      form: 'Tablet',
      category: 'Pain Relief',
      currentStock: 150,
      minThreshold: 50,
      price: 12.99,
      manufacturer: 'Johnson & Johnson',
      batchNumber: 'TY2024001',
      expiryDate: '2025-12-31',
      lastUpdated: '2024-10-07T10:30:00Z'
    },
    {
      id: '2',
      drugName: 'Ibuprofen',
      brandName: 'Advil',
      strength: '200mg',
      form: 'Tablet',
      category: 'Pain Relief',
      currentStock: 25,
      minThreshold: 30,
      price: 15.49,
      manufacturer: 'Pfizer',
      batchNumber: 'AD2024002',
      expiryDate: '2025-08-15',
      lastUpdated: '2024-10-06T14:20:00Z'
    },
    {
      id: '3',
      drugName: 'Amoxicillin',
      brandName: 'Amoxil',
      strength: '250mg',
      form: 'Capsule',
      category: 'Antibiotics',
      currentStock: 80,
      minThreshold: 40,
      price: 22.75,
      manufacturer: 'GlaxoSmithKline',
      batchNumber: 'AM2024003',
      expiryDate: '2025-06-30',
      lastUpdated: '2024-10-05T09:15:00Z'
    },
    {
      id: '4',
      drugName: 'Lisinopril',
      brandName: 'Prinivil',
      strength: '10mg',
      form: 'Tablet',
      category: 'Cardiovascular',
      currentStock: 120,
      minThreshold: 60,
      price: 18.25,
      manufacturer: 'Merck',
      batchNumber: 'LI2024004',
      expiryDate: '2025-11-20',
      lastUpdated: '2024-10-04T16:45:00Z'
    },
    {
      id: '5',
      drugName: 'Metformin',
      brandName: 'Glucophage',
      strength: '500mg',
      form: 'Tablet',
      category: 'Diabetes',
      currentStock: 200,
      minThreshold: 80,
      price: 25.50,
      manufacturer: 'Bristol Myers Squibb',
      batchNumber: 'MF2024005',
      expiryDate: '2025-09-10',
      lastUpdated: '2024-10-03T11:30:00Z'
    },
    {
      id: '6',
      drugName: 'Albuterol',
      brandName: 'Ventolin',
      strength: '90mcg',
      form: 'Inhaler',
      category: 'Respiratory',
      currentStock: 15,
      minThreshold: 20,
      price: 45.99,
      manufacturer: 'GlaxoSmithKline',
      batchNumber: 'AL2024006',
      expiryDate: '2025-07-25',
      lastUpdated: '2024-10-02T13:20:00Z'
    },
    {
      id: '7',
      drugName: 'Omeprazole',
      brandName: 'Prilosec',
      strength: '20mg',
      form: 'Capsule',
      category: 'Gastrointestinal',
      currentStock: 90,
      minThreshold: 45,
      price: 28.75,
      manufacturer: 'AstraZeneca',
      batchNumber: 'OM2024007',
      expiryDate: '2025-10-15',
      lastUpdated: '2024-10-01T08:45:00Z'
    },
    {
      id: '8',
      drugName: 'Sertraline',
      brandName: 'Zoloft',
      strength: '50mg',
      form: 'Tablet',
      category: 'Neurological',
      currentStock: 65,
      minThreshold: 35,
      price: 32.25,
      manufacturer: 'Pfizer',
      batchNumber: 'SE2024008',
      expiryDate: '2025-12-05',
      lastUpdated: '2024-09-30T15:10:00Z'
    }
  ];

  // Initialize inventory data
  useEffect(() => {
    const timer = setTimeout(() => {
      setInventory(mockInventory);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventory?.filter(item => {
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
  }, [inventory, searchTerm, categoryFilter, stockFilter, sortConfig]);

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
    setInventory(prev => [...prev, newDrug]);
  };

  const handleEditDrug = (id: string, updates: Partial<InventoryItem>): void => {
    setInventory(prev => prev?.map(item => 
      item?.id === id 
        ? { ...item, ...updates, lastUpdated: new Date()?.toISOString() }
        : item
    ));
  };

  const handleRestockDrug = (drugId: string): void => {
    const drug = inventory?.find(item => item?.id === drugId);
    setSelectedDrug(drug || null);
    setShowRestockModal(true);
  };

  const handleRestock = (drugId: string, restockInfo: RestockInfo): void => {
    setInventory(prev => prev?.map(item => 
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
      setInventory(prev => prev?.filter(item => item?.id !== id));
      setSelectedItems(prev => prev?.filter(item => item !== id));
    }
  };

  // Handle bulk operations
  const handleBulkUpdate = (
    itemIds: string[], 
    updateType: BulkUpdateType, 
    value: string | number
  ): void => {
    setInventory(prev => prev?.map(item => {
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
    const exportData = inventory?.filter(item => itemIds?.includes(item?.id));
    console.log(`Exporting ${exportData?.length} items as ${format}:`, exportData);
    // Implementation would handle actual export functionality
  };

  const handleBulkDelete = (itemIds: string[]): void => {
    if (window.confirm(`Are you sure you want to delete ${itemIds?.length} selected items?`)) {
      setInventory(prev => prev?.filter(item => !itemIds?.includes(item?.id)));
      setSelectedItems([]);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = inventory?.length;
    const lowStockItems = inventory?.filter(item => item?.currentStock <= item?.minThreshold)?.length;
    const totalValue = inventory?.reduce((sum, item) => sum + (item?.currentStock * item?.price), 0);
    const categories = [...new Set(inventory.map(item => item.category))]?.length;

    return { totalItems, lowStockItems, totalValue, categories };
  }, [inventory]);

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
                  Manage your pharmacy's drug inventory and stock levels
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
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

              <div className="bg-white border border-border rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold text-gray-700">${stats?.totalValue?.toFixed(0)}</p>
                  </div>
                  <DollarSign size={24} className="text-green-600" />
                </div>
              </div>

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
  )
}