
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
} from "recharts";
import {
    Package,
    ShoppingBag,
    DollarSign,
    Clock,
    TrendingUp,
    Users,
    Eye,
} from "lucide-react";

function SellerDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/seller/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="mt-3 text-sm text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-6 h-6 text-gray-500" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        No data available
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Start selling to see your dashboard insights.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Dashboard
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Overview of your store performance and recent activity.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    <StatCard
                        title="Total Products"
                        value={stats.products}
                        icon={Package}
                    />

                    <StatCard
                        title="Total Orders"
                        value={stats.orders}
                        icon={ShoppingBag}
                    />

                    <StatCard
                        title="Revenue"
                        value={`$${stats.revenue.toLocaleString()}`}
                        icon={DollarSign}
                    />

                    <StatCard
                        title="Pending Orders"
                        value={stats.pendingOrders}
                        icon={Clock}
                    />

                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    {/* Sales Overview */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl">

                        <div className="px-6 py-5 border-b border-gray-200">
                            <h2 className="text-base font-semibold text-gray-900">
                                Sales Overview
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Monthly revenue
                            </p>
                        </div>

                        {stats.monthlySales.length === 0 ? (
                            <div className="h-[320px] flex flex-col items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-gray-300 mb-3" />

                                <p className="text-sm text-gray-500">
                                    No sales data yet
                                </p>
                            </div>
                        ) : (
                            <div className="h-[320px] p-5">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats.monthlySales}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="month"
                                            tick={{
                                                fontSize: 12,
                                                fill: "#6b7280",
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            tick={{
                                                fontSize: 12,
                                                fill: "#6b7280",
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) =>
                                                `$${value}`
                                            }
                                        />

                                        <Tooltip
                                            formatter={(value) => [
                                                `$${value}`,
                                                "Revenue",
                                            ]}
                                            contentStyle={{
                                                backgroundColor: "#ffffff",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.08)",
                                            }}
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#111827"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{
                                                r: 4,
                                            }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Order Status */}
                    <div className="bg-white border border-gray-200 rounded-xl">

                        <div className="px-6 py-5 border-b border-gray-200">
                            <h2 className="text-base font-semibold text-gray-900">
                                Order Status
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Current order distribution
                            </p>
                        </div>

                        <div className="p-6 space-y-5">

                            <StatusItem
                                label="Pending"
                                value={stats.orderStatus.pending}
                                color="bg-amber-500"
                                total={stats.orders}
                            />

                            <StatusItem
                                label="Shipped"
                                value={stats.orderStatus.shipped}
                                color="bg-gray-700"
                                total={stats.orders}
                            />

                            <StatusItem
                                label="Delivered"
                                value={stats.orderStatus.delivered}
                                color="bg-emerald-500"
                                total={stats.orders}
                            />

                            {stats.orders > 0 && (
                                <div className="pt-5 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Completion rate
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {(
                                                (stats.orderStatus.delivered /
                                                    stats.orders) *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </span>
                                    </div>

                                    <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                                        <div
                                            className="h-full bg-gray-900 rounded-full"
                                            style={{
                                                width: `${
                                                    (stats.orderStatus
                                                        .delivered /
                                                        stats.orders) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl">

                        <SectionHeader
                            title="Recent Orders"
                            description="Latest customer orders"
                        />

                        {stats.recentOrders.length === 0 ? (
                            <EmptyState
                                icon={ShoppingBag}
                                text="No orders yet"
                            />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">

                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Customer
                                            </th>

                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Product
                                            </th>

                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Amount
                                            </th>

                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {stats.recentOrders.map((order) => (
                                            <tr
                                                key={order._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >

                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {order.user?.firstName}{" "}
                                                            {order.user?.lastName}
                                                        </p>

                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            #{order._id.slice(-8)}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 max-w-[180px] truncate">
                                                        {order.orderItems[0]
                                                            ?.product?.name ||
                                                            "N/A"}

                                                        {order.orderItems.length >
                                                            1 && (
                                                            <span className="text-xs text-gray-400 ml-1">
                                                                +
                                                                {order.orderItems
                                                                    .length -
                                                                    1}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        $
                                                        {order.totalPrice.toLocaleString()}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <OrderStatus
                                                        status={order.status}
                                                    />
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Recent Products */}
                    <div className="bg-white border border-gray-200 rounded-xl">

                        <SectionHeader
                            title="Recent Products"
                            description="Latest additions"
                        />

                        {stats.recentProducts.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                text="No products yet"
                            />
                        ) : (
                            <div className="p-4">

                                {stats.recentProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center gap-3 px-2 py-3 border-b last:border-b-0 border-gray-100"
                                    >

                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">

                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Package className="w-5 h-5 text-gray-400" />
                                            )}

                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {product.name}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-0.5">
                                                $
                                                {product.price.toLocaleString()}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View product"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="mt-6 bg-white border border-gray-200 rounded-xl px-6 py-4">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">

                            <SummaryItem
                                label="Delivered"
                                value={stats.orderStatus.delivered}
                                color="bg-emerald-500"
                            />

                            <SummaryItem
                                label="Pending"
                                value={stats.orderStatus.pending}
                                color="bg-amber-500"
                            />

                            <SummaryItem
                                label="Shipped"
                                value={stats.orderStatus.shipped}
                                color="bg-gray-700"
                            />

                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>
                                {stats.products} total products
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}


/* =========================
   Stat Card
========================= */

function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <p className="text-2xl font-semibold text-gray-900 mt-2">
                        {value}
                    </p>
                </div>

                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-700" />
                </div>

            </div>
        </div>
    );
}


/* =========================
   Section Header
========================= */

function SectionHeader({ title, description }) {
    return (
        <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
                {title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                {description}
            </p>
        </div>
    );
}


/* =========================
   Status Item
========================= */

function StatusItem({ label, value, color, total }) {
    const percentage =
        total > 0 ? Math.min((value / total) * 100, 100) : 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${color}`}
                    />

                    <span className="text-sm text-gray-600">
                        {label}
                    </span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                    {value}
                </span>

            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}


/* =========================
   Order Status
========================= */

function OrderStatus({ status }) {
    const styles = {
        pending: "bg-amber-50 text-amber-700",
        shipped: "bg-gray-100 text-gray-700",
        delivered: "bg-emerald-50 text-emerald-700",
    };

    const label =
        status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                styles[status] || "bg-gray-100 text-gray-600"
            }`}
        >
            {label}
        </span>
    );
}


/* =========================
   Empty State
========================= */

function EmptyState({ icon: Icon, text }) {
    return (
        <div className="flex flex-col items-center justify-center py-14">
            <Icon className="w-8 h-8 text-gray-300 mb-3" />

            <p className="text-sm text-gray-500">
                {text}
            </p>
        </div>
    );
}


/* =========================
   Summary Item
========================= */

function SummaryItem({ label, value, color }) {
    return (
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${color}`} />

            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span className="text-sm font-semibold text-gray-900">
                {value}
            </span>
        </div>
    );
}

export default SellerDashboard;

