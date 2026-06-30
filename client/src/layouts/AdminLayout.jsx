import Sidebar from "../pages/admin/Sidebar";
import Topbar from "../pages/admin/Topbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;