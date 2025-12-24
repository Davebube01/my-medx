import type { GeoPoint } from '../types';

/**
 * Calculates the distance between two coordinates in kilometers using the Haversine formula.
 */
export function haversineDistance(coords1: GeoPoint, coords2: GeoPoint): number {
  if (!coords1 || !coords2) return 0;
  
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Simple bounding box calculation for a given center and radius (in km).
 * Returns rough min/max lat/lng. For MVP usage to query Firestore.
 */
export function getBoundingBox(center: GeoPoint, radiusInKm: number) {
  const lat = center.latitude;
  const lon = center.longitude;
  
  // 1 degree ~ 111km
  const latDelta = radiusInKm / 111;
  const lonDelta = radiusInKm / (111 * Math.cos(lat * (Math.PI / 180)));

  return {
    minLat: lat - latDelta,
    maxLat: lat + latDelta,
    minLon: lon - lonDelta,
    maxLon: lon + lonDelta,
  };
}
