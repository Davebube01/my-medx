import { useState } from "react";
import useDispenseHistory from "../hooks/useDispenseHistory";

export default function DispenseHistory() {
  const [q, _setQ] = useState("");
  const { data, loading } = useDispenseHistory({ q, page: 1, pageSize: 50 });

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Dispense History</h2>
      {loading ? <div>Loading...</div> : (
        <div className="mt-4 space-y-2">
          {data.map(d => (
            <div key={d.id} className="p-3 border rounded">
              <div className="text-sm text-text-secondary">{new Date(d.timestamp).toLocaleString()}</div>
              <div>{d.patientPhone} — {d.items.map(i=>`${i.drugName || i.drugId} x${i.quantity}`).join(', ')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
