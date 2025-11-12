import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Plus, TrendingUp, X } from "lucide-react";
import { Input } from "../../../../components/ui/input";

interface Drug {
  id: string;
  drugName: string;
  brandName?: string;
  strength: string;
  form: string;
  currentStock: number;
  minThreshold: number;
}

interface RestockFormData {
  quantity: string;
  batchNumber: string;
  expiryDate: string;
  supplierPrice: string;
  notes: string;
}

interface RestockInfo extends Omit<RestockFormData, 'quantity' | 'supplierPrice'> {
  quantity: number;
  supplierPrice: number;
  restockDate: string;
}

interface FormErrors {
  [key: string]: string;
}

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestock: (drugId: string, restockInfo: RestockInfo) => void;
  drug: Drug | null;
}

type StockStatus = 'low' | 'medium' | 'high';

const INITIAL_RESTOCK_DATA: RestockFormData = {
  quantity: '',
  batchNumber: '',
  expiryDate: '',
  supplierPrice: '',
  notes: ''
};

export default function RestockModal({ isOpen, onClose, onRestock, drug }: RestockModalProps) {
  const [restockData, setRestockData] = useState<RestockFormData>(INITIAL_RESTOCK_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof RestockFormData, value: string) => {
    setRestockData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!restockData?.quantity || parseFloat(restockData?.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    if (!restockData?.batchNumber?.trim()) {
      newErrors.batchNumber = 'Batch number is required';
    }
    if (!restockData?.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    if (!restockData?.supplierPrice || parseFloat(restockData?.supplierPrice) <= 0) {
      newErrors.supplierPrice = 'Valid supplier price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    
    if (validateForm() && drug) {
      const restockInfo: RestockInfo = {
        ...restockData,
        quantity: parseInt(restockData?.quantity),
        supplierPrice: parseFloat(restockData?.supplierPrice),
        restockDate: new Date()?.toISOString()
      };
      
      onRestock(drug?.id, restockInfo);
      handleClose();
    }
  };

  const handleClose = () => {
    setRestockData(INITIAL_RESTOCK_DATA);
    setErrors({});
    onClose();
  };

  if (!isOpen || !drug) return null;

  const newStockLevel = drug?.currentStock + (parseInt(restockData?.quantity) || 0);
  const stockStatus: StockStatus = newStockLevel <= drug?.minThreshold ? 'low' : 
                     newStockLevel <= drug?.minThreshold * 2 ? 'medium' : 'high';

  return (
    <div className="fixed inset-0 bg-foreground/20 flex items-center justify-center z-300 p-4">
      <div className="bg-white border border-border rounded-lg healthcare-shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Restock Drug</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
            >
              <X size={20}/>
            </Button>
          </div>

          {/* Drug Information */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="font-medium text-foreground mb-2">{drug?.drugName}</h3>
            {drug?.brandName && (
              <p className="text-sm text-text-secondary mb-1">Brand: {drug?.brandName}</p>
            )}
            <p className="text-sm text-text-secondary mb-1">Strength: {drug?.strength}</p>
            <p className="text-sm text-text-secondary mb-1">Form: {drug?.form}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-text-secondary">Current Stock:</span>
              <span className="font-medium text-foreground">{drug?.currentStock}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Min Threshold:</span>
              <span className="font-medium text-foreground">{drug?.minThreshold}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-foreground mb-1">Restock Quantity</label>
            <Input
              type="number"
              placeholder="Enter quantity to add"
              value={restockData?.quantity}
              onChange={(e) => handleInputChange('quantity', e?.target?.value)}
              required
            />
            {errors?.quantity && <span className="text-sm text-error mt-1">{errors?.quantity}</span>}
           </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Batch Number</label>
              <Input
                type="text"
                placeholder="Enter batch number"
                value={restockData?.batchNumber}
                onChange={(e) => handleInputChange('batchNumber', e?.target?.value)}
                aria-invalid={!!errors?.batchNumber}
                required
              />
              {errors?.batchNumber && <span className="text-sm text-error mt-1">{errors?.batchNumber}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
              <Input
                type="date"
                value={restockData?.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                aria-invalid={!!errors?.expiryDate}
                required
              />
              {errors?.expiryDate && <span className="text-sm text-error mt-1">{errors?.expiryDate}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Supplier Price ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter supplier price per unit"
                value={restockData?.supplierPrice}
                onChange={(e) => handleInputChange('supplierPrice', e?.target?.value)}
                aria-invalid={!!restockData?.supplierPrice}
                required
              />
              {errors?.supplierPrice && <span className="text-sm text-error mt-1">{errors?.supplierPrice}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <Input
                type="text"
                placeholder="Additional notes (optional)"
                value={restockData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
              />
            </div>

            {/* Stock Preview */}
            {restockData?.quantity && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Stock Preview</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">New Stock Level:</span>
                  <span className={`font-medium ${
                    stockStatus === 'low' ? 'text-error' : 
                    stockStatus === 'medium' ? 'text-warning' : 'text-success'
                  }`}>
                    {newStockLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total Cost:</span>
                  <span className="font-medium text-foreground">
                    ${(parseFloat(restockData?.supplierPrice) * parseInt(restockData?.quantity) || 0)?.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
              >
                <Plus/>
                Restock
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}