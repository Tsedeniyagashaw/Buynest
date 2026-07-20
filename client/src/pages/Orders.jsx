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
    return <h2 className="text-center mt-10 text-lg">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-5">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-violet-900 text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Order Product Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-center">PRODUCT</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{order._id}</td>
                 <td className="p-4 text-center">
                  {order.name}
                </td>
                <td className="p-4">
  <span
    className={`
      px-3 py-1 rounded-full text-sm font-medium
      ${
        order.status === "delivered"
        ? "bg-green-100 text-green-700"
        : order.status === "shipped"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700"
      }
    `}
  >
    {order.status}
  </span>
</td>

                <td className="p-4 font-semibold text-violet-700">
                  ${order.totalPrice}
                </td>

               <td className="p-4">

<div className="space-y-3">

{
order.orderItems.map((item)=>(

<div
key={item.product._id}
className="
flex 
justify-between 
items-center
bg-gray-50
rounded-lg
p-3
"
>


<div>

<p className="font-medium">
{item.product.name}
</p>

<p className="text-sm text-gray-500">
Quantity: {item.quantity}
</p>

</div>


{
order.status === "delivered" && (

<button
onClick={()=>{

setSelectedProduct({
    product:item.product,
    orderId:order._id
});

setShowReviewModal(true);

}}
className="
bg-violet-600
text-white
px-3
py-1
rounded-lg
text-sm
hover:bg-violet-700
"
>
⭐ Review
</button>

)

}


</div>

))

}

</div>

</td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {
showReviewModal && (

<ReviewModal

product={selectedProduct.product}

orderId={selectedProduct.orderId}

onClose={()=>{
setShowReviewModal(false)
}}

onSuccess={()=>{
window.location.reload();
}}

/>

)
}
    </div>
  );
}

export default Orders;