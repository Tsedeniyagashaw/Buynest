import { useEffect, useState } from "react";
import API from "../services/api";

function SellerDashboard() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get(
                    "/products/myproducts",
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }

                );
                setProducts(res.data);
            }
            catch(error) {
                console.log(error.respose?.data)
            }
        };
        fetchMyProducts();
    }, []);
  return (
    <div>
        <h1>Seller Dashboard</h1>
        <h2>My Products</h2>
        {products.map((product) => (
            <div key={product._id}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>

            </div>
        ))}
      
    </div>
  )
}

export default SellerDashboard
