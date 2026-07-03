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
  <div className="p-6  min-h-screen">

  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-600">All Products</h1>
      <p className="text-sm text-gray-500 mt-1">
        A list of all products in your store including their details, price and seller.
      </p>
    </div>

    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-violet-900 shadow hover:opacity-90">
      <span className="text-lg">+</span>
      Add product
    </button>
  </div>

  {/* Card */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

    <table className="min-w-full">

      {/* Head */}
      <thead className="bg-gray-50">
        <tr className="text-left text-sm text-gray-600 border-b border-gray-300">
          <th className="px-6 py-4 font-medium">Name</th>
          <th className="px-6 py-4 font-medium">Description</th>
          <th className="px-6 py-4 font-medium">Price</th>
          <th className="px-6 py-4 font-medium">Seller</th>
          <th className="px-6 py-4 font-medium text-right">Action</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-100">

        {filteredProducts.map((product) => (
          <tr key={product._id} className="text-sm hover:bg-gray-50 transition">

            {/* Name */}
            <td className="px-6 py-4 font-medium text-gray-900">
              {product.name}
            </td>

            {/* Description */}
            <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
              {product.description}
            </td>

            {/* Price */}
            <td className="px-6 py-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                ${product.price}
              </span>
            </td>

            {/* Seller */}
            <td className="px-6 py-4 text-gray-600">
              {product.seller?.email || "N/A"}
            </td>

            {/* Action */}
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </td>

          </tr>
        ))}

      </tbody>
    </table>
  </div>
</div>
  )
}

export default AdminProducts
