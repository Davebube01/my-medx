
import useMasterlist from "../hooks/useMasterlist";
import * as api from "../services/phcApi";
import { useNotify } from "../notification/NotificationProvider";
import { Button } from "../../../components/ui/button";

export default function MasterList() {
  const { data, loading } = useMasterlist({});

  const notify = useNotify();
  const addToInventory = async (m: any) => {
    await api.createInventoryItem({ drugId: m.id, drugName: m.name, currentStock: 0 });
    // in real app you'd refresh inventory cache and show toast
    notify(`${m.name} added to PHC inventory`);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Masterlist</h2>
      {loading ? <div>Loading...</div> : (
        <div className="mt-4 space-y-2">
          {data.map(m => (
            <div key={m.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-text-secondary">{m.form} {m.strength}</div>
              </div>
              <div>
                <Button size="sm" onClick={() => addToInventory(m)}>Add to inventory</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
