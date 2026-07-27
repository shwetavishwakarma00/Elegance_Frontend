"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/35 transition-opacity duration-300">
      <div className="h-full w-full max-w-md translate-x-0 bg-[#fffaf4] p-6 shadow-2xl transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">Your bag</p>
            <h3 className="mt-1 text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Shopping Cart
            </h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">
            Close
          </button>
        </div>

        <div className="mt-6 flex h-[calc(100%-9rem)] flex-col">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-[#d8c6a7] bg-white p-6 text-center">
              <p className="text-lg text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>
                Your cart is empty.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Add a few signature pieces to begin your edit.
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-4 overflow-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="rounded-[1rem] border border-[#eadfce] bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-600">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-sm text-gray-500 hover:text-red-600">
                      Remove
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-[#e4d7c2] px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded-full text-lg hover:bg-[#f5ede3]"
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded-full text-lg hover:bg-[#f5ede3]"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-5 border-t border-[#eadfce] pt-4">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹{subtotal}</span>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
              >
                Clear
              </button>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex flex-1 items-center justify-center rounded-full bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
