import { useState } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { DrugSearchInput } from "../../components/shared/DrugSearchInput";
import { Trash2, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useMockData } from "../../context/MockDataContext";
import type { Drug, Patient } from "../../types";

interface DispenseItem {
  drug: Drug;
  quantity: number;
}

export const PHCDispense = () => {
  const { patients, phcInventory, addDispense } = useMockData();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [cart, setCart] = useState<DispenseItem[]>([]);
  const [complete, setComplete] = useState<boolean>(false);

  // Patient Search State
  const [patientSearch, setPatientSearch] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.phone.includes(patientSearch),
  );

  const handleAddDrug = (drug: Drug) => {
    if (cart.find((i) => i.drug.id === drug.id)) return;

    // Check stock
    const inventoryItem = phcInventory[drug.id];
    const stock = inventoryItem?.quantity || 0;

    if (stock <= 0) {
      alert("This item is out of stock in your inventory.");
      return;
    }

    setCart([...cart, { drug, quantity: 1 }]);
  };

  const updateQty = (index: number, val: number) => {
    const item = cart[index];
    const inventoryItem = phcInventory[item.drug.id];
    const maxStock = inventoryItem?.quantity || 0;

    if (val > maxStock) {
      alert(`Cannot dispense more than ${maxStock} items.`);
      return;
    }

    const newCart = [...cart];
    newCart[index].quantity = val;
    setCart(newCart);
  };

  const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleDispense = () => {
    if (!selectedPatient) return;

    addDispense({
      patientId: selectedPatient.id,
      items: cart.map((i) => ({ drugId: i.drug.id, qty: i.quantity })),
    });

    setComplete(true);
    setCart([]);
    setSelectedPatient(null);
  };

  if (complete) {
    return (
      <PageLayout title="Dispense Complete">
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Dispense Recorded
          </h2>
          <p className="text-gray-500 mb-6">
            Inventory and Patient History updated successfully.
          </p>
          <button
            onClick={() => setComplete(false)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Next Patient
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dispense Drugs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Patient Select */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Select Patient
            </h3>

            {!selectedPatient ? (
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Search patient name or phone..."
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredPatients.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatient(p)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">
                        {p.phone} • Age: {p.age}
                      </div>
                    </button>
                  ))}
                  {filteredPatients.length === 0 && (
                    <div className="text-center text-sm text-gray-400 py-4">
                      No patients found.
                    </div>
                  )}
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  + Register New Patient
                </button>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs uppercase font-semibold text-blue-600">
                    Selected Patient
                  </span>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    Change
                  </button>
                </div>
                <h4 className="font-bold text-lg text-blue-900">
                  {selectedPatient.name}
                </h4>
                <p className="text-sm text-blue-700">{selectedPatient.phone}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-blue-600">
                  <div className="bg-white/50 px-2 py-1 rounded">
                    Age: {selectedPatient.age}
                  </div>
                  <div className="bg-white/50 px-2 py-1 rounded">
                    Visits: {selectedPatient.visits}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Drug Cart - Spans 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[500px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Prescription Details
            </h3>

            <DrugSearchInput
              onSelect={handleAddDrug}
              placeholder="Search for drugs to dispense..."
              className="mb-6"
            />

            <div className="flex-1 space-y-3">
              {cart.map((item, idx) => {
                const inventoryItem = phcInventory[item.drug.id];
                const currentStock = inventoryItem?.quantity || 0;
                return (
                  <div
                    key={item.drug.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.drug.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {item.drug.strength} • {item.drug.form}
                      </span>
                      <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        In Stock: {currentStock} units
                      </div>
                    </div>

                    <div className="w-24">
                      <label className="text-xs text-gray-500 block mb-1">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={currentStock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQty(idx, parseInt(e.target.value))
                        }
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center"
                      />
                    </div>

                    <button
                      onClick={() => removeItem(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
              {cart.length === 0 && (
                <div className="text-center text-gray-400 py-12 flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-gray-200 mb-3" />
                  <p>No drugs added yet.</p>
                  <p className="text-xs text-gray-300 mt-1">
                    Search above to add items from inventory.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <button
                onClick={handleDispense}
                disabled={!selectedPatient || cart.length === 0}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-200 hover:bg-green-700 disabled:opacity-50 disabled:shadow-none transition-all"
              >
                Confirm Dispense
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
