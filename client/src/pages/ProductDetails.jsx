import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from "../services/api"
import prod from "/public/images.jfif"
import prod1 from "/public/img1.jfif"
import prod2 from "/public/img2.jfif"
import prod3 from "/public/img3.jfif"

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading....</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found!</h2>;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 p-6">

      <div className="flex-1 space-y-4">

        <div className="w-full h-[60vh] bg-white border rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
          <img
            src={prod}
            alt="main"
            className="w-full h-full object-contain hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex gap-3 justify-center">
          {[prod1, prod2, prod3].map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              alt="thumb"
            />
          ))}
        </div>
      </div>

     
      <div className="flex-1 space-y-4">

        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-purple-600">
            ${product.price}
          </div>

          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            In Stock
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="bg-gray-50 p-4 rounded-lg  space-y-2">
          <h3 className="font-semibold text-gray-700">Highlights</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>High quality premium material</li>
            <li>Fast delivery within 2–5 days</li>
            <li>30-day return guarantee</li>
            <li>Secure payment system</li>
          </ul>
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            <span className="font-medium">Seller:</span>{" "}
            {product.seller.email}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.category}
          </p>
        </div>

      

        <div className="flex items-center gap-3 pt-2">
          <span className="font-medium text-gray-700">Quantity:</span>

          <div className="flex items-center border border-violet-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-violet-100 hover:bg-violet-200"
            >
              -
            </button>

            <span className="px-4">{qty}</span>

            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="px-3 py-1 bg-violet-100 hover:bg-violet-200"
            >
              +
            </button>
          </div>
        </div>

        <button className="w-full mt-3 bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition">
          Add to Cart
        </button>
     

        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500 mt-4">
          <div className="border border-violet-200  rounded-lg p-2">Secure Payment</div>
          <div className="border border-violet-200  rounded-lg p-2">Fast Delivery</div>
          <div className="border border-violet-200  rounded-lg p-2">Easy Return</div>
        </div>

         

      </div>
    </div>
  );
}

export default ProductDetails;