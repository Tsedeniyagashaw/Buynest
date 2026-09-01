import API from "../services/api";
import { Link } from "react-router-dom";
import prod from "../../public/images.jfif";
import { FiShoppingCart, FiStar, FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, []);

  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const exists = res.data.items?.some(
        (item) => item.product._id === product._id,
      );

      setIsWishlisted(exists);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setWishlistLoading(true);

      if (isWishlisted) {
        await API.delete(`/wishlist/${product._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsWishlisted(false);
      } else {
        await API.post(
          `/wishlist/${product._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsWishlisted(true);
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Added to Cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="group relative flex max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        className="relative block overflow-hidden bg-gray-100"
      >
        <img
          src={prod}
          alt={product.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
     <button
  onClick={(e) => {
    e.preventDefault();
    handleWishlist();
  }}
  disabled={wishlistLoading}
  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  className="
    absolute top-3 right-3
    p-1
    text-gray-700
    transition-all duration-200
    hover:scale-110
    hover:text-gray-900
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  <FiHeart
    size={21}
    strokeWidth={1.8}
    className={`
      transition-all duration-200
      ${
        isWishlisted
          ? "fill-red-500 text-red-500"
          : "text-gray-700"
      }
    `}
  />
</button>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={15}
                className={
                  star <= Math.round(product.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-xs text-gray-500">
            {product.averageRating || 0} ({product.numReviews || 0})
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h2 className="line-clamp-1 text-lg font-semibold text-gray-900 transition hover:text-gray-600">
            {product.name}
          </h2>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
        </Link>

        {/* Price + Seller */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-xl font-bold text-gray-900">
            ${product.price}
          </p>

          <p className="max-w-[150px] truncate text-xs text-gray-400">
            {product.seller.email}
          </p>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => handleAddToCart(product._id)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          <FiShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;