import type { Drug, InventoryItem, Patient, Pharmacy, PHC, Purchase } from "../types";


export const MOCK_DRUGS: Record<string, Drug> = {
  'paracetamol_500mg': {
    id: 'paracetamol_500mg',
    name: 'Paracetamol',
    strength: '500mg',
    form: 'Tablet',
    category: 'Analgesic',
    normalized_name: 'paracetamol 500mg tablet',
    keywords: ['paracetamol', 'pcm', 'acetaminophen', 'pain', 'fever'],
    createdAt: new Date().toISOString(),
  },
  'amoxicillin_500mg': {
    id: 'amoxicillin_500mg',
    name: 'Amoxicillin',
    strength: '500mg',
    form: 'Capsule',
    category: 'Antibiotic',
    normalized_name: 'amoxicillin 500mg capsule',
    keywords: ['amoxicillin', 'antibiotic', 'infection'],
    createdAt: new Date().toISOString(),
  },
  'ibuprofen_400mg': {
    id: 'ibuprofen_400mg',
    name: 'Ibuprofen',
    strength: '400mg',
    form: 'Tablet',
    category: 'NSAID',
    normalized_name: 'ibuprofen 400mg tablet',
    keywords: ['ibuprofen', 'pain', 'inflammation'],
    createdAt: new Date().toISOString(),
  }
};

export const MOCK_PHARMACY: Pharmacy = {
  pharmacyId: 'pharm001',
  ownerId: 'user123',
  name: 'Peace Pharmacy',
  address: 'Wuse II, Abuja',
  phone: '+2348012345678',
  geoPoint: { latitude: 9.07, longitude: 7.49 },
  geohash: 's0h0', // approximate
  verified: true,
  createdAt: '2025-01-01T10:00:00Z',
};

export const MOCK_PHC: PHC = {
  phcId: 'phc001',
  name: 'Garki PHC',
  address: 'Garki, Abuja',
  phone: '+2348099998888',
  staffIds: ['staff1'],
  createdAt: '2025-01-01T10:00:00Z',
};

export const MOCK_INVENTORY_PHARMACY: Record<string, InventoryItem> = {
  'paracetamol_500mg': {
    inventoryId: 'paracetamol_500mg',
    drugRef: 'drugMasterList/paracetamol_500mg',
    quantity: 35,
    lowStockThreshold: 10,
    lowStockAlert: false,
    lastUpdated: new Date().toISOString(),
    // Pharmacy only: no price stored here as per new spec? 
    // Spec says: "Price is NOT stored anywhere except in a purchase"
    // "Inventory Management Panel (No price, as requested)"
    // So price is strictly NOT here.
  },
  'amoxicillin_500mg': {
    inventoryId: 'amoxicillin_500mg',
    drugRef: 'drugMasterList/amoxicillin_500mg',
    quantity: 5,
    lowStockThreshold: 10,
    lowStockAlert: true,
    lastUpdated: new Date().toISOString(),
  }
};

export const MOCK_INVENTORY_PHC: Record<string, InventoryItem> = {
    'paracetamol_500mg': {
      inventoryId: 'paracetamol_500mg',
      drugRef: 'drugMasterList/paracetamol_500mg',
      quantity: 100,
      lowStockThreshold: 20,
      lowStockAlert: false,
      lastUpdated: new Date().toISOString(),
      expiryDate: '2025-12-31',
      batchNumber: 'BATCH-001'
    }
  };

export const MOCK_PURCHASES: Purchase[] = [
  {
    purchaseId: 'p_20251101_001',
    traceId: 'T-20251101-AB12CD',
    ownerType: 'pharmacy',
    ownerId: 'pharm001',
    userPhone: '+2348099990000',
    items: [
      { inventoryId: 'paracetamol_500mg', qty: 2, price: 150 }
    ],
    totalItems: 2,
    totalAmount: 300,
    createdAt: '2025-11-01T14:30:00Z',
  }
];

export const MOCK_PATIENTS: Patient[] = [
    {
        id: 'patient1',
        name: 'Amina Yusuf',
        phone: '+2348055551234',
        age: 28,
        gender: 'female',
        myMedxLinked: false,
        visits: 3
    }
];
