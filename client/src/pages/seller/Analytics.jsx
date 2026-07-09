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
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No data available</h2>
          <p className="text-gray-500">
            Start selling to see your analytics dashboard.
          </p>
        </div>
      </div>
    );
  }

  const pieData = Object.entries(data.statusCount).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    })
  );

  const COLORS = {
    pending: "#facc15",
    paid: "#3b82f6",
    shipped: "#a855f7",
    delivered: "#22c55e"
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    paid: <ShoppingBag className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-emerald-100 text-emerald-700"
  };

  // Calculate additional metrics
  const averageOrderValue = data.totalOrders > 0 
    ? data.totalRevenue / data.totalOrders 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Track your sales performance and order insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {data.totalOrders > 0 ? "Active" : "No sales yet"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  ${data.totalRevenue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Lifetime sales
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {data.totalOrders}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  All time orders
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </div>

          {/* Average Order Value Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Order Value</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  ${averageOrderValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Per order average
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Status Distribution Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Statuses</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {Object.keys(data.statusCount).length}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Different order statuses
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Order Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Status Distribution
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Breakdown of all orders by status
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Total: {data.totalOrders}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    paddingAngle={2}
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.name.toLowerCase()] || "#94a3b8"}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} orders`, 'Count']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '0.75rem'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Status Legend Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-4 pt-4 border-t border-gray-100">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[item.name.toLowerCase()] || "#94a3b8" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart - Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Top Performing Products
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Most ordered products by quantity
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {data.topProducts.length} products
                </span>
              </div>
            </div>

            {data.topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Package className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No products sold yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart 
                  data={data.topProducts}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    label={{ 
                      value: 'Units Sold', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: '#6b7280', fontSize: 12 }
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} units`, 'Sold']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '0.75rem'
                    }}
                  />
                  <Bar 
                    dataKey="qty" 
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {data.topProducts.map((entry, index) => (
                      <Cell 
                        key={`bar-${index}`}
                        fill={`hsl(239, 84%, ${65 - (index * 5)}%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Additional Insights */}
        {data.totalOrders > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pieData.map((item) => (
              <div 
                key={item.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${statusColors[item.name.toLowerCase()] || 'bg-gray-100 text-gray-700'} flex items-center justify-center`}>
                    {statusIcons[item.name.toLowerCase()] || <Package className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.value} orders ({((item.value / data.totalOrders) * 100).toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerAnalytics;