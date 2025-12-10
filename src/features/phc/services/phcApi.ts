import { v4 as uuidv4 } from "uuid";
import type {
  PhcMetrics,
  Patient,
  CreatePatientPayload,
  CreateDispensePayload,
  InventoryItem,
  DrugMaster,
  DispenseRecord,
  Staff,
  PhcSettings,
} from "../types";

// Mock in-memory stores
const patients: Patient[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    phone: "08012345678",
    age: 34,
    gender: "male",
    myMedxLinked: false,
    visits: 2,
    allergies: ["Penicillin"],
    clinicalNotes: "No chronic conditions",
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    phone: "08087654321",
    age: 28,
    gender: "female",
    myMedxLinked: true,
    visits: 5,
  },
  {
    id: uuidv4(),
    name: "Michael Johnson",
    phone: "08034567890",
    age: 41,
    gender: "male",
    myMedxLinked: false,
    visits: 1,
    allergies: ["Dust", "Pollen"],
    clinicalNotes: "Mild asthmatic symptoms",
  },
  {
    id: uuidv4(),
    name: "Amara Obi",
    phone: "08123456789",
    age: 30,
    gender: "female",
    myMedxLinked: true,
    visits: 3,
  },
  {
    id: uuidv4(),
    name: "Samuel Ade",
    phone: "07099887766",
    age: 50,
    gender: "male",
    myMedxLinked: false,
    visits: 4,
    allergies: [],
    clinicalNotes: "Borderline hypertension",
  },
  {
    id: uuidv4(),
    name: "Chinwe Okeke",
    phone: "09011223344",
    age: 22,
    gender: "female",
    myMedxLinked: true,
    visits: 2,
  },
];


export const inventory: InventoryItem[] = [
  {
    id: uuidv4(),
    drugId: "d1",
    drugName: "Paracetamol",
    brandName: "Emzor Paracetamol",
    strength: "500mg",
    form: "Tablet",
    category: "Analgesic",
    currentStock: 120,
    minThreshold: 20,
    price: 150,
    manufacturer: "Emzor Pharmaceuticals",
    batchNumber: "PT-2024-001",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d2",
    drugName: "Amoxicillin",
    brandName: "Beecham Amoxicillin",
    strength: "250mg",
    form: "Capsule",
    category: "Antibiotic",
    currentStock: 8,
    minThreshold: 10,
    price: 350,
    manufacturer: "GSK Pharmaceuticals",
    batchNumber: "AMX-2024-227",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 4 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d3",
    drugName: "Ibuprofen",
    brandName: "Brustan-N",
    strength: "400mg",
    form: "Tablet",
    category: "NSAID",
    currentStock: 60,
    minThreshold: 15,
    price: 200,
    manufacturer: "Ranbaxy Pharmaceuticals",
    batchNumber: "IBU-2024-112",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 12 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d4",
    drugName: "Vitamin C",
    brandName: "Fidson Vitamin C",
    strength: "100mg",
    form: "Tablet",
    category: "Supplement",
    currentStock: 300,
    minThreshold: 50,
    price: 100,
    manufacturer: "Fidson Healthcare",
    batchNumber: "VC-2024-044",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000).toISOString(), // 24 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d5",
    drugName: "Metronidazole",
    brandName: "Flagyl",
    strength: "400mg",
    form: "Tablet",
    category: "Antibiotic",
    currentStock: 45,
    minThreshold: 10,
    price: 250,
    manufacturer: "Sanofi",
    batchNumber: "MTZ-2024-890",
    expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000).toISOString(), // 9 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d6",
    drugName: "Ciprofloxacin",
    brandName: "Ciproxin",
    strength: "500mg",
    form: "Tablet",
    category: "Antibiotic",
    currentStock: 22,
    minThreshold: 10,
    price: 500,
    manufacturer: "Bayer Healthcare",
    batchNumber: "CIP-2024-351",
    expiryDate: new Date(Date.now() + 450 * 24 * 60 * 60 * 1000).toISOString(), // 15 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d7",
    drugName: "ORS",
    brandName: "WHO ORS Pack",
    strength: "Standard",
    form: "Sachet",
    category: "Rehydration",
    currentStock: 85,
    minThreshold: 30,
    price: 120,
    manufacturer: "UNICEF Supply Division",
    batchNumber: "ORS-2024-511",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 12 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d8",
    drugName: "Zinc Sulphate",
    brandName: "Zincol",
    strength: "20mg",
    form: "Tablet",
    category: "Supplement",
    currentStock: 55,
    minThreshold: 20,
    price: 150,
    manufacturer: "Morris Pharma",
    batchNumber: "ZN-2024-722",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000).toISOString(), // 18 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d9",
    drugName: "Coartem",
    brandName: "Novartis Coartem",
    strength: "20/120mg",
    form: "Tablet",
    category: "Antimalarial",
    currentStock: 38,
    minThreshold: 10,
    price: 900,
    manufacturer: "Novartis",
    batchNumber: "CRT-2024-633",
    expiryDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000).toISOString(), // 7 months
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    drugId: "d10",
    drugName: "Loratadine",
    brandName: "Claritin",
    strength: "10mg",
    form: "Tablet",
    category: "Antihistamine",
    currentStock: 70,
    minThreshold: 15,
    price: 300,
    manufacturer: "Schering-Plough",
    batchNumber: "LOR-2024-267",
    expiryDate: new Date(Date.now() + 400 * 24 * 60 * 60 * 1000).toISOString(), // 13 months
    lastUpdated: new Date().toISOString(),
  },
];



const masterlist: DrugMaster[] = [
  { id: "d1", name: "Paracetamol 500mg", form: "tablet", strength: "500mg" },
  { id: "d2", name: "Amoxicillin 250mg", form: "capsule", strength: "250mg" },
  { id: "d3", name: "Ibuprofen 200mg", form: "tablet", strength: "200mg" },
];

const dispenses: DispenseRecord[] = [];

const staff: Staff[] = [
  { id: uuidv4(), name: "Alice PHC", role: "phc_admin", phone: "0809000001" },
  { id: uuidv4(), name: "Bob Nurse", role: "phc_staff", phone: "0809000002" },
];

let phcSettings: PhcSettings = {
  id: "phc-1",
  name: "Demo PHC",
  address: "1 Health St",
  contact: "0800000000",
  staff,
};

function wait<T>(v: T, ms = 300) {
  return new Promise<T>((res) => setTimeout(() => res(v), ms));
}

// phcApi mock surface
// TODO: Replace implementation with real fetch/axios calls to server endpoints

// GET /api/phc/metrics
export async function getPhcMetrics(): Promise<PhcMetrics> {
  const metrics: PhcMetrics = {
    totalPatientsToday: 12,
    drugsDispensedToday: 45,
    lowStockAlerts: inventory.filter((i) => i.currentStock <= (i.minThreshold ?? 10)).length,
    mostFreqDispensed: [{ drugId: "d1", drugName: "Paracetamol 500mg", count: 20 }],
    registeredPatients: patients.length,
  };
  return wait(metrics);
}

// GET /api/phc/patients?q=&page=&pageSize=
export async function listPatients({ page = 1, q = "", pageSize = 10 } = {}) {
  const filtered = patients.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.phone.includes(q)
  );
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);
  return wait({ data, total: filtered.length });
}

// POST /api/phc/patients
export async function createPatient(payload: CreatePatientPayload): Promise<Patient> {
  const newPatient: Patient = { ...payload, id: uuidv4(), visits: 0 } as Patient;
  patients.unshift(newPatient);
  return wait(newPatient);
}

// GET /api/phc/patients/:phone
export async function getPatientByPhone(phone: string): Promise<Patient | null> {
  const p = patients.find((x) => x.phone === phone) ?? null;
  return wait(p);
}

// POST /api/phc/dispense
export async function createDispenseRecord(payload: CreateDispensePayload): Promise<DispenseRecord> {
  // simulate validation and inventory deduction
  const rec: DispenseRecord = {
    id: uuidv4(),
    patientPhone: payload.patientPhone,
    items: payload.items.map((it) => ({ ...it, drugName: masterlist.find((m) => m.id === it.drugId)?.name })),
    clinicianId: payload.clinicianId,
    timestamp: new Date().toISOString(),
  };

  // deduct inventory optimistically here in mock
  payload.items.forEach((it) => {
    const inv = inventory.find((i) => i.drugId === it.drugId);
    if (inv) inv.currentStock = Math.max(0, inv.currentStock - it.quantity);
  });

  dispenses.unshift(rec);
  return wait(rec, 400);
}

// GET /api/phc/inventory?q=&page=
export async function listInventory({ page = 1, q = "", pageSize = 10 } = {}) {
  const filtered = inventory.filter((i) => i.drugName.toLowerCase().includes(q.toLowerCase()));
  const start = (page - 1) * pageSize;
  return wait({ data: filtered.slice(start, start + pageSize), total: filtered.length });
}

// PUT /api/phc/inventory/:id
export async function updateInventoryItem(id: string, payload: Partial<InventoryItem>): Promise<InventoryItem | null> {
  const idx = inventory.findIndex((i) => i.id === id);
  if (idx === -1) return wait(null);
  inventory[idx] = { ...inventory[idx], ...payload };
  return wait(inventory[idx]);
}

// POST /api/phc/inventory
export async function createInventoryItem(
  payload: Partial<InventoryItem>
): Promise<InventoryItem> {
  const item: InventoryItem = {
    id: uuidv4(),
    drugId: payload.drugId ?? `d${Math.floor(Math.random() * 10000)}`,
    drugName: payload.drugName ?? "Unknown Drug",
    brandName: payload.brandName ?? "Generic Brand",
    strength: payload.strength ?? "N/A",
    form: payload.form ?? "Tablet",
    category: payload.category ?? "General",
    currentStock: payload.currentStock ?? 0,
    minThreshold: payload.minThreshold ?? 10,
    price: payload.price ?? 0,
    manufacturer: payload.manufacturer ?? "Unknown Manufacturer",
    batchNumber: payload.batchNumber ?? `BATCH-${Date.now()}`,
    expiryDate:
      payload.expiryDate ??
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // default 1 year
    lastUpdated: new Date().toISOString(),
  };

  inventory.unshift(item);
  return wait(item, 300);
}


// GET /api/drug/masterlist?q=&page=
export async function listMasterlist({ q = "", page = 1, pageSize = 10 } = {}) {
  const filtered = masterlist.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));
  const start = (page - 1) * pageSize;
  return wait({ data: filtered.slice(start, start + pageSize), total: filtered.length });
}

// GET /api/phc/dispense?filters
export async function listDispenseHistory({ page = 1, q = "", pageSize = 10 } = {}) {
  const filtered = dispenses.filter(
    (d) => d.patientPhone.includes(q) || d.items.some((it) => it.drugName?.toLowerCase().includes(q.toLowerCase()))
  );
  const start = (page - 1) * pageSize;
  return wait({ data: filtered.slice(start, start + pageSize), total: filtered.length });
}

export async function getStaffList(): Promise<Staff[]> {
  return wait(staff);
}

export async function updatePhcSettings(payload: Partial<PhcSettings>): Promise<PhcSettings> {
  phcSettings = { ...phcSettings, ...payload };
  return wait(phcSettings);
}

export default {
  getPhcMetrics,
  listPatients,
  createPatient,
  getPatientByPhone,
  createDispenseRecord,
  listInventory,
  updateInventoryItem,
  listMasterlist,
  listDispenseHistory,
  getStaffList,
  updatePhcSettings,
};
