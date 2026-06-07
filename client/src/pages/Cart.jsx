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

    const removeItem = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.delete(`/cart/${productId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(res.data);

        } catch(error){
            console.log(error.response?.data);
        }
    }


    const updateQty = async (productId, quantity) =>{
        if (quantity <  1) return;

        try {
            const token = localStorage.getItem("token");

            const res = await API.put(
                "/cart",
                { productId, quantity},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(res.data);
        }
        catch (error) {
            console.log(error.response?.data) 
        }
    }

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
               <div key={item.product._id}>
                <h3>{item.product.name}</h3>
                <p>Price: ${item.product.price}</p>
                <p>Quantity:</p> 
                <button onClick={() => updateQty(item.product._id, item.quantity - 1)}> - </button>
                <span>{item.quantity}</span> 
                <button className="border b-1" onClick={() => updateQty(item.product._id, item.quantity + 1)}> + </button>
                <p>Total: ${cart.items.reduce((acc,item) => acc + item.product.price * item.quantity, 0)}</p>
               <button onClick={handleCheckout}>
    Checkout
</button>

<button onClick={() => removeItem(item.product._id)}>Remove</button>
               </div> 
            ))}
        </div>
    );

}

export default Cart;