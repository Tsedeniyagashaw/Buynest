import API from "../services/api";
import { Link } from "react-router-dom";
import prod from "../../public/images.jfif"
import { FiShoppingCart } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
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

        if(!token) return;


        const res = await API.get("/wishlist", {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });


        const exists = res.data.items?.some(
            item => item.product._id === product._id
        );


        setIsWishlisted(exists);


    } catch(error){
        console.log(error.response?.data);
    }
};




const handleWishlist = async () => {

    try {

        const token = localStorage.getItem("token");

        if(!token){
            alert("Please login first");
            return;
        }


        setWishlistLoading(true);


        if(isWishlisted){

            await API.delete(`/wishlist/${product._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });


            setIsWishlisted(false);


        }else{

            await API.post(`/wishlist/${product._id}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });


            setIsWishlisted(true);
        }


    }catch(error){
        console.log(error.response?.data);
    }

    finally{
        setWishlistLoading(false);
    }

}

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
         <div className="relative max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">

  <Link to={`/products/${product._id}`}>
    <img
      src={prod}
      alt={product.name}
      className="w-full h-48 object-cover hover:scale-105 transition duration-300"
    />
  </Link>
  <div className="flex items-center gap-1 mt-2">

  <div className="flex text-yellow-400">
    {[1,2,3,4,5].map((star)=>(
      <FiStar
        key={star}
        size={15}
        className={
          star <= Math.round(product.averageRating)
          ? "fill-yellow-400"
          : "text-gray-300"
        }
      />
    ))}
  </div>


  <span className="text-sm text-gray-500">
    {product.averageRating || 0}
    ({product.numReviews || 0})
  </span>

</div>


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
 
    
 </Link>   <button
 onClick={handleWishlist}
 disabled={wishlistLoading}
 className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
>
 <FiHeart
 size={22}
 className={
    isWishlisted
    ? "fill-red-500 text-red-500"
    : "text-gray-500"
 }
 />
</button>
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