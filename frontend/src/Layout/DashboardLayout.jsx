import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import SideBar from "../components/Dashboard/SideBar";

function DashboardLayout() {
const[isOpen,setIsOpen]=useState(false)
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar  setIsOpen={setIsOpen}/>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;