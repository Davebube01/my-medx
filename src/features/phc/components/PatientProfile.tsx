
import { useNavigate, useParams } from "react-router-dom";
import usePatient from "../hooks/usePatient";
import useDispenseHistory from "../hooks/useDispenseHistory";
import Badge from "./Badge";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PatientProfile() {
  const { phoneOrId } = useParams();
  const navigate = useNavigate()
  const phone = phoneOrId ?? null;
  const { patient, loading } = usePatient(phone);
  const { data: history } = useDispenseHistory({ q: phone ?? "" });

  if (loading) return <div>Loading patient...</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-border healthcare-shadow sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between space-x-4">
            <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/phc/dashboard')}
                  className="lg:hidden"
                >
                    <ArrowLeft size={18}/>
                  <span className="sr-only">Back to dashboard</span>
                </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
            <div className="text-sm text-gray-400 mt-1">{patient.phone}</div>
          </div>
          <div>
            {patient.myMedxLinked ? (
              <Badge>Linked</Badge>
            ) : (
              <Badge>Not Linked</Badge>
            )}
          </div>
        </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        

       <div className="bg-white shadow rounded-lg border border-border p-6 healthcare-shadow">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Info</h3>
           <div className="space-y-2">
             <div>Age: {patient.age ?? "-"}</div>
            <div>Gender: {patient.gender ?? "-"}</div>
            <div>Visits: {patient.visits}</div>
           </div>
          </div>

          <div className="p-4 bg-surface rounded">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Clinical Notes</h3>
            <div>{patient.clinicalNotes ?? "-"}</div>
            <h4 className="font-semibold mt-3 ">Allergies</h4>
            <div>
              {(patient.allergies && patient.allergies.join(", ")) || "-"}
            </div>
          </div>
        </div>
       </div>

        <div className="bg-white shadow rounded-lg border border-border p-6 healthcare-shadow">
          <div>
          <h3 className="text-xl font-semibold text-gray-800">Dispense History</h3>
          <div className="mt-2 space-y-2">
            {history?.slice(0, 5).map((d) => (
              <div key={d.id} className="p-2 border rounded">
                <div className="text-sm text-text-secondary">
                  {new Date(d.timestamp).toLocaleString()}
                </div>
                <div className="text-sm">
                  {d.items
                    .map((it) => `${it.drugName || it.drugId} x${it.quantity}`)
                    .join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
