export type Gender = "male" | "female" | "other";

export type Patient = {
  id: string;
  name: string;
  phone: string;
  age?: number;
  gender?: Gender;
  myMedxLinked: boolean;
  visits: number;
  allergies?: string[];
  clinicalNotes?: string;
};

export type  InventoryItem = {
  id: string;
  drugId:string;
  drugName: string;
  brandName: string;
  strength: string;
  form: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  price: number;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  lastUpdated: string;
};

export type DrugMaster = {
  id: string;
  name: string;
  form?: string;
  strength?: string;
};

export type DispenseItem = { drugId: string; drugName?: string; quantity: number };

export type DispenseRecord = {
  id: string;
  patientPhone: string;
  items: DispenseItem[];
  clinicianId: string;
  timestamp: string;
};

export type PhcMetrics = {
  totalPatientsToday: number;
  drugsDispensedToday: number;
  lowStockAlerts: number;
  mostFreqDispensed: { drugId: string; drugName: string; count: number }[];
  registeredPatients: number;
};

export type Staff = {
  id: string;
  name: string;
  role: "phc_staff" | "phc_admin" | string;
  phone?: string;
};

export type PhcSettings = {
  id?: string;
  name: string;
  address?: string;
  contact?: string;
  staff?: Staff[];
};

export type CreatePatientPayload = Omit<Patient, "id" | "visits">;

export type CreateDispensePayload = {
  patientPhone: string;
  items: { drugId: string; quantity: number }[];
  clinicianId: string;
  timestamp?: string;
};
