import { NavLink } from "react-router-dom";

function SellerSidebar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-violet-600 text-white p-3 rounded-lg block"
      : "text-gray-600 hover:bg-gray-200 p-3 rounded-lg block";

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">

      <h2 className="text-2xl font-bold text-violet-600 mb-6">
        Seller Panel
      </h2>

      <nav className="flex flex-col gap-2">

        <NavLink to="/seller" end className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/seller/products" className={linkClass}>
          📦 Products
        </NavLink>

        <NavLink to="/seller/orders" className={linkClass}>
          🛒 Orders
        </NavLink>

        <NavLink to="/seller/analytics" className={linkClass}>
          📈 Analytics
        </NavLink>

      </nav>

    </div>
  );
}

export default SellerSidebar;