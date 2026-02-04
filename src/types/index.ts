export type Role = "user" | "pharmacy" | "phc" | "admin" | "oversight";

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface User {
  uid: string;
  phone: string; // E.164
  role: Role;
  createdAt: string;
}

export interface Pharmacy {
  pharmacyId: string;
  ownerId: string;
  name: string;
  address: string;
  phone: string;
  geoPoint: GeoPoint;
  geohash: string;
  verified: boolean;
  createdAt: string;
}

export interface PHC {
  phcId: string;
  name: string;
  address: string;
  phone: string;
  staffIds: string[];
  createdAt: string;
}

export interface Drug {
  id: string;
  name: string;
  strength: string;
  form: string;
  category: string;
  normalized_name: string;
  keywords: string[];
  createdAt: string;
}

export interface InventoryItem {
  inventoryId: string;
  drugRef: string; // path to drugMasterList doc
  quantity: number;
  lowStockThreshold: number;
  lowStockAlert: boolean;
  lastUpdated: string;
  // Pharmacy only
  price?: number;
  // PHC only
  batchNumber?: string;
  expiryDate?: string;
}

export interface PurchaseItem {
  inventoryId: string;
  qty: number;
  price?: number; // Pharmacy only
}

export interface Purchase {
  purchaseId: string;
  traceId: string;
  ownerType: "pharmacy" | "phc";
  ownerId: string;
  userPhone: string;
  items: PurchaseItem[];
  totalItems: number;
  totalAmount?: number; // Pharmacy only
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: "male" | "female" | "other";
  myMedxLinked: boolean;
  visits: number;
  clinicalNotes?: string;
  allergies?: string[];
}
