import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from "../services/api"
import prod from "../../public/images.jfif"



function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
            }
            catch (error) {
                console.log(error.response?.data);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    },[id]);

    if(loading) {
        return <h2>Loading....</h2>
    }

    if(!product) {
        return <h2>Product not found!</h2>
    }

console.log(prod);

  return (
    <div>
        <h1>TEST RENDER</h1>
   <img src="/images.jfjf" alt="test" style={{ width: "200px", border: "2px solid red" }} />
       
            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <p>Price: ${product.price}</p>

            <p>Seller: {product.seller.email}</p>
            <p>Seller: {product.category}</p>
      
    </div>
  )
}

export default ProductDetails
