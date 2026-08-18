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
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    fetch(`${apiBaseUrl}/products?category_name=All`)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Failed to load featured products"
          );
        }

        setProducts(
          Array.isArray(data)
            ? data.slice(0, 3).map(toStoreProduct)
            : []
        );
      })
      .catch((loadError) => setError(loadError.message));
  }, []);

  return (
    <section className="w-full bg-[#fffaf4] px-4 py-20 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c9a84c]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b08b35]">
                Featured Collection
              </p>
            </div>

            <h3
              className="max-w-2xl text-4xl leading-tight text-[#29251f] sm:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Signature styles
              <br />
              <span className="italic text-[#9b8150]">
                for every moment.
              </span>
            </h3>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#756e63] md:pb-1">
            Discover a carefully selected edit of our most loved pieces,
            designed to bring effortless elegance to every occasion.
          </p>
        </div>

        {/* Error */}
        {error ? (
          <div className="mb-8 rounded-2xl border border-red-100 bg-white p-6 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {/* Products */}
        <div className="grid gap-7 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#f1e9df]">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/img/dresses.jpg";
                  }}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Category */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#765d2d] shadow-sm backdrop-blur">
                    {product.category}
                  </span>
                </div>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={
                    isWishlisted(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => toggleWishlist(product)}
                  className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-xl shadow-md backdrop-blur transition duration-300 hover:scale-105 ${
                    isWishlisted(product.id)
                      ? "text-[#c9a84c]"
                      : "text-[#514b43] hover:text-[#c9a84c]"
                  }`}
                >
                  {isWishlisted(product.id) ? "♥" : "♡"}
                </button>

                {/* View Product */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex w-full items-center justify-center rounded-full bg-white/95 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#29251f] shadow-lg backdrop-blur transition hover:bg-[#29251f] hover:text-white"
                  >
                    View details
                  </Link>
                </div>
              </div>

              {/* Details */}
              <div className="px-1 pt-5">

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">

                    <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#b08b35]">
                      Signature piece
                    </p>

                    <h4
                      className="mt-2 truncate text-xl text-[#29251f]"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {product.name}
                    </h4>
                  </div>

                  <span className="whitespace-nowrap pt-3 text-base font-semibold text-[#29251f]">
                    ₹{product.price}
                  </span>
                </div>

                <p
                  title={product.description}
                  className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#817a70]"
                >
                  {product.description ||
                    "Refined silhouette with polished detailing."}
                </p>

                {/* Bottom Actions */}
                <div className="mt-5 flex items-center gap-3 border-t border-[#e5dbcd] pt-5">

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 rounded-full bg-[#29251f] px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition duration-300 hover:bg-[#c9a84c]"
                  >
                    Add to cart
                  </button>

                  <Link
                    href={`/product/${product.id}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9cdbc] text-[#625b51] transition duration-300 hover:border-[#c9a84c] hover:bg-[#f7efe5] hover:text-[#9d742b]"
                    aria-label={`View ${product.name}`}
                  >
                    →
                  </Link>

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Collection Link */}
        {products.length > 0 && (
          <div className="mt-14 flex justify-center">
            <Link
              href="/"
              className="group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#695d4d]"
            >
              <span className="border-b border-[#c9a84c] pb-1 transition group-hover:text-[#b08b35]">
                Explore the collection
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}