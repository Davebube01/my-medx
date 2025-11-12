import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "../../../../components/ui/input";
import { Building2, ChevronDown } from "lucide-react";
import type { ChangeEvent, JSX } from "react";
import type { FormFieldName } from "../PharmacyProfile";

// Types for select options
interface SelectOption {
  value: string;
  label: string;
}

// Props interface
interface PharmacyDetailsFormProps {
  formData: {
    name: string;
    licenseNumber: string;
    type: string;
    phone: string;
    email: string;
    operatingHours: string;
    description: string;
    website: string;
    emergencyContact: string;
  };
  errors: {
    [key: string]: string;
  };
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (name: FormFieldName, value: string | number) => void;
  isLoading: boolean;
}

export default function PharmacyDetailsForm({
  formData,
  errors,
  onInputChange,
  onSelectChange,
  isLoading,
}: PharmacyDetailsFormProps): JSX.Element {
  const operatingHours: SelectOption[] = [
    { value: "24/7", label: "24/7 - Always Open" },
    { value: "6am-10pm", label: "6:00 AM - 10:00 PM" },
    { value: "8am-8pm", label: "8:00 AM - 8:00 PM" },
    { value: "9am-6pm", label: "9:00 AM - 6:00 PM" },
    { value: "custom", label: "Custom Hours" },
  ];

  const pharmacyTypes: SelectOption[] = [
    { value: "retail", label: "Retail Pharmacy" },
    { value: "hospital", label: "Hospital Pharmacy" },
    { value: "clinical", label: "Clinical Pharmacy" },
    { value: "specialty", label: "Specialty Pharmacy" },
    { value: "compounding", label: "Compounding Pharmacy" },
  ];

  return (
    <div className="bg-white shadow rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Building2 size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Pharmacy Details
          </h2>
          <p className="text-sm text-gray-400">
            Update your pharmacy information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-800">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pharmacy Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter pharmacy name"
              required
              disabled={isLoading}
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
            />
            {errors.name && (
              <span className="text-sm text-error mt-1">{errors.name}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              License Number
            </label>
            <Input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={onInputChange}
              placeholder="Enter license number"
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
              required
              disabled={isLoading}
            />
            {errors.licenseNumber && (
              <span className="text-sm text-error mt-1">
                {errors.licenseNumber}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Pharmacy Type
            </label>
            <Select
              value={formData.type}
              onValueChange={(value: string) => onSelectChange("type", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pharmacy type" />
              </SelectTrigger>
              <SelectContent>
                {pharmacyTypes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="text-sm text-error mt-1">{errors.type}</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              placeholder="(555) 123-4567"
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
              required
              disabled={isLoading}
            />
            {errors.phone && (
              <span className="text-sm text-error mt-1">{errors.phone}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="pharmacy@example.com"
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
              required
            />
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Operating Hours
              </label>
              <Select
                value={formData.operatingHours}
                onValueChange={(value: string) =>
                  onSelectChange("operatingHours", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className='border p-1 flex items-center gap-4 rounded-sm'>
                  <SelectValue placeholder="Select operating hours" />
                  <ChevronDown className='' size={18} />
                </SelectTrigger>
                <SelectContent className='p-2 rounded-md bg-white'>
                  {operatingHours.map((option) => (
                    <SelectItem key={option.value} value={option.value}  className='border p-1 hover:cursor-pointer hover:bg-gray-100'>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.operatingHours && (
                <span className="text-sm text-error mt-1">
                  {errors.operatingHours}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-gray-800">
        <label className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Brief description of your pharmacy services..."
          className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
          disabled={isLoading}
        />
        {errors.description && (
          <span className="text-sm text-error mt-1">{errors.description}</span>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Website URL
            </label>
            <Input
              type="url"
              name="website"
              value={formData.website}
              onChange={onInputChange}
              placeholder="https://www.yourpharmacy.com"
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
              disabled={isLoading}
            />
            {errors.website && (
              <span className="text-sm text-error mt-1">{errors.website}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Emergency Contact
            </label>
            <Input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={onInputChange}
              placeholder="Emergency phone number"
              className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
              disabled={isLoading}
            />
            {errors.emergencyContact && (
              <span className="text-sm text-error mt-1">
                {errors.emergencyContact}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export types for reuse
export type { PharmacyDetailsFormProps, SelectOption };
