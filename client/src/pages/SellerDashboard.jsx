import { useEffect, useState } from "react";
import API from "../services/api";

function SellerDashboard() {
    const [products, setProducts] = useState([]);
    const [editingProduct,setEditingProduct] = useState(null);

    const handleEdit = (product) => {
        setEditingProduct(product);
    }

    const updateProduct = async () => {
        try {
            const token =localStorage.getItem("token");
            const res = await API.put(
                `/products/${editingProduct._id}`,
                editingProduct,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProducts((prev) =>
            prev.map((p) => 
            p._id === res.data._id ? res.data : p
            )
            );
            setEditingProduct(null); 
        alert("Product Updated");
        }
        catch(error) {
            console.log(error.respose?.data);
        }

    }

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/products/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts((prev) => 
            prev.filter((p) => p._id !== id)
            );

            alert("Product deleted successfully!")
        }
        catch(error) {
            console.log(error.respose?.data);
        }
    }

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
        <div>
        <h2>My Products</h2>
        {products.map((product) => (
            <div key={product._id}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>

            </div>
        ))}
      </div>
      {editingProduct && (
        <div>
            <h2>Edit Product</h2>
            <input 
            value={editingProduct.name}
            onChange={(e) => 
                setEditingProduct({
                    ...editingProduct,
                    name: e.target.value
                })
            }
            />

               <input 
            value={editingProduct.description}
            onChange={(e) => 
                setEditingProduct({
                    ...editingProduct,
                    description: e.target.value
                })
            }
            />
                <input 
            value={editingProduct.price}
            onChange={(e) => 
                setEditingProduct({
                    ...editingProduct,
                    price: e.target.value
                })
            }
            />

            <button onClick={updateProduct}>Save</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default SellerDashboard
