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
  const [reviews, setReviews] = useState([]);
const [reviewLoading, setReviewLoading] = useState(true);

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
  useEffect(() => {

  const fetchReviews = async()=>{

    try{

      const res = await API.get(
        `/reviews/product/${id}`
      );

      setReviews(res.data);

    }

    catch(error){
      console.log(error.response?.data);
    }

    finally{

      setReviewLoading(false);

    }

  };


  fetchReviews();

},[id]);

  if (loading) return <h2 className="text-center mt-10">Loading....</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found!</h2>;

  return (
    <>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 p-6">

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">

<div className="text-yellow-400 text-xl">
  {"★".repeat(Math.round(product.averageRating || 0))}
  {"☆".repeat(5 - Math.round(product.averageRating || 0))}
</div>


<span className="text-gray-500 text-sm">
  {product.averageRating || 0}
  ({product.numReviews || 0} reviews)
</span>

</div>

        <div className="">
          <div className="text-2xl font-bold text-purple-600">
            ${product.price}
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

        
        </div>

        <div className='space-y-2'>

        <h1 className='mt-5 font-bold text-xl'>Product Overview</h1>
  <div className="bg-gray-50 px-4 pb-2 rounded-lg">
        {/* <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p> */}

      
          {/* <h3 className="font-semibold text-gray-700">Highlights</h3> */}
          <p className="text-sm text-gray-600 p-4">
           The current generation of the MacBook combines elegant design, powerful performance, and exceptional portability, making it one of the most popular laptops for students, professionals, and creators. Powered by Apple's advanced M-series chips, it delivers fast processing speeds, excellent energy efficiency, and long battery life while remaining thin and lightweight. Its high-resolution Liquid Retina display offers vibrant colors and sharp details, making it ideal for productivity, creative work, and entertainment. With features such as a comfortable Magic Keyboard, large precision trackpad, high-quality webcam, and seamless integration with the Apple ecosystem, the latest MacBook provides a premium user experience that balances performance, reliability, and modern aesthetics.

          </p>
        </div>
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

        <button className="w-1/2 mt-3 bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition">
          Add to Cart
        </button>
     

        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500 mt-4">
          <div className="border border-violet-200  rounded-lg p-2">Secure Payment</div>
          <div className="border border-violet-200  rounded-lg p-2">Fast Delivery</div>
          <div className="border border-violet-200  rounded-lg p-2">Easy Return</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 flex-1">

  <div className="order-2 flex lg:flex-col gap-3 justify-center">
    {[prod1, prod2, prod3].map((img, i) => (
      <div
        key={i}
        className="group w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-purple-600 transition-all duration-300 cursor-pointer bg-white shadow-sm hover:shadow-lg"
      >
        <img
          src={img}
          alt={`Thumbnail ${i + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    ))}
  </div>

  <div className="order-1  flex-1">
    <div className="relative h-[400px]  rounded-2xl bg-gray-50 border border-gray-200 shadow-lg overflow-hidden flex items-center justify-center">

      <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
        Featured
      </span>
      <img src={prod} alt="Main Product" className="w-full h-full object-contain  transition-transform duration-500 hover:scale-110" />
    </div>
  </div>
</div>
    </div>
<div className="mt-10 w-full">
<h2 className="text-2xl font-bold text-gray-800 mb-5"> Customer Reviews </h2>

{
reviewLoading ? (
<p>
Loading reviews...
</p>

) : reviews.length === 0 ? (

<p className="text-gray-500">
No reviews yet. Be the first one!
</p>

) : (

<div className="space-y-5">

{
reviews.map((review)=>(

<div
key={review._id}
className="bg-gray-50 rounded-xl p-5 border"
>

<div className="flex justify-between">

<div>

<h3 className="font-semibold">
{review.user.firstName} {review.user.lastName}
</h3>


<div className="text-yellow-400">
{"★".repeat(review.rating)}
{"☆".repeat(5-review.rating)}
</div>

</div>


<span className="text-sm text-gray-400">
{
new Date(review.createdAt)
.toLocaleDateString()
}
</span>

</div>


<p className="mt-3 text-gray-600">
{review.comment}
</p> 
</div> )) } 
</div>
) }
</div>

 </>
  );
}

export default ProductDetails;