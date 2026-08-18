"use client";
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
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api";

    fetch(
      `${apiBaseUrl}/products/${encodeURIComponent(routeParams.id)}`
    )
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Failed to load product"
          );
        }

        setProduct(toStoreProduct(data.product));

        setRelated(
          Array.isArray(data.related)
            ? data.related.map(toStoreProduct)
            : []
        );
      })
      .catch((loadError) => {
        setError(loadError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [routeParams.id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-5 py-12">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-7 h-4 w-36 rounded bg-[#e8dece]" />

          <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
            <div className="h-[500px] rounded-2xl bg-[#eee5da]" />

            <div className="flex flex-col justify-center">
              <div className="h-3 w-24 rounded bg-[#e8dece]" />
              <div className="mt-5 h-9 w-3/4 rounded bg-[#e8dece]" />
              <div className="mt-5 h-7 w-24 rounded bg-[#e8dece]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f2] px-5">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-red-600">
            {error || "Product not found"}
          </p>

          <Link
            href="/collections/All"
            className="mt-5 inline-block rounded-full bg-[#29251f] px-6 py-3 text-xs text-white"
          >
            Back to collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 py-7 sm:px-6 md:px-10 lg:px-12">

      <div className="mx-auto max-w-5xl">

        {/* ================= BACK ================= */}

        <div className="mb-7">
          <Link
            href="/collections/All"
            className="group inline-flex items-center gap-2 text-xs text-[#625b51] transition hover:text-[#b08b35]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3d8c8] bg-white transition group-hover:border-[#c9a84c]">
              ←
            </span>

            Back to collections
          </Link>
        </div>

        {/* ================= MAIN PRODUCT ================= */}

        <section className="grid items-center gap-8 md:grid-cols-[390px_minmax(0,1fr)] lg:grid-cols-[420px_minmax(0,450px)] lg:justify-center lg:gap-14">

          {/* ================= IMAGE ================= */}

          <div className="w-full">

            <div className="relative h-[440px] overflow-hidden rounded-[1.4rem] bg-[#f1e9df] shadow-[0_12px_35px_rgba(80,60,30,0.07)] sm:h-[500px] md:h-[480px] lg:h-[500px]">

              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/img/dresses.jpg";
                }}
                className="h-full w-full object-cover"
              />

              {/* Category badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 px-3.5 py-2 text-[8px] font-medium uppercase tracking-[0.2em] text-[#625b51] shadow-sm backdrop-blur">
                  {product.category || "Collection"}
                </span>
              </div>
            </div>

            {/* Image caption */}
            <div className="mt-2 flex justify-between px-1">
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#9b927f]">
                Signature piece
              </span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-[#9b927f]">
                Elegance
              </span>
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}

          <div className="w-full max-w-[450px]">

            {/* Category */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#c9a84c]" />

              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#b08b35]">
                {product.category || "Signature Collection"}
              </p>
            </div>

            {/* Product name */}
            <h1
              className="mt-3 text-[30px] leading-[1.15] text-[#29251f] sm:text-[34px] lg:text-[36px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs tracking-wider text-[#c9a84c]">
                ★★★★★
              </span>

              <span className="text-[11px] text-[#817a70]">
                {product.rating || "New"}

                {product.total_reviews
                  ? ` · ${product.total_reviews} reviews`
                  : ""}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#29251f]">
                ₹{product.price}
              </span>

              {product.discount_price ? (
                <span className="text-sm text-[#aaa095] line-through">
                  ₹{product.discount_price}
                </span>
              ) : null}
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-[#e5dbcd]" />

            {/* Description */}
            <p className="text-[13px] leading-6 text-[#6f685e]">
              {product.description ||
                "A carefully finished piece designed for effortless, everyday elegance."}
            </p>

            {/* ================= DETAILS ================= */}

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-[#e6dac9] bg-white px-4 py-3.5">
                <p className="text-[8px] uppercase tracking-[0.18em] text-[#9b927f]">
                  Material
                </p>

                <p className="mt-1.5 text-xs font-medium text-[#29251f]">
                  {product.material || "Premium finish"}
                </p>
              </div>

              <div className="rounded-xl border border-[#e6dac9] bg-white px-4 py-3.5">
                <p className="text-[8px] uppercase tracking-[0.18em] text-[#9b927f]">
                  Reviews
                </p>

                <p className="mt-1.5 text-xs font-medium text-[#29251f]">
                  ★ {product.rating || "New"}

                  <span className="ml-1 font-normal text-[#817a70]">
                    ({product.total_reviews || 0})
                  </span>
                </p>
              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="mt-5">
              <ProductActions product={product} />
            </div>

            {/* ================= TRUST ================= */}

            <div className="mt-5 grid grid-cols-3 border-t border-[#e5dbcd] pt-4">

              <div className="text-center">
                <p className="text-sm text-[#b08b35]">◇</p>
                <p className="mt-1 text-[7px] uppercase tracking-[0.1em] text-[#817a70]">
                  Premium quality
                </p>
              </div>

              <div className="border-x border-[#e5dbcd] text-center">
                <p className="text-sm text-[#b08b35]">♢</p>
                <p className="mt-1 text-[7px] uppercase tracking-[0.1em] text-[#817a70]">
                  Carefully packed
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#b08b35]">✓</p>
                <p className="mt-1 text-[7px] uppercase tracking-[0.1em] text-[#817a70]">
                  Easy shopping
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= RELATED ================= */}

        {related.length > 0 && (
          <section className="mt-16 border-t border-[#e5dbcd] pt-12">

            <div className="mb-7 flex items-end justify-between">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-[#c9a84c]" />

                  <p className="text-[8px] uppercase tracking-[0.25em] text-[#b08b35]">
                    You may also like
                  </p>
                </div>

                <h2
                  className="text-2xl text-[#29251f]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  More from this collection
                </h2>
              </div>

              <Link
                href="/collections/All"
                className="hidden text-[9px] uppercase tracking-[0.15em] text-[#756a5a] hover:text-[#b08b35] sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group"
                >

                  {/* Related image */}
                  <div className="relative h-[260px] overflow-hidden rounded-xl bg-[#f1e9df]">

                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "/img/dresses.jpg";
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute bottom-3 left-3 right-3 rounded-full bg-white/95 px-3 py-2 text-center text-[8px] uppercase tracking-[0.15em] text-[#29251f] opacity-0 shadow-md transition group-hover:opacity-100">
                      View product
                    </div>
                  </div>

                  {/* Related details */}
                  <div className="pt-3">

                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="truncate text-base text-[#29251f]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {item.name}
                      </h3>

                      <span className="whitespace-nowrap text-xs font-semibold text-[#29251f]">
                        ₹{item.price}
                      </span>
                    </div>

                    <p
                      title={item.description}
                      className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#817a70]"
                    >
                      {item.description ||
                        "Refined everyday style."}
                    </p>
                  </div>

                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom */}
        <div className="mt-14 flex justify-center border-t border-[#e5dbcd] pt-7">
          <Link
            href="/collections/All"
            className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#756a5a] transition hover:text-[#b08b35]"
          >
            ← Continue exploring
          </Link>
        </div>

      </div>
    </main>
  );
}