"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryPage({ params }) {
  const router = useRouter();
  const routeParams = use(params);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const category = decodeURIComponent(routeParams.category);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        setLoading(true);
        setError("");
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/categories`),
          fetch(`${apiBaseUrl}/products?category_name=${encodeURIComponent(category)}`),
        ]);
        const [categoryData, productData] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error(categoryData?.error || productData?.error || "Failed to load collection");
        }

        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (loadError) {
        setError(loadError.message || "Failed to load collection");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadCollection();
  }, [category]);

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">Collections</p>
            <h1 className="mt-2 text-3xl text-gray-900 md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              {category === "All" ? "All Collections" : `${category} Collection`}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            Explore the selected edit with refined filters designed for effortless browsing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[1.5rem] border border-[#eadfce] bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:h-fit">
            <div className="flex items-center justify-between lg:block">
              <h2 className="text-lg text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                Filter by
              </h2>
              <p className="text-sm text-gray-500 lg:mt-2">Category & style</p>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {categories.map((item) => (
                <button
                  key={item.category_id}
                  onClick={() => router.push(`/collections/${encodeURIComponent(item.category_name)}`)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    category === item.category_name
                      ? "bg-gray-900 text-white"
                      : "bg-[#f5ede3] text-gray-700 hover:bg-[#eadfce]"
                  }`}
                >
                  {item.category_name}
                </button>
              ))}
              <button
                onClick={() => router.push("/collections/All")}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                  category === "All" ? "bg-gray-900 text-white" : "bg-[#f5ede3] text-gray-700 hover:bg-[#eadfce]"
                }`}
              >
                All
              </button>
            </div>

            <div className="mt-6 rounded-[1.2rem] bg-[#faf6f1] p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Showing</p>
              <p className="mt-2">{products.length} product{products.length === 1 ? "" : "s"} in this edit</p>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-8 text-center text-sm text-gray-600">
                Loading products…
              </div>
            ) : error ? (
              <div className="rounded-[1.2rem] border border-dashed border-red-200 bg-white p-8 text-center text-sm text-red-600">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-8 text-center text-sm text-gray-600">
                No products match this filter yet.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article key={product.product_id} className="group overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-64 w-full overflow-hidden bg-[#f5ede3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image_url || "/img/dresses.jpg"}
                        alt={product.product_name}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/img/dresses.jpg";
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-800">
                        {product.category_name || "Collection"}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                          {product.product_name}
                        </h3>
                        <span className="text-sm font-semibold text-gray-700">₹{product.price}</span>
                      </div>
                      <p title={product.description} className="mt-3 line-clamp-2 min-h-14 text-sm leading-7 text-gray-600">{product.description || "A refined piece made for your everyday wardrobe."}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="rounded-full bg-[#f5ede3] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#9d742b]">
                          {product.material || "Luxury"}
                        </span>
                        <Link href={`/product/${product.product_id}`} className="text-sm font-medium text-gray-900 hover:text-[#c9a84c]">
                          View details →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
