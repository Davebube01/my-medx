import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "../../../../components/ui/input";

interface SelectOption {
  value: string;
  label: string;
}

interface DrugFormData {
  drugName: string;
  brandName: string;
  strength: string;
  form: string;
  category: string;
  currentStock: string;
  minThreshold: string;
  price: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  description: string;
}

interface NewDrug extends Omit<DrugFormData, 'currentStock' | 'minThreshold' | 'price'> {
  id: string;
  currentStock: number;
  minThreshold: number;
  price: number;
  lastUpdated: string;
  createdAt: string;
}

interface FormErrors {
  [key: string]: string;
}

interface AddDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (drug: NewDrug) => void;
}

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'Pain Relief', label: 'Pain Relief' },
  { value: 'Antibiotics', label: 'Antibiotics' },
  { value: 'Cardiovascular', label: 'Cardiovascular' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Respiratory', label: 'Respiratory' },
  { value: 'Gastrointestinal', label: 'Gastrointestinal' },
  { value: 'Neurological', label: 'Neurological' },
  { value: 'Vitamins & Supplements', label: 'Vitamins & Supplements' }
];

const FORM_OPTIONS: SelectOption[] = [
  { value: 'Tablet', label: 'Tablet' },
  { value: 'Capsule', label: 'Capsule' },
  { value: 'Syrup', label: 'Syrup' },
  { value: 'Injection', label: 'Injection' },
  { value: 'Cream', label: 'Cream' },
  { value: 'Drops', label: 'Drops' },
  { value: 'Inhaler', label: 'Inhaler' },
  { value: 'Patch', label: 'Patch' }
];

const INITIAL_FORM_DATA: DrugFormData = {
  drugName: '',
  brandName: '',
  strength: '',
  form: '',
  category: '',
  currentStock: '',
  minThreshold: '',
  price: '',
  manufacturer: '',
  batchNumber: '',
  expiryDate: '',
  description: ''
};

export default function AddDrugModal({ isOpen, onClose, onAdd }: AddDrugModalProps) {
  const [formData, setFormData] = useState<DrugFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof DrugFormData, value: string) => {
    setFormData(prev => ({
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

    if (!formData?.drugName?.trim()) newErrors.drugName = 'Drug name is required';
    if (!formData?.strength?.trim()) newErrors.strength = 'Strength is required';
    if (!formData?.form) newErrors.form = 'Form is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.currentStock || parseFloat(formData?.currentStock) < 0) {
      newErrors.currentStock = 'Valid stock quantity is required';
    }
    if (!formData?.minThreshold || parseFloat(formData?.minThreshold) < 0) {
      newErrors.minThreshold = 'Valid minimum threshold is required';
    }
    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const newDrug: NewDrug = {
        ...formData,
        id: Date.now()?.toString(),
        currentStock: parseInt(formData?.currentStock),
        minThreshold: parseInt(formData?.minThreshold),
        price: parseFloat(formData?.price),
        lastUpdated: new Date()?.toISOString(),
        createdAt: new Date()?.toISOString()
      };
      
      onAdd(newDrug);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/20 flex items-center justify-center z-300 p-4">
      <div className="bg-white border border-border rounded-lg healthcare-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Add New Drug</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
            >
              <X size={20}/>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                // label="Drug Name (Generic)"
                type="text"
                placeholder="Enter generic drug name"
                value={formData?.drugName}
                onChange={(e) => handleInputChange('drugName', e?.target?.value)}
                required
              />

              <Input
                // label="Brand Name"
                type="text"
                placeholder="Enter brand name (optional)"
                value={formData?.brandName}
                onChange={(e) => handleInputChange('brandName', e?.target?.value)}
              />

              <Input
                // label="Strength"
                type="text"
                placeholder="e.g., 500mg, 10ml"
                value={formData?.strength}
                onChange={(e) => handleInputChange('strength', e?.target?.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Form</label>
                <select
                  className="block w-full rounded-md border border-border px-3 py-2 text-sm bg-transparent"
                  value={formData?.form}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('form', e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select drug form
                  </option>
                  {FORM_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  className="block w-full rounded-md border border-border px-3 py-2 text-sm bg-transparent"
                  value={formData?.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <Input
                type="text"
                placeholder="Enter manufacturer name"
                value={formData?.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e?.target?.value)}
              />
            </div>

            {/* Stock Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Enter quantity"
                value={formData?.currentStock}
                onChange={(e) => handleInputChange('currentStock', e?.target?.value)}
                required
              />

              <Input
                type="number"
                placeholder="Enter minimum level"
                value={formData?.minThreshold}
                onChange={(e) => handleInputChange('minThreshold', e?.target?.value)}
                required
              />

              <Input
                
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', e?.target?.value)}
                required
              />
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                
                type="text"
                placeholder="Enter batch number"
                value={formData?.batchNumber}
                onChange={(e) => handleInputChange('batchNumber', e?.target?.value)}
              />

              <Input
                
                type="date"
                value={formData?.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea
                className="block w-full rounded-md border border-border px-3 py-2 text-sm bg-transparent"
                placeholder="Enter drug description or notes"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
              />
            </div>

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
                Add Drug
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}