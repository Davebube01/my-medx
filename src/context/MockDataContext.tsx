import { createContext, useContext, useState, type ReactNode } from "react";
import {
  MOCK_INVENTORY_PHARMACY,
  MOCK_INVENTORY_PHC,
  MOCK_PATIENTS,
  MOCK_PHC_DISPENSES,
  MOCK_DRUGS,
} from "../data/mockData";
import type { InventoryItem, Patient } from "../types";

interface MockDataContextType {
  pharmacyInventory: Record<string, InventoryItem>;
  phcInventory: Record<string, InventoryItem>;
  patients: Patient[];
  dispenseHistory: typeof MOCK_PHC_DISPENSES; // keeping simple for now
  publicPharmacies: PublicPharmacy[];

  // Actions
  addToPharmacyInventory: (item: InventoryItem) => void;
  addToPHCInventory: (item: InventoryItem) => void;
  updatePharmacyStock: (id: string, delta: number) => void;
  updatePHCStock: (id: string, delta: number) => void;
  addPatient: (patient: Patient) => void;
  addDispense: (dispense: {
    patientId: string;
    items: { drugId: string; qty: number }[];
    totalAmount?: number;
  }) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(
  undefined,
);

export type PublicPharmacy = {
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

const MOCK_PUBLIC_PHARMACIES: PublicPharmacy[] = [
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

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from mocks
  const [pharmacyInventory, setPharmacyInventory] = useState(
    MOCK_INVENTORY_PHARMACY,
  );
  const [phcInventory, setPhcInventory] = useState(MOCK_INVENTORY_PHC);
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [dispenseHistory, _setDispenseHistory] = useState(MOCK_PHC_DISPENSES);

  // Public Pharmacies State (for Homepage Search)
  const [publicPharmacies, setPublicPharmacies] = useState<PublicPharmacy[]>(
    MOCK_PUBLIC_PHARMACIES,
  );

  // Helper to sync inventory changes to the public "HealthPlus Pharmacy" (ID: 1)
  const syncToPublicPharmacy = (drugName: string, newQuantity: number) => {
    setPublicPharmacies((prev) =>
      prev.map((pharmacy) => {
        // Only update the "Admin" pharmacy (ID 1 for this demo)
        if (pharmacy.id !== 1) return pharmacy;

        const currentDrugs = new Set(pharmacy.availableDrugs);

        if (newQuantity > 0) {
          currentDrugs.add(drugName);
        } else {
          currentDrugs.delete(drugName);
        }

        return {
          ...pharmacy,
          availableDrugs: Array.from(currentDrugs),
          totalDrugs: currentDrugs.size,
        };
      }),
    );
  };

  const addToPharmacyInventory = (item: InventoryItem) => {
    setPharmacyInventory((prev) => ({
      ...prev,
      [item.inventoryId]: item,
    }));

    // Sync with public search
    const drugId = item.drugRef.split("/").pop() || "";
    const drug = MOCK_DRUGS[drugId];
    if (drug) {
      syncToPublicPharmacy(drug.name, item.quantity);
    }
  };

  const addToPHCInventory = (item: InventoryItem) => {
    setPhcInventory((prev) => ({
      ...prev,
      [item.inventoryId]: item,
    }));
  };

  const updatePharmacyStock = (id: string, delta: number) => {
    let newQty = 0;

    setPharmacyInventory((prev) => {
      const item = prev[id];
      if (!item) return prev;
      newQty = item.quantity + delta;

      // HACK: In a real app we have drug details. Here we might need to find the name.
      // For the mock, MOCK_INVENTORY_PHARMACY keys might loosely relate or we check MOCK_DRUGS.
      // Let's try to find the drug name from the item if possible, or pass it?
      // Actually, standard `InventoryItem` has `drugRef`. We can import `MOCK_DRUGS` to find name.

      return {
        ...prev,
        [id]: {
          ...item,
          quantity: newQty,
          lowStockAlert: newQty <= item.lowStockThreshold,
        },
      };
    });

    // We need to do this OUTSIDE the setState reducer to be safe with side effects,
    // but we need the item state.
    // Let's use the functional update to get the item, but we can't easily side-effect there.
    // Instead, we can read the current state before setting.

    const item = pharmacyInventory[id];
    if (item) {
      // Find drug name from MOCK_DRUGS
      // drugRef format: "drugMasterList/drugId"
      const drugId = item.drugRef.split("/").pop() || "";
      const drug = MOCK_DRUGS[drugId];

      if (drug) {
        // Calculate new quantity
        syncToPublicPharmacy(drug.name, item.quantity + delta);
      }
    }
  };

  const updatePHCStock = (id: string, delta: number) => {
    setPhcInventory((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.quantity + delta;
      return {
        ...prev,
        [id]: {
          ...item,
          quantity: newQty,
          lowStockAlert: newQty <= item.lowStockThreshold,
        },
      };
    });
  };

  const addPatient = (patient: Patient) => {
    setPatients((prev) => [patient, ...prev]);
  };

  const addDispense = ({
    patientId,
    items,
    totalAmount,
  }: {
    patientId: string;
    items: { drugId: string; qty: number }[];
    totalAmount?: number;
  }) => {
    // 1. Update Dispense History
    const patient = patients.find((p) => p.id === patientId);
    const newDispense = {
      purchaseId: `disp_${Date.now()}`,
      traceId: `T-${Date.now()}-PHC`,
      ownerType: "phc" as "phc",
      ownerId: "phc001", // Hardcoded for now
      userPhone: patient?.phone || "",
      items: items.map((i) => ({ inventoryId: i.drugId, qty: i.qty })),
      totalItems: items.reduce((acc, curr) => acc + curr.qty, 0),
      totalAmount: totalAmount || 0,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore - Mismatch in Purchase type strictness vs mock
    _setDispenseHistory((prev) => [newDispense, ...prev]);

    // 2. Update Patient Visits
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, visits: p.visits + 1, myMedxLinked: true }
          : p,
      ),
    );

    // 3. Update Inventory (Decrement Stock)
    setPhcInventory((prev) => {
      const nextInv = { ...prev };
      items.forEach((item) => {
        // Find inventory item by drugId (assuming inventoryId matches or we map it)
        // In this mock, inventoryId often == drugId (e.g. 'paracetamol_500mg')
        if (nextInv[item.drugId]) {
          const current = nextInv[item.drugId];
          const newQty = Math.max(0, current.quantity - item.qty);
          nextInv[item.drugId] = {
            ...current,
            quantity: newQty,
            lowStockAlert: newQty <= current.lowStockThreshold,
          };
        }
      });
      return nextInv;
    });
  };

  return (
    <MockDataContext.Provider
      value={{
        pharmacyInventory,
        phcInventory,
        patients,
        dispenseHistory,
        publicPharmacies,
        addToPharmacyInventory,
        addToPHCInventory,
        updatePharmacyStock,
        updatePHCStock,
        addPatient,
        addDispense,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
