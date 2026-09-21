import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("admin/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleProductStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/admin/products/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((product) =>
          product._id === id
            ? {
                ...product,
                isActive: res.data.product.isActive,
              }
            : product
        )
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No products found
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            There are currently no products to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Products
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all products listed on your platform, including
            pricing, sellers, and availability.
          </p>
        </div>

        <button className=" inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition-colors duration-200 " >
          <span className="text-lg leading-none">
            +
          </span>

          Add Product
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4 font-semibold">
                  Product
                </th>

                <th className="px-6 py-4 font-semibold">
                  Description
                </th>

                <th className="px-6 py-4 font-semibold">
                  Price
                </th>

                <th className="px-6 py-4 font-semibold">
                  Seller
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      No matching products
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className=" text-sm hover:bg-gray-50 transition-colors duration-150 " >

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className=" w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 flex-shrink-0 ">
                          {product.name?.[0]?.toUpperCase() || "P"}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate max-w-[180px]">
                            {product.name || "Unnamed product"}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Product
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p
                        className="text-gray-600 max-w-xs truncate"
                        title={product.description}
                      >
                        {product.description || "No description"}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-semibold text-gray-900">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="min-w-0">
                        <p className="text-gray-700 truncate max-w-[200px]">
                          {product.seller?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">

                      {product.isActive ? (
                        <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100 ">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-100 ">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Inactive
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() => toggleProductStatus(product._id)}
                        className={` inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors duration-200
                          ${ product.isActive ? "text-red-600 bg-red-50 border-red-200 hover:bg-red-100" : "text-green-700 bg-green-50 border-green-200 hover:bg-green-100" }
                        `}
                      >
                        {product.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminProducts;
