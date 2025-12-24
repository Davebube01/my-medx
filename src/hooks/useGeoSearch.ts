import { useState } from 'react';
import { MOCK_PHARMACY } from '../data/mockData';
import { haversineDistance} from '../utils/geo';
import type { GeoPoint, Pharmacy } from '../types';

export const useGeoSearch = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Pharmacy[]>([]);

    const searchPharmacies = async (_drugName: string, userLocation: GeoPoint) => {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mock Search Geometry:
        // 1. In real app, we'd query Firestore with bounding box around userLocation.
        // 2. Here, we just filter our single MOCK_PHARMACY.
        
        const mockPharmacies = [MOCK_PHARMACY];
        
        // Filter by distance (simulate finding nearby)
        const nearby = mockPharmacies.filter(pharm => {
            const dist = haversineDistance(userLocation, pharm.geoPoint);
            return dist <= 20; // 20km Radius
        });

        // Filter by drug availability (requires inventory check which is complex in mock, 
        // so we'll just assume they have it for now or check mock inventory manually)
        // In real usage, this would be a compound query or client-side filtering after geo-query.

        setResults(nearby);
        setLoading(false);
        return nearby;
    };

    return { searchPharmacies, results, loading };
};
