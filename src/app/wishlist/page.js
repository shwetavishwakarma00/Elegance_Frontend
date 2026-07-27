"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductActions from "@/components/ProductActions";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex text-sm text-gray-700 hover:text-[#c9a84c]">
          ← Back to home
        </Link>

        <div className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">Wishlist</p>
              <h1 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                Your saved pieces
              </h1>
            </div>
            <p className="text-sm text-gray-600">{items.length} saved item{items.length === 1 ? "" : "s"}</p>
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-[#faf6f1] p-8 text-center text-sm text-gray-600">
              No items saved yet. Explore the collection and save the pieces you love.
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-[1.2rem] border border-[#eadfce] bg-[#fffaf4] p-5">
                  <h2 className="text-xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">₹{item.price}</span>
                    <ProductActions product={item} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
