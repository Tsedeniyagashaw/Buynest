import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";
import { Plus, Pencil, Trash2, Package, Search, X, AlertTriangle, Tag, DollarSign, FileText, } from "lucide-react";

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
    category: "",
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

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => [...prev, res.data]);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });

      setShowModal(false);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const { _id, createdAt, updatedAt, seller, ...cleanData } =
        editingProduct;

      const res = await API.put(`/products/${_id}`, cleanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );

      setEditingProduct(null);
    } catch (err) {
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

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setDeleteId(null);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-3 text-sm text-gray-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-6">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              My Products
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your product listings and inventory.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>

        </div>

        {/* Search + Count */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
            />
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg">
            <Package className="w-4 h-4 text-gray-500" />

            <span className="text-sm font-medium text-gray-700">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"}
            </span>
          </div>

        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl py-16 text-center">

            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-gray-400" />
            </div>

            <h3 className="text-base font-semibold text-gray-900">
              No products found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "Try adjusting your search terms."
                : "Add your first product to get started."}
            </p>

          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">

                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Product
                    </th>

                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Price
                    </th>

                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Category
                    </th>

                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Created
                    </th>

                    <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >

                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          {/* <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">

                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-gray-400" />
                            )}

                          </div> */}

                          <div className="min-w-0">

                            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {product.name}
                            </p>

                            {product.description && (
                              <p className="text-xs text-gray-500 truncate max-w-xs mt-0.5">
                                {product.description}
                              </p>
                            )}

                          </div>

                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">

                        {product.category ? (
                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            <Tag className="w-3.5 h-3.5 text-gray-400" />
                            {product.category}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">
                            —
                          </span>
                        )}

                      </td>

                      {/* Created */}
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">

                          <button
                            type="button"
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteId(product._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm text-gray-500">

            <span>
              Showing {filteredProducts.length} of {products.length} products
            </span>

            <div className="flex items-center gap-4">

              <span>
                Under $50:{" "}
                <strong className="font-medium text-gray-900">
                  {
                    products.filter(
                      (p) => parseFloat(p.price) < 50
                    ).length
                  }
                </strong>
              </span>

              <span>
                $50+:{" "}
                <strong className="font-medium text-gray-900">
                  {
                    products.filter(
                      (p) => parseFloat(p.price) >= 50
                    ).length
                  }
                </strong>
              </span>

            </div>

          </div>
        )}

      </div>

      {/* Create Modal */}
      {showModal && (
        <ProductModal
          title="Add Product"
          product={newProduct}
          setProduct={setNewProduct}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateProduct}
          submitText="Create Product"
        />
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <ProductModal
          title="Edit Product"
          product={editingProduct}
          setProduct={setEditingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={handleUpdateProduct}
          submitText="Save Changes"
        />
      )}

      {/* Delete Modal */}
      {deleteId && (
        <ModalOverlay onClose={() => setDeleteId(null)}>
          <div className="p-6">

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Delete product?
                </h2>

                <p className="text-sm text-gray-500 mt-1 leading-5">
                  This action cannot be undone. The product will be
                  permanently removed from your listings.
                </p>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>

            </div>

          </div>
        </ModalOverlay>
      )}
    </div>
  );
}


/* =========================
   Product Modal
========================= */

function ProductModal({
  title,
  product,
  setProduct,
  onClose,
  onSubmit,
  submitText,
}) {
  return (
    <ModalOverlay onClose={onClose}>

      <div className="max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter the product information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Form */}
        <div className="p-6 space-y-5">

          <FormField
            label="Product Name"
            icon={Package}
          >
            <input
              type="text"
              placeholder="Enter product name"
              value={product.name || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
              className="form-input"
            />
          </FormField>

          <FormField
            label="Description"
            icon={FileText}
          >
            <textarea
              rows="3"
              placeholder="Describe your product..."
              value={product.description || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
              className="form-input resize-none"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <FormField
              label="Price"
              icon={DollarSign}
            >
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
                className="form-input"
              />
            </FormField>

            <FormField
              label="Category"
              icon={Tag}
            >
              <input
                type="text"
                placeholder="e.g. Electronics"
                value={product.category || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value,
                  })
                }
                className="form-input"
              />
            </FormField>

          </div>

          <FormField
            label="Image URL"
            icon={FileText}
          >
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={product.image || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  image: e.target.value,
                })
              }
              className="form-input"
            />
          </FormField>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {submitText}
          </button>

        </div>

      </div>
    </ModalOverlay>
  );
}


/* =========================
   Form Field
========================= */

function FormField({ label, icon: Icon, children }) {
  return (
    <div>

      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        {label}
      </label>

      {children}

    </div>
  );
}


/* =========================
   Modal Overlay
========================= */

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default SellerProducts;
