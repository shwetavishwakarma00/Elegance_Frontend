"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, isOpen, setIsOpen } = useCart();

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between relative z-50">
      {/* Left Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/collections"
          className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-500 transition-colors"
        >
          Collections
        </Link>
        <Link
          href="/new-arrivals"
          className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-500 transition-colors"
        >
          New Arrivals
        </Link>
        <Link
          href="/lookbook"
          className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-500 transition-colors"
        >
          Lookbook
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-[1.5px] bg-gray-800 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-gray-800 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-gray-800 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
          }`}
        />
      </button>

      {/* Center Logo */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-[22px] tracking-[0.25em] font-bold text-gray-900 uppercase select-none"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Elegance
      </Link>

      {/* Right Icons */}
      <div className="flex items-center gap-5 ml-auto">
        {/* Search */}
        <button aria-label="Search" className="text-gray-700 hover:text-gray-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Wishlist */}
        <Link href="/wishlist" aria-label="Wishlist" className="relative text-gray-700 hover:text-gray-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-yellow-500 text-white text-[9px] font-bold flex items-center justify-center">
            2
          </span>
        </Link>

        {/* Cart */}
        <button
          aria-label="Cart"
          onClick={() => setIsOpen(!isOpen)}
          className="relative text-gray-700 hover:text-gray-400 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md z-50 flex flex-col py-4 px-6 gap-4">
          <Link
            href="/collections"
            className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-400 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/new-arrivals"
            className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-400 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            New Arrivals
          </Link>
          <Link
            href="/lookbook"
            className="text-[11px] tracking-[0.15em] font-medium text-gray-800 uppercase hover:text-gray-400 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Lookbook
          </Link>
        </div>
      )}
    </nav>
  );
}