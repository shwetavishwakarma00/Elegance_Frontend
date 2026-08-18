"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toStoreProduct } from "@/lib/productAdapter";

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    fetch(`${apiBaseUrl}/products?category_name=All`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Failed to load featured products");
        setProducts(Array.isArray(data) ? data.slice(0, 3).map(toStoreProduct) : []);
      })
      .catch((loadError) => setError(loadError.message));
  }, []);

  return (
    <section className="w-full bg-[#fffaf4] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">Featured pieces</p>
            <h3 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>Signature styles for every moment.</h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">A few of our most loved essentials, ready to be styled and shipped with care.</p>
        </div>

        {error ? <p className="rounded-xl bg-white p-6 text-sm text-red-600">{error}</p> : null}
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-[#e9ddcc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-64 overflow-hidden bg-[#f5ede3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/img/dresses.jpg"; }} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <button type="button" aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product)} className={`absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-lg shadow-sm ${isWishlisted(product.id) ? "text-[#c9a84c]" : "text-gray-700"}`}>
                  {isWishlisted(product.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d742b]">{product.category}</p>
                <h4 className="mt-2 text-xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{product.name}</h4>
                <p title={product.description} className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-600">{product.description || "Refined silhouette with polished detailing."}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-gray-900">₹{product.price}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => addToCart(product)} className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">Add to cart</button>
                    <Link href={`/product/${product.id}`} className="rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:border-gray-900">View</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
