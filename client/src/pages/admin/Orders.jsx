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

                const res = await API.get("/orders/admin/orders",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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

    if (loading) return <h2>Loaaading</h2>
    if (orders.length === 0) return  <h2>No orders yet!</h2>

  return (
    <div>
   <h1>Orders</h1>
   {orders.map((order) => (
    <div key={order._id}>
        <h3>Order ID: {order._id}</h3>
        <p>Buyer: {order.user.email}</p>
        <p>Total: {order.totalPrice}</p>
        <p>Status: {order.status}</p>

        <h4>Items</h4>
        {order.orderItems.map((item) => (
            <p key = {item._id}>
                {item.product.name} x {item.quantity}

            </p>
        ))}

    </div>
   ))}
    </div>
  )
}

export default AdminOrders
