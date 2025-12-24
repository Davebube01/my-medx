import { useState } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { MOCK_PATIENTS } from "../../data/mockData";
import { Plus, User } from "lucide-react";

export const PatientManager = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

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
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Age / Gender</th>
              <th className="px-6 py-4">Linked Account</th>
              <th className="px-6 py-4 text-right">Visits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_PATIENTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                  {p.name}
                </td>
                <td className="px-6 py-4">{p.phone}</td>
                <td className="px-6 py-4 capitalize">
                  {p.age} / {p.gender}
                </td>
                <td className="px-6 py-4">
                  {p.myMedxLinked ? (
                    <span className="text-green-600 text-xs px-2 py-1 bg-green-50 rounded-full">
                      Linked
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs px-2 py-1 bg-gray-100 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">{p.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal Placeholder */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">New Patient Form</h3>
            <p className="text-gray-500 text-sm mb-4">
              Implementation placeholder for creating new patient records.
            </p>
            <button
              onClick={() => setIsAddOpen(false)}
              className="w-full py-2 bg-gray-100 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
