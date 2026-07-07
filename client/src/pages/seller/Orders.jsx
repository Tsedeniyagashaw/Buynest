import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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
      // optimistic update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status } : o
        )
      );

      const token = localStorage.getItem("token");

      const res = await API.put(
        `/orders/seller/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <p className="text-lg font-medium">No orders found 📦</p>
        <p className="text-sm">When customers order your products, they will appear here.</p>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {

  const buyerName =
    `${order.user.firstName} ${order.user.lastName}`.toLowerCase();

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

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Seller Orders
      </h1>

      <div className="space-y-6">

        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

              {/* Buyer */}
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  Buyer
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {order.user.firstName}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "paid"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border border-gray-200 px-3 py-1 rounded-lg text-sm outline-none focus:ring-2 focus:ring-violet-200"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

              </div>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-3">

              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="flex justify-end mt-5">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold text-violet-900">
                  $
                  {order.orderItems
                    .reduce(
                      (acc, item) =>
                        acc +
                        item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default SellerOrders;