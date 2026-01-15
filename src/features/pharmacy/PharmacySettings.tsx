import { PageLayout } from "../../components/shared/PageLayout";
import { User, MapPin, Clock, Phone, Shield, LogOut } from "lucide-react";

export const PharmacySettings = () => {
  return (
    <PageLayout title="Settings & Profile">
      <div className="max-w-4xl space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-32 bg-linear-to-r from-blue-600 to-blue-400 relative">
            <div className="absolute -bottom-10 left-8 p-1 bg-white rounded-full">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border-4 border-white">
                <User className="w-10 h-10" />
              </div>
            </div>
          </div>
          <div className="mt-12 px-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-900">Peace Pharmacy</h2>
            <p className="text-gray-500">Verified Partner • Since 2024</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Address
                  </label>
                  <p className="text-gray-900">
                    Suite 4, Plaza Block G, Wuse II, Abuja
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Contact Phone
                  </label>
                  <p className="text-gray-900">+234 801 234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Operating Hours
                  </label>
                  <p className="text-gray-900">Mon - Sat: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    License & Verification
                  </label>
                  <p className="text-green-600 font-medium flex items-center gap-1">
                    Verified License
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Manage Staff
              </button>
            </div>
          </div>
        </div>

        {/* Other Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Application Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Notifications</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Dark Mode</span>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Actions
            </h3>
            <button className="w-full py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
