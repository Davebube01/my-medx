import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";


export default function PHCLayouts() {
  return (
    <div className="flex md:flex-row flex-col font-sans">
      <Sidebar/>

      <main className="flex-1 bg-slate-50 h-screen overflow-y-scroll">
        <Outlet/>
        {/* <Footer/>o */}
      </main>
      
    </div>
  )
}
