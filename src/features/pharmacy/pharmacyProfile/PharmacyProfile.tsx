import { useEffect, useState, type ChangeEvent, type JSX, } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { AlertCircle, ArrowLeft, Clock, Save, X } from "lucide-react";
import PharmacyDetailsForm from "./components/PharmacyDetailsForm";
import AddressLocationForm from "./components/AddressLocationForm";
import InteractiveMapPanel from "./components/InteractiveMapPanel";
import ProfileImageUpload from "./components/ProfileImageUpload";
import SaveActionsPanel from "./components/SaveActionsPanel";

// Types for better type safety
type PharmacyType = "retail" | "hospital" | "clinical" | "specialty";

type CertificationType = "nabp" | "achc" | "pcab" | "urac";

type InsuranceProvider = "medicare" | "medicaid" | "bcbs" | "aetna" | "united" | "cigna";

type SpecialService = "compounding" | "immunizations" | "consultation" | "delivery" | "mtm" | "dme";

// Interface for form data
interface PharmacyFormData {
    // Pharmacy Details
    name: string;
    licenseNumber: string;
    type: PharmacyType;
    phone: string;
    email: string;
    operatingHours: string;
    description: string;
    website: string;
    emergencyContact: string;
    
    // Address & Location
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
    
    // Business & Certifications
    deaNumber: string;
    npiNumber: string;
    taxId: string;
    yearsInBusiness: number;
    primaryCertification: CertificationType;
    certificationNumber: string;
    certificationExpiry: string;
    acceptedInsurance: InsuranceProvider[];
    specialServices: SpecialService[];
    specialNotes: string;
}

// Interface for validation errors
interface FormErrors {
    [key: string]: string;
}

// Type for field names
export type FormFieldName = keyof PharmacyFormData;

export default function PharmacyProfile(): JSX.Element {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [lastSaved, setLastSaved] = useState<Date>(new Date('2025-10-08T15:30:00'));

    // Mock pharmacy data with proper typing
    const [formData, setFormData] = useState<PharmacyFormData>({
        // Pharmacy Details
        name: "MediCare Pharmacy",
        licenseNumber: "PH-2024-001234",
        type: "retail",
        phone: "(555) 123-4567",
        email: "info@medicare-pharmacy.com",
        operatingHours: "8am-8pm",
        description: "Full-service community pharmacy providing prescription medications, over-the-counter products, and health consultations.",
        website: "https://www.medicare-pharmacy.com",
        emergencyContact: "(555) 123-4568",
        
        // Address & Location
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        latitude: 40.7128,
        longitude: -74.0060,
        
        // Business & Certifications
        deaNumber: "BM1234567",
        npiNumber: "1234567890",
        taxId: "12-3456789",
        yearsInBusiness: 15,
        primaryCertification: "nabp",
        certificationNumber: "NABP-2024-001",
        certificationExpiry: "2025-12-31",
        acceptedInsurance: [
            "medicare",
            "medicaid",
            "bcbs",
            "aetna"
        ],
        specialServices: [
            "compounding",
            "immunizations",
            "consultation",
            "delivery"
        ],
        specialNotes: "We specialize in geriatric care and offer free medication consultations for seniors."
    });

    const [profileImage, setProfileImage] = useState<string>(
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1179"
    );
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        document.title = "Pharmacy Profile - PharmacyMap Admin";
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (name: string, value: string | number | string[]): void => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

   // @ts-ignore
    const handleCheckboxChange = (fieldName: string, serviceId: string, checked: boolean): void => {
        setFormData(prev => {
            if (fieldName === 'acceptedInsurance' || fieldName === 'specialServices') {
                const currentServices = prev[fieldName] as (InsuranceProvider | SpecialService)[];
                const updatedServices = checked
                    ? [...currentServices, serviceId as InsuranceProvider | SpecialService]
                    : currentServices.filter(id => id !== serviceId);
                
                return {
                    ...prev,
                    [fieldName]: updatedServices
                };
            }
            return prev;
        });
        setHasChanges(true);
    };

    const handleCoordinateChange = (latitude: number, longitude: number): void => {
        setFormData(prev => ({
            ...prev,
            latitude: parseFloat(latitude.toString()),
            longitude: parseFloat(longitude.toString())
        }));
        setHasChanges(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleImageChange = (_file: File | null, imageUrl: string | null): void => {
        if (imageUrl) {
            setProfileImage(imageUrl);
            setHasChanges(true);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Required field validation
        if (!formData.name.trim()) newErrors.name = 'Pharmacy name is required';
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email address is required';
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (formData.phone && !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter phone in format (555) 123-4567';
        }

        // Coordinate validation
        if (!formData.latitude || !formData.longitude) {
            newErrors.coordinates = 'GPS coordinates are required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (): Promise<void> => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setLastSaved(new Date());
            setHasChanges(false);
            
            // Show success message (in real app would use toast/notification)
            alert('Pharmacy profile updated successfully!');
            
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error saving profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDraft = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // Mock API call for draft save
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLastSaved(new Date());
            setHasChanges(false);
            alert('Draft saved successfully!');
            
        } catch (error) {
            console.error('Error saving draft:', error);
            alert('Error saving draft. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = (): void => {
        if (window.confirm('Are you sure you want to discard all unsaved changes?')) {
            // Reset to original values (in real app would refetch from API)
            window.location.reload();
        }
    };

    // @ts-ignore
    const toggleSidebar = (): void => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
         <div className="min-h-screen">
     
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-border healthcare-shadow sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/pharmacy/dashboard')}
                  className="lg:hidden"
                >
                    <ArrowLeft size={18}/>
                  <span className="sr-only">Back to dashboard</span>
                </Button>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Pharmacy Profile</h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage your pharmacy information and settings
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>Last updated: {lastSaved?.toLocaleDateString()}</span>
                </div>
                
                {hasChanges && (
                  <div className="flex items-center space-x-2 text-sm text-warning">
                    <AlertCircle size={14} />
                    <span className="hidden sm:inline">Unsaved changes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Forms Column */}
              <div className="xl:col-span-3 space-y-8">
                {/* Pharmacy Details */}
                <PharmacyDetailsForm
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  isLoading={isLoading}
                />

                {/* Address & Location */}
                <AddressLocationForm
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  onCoordinateChange={handleCoordinateChange}
                  isLoading={isLoading}
                />

                {/* Interactive Map */}
                <InteractiveMapPanel
                  latitude={formData?.latitude}
                  longitude={formData?.longitude}
                  onCoordinateChange={handleCoordinateChange}
                  pharmacyName={formData?.name}
                />

                {/* Profile Image Upload */}
                <ProfileImageUpload
                  currentImage={profileImage}
                  onImageChange={handleImageChange}
                  isLoading={isLoading}
                />

                {/* Business & Certifications */}
                {/* <BusinessCertificationForm
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  onCheckboxChange={handleCheckboxChange}
                  isLoading={isLoading}
                /> */}
              </div>

              {/* Save Actions Sidebar */}
              <div className="xl:col-span-1">
                <SaveActionsPanel
                  onSave={handleSave}
                  onSaveDraft={handleSaveDraft}
                  onReset={handleReset}
                  hasChanges={hasChanges}
                  isLoading={isLoading}
                  lastSaved={lastSaved}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Save Bar */}
        {hasChanges && (
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border healthcare-shadow p-4 z-50">
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1"
                
              >
                <Save/>
                Save Changes
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                <X size={16}/>
                <span className="sr-only">Discard changes</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    );
}

// Export types for use in other components
export type { PharmacyFormData, FormErrors };
