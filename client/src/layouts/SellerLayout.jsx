import { Outlet } from "react-router-dom";
import SellerSidebar from "../pages/seller/SellerSidebar";
import SellerTopbar from "../pages/seller/SellerTopbar";
import { SearchProvider } from "../context/SearchContext";


function SellerLayout() {
  return (
    <SearchProvider >
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerTopbar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
   </SearchProvider>
  );
}

export default SellerLayout;