import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-violet-900 text-white h-full p-5">

      <h1 className="text-2xl font-bold mb-8">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-3">

        <Link className="hover:bg-violet-700 p-2 rounded" to="/admin">
          Dashboard
        </Link>

        <Link className="hover:bg-violet-700 p-2 rounded" to="/admin/users">
          Users
        </Link>

        <Link className="hover:bg-violet-700 p-2 rounded" to="/admin/orders">
          Orders
        </Link>

        <Link className="hover:bg-violet-700 p-2 rounded" to="/admin/products">
          Products
        </Link>

        <Link className="hover:bg-violet-700 p-2 rounded" to="/admin/sellers">
          Sellers
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;