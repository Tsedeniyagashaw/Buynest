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
        <div className="max-w-7xl mx-auto  px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-700 my-5">Available Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-10">
            {products.map((product) => (
                <ProductCard key={product._id}  product={product}/>
            ))}
</div>
        </div>
    )
}
export default Products