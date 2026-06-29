import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-violet-900 mb-6">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Users</h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.users}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Products</h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.products}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-yellow-500 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Orders</h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.orders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-violet-500 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">Sellers</h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.sellers}
          </p>
        </div>

      </div>

      {/* Pending Sellers */}
      <div className="mt-6 bg-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-semibold text-red-500">
          Pending Sellers
        </h2>
        <p className="text-3xl font-bold mt-2">
          {stats?.pendingSellers}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          Add Product
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          View Orders
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          Manage Users
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          Sellers
        </button>

      </div>

    </div>
  );
}

export default AdminHome;