import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminDashboard/Sidebar";
import Navbar from "../components/AdminDashboard/Navbar";
import { useState } from "react";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 min-w-0">

        <Navbar setIsOpen={setIsOpen} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;