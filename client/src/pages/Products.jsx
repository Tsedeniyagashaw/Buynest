import { useState, useEffect } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <div
      key={item}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      {/* Image skeleton */}
      <div className="h-52 animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        {/* Rating */}
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

        {/* Product name */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />

        {/* Button */}
        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  ))}
</div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Explore our collection
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Available Products
          </h1>

          <p className="text-sm text-gray-500 sm:text-base">
            Browse and discover products from our sellers.
          </p>
        </div>

        {/* Product Count */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">
              {products.length}
            </span>{" "}
            {products.length === 1 ? "product" : "products"} available
          </p>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no products available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Products;