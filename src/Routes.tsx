import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomepageDrugSearch from "./features/home/HomepageDrugSearch";
import NotFound from "./components/NotFound";
import Login from "./features/auth/Login";
import AuthLayout from "./features/auth/AuthLayout";

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
        

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
