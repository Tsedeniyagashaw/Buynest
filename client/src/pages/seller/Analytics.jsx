import { useEffect, useState } from "react";
import API from "../../services/api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, } from "recharts";
import { TrendingUp, ShoppingBag, Package, DollarSign, Clock, CheckCircle, Truck, AlertCircle, } from "lucide-react";

function SellerAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/orders/seller/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            No data available
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Start selling to see your analytics dashboard.
          </p>
        </div>
      </div>
    );
  }

  const pieData = Object.entries(data.statusCount || {}).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    })
  );

  
  const STATUS_COLORS = {
    pending: "#f59e0b",
    paid: "#3b82f6",
    shipped: "#6b7280",
    delivered: "#10b981",
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    paid: <ShoppingBag className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
  };

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700",
    paid: "bg-blue-50 text-blue-700",
    shipped: "bg-gray-100 text-gray-600",
    delivered: "bg-emerald-50 text-emerald-700",
  };

  const averageOrderValue =
    data.totalOrders > 0
      ? data.totalRevenue / data.totalOrders
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Analytics
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Track your sales performance and order activity.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 bg-white border border-gray-200 rounded-lg">
              <TrendingUp
                className={`w-4 h-4 ${
                  data.totalOrders > 0
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              />

              <span className="text-sm font-medium text-gray-700">
                {data.totalOrders > 0
                  ? "Active"
                  : "No sales yet"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Total Revenue
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  ${Number(data.totalRevenue).toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Lifetime sales
                </p>
              </div>

              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {data.totalOrders}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  All time orders
                </p>
              </div>

              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Average Order Value
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  ${averageOrderValue.toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Average per order
                </p>
              </div>

              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order Statuses
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {Object.keys(data.statusCount || {}).length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Active order statuses
                </p>
              </div>

              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Order Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Breakdown of your orders by status.
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {data.totalOrders} total
              </span>
            </div>

            {pieData.length === 0 ? (
              <div className="h-[320px] flex flex-col items-center justify-center">
                <Package className="w-10 h-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No order data yet
                </p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={90} innerRadius={58} paddingAngle={2} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` } labelLine={false} >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ STATUS_COLORS[ entry.name.toLowerCase() ] || "#9ca3af" } />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [ `${value} orders`, "Count", ]}
                      contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", }}
                    />

                    <Legend verticalAlign="bottom" height={30} iconType="circle" iconSize={7} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 pt-4 border-t border-gray-100">
                  {pieData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 min-w-0"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: STATUS_COLORS[ item.name.toLowerCase() ] || "#9ca3af", }}
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Top Products
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your most ordered products by quantity.
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {data.topProducts?.length || 0} products
              </span>
            </div>

            {!data.topProducts ||
            data.topProducts.length === 0 ? (
              <div className="h-[320px] flex flex-col items-center justify-center">
                <Package className="w-10 h-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No products sold yet
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data.topProducts} margin={{ top: 10, right: 10, left: 0, bottom: 20, }} >
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280", }}
                    axisLine={{ stroke: "#e5e7eb", }} tickLine={false} interval={0} angle={-35} textAnchor="end" height={60} />

                  <YAxis tick={{ fontSize: 11, fill: "#6b7280", }} axisLine={false} tickLine={false} allowDecimals={false} />

                  <Tooltip formatter={(value) => [ `${value} units`, "Sold", ]} contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", }} />

                  <Bar dataKey="qty" fill="#374151" radius={[4, 4, 0, 0]} barSize={34} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {data.totalOrders > 0 && pieData.length > 0 && (
          <div className="mt-6">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Order Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current distribution of your orders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pieData.map((item) => {
                const statusKey = item.name.toLowerCase();
                const percentage =
                  (item.value / data.totalOrders) * 100;

                return (
                  <div
                    key={item.name}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          statusStyles[statusKey] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {statusIcons[statusKey] || (
                          <Package className="w-4 h-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {item.value} orders ·{" "}
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerAnalytics;
