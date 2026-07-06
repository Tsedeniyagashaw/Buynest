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
      "/orders",
      {
        orderItems: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          seller: item.product.seller,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order Successfully placed");
    console.log(res.data);
  } catch (error) {
    console.log(error.response?.data);
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

  const total = cart.items.reduce(
  (acc, item) => acc + item.product.price * item.quantity,
  0
);

return (
  <div className="max-w-7xl mx-auto px-5 py-10">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">
      Shopping Cart
    </h1>

    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-5">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex gap-5 hover:shadow-md transition"
          >
            <div className="w-32 h-32 bg-violet-50 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={prod}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.product.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Premium Quality Product
                </p>

                <p className="mt-3 text-violet-900 font-bold text-lg">
                  ${item.product.price}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between mt-5">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      updateQty(item.product._id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span className="px-5 font-medium">
                    {item.quantity}
                  </span>

                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      updateQty(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-semibold text-gray-700">
                  $
                  {(item.product.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-80">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Items</span>
            <span>{cart.items.length}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-violet-900">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 bg-violet-900 hover:bg-violet-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
);

}

export default Cart;