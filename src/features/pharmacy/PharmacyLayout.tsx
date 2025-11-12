import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function PharmacyLayout() {
  return (
    <div className="flex md:flex-row flex-col font-sans">
      <Sidebar/>

      <main className="flex-1 bg-slate-50 h-screen overflow-y-scroll">
        <Outlet/>
        <Footer/>
      </main>
      
    </div>
  )
}
