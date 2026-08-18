"use client";
/* Product image URLs are stored in the database and may be remote. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { use, useEffect, useState } from "react";
import ProductActions from "@/components/ProductActions";
import { toStoreProduct } from "@/lib/productAdapter";

export default function ProductDetailClient({ params }) {
  const routeParams = use(params);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    fetch(`${apiBaseUrl}/products/${encodeURIComponent(routeParams.id)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Failed to load product");
        setProduct(toStoreProduct(data.product));
        setRelated(Array.isArray(data.related) ? data.related.map(toStoreProduct) : []);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [routeParams.id]);

  if (loading) return <main className="min-h-screen bg-[#fcf8f2] px-6 py-24 text-center text-gray-600">Loading product…</main>;
  if (error || !product) return <main className="min-h-screen bg-[#fcf8f2] px-6 py-24 text-center text-red-600">{error || "Product not found"}</main>;

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Link href="/collections/All" className="mb-8 inline-flex text-sm text-gray-600 hover:text-[#c9a84c]">← Back to collections</Link>
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[#e7d9c4] bg-white shadow-sm">
            <img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/img/dresses.jpg"; }} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">{product.category}</p>
            <h1 className="mt-3 text-4xl text-gray-900 md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>{product.name}</h1>
            <div className="mt-5 flex items-center gap-4">
              <span className="text-3xl font-semibold text-gray-900">₹{product.price}</span>
              {product.discount_price ? <span className="text-lg text-gray-400 line-through">₹{product.discount_price}</span> : null}
            </div>
            <p className="mt-6 text-base leading-8 text-gray-600">{product.description || "A carefully finished piece designed for effortless, everyday elegance."}</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#eadfce] bg-white p-4"><p className="text-xs uppercase tracking-widest text-gray-500">Material</p><p className="mt-2 text-gray-900">{product.material || "Premium finish"}</p></div>
              <div className="rounded-2xl border border-[#eadfce] bg-white p-4"><p className="text-xs uppercase tracking-widest text-gray-500">Reviews</p><p className="mt-2 text-gray-900">★ {product.rating || "New"} <span className="text-sm text-gray-500">({product.total_reviews || 0})</span></p></div>
            </div>
            <div className="mt-8"><ProductActions product={product} /></div>
          </div>
        </div>

        {related.length ? <section className="mt-20"><div className="mb-7"><p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">You may also like</p><h2 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>More from this collection</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.id} href={`/product/${item.id}`} className="group overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="h-56 overflow-hidden bg-[#f5ede3]"><img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-4"><p className="line-clamp-1 text-lg text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{item.name}</p><p className="mt-2 text-sm font-semibold text-gray-700">₹{item.price}</p><p title={item.description} className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{item.description || "Refined everyday style."}</p></div></Link>)}</div></section> : null}
      </div>
    </main>
  );
}
