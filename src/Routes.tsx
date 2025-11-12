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

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepageDrugSearch />} />
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
        </Route>

        {/* Pharmacy */}
        <Route path="/pharmacy" element={<PharmacyLayout />}>
          <Route path="dashboard" element={<PharmacyDashboard/>}/>
          <Route path="inventory-management" element={<Inventory />}/>
          <Route path="pharmacy-profile" element={<PharmacyProfile/>}/>
        </Route>
        

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
