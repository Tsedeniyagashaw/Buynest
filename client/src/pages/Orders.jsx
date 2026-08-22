import { useEffect, useState } from "react";
import API from "../services/api";
import ReviewModal from "../components/ReviewModal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">
            Loading your orders
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Purchase history
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your previous orders and review delivered products.
          </p>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-sm font-semibold">
                    Order ID
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-sm font-semibold">
                    Products
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-sm font-semibold">
                    Total
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-center text-sm font-semibold">
                    Purchased Items
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* Order ID */}
                    <td className="px-5 py-5 align-top">
                      <p className="max-w-[140px] truncate text-xs font-medium text-gray-500">
                        #{order._id}
                      </p>
                    </td>

                    {/* Product Names */}
                    <td className="px-5 py-5 align-top">
                      <div className="space-y-1">
                        {order.orderItems.map((item) => (
                          <p
                            key={item.product}
                            className="text-sm font-medium text-gray-900"
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5 align-top">
                      <span
                        className={`
                          inline-flex rounded-full px-3 py-1
                          text-xs font-semibold capitalize
                          ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "paid"
                                  ? "bg-gray-200 text-gray-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-5 py-5 align-top">
                      <span className="text-base font-bold text-gray-900">
                        ${order.totalPrice}
                      </span>
                    </td>

                    {/* Purchased Products */}
                    <td className="px-5 py-5 align-top">
                      <div className="min-w-[320px] space-y-3">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="
                              flex items-center justify-between gap-4
                              rounded-xl border border-gray-200
                              bg-gray-50 p-3
                              transition hover:border-gray-300 hover:bg-white
                            "
                          >
                            {/* Product */}
                            <div className="flex min-w-0 items-center gap-3">
                              <img
                                src={item.image || "/images.jfif"}
                                alt={item.name}
                                className="h-14 w-14 shrink-0 rounded-lg object-cover"
                              />

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                  {item.name}
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-900">
                                  ${item.price}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-500">
                                  Quantity: {item.quantity}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                  {item.category}
                                </p>
                              </div>
                            </div>

                            {/* Review */}
                            {order.status === "delivered" && (
                              <button
                                onClick={() => {
                                  setSelectedProduct({
                                    product: item.product,
                                    productName: item.name,
                                    orderId: order._id,
                                  });

                                  setShowReviewModal(true);
                                }}
                                className="
                                  shrink-0 rounded-lg
                                  bg-gray-900 px-3 py-2
                                  text-xs font-semibold text-white
                                  transition hover:bg-gray-800
                                  active:scale-95
                                "
                              >
                                ⭐ Review
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto max-w-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                          <span className="text-xl">📦</span>
                        </div>

                        <h3 className="font-semibold text-gray-900">
                          No orders yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Your completed purchases will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          product={selectedProduct.product}
          orderId={selectedProduct.orderId}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Orders;