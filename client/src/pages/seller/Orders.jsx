import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const { search } = useSearch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders/seller/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

 const updateStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.put(
      `/orders/seller/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? res.data : o
      )
    );

  } catch (err) {
    console.log(err.response?.data);
  }
};

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      paid: <ShoppingBag className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
    };
    return icons[status] || <Package className="w-4 h-4" />;
  };

  const getStatusColors = (status) => {
    const colors = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      paid: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusBadgeStyles = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800 ring-amber-600/20",
      paid: "bg-blue-100 text-blue-800 ring-blue-600/20",
      shipped: "bg-purple-100 text-purple-800 ring-purple-600/20",
      delivered: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
    };
    return styles[status] || "bg-gray-100 text-gray-800 ring-gray-600/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-500">
            When customers order your products, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const buyerName = `${order.user.firstName} ${order.user.lastName}`.toLowerCase();
    const productNames = order.orderItems
      .map(item => item.product.name)
      .join(" ")
      .toLowerCase();
    const status = order.status.toLowerCase();

    return (
      buyerName.includes(search.toLowerCase()) ||
      productNames.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "highest") {
      const totalA = a.orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const totalB = b.orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      return totalB - totalA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Orders
              </h1>
              <p className="text-gray-500 mt-1">
                Manage and track all your customer orders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {filteredOrders.length} Orders
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by customer, product, or status..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-shadow"
                value={search}
                onChange={(e) => {/* Handle search change */}}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {sortedOrders.map((order) => {
            const totalAmount = order.orderItems
              .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
              .toFixed(2);

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Order Header */}
                <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-semibold text-gray-900">
                          {order.user.firstName} {order.user.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                          ring-1 ring-inset ${getStatusBadgeStyles(order.status)}
                        `}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      {/* Status Update Dropdown */}
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`
                            appearance-none px-4 py-2 pr-8 rounded-lg text-sm font-medium
                            border-2 outline-none cursor-pointer transition-all
                            ${getStatusColors(order.status)}
                            hover:scale-[1.02] focus:ring-2 focus:ring-violet-500 focus:border-transparent
                          `}
                        >
                          <option value="pending">Set Pending</option>
                          <option value="paid">Set Paid</option>
                          <option value="shipped">Set Shipped</option>
                          <option value="delivered">Set Delivered</option>
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ArrowUpDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="divide-y divide-gray-100">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-gray-50/50 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-sm text-gray-500">
                              ${item.product.price.toFixed(2)} each
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Order #{order._id.slice(-8)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="text-xl font-bold text-violet-700">
                      ${totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-sm text-gray-600">
                  {orders.filter(o => o.status === 'delivered').length} Delivered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-sm text-gray-600">
                  {orders.filter(o => o.status === 'pending').length} Pending
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerOrders;