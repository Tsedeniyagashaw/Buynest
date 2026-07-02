import { useEffect, useState } from "react";
import API from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <div className="p-10">

      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">      
       
         <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition">
             <p className="text-2xl font-bold mt-2">
            {stats?.users}
          </p>  <h3 className="text-gray-500 text-sm">Users</h3>
     
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition">
             <p className="text-2xl font-bold mt-2">
            {stats?.products}
          </p><h3 className="text-gray-500 text-sm">Products</h3>
       
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-yellow-500 hover:shadow-lg transition">
           <p className="text-2xl font-bold mt-2">
            {stats?.orders}
          </p>  <h3 className="text-gray-500 text-sm">Orders</h3>
       
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-violet-500 hover:shadow-lg transition">
            <p className="text-2xl font-bold mt-2">
            {stats?.sellers}
          </p> <h3 className="text-gray-500 text-sm">Sellers</h3>
       
        </div>
             </div>
             <div className="flex">

        <div className="mt-10 bg-white p-6 rounded-2xl shadow flex-1">
  <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>

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

<div className="mt-10 bg-white p-6 rounded-2xl shadow flex-2">
  <h2 className="text-xl font-semibold mb-4">Platform Breakdown</h2>

  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <BarChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="value" fill="#22C55E" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


      </div>

    {/* Pending Sellers */}
      <div className="mt-6 bg-white p-5 rounded-2xl shadow">
         <p className="text-3xl font-bold mt-2">
          {stats?.pendingSellers}
        </p> <h2 className="text-lg font-semibold text-red-500">
          Pending Sellers
        </h2>
      
      </div>


      

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          View Products
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          View Orders
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          Manage Users
        </button>

        <button className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition">
          Manage Sellers
        </button>

      </div>

    </div>
  );
}

export default AdminHome;