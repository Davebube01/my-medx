import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Input } from '../../../../components/ui/input';
import { CheckSquare, ChevronDown, Download, Edit, FileSpreadsheet, FileText, Trash2, X } from 'lucide-react';
import type { BulkUpdateType, ExportFormat } from '../Inventory';

interface SelectOption {
  value: string;
  label: string;
}

interface BulkActionsProps {
  selectedItems: string[];
  onBulkUpdate: (itemsIds: string[], updateType: BulkUpdateType, value: string | number) => void;
  onBulkExport: (itemsIds: string[], format: ExportFormat) => void;
  onBulkDelete: (items: string[]) => void;
  onClearSelection: () => void;
}

const BULK_UPDATE_OPTIONS: SelectOption[] = [
  { value: 'stock', label: 'Update Stock Levels' },
  { value: 'price', label: 'Update Prices' },
  { value: 'threshold', label: 'Update Min Thresholds' },
  { value: 'category', label: 'Update Category' }
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'Pain Relief', label: 'Pain Relief' },
  { value: 'Antibiotics', label: 'Antibiotics' },
  { value: 'Cardiovascular', label: 'Cardiovascular' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Respiratory', label: 'Respiratory' }
];

export default function BulkActions({ 
  selectedItems, 
  onBulkUpdate, 
  onBulkExport, 
  onBulkDelete,
  onClearSelection 
}: BulkActionsProps) {
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [bulkUpdateType, setBulkUpdateType] = useState<string | undefined>();
  const [bulkUpdateValue, setBulkUpdateValue] = useState('');

  const handleBulkUpdate = () => {
    if (bulkUpdateType && bulkUpdateValue) {
      onBulkUpdate(selectedItems, bulkUpdateType as BulkUpdateType, bulkUpdateValue);
      setShowBulkUpdateModal(false);
      setBulkUpdateType(undefined);
      setBulkUpdateValue('');
    }
  };

  const handleBulkExport = (format: ExportFormat) => {
    onBulkExport(selectedItems, format);
  };

  if (selectedItems?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <CheckSquare size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedItems?.length} item{selectedItems?.length !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              onClick={onClearSelection}
            >
              <X size={14}/>
              Clear
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUpdateModal(true)}
            >
              <Edit/>
              Bulk Update
            </Button>

            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
              >
                <Download/>
                Export
              </Button>
              <div className="absolute right-0 mt-1 w-48 bg-white border border-border rounded-lg healthcare-shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => handleBulkExport('csv')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted first:rounded-t-lg"
                >
                  <FileText size={16} />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => handleBulkExport('excel')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted"
                >
                  <FileSpreadsheet size={16} />
                  <span>Export as Excel</span>
                </button>
                <button
                  onClick={() => handleBulkExport('pdf')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted last:rounded-b-lg"
                >
                  <FileText size={16} />
                  <span>Export as PDF</span>
                </button>
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkDelete(selectedItems)}
            >
              <Trash2/>
              Delete Selected
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-foreground/20 flex items-center justify-center z-300 p-4">
          <div className="bg-white border border-border rounded-lg healthcare-shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Bulk Update</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBulkUpdateModal(false)}
                >
                  <X size={18}/>
                </Button>
              </div>

              <div className="space-y-4">
                <Select value={bulkUpdateType} onValueChange={(v) => setBulkUpdateType(v)}>
                  <SelectTrigger className='border p-1 flex items-center gap-4 rounded-sm'>
                    <SelectValue placeholder="Select what to update" />
                    <ChevronDown className='' size={18} />
                  </SelectTrigger>
                  <SelectContent className='p-2 rounded-md bg-white'>
                    {BULK_UPDATE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className='border p-1 hover:cursor-pointer hover:bg-gray-100'>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {bulkUpdateType === 'stock' && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">New Stock Level</label>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      value={bulkUpdateValue}
                      onChange={(e) => setBulkUpdateValue(e?.target?.value)}
                    />
                  </div>
                )}

                {bulkUpdateType === 'price' && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">New Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter price"
                      value={bulkUpdateValue}
                      onChange={(e) => setBulkUpdateValue(e?.target?.value)}
                    />
                  </div>
                )}

                {bulkUpdateType === 'threshold' && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">New Minimum Threshold</label>
                    <Input
                      type="number"
                      placeholder="Enter minimum threshold"
                      value={bulkUpdateValue}
                      onChange={(e) => setBulkUpdateValue(e.target.value)}
                    />
                  </div>
                )}

                {bulkUpdateType === 'category' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">New Category</label>
                    <Select value={bulkUpdateValue} onValueChange={(v) => setBulkUpdateValue(v)}>
                      <SelectTrigger className='border p-1 flex items-center gap-4 rounded-sm'>
                        <SelectValue placeholder="Select new category" />
                        <ChevronDown className='' size={18} />
                      </SelectTrigger>
                      <SelectContent className='p-2 rounded-md bg-white'>
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className='border p-1 hover:cursor-pointer hover:bg-gray-100'>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkUpdateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleBulkUpdate}
                  disabled={!bulkUpdateType || !bulkUpdateValue}
                >
                  Update {selectedItems?.length} Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}