import { Info, MapPin, Navigation, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import type { ChangeEvent } from "react";

interface AddressFormData {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    latitude?: number | string;
    longitude?: number | string;
}

interface AddressFormErrors {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    latitude?: string;
    longitude?: string;
    licenseNumber?: string;
    [key: string]: string | undefined;
}

interface AddressLocationFormProps {
    formData: AddressFormData;
    errors: AddressFormErrors;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onCoordinateChange: (lat: number, lng: number) => void;
    isLoading?: boolean;
}

export default function AddressLocationForm({
    formData,
    errors,
    onInputChange,
    onCoordinateChange,
    isLoading,
}: AddressLocationFormProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isDetectingLocation, setIsDetectingLocation] = useState(false);

    const handleDetectLocation = () => {
        setIsDetectingLocation(true);

        if (navigator.geolocation) {
            navigator.geolocation?.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position?.coords;
                    onCoordinateChange(latitude, longitude);
                    setIsDetectingLocation(false);
                },
                (error) => {
                    console.error("Error detecting location:", error);
                    setIsDetectingLocation(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
            );
        } else {
            setIsDetectingLocation(false);
        }
    };

    const handleGeocodeAddress = () => {
        // @ts-ignore
        const address = `${formData?.street}, ${formData?.city}, ${formData?.state} ${formData?.zipCode}`;
        // Mock geocoding - in real app would use geocoding service
        const mockLat = 40.7128 + (Math.random() - 0.5) * 0.1;
        const mockLng = -74.006 + (Math.random() - 0.5) * 0.1;
        onCoordinateChange(mockLat, mockLng);
    };
    return (
        <div className="bg-white rounded-lg border border-border p-6 healthcare-shadow text-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <MapPin size={20} color="white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">
                            Address & Location
                        </h2>
                        <p className="text-sm text-text-secondary">
                            Update pharmacy address and coordinates
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDetectLocation}
                    disabled={isLoading}
                >
                    <Navigation />
                    Detect Location
                </Button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Street Address
                    </label>
                    <Input
                        type="text"
                        name="street"
                        value={formData?.street}
                        onChange={onInputChange}
                        placeholder="123 Main Street"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         <div>
                        <label className="block text-sm font-medium mb-1">
                            City
                        </label>
                         <Input
                        type="text"
                        name="city"
                        value={formData?.city}
                        onChange={onInputChange}
                        placeholder="New York"
                         className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                        required
                        disabled={isLoading}
                    />
                        {errors.city && (
                            <span className="text-sm text-error mt-1">
                                {errors.city}
                            </span>
                        )}
                    </div>
                 

                         <div>
                        <label className="block text-sm font-medium mb-1">
                            State
                        </label>
                         <Input
                        type="text"
                        name="state"
                        value={formData?.state}
                        onChange={onInputChange}
                        placeholder="NY"
                         className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                        required
                        disabled={isLoading}
                    />

                        {errors.state && (
                            <span className="text-sm text-error mt-1">
                                {errors.state}
                            </span>
                        )}
                    </div>

                     <div>
                        <label className="block text-sm font-medium mb-1">
                            ZIP Code
                        </label>
                     <Input
                        type="text"
                        name="zipCode"
                        value={formData?.zipCode}
                        onChange={onInputChange}
                        placeholder="10001"
                         className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                        required
                        disabled={isLoading}
                    />
                        {errors.zipCode && (
                            <span className="text-sm text-error mt-1">
                                {errors.zipCode}
                            </span>
                        )}
                    </div>
                 
                    
                 <div>
                        <label className="block text-sm font-medium mb-1">
                            Country
                        </label>
                        <Input
                        type="text"
                        name="country"
                        value={formData?.country}
                        onChange={onInputChange}
                        placeholder="United States"
                         className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                        required
                        disabled={isLoading}
                    />
                        {errors.country && (
                            <span className="text-sm text-error mt-1">
                                {errors.country}
                            </span>
                        )}
                    </div>
                    
                </div>

                <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-foreground">
                            GPS Coordinates
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleGeocodeAddress}
                            disabled={isLoading || !formData?.street || !formData?.city}
                        >
                                <Search/>
                            Geocode Address
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                        <label className="block text-sm font-medium mb-1">
                            Latitude
                        </label>
                        <Input
                            type="number"
                            name="latitude"
                            value={formData?.latitude}
                            onChange={onInputChange}
                             className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                            placeholder="40.7128"
                            step="any"
                            disabled={isLoading}
                        />
                        {errors.latitude && (
                            <span className="text-sm text-error mt-1">
                                {errors.latitude}
                            </span>
                        )}
                    </div>
                        


                         <div>
                        <label className="block text-sm font-medium mb-1">
                            Longitude
                        </label>
                        <Input
                            type="number"
                            name="longitude"
                            value={formData?.longitude}
                            onChange={onInputChange}
                            placeholder="-74.0060"
                             className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                            step="any"
                            disabled={isLoading}
                        />
                        {errors.longitude && (
                            <span className="text-sm text-error mt-1">
                                {errors.longitude}
                            </span>
                        )}
                    </div>
                        
                    </div>

                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <div className="flex items-start space-x-3">
                            <Info size={16} className="text-primary mt-0.5" />
                            <div className="text-sm text-text-secondary">
                                <p className="font-medium text-foreground mb-1">
                                    Location Tips:
                                </p>
                                <ul className="space-y-1">
                                    <li>• Use "Detect Location" for automatic GPS coordinates</li>
                                    <li>
                                        • Click "Geocode Address" to convert address to coordinates
                                    </li>
                                    <li>
                                        • Drag the map marker to fine-tune your exact location
                                    </li>
                                    <li>
                                        • Accurate coordinates help customers find your pharmacy
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
