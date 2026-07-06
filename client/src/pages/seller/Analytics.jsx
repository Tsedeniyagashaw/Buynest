import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SellerAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/seller/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    };

    fetchAnalytics();
  }, []);

  if (!data) {
    return <div className="p-6">Loading analytics...</div>;
  }

  const pieData = Object.entries(data.statusCount).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  const COLORS = ["#facc15", "#3b82f6", "#a855f7", "#22c55e"];

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">Seller Analytics</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">
            ${data.totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">
            {data.totalOrders}
          </h2>
        </div>

      </div>

      {/* PIE CHART */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Order Status
        </h2>

        <PieChart width={300} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Top Products
        </h2>

        <BarChart width={500} height={300} data={data.topProducts}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="qty" fill="#6366f1" />
        </BarChart>
      </div>

    </div>
  );
}

export default SellerAnalytics;