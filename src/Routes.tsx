import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./features/auth/SignIn";
import { RoleSelect } from "./features/auth/RoleSelect";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";

// Pharmacy
import { PharmacyDashboard } from "./features/pharmacy/PharmacyDashboard";
import { PharmacyPOS } from "./features/pharmacy/PharmacyPOS";
import { PharmacyInventory } from "./features/pharmacy/PharmacyInventory";

// PHC
import { PHCDashboard } from "./features/phc/PHCDashboard";
import { PHCDispense } from "./features/phc/PHCDispense";
import { PHCInventory } from "./features/phc/PHCInventory";
import { PatientManager } from "./features/phc/PatientManager";

import HomepageDrugSearch from "./features/home/HomepageDrugSearch";

export const AppRoutes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<HomepageDrugSearch />} />
      <Route path="/login" element={<SignIn />} />

      {/* Auth Selection */}
      <Route
        path="/role-select"
        element={
          <ProtectedRoute>
            <RoleSelect />
          </ProtectedRoute>
        }
      />

      {/* Pharmacy Routes */}
      <Route path="/pharmacy">
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="pos"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyPOS />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyInventory />
            </ProtectedRoute>
          }
        />
        {/* Placeholder for Sales History */}
        <Route
          path="sales"
          element={<div className="p-8">Sales History Placeholder</div>}
        />
        <Route
          path="profile"
          element={<div className="p-8">Pharmacy Profile Placeholder</div>}
        />
      </Route>

      {/* PHC Routes */}
      <Route path="/phc">
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dispense"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCDispense />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="patients"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PatientManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={<div className="p-8">Dispense History Placeholder</div>}
        />
        <Route
          path="settings"
          element={<div className="p-8">PHC Settings Placeholder</div>}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRoutes>
  );
};
