"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex text-sm text-gray-700 hover:text-[#c9a84c]">
          ← Continue shopping
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">Checkout</p>
            <h1 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Complete your order
            </h1>

            {submitted ? (
              <div className="mt-6 rounded-[1.2rem] bg-[#f5ede3] p-6 text-sm text-gray-700">
                <p className="text-lg font-semibold text-gray-900">Thank you for your order.</p>
                <p className="mt-2">Your request has been received and our concierge will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input required className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" placeholder="Full name" />
                <input required type="email" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" placeholder="Email address" />
                <input required className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" placeholder="Phone number" />
                <textarea required rows="4" className="w-full rounded-[1.2rem] border border-[#d8c6a7] px-4 py-3" placeholder="Shipping address" />
                <button type="submit" className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
                  Place order
                </button>
              </form>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#eadfce] bg-[#fffaf4] p-8 shadow-sm">
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Order Summary
            </h2>
            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-gray-600">Your cart is empty. Add a few pieces before checkout.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[1rem] bg-white px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 border-t border-[#eadfce] pt-4">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
