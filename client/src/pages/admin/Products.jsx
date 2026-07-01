import { useEffect, useState } from "react"
import API from "../../services/api"
import { useSearch } from "../../context/SearchContext";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
);

 
    useEffect(() => {
     const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("admin/products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(res.data);
    }
    catch (error) {
      console.log(error.response?.data);
    }
    finally {
      setLoading(false);
    }
  };
  fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts((prev) =>
      prev.filter((p) => p._id !== id)
      );
    }
    catch (error) {
      console.log(error.response?.data);
    }
  };




  if (loading) return <h2>Loading ...</h2>

  if (products.length === 0) return <h2>No product found</h2>

  return (
   <div>
            <h1>All Products</h1>

            {filteredProducts.map((product) => (
                <div
                    key={product._id}
                >
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Seller: {product.seller?.email}</p>

                    <button
                        onClick={() => deleteProduct(product._id)}
                      
                    >
                        Delete Product
                    </button>
                </div>
            ))}
        </div>
  )
}

export default AdminProducts
