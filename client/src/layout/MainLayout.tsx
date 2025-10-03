import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Header from "./Header";
import LogoutPopup from "../components/authComponent/LogoutPopup";

export default function MainLayout() {
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* Sidebar (responsive) */}
      <SideNavBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-black/95 backdrop-blur-sm">
        <Header setLogoutPopup={setLogoutPopup} toggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-6 bg-black/90">
          <Outlet />
        </main>
      </div>

      {logoutPopup && <LogoutPopup setLogoutPopup={setLogoutPopup} />}
    </div>
  );
}
