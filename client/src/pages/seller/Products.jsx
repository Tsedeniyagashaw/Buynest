import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
     const { search, setSearch } = useSearch();

const [newProduct, setNewProduct] = useState({
  name: "",
  description: "",
  price: "",
  image: "",
  category: ""
});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/products/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }



const handleCreateProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.post(
      "/products",
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts((prev) => [...prev, res.data]);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: ""
    });

    setShowModal(false);

    alert("Product created successfully!");
  } catch (err) {
    console.log(err.response?.data);
  }
};

const handleUpdateProduct = async () => {
  try {
    const token = localStorage.getItem("token");
const { _id, createdAt, updatedAt, seller, ...cleanData } = editingProduct;

const res = await API.put(
  `/products/${_id}`,
  cleanData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    setProducts((prev) =>
      prev.map((p) =>
        p._id === res.data._id ? res.data : p
      )
    );

    setEditingProduct(null);

    alert("Product updated successfully!");
  } catch (err) {
    // console.log(err.response?.data);
    console.log("UPDATE PRODUCT ERROR:", err);
  }
};

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // remove from UI instantly
    setProducts((prev) => prev.filter((p) => p._id !== id));

    alert("Product deleted successfully!");
  } catch (err) {
    console.log(err.response?.data);
  }
};

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase()) ||
  product.category?.toLowerCase().includes(search.toLowerCase()) ||
  product.description?.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          My Products
        </h1>

       <button
  onClick={() => setShowModal(true)}
  className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
>
  + Add Product
</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-left">

          {/* Head */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>

            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-medium">
                  {product.name}
                </td>

                <td className="p-3 text-green-600 font-semibold">
                  ${product.price}
                </td>

                <td className="p-3">
                  {product.category || "N/A"}
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-2">

                 <button
  onClick={() => setEditingProduct(product)}

  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Edit
</button>

   <button
  onClick={() => setDeleteId(product._id)}
  className="px-3 py-1 bg-red-500 text-white rounded"
>
  Delete
</button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

    <div className="bg-white p-6 rounded-xl w-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Add Product
      </h2>

      <input
        className="w-full border p-2 mb-2"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Price"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
      />

      {/* Buttons */}
      <div className="flex justify-between">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateProduct}
          className="px-4 py-2 bg-violet-600 text-white rounded"
        >
          Create
        </button>

      </div>

    </div>

  </div>
)}

{editingProduct && (
  <div    onClick={() => setEditingProduct(null)} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

    <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-xl w-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Edit Product
      </h2>

      <input
        className="w-full border p-2 mb-2"
        value={editingProduct.name}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            name: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        value={editingProduct.description}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            description: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        type="number"
        value={editingProduct.price}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            price: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mb-2"
        value={editingProduct.image}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            image: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mb-4"
        value={editingProduct.category}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            category: e.target.value
          })
        }
      />

      {/* Buttons */}
      <div className="flex justify-between">

        <button
          onClick={() => setEditingProduct(null)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

{deleteId && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

    <div className="bg-white p-6 rounded-xl">

      <h2 className="text-lg font-bold mb-4">
        Are you sure you want to delete?
      </h2>

      <div className="flex justify-between">

        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleDelete(deleteId);
            setDeleteId(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default SellerProducts
