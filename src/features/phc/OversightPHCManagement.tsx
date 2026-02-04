import { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Phone,
  UserPlus,
  X,
  Check,
} from "lucide-react";
import { OVERSIGHT_PHC_DATA, STATES, LGAS, type PHC } from "./oversightData";

export const OversightPHCManagement = () => {
  const [phcs, setPHCs] = useState<PHC[]>(OVERSIGHT_PHC_DATA);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPHC, setSelectedPHC] = useState<PHC | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Create PHC Form State
  const [newPHC, setNewPHC] = useState({
    name: "",
    state: "",
    lga: "",
    ward: "",
    address: "",
    phone: "",
    coordinates: "",
  });

  // Assign Admin Form State
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleCreatePHC = () => {
    const phc: PHC = {
      id: phcs.length + 1,
      ...newPHC,
      lastReport: "Never",
      status: "Inactive",
      stockStatus: "Unknown",
      staffCount: 0,
      patientsServed: 0,
      inventoryValue: "₦0",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPHCs([...phcs, phc]);
    setShowCreateModal(false);
    setNewPHC({
      name: "",
      state: "",
      lga: "",
      ward: "",
      address: "",
      phone: "",
      coordinates: "",
    });
  };

  const handleAssignAdmin = () => {
    if (selectedPHC) {
      setPHCs(
        phcs.map((p) =>
          p.id === selectedPHC.id
            ? { ...p, admins: [...(p.admins || []), adminForm] }
            : p,
        ),
      );
      setShowAssignModal(false);
      setAdminForm({ name: "", email: "", phone: "" });
    }
  };

  const handleRemoveAdmin = (phcId: number, adminEmail: string) => {
    setPHCs(
      phcs.map((p) =>
        p.id === phcId
          ? { ...p, admins: p.admins?.filter((a) => a.email !== adminEmail) }
          : p,
      ),
    );
  };

  const filteredPHCs = phcs.filter(
    (phc) =>
      phc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phc.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phc.lga.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PHC Management</h2>
          <p className="text-gray-500">
            Create new facilities and assign administrators
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Create PHC
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          placeholder="Search PHCs..."
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* PHC List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPHCs.map((phc) => (
          <div
            key={phc.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-lg">
                  {phc.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{phc.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {phc.ward}, {phc.lga}, {phc.state}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-3.5 h-3.5" />
                {phc.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-3.5 h-3.5" />
                {phc.coordinates}
              </div>
            </div>

            <div className="space-y-2">
              {phc.admins && phc.admins.length > 0 ? (
                <>
                  <p className="text-xs text-green-600 font-medium mb-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {phc.admins.length} Admin{phc.admins.length > 1 ? "s" : ""}{" "}
                    Assigned
                  </p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {phc.admins.map((admin, idx) => (
                      <div
                        key={idx}
                        className="bg-green-50 p-2 rounded-lg border border-green-100 flex items-start justify-between gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {admin.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {admin.email}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveAdmin(phc.id, admin.email)}
                          className="p-1 hover:bg-red-100 rounded transition-colors shrink-0"
                          title="Remove admin"
                        >
                          <X className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              <button
                onClick={() => {
                  setSelectedPHC(phc);
                  setShowAssignModal(true);
                }}
                className="w-full py-2 border border-teal-200 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {phc.admins && phc.admins.length > 0
                  ? "Add Another Admin"
                  : "Assign Admin"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPHCs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No PHCs found matching "{searchTerm}"
        </div>
      )}

      {/* Create PHC Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                Create New PHC
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facility Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Garki PHC Zone 1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  value={newPHC.name}
                  onChange={(e) =>
                    setNewPHC({ ...newPHC, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={newPHC.state}
                    onChange={(e) =>
                      setNewPHC({ ...newPHC, state: e.target.value, lga: "" })
                    }
                  >
                    <option value="">Select</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LGA *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={newPHC.lga}
                    onChange={(e) =>
                      setNewPHC({ ...newPHC, lga: e.target.value })
                    }
                    disabled={!newPHC.state}
                  >
                    <option value="">Select</option>
                    {newPHC.state &&
                      LGAS[newPHC.state]?.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ward *
                  </label>
                  <input
                    type="text"
                    placeholder="Ward name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={newPHC.ward}
                    onChange={(e) =>
                      setNewPHC({ ...newPHC, ward: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  placeholder="Full address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  value={newPHC.address}
                  onChange={(e) =>
                    setNewPHC({ ...newPHC, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={newPHC.phone}
                    onChange={(e) =>
                      setNewPHC({ ...newPHC, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coordinates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 9.0579° N, 7.4951° E"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={newPHC.coordinates}
                    onChange={(e) =>
                      setNewPHC({ ...newPHC, coordinates: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePHC}
                disabled={
                  !newPHC.name ||
                  !newPHC.state ||
                  !newPHC.lga ||
                  !newPHC.ward ||
                  !newPHC.address ||
                  !newPHC.phone
                }
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create PHC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Admin Modal */}
      {showAssignModal && selectedPHC && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-600" />
                {selectedPHC?.admins && selectedPHC.admins.length > 0
                  ? "Add Another Admin"
                  : "Assign Admin"}
              </h2>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedPHC(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-500 mb-1">Assigning to</p>
                <p className="font-medium text-gray-900">{selectedPHC.name}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={adminForm.name}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={adminForm.email}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    value={adminForm.phone}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedPHC(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAdmin}
                disabled={
                  !adminForm.name || !adminForm.email || !adminForm.phone
                }
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
