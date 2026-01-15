import { createContext, useContext, useState, type ReactNode } from "react";
import {
  MOCK_INVENTORY_PHARMACY,
  MOCK_INVENTORY_PHC,
  MOCK_PATIENTS,
  MOCK_DRUGS,
  MOCK_PHC_DISPENSES,
} from "../data/mockData";
import type { InventoryItem, Drug, Patient } from "../types";

interface MockDataContextType {
  pharmacyInventory: Record<string, InventoryItem>;
  phcInventory: Record<string, InventoryItem>;
  patients: Patient[];
  dispenseHistory: typeof MOCK_PHC_DISPENSES; // keeping simple for now

  // Actions
  addToPharmacyInventory: (item: InventoryItem) => void;
  addToPHCInventory: (item: InventoryItem) => void;
  updatePharmacyStock: (id: string, delta: number) => void;
  updatePHCStock: (id: string, delta: number) => void;
  addPatient: (patient: Patient) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(
  undefined
);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from mocks
  const [pharmacyInventory, setPharmacyInventory] = useState(
    MOCK_INVENTORY_PHARMACY
  );
  const [phcInventory, setPhcInventory] = useState(MOCK_INVENTORY_PHC);
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [dispenseHistory, setDispenseHistory] = useState(MOCK_PHC_DISPENSES);

  const addToPharmacyInventory = (item: InventoryItem) => {
    setPharmacyInventory((prev) => ({
      ...prev,
      [item.inventoryId]: item,
    }));
  };

  const addToPHCInventory = (item: InventoryItem) => {
    setPhcInventory((prev) => ({
      ...prev,
      [item.inventoryId]: item,
    }));
  };

  const updatePharmacyStock = (id: string, delta: number) => {
    setPharmacyInventory((prev) => {
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

  return (
    <MockDataContext.Provider
      value={{
        pharmacyInventory,
        phcInventory,
        patients,
        dispenseHistory,
        addToPharmacyInventory,
        addToPHCInventory,
        updatePharmacyStock,
        updatePHCStock,
        addPatient,
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
