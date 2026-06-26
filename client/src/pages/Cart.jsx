import { useEffect, useState } from "react";
import API from "../services/api";
import prod from "/public/macbook-air-m1-838.jpg"




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
            <h1 className="font-bold text-2xl text-gray-500 my-4">Your Cart</h1>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cart.items.map((item) => (
               <div className="p-4 bg-violet-50 shadow-sm" key={item.product._id}>
                <img src={prod} alt="" />
                <h3 className="text-lg font-semibold p-3 border-b border-gray-200">{item.product.name}</h3>
                <p className="p-2 border-b border-gray-200">Price: ${item.product.price}</p>
                <p className="p-2 border-b border-gray-200">Quantity:
                <button onClick={() => updateQty(item.product._id, item.quantity - 1)}> - </button>
                <span>{item.quantity}</span> 
                <button className="border b-1" onClick={() => updateQty(item.product._id, item.quantity + 1)}> + </button>
              </p> 
                <p  className="p-2 border-b border-gray-200">Total: ${cart.items.reduce((acc,item) => acc + item.product.price * item.quantity, 0)}</p>
               
               <div className="flex justify-center gap-3">
               <button className=" mt-2 px-4 py-2 bg-violet-900 shadow-sm hover:bg-violet-800 rounded-md text-white" onClick={handleCheckout}>
    Checkout
</button>

<button className=" mt-2 px-4 py-2 bg-violet-900 shadow-sm hover:bg-violet-800 rounded-md text-white" onClick={() => removeItem(item.product._id)}>Remove</button>
              
              
          </div>    
              
               </div> 
            ))}
        </div></div>
    );

}

export default Cart;