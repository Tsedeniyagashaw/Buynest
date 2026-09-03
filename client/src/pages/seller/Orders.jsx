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
  ArrowUpDown,
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
        prev.map((order) =>
          order._id === orderId ? res.data : order
        )
      );
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-3.5 h-3.5" />,
      paid: <ShoppingBag className="w-3.5 h-3.5" />,
      shipped: <Truck className="w-3.5 h-3.5" />,
      delivered: <CheckCircle className="w-3.5 h-3.5" />,
    };

    return icons[status] || <Package className="w-3.5 h-3.5" />;
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      paid: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-gray-100 text-gray-700 border-gray-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return styles[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  const filteredOrders = orders.filter((order) => {
    const buyerName = `${order.user?.firstName || ""} ${
      order.user?.lastName || ""
    }`.toLowerCase();

    const productNames = (order.orderItems || [])
      .map((item) => item.name)
      .join(" ")
      .toLowerCase();

    const status = (order.status || "").toLowerCase();
    const searchTerm = search.toLowerCase();

    return (
      buyerName.includes(searchTerm) ||
      productNames.includes(searchTerm) ||
      status.includes(searchTerm)
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "highest") {
      const totalA = (a.orderItems || []).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const totalB = (b.orderItems || []).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return totalB - totalA;
    }

    return 0;
  });

  const deliveredCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-gray-400" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            When customers order your products, their orders will
            appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and track your customer orders.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 bg-white border border-gray-200 rounded-lg">
              <Package className="w-4 h-4 text-gray-500" />

              <span className="text-sm font-medium text-gray-700">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>
          </div>

          {/* Search + Sort */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search by customer, product, or status..."
                value={search}
                readOnly
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-48 px-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
              </select>

              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders */}
        {sortedOrders.length > 0 ? (
          <div className="space-y-4">
            {sortedOrders.map((order) => {
              const totalAmount = (order.orderItems || [])
                .reduce(
                  (acc, item) =>
                    acc + item.price * item.quantity,
                  0
                )
                .toFixed(2);

              return (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="px-5 py-4 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                      {/* Customer */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-5 h-5 text-gray-600" />
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Customer
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-gray-900">
                            {order.user?.firstName || "Unknown"}{" "}
                            {order.user?.lastName || ""}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium ${getStatusStyles(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}

                          {order.status
                            ? order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)
                            : "Unknown"}
                        </span>

                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className="appearance-none px-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                          >
                            <option value="pending">
                              Set Pending
                            </option>
                            <option value="paid">
                              Set Paid
                            </option>
                            <option value="shipped">
                              Set Shipped
                            </option>
                            <option value="delivered">
                              Set Delivered
                            </option>
                          </select>

                          <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-5">
                    <div className="divide-y divide-gray-100">
                      {order.orderItems?.map((item, index) => (
                        <div
                          key={index}
                          className="py-4 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">
                                Qty {item.quantity}
                              </span>

                              <span className="text-gray-300">
                                •
                              </span>

                              <span className="text-xs text-gray-500">
                                ${Number(item.price).toFixed(2)} each
                              </span>
                            </div>
                          </div>

                          <p className="text-sm font-semibold text-gray-900 shrink-0">
                            $
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>
                          Order #{order._id.slice(-8)}
                        </span>

                        <span className="text-gray-300">
                          •
                        </span>

                        <span>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs text-gray-500">
                          Total
                        </span>

                        <span className="text-base font-semibold text-gray-900">
                          ${totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* No Search Results */
          <div className="bg-white border border-gray-200 rounded-xl py-14 px-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              No orders found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try searching for a different customer, product, or
              status.
            </p>
          </div>
        )}

        {/* Footer Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
            <span className="text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-gray-600">
                  {deliveredCount} Delivered
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-gray-600">
                  {pendingCount} Pending
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
