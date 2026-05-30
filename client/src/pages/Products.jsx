import { useState, useEffect } from "react";
import API from "../services/api"
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                const res = await API.get("/products");
                setProducts(res.data);
            }
            catch(error){
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <h2>Loading..</h2>
    }
    return (
        <div>
            <h1>Availlable Products</h1>
            {products.map((product) => (
                <ProductCard key={product._id}  product={product}/>
            ))}

        </div>
    )
}
export default Products;