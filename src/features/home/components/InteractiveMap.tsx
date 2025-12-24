import { Clock, MapPin, Phone, Star, Plus, Minus, Target } from "lucide-react";
import { useState, useEffect, useRef, type FC } from "react";
import { Button } from "../../../components/ui/button";
import type { Pharmacy } from "../HomepageDrugSearch";

interface Location {
  lat: number;
  lng: number;
}

// interface Pharmacy {
//   id: number;
//   name: string;
//   address: string;
//   phone: string;
//   lat: number;
//   lng: number;
//   distance: number;
//   rating: number;
//   isOpen: boolean;
//   hours: string;
//   availableDrugs: string[];
//   totalDrugs: number;
// }

interface InteractiveMapProps {
  pharmacies?: Pharmacy[];
  userLocation?: Location | null;
  selectedPharmacy?: Pharmacy | null;
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  searchRadius?: number;
  className?: string;
}

const InteractiveMap: FC<InteractiveMapProps> = ({
  pharmacies = [],
  userLocation = null,
  selectedPharmacy = null,
  onPharmacySelect,
  searchRadius = 5,
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState<Location>({
    lat: 40.7128,
    lng: -74.006,
  }); // Default to NYC
  const [zoomLevel, setZoomLevel] = useState<number>(12);

  // Mock pharmacy data with locations
  const mockPharmacies: Pharmacy[] = [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 123-4567",
      lat: 40.7589,
      lng: -73.9851,
      distance: 2.3,
      rating: 4.8,
      reviewCount: 342,
      isOpen: true,
      hours: "Open until 9:00 PM",
      availableDrugs: ["Aspirin", "Ibuprofen", "Insulin"],
      totalDrugs: 1247,
      hasParking: true,
      acceptsInsurance: true,
      services: ["Blood Pressure Check", "Vaccinations", "Prescription Refill"],
      hasDelivery: true,
      hasDriveThrough: false,
      is24Hours: false,
    },
    {
      id: 2,
      name: "MediCare Central",
      address: "456 Broadway, New York, NY 10013",
      phone: "(555) 234-5678",
      lat: 40.7505,
      lng: -73.9934,
      distance: 1.8,
      rating: 4.6,
      reviewCount: 278,
      isOpen: true,
      hours: "Open 24 hours",
      availableDrugs: ["Aspirin", "Metformin"],
      totalDrugs: 892,
      hasParking: true,
      acceptsInsurance: true,
      services: ["Vaccinations", "Emergency Prescriptions", "Consultation"],
      hasDelivery: true,
      hasDriveThrough: true,
      is24Hours: true,
    },
    {
      id: 3,
      name: "QuickMeds Pharmacy",
      address: "789 5th Ave, New York, NY 10022",
      phone: "(555) 345-6789",
      lat: 40.7614,
      lng: -73.9776,
      distance: 3.1,
      rating: 4.4,
      reviewCount: 189,
      isOpen: false,
      hours: "Closed • Opens 8:00 AM",
      availableDrugs: ["Ibuprofen"],
      totalDrugs: 654,
      hasParking: false,
      acceptsInsurance: true,
      services: ["Prescription Pickup", "Blood Sugar Testing"],
      hasDelivery: false,
      hasDriveThrough: false,
      is24Hours: false,
    },
    {
      id: 4,
      name: "Family Drug Store",
      address: "321 Park Ave, New York, NY 10010",
      phone: "(555) 456-7890",
      lat: 40.7282,
      lng: -73.9942,
      distance: 4.2,
      rating: 4.7,
      reviewCount: 314,
      isOpen: true,
      hours: "Open until 8:00 PM",
      availableDrugs: ["Aspirin", "Insulin", "Lisinopril"],
      totalDrugs: 1156,
      hasParking: true,
      acceptsInsurance: false,
      services: ["Vaccinations", "Prescription Delivery", "Consultation"],
      hasDelivery: true,
      hasDriveThrough: false,
      is24Hours: false,
    },
    {
      id: 5,
      name: "Metro Pharmacy",
      address: "654 Lexington Ave, New York, NY 10022",
      phone: "(555) 567-8901",
      lat: 40.7549,
      lng: -73.9707,
      distance: 2.9,
      rating: 4.5,
      reviewCount: 256,
      isOpen: true,
      hours: "Open until 10:00 PM",
      availableDrugs: ["Metformin", "Atorvastatin"],
      totalDrugs: 978,
      hasParking: false,
      acceptsInsurance: true,
      services: ["Flu Shots", "Health Screening", "Refill Reminders"],
      hasDelivery: true,
      hasDriveThrough: true,
      is24Hours: false,
    },
  ];

  const displayPharmacies = pharmacies.length > 0 ? pharmacies : mockPharmacies;

  useEffect(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      setZoomLevel(14);
    }
  }, [userLocation]);

  const handlePharmacyClick = (pharmacy: Pharmacy) => {
    if (onPharmacySelect) {
      onPharmacySelect(pharmacy);
    }
    setMapCenter({ lat: pharmacy.lat, lng: pharmacy.lng });
    setZoomLevel(16);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 8));
  };

  const handleRecenter = () => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      setZoomLevel(14);
    }
  };

  const getPharmacyMarkerColor = (pharmacy: Pharmacy): string => {
    if (selectedPharmacy && selectedPharmacy.id === pharmacy.id) {
      return "bg-purple-500";
    }
    return pharmacy.isOpen ? "bg-green-500" : "bg-red-500";
  };

  const getDistanceFromUser = (pharmacy: Pharmacy): number | null => {
    if (!userLocation) return null;

    const R = 6371; // Earth's radius in km
    const dLat = ((pharmacy.lat - userLocation.lat) * Math.PI) / 180;
    const dLng = ((pharmacy.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((pharmacy.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div
      className={`relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}
    >
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px] relative bg-gray-100"
      >
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Pharmacy Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${zoomLevel}&output=embed`}
          className="absolute inset-0"
        />

        {/* Map Overlay with Pharmacy Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {displayPharmacies.map((pharmacy) => {
            const distance = getDistanceFromUser(pharmacy);
            if (distance && distance > searchRadius) return null;

            return (
              <div
                key={pharmacy.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: `${50 + (pharmacy.lng - mapCenter.lng) * 1000}%`,
                  top: `${50 - (pharmacy.lat - mapCenter.lat) * 1000}%`,
                }}
              >
                <button
                  onClick={() => handlePharmacyClick(pharmacy)}
                  className={`w-8 h-8 rounded-full ${getPharmacyMarkerColor(
                    pharmacy
                  )} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
                  aria-label={`Select ${pharmacy.name}`}
                >
                  <MapPin size={16} />
                </button>

                {/* Pharmacy Info Popup */}
                {selectedPharmacy && selectedPharmacy.id === pharmacy.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {pharmacy.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {pharmacy.address}
                        </p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pharmacy.isOpen
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pharmacy.isOpen ? "Open" : "Closed"}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-gray-600">{pharmacy.hours}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-500" />
                        <span className="text-gray-600">{pharmacy.phone}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Star
                          size={14}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        <span className="text-gray-600">
                          {pharmacy.rating} rating
                        </span>
                      </div>

                      {distance && (
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-gray-500" />
                          <span className="text-gray-600">
                            {distance.toFixed(1)} km away
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">
                        Available drugs:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.availableDrugs
                          .slice(0, 3)
                          .map((drug, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                            >
                              {drug}
                            </span>
                          ))}
                        {pharmacy.availableDrugs.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{pharmacy.availableDrugs.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* User Location Marker */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (userLocation.lng - mapCenter.lng) * 1000}%`,
                top: `${50 - (userLocation.lat - mapCenter.lat) * 1000}%`,
              }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            aria-label="Zoom in"
          >
            <Plus size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            aria-label="Zoom out"
          >
            <Minus size={18} />
          </Button>
          {userLocation && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleRecenter}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
              aria-label="Recenter map"
            >
              <Target size={18} />
            </Button>
          )}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 pointer-events-auto">
          <div className="text-xs font-medium text-gray-900 mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Open Pharmacy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Closed Pharmacy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Selected</span>
            </div>
            {userLocation && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Your Location</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
