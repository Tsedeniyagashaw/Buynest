import Sidebar from "../pages/admin/Sidebar";
import Topbar from "../pages/admin/Topbar";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";

function AdminLayout() {
  return (
    <SearchProvider>
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
    </SearchProvider>
  );
}

export default AdminLayout;