import { useEffect, useState } from "react"
import API from "../../services/api"
import { useSearch } from "../../context/SearchContext";


function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search, setSearch } = useSearch();

    const filteredOrders = orders.filter(order =>
    order._id.includes(search) ||
    order.user.firstName.toLowerCase().includes(search.toLowerCase())
);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/admin/orders",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                setOrders(res.data);
            }
            catch (error){
                console.log(error.response?.data);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
        
    }, []);

    if (loading) return <h2>Loading</h2>
    if (orders.length === 0) return  <h2>No orders yet!</h2>

  return (
 <div className="p-6 bg-gray-50 min-h-screen">


  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      <p className="text-sm text-gray-500 mt-1">
        A list of all orders placed in your store including buyer, items, total and status.
      </p>
    </div>
  </div>

  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

    <table className="min-w-full">


      <thead className="bg-gray-50">
        <tr className="text-left text-sm text-gray-600 border-b">
          <th className="px-6 py-4 font-medium">Order ID</th>
          <th className="px-6 py-4 font-medium">Buyer</th>
          <th className="px-6 py-4 font-medium">Items</th>
          <th className="px-6 py-4 font-medium">Total</th>
          <th className="px-6 py-4 font-medium">Status</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">

        {filteredOrders.map((order) => (
          <tr
            key={order._id}
            className="hover:bg-gray-50 transition text-sm"
          >

            <td className="px-6 py-5 font-semibold text-gray-900">
              #{order._id.slice(-6).toUpperCase()}
            </td>

            <td className="px-6 py-5 text-gray-600">
              {order.user?.email}
            </td>

            <td className="px-6 py-5">
              <div className="space-y-1">
                {order.orderItems.map((item) => (
                  <p
                    key={item._id}
                    className="text-gray-600"
                  >
                    <span className="font-medium">
                      {item.product?.name}
                    </span>{" "}
                    × {item.quantity}
                  </p>
                ))}
              </div>
            </td>

            <td className="px-6 py-5">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                ${order.totalPrice}
              </span>
            </td>

            <td className="px-6 py-5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.status === "Processing"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </td>

          </tr>
        ))}

      </tbody>
    </table>
  </div>
</div>
  )
}

export default AdminOrders
