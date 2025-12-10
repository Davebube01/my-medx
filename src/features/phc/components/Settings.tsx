import { useState } from "react";
import { usePhcContext } from "../phcContext";
import * as api from "../services/phcApi";
import { useNotify } from "../notification/NotificationProvider";
import { Button } from "../../../components/ui/button";
import StaffOverview from "../../pharmacy/dashboard/components/StaffOverview";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/input";

export default function Settings() {
  const navigate = useNavigate();
  const { refresh } = usePhcContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const notify = useNotify();
  const save = async () => {
    await api.updatePhcSettings({ name, address });
    await refresh();
    notify("Settings saved");
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-border healthcare-shadow sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/phc/dashboard")}
              className="lg:hidden"
            >
              <ArrowLeft size={18} />
              <span className="sr-only">Back to dashboard</span>
            </Button>
            <h2 className="text-2xl font-bold text-gray-800">PHC Settings</h2>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="bg-white rounded-md shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                PHC Details
              </h2>
              <p className="text-sm text-gray-400">UpdatePHC information</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-800 mb-3">
              <div className="">
                <div>
                  <label className="block text-sm">PHC Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-gray-500 bg-slate-50 outline-none focus:outline-none"
                  />
                </div>
                
              </div>
              <div>
                <div>
                  <label className="block text-sm">Address</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-gray-500 bg-slate-50 outline-none border focus:outline-none"
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <h4 className="font-medium">Staff</h4>
              <ul className="list-disc pl-6">
                {staff.map((s) => (
                  <li key={s.id}>
                    {s.name} — {s.role}
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <Button onClick={save}>Save Details</Button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <StaffOverview />
        </div>
      </div>
    </div>
  );
}
