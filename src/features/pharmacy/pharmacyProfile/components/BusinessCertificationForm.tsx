import { AlertTriangle, Award } from "lucide-react";
import { type JSX } from "react";
import { Input } from "../../../../components/ui/input";
import { Checkbox } from "../../../../components/ui/checkbox";

// Types for select options
interface SelectOption {
  value: string;
  label: string;
}

// Type for special service
interface SpecialService {
  id: string;
  label: string;
  description: string;
}

// Props interface
interface BusinessCertificationFormProps {
  formData: {
    deaNumber: string;
    npiNumber: string;
    taxId: string;
    yearsInBusiness: number;
    primaryCertification: string;
    certificationNumber: string;
    certificationExpiry: string;
    acceptedInsurance: string[];
    specialServices: string[];
    specialNotes: string;
  };
  errors: {
    [key: string]: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (name: string, value: string | string[]) => void;
  onCheckboxChange: (
    fieldName: string,
    serviceId: string,
    checked: boolean
  ) => void;
  isLoading: boolean;
}

export default function BusinessCertificationForm({
  formData,
  errors,
  onInputChange,
  onSelectChange,
  onCheckboxChange,
  isLoading,
}: BusinessCertificationFormProps): JSX.Element {
  const certificationTypes: SelectOption[] = [
    { value: "nabp", label: "NABP Accreditation" },
    { value: "pcab", label: "PCAB Accreditation" },
    { value: "urac", label: "URAC Accreditation" },
    { value: "achc", label: "ACHC Accreditation" },
    { value: "jcaho", label: "Joint Commission" },
    { value: "other", label: "Other Certification" },
  ];

  const insuranceProviders: SelectOption[] = [
    { value: "medicare", label: "Medicare" },
    { value: "medicaid", label: "Medicaid" },
    { value: "bcbs", label: "Blue Cross Blue Shield" },
    { value: "aetna", label: "Aetna" },
    { value: "cigna", label: "Cigna" },
    { value: "humana", label: "Humana" },
    { value: "unitedhealthcare", label: "UnitedHealthcare" },
    { value: "other", label: "Other Insurance" },
  ];

  const specialServices: SpecialService[] = [
    {
      id: "compounding",
      label: "Compounding Services",
      description: "Custom medication preparation",
    },
    {
      id: "immunizations",
      label: "Immunizations",
      description: "Vaccine administration",
    },
    {
      id: "consultation",
      label: "Medication Consultation",
      description: "Pharmacist counseling services",
    },
    {
      id: "delivery",
      label: "Home Delivery",
      description: "Prescription delivery service",
    },
    {
      id: "mtm",
      label: "Medication Therapy Management",
      description: "Comprehensive medication review",
    },
    {
      id: "dme",
      label: "Durable Medical Equipment",
      description: "Medical equipment sales/rental",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Award size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Business & Certifications
          </h2>
          <p className="text-sm text-text-secondary">
            Professional credentials and services
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Business Information */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Business Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                DEA Number
              </label>
              <Input
                type="text"
                name="deaNumber"
                value={formData.deaNumber}
                onChange={onInputChange}
                placeholder="Enter DEA registration number"
                required
                disabled={isLoading}
              />
              {errors.deaNumber && (
                <span className="text-sm text-error mt-1">
                  {errors.deaNumber}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                NPI Number
              </label>
              <Input
                type="text"
                name="npiNumber"
                value={formData.npiNumber}
                onChange={onInputChange}
                placeholder="Enter NPI number"
                required
                disabled={isLoading}
              />
              {errors.npiNumber && (
                <span className="text-sm text-error mt-1">
                  {errors.npiNumber}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tax ID (EIN)
              </label>
              <Input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={onInputChange}
                placeholder="XX-XXXXXXX"
                required
                disabled={isLoading}
              />
              {errors.taxId && (
                <span className="text-sm text-error mt-1">{errors.taxId}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Years in Business
              </label>
              <Input
                type="number"
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={onInputChange}
                placeholder="Enter number of years"
                min="0"
                disabled={isLoading}
              />
              {errors.yearsInBusiness && (
                <span className="text-sm text-error mt-1">
                  {errors.yearsInBusiness}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Professional Certifications
          </h3>
          <div className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="primaryCertification"
                className="block text-sm font-medium text-gray-700"
              >
                Primary Certification
              </label>

              <select
                id="primaryCertification"
                name="primaryCertification"
                value={formData.primaryCertification}
                onChange={(e) =>
                  onSelectChange("primaryCertification", e.target.value)
                }
                disabled={isLoading}
                className={`mt-1 block w-full rounded-md border ${
                  errors.primaryCertification
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:bg-gray-100`}
              >
                <option value="">Select primary certification</option>
                {certificationTypes.map((cert) => (
                  <option key={cert.value} value={cert.value}>
                    {cert.label}
                  </option>
                ))}
              </select>

              {errors.primaryCertification && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryCertification}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Certification Number
                </label>
                <Input
                  type="text"
                  name="certificationNumber"
                  value={formData.certificationNumber}
                  onChange={onInputChange}
                  placeholder="Enter certification number"
                  disabled={isLoading}
                />
                {errors.certificationNumber && (
                  <span className="text-sm text-error mt-1">
                    {errors.certificationNumber}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Certification Expiry Date
                </label>
                <Input
                  type="date"
                  name="certificationExpiry"
                  value={formData.certificationExpiry}
                  onChange={onInputChange}
                  disabled={isLoading}
                />
                {errors.certificationExpiry && (
                  <span className="text-sm text-error mt-1">
                    {errors.certificationExpiry}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Accepted */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Insurance Providers Accepted
          </h3>
          <div className="mb-4">
  <label
    htmlFor="acceptedInsurance"
    className="block text-sm font-medium mb-1"
  >
    Accepted Insurance Plans
  </label>

  <select
    id="acceptedInsurance"
    name="acceptedInsurance"
    multiple
    value={formData.acceptedInsurance}
    onChange={(e) =>
      onSelectChange(
        "acceptedInsurance",
        Array.from(e.target.selectedOptions, (option) => option.value)
      )
    }
    disabled={isLoading}
    className={`mt-1 block w-full rounded-md border ${
      errors.acceptedInsurance ? "border-red-500" : "border-gray-300"
    } bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:bg-gray-100`}
  >
    {insuranceProviders.map((provider: SelectOption) => (
      <option key={provider.value} value={provider.value}>
        {provider.label}
      </option>
    ))}
  </select>

  <p className="mt-1 text-xs text-gray-500">
    Hold <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Ctrl</kbd> (or <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Cmd</kbd> on Mac) to select multiple.
  </p>

  {errors.acceptedInsurance && (
    <p className="mt-1 text-sm text-red-600">{errors.acceptedInsurance}</p>
  )}
</div>

        </div>

        {/* Special Services */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Special Services Offered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialServices.map((service) => (
              <div
                key={service.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={formData.specialServices.includes(service.id)}
                    onChange={(e: React.FormEvent<HTMLButtonElement>) =>
                      onCheckboxChange(
                        "specialServices",
                        service.id,
                        (e.target as HTMLInputElement).checked
                      )
                    }
                    disabled={isLoading}
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {service.label}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Additional Information
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">
              Special Notes
            </label>
            <Input
              type="text"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={onInputChange}
              placeholder="Any additional information about your pharmacy services..."
              disabled={isLoading}
            />
            {errors.specialNotes && (
              <span className="text-sm text-error mt-1">
                {errors.specialNotes}
              </span>
            )}
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-2">
                Compliance Notice
              </p>
              <p className="text-text-secondary">
                All certifications and business information must be current and
                valid. Please ensure all documentation is up to date and readily
                available for verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export types for reuse
export type { BusinessCertificationFormProps, SelectOption, SpecialService };
