"use client";

import { useCart } from "@/context/CartContext";

const products = [
  { id: 1, name: "Silk Wrap Dress", price: 12999, tag: "New Arrival" },
  { id: 2, name: "Pearl Tailored Set", price: 8999, tag: "Bestseller" },
  { id: 3, name: "Linen Evening Co-ord", price: 7499, tag: "Limited" },
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section className="w-full bg-[#fffaf4] py-16 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">Featured pieces</p>
            <h3 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Signature styles for every moment.
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            A few of our most loved essentials, ready to be styled and shipped with care.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-[1.4rem] border border-[#e9ddcc] bg-white p-5 shadow-sm">
              <div className="mb-4 rounded-[1rem] bg-[#f5ede3] p-6 text-center text-sm uppercase tracking-[0.2em] text-[#c9a84c]">
                {product.tag}
              </div>
              <h4 className="text-xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                {product.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">Refined silhouette with polished detailing.</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
