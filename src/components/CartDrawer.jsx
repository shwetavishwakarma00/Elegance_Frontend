
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="ml-auto flex h-full w-full max-w-[440px] flex-col bg-[#fffdf9] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-[#eee5d8] bg-[#fffdf9] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#b7954b]">
                Your selection
              </p>

              <h3
                className="mt-1 text-[26px] leading-tight text-[#24211d]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Shopping Cart
              </h3>

              {items.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  {items.length} {items.length === 1 ? "item" : "items"} in your bag
                </p>
              )}
            </div>

            <button
              aria-label="Close cart"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8dfd2] bg-white text-xl text-gray-500 transition hover:border-[#cdbb9d] hover:bg-[#f8f3eb] hover:text-gray-900"
            >
              ×
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="min-h-0 flex-1 overflow-hidden px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8cbb9] bg-white px-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1e8] text-2xl">
                🛍
              </div>

              <p
                className="text-[21px] text-[#29251f]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Your cart is empty
              </p>

              <p className="mt-2 max-w-[260px] text-sm leading-6 text-gray-500">
                Add a few signature pieces to your collection and they’ll appear here.
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 rounded-full bg-[#24211d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3731]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="h-full space-y-3 overflow-y-auto pr-1 scrollbar-thin">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#ebe2d6] bg-white p-3.5 transition hover:border-[#d8c9b4] hover:shadow-sm"
                >
                  {/* Product */}
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="h-[82px] w-[70px] flex-shrink-0 overflow-hidden rounded-xl bg-[#f6f1ea]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || "/img/dresses.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="line-clamp-2 pr-1 text-[15px] font-medium leading-5 text-[#28251f]"
                          title={item.name}
                        >
                          {item.name}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 text-[11px] text-gray-400 transition hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>

                      <p className="mt-1.5 text-sm font-medium text-[#9a7b39]">
                        ₹{item.price}
                      </p>

                      {/* Quantity + Total */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex h-8 items-center rounded-full border border-[#e4d9ca] bg-[#fffdf9] px-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full text-base text-gray-600 transition hover:bg-[#f2eadf] hover:text-gray-900"
                          >
                            −
                          </button>

                          <span className="w-7 text-center text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full text-base text-gray-600 transition hover:bg-[#f2eadf] hover:text-gray-900"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-[#24211d]">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {items.length > 0 && (
          <div className="border-t border-[#e9e0d4] bg-white px-5 pb-5 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>

              <span className="text-lg font-semibold text-[#24211d]">
                ₹{subtotal}
              </span>
            </div>

            <p className="mb-4 text-[11px] leading-5 text-gray-400">
              Taxes and shipping charges are calculated at checkout.
            </p>

            <div className="flex gap-2.5">
              <button
                onClick={clearCart}
                className="rounded-full border border-[#ddd3c5] px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear
              </button>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex flex-1 items-center justify-center rounded-full bg-[#24211d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b3731]"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

