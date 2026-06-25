import API from "../services/api";
import { Link } from "react-router-dom";
import prod from "../../public/images.jfif"
import { FiShoppingCart } from "react-icons/fi";



function ProductCard({ product }) {

    const handleAddToCart = async (productId) => {
     try {
        const token = localStorage.getItem("token");
        const res = await API.post(
            "/cart",
            { productId, quantity: 1},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        alert("Added to Cart");
     }

     catch(error) {
        console.log(error.response?.data);
     }
    }


    return (
         <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">

  <Link to={`/products/${product._id}`}>
    <img
      src={prod}
      alt={product.name}
      className="w-full h-48 object-cover hover:scale-105 transition duration-300"
    />
  </Link>


  <div className="p-4 flex flex-col flex-1">

    <Link to={`/products/${product._id}`}>
      <h2 className="font-bold text-lg text-indigo-700 hover:text-indigo-900 transition">
        {product.name}
      </h2>
   

    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
      {product.description}
    </p>

    <div className="mt-3 flex justify-between items-center">
      <p className="text-lg font-semibold text-gray-800">
        ${product.price}
      </p>

      <p className="text-xs text-gray-500">
        {product.seller.email}
      </p>
    </div>
    
 </Link>
    <button
      onClick={() => handleAddToCart(product._id)}
      className="mt-4 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
    >
     <FiShoppingCart size={20} className="text-white" /> Add to Cart 
    </button>

  </div>
</div>
    );
}

export default ProductCard;