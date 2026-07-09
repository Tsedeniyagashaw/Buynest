import { useEffect, useState } from "react";
import API from "../../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import {
    Package,
    ShoppingBag,
    DollarSign,
    Clock,
    TrendingUp,
    Users,
    ArrowUp,
    ArrowDown,
    MoreVertical,
    Eye
} from "lucide-react";

function SellerDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get(
                    "/seller/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setStats(res.data);
            } catch (error) {
                console.log(error.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-10 h-10 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No data available</h2>
                    <p className="text-gray-500">
                        Start selling to see your dashboard insights.
                    </p>
                </div>
            </div>
        );
    }

    // Calculate trends (mock data - you can replace with actual trend data)
    const calculateTrend = (current, previous) => {
        if (!previous || previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };

    // Mock previous values - replace with actual data from API
    const previousStats = {
        products: stats.products - 2,
        orders: stats.orders - 5,
        revenue: stats.revenue - 150,
        pendingOrders: stats.pendingOrders + 1
    };

    const StatCard = ({ title, value, icon: Icon, color, trend }) => {
        const isPositive = trend >= 0;
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {title}
                        </p>
                        <p className={`text-2xl md:text-3xl font-bold mt-1 ${color}`}>
                            {value}
                        </p>
                        {trend !== undefined && (
                            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {Math.abs(trend).toFixed(1)}%
                                <span className="text-gray-400 font-normal">vs last month</span>
                            </div>
                        )}
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                        style={{ backgroundColor: `${color.replace('text-', '')}15` || '#f3f4f6' }}
                    >
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                
                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Welcome back! 👋
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Here's what's happening with your store today
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    Live
                                </span>
                            </div>
                            <button className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Products"
                        value={stats.products}
                        icon={Package}
                        color="text-violet-600"
                        trend={calculateTrend(stats.products, previousStats.products)}
                    />
                    <StatCard
                        title="Total Orders"
                        value={stats.orders}
                        icon={ShoppingBag}
                        color="text-blue-600"
                        trend={calculateTrend(stats.orders, previousStats.orders)}
                    />
                    <StatCard
                        title="Revenue"
                        value={`$${stats.revenue.toLocaleString()}`}
                        icon={DollarSign}
                        color="text-green-600"
                        trend={calculateTrend(stats.revenue, previousStats.revenue)}
                    />
                    <StatCard
                        title="Pending Orders"
                        value={stats.pendingOrders}
                        icon={Clock}
                        color="text-amber-500"
                        trend={calculateTrend(stats.pendingOrders, previousStats.pendingOrders)}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Sales Chart - Takes 2/3 of the space */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Sales Overview
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Monthly revenue trend
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors">
                                    This Year
                                </button>
                            </div>
                        </div>

                        {stats.monthlySales.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[300px]">
                                <TrendingUp className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 text-sm">No sales data yet</p>
                            </div>
                        ) : (
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.monthlySales}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis 
                                            dataKey="month" 
                                            tick={{ fontSize: 12, fill: '#6b7280' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            tick={{ fontSize: 12, fill: '#6b7280' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            tickLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip 
                                            formatter={(value) => [`$${value}`, 'Revenue']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '0.75rem',
                                                padding: '0.75rem'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#7c3aed"
                                            strokeWidth={3}
                                            fill="url(#colorSales)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Order Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Order Status
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Current distribution
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <StatusItem
                                label="Pending"
                                value={stats.orderStatus.pending}
                                color="bg-amber-400"
                                total={stats.orders}
                            />
                            <StatusItem
                                label="Shipped"
                                value={stats.orderStatus.shipped}
                                color="bg-purple-500"
                                total={stats.orders}
                            />
                            <StatusItem
                                label="Delivered"
                                value={stats.orderStatus.delivered}
                                color="bg-emerald-500"
                                total={stats.orders}
                            />
                        </div>

                        {stats.orders > 0 && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Completion Rate</span>
                                    <span className="font-semibold text-gray-900">
                                        {((stats.orderStatus.delivered / stats.orders) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div 
                                        className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
                                        style={{ width: `${(stats.orderStatus.delivered / stats.orders) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders & Products Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Orders
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Latest customer orders
                                </p>
                            </div>
                            <button className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                                View All
                            </button>
                        </div>

                        {stats.recentOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 text-sm">No orders yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 rounded-lg">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {stats.recentOrders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {order.user.firstName} {order.user.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            #{order._id.slice(-8)}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {order.orderItems[0]?.product?.name || 'N/A'}
                                                    {order.orderItems.length > 1 && 
                                                        <span className="text-gray-400 text-xs ml-1">
                                                            +{order.orderItems.length - 1} more
                                                        </span>
                                                    }
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-gray-900">
                                                    ${order.totalPrice.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`
                                                        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                                        ${order.status === "pending" ? "bg-amber-100 text-amber-700" :
                                                          order.status === "shipped" ? "bg-purple-100 text-purple-700" :
                                                          "bg-emerald-100 text-emerald-700"}
                                                    `}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Recent Products */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Products
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Latest additions
                                </p>
                            </div>
                            <button className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                                View All
                            </button>
                        </div>

                        {stats.recentProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Package className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 text-sm">No products yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stats.recentProducts.map(product => (
                                    <div key={product._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Package className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-sm text-green-600 font-semibold mt-0.5">
                                                ${product.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-200 rounded-lg">
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-sm text-gray-600">
                                {stats.orderStatus.delivered} Delivered
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                            <span className="text-sm text-gray-600">
                                {stats.orderStatus.pending} Pending
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-sm text-gray-600">
                                {stats.orderStatus.shipped} Shipped
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                            {stats.products} Total Products
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Components
function StatusItem({ label, value, color, total }) {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                    className={`${color} rounded-full h-1.5 transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default SellerDashboard;