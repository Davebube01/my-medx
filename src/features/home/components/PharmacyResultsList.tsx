import { Car, CheckCircle, Clock, MapPin, Shield, Star, Phone, Navigation } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import type { Pharmacy } from '../HomepageDrugSearch';

interface Location {
  lat: number;
  lng: number;
}

interface PharmacyResultsListProps {
  pharmacies?: Pharmacy[];
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  selectedPharmacy?: Pharmacy | null;
  searchQuery?: string;
  userLocation?: Location | null;
  isLoading?: boolean;
}

type SortBy = 'distance' | 'rating' | 'name' | 'availability';
type FilterBy = 'all' | 'open' | 'has_drug' | 'parking' | '24_hours';

interface SelectOption {
  value: string;
  label: string;
}

const PharmacyResultsList: React.FC<PharmacyResultsListProps> = ({ 
  pharmacies = [], 
  onPharmacySelect, 
  selectedPharmacy = null,
  searchQuery = '',
  // userLocation = null,
  isLoading = false 
}) => {
  const [sortBy, setSortBy] = useState<SortBy>('distance');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');

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
    is24Hours: false
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
    is24Hours: true
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
    is24Hours: false
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
    is24Hours: false
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
    is24Hours: false
  }
];


  const displayPharmacies = pharmacies.length > 0 ? pharmacies : mockPharmacies;

  const sortOptions: SelectOption[] = [
    { value: 'distance', label: 'Distance (nearest first)' },
    { value: 'rating', label: 'Rating (highest first)' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'availability', label: 'Drug availability' }
  ];

  const filterOptions: SelectOption[] = [
    { value: 'all', label: 'All pharmacies' },
    { value: 'open', label: 'Open now' },
    { value: 'has_drug', label: 'Has searched drug' },
    { value: 'parking', label: 'Has parking' },
    { value: '24_hours', label: '24 hour service' }
  ];

  const getSortedAndFilteredPharmacies = (): Pharmacy[] => {
    let filtered = [...displayPharmacies];

    // Apply filters
    switch (filterBy) {
      case 'open':
        filtered = filtered.filter(p => p.isOpen);
        break;
      case 'has_drug':
        if (searchQuery) {
          filtered = filtered.filter(p => 
            p.availableDrugs.some(drug => 
              drug.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
        break;
      case 'parking':
        filtered = filtered.filter(p => p.hasParking);
        break;
      case '24_hours':
        filtered = filtered.filter(p => p.hours.includes('24 hours'));
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'availability':
        if (searchQuery) {
          filtered.sort((a, b) => {
            const aHasDrug = a.availableDrugs.some(drug => 
              drug.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const bHasDrug = b.availableDrugs.some(drug => 
              drug.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return (bHasDrug ? 1 : 0) - (aHasDrug ? 1 : 0);
          });
        }
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredPharmacies = getSortedAndFilteredPharmacies();

  const handlePharmacyClick = (pharmacy: Pharmacy) => {
    if (onPharmacySelect) {
      onPharmacySelect(pharmacy);
    }
  };

  const renderStars = (rating: number): React.ReactElement[] => {
    const stars: React.ReactElement[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="text-amber-500 fill-amber-500" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} className="text-amber-500 fill-amber-500 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Searching pharmacies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header with Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className=" sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Nearby Pharmacies ({filteredPharmacies.length})
            </h2>
            {searchQuery && (
              <p className="text-sm text-gray-600">
                Showing results for "{searchQuery}"
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Select value={filterBy} onValueChange={(value) => setFilterBy(value as FilterBy)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredPharmacies.length === 0 ? (
          <div className="p-6 text-center">
            <MapPin size={48} className="text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pharmacies found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or expanding your search radius.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedPharmacy && selectedPharmacy.id === pharmacy.id 
                    ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => handlePharmacyClick(pharmacy)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Pharmacy Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
                        <p className="text-sm text-gray-600">{pharmacy.address}</p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1 ml-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pharmacy.isOpen 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {pharmacy.isOpen ? 'Open' : 'Closed'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {pharmacy.distance.toFixed(1)} km
                        </div>
                      </div>
                    </div>

                    {/* Rating and Hours */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(pharmacy.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          {pharmacy.rating} ({pharmacy.reviewCount})
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{pharmacy.hours}</span>
                      </div>
                    </div>

                    {/* Available Drugs */}
                    {searchQuery && pharmacy.availableDrugs.some(drug => 
                      drug.toLowerCase().includes(searchQuery.toLowerCase())
                    ) && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-600 mb-1">Available:</div>
                        <div className="flex flex-wrap gap-1">
                          {pharmacy.availableDrugs
                            .filter(drug => drug.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((drug, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {drug}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Services and Features */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {pharmacy.hasParking && (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Car size={12} />
                          <span>Parking</span>
                        </div>
                      )}
                      {pharmacy.acceptsInsurance && (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Shield size={12} />
                          <span>Insurance</span>
                        </div>
                      )}
                      {pharmacy.services.slice(0, 2).map((service, index) => (
                        <div key={index} className="flex items-center space-x-1 text-gray-600">
                          <CheckCircle size={12} />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-4 flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${pharmacy.phone}`, '_self');
                      }}
                      className="whitespace-nowrap"
                    >
                      <Phone size={14} className="mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://maps.google.com?q=${pharmacy.lat},${pharmacy.lng}`, '_blank');
                      }}
                      className="whitespace-nowrap"
                    >
                      <Navigation size={14} className="mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredPharmacies.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredPharmacies.length} of {displayPharmacies.length} pharmacies
            </span>
            <Button variant="ghost" size="sm">
              Refresh Results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyResultsList;