"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toStoreProduct } from "@/lib/productAdapter";

export default function CategoryPage({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

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

        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000/api";

        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/categories`),
          fetch(
            `${apiBaseUrl}/products?category_name=${encodeURIComponent(
              category
            )}`
          ),
        ]);

        const [categoryData, productData] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error(
            categoryData?.error ||
              productData?.error ||
              "Failed to load collection"
          );
        }

        setCategories(
          Array.isArray(categoryData) ? categoryData : []
        );

        setProducts(
          Array.isArray(productData)
            ? productData.map(toStoreProduct)
            : []
        );
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
    <main className="min-h-screen bg-[#fcf8f2] px-4 py-10 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1450px]">

        {/* Top Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm text-[#625b51] transition hover:text-[#a27d35]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d8c7] bg-white transition group-hover:border-[#c9a84c]">
              ←
            </span>

            <span>Back to collection</span>
          </Link>

          <span className="hidden text-[9px] uppercase tracking-[0.35em] text-[#9b927f] sm:block">
            Elegance Collection
          </span>
        </div>

        {/* Hero Heading */}
        <section className="mb-12">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c9a84c]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#b08b35]">
                  Collections
                </p>
              </div>

              <h1
                className="max-w-3xl text-4xl leading-[1.05] text-[#29251f] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {category === "All" ? (
                  <>
                    The complete
                    <br />
                    <span className="italic text-[#9b8150]">
                      collection.
                    </span>
                  </>
                ) : (
                  <>
                    {category}
                    <br />
                    <span className="italic text-[#9b8150]">
                      collection.
                    </span>
                  </>
                )}
              </h1>
            </div>

            <div className="max-w-md lg:pb-1">
              <p className="text-sm leading-7 text-[#756e63]">
                Explore our carefully selected pieces, designed with
                timeless details and effortless elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">

            <div className="rounded-[1.5rem] border border-[#e6dac9] bg-white p-5 shadow-[0_8px_30px_rgba(80,60,30,0.04)]">

              <div className="mb-5">
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#b08b35]">
                  Browse
                </p>

                <h2
                  className="mt-2 text-2xl text-[#29251f]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Categories
                </h2>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">

                {/* All */}
                <button
                  onClick={() => router.push("/collections/All")}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                    category === "All"
                      ? "bg-[#29251f] text-white shadow-sm"
                      : "text-[#625b51] hover:bg-[#f7f0e7]"
                  }`}
                >
                  <span>All pieces</span>

                  {category === "All" && (
                    <span className="text-[#d8b85c]">•</span>
                  )}
                </button>

                {categories.map((item) => (
                  <button
                    key={item.category_id}
                    onClick={() =>
                      router.push(
                        `/collections/${encodeURIComponent(
                          item.category_name
                        )}`
                      )
                    }
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                      category === item.category_name
                        ? "bg-[#29251f] text-white shadow-sm"
                        : "text-[#625b51] hover:bg-[#f7f0e7]"
                    }`}
                  >
                    <span>{item.category_name}</span>

                    {category === item.category_name && (
                      <span className="text-[#d8b85c]">•</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Count */}
              <div className="mt-6 rounded-xl bg-[#faf6f1] p-4">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#9b927f]">
                  Current edit
                </p>

                <p className="mt-2 text-sm text-[#625b51]">
                  <span className="font-semibold text-[#29251f]">
                    {products.length}
                  </span>{" "}
                  {products.length === 1 ? "product" : "products"} available
                </p>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div>

            {/* Loading */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-[4/5] rounded-[1.5rem] bg-[#eee5da]" />

                    <div className="px-1 pt-5">
                      <div className="h-2 w-20 rounded bg-[#e5dbcd]" />
                      <div className="mt-3 h-5 w-40 rounded bg-[#e5dbcd]" />
                      <div className="mt-3 h-3 w-full rounded bg-[#eee5da]" />
                      <div className="mt-2 h-3 w-3/4 rounded bg-[#eee5da]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[1.5rem] border border-red-100 bg-white px-6 text-center">
                <span className="mb-4 text-3xl text-red-300">!</span>

                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[1.5rem] bg-[#f7f0e7] px-6 text-center">

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                  <span className="text-3xl text-[#c9a84c]">♡</span>
                </div>

                <h2
                  className="text-2xl text-[#29251f]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Nothing here yet
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#777064]">
                  No products match this collection at the moment.
                </p>

                <Link
                  href="/collections/All"
                  className="mt-6 rounded-full bg-[#29251f] px-7 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#c9a84c]"
                >
                  View all pieces
                </Link>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">

                {products.map((product) => (
                  <article
                    key={product.product_id}
                    className="group"
                  >

                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#f1e9df]">

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          product.image_url || "/img/dresses.jpg"
                        }
                        alt={product.product_name}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "/img/dresses.jpg";
                        }}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                      {/* Category Badge */}
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#625b51] shadow-sm backdrop-blur">
                        {product.category_name || "Collection"}
                      </span>

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

                      {/* View Details Hover */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <Link
                          href={`/product/${product.product_id}`}
                          className="flex w-full items-center justify-center rounded-full bg-white/95 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#29251f] shadow-lg backdrop-blur transition hover:bg-[#29251f] hover:text-white"
                        >
                          View details
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="px-1 pt-5">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">
                          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#b08b35]">
                            Signature piece
                          </p>

                          <h3
                            className="mt-2 truncate text-xl text-[#29251f]"
                            style={{
                              fontFamily: "'Georgia', serif",
                            }}
                          >
                            {product.product_name}
                          </h3>
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
                          "A refined piece made for your everyday wardrobe."}
                      </p>

                      {/* Material + Cart */}
                      <div className="mt-5 flex items-center gap-3 border-t border-[#e5dbcd] pt-5">

                        <span className="flex-1 truncate rounded-full bg-[#f7f0e7] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[#9d742b]">
                          {product.material || "Luxury"}
                        </span>

                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="rounded-full bg-[#29251f] px-5 py-2.5 text-xs font-medium text-white transition duration-300 hover:bg-[#c9a84c]"
                        >
                          Add to cart
                        </button>
                      </div>

                      {/* Mobile View Link */}
                      <Link
                        href={`/product/${product.product_id}`}
                        className="mt-4 block text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#817566] transition hover:text-[#b08b35] sm:hidden"
                      >
                        View details →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        {!loading && products.length > 0 && (
          <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[#e5dbcd] pt-8 sm:flex-row">

            <p className="text-xs text-[#82796c]">
              Showing {products.length}{" "}
              {products.length === 1 ? "piece" : "pieces"} from the{" "}
              {category === "All" ? "complete" : category} collection
            </p>

            <Link
              href="/collections/All"
              className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#78684f]"
            >
              <span className="border-b border-[#c9a84c] pb-1">
                Explore all pieces
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}