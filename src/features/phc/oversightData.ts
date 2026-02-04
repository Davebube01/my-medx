// Shared PHC data for Oversight Dashboard
export interface PHC {
  id: number;
  name: string;
  ward: string;
  lga: string;
  state: string;
  address: string;
  phone: string;
  lastReport: string;
  status: "Active" | "Inactive";
  stockStatus: "Healthy" | "Low" | "Critical" | "Unknown";
  staffCount: number;
  patientsServed: number;
  inventoryValue: string;
  coordinates: string;
  admins?: {
    name: string;
    email: string;
    phone: string;
  }[];
  createdAt?: string;
}

export const OVERSIGHT_PHC_DATA: PHC[] = [
  {
    id: 1,
    name: "Garki PHC Zone 1",
    ward: "Garki",
    lga: "AMAC",
    state: "FCT",
    address: "Plot 45, Garki District, Abuja",
    phone: "+234 803 456 7890",
    lastReport: "2 hours ago",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 12,
    patientsServed: 450,
    inventoryValue: "₦2.4M",
    coordinates: "9.0579° N, 7.4951° E",
    admins: [
      {
        name: "Dr. Amina Hassan",
        email: "amina.hassan@garki-phc.ng",
        phone: "+234 801 234 5678",
      },
      {
        name: "Nurse Ibrahim Musa",
        email: "ibrahim.musa@garki-phc.ng",
        phone: "+234 802 345 6789",
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Wuse District Hospital",
    ward: "Wuse",
    lga: "AMAC",
    state: "FCT",
    address: "Wuse Zone 3, Abuja",
    phone: "+234 805 123 4567",
    lastReport: "10 mins ago",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 18,
    patientsServed: 680,
    inventoryValue: "₦3.8M",
    coordinates: "9.0643° N, 7.4892° E",
  },
  {
    id: 3,
    name: "Maitama General Hospital",
    ward: "Maitama",
    lga: "AMAC",
    state: "FCT",
    address: "Maitama District, Abuja",
    phone: "+234 807 890 1234",
    lastReport: "1 day ago",
    status: "Inactive",
    stockStatus: "Critical",
    staffCount: 8,
    patientsServed: 120,
    inventoryValue: "₦890K",
    coordinates: "9.0820° N, 7.4950° E",
  },
  {
    id: 4,
    name: "Asokoro District Hospital",
    ward: "Asokoro",
    lga: "AMAC",
    state: "FCT",
    address: "Asokoro Extension, Abuja",
    phone: "+234 809 234 5678",
    lastReport: "5 hours ago",
    status: "Active",
    stockStatus: "Low",
    staffCount: 15,
    patientsServed: 520,
    inventoryValue: "₦1.9M",
    coordinates: "9.0333° N, 7.5333° E",
  },
  {
    id: 5,
    name: "Nyanya General Hospital",
    ward: "Nyanya",
    lga: "Kuje",
    state: "FCT",
    address: "Nyanya-Karu Road, Abuja",
    phone: "+234 810 345 6789",
    lastReport: "Just now",
    status: "Active",
    stockStatus: "Healthy",
    staffCount: 20,
    patientsServed: 890,
    inventoryValue: "₦4.2M",
    coordinates: "8.9833° N, 7.4167° E",
  },
  {
    id: 6,
    name: "Kararuwa PHC",
    ward: "Kararuwa",
    lga: "Bwari",
    state: "FCT",
    address: "Kararuwa Village, Abuja",
    phone: "+234 812 456 7890",
    lastReport: "3 days ago",
    status: "Inactive",
    stockStatus: "Unknown",
    staffCount: 6,
    patientsServed: 85,
    inventoryValue: "₦450K",
    coordinates: "9.1000° N, 7.3500° E",
  },
];

export const STATES = ["FCT", "Lagos", "Kano"];
export const LGAS: Record<string, string[]> = {
  FCT: ["AMAC", "Bwari", "Gwagwalada", "Kuje"],
  Lagos: ["Ikeja", "Lagos Island", "Surulere"],
  Kano: ["Kano Municipal", "Nassarawa"],
};
