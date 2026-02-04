import { useState } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { LocationPicker } from "../../components/shared/LocationPicker";
import {
  Building2,
  MapPin,
  Users,
  Phone,
  LogOut,
  Save,
  Plus,
  Trash2,
  X,
} from "lucide-react";

// Mock Data for Dropdowns
const STATES = ["FCT", "Lagos", "Kano", "Rivers"];
const LGAS: Record<string, string[]> = {
  FCT: ["AMAC", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Abaji"],
  Lagos: ["Ikeja", "Epe", "Badagry"],
  Kano: ["Kano Municipal", "Gwale"],
  Rivers: ["Port Harcourt", "Obio-Akpor"],
};

interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export const PHCSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userPickingLocation, setUserPickingLocation] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "staff">("profile");

  // Profile State
  const [profile, setProfile] = useState({
    name: "Garki PHC",
    type: "Government Facility",
    address: "Area 10, Garki, Abuja",
    phone: "+234 9 123 4567",
    state: "FCT",
    lga: "AMAC",
    ward: "Garki",
    lat: "9.0261",
    lng: "7.4764",
  });

  // Staff State
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: "1",
      name: "Dr. Amina Bello",
      role: "Medical Officer",
      phone: "08012345678",
    },
    {
      id: "2",
      name: "Nurse John Doe",
      role: "Chief Nursing Officer",
      phone: "08023456789",
    },
    {
      id: "3",
      name: "Pharm. Yusuf Ali",
      role: "Pharmacist",
      phone: "08034567890",
    },
  ]);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "Nurse",
    phone: "",
  });

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // In real app, API call here
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.phone) return;
    setStaffList([...staffList, { ...newStaff, id: Date.now().toString() }]);
    setNewStaff({ name: "", role: "Nurse", phone: "" });
    setIsAddStaffOpen(false);
  };

  const removeStaff = (id: string) => {
    setStaffList(staffList.filter((s) => s.id !== id));
  };

  return (
    <PageLayout title="PHC Settings">
      <div className="max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "profile"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Profile & Location
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "staff"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Manage Staff
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-32 bg-linear-to-r from-green-600 to-green-400 relative">
                <div className="absolute -bottom-10 left-8 p-1 bg-white rounded-full">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 border-4 border-white shadow-sm">
                    <Building2 className="w-10 h-10" />
                  </div>
                </div>
                {isEditing && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProfileUpdate}
                      className="bg-white text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="pt-14 px-8 pb-8">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Facility Name
                      </label>
                      <input
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Phone Contact
                      </label>
                      <input
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        value={profile.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                      />
                    </div>

                    <div className="col-span-2 border-t border-gray-100 pt-4 mt-2">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        Location Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            State
                          </label>
                          <select
                            value={profile.state}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                state: e.target.value,
                                lga: "",
                              })
                            }
                            className="w-full border border-gray-200 rounded-lg p-2.5 bg-white"
                          >
                            {STATES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            LGA
                          </label>
                          <select
                            value={profile.lga}
                            onChange={(e) =>
                              setProfile({ ...profile, lga: e.target.value })
                            }
                            className="w-full border border-gray-200 rounded-lg p-2.5 bg-white"
                            disabled={!profile.state}
                          >
                            <option value="">Select LGA</option>
                            {profile.state &&
                              LGAS[profile.state]?.map((l) => (
                                <option key={l} value={l}>
                                  {l}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Ward
                          </label>
                          <input
                            value={profile.ward}
                            onChange={(e) =>
                              setProfile({ ...profile, ward: e.target.value })
                            }
                            className="w-full border border-gray-200 rounded-lg p-2.5 bg-white"
                            placeholder="Enter Ward"
                          />
                        </div>
                      </div>

                      <div className="col-span-2 mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Geo-Location
                        </label>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">
                                  Latitude
                                </label>
                                <input
                                  value={profile.lat}
                                  readOnly
                                  className="w-full border border-gray-200 rounded-lg p-2.5 bg-white font-mono text-sm text-gray-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">
                                  Longitude
                                </label>
                                <input
                                  value={profile.lng}
                                  readOnly
                                  className="w-full border border-gray-200 rounded-lg p-2.5 bg-white font-mono text-sm text-gray-500"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                setUserPickingLocation(!userPickingLocation)
                              }
                              className={`px-4 py-2.5 rounded-lg border font-medium text-sm flex items-center gap-2 transition-colors ${userPickingLocation ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                            >
                              {userPickingLocation ? (
                                <X className="w-4 h-4" />
                              ) : (
                                <MapPin className="w-4 h-4" />
                              )}
                              {userPickingLocation
                                ? "Close Map"
                                : "Pick on Map"}
                            </button>
                          </div>

                          {userPickingLocation && (
                            <div className="animate-in fade-in zoom-in duration-300">
                              <LocationPicker
                                initialLat={parseFloat(profile.lat) || 9.0765}
                                initialLng={parseFloat(profile.lng) || 7.3986}
                                onLocationSelect={(lat, lng) => {
                                  setProfile((prev) => ({
                                    ...prev,
                                    lat: lat.toFixed(6),
                                    lng: lng.toFixed(6),
                                  }));
                                }}
                              />
                              <p className="text-xs text-center text-gray-500 mt-2">
                                Click on the map to update the location marker.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-gray-500 flex items-center gap-2">
                      {profile.type} • {profile.state} State
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Location
                          </label>
                          <p className="text-gray-900 font-medium">
                            {profile.address}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {profile.lga} LGA • {profile.ward} Ward
                          </p>
                          {profile.lat && profile.lng && (
                            <p className="text-xs text-green-600 mt-2 font-mono bg-green-50 inline-block px-2 py-1 rounded border border-green-100">
                              {profile.lat}, {profile.lng}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Contact Info
                          </label>
                          <p className="text-gray-900 font-medium">
                            {profile.phone}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Primary contact for this facility
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sign Out</h3>
                <p className="text-gray-500 text-sm">
                  Securely log out of your session on this device.
                </p>
              </div>
              <button className="px-5 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium flex items-center gap-2 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {activeTab === "staff" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Staff Management
                </h3>
                <p className="text-sm text-gray-500">
                  Manage registered staff access and roles.
                </p>
              </div>
              <button
                onClick={() => setIsAddStaffOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-shadow shadow-lg shadow-green-600/20"
              >
                <Plus className="w-4 h-4" /> Add Staff
              </button>
            </div>

            {isAddStaffOpen && (
              <div className="p-6 bg-green-50 border-b border-green-100 animate-in slide-in-from-top-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-green-800 mb-1">
                      Full Name
                    </label>
                    <input
                      value={newStaff.name}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Staff Name"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-green-800 mb-1">
                      Role
                    </label>
                    <select
                      value={newStaff.role}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    >
                      <option>Nurse</option>
                      <option>Doctor</option>
                      <option>Pharmacist</option>
                      <option>Admin</option>
                      <option>CHEW</option>
                    </select>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-green-800 mb-1">
                      Phone
                    </label>
                    <input
                      value={newStaff.phone}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="080xxxxxxxx"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddStaff}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsAddStaffOpen(false)}
                      className="bg-white border border-green-200 text-green-700 p-2 rounded-lg hover:bg-green-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="divide-y divide-gray-100">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold border-2 border-white shadow-sm">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {staff.name}
                      </h4>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">
                          {staff.role}
                        </span>
                        <span>• {staff.phone}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <Building2 className="w-4 h-4" /> {/* Edit Placeholer */}
                    </button>
                    <button
                      onClick={() => removeStaff(staff.id)}
                      className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {staffList.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>No staff records found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
