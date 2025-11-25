import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import DrugSearchBar, { type Drug } from "./components/DrugSearchBar";
import LocationControls from "./components/LoacationControls";
import QuickFilters from "./components/QuickFilters";
import MobileViewToggle from "./components/MobileViewToggle";
import InteractiveMap from "./components/InteractiveMap";
import { CheckCircle, Clock, MapPin, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import PharmacyResultsList from "./components/PharmacyResultsList";
import Footer from "./components/Footer";

type Location = {
  lat: number;
  lng: number;
  accuracy?: number;
};

type FilterId =
  | "open_now"
  | "24_hours"
  | "has_parking"
  | "drive_through"
  | "delivery"
  | "accepts_insurance";

export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  distance: number;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  hours: string;
  availableDrugs: string[];
  totalDrugs: number;
  hasParking: boolean;
  acceptsInsurance: boolean;
  services: string[];
  hasDelivery: boolean;
  hasDriveThrough: boolean;
  is24Hours: boolean;
};

export default function HomepageDrugSearch() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Pharmacy[]>([]);

  // Location state
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5);

  // UI state
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );
  const [mobileView, setMobileView] = useState("map"); // 'map' or 'list'
  const [activeFilters, setActiveFilters] = useState<FilterId[]>([]);

  // Mock search results
  const mockSearchResults = [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 123-4567",
      lat: 40.7589,
      lng: -73.9851,
      distance: 2.3,
      rating: 4.8,
      reviewCount: 124,
      isOpen: true,
      hours: "Open until 9:00 PM",
      availableDrugs: ["Aspirin", "Ibuprofen", "Insulin", "Metformin"],
      totalDrugs: 1247,
      hasParking: true,
      acceptsInsurance: true,
      services: ["Prescription Refills", "Vaccinations", "Health Screenings"],
      hasDelivery: false,
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
      reviewCount: 89,
      isOpen: true,
      hours: "Open 24 hours",
      availableDrugs: ["Aspirin", "Metformin", "Lisinopril"],
      totalDrugs: 892,
      hasParking: false,
      acceptsInsurance: true,
      services: ["24/7 Service", "Emergency Prescriptions", "Delivery"],
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
      reviewCount: 67,
      isOpen: false,
      hours: "Closed • Opens 8:00 AM",
      availableDrugs: ["Ibuprofen", "Atorvastatin"],
      totalDrugs: 654,
      hasParking: true,
      acceptsInsurance: true,
      services: ["Drive-through", "Online Ordering"],
      hasDelivery: false,
      hasDriveThrough: true,
      is24Hours: false,
    },
  ];

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
    }, 1500);
  };

  // Handle location detection
  const handleLocationDetect = (location: Location) => {
    setUserLocation(location);
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  // Handle radius change
  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    if (searchResults?.length > 0) {
      const filtered = mockSearchResults?.filter(
        (pharmacy) => pharmacy?.distance <= radius
      );
      setSearchResults(filtered);
    }
  };

  // Handle pharmacy selection
  const handlePharmacySelect = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  // Handle filter toggle
  const handleFilterToggle = (filterId: FilterId) => {
    setActiveFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  // Filter results based on active filters
  const getFilteredResults = () => {
    if (activeFilters?.length === 0) return searchResults;

    return searchResults?.filter((pharmacy) => {
      return activeFilters?.every((filterId) => {
        switch (filterId) {
          case "open_now":
            return pharmacy?.isOpen;
          case "24_hours":
            return pharmacy?.is24Hours;
          case "has_parking":
            return pharmacy?.hasParking;
          case "drive_through":
            return pharmacy?.hasDriveThrough;
          case "delivery":
            return pharmacy?.hasDelivery;
          case "accepts_insurance":
            return pharmacy?.acceptsInsurance;
          default:
            return true;
        }
      });
    });
  };

  const filteredResults = getFilteredResults();

  // Handle suggestion selection
  const handleSuggestionSelect = (drug: Drug) => {
    handleSearch(drug?.name);
  };

  // Auto-detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy
          });
          setIsDetectingLocation(false);
        },
        () => {
          setIsDetectingLocation(false);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    }
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans ">
      <Navbar />

      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Find Your Medications Nearby
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
              Search for drug availability across nearby pharmacies and get
              real-time information about stock, pricing, and store hours.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <DrugSearchBar
              onSearch={handleSearch}
              searchValue={searchQuery}
              isSearching={isSearching}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>

          {/* Location Controls */}
          <div className="mb-6">
            <LocationControls
              onLocationDetect={handleLocationDetect}
              onRadiusChange={handleRadiusChange}
              currentRadius={searchRadius}
              isDetectingLocation={isDetectingLocation}
              currentLocation={userLocation}
            />
          </div>

          {/* Quick Filters */}
          {searchResults?.length > 0 && (
            <div className="mb-6">
              <QuickFilters
                activeFilters={activeFilters}
                onFilterToggle={handleFilterToggle}
                resultCount={filteredResults?.length}
              />
            </div>
          )}

          {/* Mobile View Toggle */}
          <MobileViewToggle
            currentView={mobileView}
            onViewChange={setMobileView}
            resultCount={filteredResults?.length}
            className="mb-6"
          />

          {/* Results Section */}
          {searchResults?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map View */}
              <div className={`lg:col-span-2 ${mobileView === 'list' ? 'hidden lg:block' : ''}`}>
                <InteractiveMap
                  pharmacies={filteredResults}
                  userLocation={userLocation}
                  selectedPharmacy={selectedPharmacy}
                  onPharmacySelect={handlePharmacySelect}
                  searchRadius={searchRadius}
                  className="h-96 lg:h-[600px]"
                />
              </div>

              {/* Results List */}
              <div className={`lg:col-span-1 ${mobileView === 'map' ? 'hidden lg:block' : ''}`}>
                <PharmacyResultsList
                  pharmacies={filteredResults}
                  onPharmacySelect={handlePharmacySelect}
                  selectedPharmacy={selectedPharmacy}
                  searchQuery={searchQuery}
                  userLocation={userLocation}
                  isLoading={isSearching}
                />
              </div>
            </div>
          ) : searchQuery && !isSearching ? (
            // No Results State
            (<div className="text-center py-12">
              <Search size={64} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No pharmacies found</h3>
              <p className="text-text-secondary mb-6">
                We couldn't find any pharmacies with "{searchQuery}" in your area. Try:
              </p>
              <div className="space-y-2 text-sm text-text-secondary max-w-md mx-auto">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Expanding your search radius</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Checking your spelling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Searching for generic drug names</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => handleRadiusChange(searchRadius + 5)}
              >
                Expand Search Area
              </Button>
            </div>)
          ) : !searchQuery ? (
            // Welcome State
            (<div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Search Medications</h3>
                    <p className="text-sm text-text-secondary">
                      Find any prescription or over-the-counter medication
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Locate Pharmacies</h3>
                    <p className="text-sm text-text-secondary">
                      View nearby pharmacies on an interactive map
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock size={24} className="text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Real-time Info</h3>
                    <p className="text-sm text-text-secondary">
                      Get current availability, hours, and contact details
                    </p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Aspirin', 'Ibuprofen', 'Insulin', 'Blood pressure medication', 'Allergy medicine', 'Antibiotics']?.map((drug) => (
                      <button
                        key={drug}
                        onClick={() => handleSearch(drug)}
                        className="px-4 py-2 bg-surface text-text-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm healthcare-transition border border-border"
                      >
                        {drug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>)
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
