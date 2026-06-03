import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await API.post(
                "/orders", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Order Successfully placed");
            console.log(res.data);
        }
        catch(error){
            console.log(error.response?.data)
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
           try {
            const token = localStorage.getItem("token");

            const res = await API.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(res.data);
           } 
           catch (error) {
            console.log(error.response?.data);
           }
           finally{
            setLoading(false);
           }
        };
        fetchCart();
    },[]);
     
    if (loading) return <h2>Loading Cart...</h2>;

    if (!cart || cart.items.length === 0){
        return <h2>Your Cart is Empty</h2>
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.items.map((item) => (
               <div>
                <h3>{item.product.name}</h3>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.product.price * item.quantity}</p>
               <button onClick={handleCheckout}>
    Checkout
</button>
               </div> 
            ))}
        </div>
    );

}

export default Cart;