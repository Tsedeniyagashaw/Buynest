import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 border-r-5 border-indigo-900  text-violet-800 h-full py-5">

      <h1 className="text-2xl font-bold mb-8 text-center">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-3 ">

        <Link className="block w-full px-5 py-4 hover:bg-gray-200" to="/admin">
          Dashboard
        </Link>

        <Link className="block w-full px-5 py-4 hover:bg-gray-100" to="/admin/users">
          Users
        </Link>

        <Link className="block w-full px-5 py-4 hover:bg-gray-100" to="/admin/orders">
          Orders
        </Link>

        <Link className="block w-full px-5 py-4 hover:bg-gray-100" to="/admin/products">
          Products
        </Link>

        <Link className="block w-full px-5 py-4 hover:bg-gray-100" to="/admin/sellers">
          Sellers
        </Link>

         <Link className="block w-full px-5 py-4 hover:bg-gray-100" to="/admin/feedback">
          Users Feedback
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;