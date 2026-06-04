import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from "../services/api"

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



  return (
    <div>
       
            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <p>Price: ${product.price}</p>

            <p>Seller: {product.seller.email}</p>
      
    </div>
  )
}

export default ProductDetails
