import { useEffect, useState } from "react";
import API from "../services/api";
import prod from "/public/macbook-air-m1-838.jpg";

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
        },
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

      const res = await API.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        "/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCart(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">
            Loading your cart
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl">🛒</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Your Cart is Empty
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Your items
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your items before placing your order.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm sm:gap-5 sm:p-5"
              >
                {/* Product Image */}
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32">
                  <img
                    src={prod}
                    alt={item.product.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
                      {item.product.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Premium Quality Product
                    </p>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      ${item.product.price}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                      <button
                        className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        onClick={() =>
                          updateQty(
                            item.product._id,
                            item.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>

                      <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 px-3 text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        onClick={() =>
                          updateQty(
                            item.product._id,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-base font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-sm font-medium text-red-500 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items</span>
                  <span className="font-medium text-gray-900">
                    {cart.items.length}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-gray-900">FREE</span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-7 w-full rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Secure checkout • Free shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;