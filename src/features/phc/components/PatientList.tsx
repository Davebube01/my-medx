import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import usePatients from "../hooks/usePatients";
import SearchBar from "./SearchBar";
import { Button } from "../../../components/ui/button";
import Badge from "./Badge";
import { ArrowLeft, X } from "lucide-react";
import PatientForm from "./PatientForm";

export default function PatientList() {
  const navigate = useNavigate();
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const { data, total, loading } = usePatients({ page, q, pageSize: 10 });

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
            <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
            <div className="w-64">
              <SearchBar
                value={q}
                onChange={setQ}
                placeholder="Search by name or phone"
              />
            </div>
            <Button
              onClick={() => {
                setAddPatientOpen(true);
              }}
            >
              Add Patient
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 shadow-sm rounded-md">
          {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full table-auto rounded text-gray-800">
            <thead className="bg-gray-200 ">
              <tr className="text-left text-sm">
                <th className="p-2">Name</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>MyMedX</th>
                <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">
                    <Link
                      to={`/phc/patients/${p.phone}`}
                      className="text-primary"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td>{p.phone}</td>
                  <td>{p.age ?? "-"}</td>
                  <td>{p.gender ?? "-"}</td>
                  <td className="">
                    {p.myMedxLinked ? <Badge>Linked</Badge> : <span>No</span>}
                  </td>
                  <td>{p.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-text-secondary">{total} patients</div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((s) => Math.max(1, s - 1))}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((s) => s + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        </div>
      </div>

      {addPatientOpen &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-3">
                  <div className="flex justify-end items-center">
                    <X onClick={()=>{setAddPatientOpen(false)}}/>
                  </div>
                  <PatientForm />
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
