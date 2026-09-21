import { useEffect, useState } from "react";
import API from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar, } from "recharts";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaUserShield, FaClock, } from "react-icons/fa";
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

  const COLORS = ["#111827", "#4B5563", "#9CA3AF", "#D1D5DB"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Here is what is happening in your platform today.
          </p>
        </div>

        <button
          onClick={() => setShowAddAdmin(true)}
          className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200"
        >
          <span className="text-lg leading-none">+</span>
          Add Admin
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Users
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {stats?.users}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FaUsers className="text-gray-700 text-lg" />
            </div>
          </div>

          <div className="mt-4 h-1 w-10 bg-gray-900 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Products
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {stats?.products}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FaBoxOpen className="text-gray-700 text-lg" />
            </div>
          </div>

          <div className="mt-4 h-1 w-10 bg-gray-700 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Orders
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {stats?.orders}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FaShoppingCart className="text-gray-700 text-lg" />
            </div>
          </div>

          <div className="mt-4 h-1 w-10 bg-gray-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Sellers
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {stats?.sellers}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FaUserShield className="text-gray-700 text-lg" />
            </div>
          </div>

          <div className="mt-4 h-1 w-12 bg-gray-400 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {stats?.pendingSellers}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <FaClock className="text-red-500 text-lg" />
            </div>
          </div>

          <div className="mt-4 h-1 w-10 bg-red-500 rounded-full"></div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">

        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Website Visits
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Overview of activity across the platform
            </p>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0, }} >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12, }} axisLine={{ stroke: "#E5E7EB", }} tickLine={false} />

                <YAxis tick={{ fill: "#6B7280", fontSize: 12, }} axisLine={false} tickLine={false} />

                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", }} />
                <Bar dataKey="value" fill="#111827" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Visits
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Distribution across platform sections
            </p>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} innerRadius={55} paddingAngle={2} label >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {chartData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-xs text-gray-600">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <AddAdminModal
        open={showAddAdmin}
        onClose={() => setShowAddAdmin(false)}
      />

    </div>
  );
}

export default AdminHome;
