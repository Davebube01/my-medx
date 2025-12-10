import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomepageDrugSearch from "./features/home/HomepageDrugSearch";
import NotFound from "./components/NotFound";
import Login from "./features/auth/Login";
import AuthLayout from "./features/auth/AuthLayout";
import PharmacyLayout from "./features/pharmacy/PharmacyLayout";
import PharmacyDashboard from "./features/pharmacy/dashboard/PharmacyDashboard";
import Inventory from "./features/pharmacy/inventory/Inventory";
import PharmacyProfile from "./features/pharmacy/pharmacyProfile/PharmacyProfile";
import React, { Suspense } from "react";
import { PhcProvider } from "./features/phc/phcContext";
import PHCLayouts from "./features/phc/PHCLayouts";
import Register from "./features/auth/Register";

const PhcHome = React.lazy(() => import("./features/phc/components/PhcHome"));
const PatientList = React.lazy(() => import("./features/phc/components/PatientList"));
const PatientForm = React.lazy(() => import("./features/phc/components/PatientForm"));
const PatientProfile = React.lazy(() => import("./features/phc/components/PatientProfile"));
const CreateDispense = React.lazy(() => import("./features/phc/components/CreateDispense"));
const InventoryList = React.lazy(() => import("./features/phc/components/InventoryList"));
const MasterList = React.lazy(() => import("./features/phc/components/MasterList"));
const DispenseHistory = React.lazy(() => import("./features/phc/components/DispenseHistory"));
const Settings = React.lazy(() => import("./features/phc/components/Settings"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepageDrugSearch />} />
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>        </Route>

        {/* Pharmacy */}
        <Route path="/pharmacy" element={<PharmacyLayout />}>
          <Route path="dashboard" element={<PharmacyDashboard/>}/>
          <Route path="inventory-management" element={<Inventory />}/>
          <Route path="pharmacy-profile" element={<PharmacyProfile/>}/>
        </Route>

        {/* PHC module */}
        <Route path="/phc" element={<PHCLayouts/>}>
          <Route path="dashboard" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><PhcHome/></Suspense></PhcProvider>} />
          <Route path="patients" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><PatientList/></Suspense></PhcProvider>} />
          <Route path="patients/new" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><PatientForm/></Suspense></PhcProvider>} />
          <Route path="patients/:phoneOrId" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><PatientProfile/></Suspense></PhcProvider>} />
          <Route path="dispense" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><CreateDispense/></Suspense></PhcProvider>} />
          <Route path="inventory" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><InventoryList/></Suspense></PhcProvider>} />
          <Route path="masterlist" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><MasterList/></Suspense></PhcProvider>} />
          <Route path="dispense/history" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><DispenseHistory/></Suspense></PhcProvider>} />
          <Route path="settings" element={<PhcProvider><Suspense fallback={<div>Loading...</div>}><Settings/></Suspense></PhcProvider>} />
        </Route>
        

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
