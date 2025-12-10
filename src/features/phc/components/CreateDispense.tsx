import { useState } from "react";
import { Button } from "../../../components/ui/button";
import * as api from "../services/phcApi";
import useMasterlist from "../hooks/useMasterlist";
import { useNotify } from "../notification/NotificationProvider";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePatients from "../hooks/usePatients";
import SearchBar from "./SearchBar";
import type { Patient } from "../types";

type Row = { id: string; drugId?: string; quantity?: number };

export default function CreateDispense() {
  const navigate = useNavigate();
  // const [patientPhone, setPatientPhone] = useState("");
  const [q, setQ] = useState("");
  const [page, _setPage] = useState(1);
  const { data, loading } = usePatients({ page, q, pageSize: 10 });

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [rows, setRows] = useState<Row[]>([
    { id: "r1", drugId: undefined, quantity: undefined },
  ]);
  const [_message, setMessage] = useState<string | null>(null);
  const notify = useNotify();
  const { data: masters } = useMasterlist({});

  const addRow = () => setRows((s) => [...s, { id: `r${Date.now()}` }]);
  const removeRow = (id: string) =>
    setRows((s) => s.filter((r) => r.id !== id));

  const updateRow = (id: string, patch: Partial<Row>) =>
    setRows((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const validate = () => {
    if (!selectedPatient) return "Patient is required";
    for (const r of rows) {
      if (!r.drugId) return "Select a drug";
      if (!r.quantity || r.quantity <= 0) return "Quantity must be > 0";
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setMessage(err);
    const payload = {
      patientPhone: selectedPatient?.phone,
      clinicianId: "cli-1",
      items: rows.map((r) => ({ drugId: r.drugId!, quantity: r.quantity! })),
    };
    try {
      await api.createDispenseRecord(payload as any);
      notify("Dispense created");
      setRows([{ id: `r${Date.now()}` }]);
      setQ("");
      setSelectedPatient(null);
    } catch (e) {
      notify("Failed to create dispense");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-border healthcare-shadow sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/phc/dashboard")}
              className="lg:hidden"
            >
              <ArrowLeft size={18} />
              <span className="sr-only">Back to dashboard</span>
            </Button>
            <h2 className="text-2xl font-bold text-gray-800">
              Create Dispense
            </h2>
          </div>
        </div>
      </div>
      <div className="p-6 ">
        <div className="space-y-4 bg-white p-6 shadow-md rounded-md">
          <div className="max-w-md">
          <label className="block text-sm">Patient Phone</label>
          {/* <input
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            className="w-full border px-2 py-2 rounded"
          /> */}
          <SearchBar
            value={q}
            onChange={setQ}
            placeholder="Search by name or phone"
          />
        </div>
        <div>
          {/* Only show search results when the user has typed something */}
          {q.trim() === "" ? (
            <div className="text-sm text-text-secondary">
              Start typing a name or phone number to search patients
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-text-secondary">
                  Showing {data.length} result{data.length !== 1 ? "s" : ""}
                </div>
                <div className="text-sm text-text-secondary">Filtered</div>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                role="list"
              >
                {loading ? (
                  <div>Searching...</div>
                ) : data.length === 0 ? (
                  <div className="text-sm text-text-secondary">
                    No patients found
                  </div>
                ) : (
                  data.map((p) => (
                    <button
                      key={p.id}
                      role="listitem"
                      onClick={() => setSelectedPatient(p)}
                      aria-pressed={selectedPatient?.id === p.id}
                      aria-label={`Select patient ${p.name} ${p.phone}`}
                      className={`text-left p-3 rounded border healthcare-transition hover:shadow-sm flex items-center justify-between ${
                        selectedPatient?.id === p.id
                          ? "bg-primary/10 border-primary ring-2 ring-primary/20"
                          : "bg-white"
                      }`}
                    >
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-text-secondary">
                          {p.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          {p.myMedxLinked ? (
                            <span className="inline-block px-2 py-1 text-xs bg-accent rounded">
                              Linked
                            </span>
                          ) : (
                            <span className="text-xs text-text-secondary">
                              No
                            </span>
                          )}
                        </div>
                        {selectedPatient?.id === p.id && (
                          <Check
                            size={18}
                            className="text-primary"
                            aria-hidden
                          />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {selectedPatient && (
          <div className="mt-4 p-4 border rounded bg-surface">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{selectedPatient.name}</div>
                <div className="text-sm text-text-secondary">
                  {selectedPatient.phone}
                </div>
              </div>
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPatient(null)}
                  aria-label="Deselect patient"
                >
                  Deselect
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex gap-2 items-center">
              <select
                value={r.drugId}
                onChange={(e) => updateRow(r.id, { drugId: e.target.value })}
                className="border px-2 py-2 rounded"
              >
                <option value="">Select drug</option>
                {masters?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={r.quantity ?? ""}
                onChange={(e) =>
                  updateRow(r.id, { quantity: Number(e.target.value) })
                }
                className="w-24 border px-2 py-2 rounded"
                placeholder="Qty"
              />
              <Button variant="ghost" onClick={() => removeRow(r.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={addRow}>Add Row</Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Confirm
          </Button>
        </div>

        {/* message state kept for legacy reasons; notifications are handled via notify() */}
        </div>
      </div>
    </div>
  );
}
