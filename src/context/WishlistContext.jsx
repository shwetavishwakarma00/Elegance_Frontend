"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = window.localStorage.getItem("elegance-wishlist");
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("elegance-wishlist", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save wishlist", error);
    }
  }, [items]);

  const toggleWishlist = (product) => {
    setItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);
      if (exists) {
        return currentItems.filter((item) => item.id !== product.id);
      }
      return [...currentItems, product];
    });
  };

  const isWishlisted = (id) => items.some((item) => item.id === id);

  const value = useMemo(
    () => ({ items, toggleWishlist, isWishlisted }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }
  return context;
}
