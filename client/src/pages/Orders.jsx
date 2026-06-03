import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
    const [ orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await API.get("/orders",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(res.data);
          }
          catch(error) {
            console.log(error.response?.data);
          }
          finally{
            setLoading(false);
          }
        };
        fetchOrders();
    },[]);
    if(loading) {
        return <h2>Loading ....</h2>
    }


    return (
        <div>
            <h1>My Orders</h1>
            {orders.map((order) => (
                <div key={order.id}>
                    <h3>Order ID</h3>
                    <p>{order._id}</p>
                    <p>Total Price: ${order.totalPrice}</p>
                    <p>Items: ${order.orderItems.length}</p>


                </div>
            ))}
        </div>
    )
}


export default Orders

