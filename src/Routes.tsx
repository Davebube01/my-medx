import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./features/auth/SignIn";
import { RoleSelect } from "./features/auth/RoleSelect";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";

// Pharmacy
import { PharmacyDashboard } from "./features/pharmacy/PharmacyDashboard";
import { PharmacyPOS } from "./features/pharmacy/PharmacyPOS";
import { PharmacyInventory } from "./features/pharmacy/PharmacyInventory";
import { PharmacyHistory } from "./features/pharmacy/PharmacyHistory";
import { PharmacySettings } from "./features/pharmacy/PharmacySettings";
import { PharmacyDrugs } from "./features/pharmacy/PharmacyDrugs";

// PHC
import { PHCDashboard } from "./features/phc/PHCDashboard";
import { PHCDispense } from "./features/phc/PHCDispense";
import { PHCInventory } from "./features/phc/PHCInventory";
import { PatientManager } from "./features/phc/PatientManager";
import { PHCHistory } from "./features/phc/PHCHistory";
import { PHCSettings } from "./features/phc/PHCSettings";
import { PHCDrugs } from "./features/phc/PHCDrugs";

// Oversight
import { OversightLayout } from "./features/phc/OversightLayout";
import { OversightOverview } from "./features/phc/OversightOverview";
import { OversightInventory } from "./features/phc/OversightInventory";
import { OversightDispensing } from "./features/phc/OversightDispensing";
import { OversightQuality } from "./features/phc/OversightQuality";
import { OversightPHCManagement } from "./features/phc/OversightPHCManagement";
import { OversightPHCDetails } from "./features/phc/OversightPHCDetails";

import HomepageDrugSearch from "./features/home/HomepageDrugSearch";
import { LaunchPage } from "./features/home/LaunchPage";
import { PHCLandingPage } from "./features/phc/PHCLandingPage";

export const AppRoutes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<LaunchPage />} />
      <Route path="/pharmacies" element={<HomepageDrugSearch />} />
      <Route path="/phc" element={<PHCLandingPage />} />
      <Route path="/login" element={<SignIn />} />

      {/* Auth Selection */}
      <Route path="/role-select" element={<RoleSelect />} />

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
        <Route
          path="sales"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacySettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="drugs"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyDrugs />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* PHC Routes */}
      <Route path="/phc">
        {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
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
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="drugs"
          element={
            <ProtectedRoute allowedRoles={["phc"]}>
              <PHCDrugs />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Oversight Routes */}
      <Route
        path="/oversight"
        element={
          <ProtectedRoute allowedRoles={["oversight"]}>
            <OversightLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OversightOverview />} />
        <Route path="phc/:id" element={<OversightPHCDetails />} />
        <Route path="inventory" element={<OversightInventory />} />
        <Route path="dispensing" element={<OversightDispensing />} />
        <Route path="quality" element={<OversightQuality />} />
        <Route path="phc-management" element={<OversightPHCManagement />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRoutes>
  );
};
