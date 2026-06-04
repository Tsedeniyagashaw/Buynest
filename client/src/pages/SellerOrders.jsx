import  { useEffect, useState } from 'react';
import API from "../services/api";

function SellerOrders() {
    const [orders, setOrders] = useState([]);

    const handleStatusChange = async (orderId, status) => {
        try {
            const token =localStorage.getItem("token");

            const res = await API.put(
                `/orders/${orderId}/status`,
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOrders((prev) => 
            prev.map((o) =>
            o._id === orderId ? res.data : o
            )
            );
        }
        catch (error) {
            console.log(error.response?.data);
        }
    }

    useEffect (() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/orders/seller", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(res.data);
            }
            catch (error) {
                console.log(error.response?.data);
            }
        };
        fetchOrders();
    },[]);
  return (
    <div>
        <h1>Seller Orders</h1>
        {orders.map((order) =>(
            <div key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p>Customer: {order.user.email}</p>
                <p>Total: ${order.totalPrice}</p>
                <select 
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>

                </select>

            </div>
        ))}
      
    </div>
  )
}

export default SellerOrders
