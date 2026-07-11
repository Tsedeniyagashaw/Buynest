import { useEffect, useState } from "react";
import API from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,  XAxis, YAxis,CartesianGrid, BarChart, Bar } from "recharts";
import {  FaUsers,  FaBoxOpen,  FaShoppingCart,  FaUserShield,  FaClock,} from "react-icons/fa";
import AddAdminModal from "./AddAdmin";


function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const chartData = stats
  ? [
      { name: "Users", value: stats.users },
      { name: "Products", value: stats.products },
      { name: "Orders", value: stats.orders },
      { name: "Sellers", value: stats.sellers },
    ]
  : [];
  const graphData = stats
  ? [
      { name: "Users", value: stats.users },
      { name: "Products", value: stats.products },
      { name: "Orders", value: stats.orders },
      { name: "Sellers", value: stats.sellers },
    ]
  : [];

  const COLORS = ["#6366F1", "#22C55E", "#FACC15", "#A855F7"];



  useEffect(() => {
    const fetchStats = async () => {
      try {
         const token = localStorage.getItem("token");
        const res = await API.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
  <div className="px-4  min-h-screen">

  <div className="mb-8">
    <p className="text-sm text-gray-500 mt-1">
      Here is what is happening in your platform today
    </p>
  </div>
  <button
  onClick={() => setShowAddAdmin(true)}
  className="bg-violet-600 text-white px-4 py-2 rounded-lg"
>
  + Add Admin
</button>

<div className="grid grid-cols-1 md:grid-cols-5 gap-5">

  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Users</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">
          {stats?.users}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-blue-200/50">
        <FaUsers className="text-blue-600 text-3xl" />
      </div>
    </div>
    <div className="mt-4 h-1 w-16 bg-blue-400 rounded-full"></div>
  </div>

  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Products</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">
          {stats?.products}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-purple-200/50">
        <FaBoxOpen className="text-purple-600 text-3xl" />
      </div>
    </div>
    <div className="mt-4 h-1 w-16 bg-purple-400 rounded-full"></div>
  </div>

  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-yellow-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Orders</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">
          {stats?.orders}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-yellow-200/50">
        <FaShoppingCart className="text-yellow-600 text-3xl" />
      </div>
    </div>
    <div className="mt-4 h-1 w-16 bg-yellow-400 rounded-full"></div>
  </div>

  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Sellers</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">
          {stats?.sellers}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-pink-200/50">
        <FaUserShield className="text-pink-600 text-3xl" />
      </div>
    </div>
    <div className="mt-4 h-1 w-16 bg-pink-400 rounded-full"></div>
  </div>

  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-red-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Pending</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">
          {stats?.pendingSellers}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-red-200/50">
        <FaClock className="text-red-600 text-3xl" />
      </div>
    </div>
    <div className="mt-4 h-1 w-16 bg-red-400 rounded-full"></div>
  </div>

</div>


  <div className="flex gap-6 mt-8">
    <div className="flex-2 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Website Visits</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-white flex-1 p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Current Visits</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>


  <AddAdminModal
  open={showAddAdmin}
  onClose={() => setShowAddAdmin(false)}
/>


  {/* Quick Actions */}
 {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

  <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition">
    <FaEye />
    View Products
  </button>

  <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition">
    <FaClipboardList />
    View Orders
  </button>

  <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition">
    <FaUsers />
    Manage Users
  </button>

  <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition">
    <FaUserShield />
    Manage Sellers
  </button>

</div> */}

</div>
  );
}

export default AdminHome;