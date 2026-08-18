"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleAdd}
        className="rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
      <button
        onClick={() => toggleWishlist(product)}
        className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
          isWishlisted(product.id)
            ? "border-[#c9a84c] bg-[#f5ede3] text-[#9d742b]"
            : "border-gray-300 text-gray-700 hover:border-[#c9a84c]"
        }`}
      >
        {isWishlisted(product.id) ? "★ Saved" : "☆ Save"}
      </button>
      <Link href="/checkout" className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:border-gray-900">
        Buy now
      </Link>
    </div>
  );
}
