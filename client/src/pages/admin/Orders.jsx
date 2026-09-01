import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    return (
      order._id?.toLowerCase().includes(searchValue) ||
      order.user?.firstName?.toLowerCase().includes(searchValue) ||
      order.user?.lastName?.toLowerCase().includes(searchValue) ||
      order.user?.email?.toLowerCase().includes(searchValue)
    );
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No orders yet
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Orders will appear here once customers place them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          View and monitor all orders placed on your platform.
        </p>
      </div>

      {/* Orders Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {filteredOrders.length}
          </span>{" "}
          {filteredOrders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full">

            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4 font-semibold">
                  Order ID
                </th>

                <th className="px-6 py-4 font-semibold">
                  Buyer
                </th>

                <th className="px-6 py-4 font-semibold">
                  Items
                </th>

                <th className="px-6 py-4 font-semibold">
                  Total
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      No matching orders
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="
                      text-sm
                      hover:bg-gray-50
                      transition-colors
                      duration-150
                    "
                  >

                    {/* Order ID */}
                    <td className="px-6 py-5">
                      <span className="
                        inline-flex
                        items-center
                        px-2.5
                        py-1
                        rounded-md
                        bg-gray-100
                        border
                        border-gray-200
                        text-xs
                        font-semibold
                        text-gray-700
                      ">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Buyer */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className="
                          w-9
                          h-9
                          rounded-full
                          bg-gray-900
                          text-white
                          flex
                          items-center
                          justify-center
                          text-xs
                          font-semibold
                          flex-shrink-0
                        ">
                          {`${order.user?.firstName?.[0] || ""}${order.user?.lastName?.[0] || ""}`
                            .toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {`${order.user?.firstName || ""} ${order.user?.lastName || ""}`.trim() ||
                              "Unknown user"}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {order.user?.email || "N/A"}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-5">
                      <div className="space-y-2 max-w-xs">

                        {order.orderItems?.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between gap-4"
                          >
                            <p className="text-gray-700 truncate">
                              <span className="font-medium text-gray-900">
                                {item.product?.name || "Unknown product"}
                              </span>
                            </p>

                            <span className="
                              flex-shrink-0
                              text-xs
                              font-medium
                              text-gray-500
                              bg-gray-100
                              px-2
                              py-0.5
                              rounded-md
                            ">
                              × {item.quantity}
                            </span>
                          </div>
                        ))}

                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-5">
                      <span className="font-semibold text-gray-900">
                        ${Number(order.totalPrice || 0).toFixed(2)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-2.5
                          py-1
                          rounded-md
                          text-xs
                          font-medium
                          border
                          ${
                            order.status === "Delivered"
                              ? "bg-green-50 text-green-700 border-green-100"
                              : order.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : order.status === "Processing"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-red-50 text-red-600 border-red-100"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-1.5
                            h-1.5
                            rounded-full
                            ${
                              order.status === "Delivered"
                                ? "bg-green-500"
                                : order.status === "Pending"
                                ? "bg-yellow-500"
                                : order.status === "Processing"
                                ? "bg-blue-500"
                                : "bg-red-500"
                            }
                          `}
                        />

                        {order.status}
                      </span>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminOrders;
