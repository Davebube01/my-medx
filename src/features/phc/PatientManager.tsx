import { useState, useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { Plus, User } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { useMockData } from "../../context/MockDataContext";
import type { Patient } from "../../types";

export const PatientManager = () => {
  const { patients, addPatient } = useMockData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "Male" as "Male" | "Female",
  });

  const handleRegister = () => {
    if (!formData.name || !formData.phone) return;

    const newPatient: Patient = {
      id: `PAT-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender.toLowerCase() as "male" | "female",
      visits: 0,
      myMedxLinked: false,
    };

    addPatient(newPatient);
    setIsAddOpen(false);
    setFormData({ name: "", phone: "", age: "", gender: "Male" });
  };

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        filter: true,
        cellRenderer: (p: any) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User className="w-4 h-4" />
            </div>
            {p.value}
          </div>
        ),
        flex: 1.5,
      },
      { field: "phone", headerName: "Phone" },
      {
        headerName: "Age / Gender",
        valueGetter: (p) => `${p.data.age} / ${p.data.gender}`,
        cellClass: "capitalize",
      },
      {
        field: "myMedxLinked",
        headerName: "Linked Account",
        cellRenderer: (p: any) =>
          p.value ? (
            <span className="text-green-600 text-xs px-2 py-1 bg-green-50 rounded-full">
              Linked
            </span>
          ) : (
            <span className="text-gray-400 text-xs px-2 py-1 bg-gray-100 rounded-full">
              Pending
            </span>
          ),
      },
      { field: "visits", headerName: "Visits", type: "numericColumn" },
    ],
    []
  );

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <PageLayout
      title="Patient Management"
      actions={
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          New Patient
        </button>
      }
    >
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <Datagrid
          rowData={patients}
          colDefs={colDefs}
          onRowClick={(data) => setSelectedPatientId(data.id)}
        />
      </div>

      {/* Add/View Patient Modal */}
      {(isAddOpen || selectedPatientId) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedPatientId
                  ? "Patient Profile"
                  : "New Patient Registration"}
              </h3>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setSelectedPatientId(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>

            {selectedPatientId && selectedPatient ? (
              /* View Patient Details Mode */
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedPatient.name}
                    </h2>
                    <p className="text-gray-500">{selectedPatient.phone}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                        Age: {selectedPatient.age}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium capitalize">
                        {selectedPatient.gender}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Dispense History
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500 text-sm">
                    No dispense records found for this patient.
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Clinical Notes
                  </h4>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg p-3 h-24 text-sm"
                    placeholder="Add notes..."
                  ></textarea>
                </div>
              </div>
            ) : (
              /* Add Patient Mode */
              <div className="space-y-4">
                <p className="text-gray-500 text-sm mb-4">
                  Fill in the details to register a new patient.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="w-full border border-gray-200 rounded-lg p-3"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    className="w-full border border-gray-200 rounded-lg p-3"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    className="w-full border border-gray-200 rounded-lg p-3"
                    placeholder="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                  <select
                    className="w-full border border-gray-200 rounded-lg p-3"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as any,
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setSelectedPatientId(null);
                }}
                className="px-6 py-2 bg-gray-100 rounded-lg font-medium text-gray-700"
              >
                Close
              </button>
              {!selectedPatientId && (
                <button
                  onClick={handleRegister}
                  className="px-6 py-2 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700"
                >
                  Register Patient
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
