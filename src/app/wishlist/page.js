"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductActions from "@/components/ProductActions";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Top Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm text-[#5d574f] transition hover:text-[#b08b35]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6dccd] bg-white transition group-hover:border-[#c9a84c]">
              ←
            </span>
            <span>Back to collection</span>
          </Link>

          <div className="hidden text-[10px] uppercase tracking-[0.3em] text-[#9b927f] sm:block">
            Elegance Collection
          </div>
        </div>

        {/* Header */}
        <section className="mb-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#c9a84c]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#b08b35]">
                  My Wishlist
                </span>
              </div>

              <h1
                className="text-4xl leading-tight text-[#25221e] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Pieces worth
                <br />
                <span className="italic text-[#9b8150]">remembering.</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#d8c6a7]" />

              <p className="text-sm text-[#756e63]">
                <span className="font-medium text-[#25221e]">
                  {items.length}
                </span>{" "}
                {items.length === 1 ? "piece" : "pieces"} saved
              </p>
            </div>
          </div>
        </section>

        {/* Wishlist */}
        {items.length === 0 ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[2rem] bg-[#f7f0e7] px-6 text-center">

            <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_10px_40px_rgba(80,60,30,0.08)]">
              <span className="text-4xl font-light text-[#c9a84c]">
                ♡
              </span>
            </div>

            <h2
              className="text-3xl text-[#29251f]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Nothing saved yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#777064]">
              Discover something beautiful and save it here for later.
            </p>

            <Link
              href="/"
              className="mt-8 rounded-full bg-[#29251f] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#c9a84c]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {items.map((item) => (
              <article
                key={item.id}
                className="group"
              >

                {/* Product Image / Visual */}
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#f1e9df]">

                  {/* Placeholder until actual image is available */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || item.image_url || "/img/dresses.jpg"}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/img/dresses.jpg";
                    }}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 hidden items-center justify-center">
                    <span className="text-7xl font-light text-[#d7c6a9] transition duration-500 group-hover:scale-110">
                      ♡
                    </span>
                  </div>

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* Wishlist Button */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-[#b08b35] shadow-sm backdrop-blur transition hover:bg-white">
                    ♥
                  </div>

                  {/* Bottom Action */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-full  px-4 py-3 shadow-lg backdrop-blur">
                      <ProductActions product={item} onlyBuyNow />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="px-1">

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">

                      <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-[#b08b35]">
                        Saved piece
                      </p>

                      <h2
                        className="truncate text-xl text-[#29251f]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {item.name}
                      </h2>
                    </div>

                    <span className="whitespace-nowrap pt-4 text-base font-medium text-[#29251f]">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#817a70]">
                    {item.description}
                  </p>

                  {/* Mobile / Normal Action */}
                  <div className="mt-5 border-t border-[#e5dbcd] pt-4 sm:hidden">
                    <ProductActions product={item} />
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom */}
        {items.length > 0 && (
          <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[#e5dbcd] pt-8 sm:flex-row">

            <p className="text-xs text-[#82796c]">
              Your wishlist • {items.length} saved{" "}
              {items.length === 1 ? "piece" : "pieces"}
            </p>

            <Link
              href="/"
              className="text-xs font-medium uppercase tracking-[0.18em] text-[#8e7137] transition hover:text-[#c9a84c]"
            >
              Continue Shopping →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
