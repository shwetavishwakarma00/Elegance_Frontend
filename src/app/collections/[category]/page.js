"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const categories = ["All", "Eveningwear", "Tailoring", "Resort"];

export default function CategoryPage({ params }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = decodeURIComponent(params.category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = category === "All" ? "/api/products" : `/api/products?category_name=${encodeURIComponent(category)}`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = useMemo(() => {
    const baseProducts = category === "All" ? products : products.filter((product) => product.category_name === category);
    return selectedFilter === "All"
      ? baseProducts
      : baseProducts.filter((product) => product.product_name?.includes(selectedFilter) || product.category_name === selectedFilter);
  }, [category, products, selectedFilter]);

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
                  key={item}
                  onClick={() => setSelectedFilter(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    selectedFilter === item
                      ? "bg-gray-900 text-white"
                      : "bg-[#f5ede3] text-gray-700 hover:bg-[#eadfce]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[1.2rem] bg-[#faf6f1] p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Showing</p>
              <p className="mt-2">{filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} in this edit</p>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-8 text-center text-sm text-gray-600">
                Loading products…
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-8 text-center text-sm text-gray-600">
                No products match this filter yet.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.product_id} className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white shadow-sm">
                    <div className="relative h-56 w-full">
                      <Image src={product.image_url || "/img/dresses.jpg"} alt={product.product_name} fill className="object-cover" />
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
                      <p className="mt-3 text-sm leading-7 text-gray-600">{product.description}</p>
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

        {filteredProducts.length === 0 && (
          <div className="mt-6 rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-8 text-center text-sm text-gray-600">
            No products match this filter yet. Try another category.
          </div>
        )}
      </div>
    </main>
  );
}
