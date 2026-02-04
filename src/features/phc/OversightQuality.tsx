import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const OversightQuality = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Data Quality Reports
        </h2>
        <p className="text-gray-500">
          Metrics on reporting timeliness, completeness, and accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Completeness</p>
              <h3 className="text-2xl font-bold text-gray-900">94.2%</h3>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: "94.2%" }}
            ></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Timeliness</p>
              <h3 className="text-2xl font-bold text-gray-900">88.5%</h3>
            </div>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: "88.5%" }}
            ></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Flagged Records
              </p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-xs text-orange-600 font-medium bg-orange-50 inline-block px-2 py-1 rounded">
            Needs Review
          </p>
        </div>
      </div>
    </div>
  );
};
