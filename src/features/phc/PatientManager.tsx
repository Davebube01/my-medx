import { useState, useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { Plus, User, Eye, Activity, Calendar, Phone } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { useMockData } from "../../context/MockDataContext";
import type { Patient } from "../../types";

export const PatientManager = () => {
  const { patients, addPatient } = useMockData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
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
        headerName: "Patient Name",
        filter: true,
        flex: 1.5,
        cellRenderer: (p: any) => (
          <div className="flex items-center gap-3 py-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 shadow-sm border border-blue-200">
              <User className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-900">{p.value}</span>
          </div>
        ),
      },
      {
        field: "phone",
        headerName: "Phone Number",
        cellRenderer: (p: any) => (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-3 h-3" />
            <span>{p.value}</span>
          </div>
        ),
      },
      { field: "age", headerName: "Age", maxWidth: 100 },
      {
        field: "gender",
        headerName: "Gender",
        cellRenderer: (p: any) => <span className="capitalize">{p.value}</span>,
        maxWidth: 120,
      },
      {
        field: "myMedxLinked",
        headerName: "MyMedX Account Linked?",
        cellRenderer: (p: any) =>
          p.value ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              Yes
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              No
            </span>
          ),
      },
      {
        field: "visits",
        headerName: "Number of Visits",
        type: "numericColumn",
        cellRenderer: (p: any) => (
          <div className="flex items-center justify-end gap-1 font-medium text-gray-700">
            <span>{p.value}</span>
            <span className="text-xs text-gray-400">visits</span>
          </div>
        ),
      },
      {
        headerName: "Actions",
        cellRenderer: (p: any) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPatientId(p.data.id);
            }}
            className="flex items-center mt gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-medium border border-blue-100"
          >
            <Eye className="w-3.5 h-3.5" />
            View Profile
          </button>
        ),
        sortable: false,
        filter: false,
        width: 140,
        cellClass: "mt-1",
      },
    ],
    [],
  );

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <PageLayout
      title="Patient Management"
      actions={
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/20 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Patient
        </button>
      }
    >
      {/* Stats Cards - Optional Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Patients</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {patients.length}
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Visits</p>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">New This Month</p>
            <h3 className="text-2xl font-bold text-gray-900">4</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        <Datagrid
          rowData={patients}
          colDefs={colDefs}
          onRowClick={(data) => setSelectedPatientId(data.id)}
        />
      </div>

      {/* Add/View Patient Modal */}
      {(isAddOpen || selectedPatientId) && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {selectedPatientId
                  ? "Patient Profile"
                  : "New Patient Registration"}
              </h3>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setSelectedPatientId(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {selectedPatientId && selectedPatient ? (
              /* View Patient Details Mode */
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-lg">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedPatient.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                        <Phone className="w-3.5 h-3.5" />
                        {selectedPatient.phone}
                      </span>
                      <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                        Age: {selectedPatient.age}
                      </span>
                      <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium capitalize">
                        {selectedPatient.gender}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      Dispense History
                    </h4>
                    <button className="text-sm text-blue-600 font-medium hover:underline">
                      View Full History
                    </button>
                  </div>

                  {/* Fetch history for this patient */}
                  {(() => {
                    const { dispenseHistory } = useMockData();
                    // Filter history by patient phone (common identifier in mocks)
                    // In a real app, use patient ID
                    const patientHistory = dispenseHistory.filter(
                      (d) => d.userPhone === selectedPatient.phone,
                    );

                    if (patientHistory.length === 0) {
                      return (
                        <div className="bg-gray-50 rounded-2xl p-8 py-12 text-center border border-dashed border-gray-200">
                          <Activity className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">
                            No dispense records found for this patient.
                          </p>
                          <button
                            onClick={() => {
                              setIsAddOpen(false);
                              // Ideally navigate to dispense page, but for now just close
                              window.location.href = "/phc/dispense";
                            }}
                            className="mt-4 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Start New Dispense
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {patientHistory.map((dispense) => (
                          <div
                            key={dispense.purchaseId}
                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className="text-xs font-medium text-gray-500">
                                  {new Date(
                                    dispense.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                                <h5 className="font-semibold text-gray-900 mt-0.5">
                                  Dispensed {dispense.totalItems} items
                                </h5>
                              </div>
                              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">
                                {dispense.traceId}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {dispense.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-gray-600 capitalize">
                                    {item.inventoryId.replace(/_/g, " ")}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    x{item.qty}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <div className="border-t border-gray-100 pt-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Clinical Notes
                  </h4>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-32 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                    placeholder="Add clinical notes..."
                  ></textarea>
                </div>
              </div>
            ) : (
              /* Add Patient Mode */
              <div className="space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-900 text-sm">
                    Please fill in the patient's personal information
                    accurately. A unique Patient ID will be generated
                    automatically.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="e.g. +234..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="30"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="w-full border border-gray-200 rounded-xl p-3.5 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setSelectedPatientId(null);
                }}
                className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Close
              </button>
              {!selectedPatientId && (
                <button
                  onClick={handleRegister}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/20"
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
